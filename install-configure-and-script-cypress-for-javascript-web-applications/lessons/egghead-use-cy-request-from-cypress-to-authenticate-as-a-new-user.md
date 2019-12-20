All the stuff that we're doing to log the user in is a little bit verbose. It's doing some extra work that we're already testing in our `login` test. Let's go ahead and expand this and see what actually happens. Maybe we can simulate the same type of thing using `cy.request` like we did with registration.

Here we go on and fill this form where you send a `POST` to the `login`, so I'm going to click on that. We'll pop this open. We can see the `Request` is just the `body: {username: "...", password: "..."}`. We're making that request to log in.

![Request](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907826/transcript-images/egghead-use-cy-request-from-cypress-to-authenticate-as-a-new-user-request.png)

Let's go ahead and do this using `cy.request`. We'll say `cy.request`. The `url` is this URL here. I'm going to snag that really quick. The `method`, that's a `POST` right there. The `body` it's going to be our `user`, just that object that has a `username` and a `password`.

#### calculator.js
```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      // login as the new user
      cy.request({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: user,
      })
```

Something that we don't actually see here but is an important aspect of our authentication for our application is the `response` comes back with a `user` that has a `token` on it. That `token` needs to get set into local storage.

We're going to add a `.then()`. We'll get the `response`. We'll say `window.localStorage.setItem('token')`. This will be `response.body.user.token`. With that, our user is authenticated and logged in as a user when they first start the application.

```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      // login as the new user
      cy.request({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: user,
      }).then(({body}) => {
        window.localStorage.setItem('token', body.user.token)
      })
```

Let's go ahead and update our test. We no longer need to go to `login`. In fact, we can't because we're actually authenticated. We'll get rid of all that stuff. We can start out our test by verifying that the `username-display` is there and that it has our `username` text. Then `click` on the `logout` and verify that the `username-display` is not there.

```javascript
describe('authenticated calculator', () => {
  it('displays the username', () => {
    cy.createUser().then(user => {
      // login as the new user
      cy.request({
        url: 'http://localhost:3000/login',
        method: 'POST',
        body: user,
      }).then(({body}) => {
        window.localStorage.setItem('token', body.user.token)
      })

      cy.visit('/')
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

With all that, we can have our test run. It runs a lot faster.

We first `POST` to register a new `user`. Then we `POST` to log in as that `user` and get the `token`. Then we visit our app. Our app actually makes a `/me` request when it gets started so that it can get the user's information. Then it renders with that user's information.

We can assert that the `username-display` is showing our user's `username`. We go ahead and `click` on the `logout`. We can verify that the `username-display` is no longer on the page.

![Faster Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907829/transcript-images/egghead-use-cy-request-from-cypress-to-authenticate-as-a-new-user-faster-test.png)

We do that login by making a `cy.request` command that posts to this login URL with our user's information. Then we set the `token` in local storage to be our `respose.body.user.token` so that when we visit our application, the application will see that `token` exists in local storage and will make the `/me` request to get the user's information. Then it will render the user's `username`.
