This application has a test for the `success` case, where a `search` action triggers an Ajax request, which stopped the response here. We assert that we first get into a `pending` state, and then eventually, we get a `fetchFulfilled` action. That would be this event firing, eventually making an Ajax request, and this `fetchFulfilled` action being produced.

The second test handles the `error` case, where the Ajax request doesn't return any values, but rather it produces an error. That handles this case, so we can ensure that we're returning the correct action should an error occur.

The way this feature works is that the Ajax request is going to race against what we've called `blocker$`, meaning someone clicked `cancel`,or they pressed an escape key. If the Ajax request is in flight, and someone clicks `cancel`, it means this produces a value first.

The Ajax request will be unsubscribed, and it's the `reset` event that ends up being dispatched into the Redux store. How can we write a test for that? We'll start by copy-pasting again, and we'll rename this one to be the `reset` state.

#### fetchBeer.test.js
```js
it("produces correct actions (reset)", function() {
    const testScheduler = new TestScheduler((actual, expected) 
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', {
            a: search("ship")
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => { 
                return cold ('-a', {
                    a: [{name: "Beer 1"}]
                })
            }
        };
        const output$ = fetchBeersEpic(action$, state$, dependencies)
        expectObservable(output$).toBe('500ms ab', {
            a: setStatus("pending"),
            b: fetchFulfilled([{name: "Beer 1"}])
          })
      })
});
```

We get three past, because we haven't changed it yet. Now, we need to model what's going to happen with the actions. First, we're going to have an element produced on the first frame, which is the `search` action.

Then we're going to wait `500` milliseconds, `ms`, and then after another frame, we're going to produce a second value. We'll use the action creator, `cancel`. This is going to simulate a user clicking cancel before the Ajax request has come back.

```js
it("produces correct actions (reset)", function() {
    const testScheduler = new TestScheduler((actual, expected) 
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a 500ms -b', {
            a: search("ship")
            b: cancel()
        });
```

The state will remain the same, and for the Ajax request, we can just say that after three frames, it produces a value. It doesn't matter what the value is for this test, so we won't bother stopping it. Now, what do we expect to happen if this `cancel` event comes just one frame after that `500ms`?

```js
const dependencies = {
  getJSON: (url) => { 
      return cold('---a')
  }
};
```

We would expect `setStatus` to still be `pending` first, but then we would expect to see a `reset` event. Again, we can `import` that from our action creators. Now, we see an error. The error is not actually with our code, it's just the way we've written this.

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('500ms ab', {
    a: setStatus("pending"),
    b: reset([{name: "Beer 1"}])
})
```

You can see that the second element there is expected to be on frame 501, but it actually came on frame 502. That's because we've put this extra frame here in `cost action$`.

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-test-the-interaction-between-streams-error-with-extra-frame.png)

We need to denote that in our expectation. We put that in, the test passes.

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('500ms a-b', {
    a: setStatus("pending"),
    b: reset([{name: "Beer 1"}])
})
```

That enables us to test a very complicated flow. We can verify it's working by going back in `fetchBeers` and for example, we forget to add the `blocker$`. That test is going to fail. Or if we don't `map` it to the correct `reset` value -- let's say we mapped it to a cancellation by mistake -- then the test is going to fail.

To recap what we've done here, we're using the marble diagrams to describe what the `action$` stream looks like. It first produces a value, a, which is the `search` string. That causes this to kick off. Then we wait `500` milliseconds. That allows the `debounce` to elapse.

After that, we say that one frame later, we produce another value being canceled. This is the equivalent of this producing an element. Then we're asserting that our epic produces values. After `500` milliseconds, it should produce an `a`, which is a `setStatus("pending")`, which is this.

Then after one frame, which is the duration we've put here, it should produce a value, `b`, which we're saying should be a `reset` action. Which comes right back here, because now `blocker$` is going to win this race. It should produce a value from `action$.pipe(ofType(CANCEL))`, and it's mapped to `reset`.
