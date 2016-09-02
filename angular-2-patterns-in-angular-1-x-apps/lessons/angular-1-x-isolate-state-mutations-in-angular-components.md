Managing state is one of the hardest things to do in any application. Angular 2 tackles this problem head-on by making it easy to implement a reactive **unidirectional data flow** that favors **immutable operations**.

We're definitely moving in the right direction in Angular 1 by moving our state and logic to models. Invariably, the question comes up, if we're moving to an immutable world, how do we manage mutable operations like forms in Angular?

Mutable state in itself is not a bad thing as long as you're explicit about the boundaries around it. It is shared mutable state that is the devil's playground. In this lesson, we're going to see a surprisingly simple technique to isolate state mutations within a component.

To get started, I've updated the bookmarks model to simulate CRUD functionality. We've imported a few methods from `lodash`, and then I've added create, update, and delete methods to simulate the back end. Definitely not something I would put into production, but for the case of illustrations, this will work.

**models/bookmarks.model.js**
```javascript

getBookmarks() {
  return this.$q.when(this.bookmarks);
}

createBookmark(bookmark) {
  bookmark.id = uniqueId();
  this.bookmarks.push(bookmark);
}

updateBookmark(bookmark) {
  const index = findIndex(this.bookmarks, b => b.id === bookmark.id);
  this.bookmarks[index] = bookmark;
}

deleteBookmark(bookmark) {
  remove(this.bookmarks, b => b.id === bookmark.id);
}
```

I've also started to build out the `saveBookmark` component. The first thing to look at here is the `saveBookmark` component itself, paying attention to the bindings that I've defined.

**save-bookmark/save-bookmark.component.js**
```javascript
import template from './save-bookmark.html';
import './save-bookmark.styl';

const saveBookmarkComponent = {
  bindings: {
    bookmark: '<',
    save: '&',
    cancel: '&'
  },
  template,
  controllerAs: 'saveBookmarkCtrl'
};

export default saveBookmarkComponent;
```

We have a `bookmarkInput` and a save and cancel output. We're passing in a bookmark that we're going to edit. Then, when we're ready to save, we'll basically emit that event, or if we cancel it, we'll just cancel that operation.

In the template, you can see here that the form is binding to the bookmark object on our `saveBookmarkCtrl` via the title and the URL. Then, when a user clicks cancel, then we emit the cancel event. When they click submit or hit enter, then we're emitting the save event, and we're just sending the bookmark back up to the bookmark controller for processing.

**save-bookmark/save-bookmark.html**
```html
<div class="save-bookmark">
  <h4 ng-if="!saveBookmarkCtrl.bookmark.id">Create a bookmark in
    <span class="text-muted">{{saveBookmarkCtrl.bookmark.category}}</span>
  </h4>
  <h4 ng-if="saveBookmarkCtrl.bookmark.id">Editing {{saveBookmarkCtrl.bookmark.title}}</h4>

  <form class="edit-form" role="form" novalidate
    ng-submit="saveBookmarkCtrl.save({bookmark:saveBookmarkCtrl.bookmark})" >
    <div class="form-group">
      <label>Bookmark Title</label>
      <input type="text" class="form-control"
        ng-model="saveBookmarkCtrl.bookmark.title" placeholder="Enter Title">
    </div>
    <div class="form-group">
      <label>Bookmark URL</label>
      <input type="text" class="form-control"
        ng-model="saveBookmarkCtrl.bookmark.url" placeholder="Enter URL">
    </div>  
    <button type="submit" class="btn btn-info btn-lg">Save</button>
    <button type-"button" class="btn btn-default btn-lg pull-right"
      ng-click="saveBookmarkCtrl.cancel()">Cancel</button>
  </form>
</div>
```

Then, within the `BookmarkController`, we're creating a local reference to the `deleteBookmark` method. We have a `reset()` method that is resetting the `currentBookmark` to `null`. `CurrentBookmark` is essentially the placeholder that we're using to keep track of the bookmark that we're editing.

**bookmarks/bookmarks.controller.js**
```javascript
class BookmarksController{
  constructor(...) {...}

  $onInit() {
    this.BookmarksModel.getBookmarks()
      .then(results => this.bookmarks = results);

    this.getCurrentCategory = this.CategoriesModel.getCurrentCategory.bind(this.CategoriesModel);
    this.deleteBookmark = this.BookmarksModel.deleteBookmark;
    this.reset();
  }

  ...
  
  reset() {
    this.currentBookmark = null;
  }
}
```

