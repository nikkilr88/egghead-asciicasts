In this lesson, we are going to learn how to enable our `store` to work with more than one `reducer` within our application.

Currently, we have set up our store to work with the `categories` reducer exclusively, but this leaves us with a tiny problem. What if we want to keep track of the currently selected category within our store so that we can access that data somewhere else in the app? Another example is what if we want to track our `bookmark` state or the currently selected `bookmark`?

It's safe to say that most applications consist of many data models interacting together, and we need a way to accommodate this within the single state tree within our application. When we initialize our app `store`, wouldn't it be convenient if we could just take all of our reducers and combine them into one big reducer that our `store` knows how to work with?

This is exactly what the `combineReducers` method does in Redux. It allows us to **combine our reducers together and then access them as a named property on our application state**.

We currently have this `category` reducer just hanging out here doing nothing because we've been focusing exclusively on the `categories` reducer up to this point. We're going to combine these two reducers together so that we can use the `currentCategory` data to filter out our bookmarks in our `bookmark` component.
#### categories.state.js
``` javascript
export const categories = (state = initialCategories, {type, payload}) => {
  switch (type) {
    case GET_CATEGORIES:
      return payload || state;
    default:
      return state;
  }
};

export const category = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_CATEGORY:
      return payload || state;
    default:
      return state;
  }
};
```
In order for this to work, the first thing that we need to do is import the `combineReducers` method from `Redux`. 
#### app.js
``` javascript
import { combineReducers } from 'redux';
```
Then, we're going to create our `rootReducer`, and we're going to populate this by calling `combineReducers` and passing in `categories` and our `category` reducer. We'll update our imports here.
#### app.js
``` javascript
import { categories, category } from './components/categories/categories.state';

const rootReducer = combineReducers({
  categories,
  category
});
```
From here, we're going to update our `createStoreWith` call to use the `rootReducer`, and we'll pass in an empty array for our middleware. Let's go ahead and delete these timeout calls here.
#### app.js
``` javascript
const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, []);
};
```
Now that we have deleted those, we need to update how we're accessing `getState`. Because there's more than one reducer, we need to access our reducers by name, so `this.store.getState().categories` and, for the current category, `this.store.getState().category`.
#### categories.js
``` javascript
this.store.subscribe(() => {
  this.categories = this.store.getState().categories;
  this.currentCategory = this.store.getState().category;
})
```
We can also go down here to the `onCategorySelected` method and update this to use the `store`, as well. We'll go this `store.dispatch`, and we're going to dispatch a `selectCategory` action. We'll pass in the `category` parameter.
#### categories.js
``` javascript
onCategorySelected(category) {
  this.store.dispatch(
    this.CategoriesActions.selectCategory(category)
  );
}
```
Let's hop into the browser and see how far we've gotten. Now, we can see that we have the `categories`, and we can select them. It's keeping track of it within the `categories` component.

Let's hop into our `bookmarks.js` and surface this functionality within this component. We're going to update our dependencies to no longer use `scope` and `categories` model. We're just going to pass in `ngRedux` and then assign that to `this.store`. 
#### bookmarks.js
``` javascript
constructor($ngRedux, BookmarksModel) {
  'ngInject';

  this.store = $ngRedux;
  this.BookmarksModel = BookmarksModel;
}
```
We can go into our `$onInit` block. We can go and delete these two lines. Then, we're going to `subscribe` to the `store`. With every `dispatch` action, we're just going to grab the latest `category` and assign it to `currentCategory`. `this.currentCategory = this.store.getState().category`.
#### bookmarks.js
``` javascript
$onInit() {
  this.BookmarksModel.getBookmarks()
    .then(result => this.bookmarks = results);
    
  this.deleteBookmark = this.BookmarksModel.deleteBookmark;

  this.store.subscribe(() => {
    this.currentCategory = this.store.getState().category;
  })

  this.reset();
}
```
Now we need to update our template slightly. We're no longer calling a method on the controller. Instead, we're just going to reference the `currentCategory` object itself. Let's update this `ng-if` at line 10 to do the same thing, so check for `currentCategory.name` if we're going to show the `Create Bookmark` button.
#### bookmarks.html
``` html
<div class="bookmarks">
  <div ng-repeat="bookmark in bookmarksListCtrl.bookmarks
    | filter:{category:bookmarksListCtrl.currentCategory.name}">
    ...
  </div>
  <div ng-if="bookmarksListCtrl.currentCategory.name">
    ...
  </div>
  ...
</div>
```
Now we can select, and we see that it's filtering, but let's hit the `Eggly` logo to actually clear the filter. Nothing happens. The reason being is that we're passing in a `null` value, which in our `category` reducer we're just returning the `state`, so it's not actually doing anything.

We can update this to return this empty object with an `undefined` name property. What this is going to do is cater to the way that Angular filters work and say, "Hey, this doesn't match anything. Let's just show the entire collection."
#### categories.state.js
``` javascript
export const category = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_CATEGORY:
      return payload || { name: undefined };
    default:
      return state;
  }
};
```
Let's just do a quick review of what we've covered in this lesson. We imported the `combineReducers` method that we use to create a `rootReducer` by passing in `categories` and `category`. 
#### app.js
``` javascript
const rootReducer = combineReducers({
  categories,
  category
});
```
Then we updated the `createStoreWith` call. From there, we updated how we are calling `getState` to reference our reducers by name.
#### app.js
``` javascript
const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(rootReducer, []);
}
```
Then, we updated our `onCategorySelected` method to use the store. 
#### categories.js
``` javascript
onCategorySelected(category) {
  this.store.dispatch(
    this.CategoriesActions.selectCategory(category)
  )
}
```
Within our `bookmarks.js`, we imported `ngRedux`, and then we used that to `subscribe` and set our `currentCategory` property in the bookmarks controller. 
#### bookmarks.js
``` javascript
this.store.subscribe(() => {
  this.currentCategory = this.store.getState().category;
});
```
From there, we updated the template to use the `currentCategory` object directly.

Then, we updated the `category` reducer to return a category with the name of undefined if we want to reset the filter.
#### categories.state.js
``` javascript
export const category = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_CURRENT_CATEGORY:
      return payload || { name: undefined };
    default:
      return state;
  }
};
```
This is how you use `combineReducers` within your Angular application to take more than one reducer and make it available to the rest of your app.