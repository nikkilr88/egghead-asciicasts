In this lesson, we're going to write our very first Cypress test. As usual, let's check out the branch associated with the lesson.

### terminal
```bash
$ git checkout -b 03-first-integration-test
```

Up until now, we've been looking at the examples that were generated automatically when we first ran Cypress. Let's go ahead and blow this away and create our very first integration test. We can call it `todos.spec.js`.

We can see in our Cypress runner that `todos.spec.js` is created here. If we click on it, it will find no task in the file. 

![image of the no test found ](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626652/transcript-images/04_cypress-write-your-first-cypress-integration-test-no-test.jpg)

Let's go ahead and write one.

We'll start with a `describe` block and describe our todo application. Inside that, we can create an `it` statement. We can say `it('loads the page'`. Now we'll just visit it. Let's `cy.visit` at the root of our application. When we visit the page, we'll see that Cypress loads our todo app.

### todos.spec.js
```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')
```

`describe` and `it` are provided by the Mocha testing framework, which you can tell if you hover over them with your IntelliSense. Cypress itself is build upon a lot of existing best practice libraries like Mocha and jQuery. You will be familiar with some of the nuts and bolts.

Let's learn how to use our `cy` commands. We've already seen how to use `cy.visit`. The next thing we'll learn is `cy.get`. Let's get the first item in our todo list. `cy.get`, we pass in the selector `.todo-list` which wraps all of our todos.

We implemented todo items as list items, and we can use `nth-child(1)` to select the first one. For assertions, Cypress includes the child library. If you're familiar, you can use s`.should('have.text', 'Hello world')`.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Hello world')
```

If we head back into Cypress, we can see that task already ran and that it passed. We can step through each moment and time.

![image of the passed test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626683/transcript-images/04_cypress-write-your-first-cypress-integration-test-passed-test.jpg)

For instance, when we first visited the page, after we received our XHR request to the backend to load all our todos, when we targeted this first list item, and we can see what was targeted here on the screen, and then we can see our assertion which targeted this list item and expected it to have the text Hello World.

If we want more contextual information, we can pop open our console and see a little bit more. We can see, for instance, the command was asserted. We expected the text Hello World. That's what we got. We can see our subject, which was this jQuery selector of the list item.

![image of the contextual information in the console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626684/transcript-images/04_cypress-write-your-first-cypress-integration-test-console.jpg)

We should also probably check that the testing just passed because of a fluke. Let's go ahead and change this to Hello Mars and reopen Cypress. 

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Hello Mars')
```

We'll see here that the assertion hangs a lot longer this time. The reason it does that is because it's waiting for the text Hello World to change into `Hello Mars`.

![image of the failed test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626660/transcript-images/04_cypress-write-your-first-cypress-integration-test-failed-test.jpg)

This is part of what makes Cypress so reliable. You don't have to write any code, sleeps or waits until an appropriate moment when the repan has happened. Cypress handles all of that for you.

Let's go ahead and undo that. We'll keep chaining some more `should`'s off of this to see how that works. Let's say it should not have the CSS class completed, `'not.have.class', 'completed'`, because we haven't yet completed our todo. 

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
```

Back in Cypress, we see the chaining like this works. Both assertions ran one after the other, and both passed.

![image of the chaining working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626670/transcript-images/04_cypress-write-your-first-cypress-integration-test-passed-chaining-test.jpg)

Cypress also bundles jQuery. We can use the jQuery method `find` or similar methods to navigate our UI. For instance, we can find the `toggle`, which is a child of this list item, and then we can say that it `.should('not.be.checked')`.

```js 
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')
```

Back in Cypress, we can see the way this gets targeted. 

![image of the test targeting the toggle](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626690/transcript-images/04_cypress-write-your-first-cypress-integration-test-final-toggle-test.jpg)

For instance, first, targeting this first list item, and then we can see it targeting the toggle, and asserting not checked on that. It's important that we run this check on the toggle because a toggle has a check or not check attribute, but the list item does not.

To see this example in action, let's switch to the second list item which has the text, `Goodnight moon`. We know that this does have the class completed because we already completed the todo.

```js 
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Goodnight Moon')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')
```

What happens if we still say it should not be checked. Reopen Cypress. We expect the toggle not to be checked, and we see this fails. 

![image of the toggle test failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626666/transcript-images/04_cypress-write-your-first-cypress-integration-test-final-toggle-test-fail.jpg)

However, if we run this same assertion on the list item and not the toggle, the test will pass.

```js 
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Goodnight Moon')
          .should('not.have.class', 'completed')
          // .find('.toggle')
          .should('not.be.checked')
```

![image of the assertion on the list item passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626668/transcript-images/04_cypress-write-your-first-cypress-integration-test-final-list-test.jpg)

The reason is because the list item doesn't have a checked attribute in the first place, so of course, it's not checked. This is why it's important to double check that the inverse assertion of any assertion you make does in fact fail. Since we know the inverse fails in this case, we can retarget the toggle and make sure that `be.checked` passes. 

```js 
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('.todo-list li:nth-child(1)')
          .should('have.text', 'Goodnight Moon')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
```

Since it does, we know we've targeted the right element.

![image of the final successful test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626663/transcript-images/04_cypress-write-your-first-cypress-integration-test-final-passed-test.jpg)
