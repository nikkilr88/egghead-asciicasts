In our application, we have this little register link that we can use to register as a user. I'll say, `ABC` and a password, `123` I'll submit that.

![Login Box](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907822/transcript-images/egghead-use-cypress-to-test-user-registration-loginbox.png)

Now I have this logout button I can click on to log out of the application.

![Logout Button](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907809/transcript-images/egghead-use-cypress-to-test-user-registration-logout.png)

There is also some local storage set in my application here. If I go to `Local Storage`, I get my `token` right there in my local storage so that if I refresh the application as the user, I am still logged into the app.

![Local Storage](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907820/transcript-images/egghead-use-cypress-to-test-user-registration-localstorage.png)

When I log in, I'm redirected to this home page.

Let's go ahead and test this entire experience with Cypress. I'm going to create a new file in this `e2e` directory called `register.js`. Here I'll `describe` `registration`. I'll say, `It should register a new user`

#### register.js
```javascript
describe('registration', () => {
  it('should register a new user', () => {

  })
})
```

Then we'll go ahead and create a `user` object here with a `username` of `blah` and a `password` of `Yo`.

```javascript
describe('registration', () => {
  it('should register a new user', () => {
      const user ={username: 'blah', password: 'yo'}
  })
})
```

Actually, that's not going to work very well. If we run this test more than one time, we're going to have a problem where we're registering a `user` that actually already exists. We're going to need to generate this information.

I'm going to go ahead and in this `support` directory, I'm going to make a `generate.js` file. Here we're going to `import {build, fake} from 'test-data-bot'`, which we already have installed in this project.

#### generate.js
```javascript
import {build, fake} from 'test-data-bot'
```

I'm going to make a `userBuilder`. We'll `build('User')`. That'll have `.fields` of `username`, which will be `fake`, using `f.internet.userName()`. `password` will be  `fake(f => f.internet.password())`.

Then we'll go ahead and `export {userBuilder}`.

#### generate.js
```javascript
import {build, fake} from 'test-data-bot'

const userBuilder = build('User').fields({
  username: fake(f => f.internet.userName()),
  password: fake(f => f.internet.password()),
})

export {userBuilder}
```

With that, let's go ahead and `import {userBuilder} from '../support/generate'`.

#### register.js
```javascript
import {userBuilder} from '../support/generate'
```

Cool. Now this user can be unique every single time we run this `userBuilder`. Then we'll do `cy.visit('/')`.

```javascript
import {userBuilder} from '../support/generate'

describe('registration', () => {
  it('should register a new user', () => {
    const user = userBuilder()
    cy.visit('/')
  })
})
```

Then the first thing that we're going to want to do is we'll click on this register link.

![Register Link](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907818/transcript-images/egghead-use-cypress-to-test-user-registration-register.png)

We'll say, `getByText(/register/i)` We'll ignore case there. Case doesn't matter. We'll `click` on it.

```javascript
   cy.visit('/')
      .getByText(/register/i)
      .click()
```

Go ahead and do that. We'll `getByLabelText(/username/)`.

We want to `type` the value from `user.username`.

```javascript
    cy.visit('/')
      .getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
```

Then we'll `getByLabelText(/password/i)`. We'll `type` the `user.password`.

```javascript
    cy.visit('/')
      .getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
```

Then we'll `getByText(/submit/i)`. We've got that submit button. We'll go ahead and `click` on that.

```javascript
    cy.visit('/')
      .getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
```

Then we want to make some assertions. I'm going to change the subject to our `url`. We can make an assumption that it `should` equal, `'http://localhost:8080'`.

```javascript
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
      .should('eq', `http://localhost:8080`)
```

Then we'll switch our subject to `window`, so we can verify that `.its('localStorage.token')` value `.should('be.a', 'string')`.

```javascript
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
```

We don't really need to worry about verifying what the `token` actually is. I will be pretty satisfied that there's just a `token` in there that's a string. Let's go ahead and save that.

We'll go back to our test. We have this new `register.js` file.

![New Register File](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907820/transcript-images/egghead-use-cypress-to-test-user-registration-new-register.png)

Let's run this one instead. It'll pull open Chrome. It'll run through our test. It runs pretty quick. Let's watch that again. Every time, that `user` is going to be unique.

![Unique User](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907817/transcript-images/egghead-use-cypress-to-test-user-registration-unique-user.png)

Let's go ahead and refactor some of this stuff. We can actually get rid of all of this by doing Cypress.config. This will get all of our config `baseUrl`. Then we'll add the slash at the end there.

```javascript
.url()
.should('eq', `${Cypress.config().baseUrl}/`)
```

Now if we make changes to our `baseUrl`, we don't have to update this test, which is great. Everything else, I feel pretty good about.

#### register.js
```js
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
  })
})
```

In review, what we had to do here is we created this `generate.js` file that can generate us a `user` that has a `username` and a `password`. Then, in `register.js`, we use that to create a `user`.

#### generate.js
```js
import {build, fake} from 'test-data-bot'

const userBuilder = build('User').fields({
  username: fake(f => f.internet.userName()),
  password: fake(f => f.internet.password()),
})

export {userBuilder}
```

Then we visit our app. We `click` on `register`. We fill in the `username`, fill in the `password`. We `click` on the `submit` button. Then we verify that the `url` is our home route and that the window's `localStorage.token` is a `string` value.

I should add that if your app requires email validation when a new user registers, that it would probably be a good idea to mock that with some sort of service so that you can circumvent the email process. That would be a pretty hard thing to actually test and not provide as much value for you. It's definitely worth mocking for that scenario.