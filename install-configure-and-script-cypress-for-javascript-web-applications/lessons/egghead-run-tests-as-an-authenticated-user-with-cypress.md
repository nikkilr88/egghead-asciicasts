We have a test for an `anonymous calculator`. Let's go ahead and make a test for a logged-in calculator. We want to have a user who's logged in and verify some features that the user is able to do when they're logged in.

In our contrived example, we're just going to verify that the user's display name is displayed and that they can log out, just to show how to run tests as a logged-in user. Here we're going to make a `describe('authenticated calculator',`. We'll say, `it('displays the username',`

Here we can use `cy.createUser`, our custom command. We'll save that.

#### calculator.js
```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser()
  })
})
```

We'll say `then(user => {...`. Then we'll start executing our commands. We'll say, `cy.visit` our application at home.

```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
        cy.visit('/')
    })
  })
})
```

Then we need to log in.

Let's go ahead and we'll get our `login` test. We'll pretty much do all the same stuff that we did here. Then we'll go ahead and say, `assertLoggedInAsUser`. Then we'll `.getByText(/logout/i)`. We'll `.click()` on the logout button.

```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
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
          .assertLoggedInAs(user)
          .getByText(/logout/i)
          .click()
    })
  })
})
```

Then we need to verify that something does not exist in the DOM. With `cypress-testing-library`, you have these `getBy` queries. If something does not exist, a `getBy` query is actually going to throw an error after four seconds.

We need to assert that something does not exist. We'll use a `queryByTestId`, which will not throw an error. We're going to look for the `username-display`. We'll go ahead and have it `timeout` after `300` milliseconds because we know that it's not going to be there.

```javascript
.queryByTestId('username-display', {timeout: 300})
```

If it's not there after 300 milliseconds, we can feel pretty confident that it's not going to appear there at all. By using `timeout`, it means that our tests will run a little bit faster. Then we can say, `.should('not.exist')`.

```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
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
We'll go ahead and save that. Now our test will run. We're all set.

![Test Run](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907824/transcript-images/egghead-run-tests-as-an-authenticated-user-with-cypress-test-run.png)

In review, here we created a new user. Then we used that user to go through the login flow. Then we asserted that we were logged in as that user. We clicked on the logout. Then we asserted that the `username-display` no longer exists.
