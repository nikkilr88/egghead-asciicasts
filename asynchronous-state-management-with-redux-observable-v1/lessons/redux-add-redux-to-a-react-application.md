To get started, we need a React app. We can use `npx` and the `create-react-app` package. The only argument we need is the name of the folder. We'll say `redux-observable`. Once that's complete, if we look, you can see it's given us this directory, `redux-obs`. Our application lives inside there.

#### Terminal
```
npx create-react-app redux-obs
```

If we look at the `package.json` file, it's given us some scripts like `start`, so we can run `npm start`. 

```
npm start
```

Then in the browser, you can see the splash screen. It's encouraging us to edit this file to verify everything's working. Let's do that.

![Splash Screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986026/transcript-images/redux-add-redux-to-a-react-application-splash-screen.png)

In the editor, we go to the source directory and find `app.js`. You can see this is the section of the code that we saw on screen. If we delete that, hit save, you can see that it's now gone in the browser, so everything is working.

#### App.js

![Highlighted Code to Delete in App.js](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-add-redux-to-a-react-application-code-section-to-delete-in-app-js.png)

Now we'll add two packages to use Redux with React. Stop the server for a moment and type `npm install redux and react-redux`. We'll start the server again.

#### Terminal
```
npm i redux react-redux
```

To use those packages, we open up `index.js`. Where we are rendering this `<App />` component, we'll wrap this in `<Provider>`. This is a component that comes to us thanks to the react-redux package, so we can `import` that. Now, any child component will have access to the `store` that we give here in `<Provider>`.

#### index.js
```js 
import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={}>
        <App />
    </Provider>
    , document.getElementById('root'));
```

To create the `store`, let's have a separate file called `configureStore.js`. We are going to `import` from Redux the `createStore` function and `combineReducers`. Then we'll `export` our own `function`.

#### configureStore.js
```js
import {createStore, combineReducers} from "redux";

export function configureStore() {

}
```

This is going to `return` a Redux `store` for us. We'll call `createStore`. This actually takes a reducer. We'll create a `rootReducer` by calling `combineReducers` from Redux, and give an object literal, where the keys on the left here are going to be the top-level name in the Redux store, and the values will be the actual reducer that's responsible for handling that piece of state.

```js
import {createStore, combineReducers} from "redux";

export function configureStore() {
    
    const rootReducer = combineReducers({
        app:
    });
    return createStore()
}
```

We'll say `appReducer`.

```js
import {createStore, combineReducers} from "redux";

export function configureStore() {
    
    const rootReducer = combineReducers({
        app: appReducer
    });
    return createStore()
}
```

We don't have this yet. We go ahead and create a file inside the reducer's folder called `appReducer.js`. We'll `export` a `function` that takes some `state` and an `action`, and it `returns` some `state`.

#### appReducer.js
```js
export function appReducer(state, action) {
    return state;
}
```


We can give this a default value in case it's never set. Right now, we're just going to say it has a `name` of `Shane`. This `reducer` isn't going to do much right now, but it will give us access to this piece of `state` inside our components.

```js
export function appReducer(state = (name: "Shane"), action) {
    return state;
}
```

Back in `configureStore.js`, we can now `import` that, and now we have our `rootReducer`. We can pass that to `createStore`. That's all we need to configure Redux. It now means that anyone can call this function and get back a configured store.

#### configureStore.js
```js
import {createStore, combineReducers} from "redux";
import {appReducer} from "./reducers/appReducer";

export function configureStore() {
    
    const rootReducer = combineReducers({
        app: appReducer
    });
    return createStore(rootReducer);
}
```

Back in `index.js`, we can do that, `import` it, and we're good to go.

#### index.js
```js 
import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {configureStore} from "./configureStore";

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
    , document.getElementById('root'));
```

Back in the browser, you can see we have no changes and we have no errors.

![React App in Browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-add-redux-to-a-react-application-no-errors-or-changes-in-browser.png)

Let's give our component access to that state. If you go back to the `app.js` file, you can see that we're exporting app as a `default` here, but we can call `connect` from the react-redux package. This allows us to select which piece of state we want to give to this component. For this example, we're just going to say `state.app`.

#### App.js
```js
export default connect(state => state.app)(App);
```

`App` here refers to the `app` that we gave in `configureStore.js`. Whatever state this reducer is handling is accessible via this app namespace. To prove this component has access to that state, you can just say `console.log(this.props)`. If we hit the browser, you can see we have access to the name property there.

#### App.js
```js
class App extends component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a 
            className="App-link"
            href="htps://react.js.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React 
          </a>
        </header>
```