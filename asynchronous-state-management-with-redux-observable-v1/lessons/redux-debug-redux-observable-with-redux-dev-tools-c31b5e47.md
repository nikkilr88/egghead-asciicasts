Add the packages `redux-observable` and `RxJs`. 

#### Terminal
```
npm i redux-observable rxjs
```

Let's start the development server. 

```
npm start
```

We need the place in our code where the store is configured. In our case, we have this function. Inside the `configureStore`, we can `import` from `redux-observable`, `combineEpics`, and `createEpicMiddleware`.

#### configureStore.js
```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";

export function configureStore() {
    const rootReducer = combineReducers({
        app: appReducer
    });

    return createStore(rootReducer);
}
```

Just like we had a `rootReducer` here, we're also going to create a `rootEpic`. That's going to be the result of calling `combineEpics` and passing in any number of epics within it.

```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";

export function configureStore() {

    const rootEpic = combineEpics()

    const rootReducer = combineReducers({
        app: appReducer
    });

    return createStore(rootReducer);
}
```

An epic in redux-observable is just a function that returns a stream of actions. The simplest one we could ever create would be to say `epic1` is equal to a function that returns, and we need to give a stream there.

```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";

const epic1 = () => of()

export function configureStore() {

    const rootEpic = combineEpics()

    const rootReducer = combineReducers({
        app: appReducer
    });

    return createStore(rootReducer);
}
```

We can create a stream of one element by using the `of` creation method from RxJs, and then we can return an object literal that has `type: "SET_NAME"` and the `payload` of `"Sally"`. Now, we have this epic, we can pass it along to `combineEpics`. The point here is that you'd be able to have any number of epics in `combineEpics`. For now, we'll stick with `epic1`.

```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";

const epic1 = () => of({type: "SET_NAME", payload: "Sally"});

export function configureStore() {

    const rootEpic = combineEpics(epic1)

    const rootReducer = combineReducers({
        app: appReducer
    });

    return createStore(rootReducer);
}
```

Now, we have our `rootEpic`, but redux-observable is a Redux middleware. We need to create that. We'll say we have an `epicMiddleware`. We don't pass any arguments to it. To register this middleware, the second argument to `createStore` can be a call to `applyMiddleware`. It comes from the redux package. We can just pass in our `epicMiddleware`.

```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";

const epic1 = () => of({type: "SET_NAME", payload: "Sally"});

export function configureStore() {

    const rootEpic = combineEpics(epic1)

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer
    });

    return createStore(rootReducer, applyMiddleware(epicMiddleware));
}
```

Once the store has been created, we need to initialize this `rootEpic`. The way we do that is, instead of returning the store immediately, we can just save this to a variable, then we call `epicMiddleware.run` and we pass in our `rootEpic`. Finally, we `return` the `store`.

```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

import {combineEpics, createEpicMiddleware} from "redux-observable";

const epic1 = () => of({type: "SET_NAME", payload: "Sally"});

export function configureStore() {

    const rootEpic = combineEpics(epic1)

    const epicMiddleware = createEpicMiddleware();

    const rootReducer = combineReducers({
        app: appReducer
    });

    const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

    epicMiddleware.run(rootEpic);

    return store; 
}
```

To recap, we already had a Redux store and our `rootReducer`. We brought in `combineEpics` and `createEpicMiddleware` from `redux-observable`. We created a simple epic that just produces a stream of one single action. We created a `rootEpic` by combining any number of epics together. As it happens, we only had the one.

We created a separate `epicMiddleware` so that we could use the `applyMiddleware` function from Redux. That registers the redux-observable middleware. Then just before we `return` the `store`, we call `epicMiddleware.run` and pass in our `rootEpic`. This will initialize any of the epics that we have registered. Finally, we `return` the `store`.

To see how this action ties into Redux, let's go back to our `appReducer`, where we have this default value of `name: "Shane"`. We'll add a `switch` statement and we'll `switch` on the `type`. If we see `"SET_NAME"`, then we'll `return` a spread of the previous `state`,and then the `name` being the `action.payload`. The `default` case is just to `return` the `state`. We no longer need the `return state`.

#### appReducer.js
```js
export function appReducer(state= {name: "Shane"}, action) {
    switch (action.type) {
        case "SET_NAME": {
            return {
                ...state,
                name: action.payload
            }
        }
        default: return state;
    }
}
```

Now, what we would expect to see is the Redux store to be initialized with this value, but since this will be called immediately and it will produce this action into the Redux store, we would expect to see this match and the name to be set to something else.

We can go to our `app.js` and just `console.log(this.props name)`. 

#### App.js
```js
class App extends Component {
    render() {
        console.log(this.props.name);
```

You can see that we actually get Sally. 

![Sally](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/redux-debug-redux-observable-with-redux-dev-tools-c31b5e47-sally.png)

Just to make this clearer, if we were to add a `delay` here in `configureStore` -- like, let's say, two-second delay -- head back to the browser, you can see that it first logged Shane and, two seconds later, logged Sally. If we refresh again, you see Shane and Sally.

![Shane & Sally logged in with delay](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-debug-redux-observable-with-redux-dev-tools-c31b5e47-both-shane-and-sally-logged-in.png)