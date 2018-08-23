A reducer is a simple function that takes an accumulation and a value, and then returns a new accumulation. 

#### 2-write-reducers-for-different-data-types.js
```javascript
// reducer :: acc -> value -> acc
const reducer = (accumulation, value) => {
    // returns the new accumulation
    return accumulation + value;
};
```

Here we've got a simple example that takes an `accumulation` and a `value`, and then folds that `value` into the `accumulation` with an addition. We can call it like so. 

```javascript
reducer(10, 5); /*?*/ 15
```

If I've got 10 as my `accumulation`, five as my `value`, I end up with 15 as the result.

We can do the same thing with strings for instance, since they support addition. I can go "hello" as my `accumulation`, "Paul" as my `value`, and we can see our new accumulation is "hello Paul."

```javascript
reducer('hello', ' paul');  /*?/ hello paul
```

Reducing is not necessarily coupled to iteration, although they almost always happen together. What I mean by that is you often think of a reduction as being called in an array. Let's say we have an array with five numbers in it. 

```javascript
[1,2,3,4,5]
```

Now we can call a `reduce` on this array. We pass in our `reducer` and our initial value. We see we get 15 as our result.

```javascript
[1,2,3,4,5].reduce(reducer, 0); /*?*/ 15
```

It's important to understand that the `reducer` is the argument that we pass to the reduce method. The actual reduce method on the array prototype is not a `reducer` in itself. It's just a method that abstracts away the iteration part and feeds these values into your `reducer`.

What I mean by that is we could be reducing manually here. If we save this value, then we can reduce over it again. 

```javascript
const res = reducer('hello', ' paul');
reducer(res, ' again '); /*?*/ hello paul again
```

That's really all that reduce does. It just keeps taking these values and feeding them into your `reducer` function.

Our reducer functions could work with pretty much anything, as well. To show that, let's add a reducer that adds keys to an object. I'm going to call that `objReducer`. 

That's going to take an accumulation and an object as the value. 

```javascript
const objReducer = (acc, obj) => {
}
```
Then it's going to return an object that spreads the accumulation and the object. This is going to add in any keys from this object into this accumulator.

```javascript
const objReducer = (acc, obj) => {
    return {
        ...acc,
        ...obj,
    }
}
```

Let's create a `user` object with a `name` Key and an `email`. 

```javascript
const user = {
    name: 'Paul',
    email: 'paul@test.test',
}
```

Then we can call our `objReducer` with our `user` object as the accumulator and another object as a value.  

```javascript
objReducer(user, {nickname: 'Pauly D'});
```

Now we can see we get a new object back with this nickname Key folded into this larger object.

```javascript
{ name: 'Paul', email: 'paul@test.test', nickname: 'Pauly D'}
```

Let's do one more example with a reducer that works with sets. 

Let's call this `setReducer`, which will take an accumulation and a `value`, just like before. 
This is going to return our accumulation with the value added into it. 

```javascript
const setReducer = (acc, value) => {
    return acc.add(value);
};
```

On a set, that operation's called `add`. We'll just `add` in the `value`. This is going to return the accumulation with that `value` added in.

To use it, let's create a set called `mySet`, and let's just create this set from an array of values. 

```javascript
const mySet = new Set([1,2,3,4]);
```

Then we can reduce over our set. I'll pass in `mySet`, add the value `5`, and we get a set back with `5` added in. 

```javascript
setReducer(mySet, 5); /*?*/ Set { 1, 2, 3, 4, 5 }
```

Since sets only have distinct values, if we were to add four here instead, we don't get two fours in our result.

```javascript
setReducer(mySet, 4); /*?*/ Set { 1, 2, 3, 4 }
```

In short, our reducers are just simple function that take an accumulation and a value and return a new accumulation. The return type of the accumulation must match the type that you pass in. With that in mind, it's really the function bodies of these reducers that couple us to the types of collections and values we can work with.