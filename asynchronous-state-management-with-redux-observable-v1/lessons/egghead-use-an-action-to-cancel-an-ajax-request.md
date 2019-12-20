Results from this search box take a few seconds to appear on screen. That's because in the code, we've added this artificial `delay` just to simulate what it might be like in the real world on a slow connection. In that case, we want to allow the user to opt out of the current search by clicking a button.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(search(payload)).pipe(
                    map(resp => fetchFulfilled(resp)),
                    delay(5000),
                    catchError(err => {
                        return of(fetchFailed(err.response.message));
                    })
                )
            )
        })
    );
}
```

First, we'll model the data in our `reducer` and copy this `SET_STATUS` and make a new `case` for `CANCEL`. When a cancel action comes through our store, we're going to set the `status` back to `idle` and then clear any `previous` messages.

#### beersReducers.js
```js
export function beersReducers(state = initialState, action) {
    switch (action.type) {
        case SET_STATUS: { 
            return {
                ...state, 
                status: action.payload, 
            }
        }
        case CANCEL: { 
            return {
                ...state, 
                status: "idle", 
                messages: []
            }
        }        
```

We need to create this `constant` and the action creator for it. We'll come in `beersActions`, copy that. If we go down to `fetchData`, we can just copy that. 

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
export const CANCEL = "CANCEL";

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
```

Back in the reducer, we can now `import` it. Now we have the data model for it, we can go into our component.

Just next to the search box, where we have this `spinner`, we can add another element here, which will just be a `<button>` that says, `Cancel`. When clicked, it will call the `cancel` function. This will come from our `props`. We'll get that by passing it in down here. We'll `import` that from our action creators.

#### Beers.js
```js
import react from "react";
import {connect} from "react-redux";
import {BeerList} from "./BeersList";
import {cancel, search} from "../reducers/beersActions";

export function Beers(props) {
    const {data, messages, status, search, cancel} = props;
    return (
        <>
            <div className="App-inputs">
                <input
                    type="text"
                    placeholder="Search beers"
                    onChange={(evt) => search(evt.target.value)}
                />
                {status === "pending && (
                  <>
                    <button type="button" onClick={cancel}>Cancel</button>
                    <span className="App-spinner">
                        <img src={"/ajax-loader.gif"} />
                    </span>
                  </>
                )}
              </div>
              {status === "success" &&(
                  <div className="App-content">
                      <BeerList beers={data}/>
                  </div>
              )}
              {status === "failure" &&(
                  <div className="App-messages">
                    <p>Oops! {messages[0].text}</p>
                  </div>
              )}
        </>
    )
}

export default connect(state => state.beers, {search, cancel})(Beers);
```

Now when a search is taking place, we'll go into this `pending` state and show this `<button>`. When clicked, we call the `cancel` function, which will dispatch this action, put us back into an `idle` state, and clear any `messages`. Let's see what it looks like so far in the browser. Create a search. Click cancel.

We're still seeing elements on the screen. What's happened there? If we go into our Redux store, you can see that we have dispatched the cancel action, which set the state to idle, but the `FETCH_FULFILLED` from the AJAX request still occurred, which set the status back to success with some data.

This is where we need to go back to the epic and use the click action to cancel the AJAX request. As always, in Rx, the way to solve this is through composition. We can use one stream or one observable to cancel another.

In our case, this is the observable that is producing the data from the API. If it takes a long time, like we've got this fake `delay` here, we want the `cancel` action to prevent this from dispatching an action into the store.

We can do that with `takeUntil`. It's another Rx operator that we can import. This accepts as a parameter another observable. We can use that `action$` stream that we have here. We can say `ofType`. This time, we're going to listen to the `CANCEL` action. We'll `import` that constant. That's it.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(search(payload)).pipe(
                    delay(5000),
                    takeUntil(action$.pipe(ofType(CANCEL))),
                    map(resp => fetchFulfilled(resp)),
                    catchError(err => {
                        return of(fetchFailed(err.response.message));
                    })
                )
            )
        })
    );
}
```

The way `takeUntil` works is that it accepts any observable here, regardless of what type of value it produces. All it does is internally, it will subscribe to this observable. If it ever produces an element, then it will unsubscribe to its source, in this case, whatever comes before it.

The real beauty of this approach though is all the things we're getting for free. For example, subscribing to this observable is not something we have to do manually. This will just happen at the right time.

Not only that, but if this does produce a value, `takeUntil` will ensure that we unsubscribe to this one as well. It will only take one item. Also, the thing you end up unsubscribing to, in this case, the AJAX request, that will execute its teardown logic.

In the case of an AJAX request, that will mean canceling it, but it could equally be you listening to an event emitter or some other DOM API that has any logic to do with unsubscribing or removing an event listener or anything else.

Let's just check it all in the browser. If we perform a search, cancel it, you can see that we get this `CANCEL` action in the store. It sets us back to an idle state. We no longer get the `FETCH_FULFILLED`. That's because the AJAX request was unsubscribed to before it could complete, thanks to this `takeUntil`.
