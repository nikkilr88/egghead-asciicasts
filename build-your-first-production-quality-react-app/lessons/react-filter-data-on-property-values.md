I've created three tests for a function called `filterTodos`. We'll use these to create a function that takes in a route value and returns a filtered `todo` list based on the route.

The first test is for the root route. The expectation here is that we will get all `todos` back. 

####todoHelpers.test.js
```jsx
test('filterTodos should return all items for the root route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/')

  expect(result).toEqual(startTodos)
})
```

The second test verifies that the `/complete` route returns only completed items. 

```jsx
test('filterTodos should return only completed items for the complete route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]
  const expected = [
    {id:2, name: 'two', isComplete: true}
  ]

  const result = filterTodos(startTodos, '/complete')

  expect(result).toEqual(expected)
})
```

Finally, the third test verifies that we only return incomplete items for the `/active` route.

```jsx
test('filterTodos should return only incompleted items for the active route', () => {
  const startTodos = [
    {id:1, name: 'one', isComplete: false},
    {id:2, name: 'two', isComplete: true},
    {id:3, name: 'three', isComplete: false}
  ]
  const expected = [
    {id:1, name: 'one', isComplete: false},
    {id:3, name: 'three', isComplete: false}
  ]

  const result = filterTodos(startTodos, '/active')

  expect(result).toEqual(expected)
})
```

I'll run these using `npm test`. We'll have three failing tests. We'll start by importing `filterTodos` into the test file. Now, we need to go into `todoHelpers` and define `filterTodos`. I'll start by exporting it. As a `const`, we'll call `filterTodos`. That's going to equal function that'll take in a `list` and our `route` as a string. We're going to `switch` on the `route` value.

####todoHelpers.js
```jsx
export const filterTodos = (list, route) => {
    switch(route) {

    }
}
```

We'll start with the active `case`. We're going to compare this to what we expect to see in our route, which is going to be `'/active'`. In this `case`, we'll `return` `list.filter()`, passing in our `item` and returning if the item that `isComplete` is `false`. 

```jsx
export const filterTodos = (list, route) => {
    switch(route) {
        case '/active':
            return list.filter(item => !item.isComplete)
    }
}
```

Then for the `/complete` `case`, we're going to do the opposite.
I'm just going to duplicate these, and we'll say `'/complete'` here. We'll remove the exclamation mark. 

```jsx
export const filterTodos = (list, route) => {
    switch(route) {
        case '/active':
            return list.filter(item => !item.isComplete)
        case '/complete':
            return list.filter(item => item.isComplete)
    }
}
```

This time if the item is complete, we'll return those. Then, we'll have a `default` which will just return the entire `list`.

```jsx
export const filterTodos = (list, route) => {
    switch(route) {
        case '/active':
            return list.filter(item => !item.isComplete)
        case '/complete':
            return list.filter(item => item.isComplete)
        default: 
            return list
    }
}
```

That should be all we need, I'll save this. We'll just verify that our tests pass, and we're good to go.

I've started the application in a browser and opened the `App` component source code. To integrate filtering into the app, we'll start by importing `filterTodos` from `todoHelpers`.

In order to use the `filter` function, we need access to our `route`. That `route` is going to come from our `context`, because it belongs to the `Router` component that's surrounding our entire app.

I'm going to scroll down right under `state`, and I'm going to add a `static` value called `contextTypes`. I'm going to set that to equal an object. I'm going to say that I want to be able to get the `route` and `context`. That is of type `React.PropTypes.string`. That'll give me access to the `route` through `context`.

####App.js
```jsx
static contextTypes = {
    route: React.PropTypes.string
}
```

I'm going to scroll down to the `render()` method. Above the `return`, I'm going to add a new `const`. I'm going to call it `displayTodos`. I'm going to set that to equal a call to `filterTodos`.

I'm going to pass in `this.state.todos` followed by `this.context.route`. 

```jsx
const displayTodos = filterTodos(this.state.todos, this.context.route)
```

Down to my `TodoList` component where I'm passing `this.state.todos` into the `todos` prop, I want to replace that with `displayTodos`.

```jsx
<TodoList handleToggle={this.handleToggle}
    todos={displayTodos}
    handleRemove={this.handleRemove} />
```

I go ahead and save that. After reloading the browser, clicking `Active` should filter down just to items that haven't been done. Clicking `Complete` should leave just the single item that's already marked complete. `All` should bring back my entire list.