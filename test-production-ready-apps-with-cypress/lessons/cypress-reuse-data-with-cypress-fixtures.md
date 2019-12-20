Thus far, whenever we've stubbed out a network request, we've written our todos in the body of the test and then passed them into `cy.route`. What if we created another test, as we have in this example, and we want to share the same starting state between the two examples?

Let's go ahead and move our data into a fixture file. Let's go ahead and create a new folder under `cypress/fixtures/todos/all.json`, and go ahead and paste in your fixture. 

### all.json
```json
[
    {
        "id": 1,
        "text": "Hello world",
        "completed": false
    },
    {
        "id": 2,
        "text": "Goodnight moon",
        "completed": true
    }
]
```

Make sure to remove the variable assignment since we just need to return the raw data.

Now we can reference our fixture by returning to our test and using `cy.fixture`, and then the path that's relative to the fixtures folder, `todos/all.json`. Then we can use `then`, which will asynchronously load our JSON. Since the JSON is going to be loaded asynchronously, we can take the rest of our test and place it inside the callback. Anywhere we had previously used our variable todos, we should update it to use the `cy.fixture` data.

### todos.spec.js
```js
...
it('creates new todos', function () {
    cy.server()

    cy.fixture('todos/all.json').then((json) => {
        cy.route('/api/todos', json).as('preload')

        cy.visit('/')
        cy.wait('@preload')
        ...
    })
})
```

We can also share data between our tests without using callbacks at all. It starts with a `beforeEach` block, which we will run before each of our tests. Next, call `cy.fixture`, passing in the same path as before. Then we'll add an alias to it, so it can be referenced from other locations in our file. Let's call it `todosPreload`.

```js
describe('Todo Application', () => {
    beforeEach(function() {
        cy.fixture('todos/all.json').as('todosPreload')
    })
    it('loads the page', function () { ...

    })
    it('creates new todos', function () {
        cy.server()
    })
})
```

Now we can go ahead and remove our fixture, and inside `cy.route`, we're capable of referencing todos-preload as `@todosPreload`, because `cy.route` is the special method that actually recognizes that.

```js
describe('Todo Application', () => {
    beforeEach(function() {
        cy.fixture('todos/all.json').as('todosPreload')
    })
    it('loads the page', function () { ...

    })
    it('creates new todos', function () {
        cy.server()

        cy.route('/api/todos', '@todosPreload').as('preload')

        cy.visit('/')
        ...
    })
})
```

Otherwise, we have to use `this.todosPreload`, and we get todosPreload attached to this if we use `cy.fixture` with an alias inside a `beforeEach` function, but not if we just do it in the body of our test.

We can go ahead and save this out. Let's open up Cypress. We'll see that Cypress doesn't actually log out any information about our fixture file, but it had no problem with using it.

![image of Cypress using the fixture file](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626693/transcript-images/11_cypress-reuse-data-with-cypress-fixtures-fixture.jpg)

One gotcha that I do want to make you aware of is that if you're going to reference any of your aliases using this, for instance `this.todosPreload`, don't use a fat arrow function for your test, because fat arrow functions don't have a `this` context. This may be assigned in your `beforeEach`, but it's not going to be available here.

```js
describe('Todo Application', () => {
    beforeEach(function() {
        cy.fixture('todos/all.json').as('todosPreload')
    })
    it('loads the page', function () { ...

    })
    it('creates new todos', () => {
        cy.server()

        cy.route('/api/todos', '@todosPreload').as('preload')

        cy.visit('/')
        ...
    })
})
```

If we reopen our test, we'll see that we can't read the property todosPreload of undefined. That's because we're not using a standard function. That's because of the fat arrow function.

![image of the error function](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626679/transcript-images/11_cypress-reuse-data-with-cypress-fixtures-error.jpg)

That's how you can use fixtures in your tests.
