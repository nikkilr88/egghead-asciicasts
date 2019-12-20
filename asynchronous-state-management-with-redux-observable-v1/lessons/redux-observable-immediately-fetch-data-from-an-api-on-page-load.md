We can use this API to get some data from a real service. In particular, we're going to look at this endpoint. 

![Get Beers from API](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-immediately-fetch-data-from-an-api-on-page-load-get-beers-from-api.png)

If we paste that into the terminal, pipe it through `JQ` to make it look a bit prettier, you can see that we get an array of objects.

#### Terminal
```
curl https://api.punkapi.com/v2/beers | jq 
```

We'll make an epic to face this data immediately. We'll create a new file, `epics`, and then we'll call it `fetchBeers`. This is that `API` endpoint we just looked at. We just `export` a single `function` from this file. This is going to be the epic.

#### fetchBeers.js
```js
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {

}
```

Now, the only requirement of an epic is that you return a stream of actions. If we want to face this data immediately on page load, we can just `return ajax.getJSON`. This comes from the rxjs/ajax package, which we need to `import`.

```js
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {
    return ajax.getJSON()
}
```

We'll say `import {ajax} from "rxjs/ajax"`. Then we can pass along the `API` URL. Now, before we use this in our interface, we can just do a debugging trick, and we can `pipe` this into the top operator, which we can import.

```js
import {ajax} from "rxjs/ajax";
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {
    return ajax.getJSON(API).pipe(
        tap(x => console.log(x)),
    )
}
```

This will allow us to observe elements that are coming through the stream. Then we can `ignoreElements`, because right now, we don't want this epic to actually produce any actions back into the Redux store just yet.

```js
import {ajax} from "rxjs/ajax";
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {
    return ajax.getJSON(API).pipe(
        tap(x => console.log(x)),
        ignoreElements()
    )
}
```

We just want to observe whether or not we're fetching this data correctly. We have this epid. We need to register it with our middleware. If we go back to the `configureStore.js`, where previously we had this sample epic, we can remove that now, and we can import our `fetchBeersEpic`.

#### configureStore.js
```js
import {createStore, combineReducers, applyMiddlewear, compose} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {fetchBeersEpic} from "./epics/fetchBeers";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic);

    const epicMiddleware = createEpicMiddlewear();

    const rootReducer = combineReducers({
        app: appReducer 
    });
}
```

We `import` it like that. Now, if we go back to the browser, we should see that that network request happens on page load. If I refresh, you can see it happens again. If we just check the network panel, filtered to XHR, we can see that that beers endpoint is being called.

![Network Request Upon Page Load](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-immediately-fetch-data-from-an-api-on-page-load-network-request.png)

[02:13] To use this data within our application, we need to save it to the store. We'll create a reducer that's sole purpose is to handle this data from this beers API. We'll call it `beersReducer`. We'll have some `initialState`, which in our case can just be a property `data`, to hold the array of beers, and a flag to say whether or not we're `loading`.

#### beersReducer.js
```js
const initialState = { 
    date: [],
    loading: true
};
```

Then we can `export` the `function` that will be the actual `reducer`. This will take `state`, and its initial value will be that `initialState`, and the `action`. Then we can just `switch` on the `action.type`, and in the `case` that it is `FETCH_FULFILLED`.

```js
const initialState = { 
    date: [],
    loading: true
};

export function beersReducers(state = initialState, action) {
    switch (action.type) {
        case "FETCH_FULFILLED"
    }
}
```

Whilst we're here, we'll actually create these in a separate file, so we can have `beersActions.js`, and we'll `export` a `constant`.

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
```

Then we can use that in our `beersReducer.js`. In the case that it is a `FETCH_FULFILLED` action, we're going to `return` spreading the `state` in, setting the `loading` flag to `false`, and setting the `data` to the `action.payload`.

#### beersReducer.js
```js
import {FETCH_FULFILLED} from "./beersActions";

const initialState = { 
    date: [],
    loading: true
};

export function beersReducers(state = initialState, action) {
    switch (action.type) {
        case "FETCH_FULFILLED": {
            return {
                ...state
                loading: false, 
                data: action.payload
            }
        }
    }
}
```


As we saw earlier, the API returns an array. We start with an empty array here, so this is OK. The `default` is to `return` the `state` unmodified. Now, we need to go and register this reducer back in the `configureStore` file.

```js
import {FETCH_FULFILLED} from "./beersActions";

