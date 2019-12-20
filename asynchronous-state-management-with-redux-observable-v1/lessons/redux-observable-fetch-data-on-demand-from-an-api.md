This epic will cause this API to be called immediately on page load. If instead we want to fetch the data on demand, we'll need a slightly different approach.

If we look at the `reducer` where the data is going to be stored,let's change `loading` here from instead being just a simple flag to being a `status` instead, a status that can have multiple different values. We want to enable the epic to be able to set this status based on what it's doing.

#### beersReducers.js
```js
import {FETCH_FULFILLED} from "./beersActions";

const initialState = {
    data: [], 
    status: "idle" // "idle" | "pending"| "success" | "failure";
};

export function beersReducers(state = initialState, action) {
    switch (action.type) { 
        case FETCH_FULFILLED: {
            return {
                ...state,
                loading: false, 
                data: action.payload
            }
        }
        default: return state;
    }
}
```

If we add another `case` in here, and we'll have this `SET_STATUS` constant, which we can add here in `beersActions.js`, if we see an action of that type, then we're just going to set the `status` to whatever came through. 

#### beersReducers.js
```js
import {FETCH_FULFILLED} from "./beersActions";

const initialState = {
    data: [], 
    status: "idle" // "idle" | "pending"| "success" | "failure";
};

export function beersReducers(state = initialState, action) {
    switch (action.type) {
        case SET_STATUS: { 
            return {
                ...state, 
                status: action.payload, 
            }
        }
        case FETCH_FULFILLED: {
            return {
                ...state,
                loading: false, 
                data: action.payload
            }
        }
        default: return state;
    }
}
```

We'll add an action creator for that. We'll just copy and paste this. We'll say this one is called `setStatus`. It receives the `status` and sends it through.

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";

export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: beers
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status
    }
}
```

That will allow the epic to set the `status` of that data. We also need something to actually trigger it. Let's add one more of these action creators that we'll call `fetchData`. It won't take any parameters, so there will be no `payload`. We can just add it up top. This is something that one of our components will call that produces an action of type `FETCH_DATA`.

```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";

export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: beers
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
```

Now in the epic, instead of making this AJAX request immediately on page load, we can do it in response to that action. Every epic that you register with Redux Observable gets access to a stream of `actions`. This is every action that happens in the Redux store. We can `return action$.pipe`.

#### fetchBeers.js
```js
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";
import {fetchFulfilled} from "../reducers/beersActions";

const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic(action$) {

    return action$.pipe(

    );

    return ajax.getJSON(API).pipe(
        map(resp => fetchFulfilled(resp))
    )
}
```

Then we want to filter this stream so that we're only responding to `actions` of that particular type. We could actually use the regular filter from RxJS, but Redux Observable actually has a helper to do this for us. It's just the function `ofType` that we can import. Here we can give any number of string arguments.

```js
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";
import {fetchFulfilled} from "../reducers/beersActions";

const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic(action$) {

    return action$.pipe(
        ofType("")  
    );

    return ajax.getJSON(API).pipe(
        map(resp => fetchFulfilled(resp))
    )
}
```

In our case though we have this `FETCH_DATA` constant that we want to use, so we can just say `ofType(FETCH_DATA)`. When that action occurs, we want to do a `switchMap`. Again, `import` that from RxJS operators. Looking back at our `reducer`, we want to set our `status` to be `pending` before the AJAX request happens. We can `concat` and we'll `import` this from `RxJS`, not from operators.

```js
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";
import {FETCH_DATA, fetchFulfilled} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat} from "rxjs";

const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic(action$) {

    return action$.pipe(
        ofType("FETCH_DATA") 
        switchMap(() => {
            return concat(

            )
        }) 
    );

    return ajax.getJSON(API).pipe(
        map(resp => fetchFulfilled(resp))
    )
}
```

This is a higher order observable that takes other observables. Because we want to first produce an action that sets the status. We'll `import {concat, of} from RxJS` as well. Then if we go to our action creators, we have this `setStatus`. We'll call that and we'll say that we're currently `pending`. Now we can just grab the previous thing that we had and give that as a second parameter to `concat`.

```js
import {ajax} from "rxjs/ajax";
import {map} from "rxjs/operators";
import {FETCH_DATA, fetchFulfilled} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, of} from "rxjs";

const API = 'https://api.punkapi.com/v2/beers';

export function fetchBeersEpic(action$) {

    return action$.pipe(
        ofType("FETCH_DATA") 
        switchMap(() => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(API).pipe(
                    map(resp => fetchFulfilled(resp))
                )
            ) 
        });
    );
}
```

For every action that has the type `FETCH_DATA`, this function will be executed. We're returning an observable that is first going to produce an action of `setStatus("pending")` and is then going to follow up with an AJAX request that if successful will map its response into another action called `fetchFulfilled`.

We can check the browser now to verify that we are no longer fetching the beers automatically. To trigger the AJAX request, let's add a new component. We'll just call this `beers.js`. This is going to be responsible for dispatching actions back into the Redux store as well as retrieving data from it.

We `export` a component called `Beers` and we access its `props`. We get `data` and `status` from here because we wrapped the component in a call to `connect` and we selected the `beers` namespace from the Redux store. Inside the component we have the `inputs`, which is going to be a `<button>` that will be `disabled` when the `status` is `pending`.

#### Beers.js
```js
import React from "react";
import {connect} from "react-redux";

