Instructor: 00:01 Logging in as a new user is a pretty common thing that we are going to want to do so I'm going to copy the `cy.request` from `calculator.js`. We'll go to our `commands.js`. We are going to make a new command. Let's say `Cypress.Commands.add`.

00:13 I'll just call this `login`. We'll take a `user` as an argument. We'll paste all those commands. 

#### commands.js
```js
Cypress.Commands.add('login', user => {
  cy.request({
    url: 'http://localhost:3000/login',
    method: 'POST',
    body: user,
  })
  .then(response => {
    window.localStorage.setItem('token', response.body.user.token)
  })
})
```

We'll save that and then we'll go back into `calculator.js`. We'll just say sign up. `cy.login` as this user. 

#### calculator.js
```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      cy.login(user)
        .visit('/')
        .findByTestId('username-display')
        .should('have.text', user.username)
        .findByText(/logout/i)
        .click()
        .findByTestId('username-display')
        .should('not.exist')
    })
  })
})
```

Save that. That'll get our test running and passing.

00:27 In review what we had to do to make this work is we basically just took a bunch of this code. Put it in here. Accepted it in argument. Passed that argument along to that function column and everything continued to work as it was before.

