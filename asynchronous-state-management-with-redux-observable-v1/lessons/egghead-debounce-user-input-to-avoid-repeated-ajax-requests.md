In this application, if I type a single character, it makes a network request to an API. It returns some data. We display it on the screen, which all looks good.

If I type "skull," it gives us one search result, but we had an additional four requests that we didn't need to make. Why is this happening? Back in the component, this `<input>` field has an `onChange` handler that for every change will call our `search` function.

This is an action creator that we have bound using React Redux. It ends up producing an action `ofType search`.

The way our epic works right now is that for every single action that comes through of this `type`, it makes it through to this `switchMap`, which will keep executing this function, returning no observables, and unsubscribing to previous ones until we get to the point that one completes and we end up with the search results here.

This can end up flooding a backend with API requests that are not really needed. Instead, what we'd like to do is wait for a small window of time where the user has stopped typing, then go off and make a network request there.

As they start typing again, we may want to cancel. The point is we shouldn't be making any requests at all if they are typing really quickly. This type of operation is what RxJS was designed for.

This particular problem can be solved with something called `debounceTime`. We'll import this from rxjs/operators. You see we place it directly after the `ofType` filter. This will handle filtering the action stream to only include actions `ofType` `search`.

#### fetchBeers.js
```js
export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
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

Then this will subscribe to that new stream, but it will have an internal timer. Every time it sees a value, it will reset its timer. The timer's based on the number we give here. It's in milliseconds.

What will happen here is if we only search for a single character, the element will make it into this observable. After `500` milliseconds, we'll make it down here.

If another action makes it through `ofType` `search` before our internal timer has elapsed and `debounceTime` resets, it drops the previous value. It waits to see if `500` milliseconds passes again.

This is what's known as a lossy strategy, meaning we're not aggregating anything. We're not keeping a buffer of any previous values. We're just waiting until this window of time has passed where there have been no events.

Only at that point we then emit the previous event that we saw. That's it. With a single line, we can go back to the browser. We can try the same experiment again. We try and search for "skull." You can see only got a single network request.

![Single Network Request](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-debounce-user-input-to-avoid-repeated-ajax-requests-skull-search-single-network-request.png)