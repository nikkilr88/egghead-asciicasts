Instructor: 00:01 As happy as I am that our login test is testing so much stuff and giving us a bunch of confidence, it's actually not giving us any additional confidence that the registration test doesn't give us. The only confidence that it's giving us in addition is the login piece.

00:14 What ends up happening is we're over-testing because these two tests are basically doing the same thing. What that means is that if there is an error, we're going to get a whole bunch more test failing, and it will be harder to figure out what the actual problem is, and it makes our test take quite a bit longer.

00:29 Wouldn't it be nice if we could just say, "Hey, Cypress, do this thing that our app is doing so that we can have a registered user"? That's exactly what we're going to do. Here, if we follow this in Cypress, we're going to see we go to the register, we fill in the username and password, and then we click on the Submit button here, and we post to the registration endpoint.

![following the tests in cypress](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/cypress-create-a-user-with-cy-request-from-cypress-tests-in-cypress.png)

00:51 What if we just tell Cypress to post to that registration endpoint for us? We could just get rid of all this stuff.

00:55 I'm going to click on that, and pop open our dev tools. We'll see all the information about this. We're hitting a post to the register URL. Here is our request body.

![request body](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/cypress-create-a-user-with-cy-request-from-cypress-request-body.png)

01:05 Let's go ahead and tell Cypress to do that in our login. Right here, I'm going to create a user. We'll use `cy.request()` to this URL, which I'm just going to copy from dev tools. The `method` will be a `POST`. The `body`, let's see, it's just user information. We'll say `user`.

#### login.js
```js
describe('login', () => {
  it('should login an existing user', () => {
    // create user
    const user = buildUser()
    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })

  ...

  }
```

01:28 With that, we can get rid of all the registration process stuff right down to the logout. We can start out by testing the stuff that we care about for this test.

```js
describe('login', () => {
  it('should login an existing user', () => {
    // create user
    const user = buildUser()
    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })

    cy.visit('/')
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

If I save that, I'm going to get a refresh on all my tests. Let's take a look at what's going on here.

01:44 Right from the start, we get this request to post that information. We pop open our dev tools. That request is exactly the same type of request that our application is making. That makes our tests a lot more terse. They also run a lot faster, and they're less prone to breakages.

01:58 In review, what we did here is we used cy.request() to make the same request that our application would make if we were to walk through the whole registration process.

02:06 We were able to use that same user that we registered with to run through the login process to ensure that the user can log in after they've been registered. We were able to reduce a huge amount of duplication between these tests.
