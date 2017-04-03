In this component, we're using the `constructor()` to define this application's initial `state`. We're also binding the custom methods that we've defined to `this`, ensuring that those methods have the correct context when reading `state` and calling `setState` for updates.

These binding statements are a bit redundant. They are also easy to forget about, so you try to run your app, and a call to `setState` doesn't work as expected. Luckily, `create-react-app` shifts with the proper configuration to allow us to use **property initializer syntax**.

To demonstrate, let's convert the code in this `constructor()` into property initializers. I'm going to start by grabbing the entire initial `state` object, and cutting that, and putting it above the `constructor()`. I'm going to remove the reference to this.

####App.js
```jsx
class App extends Component {
    state = {
        todos: [
            {id: 1, name: 'Learn JSX', isComplete: true},
            {id: 2, name: 'Build an Awesome App', isComplete: false},
            {id: 3, name: 'Ship It', isComplete: false}
        ],
        currentTodo: ''
    }

    constructor() {
        super()

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmptySubmit = this.handleEmptySubmit.bind(this)
    }

    ...
```

With property initializer syntax, `state` is now an instance property of this class just like it was before, and it's still available as `this.state` in this component's methods. Let's take a look at these method bindings. Each one of these is simply binding `this` to the method so that we have access to `this.setState` and `this.state` within those methods.

If we initialize these methods as properties, then we don't need to add this extra binding. For this, all we have to do is update each of these. We're going to set `handleSubmit` as a property, to equal an arrow function that handles our event. I'm going to do the same thing with `handleEmptySubmit`.
Adding an `=` and a `=>`. The same again with `handleInputChange`. 

```jsx
handleSubmit = (evt) => {...}

handleEmptySubmit = (evt) => {...}

handleInputChange = (evt) => {...}
```

Now that we've made those updates, we can come back up to our `constructor()` and we can get rid of these extra bind statements. Now that we've done all that refactoring, we're left with a `constructor()` that simply calls `super()`.

```jsx
constructor() {
    super()
}
```

If I save this, and without the browser reload, we can come over here and I'm going to open up the dev tools. We'll see in the console that there's a warning that we have a useless `constructor()`. We can just go in here and we can take the `constructor()` out, because we're no longer doing anything unique to our component limit.

```jsx
// REMOVED
constructor() {
    super()
}
```

We can save that again. When the browser reloads the useless `constructor()` warning goes away. We can verify that we didn't break anything with our refactoring. We'll try to submit an empty form. We'll get our warning.

If I give it a valid entry, I should be able to submit. It updates our `todoList`.