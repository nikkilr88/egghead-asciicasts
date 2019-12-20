Instead of having this API URL hardcoded in this file like this, let's have it as part of our store. If we create a new reducer, we'll call it `configReducer`. We'll just have some `initialState` where there's an `apiBase` being that URL and then our actual `reducer`, which at the moment isn't responding to any actions but rather is just allowing us to have this state accessible.

#### configReducer.js
```js
const initialState = {
    apiBase: 'https://api.punkapi.com/v2beers',
};

export function configReducer(state = initialState, action) {
    return state;
}
```

We need to go to our `configureStore` file and register that reducer. We'll add it in `rootReducer`. `Config`, `configReducer`. Now we'll be able to access this from within our epic. 

#### configureStore.js
```js
import {fetchBeersEpic} from "./epics/fetchBeers";
import {beersReducers} from "./reducers/beersReducers";
import {configReducer} from "./reducers/configReducer";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic);

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beersReducers,
        config: configReducer
    });
```

If we come back to our epic, this little `search` helper that we have should now accept also an `apiBase` like that. Here where we're calling the `search` helper, we need to get the value from the store.

#### fetchBeers.js
```js
const search = (apiBase, term) => `${apiBase}?beer_name=${encodeURIComponent(term)}`;
```

The way we do that inside our epics is we take the second parameter which is an observable of `state$`. If it's a static value like a URL that's never going to change, you're probably safe just to say `state$` or `value`. Then you can access `config` and the `apiBase`.

```js
export function fetchBeersEpic(action$, state$) 
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {

            const ajax$ = ajax.getJSON(search(state$.value.config.apiBase, payload)).pipe(
                delay(5000),
                map(resp => fetchFulfilled(resp)),
                catchError(err => {
                    return of(fetchFailed(err.response.message));
                })
            );
```

If we remove this `delay` and check it still works in the browser, you can see it does. `State$.value` is a property added to this observable by the Redux Observable library. It gives us access to the entire store.

That's why we have to access `.config` here, because when we configured the store, we said all of the state under the `configReducer` lives on the `config` property. That's why we can access `apiBase`, because that comes from the `initialState`.

This is one way of accessing `state` within your epics, but it's not the best way. The main problem with accessing `state` like this is you've now tightly coupled this callback here with the outer environment because you can no longer execute this without this `state$` variable being in scope.

That means if you wanted to refactor this code and pull this large function body out in a separate file or a separate function, you're not going to have to pass along the `state$` as well. Really, what we want to be able to do is access both the action and the `state` like that. If we could do that, it removes the coupling of the outer scope.

```js
export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(([{payload}, state]) => {
```

We can use `withLatestFrom`, which is an operator from our RX that takes an observable and when its source observable being this action stream here emits a value, it will group that value together with the last value that came from this `state$` in `withLatestFrom`.

```js
export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        withLatestFrom(state$),
        switchMap(([{payload}, state]) => {
```

That's why we get an array here and we have to destructure it. This part being the original action from the stream above it. The second element being the value emitted from this observable.

What that means is we can remove this `state$.value` and just say `state`. Check again in the browser and we get the same result. Another reason that I always recommend using this approach rather than the value directly is that because this is just an observable, we can do all the normal things we can do with composition.

```js
const ajax$ = ajax.getJSON(search(state.config.apiBase, payload)).pipe(
```

Imagine that we want to test this function in isolation. For this `state` object, we would have to construct an object that had a `config` object and then an `apiBase` property. If all we use in here is this string that comes from `configReducer`, we could remove this part by doing this.

We could `pluck` `"config"` and then `"apiBase"`. `Pluck` is an operator that will try to access properties on objects or arrays based on the keys you give it here. Now we can change this to being just `apiBase`. We're limiting the scope of what our function actually needs. That is going to work exactly the same.

```js
withLatestFrom(state$.pipe(pluck("config", "apiBase"))),
switchMap(([{payload}, apiBase]) => {

    const ajax$ = ajax.getJSON(search(apiBase, payload)).pipe(
```

It's a tiny bit more work to use this style, but the benefits are endless. Especially when you realize that `withLatestFrom` can take any number of observables. You may pull that apart from the store and you may have some other element in the store like a `user` and you could pull in their `authToken`. That would then be accessible to you  in `switchMap`.

```js
withLatestFrom(
    state$.pipe(pluck("config", "apiBase")),
    state$.pipe(pluck("user", "authToken")),
),
switchMap(([{payload}, apiBase, authToken]) => {
```

The point here is we're taking multiple data sources and we're using composition to collate just the bits we need for each function.