export function Beers(props) {
    const {data, status} = props;
    return (
        <>
            <div className="App-inputs">
                <button type="button" disabled={status === "pending"}>
                    Fetch Beers!
                </button>
                {status === "pending && (
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} />
                    </span>
                )}
              </div>
              {status === "success" &&(
                  <div className="App-content">
                      <pre><code>{JSON.stringify(data)}</code></pre>
                  </div>
              )}
        </>
    )
}

export default connect(state => state.beers)(Beers);
```

In the epic, the first thing we do is dispatch this action of `pending`. That will go into the `reducer` here, the `status` will become `pending`. In this component it means this `<button>` will then be `disabled`. We need to add an `onClick` handler. What should we do `onClick`? In the `beersActions` we have this `fetchData` action creator.

```html
<button type="button" onClick={} disabled={status === "pending"}>
    Fetch Beers!
</button>
```

If we go down to the `connect` method, the second argument here can be an object literal that contains functions. If you give it like that, React Redux will add `fetchData` as a `prop`. When we call it, it will dispatch that action into the store. We can just give `fetchData` in `onClick`.

```js
import React from "react";
import {connect} from "react-redux";

export function Beers(props) {
    const {data, status, fetchData} = props;
    return (
        <>
            <div className="App-inputs">
                <button type="button" onClick={fetchData} disabled={status === "pending"}>
                    Fetch Beers!
                </button>
                {status === "pending && (
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} />
                    </span>
                )}
              </div>
              {status === "success" &&(
                  <div className="App-content">
                      <pre><code>{JSON.stringify(data)}</code></pre>
                  </div>
              )}
        </>
    )
}

export default connect(state => state.beers{fetchData})(Beers);
```

When we go into a `pending` state, we're also going to show this `spinner` which is just using a file in this public directory. Then if our `status` ends up being `success`, then at the moment we are just outputting the data onto the screen. 

What we can do is repurpose this `BeerList` to be a completely stateless component and just output the list.

```html
<div className="App-content">
    <BeerList />
</div>
```

If we go to this `BeerList`, it no longer needs to be connected to the Redux store. We can remove this line all together. We'll just replace the body with a very simple list that maps over the beers and outputs them with a thumbnail. 

#### BeersList.js
```js
import React from "react";

export function beerList(props) {
    const {data, loaing} = props;
    return (
        <li key={beer.id} className="List-item">
            <figure className="List-item-img">
                <img src={beer.image_url} />
            </figure>
            <div className="List-item-info">
                <p>{beer.name}</p>
                <ul>
                    <li><small>ABV: {beer.abv}</small></li>
                    <li><small>Volume: {beer.volume.unit} {beer.volume.unit}
                </ul>
            </div>
        </li>
    )
})}
``` 

Now I have this component that's in charge of dispatching actions and deciding on what status the data is in. If we get to success, we render the list.

If we go and see how this looks in the browser, we can see we get this error. 

![Error in Browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-fetch-data-on-demand-from-an-api-browser-error.png)

That's because back in `app.js` we are no longer using this `BeerList` as we see it, rather, we want this beer's component. We want the default export for it. 

We'll just say `Beers` from `Beers`. Change it in `<BeersList />`.

#### App.js
```jsx
import './App.css';
import {connect} from "react-redux";
import Beers from "./components/Beers";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Beers />
            </div>
        );
    }
}

export default connect(state => state.app)(App);
```

Refresh and now you can see we are presented with this button. We click the button, we get a loading spinner and we can see that we went from fetch data to set status to fetch fulfilled. We're not seeing our elements.

![Button, loading spinner, actions displayed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-fetch-data-on-demand-from-an-api-button-spinner-actions-in-browser.png)

This is where the dev tools really help us because I can see that here on a set status action we correctly set that to pending while the AJAX request was occurring. When it was successful, we're actually setting loading false. This isn't correct. We should have set status success here. Now we can go back into `beersReducer.js` and you can see that in `case FETCH_FULFILLED` we're setting `loading: false`, but instead, we should put `status: "success"`.

#### beersReducers.js
```js
case FETCH_FULFILLED:   
    return {
        ...state,
        status: "success",
        data: action.payload
    }
```

Now if we reload and hit Fetch Beers! again, now we see another error, cannot read property map of undefined. This is the type of error that you can prevent through things like React PropTypes or using a static type system like Flow or Typescript, but those are outside of the scope of this course.

For now, let's just check in `BeersList.js` we check `props.beers`. That means wherever we use this component we need to send through property called `beers`. In our case that's going to be the data that we get from `export function Beers`. 

#### Beers.js
```js
import React from "react";
import {fetchData} from "../reducers/beersActions";

export function Beers(props) {
    const {data, status, fetchData} = props;
    return (
        <>
            <div className="App-inputs">
                <button type="button" onClick={fetchData} disabled={status === "pending"}>
                    Fetch Beers!
                </button>
                {status === "pending && (
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} />
                    </span>
                )}
              </div>
              {status === "success" &&(
                  <div className="App-content">
                      <BeerList beers={data}/>
                  </div>
              )}
        </>
    )
}

export default connect(state => state.beers{fetchData})(Beers);
```

Try again and this time it works as expected.

![Beer list loads in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-fetch-data-on-demand-from-an-api-beers-list-loaded-in-browser.png)