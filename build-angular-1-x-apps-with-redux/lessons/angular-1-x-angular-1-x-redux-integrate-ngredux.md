Up to this point, we have created a rudimentary implementation of **Redux** by manually creating an application `store`, our `reducers`, and our `action creators`. We've already made significant progress in simplifying state management within our application, but we have, in fact, only touched the surface of what Redux has to offer.

In this lesson, we are going to introduce **ngRedux** into our application and let it handle the rest of the heavy lifting as we work through series. `NgRedux` is **essentially Angular bindings for Redux**, and it allows us to streamline integrating Redux into our application.

To get this working, the first thing we need to do is install some packages. We're going to go `npm i` for install `-S` for save, and then we're going to install `redux` and `ng-Redux`. Now that this is installed, we need to add this to our Angular application.
#### terminal
``` bash
$ npm i -S redux ng-redux
```
The first thing that we need to do is to import this into our application. We'll delete `store`, and we're just going to `import ngRedux from ng-redux`. 
#### app.js
``` javascript
import ngRedux from 'ng-redux';
```
Then, we'll go down and add this as a dependency into our top-level module. Let's delete our version of the `store`. 
#### app.js
``` javascript
let appModule = angular.module('app', [
  CommonModule.name,
  ComponentsModule.name,
  ngRedux
])
.value('store', store)
.component('app', AppComponent)
``` 
Instead, we're going to create a configuration block that we're going to initialize our `store` within `ngRedux`.

We're going to create our configuration function, and we're going to pass in `$ngReduxProvider`, `'ngInject'` so that we have safe dependency injection.

Then, we're going to call the `createStoreWith` method off of the `ngRedux` provider. We're going to send in our `categories` reducer, no middleware yet, no store enhancers, but we are going to pass in our initial state of `initialCategories`.
#### app.js
``` javascript
const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(categories, [], [], initialCategories)
}
```
Now that we have our `config` block defined, let's go ahead and delete our `store`. We'll replace this with a `config` call on the `module` and pass in our `config` function.
#### app.js
``` javascript
let appModule = angular.module('app', [
  CommonModule.name,
  ComponentsModule.name,
  ngRedux
])
.config(config)
.component('app', AppComponent)
```
Now, let's hop into our `CategoriesController` and see what we need to do to swap out our `store` with the `ngRedux store`. The first thing we need to do is inject `ngRedux`. What else? We simply need to change our reference from our store to `ngRedux`, and that is it.
#### categories.js
``` javascript
constructor($timeout, $ngRedux, CategoriesActions) {
  'ngInject';

  this.$timeout = $timeout;
  this.store = $ngRedux;
  this.CategoriesActions = CategoriesActions;
}
```
Because we have a `subscribe` method, a `dispatch` method, and a `getState` method, we do not have to make any more changes in our code to make this work. It just works.

We were able to write our store by hand and then, when the time was right, we just swapped it out with the `ngRedux` store, and everything works as we would expect without having to do any additional changes. Again, we're just injecting `ngRedux`. Because we've adhered to the `store` interface, if you will, then we have access to `dispatch`, `getState`, and `subscribe`.

All of our actions and all of our reducers are going to work as expected because our action types have a `type` and a `payload` which is what Redux expects.

Let's just do a quick review. We installed `Redux` and `ngRedux`. From there, we imported it into our main `app.js` file. Then we added it as a dependency into our application. Then we, using the `ngRedux` provider in a `config` block, created a new `store`, passing in our `categories` reducer and our `initialCategories` as the initial state.
#### app.js
``` javascript
const config = $ngReduxProvider => {
  'ngInject';

  $ngReduxProvider.createStoreWith(categories, [], [], initialCategories)
}
```
From here, we then added this to a `config` block, and we were able to hop into our `CategoriesController`, inject `ngRedux`, and just swap out our `store` reference from our `store` to the `ngRedux` store.
#### categories.js
``` javascript
constructor($timeout, $ngRedux, CategoriesActions) {
  'ngInject';

  this.$timeout = $timeout;
  this.store = $ngRedux;
  this.CategoriesActions = CategoriesActions;
}
```
This is how you integrate ngRedux into your Angular application.