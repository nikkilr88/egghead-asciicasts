To demonstrate how easy it is to compose multiple asynchronous computations with RxJS, let's re-purpose this application so that instead of a search term, we're just going to return random results based on how many are selected here. We're going to replace this `<input>` with a `<button>` instead, but first we need to create an action.

We'll copy `search` and we'll just call it `random`. It won't need any `input`. Now that we have that constant and action creator, we can use this in the UI.

##### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const RANDOM = "RANDOM"; 
export const CANCEL = "CANCEL";
export const RESET = "RESET";

export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: beers
    }
}

export function fetchFailed(message) {
    return {
        type: FETCH_FAILED,
        payload: message
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status
    }
}

export function fetchData() {
    return {
        type: FETCH_DATA
    }
}

export function cancel() {
    return {
        type: CANCEL
    }
}

export function reset() {
    return {
        type: RESET
    }
}

export function search(input) {
    return {
        type: SEARCH,
        payload: input
    }
}

export function random() {
    return {
        type: RANDOM,
    }
}
```

We go back to the `component` and we'll replace this `<input>` with a `<button>` instead. It's `type="button"` and the `onClick` handler will call the `random` function.

#### Beers.js
```js
<button type="button" onClick={random}>
    Random
</button>
```

We'll replace `search` with `random`.

```js
const {data, messages, status, random, cancel, config} = props;
```

We'll need to bring in the action creator in our `export default`. We'll just `import` that. 

```js
export default connect(mapState, {search, cancel, setConfig, random})(Beers);
```

Now you can see we have this random button. If we click it, you can see we get an action dispatched into the store and no results because we need to wire it up inside our epic.

![Random Button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-create-multiple-ajax-requests-and-group-the-the-results-random-button-in-browser.png)

We can re-purpose this `fetchBeers` epic. We'll add another helper function for the API URLs. The particular API that we're using supports this endpoint `random`. It just gives us back a single beer. Because we're allowing the user to select how many random beers we want, we'll have to compose together multiple AJAX requests. The first thing we need to do that is the `perPage` configuration.

#### fetchBeers.js
```js
const search = (apiBase, perPage, term) => 
    `${apiBase}?beer_name=${encodeURIComponent(term)}%per_page${perPage}`;
const random = (apiBase) => `${apiBase}/random";
```

We can say requests, `reqs`, is a new array. We use the spread trick to create an `Array` of a certain length. We'll say `config.perPage`. If the user selected five, this will become an array of five elements. We don't care about the elements, we just want to `map` that into five different AJAX requests. We can change this for the `random` helper and we don't need the second two arguments.

```js
export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        withLatestFrom(state$.pipe(pluck("config"))),
        switchMap(([{payload}, config]) => {

            const reqs = [...Array(config.perPage)].map(() => {
                return ajax.getJSON(random(config.apiBase))
            });
```

Now this is going to be a plain array that inside it contains a number of observables that are not making AJAX requests yet. They're just sitting there waiting to be subscribed to. Then we just need something from Rx that can take this array of observables, subscribe to them all, and give us the results back in one array. For that we can use `forkJoin(reqs)`.

```js
const ajax$ = forkJoin(reqs).pipe(
    map(resp => fetchFulfilled(resp)),
    catchError(err => {
        return of(fetchFailed(err.response.message));
    })
);
```

[03:02] We mustn't forget to change `SEARCH` here in `ofType` to `RANDOM` and `import` that constant. We also won't need this `filter` anymore since we're not using the text input from the user. 

```js
export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
        ofType(RANDOM),
        debounceTime(500),
        withLatestFrom(state$.pipe(pluck("config"))),
        switchMap(([{payload}, config]) => {
```

Let's check that in the browser. We can change this to three results, hit random and see what happens. You can see we have an error here. We made three API requests.

![TypeError: Cannot read property 'value' of undefined](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-create-multiple-ajax-requests-and-group-the-the-results-type-error-cannot-read-property-value-of-undefined.png)

If we look, each API request, even though we know it's only a single beer, it's given us back that single item in an array. The problem here is that `fetchFulfilled` action creator expects `beers` as a flat array. What we end up sending in is a nested array. We can prove that if we just put `console.log` and run the experiment again.

#### beersActions.js
```js
export function fetchFulfilled(beers) {
    console.log(beers);
    return {
        type: FETCH_FULFILLED,
        payload: beers
    }
}
```

You can see before the error we have an array of three elements and each element is itself an array. 

![Array of three elements](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-create-multiple-ajax-requests-and-group-the-the-results-array-of-three-elements-where-each-element-is-an-array-in-error.png)

We can solve that problem before it gets anywhere near the `reducer` by changing what we `return` from this `getJSON`. Because that is just an observable, we can use the `pluck` operator to access the first element.

#### fetchBeers.js
```js
const reqs = [...Array(config.perPage)].map(() => {
    return ajax.getJSON(random(config.apiBase)).pipe(pluck(0));
});
```

This means that every observable from `getJSON` will just `return` the inner beer from the response, it won't return the outer array. With that simple change there, we can try again. There you go, we make two separate API requests to the same URL. We group the results, and we showed them all together at once.

![Results shown together at once](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-create-multiple-ajax-requests-and-group-the-the-results-two-separate-API-requests-shown-together-at-once-in-browser.png)
