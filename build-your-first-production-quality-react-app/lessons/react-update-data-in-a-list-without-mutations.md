In order to update the `isComplete` status on a `todo` we need to be able to do a couple of things. First we need to get the existing `todo` from an array of `todos`. Then we need to toggle the `isComplete` property on that `todo` and finally we need to update the list to reflect the change `todo` item. When we do this we also need to be sure to avoid mutating the existing `todo` object with the original array.

####todoHelpers.test.js
```jsx
import {addTodo} from './todoHelpers'

test('addTodo should add the passed todo to the list', () => {...})

test('addTodo should not mutate the existing todo array', () => {...})

test('findById should return the expected item from an array', () => {...})

test('toggleTodo should toggle the isComplete prop of a todo', () => {...})

test('toggleTodo should not mutate the original todo', () => {...})

test('updateTodo should update an item by id', () => {...})

test('updateTodo should not mutate the original array', () => {...})
```

I've added some prewritten unit tests for the functions we need to create. Let's start with finding a `todo` by `id`. This test starts with an array of `todo` objects followed by an object that matches the second item in the array. We get a result by calling `findById` with an `id` of `2` and the array of `todos` as input. Finally, the expectation states that our `result` should match the `expected` object.

```jsx
test('findById should return the expected item from an array', () => {
    const startTodos = [
        {id:1, name: 'one', isComplete: false},
        {id:2, name: 'two', isComplete: false},
        {id:3, name: 'three', isComplete: false}
    ]
    const expected = {id:2, name: 'two', isComplete: false}
    const result = findById(2, startTodos)
    expect(result).toEqual(expected)
})
```

Before we run the test I'm going to update the other four tests so they're skipped. This will allow us to focus on one test at a time. In **Jest** you can follow the `test` keyword with `.skip` to keep those tests from being executed. I'll select these four tests and follow them each with `.skip` and save the file. Now we should be good to go.

```jsx
test.skip('toggleTodo should toggle the isComplete prop of a todo', () => {...})

test.skip('toggleTodo should not mutate the original todo', () => {...})

test.skip('updateTodo should update an item by id', () => {...})

test.skip('updateTodo should not mutate the original array', () => {...})
```

I'll jump over to the terminal, run `npm test`, and we'll see that we have one failing test and four skipped tests. If I scroll up we can see that we have a `"ReferenceError: findById is not defined"` It's going to our source code and we'll `import` `findById` and we'll save it. When our test run again we'll see that this time we have a `TypeError: (0 , todoHelpers.findById) is not a function`.

We need to go into `todoHelpers.js` and we need to export a `const findById`. For now we'll just set that to be a nohup. 

####todoHelpers.js
```jsx
export const findById = () => {}
```

When our test run again now we're expecting an object and we're receiving `undefined`. We need to fill out our `findById` function. If we look at our test we'll see that `findById` here is being called with the `id`, followed by the list that we want to find the item in.

####todoHelpers.test.js
```jsx
const result = findById(2, startTodos)
```

We can setup our arguments here with `id` and we'll refer to the `id` as `list`, and for the implementation we can refer to `list.find` just using the built in array method. Then we compare a set of predicate where it's going to receive the `item` from the list and we're going to compare `item.id` and make sure it `===` the passed in `id`.

####todoHelpers.js
```jsx
export const findById = (id, list) => list.find(item => item.id === id)
```

When we save that our test will run again and now our test is passing. Now that we have `findById` to find let's jump back into our test file. I'm going to take the `.skip` off of this first test for `toggleTodo`. We'll see that we have two objects -- our `startTodo` and our `expected` `todo` -- and the only difference between them is the `isComplete` flag that goes from `false` to `true`.

```jsx
test('toggleTodo should not mutate the original todo', () => {
    const startTodo = {id:2, name: 'two', isComplete: false}
    const expected = {id: 2, name: 'two', isComplete: true}
    const result = toggleTodo(startTodo)
    expect(result).toEqual(expected)
})
```

We do that by calling `toggleTodo` and passing in our starting `todo` object. This doesn't exist yet, so I'm going to come up to the top of the file here and I'm going to import `toggleTodo` from `todoHelpers.js`. I'll save that and our test will still fail, because `TypeError: (0 , _todoHelpers.toggleTodo) is not a function`.

I can come over here to `todoHelpers.js` and just like we did before I'll `export const toggleTodo` and just to get the test a little further along I'll set it to a nohup. And now I'm not getting my expected results.

####todoHelpers.js
```jsx
export const toggleTodo = () => {}
```

