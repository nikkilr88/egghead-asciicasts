With Cypress installed, let's go ahead and we'll delete this `examples` directory that they generated for us. Then, I'll go ahead and go into our `fixtures`. I'm going to just leave this example, like it is or just empty it out like that.

I'm going to add a new file in here called `calculator.js`. This is where we're going to test out our calculator. Cypress uses a mocha like framework for its testing. We have a `describe` block. Here, we'll just say `anonymous calculator`.

```javascript
describe('anonymous calculator', () => {
})
```

The experience of using the calculator without having logged in. We'll say `it` `can make calculations`.

```javascript
describe('anonymous calculator', () => {
     it('can make calculations', () => {
     })
})
```

Let's go ahead and we'll save this as it is. We'll start up Cypress. Run `npx cypress open`. That will start up the Cypress app.

![Cypress App](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907829/transcript-images/egghead-write-the-first-cypress-test-cypress-app.png)

If I click on the `calculator.js` file, it will open up Cypress. Here, we'd see our test. No commands are issued during this test, but the test did pass.

![Open Calculator](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907802/transcript-images/egghead-write-the-first-cypress-test-open-calculator.png)

We can make this test fail by throwing an error, so we could say `throw new Error('fail')`.

We save that and Cypress will automatically rerun and it will fail the test.

![Failed Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907807/transcript-images/egghead-write-the-first-cypress-test-fail.png)

Let's go ahead and start up our application now. I'm going to just open a new window here. Here, we'll run `npm run dev` to start our node server back end and our webpack-dev-server front end, which will start on [http://localhost:8080](http://localhost:8080).

Now if I just open up a new tab here, we'll go [http://localhost:8080](http://localhost:8080). We'll see our calculator right here.

![Calculator App](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907805/transcript-images/egghead-write-the-first-cypress-test-calculator-app.png)

Perfect. We need to make Cypress, the little browser in here. Go to our calculator app. Here it says, "Start your app server."

We did that. Now, we need to do a `cy.visit()` to our app. We can begin writing our test. Let's do that.

We'll say `cy.visit('http://localhost:8080')`.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
  })
})
```

I'll save that and reruns pretty quick, but it visits [http://localhost:8080](http://localhost:8080). Now, we're in our app.

![App Running](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907803/transcript-images/egghead-write-the-first-cypress-test-app-running.png)

Let's say we wanted to do `1 + 2`, and `=`, and verify that `3` shows up. Just to verify that this thing actually can add two numbers together.

How do we make Cypress click on the `1`, then `+`, then `2`, then `=`, then verify that this has `3`? What we can use this selector playground to go and select the DOM node that we want to click.

![Selector Playground](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907804/transcript-images/egghead-write-the-first-cypress-test-selector-playground.png)

Here, it will show us a selector that will match that DOM node. The selectors are not my favorite, because we're using CSS modules. This class name is not very great, but we can look at a way to improve this later.

I'm going to go ahead and copy this in your CSS `cy.get` and the string here, so that's exactly what we can do in our code here.

Cy's commands are trainable, so we could do `cy.get` and paste it right in there, or we can just do `.get` and we can just chain things on in this way.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
```

Once we've gotten that, then we can `.click()`. Cypress will apply this command to the subject of Cypress. When we do a command like `get`, and there are various other commands that changes the subjects of the chain.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
```

When we execute the `click` command, it will execute on the most recent subject. If I save this, and going here, we're going to see that, we first visit, then we get that node. Then, we `click` on that button. You can see right here it's showing us a DOM snapshot, a before and after.

![Before & After](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907803/transcript-images/egghead-write-the-first-cypress-test-before-after.png)

Before, the number is still `0`, and after, the number is `1`, and `AC` turns to `C`. We could add some assertions to make sure that's exactly what's happening, but let's continue on.

Now, we need to change the subject to this number `2`. So we can click on it. I'm going to go ahead and we'll open this up again. I'll click on that. I'll copy this. We'll say `.get`. That changes the subject. Now, we can `.click`.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('http://localhost:8080')
      .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
      .click()
      .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
      .click()
```

If I save this, let's refresh this and try that again. There we go.

Oh oops. We actually don't want to click on that. We want to click on the `+` first. Let's go ahead and we'll select the `+`. I'll get that. Turn off the playground. We'll do `.get` here first and `.click` on that.

If we refresh this, we can watch it saying `1 + 2`. Now, we got a click on this `=`. Let's do this again. We'll copy this. We'll say `get`, which changes the subject to that `=` sign and click on that `=` sign.

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
```

Cool. Now, we got `3`.

![Have three](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907816/transcript-images/egghead-write-the-first-cypress-test-have-3.png)

Now, we got to verify that this actually does say `3`, so we'll select this. We got a class there. We'll say `get`. And now we have made the subject the total amount displayed here. Now, we can make an assertion.

We'll say `.should('have.text', '3')`.

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

That assertion works. I can fail that assertion with saying it should equal `4`.

It'll wait for four seconds to see if maybe the app is going to update it to `4` eventually. After four seconds, it will say no.

![Assertion Failed](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907819/transcript-images/egghead-write-the-first-cypress-test-assertion-failed.png)

I think the app is settled, and that number is not going to change to `4`. Let's change this back to `3`. We have our first test running.

In review, the way that we made this work is we started out by describing a series of test that we're going to be making, so what that calculator does when there is an anonymous user.

Then, we have a specific test case. It can make calculations. At the very first, we visit our application which we do have to have running on port `8080`. First, we get the `1` and we `click` on that. Then, we get the `+` and we `click` on that. We get the `2`, we `click` on that. We get `=`, `click` on that.

Then, we get the display. We verify that it `should`` have text` of `3`. The way that I'd like to think about this `cy` object is I almost would rather call it a user, and we can say `const user = cy`, because I think of this as a user being instructed on what things to do.

We write out our commands. Then, the `user` goes to execute them. None of this is happening synchronously. The user can't do two things at once or can't do two things in quick succession. Everything in cy's world is happening asynchronously.

It's not actually clicking on an element when you call `.click`. You're just queuing this command up in the list of actions that you want the user or Cypress to execute.

That's an important distinction to remember when you're using Cypress is that, each one of these commands that you're telling Cypress to do are going to happen in the future and are not happening right now. Just think of these as a list of commands that you're giving to a user to manually test your application.
