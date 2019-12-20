Instructor: 00:01 Now we actually want to test our application. We don't really care about this example thing. I am going to get rid of that. In it's place, I am going to create a new file called `calculator.js`. The Cypress testing framework is very similar to MOCA.

00:13 We can use `describe` blocks, and we'll say anonymous calculator. We'll make an `it` block. We can say it `'can make calculations'`. We'll just save it like it is right here.

#### integration/calculator.js
```js
describe('anonymous calculator;', () => {
  it('can make calculations', () => {})
})
```

Now let's go ahead and `npx Cypress open` to get our Cypress app running.

#### terminal
```bash
npx cypress open
```

00:32 With that, now we have our one calculator test. We click run all aspects. That's going to get Cypress running. It's working great.

![first cypress test running](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727278/transcript-images/cypress-write-the-first-cypress-test-first-cypress-test.png)

What we need to do is get our application started. I am going to open another terminal.

00:44 We'll run `npm run dev` to start our dev script, which fires up Webpack on port 8080.

```bash
npm run dev
```

If we open up a new tab, go to `localhost:8080`, that takes me to our app. We just need to make our app inside of Cypress go to that URL.

01:00 We'll follow the instructions right here on the web page. Start your app server. Step one, done. `cy.visit` to get to our app and then begin writing our test. Let's do that. In `calculator.js`, go `cy.visit` and that's `http://localhost:8080`. Refresh, and it gets right to our app really quick.

#### integration/calculator.js
```js
describe('anonymous calculator;', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
  })
})
```

01:17 Great. Now we want to start writing some test and lets say we wanted to click one and then click on plus and then click on two and then click on equals and verify that it does in fact say three.

01:27 To do this, lets click on the open select your playground and we'll click on the number 1.

![open selector playground](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727278/transcript-images/cypress-write-the-first-cypress-test-open-selector-playground.png)

That gives us the selector that doesn't look all that great, but it does match our one and we can improve this later.

01:38 The reason it looks so funny is because we're using CSS modules for this and that makes up some pretty weird CSS selectors. I'm going to in and copy that. We'll use `cy.get`. We'll put that in there and that's going to get us that button.

```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
    cy.get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
  })
})
```

01:52 These commands are actually chainable so I can get rid of the `cy` and we'll chain these.

```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
  })
})
```

We'll just format it nicely like this. With that now, out tests run pretty quick but it shows us getting that node. Now, we want to click on that. We're going to do `.click` and that will get us clicking on that note.

```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
  })
})
```

02:09 Now, we can see the 1 being displayed on the calculator. What do we want to click on next? Let's use the playground selector again. We want to click on the plus. We'll copy that, come down here and do another `get` to get the plus.

02:20 We'll `click` on that.


```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
  })
})
```

Let's go ahead and we'll save that and we'll see that's going on right here. Then we want to click on the `2`. I'll do the two right here. We'll copy that. Do a `.get` and then another `click`.

```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)')
      .click()
  })
})
```

Save that. The test run pretty quick. Perfect.

02:38 Now, we want to click on the equal sign, so we'll click on that, copy that and do a `get` to switch our subject to that and `click` on that element.

```js
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
  })
})
```

There we go. Now we've got a three displayed on our calculator, so let's verify the three is actually showing three. This display text will say `.get` that number 3 node.

02:55 With that, we want to make an assertion so if you're familiar with the try assertion library, that's baked into Cypress but it's backed in in a little bit of an interesting way because of the asynchronous nature of Cypress. We'll say `.should('have.text', '3')`.

```js
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

We'll save that. Our test runs pretty quick.

03:11 If we go back and change the 3 to 4, we can verify that our test does pass. It does actually wait for four seconds before it decides, "OK. I waited for a little while and that three has not changed to four yet, so I'm going to just guess that it's not ever going to change to four so we'll just say that this failed."

03:27 Let's go ahead and fix that back to three, our test runs and it's passing. With each subsequent command that we're issuing to Cypress, we're changing the subject of Cypress. Because Cypress is all chainable like this, it maintains a subject. Certain commands like `get` will change that subject to DOM nodes. There are commands that operate on the subject like this `click` or like an assertion command.

03:50 Each one of these commands are executed asynchronously. That means that it's not running visit, and then get, and then click, and then get and then click again rapidly one right after the other. Actually, each one of these commands is running asynchronously.

04:03 It is running pretty quick and we can watch it run all of those pretty quick, but it's still not happening in rapid succession because each one of these commands are going to be running asynchronously. That's intentional because we want to simulate a user using our application.

04:15 That's why sometimes, I like to call `cy` -> `user` and then we say, "User, I want you to visit that thing and then user, I want to get that and then user, I want to click on that." The way that I see these commands is more of a list of instructions that I'm going to give to a user, rather than to a to the Cypress robot.

```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    const user = cy
    user.visit('http://localhost:8080')
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


04:33 That's the way that you should be thinking about your test. Think about these commands as instructions that you're giving to a manual tester.

04:39 In review for this one, we created a `describe` block for anonymous calculator. We created an `it` block for specific test indicating that this app can make calculations. We visited the app and then we got each one of the buttons, clicked on them and asserted that our calculator can add those numbers together.
