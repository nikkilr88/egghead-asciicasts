In our Cypress test here, we call `cy.visit`. We have to give the full URL for our application.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)')
      .click()
      .get('.mNQM6vIr72uG0YPP56ow5')
      .should('have.text', '3')
  })
})
```

I don't really like that a whole lot. This actually causes another problem. If I pop open this, you'll notice that this is going to refresh.

It loads the application and then it refreshes. That's because when Cypress realizes that this is where we're going to go, it has to refresh so that it goes to that same place as well. This is a technical limitation of Cypress. It's pretty easy to overcome.

Let's go ahead and solve both problems. I want to go to `/`, to the root of my application in my test.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
```

In my `cypress.json` is where I'm going to configure where the `baseUrl` for my application is. I'll say, `baseUrl` That'll be `http://localhost:8080`.

#### cypress.json
```javascript
{
  "baseUrl": "http://localhost:8080"
}
```

With that, Cypress will actually reload because we've changed the configuration. It'll close down Chrome, reload the app. Now our configuration has a `baseUrl` which has been set from the config file.

![Base URL](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907825/transcript-images/egghead-configure-cypress-in-cypress-json-base-url.png)

There's also an `env` file which you can use to configure Cypress. You can use environment variables, `CLI` arguments, when we open up Cypress in the first place, as well as a `plugin` file. We're going to use this `cypress.json`.

Let's go to our test now and open up the calculator. You'll notice it does not refresh this time. It starts a bit quicker. We also don't have to give the full URL for when we issue a visit command.

![Reopen Application](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907805/transcript-images/egghead-configure-cypress-in-cypress-json-reopen.png)

The next thing that I want to configure with Cypress is I'm not a huge fan of this `integration` folder. I'd much rather communicate that the tests inside of here are end-to-end tests. I'll do my integration tests with react-testing-library and Jest.

I'm going to rename this to `e2e`, for end-to-end. Here I'm going to set my `integrationFolder` to `cypress/e2e`.

#### e2e/cypress.json
```javascript
{
  "baseUrl": "http://localhost:8080",
  "integrationFolder": "cypress/e2e"
}
```

With that, it's going to reload everything. Our tests still work just fine.

The last thing that I want to configure is the viewport. You'll notice the default is 1000x660. Cypress will make sure that our viewport stays the same. It'll just scale down depending on the width of our window so we don't break any tests by changing the size of this window.

![Scaled Down](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907823/transcript-images/egghead-configure-cypress-in-cypress-json-scaled-down.png)

For my test, I want to change that default viewport. Let's go ahead and we'll set the `viewportHeight` to `900` and the `viewportWidth` to `400`.

```javascript
{
  "baseUrl": "http://localhost:8080",
  "integrationFolder": "cypress/e2e",
  "viewportHeight": 900,
  "viewportWidth": 400
}
```

It'll reset everything. I can open it up again. Now it's the viewport that I want.

![Larger Viewport](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907819/transcript-images/egghead-configure-cypress-in-cypress-json-larger-viewport.png)

In review, what we did here is we set the `baseUrl` in our `cypress.json` so that we didn't have to provide the full URL when we issue a visit command. Cypress knows ahead of time which URL it should be loading when it starts up.

Then we moved this test to an `e2e` folder, rather than an integration folder, to communicate more clearly what kinds of tests should live in here. We configured that with `integrationFolder`.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)')
      .click()
      .get('.mNQM6vIr72uG0YPP56ow5')
      .should('have.text', '3')
  })
})
```

Then we set the `viewportHeight` and `viewportWidth`, so it can match more accurately the type of experience that we're trying to build with this application.

#### cypress.json
```javascript
{
  "baseUrl": "http://localhost:8080",
  "integrationFolder": "cypress/e2e",
  "viewportHeight": 900,
  "viewportWidth": 400
}
```
