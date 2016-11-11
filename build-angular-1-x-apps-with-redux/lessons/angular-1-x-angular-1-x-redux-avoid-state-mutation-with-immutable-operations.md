One of the biggest mental shifts that developers have to take when embracing **Redux** is shifting from mutable operations to **immutable operations**. The problem with mutable operations is that they create side effects that involve anything else that is referencing the thing that is being mutated.

With immutable operations within a reducer, **a new object is returned for every operation**, completely bypassing the possibility that an existing reference is going to be compromised. It is then up to the consumer to decide how they want to get the new data and what they want to do with it.

In this lesson, we are going to flesh out the CRUD functionality of our `bookmarks` Reducer, and do them first using mutable operations, and then refactor them to use immutable operations.

We're going to start by laying the groundwork in our `bookmarks.state.js` file by defining some **action constants**. The first action constant that we're going to create is `CREATE_BOOKMARK`, and we'll go ahead and create one for `UPDATE_BOOKMARK`, and then let's do `DELETE_BOOKMARK` as well.
#### bookmarks.state.js
``` javascript
export const CREATE_BOOKMARK = 'CREATE_BOOKMARK';
export const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
```
From here, let's go ahead and extend our bookmarks actions creator. We're going to build out the `deleteBookmark` method, and this is just going to return an `action` object with the type `DELETE_BOOKMARK` and a `payload` of `bookmark`.
#### bookmarks.state.js
``` javascript
const deleteBookmark = bookmark => {
    return { type: DELETE_BOOKMARK, payload: bookmark };
  };
```
We will build out the `saveBookmark` method, and that's going to also accept a `bookmark`. From here, we're going to create a variable to test that we have an `id`. Are we working with an existing `bookmark`, or a new one? Based on the presence of that `id`, we are either going to do an `UPDATE_BOOKMARK` type or a `CREATE_BOOKMARK` Action type.
#### bookmarks.state.js
``` javascript
const saveBookmark = bookmark => {
  const hasId = !!bookmark.id,
    type = hasId? UPDATE_BOOKMARK : CREATE_BOOKMARK;

}
```
If there's not a `bookmark`, we need to go ahead and add one. We're going to simulate the back end by setting the `id` on the `bookmark` using the `uniqueId` method off of **Lodash**, and we're going to seed that with `100`. That's temporary, just to simulate calling the back end, and then we're going to return an action object with the type that we created above and the payload of `bookmark`.
#### bookmarks.state.js
``` javascript
const saveBookmark = bookmark => {
  const hasId = !!bookmark.id,
    type = hasId? UPDATE_BOOKMARK : CREATE_BOOKMARK;
    
  if(!hasId) bookmark.id = uniqueId(100); // simulating backend

  return { type, payload: bookmark };
};
```
Let's go ahead and import this method from Lodash. `import { uniqueId } from Lodash`, and then we'll go ahead and add these methods to our return object.
####bookmarks.state.js
``` javascript
import { uniqueId } from Lodash

return {
  return {
    getBookmarks,
    selectBookmark,
    saveBookmark,
    deleteBookmark,
    resetSelectedBookmark
  }
}
``` 
`saveBookmark`, and `deleteBookmark`. Now that these are defined, let's hop into our `BookmarksController` and build out these two methods here.

`this.store.dispatch`. We're going to call `BookmarksActions.saveBookmark`, and being that the shape is nearly identical, we're going to copy this, go into `deleteBookmark`, paste this in, and update our method call to call `deleteBookmark`.
#### bookmarks.js
``` javascript
saveBookmark(bookmark) {
    this.store.dispatch(
      this.BookmarksActions.saveBookmark(bookmark)
    )
  }

  deleteBookmark(bookmark) {
    this.store.dispatch(
      this.BookmarksActions.deleteBookmark(bookmark)
    )
  }
```
Everything is in place for our CRUD functionality within our application except for in the `Bookmarks` Reducer. Let's go ahead and start with the `CREATE_BOOKMARK` handler. What we're going to do here is simply push the `payload` into `state`. This is one way to get an object into an array. It's simply using the `.push` method.
#### bookmarks.state.js
``` javascript
export const bookmarks = (state = initialBookmarks, {type, payload}) => {
  switch (type) {
    case GET_BOOKMARKS:
      return payload || state;
    case CREATE_BOOKMARK:
      state.push(payload);
      return state;
    default:
      return state;
  }
}
```
You can see here that it does indeed work, but we are obviously mutating the `state` property. We're going to go `Object.freeze`, and we're going to freeze the `state` object. Let's refresh and see what happens when we try this one more time.

