Instructor: 00:01 I love that Cypress allows us to test the happy path. Normally, my end to end test are going to mostly just test the happy path and I'll leave the sad path or the bad path for the integration or unit style test that I have in my app, which I'm writing with Jest and React testing library. Sometimes, it can be useful to test the sad path.

00:19 Let's see what happens if I go to this login page and I fill in some value for the username and password. I hit some int and the server has some sort of back end error, we get a 500 result back. What actually happens in our app is we have coded up, "There was an error. Please try again." We want to make an assertion for that. I want to show you how we're going to do that.

00:37 I'm going to add another test in `register.js`, it should show an error message if there's an error registering. Then, what we'll do is we'll `cy.visit` the registration page and we're going to go straight to that `register` page because we know users can get there by clicking on the register link.

00:55 We don't need to over test that. We'll go straight to the registration page, save ourselves a little bit of time. We're going to `findByText`, `submit` and then just `click` on the submit button because we don't really need to send a valid data because we're going to be mocking this out anyway.

01:08 We'll `click` on that submit button and we'll `findByText`, `error`, `try again`. We don't need to be too specific here, so I'll just make it a little generous with that rain checks.

#### register.js
```js
it(`should show an error message if there's an error registering`, () => {
  cy.visit('/register')
    .findByText(/submit/i)
    .click()
    .findByText(/error.*try again/i)
})
```

We'll save this, we'll come back here, our test re-run.

01:21 This test is going to fail because it can't find that error message. The reason that it can't find that error message is because it doesn't show up because this post request actually passes and we don't want that to happen.

![cant find error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-simulate-http-errors-in-cypress-tests-cant-find-error-message.png)

01:32 Let's go ahead and we'll pin that, open up our dev tools and we'll see a bunch of information about this request that we made. In fact, if we go to our network and refresh this, we'll actually see all of those request right here in our network tab as well.

01:45 If I click on that register line here, this is the request that we made for the register endpoint on our API server. What I'm going to do is I want to say, "Hey, Cypress, instead of allowing this request to actually go to the server, I want you to handle it and this is what I want you to do with it."

01:59 What we're going to do is we'll say `cy.server`, `route`. When there's a method of post as this request is, a `url` going to the register endpoint of our server, we want to respond with a `status: 500` and `response` of what our server would typically send back. We'll just do an empty object here, but you could put whatever you want that response to be.

#### register.js
```js
it(`should show an error message if there's an error registering`, () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: 'http://localhost:3000/register',
    status: 500,
    response: {},
  })
  cy.visit('/register')
    .findByText(/submit/i)
    .click()
    .findByText(/error.*try again/i)
})

```

02:20 Now, we can save that, come back here, our test re-run and our test is passing because now we are saying, "There was an error. Please try again."

![passing tests with error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/cypress-simulate-http-errors-in-cypress-tests-passing-tests-with-error.png)

As you're developing this, it might be useful to separate this two, so we're going to add a `.only` so that you can only run that one test that you're actually working on.

```js
it.only(`should show an error message if there's an error registering`, () => {
  ...
}
```

02:35 In review to make all of this magic happen, we use the cy.server command. Then we changed the route command off of that to say, "Hey, when there's a method post at this API URL then we want to respond with the status of 500. Here's the response we want to send back."

02:49 Then we go ahead with our cy.visit. Any request that matches this method in that URL Cypress will intercept and send back the status that we blocked out. That request actually does go through. If we look at this register that gets us to 500, Cypress actually intercepts it and sends it to a URL that it can handle.

03:08 As far as the browser is concerned we're getting a 500 error back and so all of our code works can handle this error as we expect.
