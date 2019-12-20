Instructor: 00:01 Just like when we created that login tests, we are over testing again, because we're doing a whole bunch of login test stuff in `calculator.js`. If we take a look at that login, we're basically copy-pasting all this stuff. Let's be honest here.

00:12 It would be really nice if we could just say, "Hey, create me a user and make that user logged in." Let's go ahead and I'm going to say `cy.request`. We're going to do the same thing that our app does when we click on the submit button.

00:25 Comment that out for now. We'll save this and see our application running. We'll go to displace the username. It's that request right here, a post to the login endpoint.

![post to the login endpoint](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-use-cy-request-from-cypress-to-authenticate-as-a-new-user-post-to-the-login-endpoint.png)

Let's make that login url right here. The `url` will be the localhost url. The method will be a `POST`.

#### calculator.js
```js
cy.request({
  url: 'http://localhost:3000/login',
  method: 'POST'
})
```

00:42 Let's take a look at the body of this request in the dev tools. It's just the user form. We'll say `body` is `user`. Something else happens when we log in. That is our application, local storage, gets a token. Let's go ahead and set that. In our local storage, we'll say `then`, we'll get that `response`.

01:00 We'll say `window.localStorage.setItem('token')`. That's going to be `response.body.user.token`. Then we can actually get rid of all of the login related code below and start our test off a lot quicker.

```js
cy.request({
  url: 'http://localhost:3000/login',
  method: 'POST',
  body: user,
}).then(response => {
  window.localStorage.setItem('token', response.body.user.token)
})
```

If we save that and come back in here, then our test runs a lot faster. We don't have to go through the whole login flow a second time.

01:22 In review, what we did here is we simply replaced a bunch of the login stuff that we basically copy-pasted with a site out request call to simulate the exact same thing that our app is doing when we hit the submit button on the login form so that we don't over-test that login form.

01:37 That includes making a request to the login endpoint and updating local storage with our user token.


