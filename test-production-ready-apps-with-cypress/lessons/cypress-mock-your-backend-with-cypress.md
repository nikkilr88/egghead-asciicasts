In this example, we're going to talk about mocking the backend. We can discover the reason we need to mock the backend by visiting our real page at `localhost:5000`. Let's switch over to Chrome.

Here, we can edit our first to-do. Let's make this Hello, World with a bunch of Zs, `Hello worldzzzzz`.

Now let's return to Cypress, refresh, and we'll see that we have a failing test. That's because we expected this to have the text Hello world, but it's actually using the real data from our real backend, which we've just changed.

![image of hello worldzzzz failing a test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626669/transcript-images/07_cypress-mock-your-backend-with-cypress-testfailure.jpg)

There are two strategies we can use to address this. One is stubbing all of our network requests. The other is that we can interact with the real backend, but we have to have a database seeding abstraction, as well as a totally isolated testing environment.

In this lesson, we're just going to talk about the first one, and in later lessons, we'll show how to seed the database. To start, let's tell Cypress simply that we want to begin stubbing network requests.

To do that, we can call `cy.server`. 

### todos.spec.js
```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.server()
        cy.visit('/')

        cy.get('[data-cy=todo-item-3]')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        cy.get('[data-cy=todo-item-4]')
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})
```

By default, this doesn't stub out any requests. They'll all still continue to pass through to the backend, but we do need to call cy.server before we can start mocking routes or spying on them.

To actually start mocking our routes, we need to know what we need to mock. Let's go back to Cypress and take a look at our XHR request. We see that we perform a `GET` to `api/todos`. That's hitting the real backend. Let's mock that out.

![image of the GET statement in the failure message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626675/transcript-images/07_cypress-mock-your-backend-with-cypress-get.jpg)

Let's call `cy.route('/api/todos')`. By default, this is a GET request. 

Next, we'll return an array of hashes. We can actually see what's in our real backend by looking in `db.json`. Let's go ahead and just copy this out and paste it in. We did expect this not to have so many Zs or any at all, so let's save it.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.server()

        cy.route('/api/todos', [
            {
                 "text": "Hello world",
                 "completed": false,
                 "id": 3
            },
            {
                 "id": 4,
                 "completed": true,
                  "text": "Goodnight moon"
            }
        ])
        cy.visit('/')

        cy.get('[data-cy=todo-item-3]')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        cy.get('[data-cy=todo-item-4]')
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})
```

Next, we have to `cy.wait` for this route to load, which means that we have to give it an alias. We can say `as('preload')` and we'll `cy.wait('@preload')`. 

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.server()

        cy.route('/api/todos', [
            {
                 "text": "Hello world",
                 "completed": false,
                 "id": 3
            },
            {
                 "id": 4,
                 "completed": true,
                  "text": "Goodnight moon"
            }
        ]).as('preload')

        cy.visit('/')

        cy.wait('@preload')
...
```

We'll save it and return.

Now we can see that we waited for our preload, which returned our mock data and made all our tests pass again. We can also do a deep dive on this request by clicking on the preload, opening our console, and checking our XML HTTP request, where we can see everything like status code, response, body and headers, and we can inspect this to make sure it's what we just sent. It is.

![image of all passing tests and deep dive](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626682/transcript-images/07_cypress-mock-your-backend-with-cypress-deepdive.jpg)