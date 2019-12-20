A lot of my tests are going to require creating this new `user` that I can use to log in. I'm going to take this and create a custom command to generate a brand-new user. I'll go ahead and copy this.

#### login.js
```javascript
import {userBuilder} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
    const user = userBuilder()
    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
```

I'm going into the `commands.js` file here. I'll use `Cypress.Commands.add`. We'll call this custom command `createUser`. This will be an arrow function. Our command logic will live inside of here.

#### commands.js
```javascript
import {userBuilder} from '../support/generate'

Cypress.Commands.add('createUser', ()) => {

describe('login', () => {
  it('should login an existing user', () => {
    const user = userBuilder()
    cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
    })
})
```

Let's clean this up a little bit. That `import` should be at the top. We'll get rid of `describe` and `it`, but we will want to create this `user`. We'll make this `request`. I'm also going to allow people to pass in `overrides` if they have something specific about the user that they want to have added to the created `user`.

```javascript
import {userBuilder} from './generate'

Cypress.Commands.add('createUser', overrides => {
  const user = userBuilder(overrides)
  cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
})
```

Now we can go into our `login`. Instead of doing all of this stuff, we can say `cy.createUser`. We can get rid of all of this.

#### login.js
```javascript
describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser()
    cy.visit('/')
      .getByText(/login/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
      // now let's verify things are set after login.
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .getByTestId('username-display')
      .should('have.text', user.username)
  })
})
```

Now we've got a missing `user`. We can get rid of that builder, but where's that `user` coming from? We could create that ourselves and then pass in those overrides, but it would be nice if this thing takes care of all that for us, and we'd get access to the `user` somehow.

The way we're going to do this is we're going to add `.then()`. This will take our `subject`. Then we can take everything that we have out here and put it inside of our` .then()`. That has access to the `subject`, which in our case is going to be the `user`.

```javascript
describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/')
        .getByText(/login/i)
        .click()
        .getByLabelText(/username/i)
        .type(user.username)
        .getByLabelText(/password/i)
        .type(user.password)
        .getByText(/submit/i)
        .click()
        // now let's verify things are set after login.
        .url()
        .should('eq', `${Cypress.config().baseUrl}/`)
        .window()
        .its('localStorage.token')
        .should('be.a', 'string')
        .getByTestId('username-display')
        .should('have.text', user.username)
    })
  })
})
```

We have to set the `subjejct` in Cypress to be that `user`. What we're going to do is we'll say `.then()`. The subject that `request` yields is the `response` obect. We're going to take that `response` object, and we'll say `response.body.user`. This changes the subject from the `response` object to the `user` object on that `response`.

#### commands.js
```javascript
import {userBuilder} from './generate'

Cypress.Commands.add('createUser', overrides => {
  const user = userBuilder(overrides)
  return cy
    .request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
    .then(({body}) => body.user)
})
```

With that, I can create the `user` entirely in another command and use the same command in any other test that needs a new `user` created in the database without having to duplicate a bunch of code anywhere that's needed. In our output, we still do that same request that we had before.

In review, to create a custom command, you're going to do that in this `commands.js` file which is in this `support` directory, and it's imported in that `index.js` file. Inside of the commands, you can say `Cypress.Commands.add`. Then you give the name of the command and a function to run when that command is run.

#### commands.js
```javascript
import {userBuilder} from './generate'

Cypress.Commands.add('createUser', overrides => {
  const user = userBuilder(overrides)
  return cy
    .request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
    .then(({body}) => body.user)
})
```

Inside of here, you can queue up other Cypress commands. The last Cypress command that you execute can change the subject by using this `.then()` API. Then we used it in our `login` test where we said `cy.createUser`. We got access to that new subject, the `user`. We used that new subject in the rest of the commands that we execute with Cypress.

#### login.js
```js
describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/')
        .getByText(/login/i)
        .click()
        .getByLabelText(/username/i)
        .type(user.username)
        .getByLabelText(/password/i)
        .type(user.password)
        .getByText(/submit/i)
        .click()
        // now let's verify things are set after login.
        .url()
        .should('eq', `${Cypress.config().baseUrl}/`)
        .window()
        .its('localStorage.token')
        .should('be.a', 'string')
        .getByTestId('username-display')
        .should('have.text', user.username)
    })
  })
})
```
