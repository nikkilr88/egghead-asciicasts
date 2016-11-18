In this lesson, we are going to take a few minutes to review what we have covered up to this point by taking everything that we've learned, and applying it to the `bookmarks` component.

We are not going to be introducing any new concepts, but rather reinforcing what we've already covered, while allowing us to build out our application incrementally, while avoiding any major leaps in the narrative arc.

Let's get started by creating our `bookmark.state.js` file. The first thing we're going to do is create our `bookmarks` reducer. We're going to give it an initial state of `initialBookmarks`, and we'll start with an initial action type of `GET_BOOKMARKS`.
#### bookmarks.state.js
``` javascript
export const bookmarks = (state = initialBookmarks, {type, payload}) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
    default:
      return state;
  }
};
```
Let's go ahead and build out the `initialBookmarks` collection. We're just going to pull this from the bookmarks model. We'll copy that, paste it in. 
#### bookmarks.state.js 
``` javascript
const initialBookmarks = [
  {"id":1, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
  {"id":2, "title": "Egghead.io", "url": "http://egghead.io", "category": "Development"},
  {"id":3, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design"},
  
  ...
]
```
From here, let's go ahead and define our constant for `GET_BOOKMARKS`. We'll just break this code up with a few comment blocks real quick. From here, `export const GET_BOOKMARKS`. 
#### bookmarks.state.js
``` javascript
export const GET_BOOKMARKS = 'GET_BOOKMARKS';
```
Now that we have our reducer created, let's go ahead and add it to our application. We're going to import the `bookmarks` reducer.
#### app.js
``` javascript
import { bookmarks } from './components/categories/bookmarks.state';
```
We'll add it to our `combinedReducers` call so that it is available to the `store`. 
#### app.js
``` javascript
const rootReducer = combineReducers({
  categories,
  category,
  bookmarks
});
```
Let's hop into the `bookmarks.js` file. We are going to get rid of this call to the model because we no longer need that. We'll update our `subscribe` function to include a `getState` call to grab the `bookmarks`. 

We'll assign that to `this.bookmarks`. From here, let's go ahead and call `dispatch` on the `store` to get our `bookmarks`. We'll go type, and we'll just do this as a string for now. We'll replace it with a call to the action creator in just a moment. Let's refresh the page.
#### bookmarks.js
``` javascript
$onInit() {
  this.deleteBookmark = this.BookmarksModel.deleteBookmark;

  this.store.subscribe(() => {
    this.bookmarks = this.store.getState().bookmarks;
    this.currentCategory = this.store.getState().category;
  });

  this.store.dispatch({type:'GET_BOOKMARKS'});
}
```
You can see that we are still getting our `bookmarks`. Let's hop into our `bookmarks.state` file, and let's build out our action creator. We're going to call `this.bookmark.actions`. We want to start with a `getBookmarks` function.

That's going to accept a `bookmarks` parameter. From here, we are going to return an `action` of type `GET_BOOKMARKS` with the `payload` of the `bookmarks` that we are sending in.

