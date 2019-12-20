Considering how simple this application looks, it's actually rather complex. On every keystroke we're emitting actions, we are filtering them, debouncing them, another filter. We are combining with the streams, making AJAX requests, handling success, handling failure.

Also allowing all of the above to be canceled via click or canceled via an escape key. If any of those happen, we map those into a different action. Then we're setting the status and we're allowing those two streams there to race against each other.

This is a non-trivial piece of code. Watch how easily I can break this. If I just spell this incorrectly, and granted, this could be solved by using a constant or a type system, but I'm just trying to show how an error like that can only be picked up in the application when the loading spinner didn't show there.

If this had taken five seconds to come back and there was no loading spinner, the user may have thought this application was broken. Likewise, we could return data in the wrong format. For example, this `fetchFulfilled` which creates an action that is responsible for saving the data into the store, if we were to do something simple like wrap that in an array, again we're going to get a complete failure.

Even though we're doing all these asynchronous things and we've got time involved, the fact that we're using Rx means that even this is still relatively easy to test. If we think about what an epic does, at its most fundamental level it's just a function that accepts three parameters, and it returns a stream that produces actions.

Providing we have a way to actually call this function with these three items, then we could assert on the values that get produced. Inside the epics folder, we'll create a file under `__tests__`. We'll say `fetchBeers.test.js`. Now we can give ourselves some room here and bring in our terminal. Since Create React App comes with Jest already set up for us, all we have to do is type `NPM test`.

#### terminal
```
npm test 
```

It's going to go into watch mode and it's basically saying that we don't have any tests yet, which is fine. Our first test can just be that `it("produces correct actions")`. We'll be using the `testScheduler` from RxJS, so we can `import` that. That comes from `RxJS/testing`.

#### fetchBeers.test.js
```js
import {TestScheduler} from "rxjs/testing";

it("produces correct actions", function() {
    const testScheduler = new TestScheduler((actual, expected) 
        expect(actual).toEqual(expected);
    });
})
```

We create a new instance of it and it gives us a callback with an `actual` and `expected` parameters. This is done so that you can adapt it to suit your testing framework. For example, in Jest we have this global `expect`, what we're doing here is we're teaching the `testScheduler` how to compare two objects.

Next, we call the `run` method on the `testScheduler`. This gives us a callback with access to these helpers for `hot` observables, `cold` observables, and for this `expectObservable`. We'll see what those are used for in a moment.

```js
import {TestScheduler} from "rxjs/testing";

it("produces correct actions", function() {
    const testScheduler = new TestScheduler((actual, expected) 
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {

    })
})
```

If we look back out at epic, what we said is that we just have these three items. We need to create these. We'll have an `action$` stream, a `state$` stream, and some `dependencies`. The `action$` stream will be a `hot` observable, just produces a single element.

```js
import {TestScheduler} from "rxjs/testing";

it("produces correct actions", function() {
    const testScheduler = new TestScheduler((actual, expected) 
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a')
        const state$ = ;
        const dependencies = {};
    })
})
```


That element will be the `search` action so we can reuse the action creator. We'll give it a value of `ship` as though we just typed that into the user interface. This is using the marble diagrams from RxJS. We could have had some frames before this, but I'm just going to say that it produces an element immediately.

```js
import {TestScheduler} from "rxjs/testing";
import {search} from "../../reducers/beersActions";

it("produces correct actions", function() {
    const testScheduler = new TestScheduler((actual, expected) 
        expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('a', {
            a: search("ship")
        });
        const state$ = ;
        const dependencies = {};
    })
})
```

Next, for the `state$,` inside our epic we only actually use the `config` from the `state$`. That comes from the `initialState` from within our `configReducer`. Why don't we `export` this so that we can reuse this `initialState` in our test? 

#### configReducer.js
```js
import {SET_CONFIG} from "./configActions";

export const initialState = { 
    apiBase: 'https://api.punkapi.com/v2/beers',
    perPage: 10
};
```

`State$` will be an observable. We'll need to put the `config` key just like we do when we configure the store. This can be the `initialState`. That comes in from that `configReducer` that we just exported there.

#### fetchBeers.test.js
```js
import {TestScheduler} from "rxjs/testing";
import {search} from "../../reducers/beersActions";
import {of} from "rxjs";

it("produces correct actions", function() {
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
        const dependencies = {};
    })
});
```

