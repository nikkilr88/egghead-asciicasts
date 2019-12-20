Instructor: 00:01 I want to test the login process. We're going to add a login file in the `e2e` directory, and I'll open up `register.js`. We're just going to copy all of it and paste it into `login.js`, because lots of this is going to be exactly the same.

00:10 We're going to get rid of this last test, because we don't need that for this one. For logging in, which we're going to do here, login should log in an existing user. For this test, actually, we need to have an existing user. We'll go ahead and we'll leave all of this in here.

#### login.js
```js
import {buildUser} from '../support/generate'

describe('login', () => {
  it('should login an existing user', () => {
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

      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .findByTestId('username-display')
      .should('have.text', user.username)
  })
})
```

00:27 Actually, for our test to be able to start, we need to log out. Let's go ahead and `findByText`, `logout`, and then `click` on that logout. 

```js
.findByText(/logout/i)
.click()
```

Now, we actually can start our test.

00:46 We'll `findByText`, `login`. We'll `click` on that to get to the login form. Actually, the login form looks really similar to the registration form. Let's go ahead and just basically do all the same stuff.

01:02 We're using the same user, of course, because we need that user's username and password to log in for them. We'll do all of this same stuff. Paste it right there. 

```js
describe('login', () => {
  it('should login an existing user', () => {
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
      .findByText(/logout/i)
      .click()
      // now our test can start...
      .findByText(/login/i)
      .click()
      .findByLabelText(/username/i)
      .type(user.username)
      .findByLabelText(/password/i)
      .type(user.password)
      .findByText(/submit/i)
      .click()
      // now let's verify things are set after login.
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .findByTestId('username-display')
      .should('have.text', user.username)
  })
})
```

Save that. Now, we'll get our test passing with flying colors. Now, we verify the login.

01:17 In review, what we did here was, we copied lot to the registration, removed some of the stuff that wasn't relevant, and added this little bit to make sure that the login process works.


