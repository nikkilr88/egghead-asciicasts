We have a test here for an application, but it's really only exercising a single happy path. We are stubbing the `getJSON` method and returning a simple piece of data. If we look inside the epic, that means that this part always returns some data, which means we'll end up here `map response`. We never, ever get inside this `catchError`.

It's extremely important that this `catchError` function exists. Should an error message occur, we need to ensure that we catch that error so that we can show a nice message to the user. Let's return an `EMPTY` observable here, just to prove that our test will still pass. If an error did occur inside the application now, the user would never know about it.

#### fetchBeers.js
```js
const ajax$ = getJSON(search(config.apiBase, config.perPage, payload)).pipe(
    map(resp => fetchFulfilled(resp)),
    catchError(err => {
        return EMPTY;
    })
);
```

Let's write a test to handle this case. Let's rename this one to say that this handles the `success` case. We're just going to copy/paste for now. Of course, you can abstract this into some test helpers if you'd like. We're going to deal with the `error` case.

#### fetchBeers.test.js
```js
it("produces correct actions (success)", function() {
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

it("produces correct actions (error)", function() {
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

It says we have two passed, two in total. The action will stay the same. The state stays the same. The thing we're going to change is that we're not going to produce an element in our `dependencies`. We are instead going to throw an error. The way we do that is we give a hash sign. We remove the values. We can just give that as `null`. The third argument here will be the value of the error.

```js
    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', {
            a: search("ship")
        });
        const state$ = of({
            config: initialState
        });
        const dependencies = {
            getJSON: (url) => { 
                return cold ('-#', null, {

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

We happen to know that should the AJAX request produce an error, it'll have a `response` key. We know that the API we're dealing with has a `message`. We can just say, `"oops"`. That will simulate an error in this `getJSON` method.

```js
const dependencies = {
    getJSON: (url) => { 
        return cold ('-#', null, {
            response: { 
                message: "oops!"
            }
        })
    }
};
```

We should assert what we expect. We would still expect to go into a `pending` state first. Here in `b`, we would expect a failure. We'll `import` the `fetchFailed` action creator. Looking at its signature, we just send through a `message`. It's going to be the same `message` as `"oops!"`.

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('500ms ab', {
    a: setStatus("pending"),
    b: fetchFailed("oops!")
})
```

That's what we expect. We still get the failure here, just how we wanted it to be. This failure in particular is showing us that we only have one item produced. We expected two. 

Go back to our epic and undo that.

#### fetchBeers.js
```js
const ajax$ = getJSON(search(config.apiBase, config.perPage, payload)).pipe(
    map(resp => fetchFulfilled(resp)),
    catchError(err => {
        return of(fetchFailed(err.response.message));
    })
);
```

Now you can see it passes.

![Everything passes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-simulate-network-errors-within-tests-test-passed.png)