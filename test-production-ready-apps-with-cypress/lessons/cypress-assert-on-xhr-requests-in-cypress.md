In this lesson, let's learn how to assert on XHR request by starting in `todos.spec.js`. It starts with the `cy.server`. Typically, when we've used this in the past, it's because we were going to mark our backend request. In this case, we're not marking any request, but we do have to start the cy.server in order to use `cy.route` which will allow us to spy on and assert on the XHR request.

Also, when we view `cy.route` in the past, it's been because we are returning response, but in this case, we're just not going to specify response. It's going to still hit the backend as it normally would. We will use an alias as we normally do. 

### todos.spec.js
```js
it.only("tests XHR requests", function() {
    cy.server()
    cy.visit('/')

    cy.task('db:snapshot', 'todos').should('be.empty')
    cy.store('todos').should('be.empty')

    cy.route({
        method: 'POST',
        url: '/api.todos'
    })
})
```

This will be our create todo request. We need to get our new todo input. We'll type into it `1st Todo`, and we'll press enter. We'll do `cy.wait`, we'll wait for that `('@createTodo')` request which will hit the real backend. Then we'll receive our `XHR` response, and we can make assertions on it here. Let's press `debugger` so we can take a look at what that looks like.

```js
it.only("tests XHR requests", function() {
    cy.server()
    cy.visit('/')

    cy.task('db:snapshot', 'todos').should('be.empty')
    cy.store('todos').should('be.empty')

    cy.route({
        method: 'POST',
        url: '/api.todos'
    }).as('createTodo')

    cy.get('[data-cy=todo-input-new]').type('1st Todo{enter}')

    cy.wait('@createTodo').then((xhr) => {
        debugger
    })
})
```

Here we see it. XHR is our subject. 

![image of XHR subject in the request object](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626688/transcript-images/18_cypress-assert-on-xhr-requests-in-cypress-see.jpg)

We see that there is a request object, which has a body and its headers, and the response object which has body and headers. 

What we can do here, we can say `cy.wrap(xhr.response.body)`, and then we can chain that as we normally would. We can say it should `deep.equal` and then we'll give it `1`, `text`. `{id: 1, text: '1st Todo', completed: false})`, that kind of thing, we can do the same thing for our `request` if we're interested or we could do it for our `status` code and say that the `(xhr.status).should('equal', 201)`, which will be our created code. 


```js
it.only("tests XHR requests", function() {
    cy.server()
    cy.visit('/')

    cy.task('db:snapshot', 'todos').should('be.empty')
    cy.store('todos').should('be.empty')

    cy.route({
        method: 'POST',
        url: '/api.todos'
    }).as('createTodo')

    cy.get('[data-cy=todo-input-new]').type('1st Todo{enter}')

    cy.wait('@createTodo').then((xhr) => {
        cy.wrap(xhr.status).should('equal', 201)
        cy.wrap(xhr.response.body).should('deep.equal', {id: 1, text: '1st Todo', completed: false})
    })
})
```
We can make both of those assertions and rerun this. That's it. That's how you assert on the XHR request.

![image of the succesful assertion in the dev window](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626684/transcript-images/18_cypress-assert-on-xhr-requests-in-cypress-assert.jpg)