We'll give it a title, URL, Save, and `Object.freeze` is now throwing an error. We need to find a way to do this without mutating the existing state object. The way to do that, one way, is using the `concat` method on array.
#### bookmarks.state.js
``` javascript
case CREATE_BOOKMARK:
  Object.freeze(state);
  return state.concat(payload);
```
We can go `state.concat`, and then pass in the `payload`. This returns a new array with the `payload` at the end of it. Let's go ahead and try this out again. You can see that it added it to the collection, and we did not trigger any error from `Object.freeze`.

There's a shorthand way to do this, by essentially creating a new array and then using the [spread operator](https://egghead.io/lessons/ecmascript-6-using-the-es6-spread-operator) to pass in `state` and `payload`. We'll just verify that this is working as well, and we're not throwing any errors. We're go to go.
#### bookmarks.state.js
``` javascript
case CREATE_BOOKMARK:
  Object.freeze(state);
  return [...state, payload];
```
Avoid using `array.push`. Instead use `array.concatonate` or `concat`, and you can even use the shorthand method. Let's go ahead and do `UPDATE_BOOKMARK`. The way to do this in a mutable fashion is to find out the index in the collection of the object you want to update, and once you know the index, then you can reference that and pass in the new object.

We're going to call `state.findIndex`, and we're going to loop through and compare the `id` until we find the `index` that the `payload` is at. From there, we're just going to replace that item with the new `payload`.
#### bookmarks.state.js
``` javascript
case UPDATE_BOOKMARK:
  const index = state.findIndex(b => b.id === payload.id);
  state[index] = payload;
  return state;
```
Let's see if this works. Refresh the page. We'll go ahead and save, and it does work, but I have a suspicion that this is a mutable operation. Let's throw a bunch of cold water on this parade. We'll do `Object.freeze`.

Let's try this again. We'll update this title, and you can see that it is a mutable operation, and so we need to find a way around this. What we need is essentially a new array that has the information that we need.

We can use the `map` operator to accomplish this. By calling `map`, it returns a new collection that has been iterated over, and the operations performed that we define in our `map` method. In this case, we're saying, "Compare the `bookmark.id` to the `payload.id`. If they match, return the `payload`. If not, return the `bookmark`." We can delete these lines, and let's see if this works.
#### bookmarks.state.js
``` javascript
case UPDATE_BOOKMARK:
  return state.map(bookmark => bookmark.id === payload.id ? payload : bookmark);
```
It does, and we're not throwing in an error. The main reason why -- and focus on this -- is that `map` is returning a new collection and not mutating the old one.

Let's do `DELETE_BOOKMARK`. We can do something similar above, is we can grab the `index` of the `bookmark` that we want to delete. We'll just do `state.findIndex`, and we'll loop through and compare the `id` of the current item to the `payload`.
#### bookmarks.state.js
``` javascript
case DELETE_BOOKMARK:
  const index = state.findIndex(b => b.id === payload.id);
  state.splice(index, 1);
  return state;
```
Once we have the index, then we can call `state.splice`, pass in the `index`, and we're going to remove one `item`. Let's test this out.

We are deleting bookmarks, but this is a mutable operation. Let's move `Object.freeze` into this block and verify our assumptions. Yes, you can see that the minute we tried to delete something, because it's frozen, we are throwing an error.

Just like `state.map`, `state.filter` returns a new collection as well, and so we can just filter out the `bookmark` that we want to delete and return that as a new collection. Let's go here, let's refresh, and let's delete all the bookmarks.
#### bookmarks.state.js
``` javascript
case DELETE_BOOKMARK:
  Object.freeze(state);
  return state.filter(bookmark => bookmark.id !== payload.id);
```
We're able to get a new collection, minus the bookmark we want to delete, and we're not messing up `Object.freeze`.

Just to review, we hooked up our `saveBookmark`, and `deleteBookmark` method so that we could call that from the controller, and then we created a mutable `CREATE_BOOKMARK` operation using the `concat` method.

For `UPDATE_BOOKMARK`, we used `state.map`, which returns a new collection, and for `DELETE_BOOKMARK`, we used `state.filter`.

This is how you do immutable operations within a Redux reducer in an Angular application.