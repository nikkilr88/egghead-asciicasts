When testing, it's a good idea to make sure that your tests are isolated. That's why we're creating a brand-new `user` for each one of our tests that need a `user`. Most of the time when we create this `user`, we're probably going to need to be logged in as this `user`.

#### calculator.js
```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      // login as the new user
      cy.login(user)

      cy.visit('/')
        .getByTestId('username-display')
        .should('have.text', user.username)
        .getByText(/logout/i)
        .click()
        .queryByTestId('username-display', {timeout: 300})
        .should('not.exist')
    })
  })
})
```

What I'm going to do is I'm going to take this and make it a single command, `loginAsNewUser()`. We can use that in all the tests that need an authenticated user. I'll copy this. We'll use `Cypress.Commands.add('loginAsNewUser')`. Then we'll provide that arrow function with exactly what we were doing before.

#### commands.js
```javascript
Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then(user => {
    cy.login(user)
  })
})
```

If I go back to my test, I can say `cy.loginAsNewUser()`, get the `user`. Then we'll move all these commands inside of there. One last of step I'm going to do here is make sure that that subject is `body.user`. We'll `return body.user` to keep the subject of `Cypress` to be that `user`. With that, our tests are passing.

#### calculator.js
```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/')
        .getByTestId('username-display')
        .should('have.text', user.username)
        .getByText(/logout/i)
        .click()
        .queryByTestId('username-display', {timeout: 300})
        .should('not.exist')
    })
  })
})
```

#### commands.js
```js
Cypress.Commands.add('login', user => {
  return cy
    .request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      body: user,
    })
    .then(({body}) => {
      window.localStorage.setItem('token', body.user.token)
      return body.user
    })
})
```

In review, we had this really common use case where we need to log in as a new `user`, which we'll create a new `user`, register that `user` to the database, and then log that `user` into the application. Then we can use that `user` in our test. We did this by creating a new custom command that itself used other custom commands composing those commands together to make us a nice, useful `loginAsNewUser()` command.
