In this lesson, we're going to learn about wrapping external libraries in Cypress. Why might we want to do this? We can already see this is a more complex example. There's a lot more data.

For instance, we've run an assertion on our store, which has five todos in it. Maybe we only want to make an assertion against one of those.

When we look at our test, we can see that we've clearly had to assert too much. We've had to list out every single todo and all of its properties even though perhaps the only one we want to make an assertion on is this first one.

Of course, there are typical libraries we might try to use for this type of problem, like lodash. Let's see if we can use lodash `.filter`, passing in the todos from the store. We'll inspect each todo. If it has the ID of one, then we'll grab it. We hope this is just going to give us this first todo. Let's make sure we import `lodash`. 

### todos.spec.js
```js
const _ = require('lodash')

describe('Todo Application', () => {
  it('loads the page', function () {
    cy.server()
    // Alias the fixture data
    let todos = [
      {
        id: 1,
        text: '1st Todo',
        completed: false
      },
      {
        id: 2,
        text: '2nd Todo',
        completed: true
      },
      {
        id: 3,
        text: '3rd Todo',
        completed: false
      },
      {
        id: 4,
        text: '4th Todo',
        completed: true
      },
      {
        id: 5,
        text: '5th Todo',
        completed: false
      },
    ]
    ...
    
    // Access the fixture data this.todos
    _.fliter(cy.store('todos'), (todo) => { todo.id == 1}).should('deep.equal', [
        {
            id: 1,
            text: '1st Todo',
            completed: false
        },
        ...
    ])
```

Of course, we see that `lodash.filter.should` is not a function because we haven't integrated lodash into Cypress. 

![image of the error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626681/transcript-images/10_cypress-wrap-external-libraries-with-cypress-lodasherror.jpg)

Remember that Cypress is asynchronous. It produces its own command chain, so we'll pull off the filter from here and tag on a `.then`. Then we'll be past all the todos from the store. Then we can `.filter` them, passing in these `todos` and filtering out each individual todo in here. `return todo.id == 1`. Finally, we'll run our `.should`. 

```js
...
// Access the fixture data this.todos
cy.store('todos').then((todos) => {
    _.filter(todos, (todo) => { 
        return todo.id == 1
    }).should('deep.equal', [
    {
        id: 1,
        text: '1st Todo',
        completed: false
    },
    ...
])
```

We'll see that we filtered out only one todo. This is a ton of overhead just to filter our todos. 

![image of Cypress filtering out only one todo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626680/transcript-images/10_cypress-wrap-external-libraries-with-cypress-filterone.jpg)

Shouldn't we be able to incorporate filter into our Cypress command chain? 

```js
...
// Access the fixture data this.todos
cy.store('todos').filter((todo) => { 
    return todo.id == 1}
).should('deep.equal', [
    {
        id: 1,
        text: '1st Todo',
        completed: false
    },
    ...
])
```

The first thing we'll notice if we try this is that filter is already an existing Cypress command. 

![image of the error message for filter already being a Cypress command](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626693/transcript-images/10_cypress-wrap-external-libraries-with-cypress-error-existing.jpg)

Let's go ahead and rename this `lo_Filter`.

```js
...
// Access the fixture data this.todos
cy.store('todos').lo_filter((todo) => { return todo.id == 1}).should('deep.equal', [
    {
        id: 1,
        text: '1st Todo',
        completed: false
    },
    ...
])
```

Heading back into Cypress, we see that `lodashFilter` is not a function, which is what we want.

![image of the error message that lodash filter is not a function](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626675/transcript-images/10_cypress-wrap-external-libraries-with-cypress-error-notafunction.jpg)

We're ready to add one. Let's hop back into our custom commands file and require lodash. We're ready to add a new command, `Cypress.Commands.add('lo_filter')`. This time, we are adding a child command, which means that we have a `{prevSubject: true}`. Since we have a previous subject, the first argument will be `subject`. The second will be the function that we use to filter. Next, we'll `return _.filter`, passing in the subject and the function to filter with. 

