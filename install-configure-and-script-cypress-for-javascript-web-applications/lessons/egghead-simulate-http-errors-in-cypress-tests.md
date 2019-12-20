It's great that we have this registration test here, and now, I can log out. If I `register` again and type `some user` and `whatever`, what if I click on `submit`, and there's an error on the server or something? I actually in my code, I'm going to show an error message here, but how do I simulate that in this type of environment so that I can get some coverage for that experience?

Let's go ahead and write that. I'm going to write here at the bottom, I'll add, ``it(`should show an error message if there's an error registering` `` It looks like I'm going to want a template literal there, so I can do an apostrophe.

#### register.js
```javascript
it(`should show an error message if there's an error registering`, () => {
})
```

Now, the first thing I'm going to do is I'll `visit` `register` directly.

```javascript
it(`should show an error message if there's an error registering`, () => {
    cy.visit('/register')
})
```

I've already tested that this clicking on `register` link is going to take me to the `register` page. I don't need to really test that again, so I'll just go directly to the `register` page.

Then I want to `.getByText(/submit/i)`. I don't really care what the values are here. In fact, we can just leave them blank, because I'm going to mocking out the request, anyway. I'm just going to go ahead and `click` on the submit button directly.

```javascript
cy.visit('/register')
  .getByText(/submit/i)
```

I'll `click` on that submit button, and then I want to verify that there is some text that says, "There was an error. You need to try again." We'll say `getByText`, and we'll just pass a regex `/error.*try again/i` I don't really care about the particular message.

```javascript
cy.visit('/register')
  .getByText(/submit/i)
  .click()
  .getByText(/error.*try again/i)
```

It just needs to say, "There was an error. You need to try again." If I do this, I'm going to refresh the browser here, and it's going to run my first test. Then it'll run the second test. We actually didn't see what happened, it happened so fast.

![Second Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907822/transcript-images/egghead-simulate-http-errors-in-cypress-tests-secondtest.png)

First, we visited the register page. We clicked on the submit button, and it just went forward with that. Now, probably in a real application, you're going to want to have some logic. We may have another test to verify that you can't just do what I just did.

For our situation, we want to show an error message, because there is a server-side error. What we need to do is we need to mock out the request that is made when we make a request to the server to register.

I'm going to pop open the developer tools here. If we go to `network`, and we'll clear all this, I'm going to change this to an `it.only`, so that we only run this one test, so we don't run that one. I'll save that, and our test should re-run.

```javascript
it.only(`should show an error message if there's an error registering`, () => {
  cy.visit('/register')
    .getByText(/submit/i)
    .click()
    .getByText(/error.*try again/i)
})
```

We can see what's going on here.

If we go just to XHRs, we have a `register`. This is our `OPTIONS` request to see whether this supports CORS, because this is a different domain. Then we have our actual `POST`, where we're actually posting a blank `username` and `password`.

![Run Only](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907818/transcript-images/egghead-simulate-http-errors-in-cypress-tests-runonly.png)

Again, it really doesn't matter what those values are. What we need to do is, we need to get this `Request URL`, and we're going to mock that out.

![This URL](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907827/transcript-images/egghead-simulate-http-errors-in-cypress-tests-url.png)

The first thing we're going to do is we'll say `cy.server`. We're indicating to Cypress that we want to start up a mock server.

```javascript
it.only(`should show an error message if there's an error registering`, () => {
  cy.server()

  cy.visit('/register')
    .getByText(/submit/i)
    .click()
    .getByText(/error.*try again/i)
})
```

Then for that mock server, we're going to specify a `cy.route`. The method here is a post method. We'll say `method` is `'POST'`. The `url` is what I just copied, that register URL. Then we can specify what we want the `status` code response to be.

We'll say `status: 500`, we'll just give it a `response` of whatever we actually want that response to be. We can just leave it blank, because the way that our code is written, it doesn't really matter what the response is.

```javascript
it.only(`should show an error message if there's an error registering`, () => {
  cy.server()
  cy.route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
   })
  cy.visit('/register')
    .getByText(/submit/i)
    .click()
    .getByText(/error.*try again/i)
})
```

That's sufficient for us. Let's go ahead and save this, and we'll see what happens now. We see the browser does actually make that request, but Cypress is intercepting it, so that it can return a `500` internal server error. In our code, we're handling that by saying, "There was an error. Please try again."

![Cypress intercepting](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907824/transcript-images/egghead-simulate-http-errors-in-cypress-tests-cy-intercept.png)

As far as our application is concerned, it really did make that `500` request, but as you can see here, `XHR STUB` is what it's showing. That's because that post to the register URL was stubbed out, and it returned a status of 500 because of our mock.

![XHR Stub](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907824/transcript-images/egghead-simulate-http-errors-in-cypress-tests-xhr-stub.png)

Then our application correctly showed, `There was an error. Please try again.` Our test was successful. In review, to mock out an HTTP call in your client application, you create a Cypress `.server`. Then you supply a Cypress `.route` with the `method` and `url`, and this can be a regex For us, it worked to be just a full string. Then you can specify the `status` and `response` that you want to have, rather than actually hitting the back-end server.

```javascript
it.only(`should show an error message if there's an error registering`, () => {
  cy.server()
  cy.route({
      method: 'POST',
      url: 'http://localhost:3000/register',
      status: 500,
      response: {},
   })
  cy.visit('/register')
    .getByText(/submit/i)
    .click()
    .getByText(/error.*try again/i)
})
```
