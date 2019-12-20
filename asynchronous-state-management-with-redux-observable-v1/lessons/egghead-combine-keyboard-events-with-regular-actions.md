This application allows users to cancel a search request by clicking the cancel button. If we want to allow them to cancel it using the escape key as well, we can do that within the epic.

This is where the Ajax request is created. We have this line "`takeUntil(action$.ofType(CANCEL))`." Since `takeUntil` just accepts any observable, our first approach might be to merge this with an observable of key presses. Let's try that.

Let's remove that. Inside here, we'll call it `blocker$` That's going to be a `merge` of the stream of `action$`, the have `ofType CANCEL`, and `fromEvent`, which we can `import from RxJS`.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {

            const blocker$ = merge(
                action$.pipe(ofType(CANCEL)),
                fromEvent()
            );

            return concat(
                of(setStatus("pending")),
                ajax.getJSON(search(payload)).pipe(
                    delay(5000),
                    takeUntil(),                
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

We'll give the current `document`. We're going to listen for any `keyup` event, but we need to `filter` that to only be `escape` keys. We can do that like so.

```js
const blocker$ = merge(
    action$.pipe(ofType(CANCEL)),
    fromEvent(document, "keyup").pipe(
        filter(evt => evt.key === "Escape" || evt.key === "Esc")
    )
);
```

Now `blocker$` here, this is going to be an observable that produces elements from both of these streams. If we give that to `takeUntil`, this would be the first attempt. Let's go to the browser to see why it's not quite right.

```js
takeUntil(blocker$),
```

If we perform a search...After a second now, I'm going to press the escape key on my keyboard. I've pressed the escape key. Now we're in this weird state.

We're not getting the data back. The network request has been canceled. The last action to be dispatched into the store was this `SET_STATE` as pending. Let's go back to our epic and see what's wrong.

The problem is that this is occurring. Then `takeUntil` is canceling this part. Because there is no action associated with the keyboard event, there's no way of putting the UI back into an idle state.

Really, what we want to say is `takeUntil` this observable produces a value. If it does produce a value, then dispatch this other action instead. We can do that with Rx. First, let's model that in the `beersReducer`.

Right now, when the `CANCEL` action is seen, we set ourselves into an `idle` state. Let's change that to be a `RESET` instead. We want our epic to be in charge of dispatching the actions that will change the `state` rather than just listening to that `CANCEL` method which is being fired from the user interface.

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
        case RESET: { 
            return {
                ...state, 
                status: "idle", 
                messages: []
            }
        } 
```

We'll change that to `RESET`. 

```js
import (RESET, FETCH_FAILED, FETCH_FULFILLED, SET_STATUS) from "./beersActions";
```
We'll add it here in `beersActions`. Now we have this, that we can use inside the epic to reset the UI when we see fit. 

#### beersActions.js
```js
export const FETCH_FULFILLED = "FETCH_FULFILLED";
export const FETCH_FAILED = "FETCH_FAILED";
export const SET_STATUS = "SET_STATUS";
export const FETCH_DATA = "FETCH_DATA";
export const SEARCH = "SEARCH";
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
```

Back in the epic, any values that are produced from here, we don't want the actual value. Rather,we want to map it into the action reset.

We can `pipe` anything from here into `mapTo`. Then we can just call `reset`. Import `mapTo` and import the action creator. It's still not going to work as we expect because `takeUntil` will not pass on the elements produced by this observable. It's only listening for them using it as a way to cancel previous observables.

#### fetchBeers.js
```js
const blocker$ = merge(
    action$.pipe(ofType(CANCEL)),
    fromEvent(document, "keyup").pipe(
        filter(evt => evt.key === "Escape" || evt.key === "Esc")
    )
).pipe(mapTo(reset()));
```

We need a totally different approach. Let's remove `takeUntil`. Let's extract this part out. We'll call this the `ajax$`. Now we have these two observables. This one will produce actions of type either `fetchFulfilled` or `fetchFailed`.

```js

const ajax$ = ajax.getJSON(search(payload)).pipe(
    delay(5000),
    map(resp => fetchFulfilled(resp)),
    catchError(err => {
        return of(fetchFailed(err.response.message));
    })
)

const blocker$ = merge(
    action$.pipe(ofType(CANCEL)),
    fromEvent(document, "keyup").pipe(
        filter(evt => evt.key === "Escape" || evt.key === "Esc")
    )
).pipe(mapTo(reset()));

return concat(
    of(setStatus("pending")),
)
```

This one is going to produce actions of type `RESET`. When you think about it, what we really want them to do is have a race. We want to subscribe to both of these. The one who emits a value first, we want that to cause the other one to be unsubscribed to.

For example, if we subscribe to both of these at the same time, neither are going to produce any values immediately. If the escape key is pressed before we get here, we want to cause this to be unsubscribed to.

Likewise, if the Ajax request completes successfully and we get a `fetchFulfilled` or if we get a `fetchFailure`, we want to unsubscribe to this because we no longer care about keyup events or cancellations.

The crucial part here is that when we get values from one, it causes the other to be unsubscribed. It's the reason why we don't have to manually bind or unbind event handlers for this keyup.

This will be unsubscribed to if the Ajax request produces a value. It means that this will execute its unsubscribe logic. In the case of a keyup, it will just be removing an event listener.

We can achieve this in Rx using `race`. We need to `import` that from `Rx`, not Rx operators. Then we can pass along `Ajax$` and `blocker$`. `Race` takes any number of observables and does exactly what we just said. It will subscribe to them all. The moment one of them starts producing values, it will unsubscribe to all the others.

```js
return concat(
    of(setStatus("pending")),
    race(ajax$, blocker$)
)
```

In the browser, what we expect to see is that we can still click the cancel button, which will produce this action, or we can press the escape key. Either one will result in another action called `reset`. That's the one we're now using in the `reducer` to put the UI back into an `idle` state.

[If we begin a search and press the escape key, you can see that we just get the reset. We did begin the Ajax request. Then we followed up with this reset. If I press the cancel button, again, we started the Ajax request. Then we sent a cancel event through the UI, which ended up resulting in a reset.
