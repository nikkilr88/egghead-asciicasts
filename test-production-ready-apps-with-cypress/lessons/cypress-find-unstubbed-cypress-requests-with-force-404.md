By default, `cy.server` will pass all requests to your back end. Now, that's a great configuration when we want to do full end-to-end testing, but often times, we'll want to mock our back end to ensure that we get known data for our tests. How do we make sure we stub out every request our application makes?

If we pass the option `cy.server({force404: true})`, Cypress will ensure that any route that isn't stubbed returns a 404, breaking our app. Let's go ahead and pass it. We'll comment out our `preload` call.

```js
describe('Todo Application', () => {
  beforeEach(function() {
    cy.fixture('todos/all.json').as('todos')

    cy.server({force404: true})
    // Alias the fixture data
    // cy.route('/api/todos', '@todos').as('preload')

    cy.visit('/')
    // cy.wait('@preload')
  })
```

When Cypress tries to preload our todos, it returns a 404, which breaks our tests because the test expects two todos to be visible on the page. 

![image of cypress tests breaking because there are not two visibile todos.](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626676/transcript-images/13_cypress-find-unstubbed-cypress-requests-with-force-404-breaking.jpg)

This is a great way to identify stubs that we haven't yet configured. To see this in action, let's comment these back in and move on to creating a test where we edit one of our todos.

```js
describe('Todo Application', () => {
  beforeEach(function() {
    cy.fixture('todos/all.json').as('todos')

    cy.server({force404: true})
    Alias the fixture data
    cy.route('/api/todos', '@todos').as('preload')

    cy.visit('/')
    cy.wait('@preload')
  })
```

When we edit a todo, we double-click on the text field, change the text, and press enter. In order to replicate this, let's hit our selector playground, find the selector we need to target, and copy it to the clipboard. 

![image of the passing tests and the selector playground](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626692/transcript-images/13_cypress-find-unstubbed-cypress-requests-with-force-404-select.jpg)

Let's append the selector to our test and double-click it. In our application, when we `dblclick()` on a todo, a new input appears on the page. That input is called `todo-input-edit`. If we want to clear the text in it, we can call `.clear`. Then we can `.type('Updated todo{enter}')`.

```js
it('loads the page', function () {
    cy.store('example.test.first').should('equal', 1)

    // Access the fixture data as this.todos
    cy.store('todos').should('deep.equal', this.todos)

    cy.get('[data-cy=todo-item-1]')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find('.toggle')
      .should('not.be.checked')

    cy.get('[data-cy=todo-item-2]')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find('.toggle')
      .should('be.checked')

    cy.get('[data-cy=todo-label-1]').dblclick()
    cy.get('[data-cy=todo-input-edit]').clear().type('Updated todo{enter}')
  })
```
 
Back in Cypress, we see that we targeted the label. We doubled-clicked it, which caused the new input edit to appear on the page. We targeted that, cleared it, then typed updated todo enter.

![image of the targeted label](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626692/transcript-images/13_cypress-find-unstubbed-cypress-requests-with-force-404-target.jpg)

Finally, we see we have a 404 to the request `api/todos/1`, which is the update endpoint. The 404 alerts us that we haven't yet stubbed out our endpoint. Let's stub it out.

This will be a `cy.route`. It'll be a ` cy.route('PUT', '/api/todos/1', 'ok').as('update')`. Now all we need to do is `cy.wait('@update')`. 

```js
    cy.route('PUT', '/api/todos/1', 'ok').as('update')
    cy.get('[data-cy=todo-label-1]').dblclick()
    cy.get('[data-cy=todo-input-edit]').clear().type('Updated todo{enter}')
    cy.wait('@update')
  })
```

If we return to our test, we'll see that we no longer have a 404, but a 200 for the update. 

![image of the updated 200](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626695/transcript-images/13_cypress-find-unstubbed-cypress-requests-with-force-404-put.jpg)

I find it's helpful to configure cy.server with force 404 anytime we aren't directly interacting with our back end.
