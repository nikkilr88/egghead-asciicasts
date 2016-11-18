One of the primary advantages of using **Redux** is that reducers are incredibly easy to test. By nature, they have a clearly defined contract of inputs and outputs. Because they are stateless, they require very little instrumentation to test in isolation.

In this lesson, we are going to learn how to test our reducers by kicking things off by tackling our `categories` reducer first. We'll step into our `category.spec.js`, and we're going to import the `categories` reducer, as well as the `GET_CATEGORIES` action constant.
#### categories.spec.js
``` javascript
import { categories, GET_CATEGORIES } from './categories.state';
```
Then we'll start with our initial `describe` block. Within that, we are going to create one more `describe` block that defines we are testing the `categories` reducer. Then from here, let's define a constant of `initialState`.

We're going to put two category items in here. We'll go with `Development`, and we'll do one more with a name of `Design`. 
#### categories.spec.js
``` javascript
describe('Categories', () => {
  describe('categories reducer', () => {
    const initialState = [
      {id: 0, name: 'Development'},
      {id: 1, name: 'Design'}
    ];
  })
})
```
Now that we have this `initialState` in place, let's go ahead and write our first test. The first thing we want to assert is that our reducer should `return an empty array for state by default`.
#### categories.spec.js
``` javascript
  describe('categories reducer', () => {
    const initialState = [
      {id: 0, name: 'Development'},
      {id: 1, name: 'Design'}
    ];

    it('should return an empty array for state by default', () => {

    })
  })
```
We are going to capture the `result` of calling `categories` with an `undefined` state, and a completely nonsensical `action` type that it will not recognize, `payload` of just an empty an object. What we can expect here is that we're just going to get an empty array.
#### categories.spec.js
``` javascript
it('should return an empty array for state by default', () => {
  const result = categories(undefined, { type: 'randmon', payload: {}});
  expect(result).toEqual([]);
})
```
We `expect` the result `toEqual` an empty array. Let's step into the terminal. We will run `npm test`. We are off to a good start. Let's write another test. Let's assert that we should `return initial state with an unknown action`.

We're going to capture the `result` of calling `categories` with the `initialState`, and we're going to do an action type of something that it will not recognize, and a `payload` of just an empty object. Now we can `expect` the `result toEqual`, or rather `toBe`, the `initialState`.
#### categories.spec.js
``` javascript
it('should return initial state with an unknown action', () => {
  const result = categories(initialState, { type: 'random', payload: {}});
  expect(result).toBe(initialState);
})
```
Back into the terminal, let's run our test again. We are two for two. Now what we want to test is that we get the correct `payload` when we send in an `action` type that it recognizes, in this case, `GET_CATEGORIES`.

We'll capture the output one more time of calling `categories`. `result` equals `categories`. We'll send in `initialState` of `undefined`, type of `GET_CATEGORIES`, and a `payload` of `initialState`. Now, because we're passing in an `action` type that it will recognize with a `payload`, we expect the `result toEqual` the `payload` that we sent in. In this case, it is `initialState`.
#### categories.spec.js
``` javascript
it('should return correct payload on GET_CATEGORIES action', () => {
  const result = categories(undefined, { type: GET_CATEGORIES, payload: initialState});
  expect(result).toBe(initialState);
})
```
Let's run our test again. We're three for three. Let's just cap this off with some semicolons, and let's move on to our `bookmarks` reducer. It's a little bit more involved, so the tests are going to get slightly more interesting.

The first thing we need to do is import our `bookmarks` reducer, as well as the action constants that we need to test our reducer. In this case, `GET_BOOKMARKS`, `CREATE_BOOKMARK`, `UPDATE_BOOKMARK`, and `DELETE_BOOKMARK`.
#### bookmarks.spec.js
``` javascript
import { bookmarks, GET_BOOKMARKS, CREATE_BOOKMARK, UPDATE_BOOKMARK, DELETE_BOOKMARK } from './bookmarks.state';
```
Now that we have these imported, let's start with our initial `describe` block, where we're letting the world know that we're testing `bookmarks`. Then from here, let's create an `initialState` constant of two `bookmarks`.

