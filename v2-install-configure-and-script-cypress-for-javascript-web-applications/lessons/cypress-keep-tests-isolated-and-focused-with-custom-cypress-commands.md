Instructor: 00:01 I can foresee a bunch of my test needing to do this user creation request. I'm going to make a custom Cypress command that will do all this for me. I'm going to go into my `support/commands.js` right here and I'm going to make my own custom Cypress command.

00:13 We'll say `Cypress.Commands.add`, and we'll call this custom command `'createUser'`. This will be an arrow function that executes the Cypress commands that I want. I'm going to come back to `login.js`, I'll grab all the stuff from our `import` through the `cy.request`, put it in `commands.js`. That import will need to be up here at the top. We'll get rid of this stuff and save that.

#### commands.js
```js
import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', () => {
  const user = buildUser()
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  })
})
```

00:31 Now, Cypress has this new command called `createUser`, which automatically will build a user and hit the registration endpoint to create that new user.

00:38 Another thing that we can do here is take an argument for this command -- and I'm going to call that `overrides` -- then we'll pass those `overrides` in `user` in case somebody wanted to customize the username for example.

```js
Cypress.Commands.add('createUser', overrides => {
  const user = buildUser(overrides)
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  })
})
```

00:49 Then we'll come back in `login.js` and we'll get rid of this `buildUser`, we'll get rid of all this `create user` stuff and now we'll say `cy.createUser`, and then we'll have a user created already for us. 

#### login.js
```js
it('should login an existing user', () => {
  cy.createUser()
  cy.visit('/')
  ...
})
```

Where are we going to get this `user` from?

01:00 We can make our custom command `createUser` yield a subject so we can get access to that subject by using `.then`. We'll get that user and then we'll put all of the stuff inside of that arrow function there, so you have access to the user that's been created for us.

```js
describe('login', () => {
  it('should login an existing user', () => {
    cy.createUser().then(user => {
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
})
```

01:14 Let's go ahead and make that magic happen back in `commands.js` by using `then`, taking the response that the server gives back to us. We're going to combine the properties from `response.body.user` with the `user` that we've generated here. 

#### commands.js
```js
import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', overrides => {
  const user = buildUser(overrides)
  cy.request({
    url: 'http://localhost:3000/register',
    method: 'POST',
    body: user,
  }).then(response => ({...response.body.user, ...user}))
})
```

We'll save that, and our test rerun, and everything's working great.

01:33 Now, everywhere we need a new user, we can just use this `createUser`, and it can create an optimized user for us. Then we can access that user as a subject result of that command and execute our test inside of there.

01:44 The really key point here is that your custom command can change the subject of the Cypress chain by executing a .then as the last thing that it does. In our case, we're using the subject that request gives us, which is a response that we're getting from the server.

01:58 We are taking the body of that response, the user property of that body, and combining that with the user that we built here so you have access to things like the user's password.