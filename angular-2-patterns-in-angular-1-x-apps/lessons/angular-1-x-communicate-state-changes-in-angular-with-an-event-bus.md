In Angular 2, we use **observables** to push new data to our components. In Angular 1, we occasionally need to **notify a component that a collection has changed** so that we can perform an operation at the **component level**.

For example, when we are editing or creating a bookmark, if we navigate to a new category mid-stride, we're left in this awkward state of an incomplete edit that is not congruent with the view that we are looking at. What needs to happen is we need to be notified when a new category is selected at the bookmark level so that we can reset the current bookmark.

Even though we do not have the convenience of an observable to admit state changes to us, we can still sped up our own **event bus** to let us know when we need to hit reset. We're going to hop into the categories model and inject `$rootScope`.

Just a bit of cautionary advice, be very judicious about what you put on `$rootScope`. It is not a global grabbag of properties, but it works very well as an event bus as all events come from the scope object and `$rootScope` being the mothership of them all.

**model/categories.model.js**
```javascript
class CategoriesModel {
  constructor($q, $rootScope) {
    'ngInject';

    this.$q = $q;
    this.$rootScope = $rootScope;
    this.currentCategory = null;
    this.categories = [ ... ];
  }
```
Within our `setCurrentCategory` method, when we have set a new category, we're going to call this `$rootScope.$broadcast()`, and we're just going to emit an event called `onCurrentCategoryUpdated`.

**model/categories.model.js**
```javascript
setCurrentCategory(category) {
  this.currentCategory = category;
  this.$rootScope.$broadcast('onCurrentCategoryUpdated');
}
```
Then from here, let's hop into the `bookmark` controller. We're going to inject `$scope`, and we're going to listen for that event. `$rootScope` is broadcasting the event, so it goes from the `$rootScope` component all the way down to all the children components, so we're guaranteed using `$broadcast` on `$rootscope` that every `scope` object is going to hear, will be notified of that event. We can go this scope on, `onCurrentCategoryUpdated`.

**bookmarks/bookmarks.controller.js**
```javascript
class BookmarksController {
  constructor($scope, CategoriesModel, BookmarksModel) {
    'ngInject';

    this.$scope = $scope;
    this.CategoriesModel = CategoriesModel;
    this.BookmarksModel = BookmarksModel;
  }

  $onInit() {
    this.BookmarksModel.getBookmarks()
      .then((bookmarks) => {
        this.bookmarks = bookmarks;
      });

    this.$scope.$on('onCurrentCategoryUpdated', this.reset.bind(this));
    this.getCurrentCategory = this.CategoriesModel.getCurrentCategory.bind(this.CategoriesModel);
    this.deleteBookmark = this.BookmarksModel.deleteBookmark;
  }

  initNewbookmark() { ... }
```
We're going to call `this.reset`, but we need to `bind(this)` method to the `BookmarksController` itself because we will lose that if we do not add `bind(this`). Let's hop into the browser, and now you can see that if we're going to create or edit state, that when we select a new component or a new category, it is reset.

Using the `$rootScope.$broadcast()` in our model, we can notify our `BookmarksController` that a category was selected, and then allow the `BookmarksController` to perform its logic at the component level. This is how you notify your components that a collection has changed at the model.