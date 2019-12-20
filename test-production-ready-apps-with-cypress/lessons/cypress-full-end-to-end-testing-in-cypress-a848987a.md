In this lesson, we're finally going to bring all of the pieces of the puzzle together that we've been building in order to do a full end-to-end test.

This type of test is guaranteed to work in production and will test all levels of the stack -- the database, the API responses, XHR requests, frontend stores, UI -- all of it.

To get started, we'll add a `cy.task` for our `db:snapshot`. We'll take a snapshot of our `todos` in the backend. Basically, we are just asserting that we have an empty database.

### todos.spec.js
```js
it('performs full end-to-end testing') {
    cy.task('db:snapshot', 'todos').should('be.empty')
}
```
 
This is a clean slate that we should be working from and this should be true for all of our tests. We'll quickly pop open Cypress and see that our snapshot is indeed empty, so we're ready to get working.

![image of the empty snapshot in cypress](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626649/transcript-images/19_cypress-full-end-to-end-testing-in-cypress-emptysnap.jpg)

We always start our test with `cy.server` that way we can spy on our XHR request. Then we'll run a `cy.seed` so that we can get our backend into a predictable opening state. We'll say we have our todos.

The first todo can have the text, `Hello World`, which is the default. The second one can have the text, `Goodnight Moon`. We can say that it is `completed` so we can override that default.

Then we can take a `db:snapshot` and assert that we are in the working state that we would expect to be in at this point, so it should `.should('deep.equal')`.

```js
it.only('performs full end-to-end testing') function () {
    cy.task('db:snapshot', 'todos').should('be.empty')

    cy.server()

    cy.seed({todos: [{}, {text: 'Goodnight Moon', completed: true}]})

    cy.task('db:snapshot', 'todos').should('deep.equal', [      
    {
        "id": 1,
        "text": "Hello World",
        "completed": false
    },
    {
        "id": 2,
        "text": "Goodnight moon",
        "completed": true
    }
    ])
}
```

We'll pass in an array. We've seen these todos before, so I'm just copying them in, although we have different capitalization here this time. Let's save that out, take a look at our test. Everything is working as expected.

![image of the test working as expected](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626667/transcript-images/19_cypress-full-end-to-end-testing-in-cypress-working.jpg)

We're ready to start visiting our page and asserting on each layer of the stack in order. We'll add a `cy.route` for our main page. This will be our preload API todos `.as('preload')`. We will `cy.visit('/')`. Then we will run a `cy.wait('@preload')`.

```js

...

    cy.task('db:snapshot', 'todos').should('deep.equal', [      
    {
        "id": 1,
        "text": "Hello World",
        "completed": false
    },
    {
        "id": 2,
        "text": "Goodnight moon",
        "completed": true
    }
    ])

    cy.route('GET', '/api/todos').as('preload')

    cy.visit('/')

    cy.wait('@preload')
}


```
Before we get the preload, we want to assert that there is no data in the store because we haven't actually loaded the preload yet. We can do `cy.store` on our `todos`, and we can say that it should be empty. After we wait for the `preload`, we can say the `store` on the `todos` should deep equal. This is the same snapshot up here, so I'm actually just going to make a `const` with our `todos`. There we go.

```js
it.only('performs full end-to-end testing') function () {

    const todos = [{
        "id": 1,
        "text": "Hello World",
        "completed": false
    },
    {
        "id": 2,
        "text": "Goodnight moon",
        "completed": true  
    }]
    cy.task('db:snapshot', 'todos').should('be.empty')

    cy.server()

    cy.seed({todos: [{}, {text: 'Goodnight Moon', completed: true}]})

    cy.task('db:snapshot', 'todos').should('deep.equal', [      
    {
        "id": 1,
        "text": "Hello World",
        "completed": false
    },
    {
        "id": 2,
        "text": "Goodnight moon",
        "completed": true
    }
    ])

    cy.route('GET', '/api/todos').as('preload')

    cy.visit('/')

    cy.store('todos').should('be.empty')

    cy.wait('@preload')

    cy.store('todos').should('deep.equal')
}
```

