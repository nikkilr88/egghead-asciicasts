Looking at this `handleToggle` method we can see that `findById` is called and result of that is passed into `toggleTodo`, and then the result of that is passed in as an argument to `updateTodo`. The constants `todo` and `toggled` are basically only there, so we can pass them along to the next line and then they're never used again.

####App.js
```jsx
handleToggle = (id) => {
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({todos: updatedTodos})
}
```

It would be nice if we could get rid of these intermediate values, since they're only useful until the next line of code runs. We could do this by nesting our calls. What I mean by that is I could take this call to `findById` with my `id` and the `todos` list, cut that and paste it in place of its intermediate value in `toggleTodo`.

```jsx
handleToggle = (id) => {
    const toggled = toggleTodo(findById(id, this.state.todos))
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({todos: updatedTodos})
}
```

Then I could take that entire call to `toggleTodo`, cut that and I could paste it in place of `toggled`. 

```jsx
handleToggle = (id) => {
    const updatedTodos = updateTodo(this.state.todos, toggleTodo(findById(id, this.state.todos)))
    this.setState({todos: updatedTodos})
}
```

This works and it essentially allows us to get rid of these other two values. This is really messy and as soon as you add a fourth function or a fifth function this is going to get *really* hard to read.

To accommodate this behavior, but make it much more readable we're going to define a **Pipe utility**. `pipe` is going to let us take the results of one function and pass them in to the next function.

Then take the results of that function pass them into the next. Just like that messy nested code we just saw, but we'll keep the mess in our utility function keeping our production code much easier to read. I'm going to start by opening the `utils.test.js` file.

We'll define some test to make sure that our `pipe` utility is working as expected. I've pasted some code in. I have two new functions that I'm using just for test purposes `inc` and `dbl` to just each take a number in and either increment or double that number.

####utils.test.js
```jsx
const inc = (num) => num + 1
const dbl = (num) => num * 2
```

Then I have two test functions. The first one make sure that I can pass the results of `inc` to `dbl`. Then the other one does the inverse just to make sure that our `pipe` is going in the order we expect. We're going to define `pipe` in our `utils.js` file.

```jsx
test('pipe passes the results of inc to dbl', () => {
  const pipeline = pipe(inc, dbl) // => dbl(inc(2)) OR g(f(...args))
  const result = pipeline(2)
  expect(result).toBe(6)
})

test('pipe passes the results of dbl to inc', () => {
  const pipeline = pipe(dbl, inc) // => inc(dbl(2))
  const result = pipeline(2)
  expect(result).toBe(5)
})
```

I'm going to update my `import` to also `import` `pipe`. 

```jsx
import {partial, pipe} from './utils'
```

Then I'm going to come over to the terminal and I'm going to run the test with `npm test`. Of course these are going to fail because we haven't defined `pipe` yet. I'm going to open `utils.js` and I'm going to `export const pipe`. We'll set that to equal a function and now let's define it.

####utils.js
```jsx
export const pipe = () => {}
```

Let's take another look at our test to see how we want to define `pipe`. If we look at our test in both cases we're calling `pipe`, we're passing it two functions, and we're getting back another function that we're calling later with an argument.

####utils.test.js
```jsx
const pipeline = pipe(inc, dbl)
const result = pipeline(2)`
```

Let's start defining our `pipe` function. In `pipe` the first two arguments are going to be a function `f` and a function which we'll just call `g`. That needs to return another function. That second function is going to take our arguments whatever that is.

In this case I'm going to just use the rest operator to take whatever arguments are passed in and wrap them up in an array called `args`. Now we need to get a result. 

####utils.js
```jsx
export const pipe = (f, g) => {...args} => ?
```

A result is going to take our first function and it's going to call that first function with whatever arguments we have.

I'll use the spread operator to break that back out into a list of `args`. Then it needs to pass that result into our second function which in this case we're calling `g`. We'll do that by wrapping the results of `f` with the arguments in a call to `g`.

```jsx
export const pipe = (f, g) => {...args} => g(f(...args))
```

If I save this our test will rerun and now our tests are passing. I'm just going to paste in a new test, and this test is just going to verify that `pipe` works with more than two functions. Here I have a pipeline that's going to add a number, increase, double, then increase again.

####utils.test.js
```jsx
test('pipe works with more than 2 functions', () => {
  const pipeline = pipe(add, inc, dbl, inc) // => inc(dbl(inc(add(1,2))))
  const result = pipeline(1,2)
  expect(result).toBe(9)
})
```

The end result should look something like what would happen if we nested these functions like this `inc(dbl(inc(add(1,2))))`. We're going to get back a function, call with the arguments one and two, get a `result`, and we `expect` that value `toBe(9)`.

Now, if I save this our test will fail, but the interesting thing to note here is that we expected `9` and the result was `4`. We did get a result back. The problem is that `pipe` took the first two functions and ignored the second two, so let's fix that. The existing `pipe` function isn't exactly what we need, but it's useful. We're going to keep it.

What I'm going to do is I'm going to take the export off of this and I'm just going to rename this to be `_pipe` so that we can use it inside of `utils.js` but we're not going to export it. Then we're going to replace that with a new `pipe` function, so `export const pipe`, and then we'll define that.

####utils.js
```jsx
const _pipe = (f, g) => {...args} => g(f(...args))

export const pipe =
```

`pipe` is going to take in a list of functions and instead of two specific functions now it's going to be a variable length. I'm going to use the rest operator to take in functions and wrap them up in an array we'll call `fns`.

```jsx
export const pipe = (...fns)
```

Now, we have an array of functions and we need to return a single function. The way you take an array of anything and return a singular item is using `.reduce`. I'm going to call `fns.reduce` and then I'm going to pass in our internal `_pipe` function.

```jsx
export const pipe = (...fns) => fns.reduce(_pipe)
```

By calling `.reduce` without an initial value, it's going to take the first two items in our functions array, pass them to `_pipe` and `pipe` those together and return a function. Then it can take the next one along with the returned function from the first call `_pipe`, pass those into `pipe` and put them together.

It will go on and on until it runs out of functions returning a single function at the end that's just waiting to receive arguments at which point it will execute and `pipe` the values all the way through those functions.

With that defined I'm going to save my file and we can confirm that the test passed. I'll open up the browser and jump over to `App.js`. At the top of the file I'm going to `import {pipe}` as well as `partial` `from './lib/utils'`.

####App.js
```jsx
import {pipe, partial} from './lib/utils'
```

Now I'm going to update the `handleToggle` method to use our `pipe` and `partial` functions.

I'm going to start by defining `getUpdatedTodos` which is going to be a function that we're going to get back from a call to `pipe`. We basically want to use `pipe` to recreate this structure here. 

```jsx
const todo = findById(id, this.state.todos)
const toggled = toggleTodo(todo)
const updatedTodos = updateTodo(this.state.todos, toggled)
```

We're going to start by piping `findById`. We're going to take the results of that `pipe` that into `toggleTodo`.

Then the results of that can get piped into `updateTodo`. There's one small problem here `updateTodo` actually takes two arguments. The value coming out of `toggleTodo` is the second argument. What we need to do to make this work is partially apply `updateTodo` making sure that it already has its first argument which in this case is `this.state.todos`.

```jsx
handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({todos: updatedTodos})
}
```

With that in place we can get rid of these two lines. We can update this line to just use `getUpdatedTodos` and it will accept the `id` and `this.state.todos`. 

```jsx
handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todo)
    this.setState({todos: updatedTodos})
}
```

Our browser will reload and we can just verify that everything still works as expected allowing us to toggle our `todo`.