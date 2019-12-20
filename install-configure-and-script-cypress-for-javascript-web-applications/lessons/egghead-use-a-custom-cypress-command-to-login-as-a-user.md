It's probably likely that we're going to want to do this `login` request for many tests, so I'm going to make a command out of this. I'll just copy this, we'll go to our `commands.js`, and I'll add a custom `Cypress.Commands.add`, and we'll just call this simply `login`. That will accept a `user`, and then I'm just going to paste in those commands.

#### commands.js
```javascript
Cypress.Commands.add('login', user => {
  cy.request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      body: user,
  }).then(({body}) => {
    window.localStorage.setItem('token', body.user.token)
  })
})
```

Then we'll go back to our `calculator.js` and we'll swap this out for a `cy.login` with that `user`. We'll save that.

#### calculator.js
```javascript
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
})
```

Once we've logged in we'll visit the app and execute all of our other commands, and everything is working great.

![Test Run](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907820/transcript-images/egghead-use-a-custom-cypress-command-to-login-as-a-user-test.png)

In review, we just copied a bunch of commands, put them in a custom command here. Then we're able to use it both in this test and any other test that needs to log a user in.
