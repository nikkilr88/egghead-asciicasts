It's great that we're testing the entire login flow, but this `'login'` test and this `'registration'` test look very, very similar. It makes me a little bit uncomfortable, because this means that we're doubly covering the exact same code.

It's not giving us a whole lot more confidence, but it taking our tests longer to complete. If something breaks, more of our tests are going to break. It'll take longer to identify what exactly it is that broke. Since we've already tested the registration, what if we were to simulate exactly what our registration code is doing so that we can register a new user, and then log in with that user.

Rather than clicking through the UI, we just do the same thing that our application when we register a new user. What is our application doing? It's going to the registration, it's filling out this form. Then when we click on this form, we POST something to the server.

What we were just to make that `POST` directly? I'm going to pin that, and I'll open my console here.

![Pin](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907822/transcript-images/egghead-create-a-user-with-cy-request-from-cypress-pin.png)

We'll go to console, and we can see we have this `Request` object with a `body` and `headers`. What if we just made that request ourselves?

![Request Object](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907825/transcript-images/egghead-create-a-user-with-cy-request-from-cypress-console.png)

That's exactly what we're going to do. Here at the top, I'll say `cy.request`, and the `url` is going to be this URL right here. I'll say `url: 'http://localhost:3000/register'`, `method: POST`, and the `body` needs to just be that `user` object, a `username` and `password`. I'll say `user`.

#### login.js
```javascript
describe('login', () => {
  it('should login an existing user', () => {
    const user = userBuilder()
    cy.request({
        url: 'http://localhost:3000/register',
        method: 'POST',
        body: user,
    })
    ...
```

With that, this `user` has been registered. They haven't been logged in, but that's what we're testing. Let's go ahead, and we'll clear out all the registration nonsense here, right down to where our tests can start. Once we have a `user` that's been registered in the database, we can visit our app, go ahead to the `login` page, and fill out the `login` process.

```javascript
describe('login', () => {
  it('should login an existing user', () => {
    const user = userBuilder()
    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
    cy.visit('/')
      .getByText(/login/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
      // now let's verify things are set after login.
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

Then we can make our assertion that our user has been logged in. Let's go ahead and try that. I'll get rid of this thing. We'll save this, and we'll get a refresh in our tests. Perfect.

![Rerun](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907821/transcript-images/egghead-create-a-user-with-cy-request-from-cypress-rerun.png)

We start out with this `request` before we even visit the app to register our new user with the database.

Then we visit our app. We click on that `login` button. We get that `username` and type in the user's `username`, the same one that we requested with, and their password. Then we submit, and then we can verify that the user's logged in.

In review, to do this, we simply use the `cy.request` command to tell Cypress to make an HTTP request with this configuration, specifying the `user` as the `body`. The `user` has a `username` and `password`, and then we could go to the login screen and fill in that `username` and `password`.

```javascript
describe('login', () => {
  it('should login an existing user', () => {
    const user = userBuilder()
    cy.request({
      url: 'http://localhost:3000/register',
      method: 'POST',
      body: user,
    })
    cy.visit('/')
      .getByText(/login/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
    ...
```

What we had before was great, because it was testing more things, but we were already testing those things elsewhere. It was just adding extra things to do without increasing any of our confidence. It's nice to circumvent that, because we wouldn't be getting any additional confidence, anyway.
