Invariably, the question comes up when talking about **Redux**, is how does one handle asynchronous operations. For instance, how do we hand off an operation to Redux that requires a remote call to the server? Where exactly does the async part get handled?

Redux has this concept of **middleware** that allows us to insert custom logic in the space between dispatching an action and the moment it reaches the reducer. In this lesson, we are going to set up a few async operations, and then use Redux **Thunk** middleware to make sure that everything gets handled properly.

The main thing with Thunk middleware is that it allows us to **return a function instead of an action**, and then this function can encapsulate the async operation and dispatch the appropriate action when the operation is complete.

To use `Thunk` middleware, we need to first install the NPM package. From the command line, `nom install --save redux-thunk`. 
#### terminal
``` bash
$ npm install --save redux-thunk
```
Now that this is installed, let's go into our main `app.js` file, and let's go ahead and import Redux `thunk`. `import thunk from 'redux-thunk';`, and from here, we'll hop down to our `config` block. We're going to add this in our `createStoreWith` Call as an item in the second parameter.
#### app.js
``` javascript
const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
};
```
We're now initializing our `store` to use the `thunk` middleware. Let's hop into our `category.state.js`, and let's wire this up. I'm going to create a `URLS` map here, because we're going to be making an http call. We'll point this to `'data/categories.json'`, and because we are making a few asynchronous operations, let's inject `$http` and `$q`.
#### categories.state.js
``` javascript
const URLS = {
  FETCH: 'data/categories.json'
}

export const CategoriesActions = ($http, $q) => { ... }
```
We'll annotate this with `'ngInject';`, and then I'm going to create one helper function real quick, just an extract function that pulls a `result` and then returns `result.data`. This is just a convenience method that I like to use.
#### categories.state.js
``` javascript
export const CategoriesActions = ($http, $q) => { 
  'ngInject';

  const extract = result => result.data;
}
```
Within `getCategories`, we're no longer going to return an `action` item directly. We are going to return a method that in turn returns a method. This is actually what a `thunk` is. It's a function that encapsulates another function to get called later. Within this function, it takes two parameters, `dispatch` and `getState`.
#### categories.state.js
``` javascript
const getCategories = () => {
  return (dispatch, getState) => {

  }
};
```
Because we have access to the `getState` method, we can pull the `categories` off of `getState` using [destructuring](https://egghead.io/lessons/ecmascript-6-destructuring-assignment). We're actually going to simulate caching, so we're going to check and see if we have `categories` already, if the store's been initialized with them, or has been placed in them.

If it has, we're just going to go ahead and resolve the categories that we have, so `$q.when`, and then from there, within the `.then` block, we're going to use the dispatch method to dispatch an action item of type `getCategories` and `payload` of `categories`.
#### categories.state.js
``` javascript
const getCategories = () => {
  return (dispatch, getState) => {
    const { categories } = getState();

    if(categories.length) {
      return $q.when(categories)
        .then(() => dispatch({type: GET_CATEGORIES, payload: categories}));
    } else { }
  }
};
```
If the `categories` collection is empty, then we're going to make an `$http` call to go ahead and get them. We'll call `$http.get`. We'll pass in our `FETCH` URL, then we'll extract the data. From there, we will use the `dispatch` method again, and we'll create a new `action` item, also with `GET_CATEGORIES`, but in this case, we are going to set the `payload` to equal our `data` from the server.
#### categories.state.js
``` javascript
if(categories.length) {
    return $q.when(categories)
      .then(() => dispatch({type: GET_CATEGORIES, payload: categories}));
} else { 
  return $http.get(URLS.FETCH)
    .then(extract)
    .then(data => dispatch({ type: GET_CATEGORIES, payload: data}));
}
```
We can go ahead and delete this line here. We no longer need it. Let's hop into the browser. It looks like everything is working. Let's just double check. Let's pull up the `json` file. Let's update this to `Development!!` It does not look like that's pulling that in.
#### categories.json
``` json
[
  {"id": 0, "name": "Development!!"},
  {"id": 1, "name": "Design"},
  {"id": 2, "name": "Exercise"},
  {"id": 3, "name": "Humor"}
]
```
The reason being is that because we're using caching, we need to take off the initial state, or it'll always just return these `initialCategories`.

Let's set that to an empty array. Let's delete this, and back into the browser, let's refresh. Now you can see that we're pulling in the data from our `json` file, so we can close this.

Let's do a quick review. We updated `getCategories` to not return an `action` item but return a function that when the async operation has completed, it calls `dispatch` for us. Let's do the same exact thing for `bookmarks`.

Before we forget, let's get rid of our `initialBookmarks`, initialize this to an empty collection. 
#### bookmarks.state.js
``` javascript
export const bookmarks = (state = [], {type, payload}) => { ... }
```
From here, let's create our `URLS` map, and we will create a `FETCH` url of `data/bookmarks.json`. Let's update the `BookmarksActions` to pull in `$http` and `$q`. Let's set up our extract helper function.
#### bookmarks.state.js
``` javascript
export const BookmarksActions = ($ngRedux, $http, $q) => { ... }
```
Let's update this to return our method here, so `dispatch` and `getState`. Within this, we're going to pull the `bookmarks` off of our application store using destructuring yet again. We'll check and see if we have `bookmarks` or not.

`if(bookmarks.length)`, let's go ahead and use `$q.when` to resolve the collection, and then we will dispatch our action at this point, with a `payload` of `bookmarks`.
#### bookmarks.state.js
``` javascript
const getBookmarks = () => {
  return (dispatch, getState) => {
    const { bookmarks } = getState();

    if(bookmarks.length) {
      return $q.when(bookmarks)
        .then(() => dispatch({ type: GET_BOOKMARKS, payload: bookmarks}))
    } else { }
  }
}
```
If there is nothing in the collection, we will go ahead and make the `$http` call. We'll get `URLS.FETCH`, then we will `extract` the data, and from here, we will use that `data` parameter to dispatch a new action item of `GET_BOOKMARKS` with `payload: data`.
#### bookmarks.state.js
``` javascript
if(bookmarks.length) {
  return $q.when(bookmarks)
    .then(() => dispatch({ type: GET_BOOKMARKS, payload: bookmarks}))
} else { 
  return $http.get(URLS.FETCH)
    .then(extract)
    .then(data => dispatch({ type: GET_BOOKMARKS, payload: data}));
}
```
Let's hop into the browser and make sure that everything is loading. Refresh, and there we have it. Let's do a quick review.

We did an npm install of Redux `thunk`. Within our `app.js`, we imported `thunk` from `redux-thunk`, and we updated our create store with method to use and initialize our `store` with the Thunk middleware.
#### app.js
``` javascript
const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, [thunk]);
};
```
From there, we updated `getCategories` to not return an `action` item, but a method that takes a `dispatch` and `getState` parameter that we can then use to get our `categories`, will check it, and if it exists, we'll use the `dispatch` method to then `dispatch` our `action` item.
#### categories.state.js
``` javascript
const getCategories = () => {
  return (dispatch, getState) => {
    const { categories } = getState();

    if(categories.length) {
      return $q.when(categories)
        .then(() => dispatch({type: GET_CATEGORIES, payload: categories}));
    } else { 
      return $http.get(URLS.FETCH)
        .then(extract)
        .then(data => dispatch({ type: GET_CATEGORIES, payload: data}));
    }
  };
};
```
If not, we will make our remote call, and on the return of that, then we will use `dispatch`. Because we're doing caching, we initialized our `initialCategories` to just an empty array, and the same thing for `getBookmarks`.

We updated it to return a function and not an action item, and then we used `getState` and `dispatch` to handle the asynchronous nature of this operation. This is how we handle async operations within our Angular application using Thunk middleware.
#### bookmarks.state.js
``` javascript
const getBookmarks = () => {
  return (dispatch, getState) => {
    const { bookmarks } = getState();

    if(bookmarks.length) {
      return $q.when(bookmarks)
        .then(() => dispatch({ type: GET_BOOKMARKS, payload: bookmarks}))
    } else { 
      return $http.get(URLS.FETCH)
        .then(extract)
        .then(data => dispatch({ type: GET_BOOKMARKS, payload: data}));
    }
  };
};
```