If it's a new bookmark, then we're calling this `initBookmark()` method, and we're just returning a pristine, new bookmark object that's just keeping track of the category that you're currently in.

**bookmarks/bookmarks.controller.js**
```javascript
initNewBookmark() {
    return {
      id: null,
      title: '',
      url: '',
      category: this.CategoriesModel.getCurrentCategory().name
    };
  }
```

Within our `bookmarks.html`, I am going to add `ng-click`, and we'll go ahead and call `deleteBookmark()` on the delete button, and we'll pass in the bookmark.

**bookmarks/bookmarks.html**
```html
<div class="bookmarks">
	<div ng-repeat="bookmark in bookmarksListCtrl.bookmarks | filter:{category:bookmarksListCtrl.getCurrentCategory().name}">
		<button type="button" class="close" ng-click="bookmarksListCtrl.deleteBookmark(bookmark)">&times;</button>
    <button>...</button>
    <div>...</div>
  </div>  
</div>
```

Within the edit button, we're going to call `ng-click` again, and we'll call the `editBookmark()` method, and we'll pass in the bookmark that we want to edit.

**bookmarks/bookmarks.html**
```html
<div class="bookmarks">
	<div ng-repeat="bookmark in bookmarksListCtrl.bookmarks | filter:{category:bookmarksListCtrl.getCurrentCategory().name}">
		<button type="button" class="close" ng-click="bookmarksListCtrl.deleteBookmark(bookmark)">&times;</button>
  <button type="button" class="btn btn-link" ng-click="bookmarksListCtrl.editBookmark(bookmark)">
			<span class="glyphicon glyphicon-pencil"></span>
		</button>
    <div>...</div>
  </div>  
</div>
```

Just below that, you'll see that we have a div that contains a button. We're not going to show that if we're not currently on a `category`, but if we are on a `category` and there is not a current bookmark, when we click it, we're going to call `bookmarksListCtrl.createBookmark()`, and then we're going to put it into create mode.

**bookmarks/bookmarks.html**
```html
<div class="bookmarks">
	<div ng-repeat="bookmark in bookmarksListCtrl.bookmarks | filter:{category:bookmarksListCtrl.getCurrentCategory().name}">
		<button type="button" class="close" ng-click="bookmarksListCtrl.deleteBookmark(bookmark)">&times;</button>
		<button type="button" class="btn btn-link" ng-click="bookmarksListCtrl.editBookmark(bookmark)">
			<span class="glyphicon glyphicon-pencil"></span>
		</button>
		<a href="{{bookmark.url}}" target="_blank">{{bookmark.title}}</a>
	</div>
	<div ng-if="bookmarksListCtrl.getCurrentCategory()">
		<button type="button" class="btn btn-link"
			ng-if="!bookmarksListCtrl.currentBookmark"
			ng-click="bookmarksListCtrl.createBookmark()">
			<span class="glyphicon glyphicon-plus"></span>
			Create Bookmark
		</button>
	</div>
</div>
```

What we have here is `createBookmark()`. It just initializes the new bookmark. `EditBookmark()` sets `currentBookmark` to the new bookmark we pass in. From there, when we emit the save event, then it'll call `saveBookmark()`. If there's an ID, then it'll update the bookmark. If not, it will create the bookmark. This is a simulated upsert pattern here.

**bookmarks/bookmarks.controller.js**
```javascript
createBookmark() {
    this.currentBookmark = this.initNewBookmark();
  }

editBookmark(bookmark) {
  this.currentBookmark = bookmark;
}

...

saveBookmark(bookmark) {
    if (bookmark.id) {
      this.BookmarksModel.updateBookmark(bookmark);
    } else {
      this.BookmarksModel.createBookmark(bookmark);
    }
  }
```
Once it's been saved, then we reset and we go from there. Now, we're going to add in the `save-bookmark` component and wire this up. We'll add the `save-bookmark` component to the DOM.

We're going to toggle the visibility here. First and foremost, we're only going to show this component if there is a `currentBookmark`. From here, we're going to pass in the bookmark that we want to edit. Then, let's hook up our output. We'll go save, and when save is emitted, we'll call `onSave()` and pass back the bookmark object.

On cancel, we're just going to call `reset()`, and that's just going to set `currentBookmark` to `null`.

**bookmarks/bookmarks.html**
```html
<div class="bookmarks">
	<div ng-repeat="bookmark in bookmarksListCtrl.bookmarks | filter:{category:bookmarksListCtrl.getCurrentCategory().name}">
		...
	</div>
	<div ng-if="bookmarksListCtrl.getCurrentCategory()">
	  ...
	</div>
	<save-bookmark
		ng-if="bookmarksListCtrl.currentBookmark"
		bookmark="bookmarksListCtrl.currentBookmark"
		save="bookmarksListCtrl.onSave(bookmark)"
		cancel="bookmarksListCtrl.reset()">
	</save-bookmark>
</div>
```

