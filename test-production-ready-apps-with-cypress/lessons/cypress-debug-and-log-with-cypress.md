In this lesson, we're going to talk about debugging and locking, which are critical in any testing environment. We're going to use this as a way to take a look at Cypress' asynchronous nature. Let's start off by trying to add a `debugger` as we normally would.

### todos.spec.js
```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('[data-cy=todo-item-3]')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        debugger

        cy.get('[data-cy=todo-item-4]')
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})
```

If we visit Cypress and pop open our console so that we make sure we hit our debugger, we'll see that the page actually hasn't loaded yet. This is strange because the debugger is the third statement.

![image of the console and the page not loaded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626681/transcript-images/06_cypress-debug-and-log-with-cypress-notloaded.jpg)

The first statement is that we visit the page. The second is that we get the first to-do item. Then we should be hitting the debugger.

What's going on? If we press play, now we finally see Cypress load the page. We see it visit, get the first to-do item. This gives us a hint as to what's really happening with Cypress.

![image of the page loaded after hitting play](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626694/transcript-images/06_cypress-debug-and-log-with-cypress-loaded.jpg)

Cypress code is a lot like async and await. When we hit the `cy.visit` method, we don't actually visit the page yet. Instead, Cypress on-queues the event to happen later.

Think of this like pushing visit into an array and then moving on immediately to `cy.get`. cy.get is also asynchronous. It pushes that into the array, followed by the `should`, then the `should`, then the `find`, then the `should`. These will all be executed in order, but they won't be executed yet.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        // [ visit, get, should, should, find, should, get... ]
        cy.visit('/')

        cy.get('[data-cy=todo-item-3]')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        debugger

        cy.get('[data-cy=todo-item-4]')
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})
```

Next we move on to the debugger statement. This is the first synchronous line of code that actually runs. That's why when we hit the break point in our console, we haven't visited the page.

We haven't run a get, a should, or any of the other Cypress code. We hit that debugger. Nothing is loaded. Next we hit the second `cy.get`. We proceed on-queuing events in the same way as before. Finally, we start popping things off the queue. We visit the page first. Then we run cy.get.

If we want to see what `cy.get` has actually gotten, we have to put our `debugger` in here. `then` takes a callback, so we can say that this will be the `element`. If we put our `debugger` statement in here and save it out, now we can reopen Cypress and see what happens.

```js

describe('Todo Application', () => {
    it('loads the page', () => {
        // [ visit, get, should, should, find, should, get... ]
        cy.visit('/')

        cy.get('[data-cy=todo-item-3]')
          .then((element) => { debugger; })
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        debugger

        cy.get('[data-cy=todo-item-4]')
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})
```

We hit our first debugger from before. We see the page isn't loaded yet.

![image of the page not loaded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626692/transcript-images/06_cypress-debug-and-log-with-cypress-notloaded1.jpg)

That's exactly what we expect. Let's press play and see what we get. We hit the second debugger statement and were fed the element. We can access the element, which we see as the jQuery selector. We can interact with it as we normally would.

![image of JQuery selector loaded and working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626672/transcript-images/06_cypress-debug-and-log-with-cypress-loaded1.jpg)

Of course, this is a little tedious. Cypress provides a helper method called `.debug`.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        // [ visit, get, should, should, find, should, get... ]
        cy.visit('/')

        cy.get('[data-cy=todo-item-3]')
          .debug
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

If we run `.debug`, it'll be the same thing as putting a debugger in, except now we'll be fed the subject by the name of subject, which we can inspect in the console, or as a named variable.

![image of the console statement with .debug running](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626669/transcript-images/06_cypress-debug-and-log-with-cypress-debug.jpg)

Similarly, if we want to log something out, we can use `cy.log` and say something like, `'about to fetch the element'`.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        // [ visit, get, should, should, find, should, get... ]
        cy.visit('/')

        cy.log('about to fetch the element')

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

Now if we reload the page, we'll see cy.log in our list of statements.

![image of cy.log in the list of statements](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626695/transcript-images/06_cypress-debug-and-log-with-cypress-log.jpg)

Arbitrary code can be on-queued into Cypress using `cy.wrap`. For instance, we can wrap the number `5` and say it `should` equal `5`.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        // [ visit, get, should, should, find, should ]
        cy.visit('/')

        cy.log('about to fetch the element')

        cy.wrap(5).should('eq', 5)
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

If we reload, we'll see this assertion ran, and it ran in the same order we expected it to.

![image of the assertion ran in cy.wrap](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626694/transcript-images/06_cypress-debug-and-log-with-cypress-wrap.jpg)
