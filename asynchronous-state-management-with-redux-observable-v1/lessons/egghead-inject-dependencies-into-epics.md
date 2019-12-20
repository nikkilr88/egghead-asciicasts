The current implementation of this search feature makes some assumptions about the environment in which it's running. For example, we use this `ajax.getJSON` from RxJS/AJAX. That assumes we're in an environment where that can even be run.

Likewise, we're using this global variable `document` here, which again assumes we're in an environment that has the global variable `document`. Using these types of things within our epics make it harder to test and harder to reuse them in other environments.

There's a simple solution, something that comes to us from the Redux-Observable library. They allow us to give a third argument here which is an object literal of dependencies that you can define.

We can put `getJSON` in our `fetchBeersEpic` function export. We can remove this `ajax`. `Import {ajax}` now would move into where we configure the store. 

#### fetchBeers.js
```js
import {catchError, debounceTime, filter, map, mapTo, pluck, switchMap, withLatestFrom} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus, fetchFailed, CANCEL, reset} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, fromEvent, of, merge, race} from "rxjs";

const search = (apiBase, perPage, term) => 
    `${apiBase}?beer_name=${encodeURIComponent(term)}%per_page${perPage}`;

export function fetchBeersEpic(action$, state$ { getJSON }) {
    return action$.pipe(
        ofType(RANDOM),
        debounceTime(500),
        withLatestFrom(state$.pipe(pluck("config"))),
        switchMap(([{payload}, config]) => {

            const ajax$ = getJSON(search(config.apiBase, config.perPage, payload)).pipe(
                map(resp => fetchFulfilled(resp)),
                catchError(err => {
                    return of(fetchFailed(err.response.message));
                })
            );
```

As the only argument to `createEpicMiddleware`, we give an object literal there and a special key,`dependencies`. We can give any number of items here.

#### configureStore.js
```js
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {appReducer} from "./reducers/appReducer";
import {ajax} from "rxjs/ajax";

import {combineEpics, createEpicMiddleware} from "redux-observable";
import {fetchBeersEpic} from "./epics/fetchBeers";
import {beersReducers} from "./reducers/beersReducers";
import {configReducer} from "./reducers/configReducer";
import {hydrateEpic, persistEpic} from "./epics/persist";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

    const epicMiddleware = createEpicMiddleware({
        dependencies: { 
            getJSON: ajax.getJSON
        }
    });
```

The reason we do this is that now this function is much, much easier to test, because it really is just a function that takes a stream of `action$`, a stream of `state$`, and an object literal, in this case with just one function on it. We can also do this for things like the `document`.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$, state$ { getJSON, document }) {
```

We would just move that `document` to the `dependencies` in `configureStore`. This tiny abstraction allows us to sell the store based on the environment. For example, we could have these as the default `dependencies`. Then we could spread in something that comes in here. We could set it to an empty object.

#### configureStore.js
```js
export function configureStore(dependencies = {}) {

    const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

    const epicMiddleware = createEpicMiddleware({
        dependencies: { 
            getJSON: ajax.getJSON
            document: document 
            ...dependencies
        }
    });
```

Right now, in our application, we only have one place that uses this `configureStore` function. That's in the `index.js`, where we're actually rendering to the DOM. By removing our `dependencies` away from the epics and into this object, it means that in a test scenario, we can just call `configureStore`, and we could pass in any of these to override them.

Let's just verify everything still works. We can still search. Nothing's changed in the application, but we've just made it far, far easier to test in the future.