We'll go with an `id: 0`. We'll give it a title of `AngularJS`. We'll create one more `bookmark` item. We'll give this a title of `egghead.io`. Let's go ahead and write our first test, just to make sure that we've spun up everything correctly.
#### bookmarks.spec.js
``` javascript
describe('Bookmarks', () => {
    const initialState = [
      {id: 0, title: 'AngularJS'},
      {id: 1, title: 'egghead.io'}
    ];

  })
```
It `should return an empty array for state by default`. We'll capture the output of calling our `bookmarks` reducer by giving it an input of an `undefined` initial state, and a `type` of `random`, which it will not recognize, and a `payload` of an empty object.
#### bookmarks.spec.js
``` javascript
it('should return an empty array for state by default'), () => {
  const result = bookmarks(undefined, { type: 'random', payload: {}});
  expect(result.toEqual([]);
  )}
```
We're just testing that, indeed, we get the appropriate initial state, which in this case, is just an empty array. Let's run our test. It passed. There's a few more tests we could do around initializing the reducer, but let's move on, and write a test to verify that we can create a `bookmark`, and that our reducer handles that properly.

It `should return state with added bookmark on CREATE_BOOKMARK action`. What we're going to do here is we're first going to define our `newBookmark`. This will just be an object with an `id: 2`. We'll give it a `title` of `A List Apart`.
####bookmarks.spec.js
``` javascript
it('should return state with added bookmark on CREATE_BOOKMARK action', () => {
  const newBookmark = {id: 2, title: 'A List Apart'}

})
```
Then we can also define the `nextState` collection, which is just going to be the concatenation of our `initialState` with the `newBookmark`. From here, let's capture the `result` of calling `bookmarks`. We'll go `bookmarks`, and we'll give it an `initialState`.

Then we'll give it an `action` item of type `CREATE_BOOKMARK`, and a `payload` of `newBookmark`. Based on this input, we can assert that our output is going to be `nextState`. `expect(result).toEqual(nextState)`. Let's test it out. That test also passed.
####bookmarks.spec.js
``` javascript
it('should return state with added bookmark on CREATE_BOOKMARK action', () => {
  const newBookmark = {id: 2, title: 'A List Apart'},
  nextState = [...initialState, newBookmark],
  result = bookmarks(initialState, {
    type: CREATE_BOOKMARK,
    payload: newBookmark
  });

  expect(result).toEqual(nextState);
})
```
Let's go ahead and test the ability to update an existing bookmark within our collection. It `should return state with updated object on UPDATE_BOOKMARK action`. What we're going to do is define an `updatedBookmark`.

We'll give it a new updated `title`, `Angular JS Updated`. Then let's capture the `result`. `bookmarks`, pass in `initialState`. We'll do an action type of `UPDATE_BOOKMARK`, and we'll pass in the `updatedBookmark` as the `payload`.
#### bookmarks.spec.js
``` javascript
it('should return state with updated object on UPDATE_BOOKMARK action', () => {
  const updatedBookmark = { id: 0, title: 'AngularJS Updated'},
    result = bookmarks(initialState, {
      tyoe: UPDATE_BOOKMARK,
      payload: updatedBookmark
    })

    expect(result[0].title)toBe(updatedBookmark.title);
})
```
Then from here, we can assert that the first item in our result, the `title` of that object was the same as the `title` of our `updatedBookmark`. Let's test this out. That passed as well. Let's write one more test to test our ability to delete a `bookmark` from the `bookmarks` collection.

It `should return state without deleted object on DELETE_BOOKMARK action`. What we're going to do here is we're going to define the `bookmark` that we want to delete. We'll go with an `id: 0`, title `AngularJS`. We didn't really need to put a `title`, but it just makes it a little easier to read.

We can capture the result, so `bookmarks` with the `initialState`. Then we're going to give it an action type of `DELETE_BOOKMARK`, and a `payload` of `deletedBookmark`. Now just need to assert that `deletedBookmark` is not in the result, so `not.toContain(deletedBookmark)`. Let's go ahead and run this. That test passed as well.
#### bookmarks.spec.js
``` javascript
it('should return state without deleted object on DELETE_BOOKMARK action', () => {
  const deletedBookmark = { id: 0, title: 'AngularJS'},
  result = bookmarks(initialState, {
    type: DELETE_BOOKMARK,
    payload: deletedBookmark
  });

  expect(result).not.toContain(deletedBookmark);
})
```
Let's do a quick review. We imported our reducer and our `action` constants so that we could call our reducer. We created an `initialState`, and from there, we just simply captured the result of calling the reducer, and then we wrote some simple assertions to make sure that what we got in the result is what we expected.

This is how you test reducers in an Angular application.