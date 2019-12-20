Instructor: 00:01 In our Cypress test here, we have to call sign up visit with this full URL, which I don't really like. I'd rather just say, "Go to my app with the slash route, the home route." Actually, by providing this whole URL like this, we have a bit of a problem when we start our test.

00:15 If we click on run all specs, you'll notice that it does a quick refresh and that's a technical limitation of Cypress because it doesn't know what URL this should be set to at the time that it loads. We can configure Cypress and tell us where our app is going to be hosted right from the get go, so it doesn't have to do that reloading.

00:31 In my `cypress.json` file, I'm going to configure that with a `baseUrl`. We'll set `http://localhost:8080`

#### cypress.json
```json
{
  "baseUrl": "http://localhost:8080"
}
```

Then we'll save that then go back to `calculator.js` and we can just do the slash in our root.

#### calculator.js
```js
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

It makes my test a little bit nicer and it makes it so I don't suffer from that refresh problem. I go back here, run all the specs and you'll notice the refresh doesn't happen here.

00:54 The next thing that I want to configure about Cypress is I'm not a huge fan of using `integration` as the name for the directory where all my tests go, because I prefer to write my integration tests with Jest and React Testing Library, and I like using Cypress for end-to-end tests.

01:07 To communicate that better, I'm going to rename `integration` to `e2e`, and then I'm going to come in here to Cypress so that it knows where to find my end-to-end tests. We'll say `integrationFolder` will be `cypress/e2e`.

#### cypress.json
```json
{
  "baseUrl": "http://localhost:8080",
  "integrationFolder": "cypress/e2e"
}
```

That will enable that improved folder name. I can go back to cypress now. I run all the specs, and everything continues to work.

01:26 The last thing that I want to do here is, you'll notice that our webpage is set to 1,000 by 600 is set by default for the resolution for the window size. If I resize my window, it actually keeps it right at that screen size, which is perfect.

01:39 It's not quite the experience that I'm trying to build with this app. I'm going to go ahead and configure that with `viewportHeight` set to `900` and `viewportWidth` set to `400`.

```json
{
  "baseUrl": "http://localhost:8080",
  "integrationFolder": "cypress/e2e",
  "viewportHeight": 900,
  "viewportWidth": 400
}
```

With that, Cypress will reload that configuration, and now it's looking perfect.

01:56 I'll go back to my tests here. You'll notice that we have the settings right here, and here we have our configuration.

![settings configuration](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727283/transcript-images/cypress-configure-cypress-in-cypress-json-settings-configuration.png)

It's going to show us all of our custom configuration and where it's coming from.

02:05 We can configure all of this stuff using the config file like were doing, or an ENV file, or ENV variables, or CLI arguments, or even a plugin file. For our use case, using the configuration file works just fine.

02:18 In review, what we did here was we wanted to move our tests to the e2e directory, so we set the integration folder to cypress/e2e. We wanted to avoid the refresh problem, so we set the base URL to localhost:8080, and now our site.visit can just reference routes of our app rather than the full URL.

02:35 Then we set the viewport height and width so that our app fits better in the Cypress browser.