Because this is using the **revealing module pattern**, we're just going to return the `getBookmarks` method in our return object.
#### bookmarks.state.js
``` javascript
export const BookmarksAction = () => {
  const getBookmarks = bookmarks => {
    return { type: GET_BOOKMARKS, payload: bookmarks }
  };

  return {
    getBookmarks
  }
}
```
From here, we're going to import it into our `bookmarks.js` file. 
#### bookmarks.js
``` javascript
import { BookmarksActions } from './bookmarks.state';
```
We're going to go down to our `module` definition, and we're going to add this using the `factory` method. 
#### bookmarks.js
``` javascript
const BookmarksModule = angular.module('bookmarks', [
  SaveBookmarksModule.name
  ])
  .factory('BookmarksActions', BookmarksActions)
  .component('bookmarks', BookmarksComponent);

```
Now that it is available to our Angular application, let's go ahead and inject it into the `BookmarksController`. `this.BookmarksActions = this.BookmarksActions`. 
#### bookmarks.js
``` javascript
constructor($ngRedux, BookmarksActions, BookmarksModel) {
  'ngInject';

  this.store = $ngRedux;
  this.BookmarksActions = BookmarksActions;
  this.BookmarksModel = BookmarksModel;
}
```
We can replace this handcrafted action item with a call to the action creator, in this case `this.BookmarksActions.getBookmarks`. Let's refresh the page, and everything is still working.
#### bookmarks.js
``` javascript
this.store.dispatch(
  this.BookmarksActions.getBookmarks();
);
```
Now we've created a reducer and an action creator to handle the `bookmarks` collection. Now we need to create a reducer to handle the individual `bookmark` that we have selected. We'll start by creating a `bookmark` reducer with an initial `state` of `initialBookmark`.
#### bookmarks.state.js
``` javascript
export const bookmark = (state = initialBookmark, {type, payload}) => {
  switch (type) {
    case GET_SELECTED_BOOKMARK:
      return payload || state;
    default:
      return state;
  }
}
```
We'll start with an initial action type of `GET_SELECTED_BOOKMARK`. Let's go ahead and define our `initialBookmark`. This is just going to be, for the most part, just a blank bookmark. `id: null`, `name` is an empty string, `url` is an empty string, and `category` is null.
#### bookmarks.state.js
``` javascript
const initialBookmark = { id: null, name: '', url: '', category: null}
```
From here, let's go up and define our action constant. Let's go ahead and create one more, since we're here. We're going to call this action constant `RESET_SELECTED_BOOKMARK`. What this is going to be for is if we want to just clear the decks, and start with this blank `bookmark.`
#### bookmarks.state.js
``` javascript
export const GET_SELECTED_BOOKMARK = 'GET_SELECTED_BOOKMARK'
export const RESET_SELECTED_BOOKMARK = 'RESET_SELECTED_BOOKMARK'
```
We're just going to return `initialBookmark` when this action comes through the reducer. 
####bookmarks.state.js
``` javascript
switch (type) {
    case GET_SELECTED_BOOKMARK:
      return payload || state;
    case RESET_SELECTED_BOOKMARK:
      return initialBookmark;
    default:
      return state;
  }
```
Now we need to expose these via our actions creator. We'll start with `RESET_SELECTED_BOOKMARK`. All this is going to do is just return an action with type `RESET_SELECTED_BOOKMARK`. This is fairly simple.
####bookmarks.state.js
``` javascript
const resetSelectedBookmark = () => {
  return { type: RESET_SELECTED_BOOKMARK }
}

return {
  getBookmarks,
  resetSelectedBookmark
}
```
Let's go ahead and add it to our `return` object. Let's build out the `selectBookmark` method. We need to do a couple things here for this to work. The first thing we need to do is inject `$ngRedux` so that we can pull the category off of the store. We'll do `'ngInject'` so that gets injected properly. 
#### bookmarks.state.js
``` javascript
export const BookmarksActions = ($ngRedux) => {
  'ngInject';

  ...
}
```
Then we'll define our `selectBookmark` method that takes a `bookmark` parameter. We're going to return a type of `GET_SELECTED_BOOKMARK`, and a `payload` object.
####bookmarks.state.js
``` javascript
const selectBookmark = bookmark => {

  return { type: GET_SELECTED_BOOKMARK, payload };
}
```
Using [destructuring](https://egghead.io/lessons/ecmascript-6-destructuring-assignment), we're going to pull the `category` off of the return object from `getState.` This is just a handy shortcut for doing that. In our `payload` object, we're going to check and see are we working with a new `bookmark`, or an existing `bookmark`?

We see is there an `id`? If there is, just return the bookmark. If not, we're going to create a new object that's going to take the `bookmark` that we have, and we're going to go ahead and pre-fill the category property with the currently selected category from the store. We're also going to set the bookmark to have initial type of `initialBookmark` if we do not pass anything in. 
#### bookmarks.state.js
``` javascript
const selectBookmark = bookmark => {
  const { category } $ngRedux.getState(),
    payload = bookmark.id ? bookmark
      : Object.assign({}, bookmark, { category: category.name });

  return { type: GET_SELECTED_BOOKMARK, payload };
};
```
This is the default value if we do not pass this in. Let's add this to our `return` object here. Let's go ahead and add in the `bookmark` reducer, and make this available to our store. We'll add this into our `combinedReducers` call.
#### app.js
``` javascript
import { bookmarks, bookmark } from './components/bookmarks/bookmarks.state';

const rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
})
```
Now we can hop into our `bookmarks.js`, and let's get rid of the `BookmarksModel`. We no longer need that, so we can delete this line here. We'll delete this line here, and let's mark sure to `subscribe` to the `bookmark` object on the store. `this.currentBookmark = this.store.getState().bookmark`.
####bookmarks.js
``` javascript
class BookmarksController {
  constructor($ngRedux, BookmarksAction) {
    'ngInject';

    this.store = $ngRedux;
    this.BookmarksActions = BookmarksActions;
  }

  $onInit() {
    this.store.subscribe(() => {
      this.bookmarks = this.store.getState().bookmarks;
      this.currentBookmark = this.store.getState().bookmark;
      this.currentCategory = this.store.getState().category;
    })
  }
}
```
You'll notice here the `createBookmark`, `editBookmark` methods really deal with `bookmark` selection, which we no longer need. Let's delete these three methods here. They're being handled by our reducer and our action creator.

We're just going to make this an empty method for now. We're going to also define a `deleteBookmark` method. We'll leave this empty as well. We'll get to that in another lesson. From here, let's build out our `selectBookmark` method.
#### bookmarks.js
``` javascript
saveBookmark(bookmark) {}
deleteBookmark(bookmark) {}
```
`selectBookmark`, it takes a `bookmark`, and all it's going to do is dispatch an action to be picked up by the reducer. `this store.dispatch`, `bookmarkActions`, `selectBookmark`. We're going to pass in the `bookmark` parameter.
#### bookmarks.js
``` javascript
selectBookmark(bookmark) {
  this.store.dispatch(
    this.BookmarksActions.selectBookmark(bookmark);
  )
}
```
Let's go ahead and also build out our `resetSelectedBookmark` method. All this is going to do is call `this.store.dispatch`, and `this.bookmarks.resetSelectedBookmark`.
#### bookmarks.js
``` javascript
resetSelectedBookmark() {
  this.store.dispatch(
    this.BookmarksActions.resetSelectedBookmark()
  );
}
```
Now that we have defined `resetSelectedBookmark`, let's update this call here. We can also delete the method below. We've just defined a `selectBookmark` method that calls `selectBookmark` on our bookmarks actions, and then a `resetSelectedBookmark` that calls `resetSelectedBookmark` on our actions as well.
#### bookmarks.js
``` javascript
onSave(bookmark) {
  this.saveBookmark(bookmark);
  this.resetSelectedBookmark();
}
```
Essentially what we've done is just updated the way that we are selecting a `bookmark` in our application, but we need to update our template. When we want to edit a `bookmark`, we just select that bookmark, and send it into our action creator to be handled.

As well as when we want to create a bookmark, we're going to also call `selectBookmark`, but we're not going to call anything. Because there's always some form of a `bookmark`, we need to update these conditions here to actually check to see if there is a `category` on that object.
#### bookmark.html
``` javascript
<div class="bookmarks">
	<div ng-repeat="bookmark in bookmarksListCtrl.bookmarks | filter:{category:bookmarksListCtrl.currentCategory.name}">
		<button type="button" class="close" ng-click="bookmarksListCtrl.deleteBookmark(bookmark)">&times;</button>
		<button type="button" class="btn btn-link" ng-click="bookmarksListCtrl.selectBookmark(bookmark)">
			<span class="glyphicon glyphicon-pencil"></span>
		</button>
		<a href="{{bookmark.url}}" target="_blank">{{bookmark.title}}</a>
	</div>
	<div ng-if="bookmarksListCtrl.currentCategory.name">
		<button type="button" class="btn btn-link"
			ng-if="!bookmarksListCtrl.currentBookmark.category"
			ng-click="bookmarksListCtrl.selectBookmark()">
			<span class="glyphicon glyphicon-plus"></span>
			Create Bookmark
		</button>
	</div>
	<save-bookmark
		ng-if="bookmarksListCtrl.currentBookmark.category"
		bookmark="bookmarksListCtrl.currentBookmark"
		save="bookmarksListCtrl.onSave(bookmark)"
		cancel="bookmarksListCtrl.reset()">
	</save-bookmark>
</div>
```
We'll also update our call to the `resetSelectedBookmark`. Let's hop into our browser, and see if everything is working. Refresh the page, and you can see that we can select a `category`. From here, we can select a `bookmark` for editing. We can cancel as well as select a new `bookmark` to create.

Let's hop back into the code, and do a quick review over what we've built out thus far. We have created a bookmarks reducer that sets the initial state to this `initialBookmarks` collection.
#### bookmarks.state.js
``` javascript
export const bookmarks = (state = initialBookmarks, {type, payload}) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
    case CREATE_BOOKMARK:
      return [...state, payload];
    case UPDATE_BOOKMARK:
      return state.map(bookmark => bookmark.id === payload.id ? payload : bookmark);
    case DELETE_BOOKMARK:
      return reject(state, bookmark => bookmark.id === payload.id);
    default:
      return state;
  }
};
```
We're accessing it via an action type of `GET_BOOKMARKS`. We've also created a bookmark reducer that takes an `initialBookmark` for its initial state that we are accessing via `GET_SELECTED_BOOKMARK`. We're also enabling the user to reset the selected bookmark using the action type `resetSelectedBookmark`.
#### bookmarks.state.js
``` javascript
export const bookmark = (state = initialBookmark, {type, payload}) => {
  switch (type) {
    case GET_SELECTED_BOOKMARK:
      return payload || state;
    case RESET_SELECTED_BOOKMARK:
      return initialBookmark;
    default:
      return state;
  }
};
```
From here, we created our `bookmarks` actions, which just streamlines the creation of our action items. `getBookmarks` takes a `bookmarks` parameter, and then returns an action object with a type of `GET_BOOKMARKS` and the `payload` of `bookmarks`.
#### bookmarks.state.js
``` javascript
const getBookmarks = bookmarks => {
    return { type: GET_BOOKMARKS, payload: bookmarks };
  };
```
`resetSelectedBookmark` just returns an action object with a type of `resetSelectedBookmark`. More importantly, `selectBookmark` allows us to send in a `bookmark`, and from there, we determine does it have an `id` or not?
#### bookmarks.state.js
``` javascript
 const resetSelectedBookmark = () => {
    return { type: RESET_SELECTED_BOOKMARK }
  };

    const selectBookmark = (bookmark = initialBookmark) => {
    const { category } = $ngRedux.getState(),
      payload = bookmark.id ? bookmark : Object.assign({}, bookmark, { category: category.name });

    return { type: GET_SELECTED_BOOKMARK, payload };
  };
```
If it does have an `id`, it's an existing `bookmark` that we want to edit. If not, we need to essentially assume that it is a blank `bookmark` or an `initialBookmark`, but we're going to pre-populate the `category` property by getting the `category` object off of the application store.

We imported the `bookmarks` and `bookmark` reducer into our main application file, and then added them to the application store by adding them as parameters to our `combinedReducers` method call. 
#### app.js
``` javascript
const rootReducer = combineReducers({
  categories,
  category,
  bookmarks,
  bookmark
});
```
Within the `bookmarks` file itself, in the controller, we got rid of `BookmarksModel`.

We replaced that with `bookmarks` action. We updated our `subscribe` method to not only pull in `currentCategory`, but the `bookmarks`, and the `currentBookmark`. Then we are getting all of our `bookmarks` by calling `this.store.dispatch` and `BookmarkActions.getBookmarks()`.
#### bookmarks.js
``` javascript
  $onInit() {
    this.store.subscribe(() => {
      this.bookmarks = this.store.getState().bookmarks;
      this.currentBookmark = this.store.getState().bookmark;
      this.currentCategory = this.store.getState().category;
    });

    this.store.dispatch(
      this.BookmarksActions.getBookmarks()
    );
  }
```
We just stubbed out `saveBookmark` and `deleteBookmark`, which we'll fill in in another lesson. From `selectBookmark`, we are just passing that into the actions creator. `ResetSelectedBookmark`, same thing.

We updated our `onSave` method to call `resetSelectedBookmark`. From here, because of how we are handling selection now, we needed to update the template so that when we want to edit a `bookmark`, we're just calling `selectBookmark`, and we're handing it off to the action creator for processing.

We're doing the same thing when we want to create a `bookmark`. We're just calling `selectBookmark`, but then we are using that `initialBookmark` default parameter to set that. Because there's always some form of a `currentBookmark`, we need to not just check if the `bookmark` exists, but does it have a `category` name?

This is a review over everything we've covered up to this point, as applied to the `bookmarks` component, in terms of the `bookmarks` and `bookmark` reducers, the actions creator, and how we integrate it into our Angular application.