One really cool thing about Cypress is that it allows you to get your application into a certain state really quickly and repetitively so that, as you're developing your application, you can get yourself into that state as you're making changes. This actually pairs really nicely with test driven development.

Let's go ahead and say that after the `user` has been registered and logs in, then instead of just showing this `logout`, we also want to show their `username`.

Rather than developing the feature and refreshing the browser every single time and going through the whole registration process, we can just let Cypress go through that registration process for us, and then we can assert that our feature's done before it actually is. Let's go ahead and do that.

I'm going to add some assertions here, with `getByTestId('username-display')`, and we'll say that `.should('have.text', user.username)`.

#### register.js
```javascript
import {userBuilder} from '../support/generate'

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
      .url()
      .should('eq', `${Cypress.config().baseUrl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
      .getByTestId('username-display')
      .should('have.text', user.username)
  })
})
```

Now our test is going to fail, because it's looking for that `username-display` node and it can't find it.

![Failed Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907821/transcript-images/egghead-cypress-driven-development-fail.png)

We can also add a `timeout` here to say if it doesn't show up within `500` milliseconds, then it probably never going to show up, and we'll get that failure a little bit sooner, so next let's go ahead and implement this feature.

```javascript
.getByTestId('username-display', {timeout: 500})
```

I'm just building my app here, so I'm going to go into `app.js`, and right here toward the bottom is where that `Logout` button appears. We're going to not only render this `button`, but also want to render a `div` that has the user's username.

#### app.js
```javascript
{this.props.user ? (
    <button type="button" onClick={this.props.logout}>
        Logout
    </button>
    ) : (...
```

We're going to add a React fragment right here, and we'll say a `div` with `data-testid="username-display"`, and then we'll just render `this.props.user.username`.

```javascript
{this.props.user ? (
    <>
    <div data-testid="username-display">
        {this.props.user.username}
    </div>
    <button type="button" onClick={this.props.logout}>
        Logout
    </button>
    </>
```

With that, let's go and rerun all of our tests, and it worked.

![Passed](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907820/transcript-images/egghead-cypress-driven-development-pass.png)

This test-driven development with Cypress really enhances your development workflow, and because you have access to the developer tools right in your testing tool, there's really not a whole lot of reason to use a regular browser to develop your application.

Just use Cypress, and when you need to get the application in a certain state, you can actually automate that, and you don't have to actually commit the tests that you create when you're doing this test-driven development if they're not really all that useful or very good tests.

They definitely provide a great deal of value when you're developing your application, by letting Cypress do the hard work to get you to the state of the application that you need to to verify that your changes were successful.

In our case, we're going to go and leave this as it is, because I do like this test. I think it is useful, and we'll go and commit this. We can continue to verify that we haven't broken the behavior where the username appears when the user's been logged in.