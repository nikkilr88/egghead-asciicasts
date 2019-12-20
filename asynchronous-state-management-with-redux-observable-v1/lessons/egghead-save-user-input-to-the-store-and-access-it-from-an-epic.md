There's currently no limit on how many results this API search will give us. We can add a `perPage` field to this `reducer`. We'll just initialize it with a value of `10`. Then we'll need a way to update this.

#### configReducer.js
```js
const initialState = {
    apiBase: 'https://api.punkapi.com/v2beers',
    perPage: 10
};

export function configReducer(state = initialState, action) {
    return state;
}
```

Inside this reducer, we can listen for actions of type `SET_CONFIG`. We'll spread in the existing `state`. We'll just allow any keys from the `payload` that match these. We no longer need this `default return`. Now we can go and create this constant and an action creator for it.

#### configReducer.js
```js
const initialState = {
    apiBase: 'https://api.punkapi.com/v2beers',
};

export function configReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONFIG: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: return state;
    }
}
```

We'll have `configActions`. We'll just explore the constant `SET_CONFIG` and an action creator for it. We take in a `partialObject`, which is any object literal that contains the keys that match that `config`. We set it to its `payload`.

#### configureActions.js
```js
export const SET_CONFIG = "SET_CONFIG";

export function setConfig(partialObject) {
    return { 
        type: SET_CONFIG,
        payload: partialObject,
    }
}
```

In the `component` right next to the `<input>` field, we'll add a `<select>` element. This will have a `defaultValue` of `config.perPage`. We need to bring in that `config` from the store. `onChange`, we're going to `setConfig`. 

#### Beers.js
```js
export function Beers(props) {
    const {data, messages, status, search, cancel, config} = props;
    return (
        <>
            <div className="App-inputs">
                <select 
                    name= "per-page"
                    defaultValue={config.perPage}
                    onChange={(e) => setConfig({perPage: Number(e.target.value)})}>
                </select>
                <input
                    type="text"
                    placeholder="Search beers"
                    onChange={(evt) => search(evt.target.value)}
```

We need to bring in the action creator that we made in `configActions`. We can add it there, `import` it.

```js
export default connect(state => state.beers, {search, cancel, setConfig})(Beers);
```

We're not going to have access to this `config` just yet because where we map the `state`, we're only bringing in `state` from the `beers`. Let's create a `function mapState`. This gets the entire store. For now, we'll spread in `state.beers`. We'll access `config` directly.

```js
function mapState(state)
    return { 
        ...state.beers,
        config: state.config
    }
}
```

We can pass `mapState` here instead of this. That should give us everything from the `beersReducer` and everything from the `configReducer`, but under the `config` key.

```js
function mapState(state)
    return { 
        ...state.beers,
        config: state.config
    }
}

export default connect(mapState, {search, cancel, setConfig})(Beers);
```

The `defaultValue` of the select on page load is going to be whatever we set inside the `configReducer`. When an `onChange` event fires, we're going to call the action creator, which will produce an action of this type, which means we can `import` that now. It will set the values in our store.

Let's check our progress in the browser. You can see the select box. If we change it to 5, you can see we get the `SET_CONFIG` action. The store has changed. Config `perPage` is now 5. That isn't going to alter our API request just yet because we're not accessing that value here, from within the epic.

![SET_CONFIG, Config Per Page = 5](../images/egghead-save-user-input-to-the-store-and-access-it-from-an-epic-config-perpage-5-set-config.png)

Let's go back. We are currently using `"config",  "apiBase"` from this `reducer`, but we also want `perPage` now. It would make sense to no longer `pluck` the `apiBase`, but just leave it as `config`. The search can be `config.apiBase`, `config.perPage`, and the `payload`.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$, state$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        withLatestFrom(state$.pipe(pluck("config"))),
        switchMap(([{payload}, config]) => {


            const ajax$ = ajax.getJSON(search(config.apiBase, config.perPage, payload)).pipe(
                delay(5000),
                map(resp => fetchFulfilled(resp)),
                catchError(err => {
                    return of(fetchFailed(err.response.message));
                })
            );
```

Let's go and add that third parameter to this `search` helper, `perPage`. We just add it here after the `encodeURIComponent`. 

```js
const search = (apiBase, perPage, term) => `${apiBase}?beer_name=${encodeURIComponent(term)}%per_page${perPage}`;
```

I can check this in the browser. If we change this to 2 and type "ship," you only get two search results. We can check the network tab to see that we did in fact pass along a second query parameter, `perPage = 2`.