In this lesson, we are going to learn how to create a better abstraction around how we create **actions** within our application. Currently we are manually creating an action object every single time that we want to dispatch an `action`. As you can see in our `CategoriesController`, we are creating the exact same object twice.

#### categories.js
``` javascript
this.$timeout(() => {
  const payload = [
    {id: 0, name: 'Redux'},
    {id: 1, name: 'Angular'}
  ];

  this.store.dispatch({ type: GET_CATEGORIES, payload});
}, 3000);

this.$timeout(() => {
  const payload = [
    {id: 0, name: 'Uh Oh!'}
  ];

  this.store.dispatch({ type: GET_CATEGORIES, payload});
}, 6000);
```
Now this is a slightly contrived example, but it's not too far of a leap to see how this could happen in more realistic scenarios. It would be really handy if we could delegate the creation of all our `action` items to a single place, instead of having to create the same objects over and over.

Well, this is exactly what an **action creator** does. It allows us to create a simplified API around creating the same `action` objects that we will need over and over within our application. To see how this works, let's hop into the `category.state.js` file and start to build out a `categories action creator`.

We'll create a new comment block just to break this up a little better. From here, we are going to export a `CategoriesActions` function that is going to hold the methods that we're going to use to create our `action` items.
#### categories.state.js
``` javascript
//------------------------------------------------
// Actions
//------------------------------------------------
export const CategoriesActions = () => {
  
}
```
The first method that we're going to create is `getCategories`. That is going to accept a `categories` parameter, it's going to return an action item with a `type: GET_CATEGORIES` and a `payload: categories`.
#### categories.state.js
``` javascript
const getCategories = () => {
  return { type: GET_CATEGORIES, payload: categories }
};
```
Let's go ahead and create another method to called `selectCategory`, that's going to accept a single `category`. It's going to, from there, return an `action` item that calls `GET_CURRENT_CATEGORY`, and passes in the `category` as the `payload`.
#### categories.state.js
``` javascript
const selectCategory = category => {
  return { type: GET_CURRENT_CATEGORY, payload: category };
};
```
Within this factory method here, let's go ahead and return the `getCategories` method and `selectCategory` method as well.
#### categories.state.js
``` javascript
export const CategoriesActions = () => {
  export const getCategories = () => { ... };

  const selectCategory = category => { ... };

  return {
    getCategories,
    selectCategory
  }
};
```
Now that we have our `categories` actions created, we need to make this available to our application. Let's go ahead and clean up this import statement. We're just going to import `CategoriesActions`. 
#### categories.js
``` javascript
import { category, CategoriesActions } from './categories.state';
```
We're going to hop down to the bottom of our module definition, and we're going to use the `factory` method to create a `CategoriesActions` service that we can then inject into our `CategoriesController`.
#### categories.js
``` javascript
const CategoriesModule = angular.module('categories', [
  CategoryItemModule.name
])
.factory('CategoriesActions', CategoriesActions)
.component('categories', CategoriesComponent)
;
```
From here, we'll just go `this.CategoriesActions = CategoriesActions`. 
#### categories.js
``` javascript
constructor($timeout, store, CategoriesActions) {
  'ngInject';

  this.$timeout = $timeout;
  this.store = store;
  this.CategoriesActions = CategoriesActions;
}
```
We can delete this action item, and instead just call `categoriesActions.getCategories`. In this case, we do not need to send in a payload, so we'll just leave that empty.

From here, let's replace this action item with a call to `getCategories`, but we're going to pass in this `categories` array here. We'll do same thing in the second method call here. We'll delete this action item, paste this in, update our constant to reference `categories`.
### categories.js
``` javascript
this.store.dispatch(
      this.CategoriesActions.getCategories()
    );

    this.$timeout(() => {
      const categories = [
        { id: 0, name: 'Redux' },
        { id: 1, name: 'Angular' }
      ];

      this.store.dispatch(
        this.CategoriesActions.getCategories(categories)
      );
    }, 3000);

    this.$timeout(() => {
      const categories = [
        { id: 0, name: 'Un Oh!' }
      ];

      this.store.dispatch(
        this.CategoriesActions.getCategories(categories)
      );
    }, 6000);
```
Let's go ahead and do the `onCategorySelected` one, as well. We'll call `this.CategoriesActions.selectCategory`, and we're just going to pass in the current `category` parameter into our `action creator`.
#### categories.js
``` javascript
onCategorySelected(currentCategory) {
    this.currentCategory = category(this.currentCategory, this.CategoriesActions.selectCategory(currentCategory));
  }
```
Let's hop into our browser, and you can see that everything is still working. We can even select our category, and it will keep track of that within the categories component.

Let's do a quick review. We created essentially a `CategoriesActions` factory that has two methods, `getCategories` and `selectCategory` that returns those within the revealing module pattern. Within our `categories` component here, we imported the categories action, added it to our Angular app via the factory method.
#### categories.state.js
``` javascript
export const CategoriesActions = () => {
  const getCategories = categories => {
    return { type: GET_CATEGORIES, payload: categories };
  };

  const selectCategory = category => {
    return { type: GET_CURRENT_CATEGORY, payload: category };
  };

  return {
    getCategories,
    selectCategory
  };
};
```
We then injected it into our constructor. From there, we went through and replaced all of the times we were creating an action item with a call to `CategoriesActions` service.

This is just a handy way to simplify our code by using an action creator within our Angular application.