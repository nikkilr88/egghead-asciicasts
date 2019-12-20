Instructor: 00:01 One thing that I really love about Cypress is that it allows you to get to a specific state really quickly and repetitively. This pairs really nicely with the Cypress version of test-driven development. Let's say that after the user logs in, I want to not only have a logout button show up here but also the username. Let's test drive that.

00:18 We already have a test that will get us to this logged in state really quickly.

![login](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727283/transcript-images/cypress-cypress-driven-development-login.png)

All we need to do is add an assertion and then add the code that makes that assertion pass. What I'm going to do here is at the bottom of this test in `register.js`, I'm going to do a `findByTestId`, `'username-display'` and we'll say that `should` have text `user.username`.

#### register.js
```js
describe('registration', () => {
  it('should register a new user', () => {
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

00:39 With that, if I save that, I'm going to get my test run and it's going to wait for a little bit and decide this is never going to show up the username. Let's go ahead and fail that assertion.

![failed assertion](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-cypress-driven-development-failed-assertion.png)

Now what I'm going to do is go into my `app.js` file, and I'm just going to look for that logout button right here.

00:55 I'm going to wrap this in a React Fragments, and we'll put a `div` with `data-testid`, `username-display`, and we'll put `user.username` right there.

#### app.js
```html
{user ? (
  <>
    <div data-testid="username-display">{user.username}</div>
    <button type="button" onClick={logout}>
      Logout
    </button>
  </>
```

We'll save that. This is going to refresh the page, but it's not going to restart our test because Cypress is just watching our test code, it's not watching our app code.

01:14 Our app was refreshed, we can see this username showing in there.

![username showing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727284/transcript-images/cypress-cypress-driven-development-username-appears.png)

Our test hasn't rerun to verify that works, so let's go ahead and run all the tests again. Now our testis passing.

01:24 If you've ever developed an experience where a user has to enter in seven pages of forms and then you get to the success page, and that's what you're developing is that success page, and it's a total nightmare to develop that because you have to type in all those form inputs, now you can just use Cypress to have that.

01:38 Type in all type in those form inputs automatically for you, you can get to that last page quickly, and use Cypress as your tool for development. The cool thing about this, is you have all of your development tools that you're used to having in regular Chrome because it is Chrome.

01:51 You can access all the elements, you can access the console resources, everything is right in here just as if you're using Chrome, except that you have Cypress as a mechanism for automating a lot of the normal processes that you're going to be doing as you're developing your application.

02:04 In review of what we did here, was we added a filling assertion to our test, and then we went and added that feature to our app to make our test pass. The regular red, green, refactor cycle of test redevelopment with Cypress.
