In this lesson, we are going to extend our application `store` with a `subscribe` method so that we do not have to call `store.getState()` every single time we `dispatch` an action. In our `CategoriesController`, we are dispatching a `GET_CATEGORIES` action in a couple places.

**categories.js** 
``` javascript
  $onInit() {
    this.store.dispatch({ type: GET_CATEGORIES });
    this.categories = this.store.getState();

    this.$timeout(() => {
      const payload = [
        { id: 0, name: 'Redux' },
        { id: 1, name: 'Angular' }
      ];

      this.store.dispatch({ type: GET_CATEGORIES, payload });
      this.categories = this.store.getState();
    }, 3000);

    this.$timeout(() => {
      const payload = [
        { id: 0, name: 'Un Oh!' }
      ];

      this.store.dispatch({ type: GET_CATEGORIES, payload });
      this.categories = this.store.getState();
    }, 6000);
  }
```
This updates the `categories` collection within our application store, but in order for this change to be propagated back into our controller, we need to call `store.getState`. Depending on how many times we are calling `store.dispatch`, this could get very cumbersome.

Let's hop into our `app.store.js` file, and add a `subscribe` method so that state change is automatically pushed into our controller. The first thing that we're going to do is create a `listeners` collection. We'll initialize this to an empty array.

**app.store.js**
``` javascript
class Store {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];
  }
}
```
From here, we're going to add a `subscribe` method that takes a single parameter, which is `listener`. From here, we are going to add a `listener` to the `listeners` array. We could do `this.listeners.push(listener)`, but this is a mutable operation.
In an effort to favor a mutable operations, we're going to use the spread operator to concatenate this together into a new array. 

**app.store.js**
``` javascript
subscribe(listener) {
  this.listeners = [...this.listeners, listener];
}
```
From here, we're going to create an interesting function that, when it is returned, it's going to `filter` through the `listeners` collection, and return all of the `listeners` that do not match the `listener` that we passed in.

**app.store.js**
``` javascript
subscribe(listener) {
  this.listeners = [...this.listeners, listener];

  // return an unsubscribe function
  return () => {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}
```
What I've just described in an `unsubscribe` method. This is handy when you want to tear down a component that has a subscription. This allows us to call this method that we're returning, and then remove that from the `listeners` array.

We have the ability to add `listeners`. We need the ability to then essentially trigger the `listener` that we've passed in. Generally, this is just going to be a method. When something has been dispatched, we're just going to loop through the `listeners`, and call the `listener` method.

**app.store.js**
``` javascript
dispatch(action) {
  this.state = this.reducer(this.state, action);
  this.listeners.forEach(listener => listener());
}
```
Let's hop into our `CategoriesController`. We are going to subscribe to our `store`, so `this.store.subscribe`, and we're going to pass it in our `listener` method. Every time this gets called, we just want to call `this.categories = this.store.getState`.

**categories.js**
``` javascript
$onInit() {
    this.store.subscribe(() => {
      this.categories = this.store.getState();
    });

    this.store.dispatch({ type: GET_CATEGORIES });

  ...

}
```
We're still calling it after every dispatch. We're just abstracting out to the store. Now we can remove this line, and we can remove this line here. We're just going to keep going, and we can remove this line here. Let's hop into our browser, and see this working.

Refresh. Let's count to about three, and let's count to three again. You can see that our categories are still updating, even though we're not manually calling the `store.getState` within our controller. From here, let's go ahead and wire up this `unsubscribe` method that we're returning, just to see it working.

`this.unsubscribe` equals the result of calling `this.store.subscribe`. We can go anywhere into this code, and call this. We'll go into our second `dispatch` call. We're just going to call `this.unsubscribe`. It's going to call it with array with two items, but then in the third call, nothing's going to happen.

**categories.js**
``` javascript
 this.unsubscribe = this.store.subscribe(() => {
      this.categories = this.store.getState();
    });

 this.$timeout(() => {
      const payload = [
        { id: 0, name: 'Redux' },
        { id: 1, name: 'Angular' }
      ];

      this.store.dispatch({ type: GET_CATEGORIES, payload });
      this.unsubscribe();
    }, 3000);
```
We'll refresh, count to about three, and we could count to about infinity because nothing's going to happen at this point. We have unsubscribed. This is just handy to know about so that you can wire it up, for instance, on `onDestroy`.

If we take it out, we'll count to three, and then we'll count to three again. Lo and behold, `subscribe` is working in that third `dispatch` block. Let's do a quick review of what we've done in this lesson. We'll go into our `app.store`.

You can see that we have created a `listeners` array that we are sending in a `listener` method to be added to this array. At the bottom of this, we are returning an `unsubscribe` method that just returns the `listener` from the `listeners` that we passed in when it's called.

**app.store.js**
``` javascript
dispatch(action) {
  this.state = this.reducer(this.state, action);
  this.listeners.forEach(listener => listener());
}

subscribe(listener) {
  this.listeners = [...this.listeners, listener];

  // return an unsubscribe function
  return () => {
    this.listeners = this.listeners.filter(l => l !== listener);
  }
}
```
When we call `dispatch`, we are calling our `reducer`, but then we're looping through our `listeners`, and we're calling the `listener` method that we've passed in. From here, you can see that we're subscribing to the `store`, and passing in a method that, every time it gets called, it just calls `this.store.getState`, and returns that value, and assigns it to `this.categories`.

From here, we were able to remove the explicit `this.store.getState` call after all of our dispatch calls because, implicitly, we are updating our controller every time that we call `this.store.dispatch`. This is how you add a `subscribe` method to a store so that changes are automatically propagated to whoever is listening.