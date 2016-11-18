In this lesson, we are going to learn how to build a **Redux store** so that we can have a single place to store our **application state**. **Reducers** are great for updating state, but because they're stateless, obviously they are very bad at preserving state, which is vital when we need to reference state in more than one place.

This is where an application `store` comes in really handy. To alleviate the burden of keeping track of the `categories` collection within the `CategoriesController`, we're going to build out a simple `store` that we can use to keep track of the `state` that is returned from our `categories` reducer.

We'll start by creating an `app.store` file. From here, we're going to create a `store` class.

Before I forget, I'm just going to `export` this. Our store is initialized with two parameters. The first one is the reducer that we want our store to operate on, and our initial state that we want to use for our store. We'll assign `this.reducer = reducer`, and `this.state = initialState`. 

#### app.store.js
``` javascript
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = inisitalState;
  }
}

export default Store;
```
The API for an application `store` is really quite simple. We are going to use just two methods in this lesson, the first one being `getState`.

#### app.store.js
``` javascript
getState() {
  return this.state;
}
```
All this is going to do is return `this.state`. The next method is a little bit more involved. This is the `dispatch` method that accepts an `action` item, and using this `action` item, it's going to call the `reducer` that we passed in.

#### app.store.js
``` javascript
dispatch(action) {
  this.state = this.reducer(this.state, action);
}
```
It's going to pass in the current `state` of the store with the action item, and take the result of calling the `reducer` with that `action` item. It's going to store it as `this.state`, which then we can use `getState` to access that from anywhere within our application.

To make our `state` available to our Angular application, we are going to import the `store` into our `app.js` file. We're also going to import a `reducer` and an `initialState` to create our `store` object. We'll import `categories` and `initialCategories`.

#### app.js
``` javascript
import { categories, initialCategories } from './components/categories/categories.state';
import Store from './app.store';
```
From here, let's go ahead and declare our application `store`. `store = new Store()`, and we'll pass in `categories` and `initialCategories`. We'll use the value service to make it available for dependency injection within our application.

#### app.js
``` javascript
const store = new Store(categories, initialCategories);

let appModule = angular.module('app', [
    CommonModule.name,
    ComponentsModule.name
  ])
  .value('store', store)
  .component('app', AppComponent)
;
```
Value `store` takes our `store` object that we initialized. Within our `CategoriesController`, we're going to inject our application `store`. We'll store this as a local property. Currently, we are doing the setting and the getting of our state in a single expression. 

#### categories.js
``` javascript
class CategoriesController {
  constructor($timeout, store) {
    'ngInject';

    this.$timeout = $timeout;
    this.store = store;
  }
```
We're going to split that out. We're going to call `this.store.dispatch`, and we're going to just pass in this `action` item here. This is the setting of the `state`. We will call `this.categories = this.store.getState` to get the `state`. Notice we're separating our setting of `state` from our getting of `state`.

#### categories.js
``` javascript
$onInit() {
  this.store.dispatch({ type: GET_CATEGORIES });
  this.categories = this.store.getState();

  ...

}
```
We'll do the same thing here. We're going to `dispatch` this `action` item right here. We will fetch the new `state` from the `store`. `this.categories = this.store.getstate()`. We can go ahead and just copy this. We'll go down to our next call to our `reducer`, and we'll replace this.

#### categories.js
``` javascript
$onInit() {

  ...

  this.$timeout(() => {
    const payload = [
      { id: 0, name: 'Redux' },
      { id: 1, name: 'Angular' }
    ];

    this.store.dispatch({ type: GET_CATEGORIES, payload });
    this.categories = this.store.getState();
  }, 3000);

  this.$timeout(() => {
    const payload = [
      { id: 0, name: 'Un Oh!' }
    ];

    this.store.dispatch({ type: GET_CATEGORIES, payload });
    this.categories = this.store.getState();
  }, 6000);
}
```
We're just dispatching and getting it. Let's refresh the page. You can see, one, two, three, and one, two, three. Let's take a quick moment to review what we've done so far in this lesson. We created our application `store`, which takes a `reducer` and an `initialState`.

#### app.store.js
``` javascript
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
  }
}
```

We have a `getState` method that just returns the current state. It's just basically a getter for `state`. Then we have our `dispatch` method, which accepts an `action`, which then stores the result of calling our `reducer` with the current `state` and the action into the `state` property, which then we can use `getState` to access from anywhere within our application.

You can see within our `CategoriesController` that we are dispatching an action to set the `state`. We're calling `this.categories = this.store.getState()` to retrieve the new and updated `state` within our application. This is how you use an application store to preserve `state` that is returned from our `reducers`.

#### categories.js
``` javascript
this.store.dispatch({ type: GET_CATEGORIES, payload });
this.categories = this.store.getState();
```