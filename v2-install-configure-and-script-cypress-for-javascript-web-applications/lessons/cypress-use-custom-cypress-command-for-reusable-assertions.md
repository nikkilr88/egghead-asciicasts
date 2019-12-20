Instructor: 00:00 I'm really glad we were able to reduce duplication between the login and the registration with the `createUser` command, but we do still have quite a bit of duplication between these two tests, which are verifying that the user was registered and logged in correctly.

00:13 I actually do want to have this duplication between these two because I could break something in the login process and not break that same thing in the registration, so I want to have the same assertions in here. What I'm going to do is I'll copy everything below our `url()` in `login.js`. We'll paste it in a comment under `Commands`.

#### commands.js
```js
/*
.url()
.should('eq', `${Cypress.config().baseUrl}/`)
.window()
.its('localStorage.token')
.should('be.a', 'string')
.findByTestId('username-display')
.should('have.text', user.username)
*/
```

00:28 Let's go ahead and make two assertions. The first one, we'll say `Cypress.Commands.add('assertHome', ... )`. This one, we'll just say `cy`, and then we'll bring up the `url()` and `should` stuff. Now, I can come in `login.js`, delete the `url` and `should` and say `.assertHome`. 

```js
Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})
```

We'll do the same thing for our `login`.

00:49 We want to take care of the stuff in the comment. Let's go ahead and make another command, `Cypress.Commands.add('assertLoggedInAs' ... )`, and then we'll just do `cy`. We'll bring in all this stuff.

01:03 We need the `user` by passing in `user` as an argument. We'll get rid of that empty comment. 

```js
Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')
    .findByTestId('username-display')
    .should('have.text', user.username)
})
```

We'll save that and then come into `regiser.js` and swap all of what we put in our `add` command with `assertLoggedInAs`, and we'll pass the `user`. 

#### register.js
```js
describe('registration', () => {
  it('should register a new user', () => {
    const user = buildUser()
    cy.visit('/')
      .findByText(/register/i)
      .click()
      .findByLabelText(/username/i)
      .type(user.username)
      .findByLabelText(/password/i)
      .type(user.password)
      .findByText(/submit/i)
      .click()
      .assertHome()
      .assertLoggedInAs(user)
  })
  ...
})
```

We'll do the same thing for our `login.js`. 

#### login.js
```js
describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/')
        .findByText(/login/i)
        .click()
        .findByLabelText(/username/i)
        .type(user.username)
        .findByLabelText(/password/i)
        .type(user.password)
        .findByText(/submit/i)
        .click()
        .assertHome()
        .assertLoggedInAs(user)
    })
  })
})
```

Great. Now our tests are a lot more lean and descriptive. We can go over to our tests and see that they're all passing.

01:24 In review, what we did here is reduce some duplication and improve the readability of our tests by creating some custom commands to encapsulate some Cypress assertions and using those custom commands in our tests.