Now, the part that we want to stop here is this `getJSON`, so that we don't actually have to make a network request. We can say that the `dependencies` are `getJSON`. This is a function that takes a `URL`, but we don't care about that.

```js
import {TestScheduler} from "rxjs/testing";
import {search} from "../../reducers/beersActions";
import {of} from "rxjs";

it("produces correct actions", function() {
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

            }
        };
    })
});
```

We're just going to `return` a `cold` observable that after one frame produces a value. The value it produces will just be an array, and we're just going to give it a `name` of `"Beer 1"`. We know this API always returns beers under an array. We don't care what the data is at the moment, just that it's roughly the right shape. Those are the three arguments for our epic.

```js
import {TestScheduler} from "rxjs/testing";
import {search} from "../../reducers/beersActions";
import {of} from "rxjs";

it("produces correct actions", function() {
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
    })
});
```

Now we can create an `output` stream which is the result of calling the `fetchBeersEpic`. We'll `import` that and we'll pass along `action$`, `state$`, and `dependencies`. 

```js
const dependencies = {
    getJSON: (url) => { 
        return cold ('-a', {
            a: [{name: "Beer 1"}]
        })
    }
};
const output$ = fetchBeersEpic(action$, state$, dependencies)
})
```

Now we can assert on the `output`. If we just nip back to the browser, if we type ship here just like in our test, go to the Redux store, you'll see that we get these four search events which we're using the `debounce` to guard against.

![Four search events](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/egghead-test-epics-with-marble-diagrams-four-search-events-redux-store.png)

Then we get a `SET_STATUS` and a `FETCH_FULFILLED`. In our test what we want to assert is that when a search happens, it matches this, that we see the following two actions be produced by the epic. To assert that we use the `expectObservable` helper that we're given in `testScheduler`. We pass in our `output$`. This will subscribe to the `output$` and allow us to assert on what it produces. We can do that in the marble format again.

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('')
```

As a first attempt, let's just say we produce two values, `A` and `B`. Those two values should be a `setStatus` action. Again, we're reusing the action creators here. We should `setStatus` `"pending"`, then we should follow up with a `fetchFulfilled`, which should match the `getJSON` stub that we have here. We'll just copy paste that in there. 

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('ab', {
    a: setStatus("pending"),
    b: fetchFulfilled([{name: "Beer 1"}])
  })
})
```

You see we get an error.

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-test-epics-with-marble-diagrams-output-error.png)

We expected to see a value at `"frame": 0` which is what this marble diagram denotes here in `toBe`. Actually, what we received was an event of `"frame": 500`. Why was that? If you look here, because we're using `debounceTime`, it means that we'll see a window of `500` milliseconds before any events.

The marble diagrams actually have a feature where you can say `500ms` and put a space. The space doesn't do anything other than separate the thing on the left with the thing on the right. Then we get a pass. 

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('500ms ab', {
    a: setStatus("pending"),
    b: fetchFulfilled([{name: "Beer 1"}])
  })
})
```

Let's make this fail a little bit so we can get a bit clearer on what's happening here.

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('500ms a-b', {
    a: setStatus("pending"),
    b: fetchFulfilled([{name: "Beer 1"}])
  })
})
```

If we put an extra frame in there and look at the difference, you can see that we expected 502. This is allowing us to skip ahead 500 milliseconds. This is on the 500 frame. This is 501 and this is 502. The reason we get a frame on 501 is because we have a 500 millisecond delay here. 

![Frames](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-test-epics-with-marble-diagrams-500-ms-frame.png)

Then in our stub we said that the AJAX request will come back after one frame. Now the test passes again.

```js
const output$ = fetchBeersEpic(action$, state$, dependencies)
expectObservable(output$).toBe('500ms ab', {
    a: setStatus("pending"),
    b: fetchFulfilled([{name: "Beer 1"}])
  })
})
```

This is an incredibly powerful framework for testing because with just one single test here, we've been able to execute all or the bulk of the logic concerning what is quite a complicated feature. Let's see if we can try to break it like we did earlier. If we were to make a spelling mistake here, the test is going to fail. Or, if we give data in the wrong format, the test is going to fail.
