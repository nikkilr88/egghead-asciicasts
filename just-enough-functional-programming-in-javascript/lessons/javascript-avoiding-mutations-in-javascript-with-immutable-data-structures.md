`Mutable` data structures can be changed after creations, and `immutable` ones cannot. Mutations can be thought of as side effects in our applications. I'm going to demonstrate this through the use of an array.

#### index.js
```js
// Immutable Data

// Mutable = can be changed after creation 
// Immutable = can't be changed after creation
```

Let's create an array `a`. We'll equal it to a few values. We're going to assign a variable `b` to `a`. What this does is create a new variable with the same reference as `a`. We can see this by using a strictly equals equality check, because it will check the references are the same, not that the values are the same.

```js
// Immutable Data

// Mutable = can be changed after creation 
// Immutable = can't be changed after creation

const a = [1, 2, 3]
const b = a
console.log(a === b)
```

Now, if I make an update to `b` by pushing a value onto it, if I log out `a`, we'll see that `a` has been updated as well. This is because `a` and `b` are not different arrays. They're a reference to the very same array.

```js
const a = [1, 2, 3]
const b = a
b.push(4)
console.log(a)
```

#### Terminal
```bash
$ node index.js
[ 1, 2, 3, 4 ]
```

When we make changes to one, we actually make changes to the other. This can be problematic in our code. Functionality that's operating on `b` would change `a`, even if we didn't intend to do that. The same holds true for objects.

If I create an object of `a`, we'll give a property `foo`, and we'll set it to `bar`. If I assign that reference to another variable `b`, and I make changes to `b`, such as reassigning `foo` to `baz`, if I log out `a.foo`, we'll see that it's been updated.

#### index.js
```js
const a = { foo: 'bar' }
const b = a 
b.foo = 'baz'
cosole.log(a.foo)
```

#### Terminal
```bash
$ node index.js
baz
```

This is problematic for functional programming,because it breaks the purity of our functions. When we make updates to data, we want to return brand new data structures that contain all the elements of the previous state of the data structure, plus our updates.

For instance, `push` is a mutation on an array. As you saw, it changes all references to that same array. However, we could create an immutable `push` function. It'll receive a `value` and an `array`, and will return a brand new `array` by using the spread operator to create a `clone`, and then `push` the `value` onto that.

#### index.js
```js
const push = value => array => {
  const clone = [...array]
  clone.push(value)
  return clone
}
```

If we create an array again of one, two, and three, this time, if I make a second array by pushing a value onto it using our new function -- we'll `push(4)`, and we'll use `a` -- we'll see that `a` hasn't been updated. We'll also see that `a` and `b` do not equal, because they are references to different arrays.

```js
const push = value => array => {
  const clone = [...array]
  clone.push(value)
  return clone
}

const a = [1, 2, 3]
const b = push(4)(a)
console.log(a)
console.log(a === b)
```

#### Terminal
```bash
$ node index.js
[ 1, 2, 3 ]
false
```

We can create similar functionalities to handle changes to objects and so forth. One metaphor I like to use to describe this to people is the metaphor of taking a drink from a glass. I'm going to create two classes, a mutable glass and an immutable glass.

We'll make a `takeDrink` method on both of them, and show the difference between handling it mutably and immutably. We'll start with the `MutableGlass`. We'll have a `constructor` that takes a `content` and an `amount`, and assigns `this.content` to `content` and `this.amount` to `amount`.

```js
class MutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount 
  }
}
```

Then we'll create a `takeDrink` method that will take a `value`. What we will do is we'll update `this.amount` directly, and we'll return `this` instance of the glass. `this.amount` equals `Math.max`. We're going to use this to guarantee that we never get less than zero amount in our instance, since we can't drink what's not there. Then we'll `return this`. 

```js
class MutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount 
  }

  takeDrink(value) {
    this.amount = Math.max(this.amount - value, 0)
    return this
  }
}
```

If we create a glass, we'll call it `mg1` equals `new MutableGlass`. We'll give it a content of `water` and an amount of `100`.

```js
class MutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount 
  }

  takeDrink(value) {
    this.amount = Math.max(this.amount - value, 0)
    return this
  }
}

const mg1 = new MutableGlass('water', 100)
```

Now, if we store the value returned to us after taking a drink, we can see that they are the same instance through a strictly equals comparison, and see that both `mg1's` `amount` and `mg2's` `amount` is the same, which makes sense, since they're the same instance.

```js
const mg1 = new MutableGlass('water', 100)
const mg2 = mg1.takeDrink(20)
console.log(mg1 === mg2)
console.log(mg1.amount === mg2.amount)
```

We'll log this out in our terminal, and we get `true` in each case. 

#### Terminal
```bash
$ node index.js
true 
true
```

That's because we handle it mutably. We change the value directly, and we've changed the data structure after its creation. I'm going to comment these out, so that they don't turn up the next time I run the terminal.

```js
const mg1 = new MutableGlass('water', 100)
const mg2 = mg1.takeDrink(20)
// console.log(mg1 === mg2)
// console.log(mg1.amount === mg2.amount)
```

Now, we'll create an `ImmutableGlass`. The `constructor` will look exactly the same, with a `content` and an `amount`. `this.content` equals `content`, `this.amount` equals `amount`. We'll make a `takeDrink` method that also takes a `value`, but here's where a big change occurs.

```js
const mg1 = new MutableGlass('water', 100)
const mg2 = mg1.takeDrink(20)
// console.log(mg1 === mg2)
// console.log(mg1.amount === mg2.amount)

class ImmutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {

  }
}
```

But here is where a big change occurs. When we take a drink, rather than returning back the same glass that I had before, I'm going to `return` a brand new glass with brand new content in the correct amount. To do this, we simply create a `new ImmutableGlass` from within.

```js
class ImmutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {
    return new ImmutableGlass
  }
}
```

We pass the `content` on again, because it should stay the same. We didn't turn water into wine or anything like that. Then for the amount, we'll do the same calculation, `this.amount` minus the `value`. The lowest it can be is `0`, but because we return a whole new glass, we should see that when we create glasses, when we make updates, their instances are no longer the same.

```js
class ImmutableGlass {
  constructor(content, amount) {
    this.content = content
    this.amount = amount
  }

  takeDrink(value) {
    return new ImmutableGlass(this.content, Math.max(this.amount - value, 0))
  }
}
```

We'll create an `ig1` variable. That's a `new ImmutableGlass`. We'll also make it `water`, and we'll give it `100`. Then if we store the glass returned to us after we take a drink from `ig1` -- `takeDrink`, we'll do `20` -- what we should see is that when we compare `ig1` and `ig2`, they aren't the same instance anymore.

```js
const ig1 = new ImmutableGlass('water', 100)
const ig2 = ig1.takeDrink(20)
console.log()
```

We can do that doing a strictly equals comparison. That should be `false`. We should see that the `amount` of `ig1` hasn't changed, and thus does not equal the value in `ig1`. Both of these should be false.

```js
const ig1 = new ImmutableGlass('water', 100)
const ig2 = ig1.takeDrink(20)
console.log(ig1 === ig2)
console.log(ig1.amount === ig2.amount)
```

#### Terminal 
```bash
$ node index.js
false
false
```