const initialState = { 
    date: [],
    loading: true
};

export function beersReducers(state = initialState, action) {
    switch (action.type) {
        case "FETCH_FULFILLED": {
            return {
                ...state
                loading: false, 
                data: action.payload
            }
        }
        default: return state; 
    }
}
```

Where we have this `appReducer` already, we can create another namespace, so to speak, pass in our `beersReducer`, and `import` it. Now that we have a place to store the data, we need to go back to the epic, and ensure that we dispatch the action, `FETCH_FULFILLED`, when we have the data.

#### configureStore.js
```js
import {createStore, combineReducers, applyMiddlewear, compose} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {fetchBeersEpic} from "./epics/fetchBeers";
import {beersReducers} from "./reducers/beersReducers";

export function configureStore() {

    const rootEpic = combineEpics(fetchBeersEpic);

    const epicMiddleware = createEpicMiddlewear();

    const rootReducer = combineReducers({
        app: appReducer,
        beers: beersReducers
    });
```

If we go back to `fetchBeers.js`, we can simply `map` the `response`. We'll `import` that from `rxjs/operators`, `map` the `response`, which in our case will just be an array, into the `action` that has a `type` of `FETCH_FULFILLED`. We'll create a function to help us do this. These are known as action creators.

#### fetchBeers.js
```js
import {ajax} from "rxjs/ajax";
import {ignoreElemends, map, tap} from "rxjs/operators";
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {
    return ajax.getJSON(API).pipe(
        map(resp => )
    )
}
```

In our case, we accept some `beers`, and we `return` the `type`, `FETCH_FULFILLED`, and a `payload` of `beers`. 

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";

export function fetchFulfilled(beers) {
    return { 
        type: FETCH_FULFILLED,
        payload: beers
    }
}
```

Now, we can use this function from within our epic, call it in `fetchBeers`, and we pass along the `response`. `Import` it, and now, if we go to the browser, we should be able to see the full life cycle.

#### fetchBeers.js
```js
import {ajax} from "rxjs/ajax";
import {ignoreElemends, map, tap} from "rxjs/operators";
import {fetchFulfilled} from "../reducers/beersActions";
const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic() {
    return ajax.getJSON(API).pipe(
        map(resp => fetchFulfilled(resp))
    )
}
```

If you go to the Redux dev tools, you can see that we got a `fetchFulfilled` event. As the payload, it was an array of beers. The difference it made to the state was that the data property now contains those beers, and loading was set to false.

![Redux DevTools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-immediately-fetch-data-from-an-api-on-page-load-fetchfulfilled-redux-devtools.png)

[05:33] We fetch the data from the network. This produces a stream that has a single element in it being the response. We take that response, and we map it into an action, which just has this shape. This then ends up inside our `beersReducer`, and we save the data to the store.

To view that data in a `component`, let's create a `beersList`. This component is going to get these two properties from the store via this `connect` method that we've imported here from `react-redux`, and we use it to wrap our components.

#### BeersList.js
```js
import {connect} from "react-redux";

export function BeerList(props) {
    const {data, loading} = props;
    return (
        <div>
            {loading && (
                <p>Please wait...</p>
            )}
            {!loading && (
                <div>
                    <p>Got {data.length} beer(s)</p>
                </div>
            )}
        </div>
    )
}

export default connect(state => state.beers)(BeerList);
```

This selector function here gets access to the entire `state`, and we just pull off the `beers` property. This part is coming from where we configured the store, we said that `beers` here is responsible for the state under the `beersReducer`.

Now, we can use this component from within our application component. Get rid of all of the header, just put the `<BeerList />` in there. Actually, that's going to `import` the named export, which is not the Redux-connected version of the component.

#### App.js
```js
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import {BeerList} from "./components/BeersList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BeerList />
            </div>
        );
    }
}
```

If we go to `BeersList`, you can see we have two exports, the component itself, and then the connected version as the default. We just need to make sure that we use the Redux-connected version like that.

```js
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux";
import BeerList from "./components/BeersList";
```

If we view it in the browser, you can see that we got 25 beers, the `fetchFulfilled` happened. 

![25 Beers displayed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-immediately-fetch-data-from-an-api-on-page-load-25-beers-displayed-in-browser.png)

We can see that the network request gave us the response that we expected.

![Network Request](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-immediately-fetch-data-from-an-api-on-page-load-netwok-request-response.png)