Let's hop into the browser and check this out. Now you can see that when we're on a category, we can click Create Bookmark and create the bookmark. If we click the Edit icon, it's passing that bookmark in, and we can edit it.

![Create Bookmark](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/using-angular-2-patterns-in-angular-1-x-apps/angular-1-x-isolate-state-mutations-in-angular-components-create-bookmark.png)

The problem is you can see as I typed in the title, it immediately updated it in not only the form but in the bookmarks list, as well, and if I canceled it, there's no way to back out of that. This is the problem of **shared mutable state**. How do we isolate that mutable operation so that we can back out of it or that change does not affect other places in the application?

The problem is that this form is bound directly to the bookmark object, and we need to work around that. The way that we're going to do that is we're going to create a `saveBookmarkController`. From here, we're going to define our `saveBookmarkController` class. Then, we're just going to hook into the `onChanges` event hook.

Let's just log this out real quick. 

**save-bookmark/save-bookmark.controller.js**
```javascript
class SaveBookmarkController{
  $onchanges() {
    console.log('ON CHANGE FIRED!');
  }
}
```

When this event is fired, we're just going to log out `On Change Fired!`. Let's hook this into our component. We'll add this to the configuration object here.

**save-bookmark/save-bookmark.component.js**
```javascript
let saveBookmarkComponent = {
  bindings: {
    bookmark: '<',
    save: '&',
    cancel: '&'
  },
  template,
  controller,
  controllerAs: 'saveBookmarkCtrl'
};
```
export default saveBookmarkComponent;

 Let's refresh the page. Now, let's clear this, and we'll now select a bookmark to edit.

![On Change Fired](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/using-angular-2-patterns-in-angular-1-x-apps/angular-1-x-isolate-state-mutations-in-angular-components-on-change.png)

You can see here that when we are updating `currentBookmark`, that we're firing the console log. This is a closer approximation to a **unidirectional data flow** in Angular 1 in one-way data binding that when we change the object, we're firing this `onChanges` event.

**save-bookmark/save-bookmark.controller.js**
```javascript
class SaveBookmarkController{
  $onchanges() {
    this.editedBookmark = Object.assign({}, this.bookmark);
  }
}
```

What we're going to do is we're going to create a new property called `editedBookmark`, and we're just going to use `object.assign` to return a new object that's a clone of the bookmark object. We'll update the form now to set the mutations on `editedBookmark`, leaving the bookmark that we sent in intact. We're just creating a local copy.

**save-bookmark/save-bookmark.html**
```html
<div class="save-bookmark">
	<h4 ng-if="!saveBookmarkCtrl.bookmark.id">Create a bookmark in
		<span class="text-muted">{{saveBookmarkCtrl.editedBookmark.category}}</span>
	</h4>
	<h4 ng-if="saveBookmarkCtrl.bookmark.id">Editing {{saveBookmarkCtrl.bookmark.title}}</h4>

	<form class="edit-form" role="form" novalidate
		ng-submit="saveBookmarkCtrl.save({bookmark:saveBookmarkCtrl.editedBookmark})" >
		<div class="form-group">
			<label>Bookmark Title</label>
			<input type="text" class="form-control" ng-model="saveBookmarkCtrl.editedBookmark.title" placeholder="Enter title">
		</div>
		<div class="form-group">
			<label>Bookmark URL</label>
			<input type="text" class="form-control" ng-model="saveBookmarkCtrl.editedBookmark.url" placeholder="Enter URL">
		</div>
		<button type="submit" class="btn btn-info btn-lg">Save</button>
		<button type="button" class="btn btn-default btn-lg pull-right" ng-click="saveBookmarkCtrl.cancel()">Cancel</button>
	</form>
</div>
```

Now, if I go here and I update this bookmark to point to the new angular.io site, you can see here that it's not updating, but when I save it, we're passing that up, and it is working.

You can see here that I can create something, and I can cancel it out, no harm, no foul. If I want to update it, because I'm editing the `editedBookmark` local object, then it's basically isolated to that component. Then, it's only updated when we send it back.

This is how you isolate state mutations within a component. You create a local object using `object.assign`, perform the mutable operations on that. If you want to cancel it, you throw it away. If you want to persist it, then you emit it back up to the parent or `smart component`.
