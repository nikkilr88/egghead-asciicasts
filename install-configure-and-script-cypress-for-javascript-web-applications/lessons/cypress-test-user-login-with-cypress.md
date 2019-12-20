I'm going to go ahead and create a new file called `login.js`. We're going to do pretty much a lot of the same thing that we're doing in a `registration`. I'm going to copy this over. We'll get rid of this error testing here. We don't need to worry about that for this.

Instead of `registration`, we'll say `login` and `should log in an existing user`.


#### login.js
```javascript
import {userBuilder} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
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
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .getByTestId('username-display', {timeout: 500})
      .should('have.text', user.username)
  })
})
```

How do we have an existing user? That user needs to be registered first. This is the registration process right here. Having done this, we now have a registered user. Now our test can start.

```javascript
import {userBuilder} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
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

      // Now our test can start
  })
})
```

Actually, we want to log out. We'll create a new user. We'll log out, and then we'll go log in as that user.

We'll `.getByText(/logout/i)t` and then `.click()`.

```javascript
import {userBuilder} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
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
      .getByText(/logout/i)
      .click()

      // Now our test can start

      // Now let's verify things after login
  })
})
```

Now our test will live right in here.

The first thing that we're going to do is we'll `.getByText(/login/i)`. We'll `.click()` on that. We'll do lots of the same thing that we did here actually. We'll fill in the `username` and `password` and `click` on the Submit button. I'll add that .click there.

Then we'll `.getByLabelText(/username/i)`, fill in the `username` and the `password`, and `submit` because our login form is pretty much exactly the same as our registration form. Once we've clicked, we should be logged in as that user.

```javascript
describe('login', () => {
  it('should login an existing user', () => {
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
      .getByText(/logout/i)
      .click()

      // Now our test can start
      .getByText(/login/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()

      // Now let's verify things after login
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .getByTestId('username-display', {timeout: 500})
      .should('have.text', user.username)
  })
})


```

Let's go ahead and save this. With this new file, Cypress will show that login test.

![Login](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907823/transcript-images/cypress-test-user-login-with-cypress-login.png)

Awesome. We go through here. We click on the log in. We click on the register. We fill in a username and password. We click on log out. Then we click on log in. We fill in that same username and that same password. Then we verify that this user is logged in.

![Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907822/transcript-images/cypress-test-user-login-with-cypress-test.png)