As we saw from the way `toggleTodo` is being used in our test, it takes in a single argument that represents a `todo` object. We're going to update this to take in a `todo` object, and then for my `result` I'm going to `return` an object. To get that object, I'm going to **spread** the passed in `todo` properties into this new object.

And then I'm going to overwrite the `isComplete` with the opposite of the existing `todo.isComplete` property. When I save that, our test will pass.

```jsx
export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete })
```

The other thing we want to ensure is that by doing this we don't mutate the passed in `todo` but we get a brand new object back. I'm going to jump back into the test file and I'm going to un-`.skip` the second test for `toggleTodo`. We'll take a look at it and we'll see that all we're doing here is making sure that whatever we get back from `toggleTodo` is not a reference to the same object that was passed in.

####todoHelpers.test.js
```jsx
test.skip('toggleTodo should not mutate the original todo', () => {
    const startTodo = {id:2, name: 'two', isComplete: false}
    const result = toggleTodo(startTodo)
    expect(result).not.toBe(startTodo)
})
```

If I save this our test suit will run again and we'll see that we have one more passing test. With `toggleTodo` defined let's get these `toggleTodo` tests out of the way. I'm going to remove the `.skip` from both of these `updateTodo` tests and we'll take a look at them.

`"updateTodo should update an item by id"` is going to take in a starting list in `updatedTodo` where we are changing the `isComplete` flag from `false` to `true`.

```jsx
test.skip('updateTodo should update an item by id', () => {
    const startTodos = [
        {id:1, name: 'one', isComplete: false},
        {id:2, name: 'two', isComplete: false},
        {id:3, name: 'three', isComplete: false}
    ]
    const updatedTodo = {id:2, name: 'two', isComplete: true}
    const expectedTodos = [
        {id:1, name: 'one', isComplete: false},
        {id:2, name: 'two', isComplete: true},
        {id:3, name: 'three', isComplete: false}
    ]

    const result = updateTodo(startTodos, updatedTodo)

    expect(result).toEqual(expectedTodos)
})
```

We expect to get our list back with the update reflected. We do that by calling `updateTodo` with our list followed by the updated item to put back into that list and then we set our expectation.

Our final test is just making sure that when we do this we're not mutating the original array.

We have our `startTodos`, our `updatedTodo`, and our expectation is just making sure that whatever we get back isn't a reference to the original array. 

```jsx
test.skip('updateTodo should not mutate the original array', () => {
    const startTodos = [
        {id:1, name: 'one', isComplete: false},
        {id:2, name: 'two', isComplete: false},
        {id:3, name: 'three', isComplete: false}
    ]
    const updatedTodo = {id:2, name: 'two', isComplete: true}

    const result = updateTodo(startTodos, updatedTodo)

    expect(result).not.toBe(startTodos)
})
```

I'm going to jump up to the top of this file and I'm going to `import` our `updateTodo` function `from './todoHelpers'`. We'll save that.

```jsx
import {addTodo, findById, toggleTodo, updateTodo} from './todoHelpers'
```

Our test will run again. Of course we're going to fail because I don't actually have that type defined.

We'll jump back over `todoHelpers.js` and we'll `export const updateTodo`. Now we just need to implant this, so we can get back our expected result. Let's start by defining our arguments.

First argument we're going to take in is our `list` of `todos`, followed by the item that we want to update the `list` with. We want to make sure we replace the existing item with the updated item that corresponds to that `id`.

We're going to start by finding that item in our `list` and figuring out where it is. We're going to define the `updatedIndex` and we're going to set that to equal a call to `list.findIndex` with a predicate that's going to take in list items and tell us if `item.id` matches our `updated` items `.id` and now that we have our index let's define a `return` array.

We're going to `return` a new array and I'm going to take the existing `list` with a call to `.slice` starting at `0` up to the `updatedIndex`. That's going to take all the items before the item that we want to update and spread them out into this array. Then we follow it by the `updated` item, followed by whatever is left of the array.

We're going to get that again using the spread operator or the call to `list.slice`. This time we're going to `.slice` from the `updatedIndex+1`. That's going to take from whatever that point is to the end of the array. We'll save this. Our test will run and now all of our tests should be passing.

####todoHelpers.js
```jsx
export const updateTodo = (list, updated) => {
    const updatedIndex = list.findIndex(item => item.id === updated.id)
    return [
        ...list.slice(0, updatedIndex)
        updated,
        ...list.slice(updatedIndex+1)
    ]
}
```