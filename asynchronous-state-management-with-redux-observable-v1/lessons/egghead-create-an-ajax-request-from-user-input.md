This `<button>` will currently `fetchData` when it is clicked. Let's remove that and replace it with an `<input>` field. We have a `type` of `text`, `placeholder` of `"Search beers"`. We register an `onChange` handler. When it fires, it will call the `search` function and pass along `value` from the text field.

#### Beers.js
```js
export function Beers(props) {
    const {data, status, search} = props;
    return (
        <>
            <div className="App-inputs">
                <input
                    type="text"
                    placeholder="Search beers"
                    onChange={(evt) => search(evt.target.value)}
                />
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
```

`Search` will come through on our `props`. We can replace this `fetchData` with `search`. We just need an action creator for it. We'll copy this `fetchData`. We'll say this is just called `search`. Change this for `SEARCH`. Change those. Get rid of that. Then we can `import` that function we just created.

```js
import react from "react";
import {connect} from "react-redux";
import {BeerList} from "./BeersList";
import {fetchData} from "../reducers/beersActions";

export function Beers(props) {
    const {data, status, search} = props;
    return (
        <>
            <div className="App-inputs">
                <input
                    type="text"
                    placeholder="Search beers"
                    onChange={(evt) => search(evt.target.value)}
                />
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

export default connect(state => state.beers, {search})(Beers);
```

We just need an action creator for it. We'll copy this `fetchData`. We'll say this is just called `search`. Change this for `SEARCH`. Change the export constant to `SEARCH`. Get rid of that. Then we can `import` that function we just created.

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";

export function fetchFulfilled(beers) {
    return {
        type: FETCH_FULFILLED,
        payload: status
    }
}

export function setStatus(status) {
    return {
        type: SET_STATUS,
        payload: status
    }
}

export function search() {
    return {
        type: SEARCH
    }
}
```

Every time the `<input>` value changes, we will call this `search` function, which is our action creator that we registered here. This will dispatch this action into the Redux store. Let's go and verify that in the browser.

If we try to search for "IPA," you can see we get three search events dispatched into the Redux store. We can go and handle that in our epic. 

![Three search events](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-create-an-ajax-request-from-user-input-three-search-events-browser.png)

You can see we were previously looking at this `FETCH_DATA` action. Let's change that for `SEARCH`.

#### fetchBeers.js
```js
import {ajax} from "rxjs/ajax";
import {map, switchMap} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, of} from "rxjs";

const API = "https://api.punkapi.com/v2/beers";

export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        switchMap(() => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(API).pipe(
                    map(resp => fetchFulfilled(resp))
                )
            )
        })
    );
}
```

Because `search` has a `payload`, we'll be able to destructure that in here. This will now be equal to the value that the user typed in the search box. 

```js
export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        switchMap(({payload}) => {
```

We need to go back into the `beersActions.js` and actually add that in our export search function. This action will have a type of `search`, but it will have a `payload` of whatever is produced in our `search` from the `onChange` handler in `Beers.js`.

#### beersActions.js
```js
export function fetchData() {
    return { 
        type: FETCH_DATA
    }
}

export function search(input) {
    return {
        type: SEARCH,
        payload: input
    }
}
```

`Search` has a `payload`. We can destructure it inside this `switchMap`. Then we can use it to build up the search URL. For this particular API, searching is just a case of appending a query parameter.

We can create a small helper function, `search`, that takes the `term`, being what the user typed in the box, and concatenates the API string above with this query parameter, `beer_name`. Then we just `encode` the `term` to ensure it's a valid URL.

#### fetchBeers.js
```js
import {ajax} from "rxjs/ajax";
import {map, switchMap} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, of} from "rxjs";

const API = "https://api.punkapi.com/v2/beers";
const search = (term) => `${API}?beer_name=${encodeURIComponent(term)}`;

export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        switchMap(({payload}) => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(API).pipe(
                    map(resp => fetchFulfilled(resp))
                )
            )
        })
    );
}
```

Now, when we call `getJSON` in `return concat`, we don't call the API directly. Instead, we call the `search` function and pass through the `payload`. 

```js
import {ajax} from "rxjs/ajax";
import {map, switchMap} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, of} from "rxjs";

const API = "https://api.punkapi.com/v2/beers";
const search = (term) => `${API}?beer_name=${encodeURIComponent(term)}`;

export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        switchMap(({payload}) => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(search(payload)).pipe(
                    map(resp => fetchFulfilled(resp))
                )
            )
        })
    );
}
```

Let's check that out in the browser. We go in here and just type a single letter. You can see that we get some search results. We set the status to pending. We were successful.

![Search results in browser successful](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-create-an-ajax-request-from-user-input-search-results-in-browser.png)

If we check the network panel, you can see that we created this URL, where we had the regular API and then we appended "beer_name=s," "s" here being what we typed here.

![Network Panel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-create-an-ajax-request-from-user-input-network-panel-beer_name-s.png)

If we fill this out, you can see it made a number of network requests. They were canceled mid-flight. We finally made one with school there. This feature of canceling in-flight requests is something we get for free because we used `switchMap`.

![Network Request Canelled Mid-Flight](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986028/transcript-images/egghead-create-an-ajax-request-from-user-input-network-request-cancel-mid-flight.png)

Because this action fires for every keystroke, we end up executing this function once for each action. That means that an AJAX request begins, but before it can complete, another action comes through. What `switchMap` does is it will unsubscribe to whatever you returned here. Then it will execute the function again, creating a new request.

To recap, we are now making an AJAX request to this API by appending a query parameter with a `search` term that we got from this `payload`. The `payload` comes because in the action creator for `search`, we sent through some `<input>`. That originally comes from the `evt.target.value` on this `<input>` field.
