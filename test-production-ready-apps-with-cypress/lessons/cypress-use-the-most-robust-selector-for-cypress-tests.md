In this lesson, we're going to discuss best practices for using selectors. The selectors we used in the previous example are actually fairly brittle.

First, because they are dependent on their implementation. If we change the implementation of to-do items from something other than a list item to anything else, we would break our task.

Second, it's because they're coupled to CSS selectors which are traditionally used for styling and could reasonably be changed at any time.

Third, these are coupled to their specific location in the DOM. First, we know that the list item must be the child of a to-do list in order to be selected, and then it also must be a specific nth-child.

We want to be declarative about what we're selecting and that the selection is being used for testing so that if we change the underlying implementation of any of these objects, we won't break our task inadvertently.

If we open up `src/components/Todoitem.js`, we can add a `data-cy` attribute. data-cy is exclusively used for testing. We can communicate to our teammates that we intended to be used in a task.

By using the unique `id` of the todo, we can guarantee that this will have a unique `data-cy` attribute and that it will be easy for us to target regardless of where it is in the DOM or what its implementation is.

### todoitem.js
```js
return (
  <li data-cy={`todo-item-${todo.id}`} className={classnames({
    completed: todo.completed,
    editing: this.state.editing
  })}>
    {element}
  </li>
```

If we visit Cypress, we can click on this little target to the left of the search bar, to open the selector playground. 

![image of the cypress selector tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626682/transcript-images/05_cypress-use-the-most-robust-selector-for-cypress-tests-selector.jpg)

The selector playground will make recommendations as to the best way to target each element. For instance, if we want to target an item, we can click on it and see that it recommends the data-cy todo item-3, `[data-cy=todo-item-3] > .view > label`.

The selector playground isn't perfect. Because there're so many html elements on the page, we may not be able to target the exact element we want. In this instance, we see that we're targeting the label and not the higher level to-do item.

We still have to use some commonsense, know our html structure, and couple that with Cypress's recommendations in order to target the correct item in the most effective way.

If we return to our code, we know that the best way to target this now is to use `('[data-cy=todo-item-3]')`. If we save this, we can reopen Cypress and see that it's still targeted.

We can do the same thing on line 11 with `('[data-cy=todo-item-4]')`. If for some reason you're unable to use the data-cy attribute, the next best option is to use `contains` which looks for specific text on the page and targets it.

In this case, we'll target `'Hello world'`. 

### todos.spec.js
```bash
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.get('Hello world')
          .should('have.text', 'Hello world')
          .should('not.have.class', 'completed')
          .find('.toggle')
          .should('not.be.checked')

        cy.get('[data-cy=todo-item-4]')
          .should('have.text', 'Goodnight moon')
          .should('have.class', 'completed')
          .find('.toggle')
          .should('be.checked')
    })
})
```

When we return the Cypress, we'll see that we have in fact targeted an element containing the text Hello World. 

![image of the targeted Hello World](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626689/transcript-images/05_cypress-use-the-most-robust-selector-for-cypress-tests-hello.jpg)

Although if we take this approach, we really have to be careful and pay attention to what we've actually selected.

In this situation, we see that we selected the label, and not the overarching list item. This works when we're checking for the text Hello World but the list item, not the label, is what's able to have the class completed or not have it.

In our second assertion, we're actually looking at a false positive. Finally, when we try to find the toggle, which would be a child of the list item but isn't a child of the label, we discover that we found nothing.

When we run the assertion not to be checked or nothing, that's also a false p ositive. We can check array methods to navigate our DOM tree and find the specific element we want. We can see pretty quickly why it's much better to use a unique data-cy attribute than anything else.
