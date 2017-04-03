Our application is set up to `loadTodos` from a `todos` endpoint provided by `json-server`. Let's update this so we can save new `todos` to the server as well. In `todoService.js`, I'm going to `export` a new function which we'll call `createTodo`. This is going to accept a new `todo`. Then we'll use `fetch` to `'POST'` that to the server.

Just like in the `loadTodos` function above, we're going to call `fetch` with our `baseUrl` and `return` the resulting promise. I'm start with a `return` statement and a call to `fetch` passing in `baseUrl`. By default, `fetch` will issue a GET request. In order to `'POST'` to the server, we'll need to pass in some options.

####todoService.js
```jsx
export const createTodo = (todo) => {
    return fetch(baseUrl, {

    })
}
```

After `baseUrl`, I'm going to put in a second argument here that's going to be an object with all of our options. We'll start by defining the `method`, which is going to be `'POST'`. Then we're going to need a couple of headers. I'm going to paste those in. We have an `'Accept'` header for `'application/json'` and also a `'Content-Type'` header.

```jsx
export const createTodo = (todo) => {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}
```

Finally, we have to define the `body` of our `'POST'` or the content that we want saved to the server. We'll define a `body` property here. We need to `stringify` our `todo` object. We're going to call `JSON.stringify` and pass in our `todo`. Like we did above, I'm going to call `.then`, take the response, and call the `.json` method on it. Now I can save that. 

```jsx
export const createTodo = (todo) => {
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

Now we move back into our `App.js`.
I'm going to update my `import` to also include the `createTodo` function that we created. Now that we have that, I'm going to come down to the `handleSubmit` method. We're adding our `todo` and updating our state. Now, I want to call `createTodo`. I want to pass that `newTodo` to the server. So we can confirm that this works, I'm going to add `.then`.
When I get a response back, I'm going log out to the console `"Todo added"`.

####App.js
```jsx
handleSubmit = (evt) => {
    evt.preventDefault()
    const newId = generateId()
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
        todos: updatedTodos,
        currentTodo: '',
        errorMessage: ''
    })
    createTodo(newTodo)
        .then(() => console.log('Todo added'))
}
```

I'll save this. Our browser will reload. I'll open up DevTools. Now, when I add a new `todo`, we'll see that our log shows `Todo added`.

If I do a full page reload, it will `fetch` our `todos` from the server, and it will include that new item that was just added. If we look at `db.json`, we'll see that we have this new item added with our generated `"id"`, our `"name"` of `"New Todo"`. Our default `"isComplete"` value.

####db.json
```json
{
    "id", 81718,
    "name": "New Todo",
    "isComplete": false
}
```