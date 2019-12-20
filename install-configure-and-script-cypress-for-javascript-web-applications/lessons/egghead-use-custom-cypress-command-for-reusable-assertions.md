In our `login`, we were able to clean up a bunch of duplicate code from the registration test by using this `createUser` command, but we still have a whole bunch of duplicate code for our assertion. If we look at `register` here, that looks awfully like what we have in our `login`.

#### login.js + register.js
```js
.url()
.should('eq', `${Cypress.config().baseUrl}/`)
.window()
.its('localStorage.token')
.should('be.a', 'string')
.getByTestId('username-display')
.should('have.text', user.username)
```

I don't want to remove that from the `login`, because there could be something that I change with the `login` that breaks the `login` but not the registration, so I'm not actually testing the exact same thing. Let's see if we reduce this duplication by using another Cypress custom command.

I'm going to copy this, and we're going to go to our `commands.js`, and I'm going to make a new command. `Cypress.Commands.add`. The first one I'm going to make is `assertHome`. This one is going to be pretty simple. I'll just paste this down here in a comment.

#### commands.js
```javascript
Cypress.Commands.add('assertHome', () => {

})
```

What it's going to do is I'll say `cy` and then we'll bring up the `url` `should` equal the home URL.

```javascript
Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})
```

Then, in both `register.js` and `login.js` I can get rid of this,

```javascript
.url()
.should('eq', `${Cypress.config().baseUrl}/`)
```

and I could say `assertHome()`, and use that custom command in `register`, and then use it in `login` as well.

Let's see what we can do about this duplication.

```js
.window()
.its('localStorage.token')
.should('be.a', 'string')
.getByTestId('username-display')
.should('have.text', user.username)
```

I'll make another custom command, `Cypress.Commands.add('assertLoggedInAs')`, and this one will take a `user`. Here we'll use `cy` and let's just bring all of these commands up here.

It's going to take that user and verify that the username is what is being displayed right there.

```javascript
Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('be.a', 'string')
    .getByTestId('username-display', {timeout: 500})
    .should('have.text', user.username)
})
```

Let's go and save this, and instead of all this stuff in `regsiter`, we can say `assertLoggedInAs` and pass the `user`.

#### register.js
```javascript
describe('registration', () => {
  it('should register a new user', () => {
    const user = userBuilder()
    cy.visit('/')
      .getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
      .assertHome()
      .assertLoggedInAs(user)
  })
```

We'll do the same thing in our `login`, and we get the exact same output as we did before.

#### login.js
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
        .assertHome()
        .assertLoggedInAs(user)
    })
  })
})
```
Now our `login` test is pretty lean. It doesn't do any more than it should, and its shared assertions are unique commands that we can execute.

Normally, I might not make an abstraction for just two duplications of code, but I'm probably going to have a couple more tests, where I want to assert that we're logged in as a specific user, or assert that we were redirected to the home page. Having these special commands for `assertHome` and `assertLoggedInAs` will be really valuable to me in the long term.

In review, what we did here was we noticed we had some duplicate assertions between our two different tests, and so we made a custom command `assertHome` and `assertLoggedInAs`, that encapsulated those commands. Then, we were able to exchange all of those commands in both of our tests for our custom commands.
