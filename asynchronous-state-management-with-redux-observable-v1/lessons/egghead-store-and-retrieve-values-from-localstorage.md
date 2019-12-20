This application allows a user to set the amount of results they want from a search query. If we look at the Redux store, the way it works is any changes on the select field produce an action called set config. In our store we have config per page that we set to the number that they select. It happens in this `configReducer`.

We have `perPage` that starts with the default of `10` and responds to any `SET_CONFIG` actions,where the `payload` can be any of these two keys. In our case just the select field sends through `perPage` and then a number between 1 and 10.

This is a nice feature, but if we reload the page you can see that we lost the number that was selected here. It would be nice if we could persist this configuration over page loads. We can use local storage for this, and it will be a great example of another case of composing data from different sources with Redux observable.

The first thing to note is that we have this `SET_CONFIG` action. We can add a new epic. We're just going to call this `persist`. The first thing we'll do is listen for that `SET_CONFIG` action and then we'll use that as a trigger to store whatever is currently in the Redux store under the `config` key in local storage.

We can `export` a `function`. We'll call this one `persistEpic`. This takes a stream of `action$` and the `state$`. We only care about the `action$` that have a type of set config. We'll call `pipe` and then we'll use `ofType` from the Redux observable library. We'll bring in the `SET_CONFIG` constant. When the action occurs, we want to group that with `theLatest` value from the state.

#### persistEpic.js
```js
import (ofType) from "redux-observable";
import (SET_CONFIG) from "../reducers/configActions";

export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(SET_CONFIG), 
        withLatest
    )
}
```

We can use with `latestFrom`, pass along the `state$.` We'll just `pluck` from that `config`. Then we can use the `tap` operator to get access to those values. We'll end up with an array within the `tap` operator. We'll just `import` that. This will be the `action` and the second parameter will be the `config`. This is where we're going to perform the side effect and actually write something into local storage.

```js
import (ofType) from "redux-observable";
import (SET_CONFIG) from "../reducers/configActions";
import {pluck, tap, withLatestFrom} from "rxjs/operators";

export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(SET_CONFIG), 
        withLatest(state$.pipe(pluck("config"))),
        tap(([action, config]) => {

        }),
    )
}
```

Before we do anything there, let's not forget to `ignoreElements` here. Since the purpose of this epic is just to listen for when this happens within the store, then retrieve the latest value of the `config` and do something with it. We don't actually want to produce any actions from this epic. We're just using it as a listener.


```js
import (ofType) from "redux-observable";
import (SET_CONFIG) from "../reducers/configActions";
import {ignoreElement, pluck, tap, withLatestFrom} from "rxjs/operators";

export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(SET_CONFIG), 
        withLatest(state$.pipe(pluck("config"))),
        tap(([action, config]) => {

        }),
        ignoreElements()
    )
}
```

Now we could just call `localStorage.setItem()`, and we use a `CACHE_KEY`. We'll just say Redux observable config, `ro-config`. We'll just `stringify` that `config`. That's everything we need from this epic. We just need to go and register it with our combine epics.

```js
import (ofType) from "redux-observable";
import (SET_CONFIG) from "../reducers/configActions";
import {ignoreElement, pluck, tap, withLatestFrom} from "rxjs/operators";

const CACHE_KEY = "ro-config";

export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(SET_CONFIG), 
        withLatest(state$.pipe(pluck("config"))),
        tap(([action, config]) => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(config))
        }),
        ignoreElements()
    )
}
```

If we go back to `configureStore` where we've registered this `fetchBeersEpic`, we'll add a `persistEpic` in there and `import` that. 

#### configureStore.js
```js
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {fetchBeersEpic} from "./epics/fetchBeers";
import {beersReducers} from "./reducers/beersReducers";
import {configReducer} from "./reducers/configReducer";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic, persistEpic);

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beersReducers,
        config: configReducer
    });
```

We can go and test that in the browser now. Now if we go to the application panel and click on local storage and the address here, we see no values.

![No Values Shown in Browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-store-and-retrieve-values-from-localstorage-no-values-shown-in-browser.png)

If we change this to say four, we can see that we use that cache key and we set those two config items into local storage. So far so good. 

![Results of 4](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-store-and-retrieve-values-from-localstorage-4-value-cache-key-two-config-items-in-local-storage.png)

What happens if we reload the page. It goes back to 10. This value has persisted, but we're not using it to set the default value on page load. That's the next thing.

Let's create another epic. This one we'll call `hydrateEpic`. This will be responsible for reading the values from local storage once when the page loads and producing an action into the store to set those configuration values. If we say `maybeConfig` is equal to `localStorage.getItem()`.

#### persist.js
```js
import (ofType) from "redux-observable";
import (SET_CONFIG) from "../reducers/configActions";
import {ignoreElement, pluck, tap, withLatestFrom} from "rxjs/operators";

const CACHE_KEY = "ro-config";

export function persistEpic(action$, state$) {
    return action$.pipe(
        ofType(SET_CONFIG), 
        withLatest(state$.pipe(pluck("config"))),
        tap(([action, config]) => {
            localStorage.setItem(CACHE_KEY, JSON.stringify(config))
        }),
        ignoreElements()
    )
}

export function hydrateEpic() {
    const maybeConfig = localStorage.getItem()
}
```

We'll use our `CACHE_KEY` again. Then we'll check `if` the value we got back was actually a `string`. If it is a `string`, meaning the value that we set in `localStorage.setItem`, we can `try` to `parse` the `JSON`. We'll say `parsed`, and we'll say `JSON.parse(maybeConfig)`. If that's successful, we'll `return` an observable `of` a single value which will be a call to the action creator `setConfig`. Pass along `parsed` object. `Import` that.

```js
export function hydrateEpic() {
    const maybeConfig = localStorage.getItem(CACHE_KEY);
    if (typeOf maybeConfig === "string") {
        try {
            const parsed = JSON.parse(maybeConfig)
            return of(setConfig(parsed));
        }
    }
}
```

In the `catch` block if we do get an error, `e`, we can just `return EMPTY`. `Empty` is an observable that doesn't produce any values. It just completes successfully. We can also `return` this if we don't make it inside that conditional. 

```js
export function hydrateEpic() {
    const maybeConfig = localStorage.getItem(CACHE_KEY);
    if (typeOf maybeConfig === "string") {
        try {
            const parsed = JSON.parse(maybeConfig)
            return of(setConfig(parsed));
        } catch(e) {
            return EMPTY;
        }
    }
    return EMPTY;
}
```
Now we need to register this again inside the `configureStore`, pass it along in `rootEpic`, and `import` it. 

#### configureStore.js
```js
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {fetchBeersEpic} from "./epics/fetchBeers";
import {beersReducers} from "./reducers/beersReducers";
import {configReducer} from "./reducers/configReducer";
import {hydrateEpic, persistEpic} from "./epics/persist";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beersReducers,
        config: configReducer
    });
```

Now this epic is just responsible for executing once. It produces an observable that will either have an action of `setConfig` or it will just be `EMPTY`, not produce any values.

Let's test it in the browser. We'll reload the page. Now we can see that the previous value of four automatically set this here. If we go to the Redux store, you can see that after the `INIT` we got this `SET_CONFIG` action which came from local storage. Any new values we set will persist also.

![Values Perist upon Pageload](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-store-and-retrieve-values-from-localstorage-values-shown-to-persist-in-browser-upon-pageload.png)