### commands.js
```js
const _ = require('lodash')

Cypress.Commands.add("store", (str = '') => {
    let log = Cypress.log({ name: 'store' })

    const cb = (state) => {
        log.set({
            message: JSON.stringify(state),
            consoleProps: () => {
                return state
            }
        }).snapshot().end()

        return state
    }

    return cy.window({log: false}).then(function($w) { return $w.store.getState() }).then((state) => {
        if (str.length > 0) {
            return cy.wrap(state, {log: false}).its(str).then(cb)
        } else {
            return cy.wrap(state, {log: false}).then(cb)
        }
        
    })
})

Cypress.Commands.add('lo_filter', {prevSubject: true}, (subject, fn) => {
    return _.filter(subject, fn)

})
```

If we reopen Cypress, we'll see that we filtered out our subject.

![image of cypress with the subject filtered out](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626671/transcript-images/10_cypress-wrap-external-libraries-with-cypress-subjectfilter.jpg)

Remember we're going to want to log this. Let's go back and make this the `result`. We'll run `Cypress.log`, passing in the name `lo_Filter`. The message will be `JSON.stringify` the `result`. We'll probably want `consoleProps`. We'll `return result`. Finally, we'll `return result` from all of this.

```js
...
Cypress.Commands.add('lo_filter', {prevSubject: true}, (subject, fn) => {
    return _.filter(subject, fn)
    Cypress.log({
        name: 'lo_filter',
        message: JSON.stringify(result),
        consoleProps: () => { return result }
    })
    
    return results
})
```

Now, in Cypress, we can see the filter. We can go in the console to see what it looks like. 

![image of seeing the filter and what it looks like in console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626682/transcript-images/10_cypress-wrap-external-libraries-with-cypress-console.jpg)

What if we want to incorporate every lodash method into Cypress? What if we want to wrap the whole library?

Let's start by defining each of the lodash methods. We'll grab each of the function names from lodash. Then we'll `map` them because we know there's sometimes conflicts. We'll preface them each with `lo` and then the name of the real function. Then for each of those, we will define a Cypress command. We'll copy out the Cypress command. We'll get the real name of the lodash method by removing the lo preface because we're going to need to call the real method in lodash. There we go.

Next we will define the name of the command. Some lodash methods have args. We'll just pass these through. Instead of filter, we'll call the lodash method that is defined. We'll change the `name` so it updates in the log.

```js
...
let loMethods = _.functions(_).map((fn) => { return 'lo_${fn}'})

loMethods.forEach((loFn) => {
    let loName = loFn.replace(/lo_/, '')
Cypress.Commands.add(loFn, {prevSubject: true}, (subject, fn, ...args) => {
    let result = _[loName](subject, fn, ...args)
    Cypress.log({
        name: 'lo_filter',
        message: JSON.stringify(result),
        consoleProps: () => { return result }
    })
    
    return result
})
```

Let's check this out in Cypress. Make sure everything still works the same way, and it does.

![image of it all working still in the same way](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626691/transcript-images/10_cypress-wrap-external-libraries-with-cypress-works.jpg)

Let's go ahead and show the power of using our lodash methods together. We'll use `.lo_find` to pick off the first todo.

Then we'll use `.lo_pick` to pick off just the text. This is no longer an array. It no longer has any other attributes. We're just asserting on the parts that we care about.

### todos.spec.js
```js
...
    // Access the fixture data this.todos
    cy.store('todos')
    .lo_find((todo) => { return todo.id == 1})
    .lo_pick('text')
    .should('deep.equal', [
        {
            text: '1st Todo',
        },
        ...
    ])
```

We'll rerun this and see that find found us the entire todo. Pick picked off just the text. Then our assertion runs only the assertion we care about. You can see that by wrapping this external library, we've given Cypress superpowers.

![image of lodash working with cypress](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626694/transcript-images/10_cypress-wrap-external-libraries-with-cypress-superpowers.jpg)
