We're loading our `todos` from the JSON server and we're adding new items to the server. But if we toggle a `todo`, that change won't be reflected on the server.

To save changes to existing `todos`, we'll need to create a new function that makes a `'PUT'` request to the server. This will look very similar to the existing `createTodo` function, so we'll start by duplicating that. I'm going to select `createTodo`, make a copy, and I'm going to rename this `saveTodo`.

####todoService.js
```jsx
export const saveTodo = (todo) => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())
}
```

The first big difference here is that our URL is going to be slightly different. I'm going to wrap this `baseUrl` in back ticks, and I'm going to use string interpolation to append our `todo.id` to the `baseUrl`. This is going to be our `${baseUrl}/${todo.id}`.

```jsx
export const saveTodo = (todo) => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    }).then(res => res.json())
}
```

The next thing we have to change is we have to go from making a `'POST'` request to a `'PUT'` request. This function will do a put to our `${baseUrl}/${todo.id}`, it'll pass in the `'application/json'` headers, it'll pass our `todo` as the `body` of the request, and then will return a promise that's already called `.json` on the response.


In an `App.js`, I'm going to update my `import` here to also `import` `saveTodo`. Then we can scroll down and find our `handleToggle` method, and we'll do some refactoring.

####App.js
```jsx
handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
}
```

In the current code, we define a pipeline that takes in an `id` and our current list of `todos` and returns a new list that includes our update. In order to send this update along to the server, we're going to need to break this out a bit, so we can grab that `toggleTodo`.

Let's start by pulling apart the pipeline we currently have defined. I'll start by defining a function, I'm going to call `getToggledTodo`, and that's going to be my pipeline minus the third function. I'm just going to cut this `pipe(findById, toggleTodo`, and paste it back in `getToggledTodo`. Now we're going to `pipe` `findById` to `toggleTodo`.

````jsx
handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const getUpdatedTodos = , partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
}
```

Now I can use this to get the updated item. I'll define `const updated` and I'm going to set that to equal a call to `getToggledTodo`. I'm going to pass in my `id`, followed by `this.state.todos`.

````jsx
handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = , partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(id, this.state.todos)
    this.setState({todos: updatedTodos})
}
```

Now `getUpdatedTodos`, it's just going to equal the `partial` application of `updateTodo` with `this.state.todos`, which gives us a function that just needs an `updated` item. We'll pass `updated` into `updatedTodos`.

````jsx
handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = , partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
}
```

Then our `this.setState` call doesn't have to change, and now we can call `saveTodo` with our `updated` item. Then we'll call `.then` to handle the response, and we'll just show a temporary error message using `this.showTempMessage` and we'll pass in `'Todo Updated'`.

````jsx
handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(id, this.state.todos)
    const getUpdatedTodos = , partial(updateTodo, this.state.todos))
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
        .then(() => this.showTempMessage('Todo Updated'))
}
```

I'll save this, we'll let the browser reload. Now when I check items off, we'll see that we get our `'Todo Updated'` message. If we open up `db.json`, we'll see that more of our items have been set to `"isComplete": true`.