Instructor: 00:01 There's one feature about my app that I definitely want to test and that is the register link. If I click on that then I can fill out a username of ABC and then a password of 123. I hit submit and that takes me to the app again except now I had this logout button. Then when I click on that I can log out and then login again.

00:17 Let's go ahead and test this registration process. I'm going to add a new file in `e2e` called `register.js` and here I'm going to `describe` registration and then we'll have a test called `it` should register a new user and with this we're going to need a user object so we'll say username is Bob and password is yoh.

#### register.js
```js
describe('registration', () => {
  it('should register a new user', () => {
    const user = {username: 'bob', password: 'yo'}
  })
})
```

00:37 Except that's not going to work very well because every single time I run the test, I'm going to try and register a new user with the username of Bob and that's not going to work because we'll already have a user in the database. Now, clearing out your database between tests is a good thing to do, but sometimes you can't do that. There's a really easy way to avoid this problem altogether.

00:55 What we're going to do is in my `support` directory, and I create a new file called `generate.js`. I'm going to `import {build, fake} from 'test-data-bot'`, which I already have installed, and then we're going to make a `buildUser` function from build user. I give that label.

01:12 The fields for our user will include a `username`, which is a `fake` username using faker to get an Internet username. Then we'll have a `password` with `fake` faker fake Internet password, and then we'll `export` that `buildUser`.

#### generate.js
```js
import {build, fake} from 'test-data-bot'

const buildUser = build('User').fields({
  username: fake(f => f.internet.userName()),
  password: fake(f => f.internet.password()),
})

export {buildUser}
```

01:29 Cool. Now, I can now go back over to `register.js` and will `import {buildUser} from '../support/generate'`. With that now, instead of hand-coding a user, we'll just call our `buildUser` in our function, and then we'll start out our test. We'll say `cy.visit` the app and we'll save this.

#### register.js
```js
describe('registration', () => {
  it('should register a new user', () => {
    const user = buildUser()

    cy.visit('/')
  })
})
```

01:45 Now we can see our tests are running, and we have this should register a new user and we visit the app.

![tests are running](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-test-user-registration-with-cypress-tests-are-running.png)

Now, we want to click on register and we'll fill out the username, password, and then click on submit.

01:55 Back in `register.js`, we will `findByText`, `register`. Case doesn't matter, so I'll do that. I flag for our rejects, we'll `click` on that and we'll `findByLabelText`, `username`, case doesn't matter there, and we'll `type` in the `user.username`. Then we'll `findByLabelText` here.

02:12 For the `password`, ignore case there, and `type` the `user.password`. Then we'll `findByText`, `submit`, and we'll `click` on that submit button.

```js
import {buildUser} from '../support/generate'

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
  })
})
```

Let's go ahead and save that and see our test run and it does!

02:25 What are the assertions that we want to make here? When we register a new user, if we open up our Dev tools, go to application, and then click on local storage, we notice that we have a token in here, so we want to verify that token exists, and we also want to verify that we get redirected to the home screen.

02:40 What we need to do is change our subject to the URL so we can make an assertion on that. We'll say `.url()` and all that does is it changes the change subject for cypress to the URL. We can make an assertion that it `should`, `'eq', 'http://localhost:8080/'`.

02:57 Then we want to get the localStorage value for token. We're going to change the subject to `window()` and we'll say it's `localStorage.token` value `should` be a string.

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
      .should('eq', `http://localhost:8080`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
  })
})
```

Save that, come back here, and we get our test running and everything's passing.

03:17 I'm satisfied to know that the localStorage value is a string, especially since your test will typically continue doing things that only authenticated users would be able to do. This assertion is enough for me because if the localStorage token is not a string, then I'll get an early error. If it doesn't work at all, then I'll know that I have a problem with my authentication.

03:35 One other thing that I want to change here is I don't like hard coding this value, `'http://localhost:8080'`, so I'm going to get rid of this. We'll do `Cypress.config().baseUrl`, we'll end that with a slash and that assertion looks a little bit cleaner.

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
      .should('eq', `${Cypress.config().baseUtl}/`)
      .window()
      .its('localStorage.token')
      .should('be.a', 'string')
  })
})
```

We don't have to hard code that baseUrl everywhere.

03:49 In review, what we did here was we created a generate file to generate us a user. Then we created a register file, so we can have a test of the registration process. We created a new user. Then we visited the app, clicked on the registration link, filled in the username and password, clicked on submit, and then verified that the URL changed to the home URL and that the window localStorage token is a string.

04:12 One thing that I want to add here is that if your registration process sends out an email and then user can't do anything until they've confirmed their email address, it's a good idea to just mark that service out entirely for your test. Writing an automated test for something like that would be very non-trivial and would only give you a little bit extra confidence.

04:29 I'd recommend marking that out so that your end-to-end test can continue on without having to worry about that email. As with everything else, testing is just a bucket of tradeoffs and you can make the tradeoffs that you feel comfortable with.
