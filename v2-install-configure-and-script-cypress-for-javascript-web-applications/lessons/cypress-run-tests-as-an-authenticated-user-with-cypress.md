Instructor: 00:01 We've got an anonymous calculator test here in `calculator.js`.

#### calculator.js
```js
describe('anonymous calculator', () => {
...
})
```

Let's make a authenticated calculator test at the bottom of `calculator.js`. Here, we're going to say, it displays the username. That's pretty much all we want to care about here. Displays it when you're authenticated, does not when you log out.

```js
describe('authenticated calculator', () => {
  it('displays the username', () => {

  })
})
```

00:15 For lots of this stuff, we're just going to use the login test right in `login.js`. Let's just pretty much grab all this stuff, remove a couple of things here.

```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
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
    })
  })
})
```

00:23 As soon as we log in, we want to verify that the username is displayed, so we'll `findByTestId`, `username-display`. We'll verify that it should have `text.username`, and then we'll find by `text.logout`. We'll `click` on that.

00:44 Then we want to make sure that the `username-display` does not exist anymore. We'll come down here, say `username-display`, and then should `not.exist`.

```js
describe('authenticated calculator', () => {
  it('displays the username', () => {
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

We'll save that. Get our test running and is passing.

00:57 We come down here, and we say `findByTestId`. Expected that DOM node to not exist, while up here, we expect that DOM node to have the user's username.

![find by test id](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/cypress-run-tests-as-an-authenticated-user-with-cypress-findByTestId.png)

01:05 In review, what we did here is, we create a user. We visit the app and log in as that user. Then we verify that the `username-display` does show the user's information. Then when we log out, it no longer shows the user's information.
