Any application that uses external services should be able to handle errors that may occur. Let's see what happens in this application if we deliberately cause an error.

If we go back to the epic and remove this `filter`, which is stopping empty values from causing an Ajax request, and go back to the browser...If we first do a successful search and then delete all the characters, you can see that we got an API error, invalid query params.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        // filter(({payload}) => payload.trim() !== ""),
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

You can see the error down here. Everything has stopped. The app is now unresponsive. It doesn't matter that we actually faked the error. The point is that at this point, the application cannot handle a 400 error response from the API.

![Invalid Query Params Error in Browser after Commenting out Filter in Epic](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-handle-network-errors-gracefully-invalid-query-params-error.png)

The first step to solving this is to model the data in the reducer. If we open up this `beersReducers.js`, just below `FETCH_FULFILLED`, we'll add another `case` that can handle the `failure`. We'll say, `FETCH_FAILED`.

#### beersReducers.js
```js
        case FETCH_FULFILLED: {
            return {
                ...state,
                status: "success", 
                data: action.payload
            }
        }
        case FETCH_FAILED: {
            return {
                ...state,
                status: "failure",
                messages: [{
                    type: "error",
                    text: action.payload
                }]
            }
        }
```

In that case, we set the `status` to `failure`. We add an object here, to the `messages` array, as a `type` of `error` and `text` being the `payload`. This will allow us to pass the error from the API response back into the store.

```js
case FETCH_FAILED: {
    return {
        ...state,
        status: "failure",
        messages: [{
            type: "error",
            text: action.payload
        }]
    }
}
```

We need to create this `fetchFailed` constant. We'll need an action creator for it as well. We can just copy that and say, `fetchFailed`. We'll be sending through a `message`. We'll do that. We'll change this to `FETCH_FAILED`.

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";

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
```

Now that we have this `fetchFailed` constant, we can go back to our `reducer` and `import` it here. Since we are populating this array with an `error` message upon `failure`, we need to go to the `success case` and ensure that we clear that `message` just by setting it back to an empty array.

#### beersReducers.js
```js
case FETCH_FULFILLED: {
    return {
        ...state,
        status: "success", 
        data: action.payload,
        messages: []
    }
}
```

Now we've modeled the data in terms of the Redux store. Now we just need to go and handle that error. Since the error is coming from this Ajax response, directly after the `map`, we can catch the error. We use the `catchError` operator that we can `import` from `rxjs/operators`. This will give us access to that error.

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
                    catchError(err => {

                    })
                )
            )
        })
    );
}
```

`catchError` is interesting because not only does it give us access to this error here, it also allows us to return a new observable. This is just what we need because upon failure, we want to dispatch an action into the store that indicates that failure happened.

We can `return of`, which will be an observable of a single value in this case. We can use that action creator that we made, `fetchFailed`. We can pass along `err.response.message.` Now let's see what happens in the browser.

```js
catchError(err => {
    return of(fetchFailed(err.response.message));
})
```

If we cause the error by typing some characters and then deleting them all again, you can see that we do indeed get this network response, but notice we don't get the error thrown in our application.

If we check the Redux DevTools, we'll actually see that here we set the `status` to `pending`, meaning the Ajax request began. Then we got a `FETCH_FAILED` action. Because of the code we added in the `reducer`, you can see that it's updating the `status` to be in a `failure` and it's added a message to the `messages` array.

![Redux DevTools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-handle-network-errors-gracefully-fetch-failed-dev-tools.png)

The last thing left to do is to display the message here for the user. If we go to the bs component, you can see that we are currently accessing all of the state from the `beersReducers`. That means that we can just use the `messages` from export Beers function. Just below this check for `success` here, we can add another one to check for `failure`.

#### Beers.js
```js
import react from "react";
import {connect} from "react-redux";
import {BeerList} from "./BeersList";
import {search} from "../reducers/beersActions";

export function Beers(props) {
    const {data, messages, status, search} = props;
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
              {status === "failure" &&(
                  <div className="App-content">
                      <BeerList beers={data}/>
                  </div>
              )}
        </>
    )
}

export default connect(state => state.beers, {search})(Beers);
```

If there was a `failure`, then we'll just output the text from the first message. 

```js
{status === "failure" &&(
    <div className="App-messages">
        <p>Oops! {messages[0].text}</p>
    </div>
)}
```

Go back to the browser. Create the error again. Now you can see the error is displayed. It's no longer thrown here. The best part is that the app is still responsive, so we can begin searching again.

![Error displayed correctly and app responsive](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-observable-handle-network-errors-gracefully-error-displayed-in-browser-successfully.png)