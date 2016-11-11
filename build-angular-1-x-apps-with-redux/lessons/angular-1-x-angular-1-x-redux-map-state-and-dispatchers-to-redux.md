In this lesson, we are going to learn how to map our Angular component directly to our application store using the `connect` method on `ngRedux`. In Angular, it is a common technique to bind a controller property directly to the model so that our controllers remain lightweight and operate more as a pass-through mechanism than anything else.

Using the `connect` method, we can accomplish the same effect by not only binding properties directly to the application store, but we can also bind our controllers directly to our action creators. This allows us to drastically simplify our controllers, as you'll see in just a moment, as we delete a bunch of methods because they are redundant.

To see how this works, let's start with the `CategoriesController`. Let's do a bit of cleanup real quick. We'll delete this import here. Let's delete this line here. We no longer need the `$timeout` service. Let's inject the `BookmarksActions` service. Let's create a local reference to this, so the `this.BookmarksActions = BookmarkActions`.
#### categories.js
``` javascript
constructor($ngRedux, CategoriesActions, BookmarksActions) {
  'ngInject';

  this.store = $ngRedux;
  this.CategoriesActions = CategoriesActions;
  this.BookmarksActions = BookmarksActions;
}
```
We're going to call `this.store.connect`. This takes three parameters. The first is an object that contains the mappings to our local state, to the `store`. This is just going to be a method we'll build in a moment.

The second parameter is an object that contains the mappings from our action items directly to our controller. This is just going to be an `actions` object we'll create in just a moment, and then the third is the target that we want to bind. In this case, it is `this`.
#### categories.js
``` javascript
$onInit() {
  this.store.connect(this.mapStateToThis, actions)(this);
}
```
Let's go ahead and build out our `mapStateToThis` method. This takes a single parameter, which is `state`. We're going to return an object map. We're going to say, "We want to map the local `categories` to `state.categories`, and we want to map our local `currentCategory` to `state.category`."
#### categories.js
``` javascript
mapStateToThis(state) {
  return {
    categories: state.categories,
    currentCategory: state.category
  }
}
```
This is going to then handle all of the subscriptions and the bindings for us. Essentially what it's doing is it's taking `categories` in `currentCategory`, and under the hood, it is mapping them together. When one is updated in the `store`, it automatically updates in our controller.

The `store.subscribe` block we did here is no longer necessary, so we can go ahead and delete that manual `subscribe` block. What we're going to do next is build out our `actions` object. This is an action, or rather, an object that contains a bunch of functions that Redux is assuming are action creators.

In this case, what we're going to do is create a new object that contains our `CategoriesActions`, and our `BookmarksActions` using `Object.assign`. Now that we have defined our actions object, we no longer need to call `store.dispatch`, and we no longer need to reference our `CategoriesActions` directly.
####categories.js
``` javascript
$onInit() {
  const actions = Object.assign({}, this.CategoriesActions, this.BookmarksActions);
  this.store.connect(this.mapStateToThis, actions)(this);

  this.getCategories()
}
```
We can go ahead and delete that. Let's go down to `onCategoriesSelected`, and let's do the same thing. We'll get rid of `this.store.dispatch`. We'll delete that, and let's delete the reference to `CategoriesActions` as well. We can just call this directly, because of the mapping.
#### categories.js
``` javascript
onCategorySelected(category){
  this.selectCategory(category)
}
```
Let's hop into the browser and see that this is working. Everything is filtering correctly, and everything resets, but let's go ahead. When we click it here, we can see that we haven't reset the selected `bookmark`, but because we've mapped our `bookmarks` actions along with our `categories` actions to this controller, we can now call `this.resetSelectedBookmark` as if it existed on our controller.
#### categories.js
``` javascript
onCategorySelected(category){
  this.selectCategory(category);
  this.resetSelectedBookmark();
}
```
Let's hop into the browser and verify that this is working. You can see now that we are dispatching the `this.resetSelectedBookmark` action item under the hood.

When we call `this.store.connect`, it actually returns a function that we can use to `unsubscribe` our bindings from the `store`. We'll capture that with `this.unsubscribe` that we can use on our `onDestroy` life cycle hook. When this controller gets taken away or removed from the DOM, that we can just call `this.unsubscribe` and clean up after ourselves.
####categories.js
``` javascript
$onInit() {
  const actions = Object.assign({}, this.CategoriesActions, this.BookmarksActions);
  this.unsubscribe = this.store.connect(this.mapStateToThis, actions)(this);

  this.getCategories()
}

$onDestroy() {
  this.unsubscribe();
}
```
This is just removing any listeners that we have to our store. Let's go ahead and do the same thing in the `BookmarksController`. `this.unsubscribe`, and then we'll call `this.store.connect`. We'll pass in a `mapStateToThis` method, and we just want to bind directly, in this case, to `BookmarksActions`. We'll set the target to `this`.
#### bookmarks.js
``` javascript
$onInit () {
  this.unsubscribe = this.store.connect(this.mapStateToThis, this.BookmarksActions)(this);

  ...
}
```
Let's do our state mappings first. We'll build out this `mapStateToThis` method. It takes the `state` parameter, which then we're going to use when we build out our object maps. We'll bind `bookmarks` to `state.bookmarks`. We'll bind `currentBookmark` to `state.bookmark`, and we'll bind `currentCategory` to `state.category`.
#### bookmarks.js
``` javascript
mapStateToThis(state) {
  return {
    bookmarks: state.bookmarks,
    currentBookmark: state.bookmark,
    currentCategory: state.category
  }
}
```
Now that we have these bindings set up and our subscriptions in place, we can delete this block right here. It's no longer necessary. Let's clean up our call to `getBookmarks`. We no longer need `dispatch`, and we no longer need to directly reference `BookmarksActions`.
#### bookmarks.js
``` javascript
$onInit () {
  this.unsubscribe = this.store.connect(this.mapStateToThis, this.BookmarksActions)(this);

  this.getBookmarks()
}
```
Let's notice something interesting here that we are calling `saveBookmark` on the `BookmarksActions` passing in the `bookmark` parameter. We're doing essentially the same thing here. The function signature is exactly the same. Because of this, this entire function is redundant.

We can just delete this entire block here. When we call it from the view, it will just pass through, because it's bound. `deleteBookmark(bookmark)`, `deleteBookmark(bookmark)`. The function signature is the same, so let's go ahead and delete it. `selectBookmark`, `selectBookmark`. Redundant.

I think you know where this is going. We can delete this as well. Now we were able to delete four methods because the bindings is just merely passing that through directly to our actions creators so that those actions get handled by our reducers, and it works through the Redux mechanisms.

This is a really handy way to lighten up our controller by mapping `state` and our `actions` directly to it. Let's check that everything is working. We can update. We can cancel. Let's create a new `bookmark`. You can see that we can also create a new `bookmark`.

Let's hop back into our `BookmarksController` and do a review. We called `this.store.connect`, and we're mapping our local properties to the `store`. We're mapping our `BookmarksActions` also directly to our controller, which allowed us to delete quite a few of those methods.
#### bookmarks.js
``` javascript
$onInit () {
  this.unsubscribe = this.store.connect(this.mapStateToThis, this.BookmarksActions)(this);

  this.getBookmarks()
}
```
One thing I did forget is to set up a lifecycle hook to call `unsubscribe`, so let's go `$onDestroy`, and let's call `this.unsubscribe`. Now you can see, using the `store.connect` method, we can map not only our local state to the store, but we can map action creators directly to our controller as well.
#### bookmarks.js
``` javascript
$onDestroy() {
  this.unsubscribe();
}
```