Let's say that this is our `todos`, this is our `todos` here. You can see that we're stepping through the stack layer by layer. The database we know has these todos in it, we go visit the page.

```js
...

    cy.task('db:snapshot', 'todos').should('deep.equal', todos)

    cy.route('GET', '/api/todos').as('preload')

    cy.visit('/')

    cy.store('todos').should('be.empty')

    cy.wait('@preload')

    cy.store('todos').should('deep.equal', todos)
}
```

Before we've gotten the data from the backend, our frontend store is empty. We populate the frontend store with the data from the backend, then we can start making assertions on the UI. We can say `('data-cy=todo-list')`. Then we can say `.children().should('have.length', 2)`. 

```js
...

    cy.task('db:snapshot', 'todos').should('deep.equal', todos)

    cy.route('GET', '/api/todos').as('preload')

    cy.visit('/')

    cy.store('todos').should('be.empty')

    cy.wait('@preload')

    cy.store('todos').should('deep.equal', todos)

    cy.get('data-cy=todo-list').children().should('have.length', 2)
}
```

We can make sure that before we wait for the preload, we also have length `zero`. We're building this up bit by bit here.


```js
...

    cy.task('db:snapshot', 'todos').should('deep.equal', todos)

    cy.route('GET', '/api/todos').as('preload')

    cy.visit('/')

    cy.store('todos').should('be.empty')
    cy.get('data-cy=todo-list').children().should('have.length', 0)


    cy.wait('@preload')

    cy.store('todos').should('deep.equal', todos)

    cy.get('data-cy=todo-list').children().should('have.length', 2)
}
```

The next layer that I would test here would be RXHR request. We could say `its('response.body').should("deep.equal")`. It's going to deep equal these `todos` because here's where we're passing the todos from our database through to our frontend.

```js
...

    cy.task('db:snapshot', 'todos').should('deep.equal', todos)

    cy.route('GET', '/api/todos').as('preload')

    cy.visit('/')

    cy.store('todos').should('be.empty')
    cy.get('data-cy=todo-list').children().should('have.length', 0)


    cy.wait('@preload').its('response.body').should("deep.equal", todos)

    cy.store('todos').should('deep.equal', todos)

    cy.get('data-cy=todo-list').children().should('have.length', 2)
}
```

We see this all happening in order. If we looked at our test, and we saw any location where the data flow broke down, we would be able to pinpoint it.

![image of the data flow](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626693/transcript-images/19_cypress-full-end-to-end-testing-in-cypress-goodflow.jpg)

We wouldn't have to wonder at the end here why aren't the todos painted on the UI. We wouldn't have some head-scratching error code here that doesn't make any sense because we had some breakdown in the store.

If we don't see the data in the store, we will say, hmm, I guess something broke down in my reducer. Let's go take a look at that. In fact, let's actually just look at an example of what that would look like so we can see how valuable this is.

Let's go to our reducer. Here's our `todos` loaded method where we actually get the todos from the backend in the preload. Let's just say that we returned the previous state so we didn't actually add the todos now to our page.

### todos.js
```js
export default function todos(state = initialState, action) { 
    switch (action.type) {
        case TODOS_LOADED:
        //return action.todos;
        return state
    }
}
``` 

Let's go back to our Cypress test. We'll run it, and we'll see that it's actually the store assertion that breaks down.

![image of the store assertion breaking down in Cypress](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626680/transcript-images/19_cypress-full-end-to-end-testing-in-cypress-breakdown.jpg)

Because we do wait, we do see the right response from the API, but we don't see it load into the store. We don't even make it to the UI layer because we're not expecting something that hasn't made it into the store to end up on our UI.

This kind of end-to-end testing that emphasizes the flow of data through the application also has the benefit of making it a lot easier to onboard new team members because there's no question of where the data is going in the application or which parts of the application are touched by each individual feature.
