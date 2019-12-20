Instructor: 00:01 In `calculator.js`, `cy.createUser` and `cy.login` are basically boiler plate here, we need to create a user and then login. It's pretty common that I'm going to want to create a user and log in at the same time like log in as a new user.

00:11 What I'm going to do is I'm going to take this stuff, we'll go to our `commands.js` and I'm going to make a new command `Cypress.Commands.add`. We'll just call this one `loginAsNewUser`. We'll put that command in there, we'll fix all that up. 

#### commands.js
```js
Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then(user => {
    cy.login(user)
  })
})
```

Then, we'll save this and in `calculator.js` we'll do `cy.loginAsNewUser` and get rid of all this boiler plate here. 

#### calculator.js
```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.loginAsNewUser()
      .visit('/')
      .findByTestId('username-display')
      .should('have.text', user.username)
      .findByText(/logout/i)
      .click()
      .findByTestId('username-display')
      .should('not.exist')
  })
})
```

00:34 It looks like we're going to need to have access to `user`, so we'll do a `.then`, we'll get the `user` and we'll put all this stuff back in that arrow function with the `cy` at the beginning. 

```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/')
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

We're going to need to get access to that user. Right in out `login` command, this is the last command that has access to our subject. We're going to `return` an object that combines all the properties from `response.body.user` with the `user` that is provided here, so we get access to their password if that's what we need for our tests.

#### commands.js
```js
Cypress.Commands.add('login', user => {
  return cy
    .request({
      url: 'http://localhost:3000/login',
      method: 'POST',
      body: user,
    })
    .then(response => {
      window.localStorage.setItem('token', response.body.user.token)
      return {...response.body.user, ...user}
    })
})
```

01:01 That will mean that the subject that we get back when we call login will be this object, which allows us to have access to that user object here when we call `loginAsNewUser`. With that, we'll hit save here. We'll come back here to a parsing test. Everything's working as expected.

01:16 In review, what we did here was we pretty much copy pasted some of this stuff and put it into a custom command, then just called that. Then because we need access to the user, we made sure that the last command we execute, which is this login command is returning a correct response so that the subject of our Cypress chain is set properly.