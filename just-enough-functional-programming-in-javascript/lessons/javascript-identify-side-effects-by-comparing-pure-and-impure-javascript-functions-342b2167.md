A pure function is a function that derives its output solely from its inputs, and causes no side effects in the application or outside world. The most common pure functions people have encountered are mathematical functions.

You might recall seeing a function that looks something like this. This is a function that receives one value, `x`, and derives its output from that value, in this case `x+1`. We can write this in JavaScript also.

#### index.js
```js
// f(x)= x + 1
const f = x => x + 1
```

It's pretty easy to reason that this is a pure function. We get the same output given the same input, and there's no outside world for us to cause a side effect in. To understand this further, let's compare this with several impure functions.

The first impure function we're going to make is one whose output is not solely derived from its inputs. For example, let's consider you're making a `cartTotal` function. For one reason or another, you've decided that one of the prices needs to be a global constant. Our `cartTotal` function takes a `quantity` and multiplies that against this constant.

```js
// Pure Functions

// f(x)= x + 1
const f = x => x + 1

// Ex 1 - Global State 
const COST_OF_ITEM = 19
const cartTotal = quantity =>
  COST_OF_ITEM * quantity 
```

On the surface, this will seem like a pure function, because we always get the same output based on the same input. We can see this by calling it multiple times with the same value and logging it out to the terminal. In both cases, we get 38.

```js
// Pure Functions

// f(x)= x + 1
const f = x => x + 1

// Ex 1 - Global State 
const COST_OF_ITEM = 19
const cartTotal = quantity =>
  COST_OF_ITEM * quantity 

console.log(cartTotal(2))
console.log(cartTotal(2))
```

#### Terminal
```bash
$ node index.js
38
38
```

While we're getting the same result, this is an impure function, because the state of our application has an effect on the output of our function. We can see this by changing the value of `COST_OF_ITEM` and outputting that to the terminal.

#### index.js
```js
const COST_OF_ITEM = 17
const cartTotal = quantity =>
  COST_OF_ITEM * quantity 

console.log(cartTotal(2))
console.log(cartTotal(2))
```

#### Terminal
```bash
$ node index.js
34
34
```

I'm going to comment these out, so they don't continue to log out in the terminal throughout the rest of the exercise.

#### index.js
```js
// console.log(cartTotal(2))
// console.log(cartTotal(2))
```

Our second example of an impure function is one that gets the same input and gives us different outputs. Oftentimes in our applications, we'll need to create objects that have unique identifiers, such as IDs.

```js
// Ex 2 - Same input, different output 
```

Let's create a `generateID` function. This function will return several integers randomly. We can see that this itself is an impure function. We can call it several times and we'll get a different result each time.

```js
// Ex 2 - Same input, different output 
const generateID = () =>
  Math.floor(Math.random() * 10000)

console.log(generateID())
console.log(generateID())
console.log(generateID())
```

#### Terminal
```bash
$ node index.js
4521
479
3974
```

Let's use our impure `generateID` function inside of a factory function to create user objects for us. To create a user, we'll take a `name` and an `age`, and we'll return an object with an `ID` using the `generateID` function to create it, and just return the `name` and `age`.

#### index.js
```js
// Ex 2 - Same input, different output 
const generateID = () =>
  Math.floor(Math.random() * 10000)

const createUser = (name, age) => ({
  id: generateID(),
  name,
  age
})
```

Let's call this several times, giving it the same inputs. In this case, I'll use my own name, `Kyle`, and my own age, `33`. 

```js
// Ex 2 - Same input, different output 
const generateID = () =>
  Math.floor(Math.random() * 10000)

const createUser = (name, age) => ({
  id: generateID(),
  name,
  age
})

console.log(createUser('Kyle', 33))
console.log(createUser('Kyle', 33))
console.log(createUser('Kyle', 33))
```

We'll save it and print it to the terminal. We'll see that we get similar objects, but they're not the same. The ID is different in each one.

![Different IDs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156189/transcript-images/javascript-identify-side-effects-by-comparing-pure-and-impure-javascript-functions-342b2167-exercise-2-generateID-function.jpg)

The impurity of the `generateID` function makes our factory function impure as well. The way to fix this is to move the impure function outside of the factory and call it somewhere where we're expecting the side effect to happen, and pass the ID as a parameter into our `createUser` factory.

Again, I'm going to comment out this code so we don't see it repeated in the terminal as the lesson continues.

```js
// console.log(createUser('Kyle', 33))
// console.log(createUser('Kyle', 33))
// console.log(createUser('Kyle', 33))
```

Our third example is a function that creates a side effect within our application. Similar to our global state example, we can create functions that mutate the state of our application, thus causing a side effect.

```js
// Ex. 3 - Side Effects #1 
let id = 0 
```

Let's say we're keeping track of a mutable value, in this case `id`, in our application. If we then create a function that mutates this value, we have an impure function. Let's say, for example, you're creating an application that involves food items, and we make a factory function called `createFoodItem`.

```js
// Ex. 3 - Side Effects #1 
let id = 0 
const createFoodItem = name => ({
  id: ++id,
  name
})
```

If we generate our `ID` for that object by mutating the global ID value, this is an impure function. We can call this function. We'll do it several times with different food items. We'll see that the id increments like we expect, but if we also log out the id value itself, it has been mutated and is a different value.

```js
// Ex. 3 - Side Effects #1 
let id = 0 
const createFoodItem = name => ({
  id: ++id,
  name:
})

console.log(createFoodItem('Cheeseburgers'))
console.log(createFoodItem('Fries'))
console.log(createFoodItem('Milkshakes'))
console.log(id)
```

![id value changes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156187/transcript-images/javascript-identify-side-effects-by-comparing-pure-and-impure-javascript-functions-342b2167-id-value-changes.jpg)

Once more, commenting out these logs, so that they don't continue to show up in the terminal throughout the lesson.

```js
// console.log(createFoodItem('Cheeseburgers'))
// console.log(createFoodItem('Fries'))
// console.log(createFoodItem('Milkshakes'))
// console.log(id)
```

Let's make our final impure function example. That would be a side effect of the outside world. Believe it or not, I've been using an impure function this entire time to teach you this concept. `console.log` is an impure function, because it creates a side effect in the outside world.

```js
// Ex. 4 - Side Effects #2 - Outside World 
```

Every time I use `console.log`, it affects the terminal. That's a side effect. If I have any function that uses `console.log` in it, such as a `logger` function that takes a message and outputs it, that's an impure function as well, even if it's just a nice message to say, "Hi, eggheads."

```js
// Ex. 4 - Side Effects #2 - Outside World 

const logger = msg => {
  console.log(msg)
}

logger('Hi eggheads')
```

#### Terminal
```bash
$ node index.js
Hi eggheads
```