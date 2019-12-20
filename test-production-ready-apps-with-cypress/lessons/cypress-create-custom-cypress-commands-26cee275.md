In the previous video, we access the state of the Redux store with this rather cumbersome call. If we want to reuse this in our application over and over again, it would probably be easier if we could call `cy.store`. 

### todos.spec.js
```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.server()
        cy.route('/api/todos', [
          {
            "id": 1,
            "text": "Hello world",
            "completed": false
          },
          {
            "id": 2,
            "text": "Goodnight moon",
            "completed": true
          }
        ]).as('preload')

        cy.visit('/')
        cy.wait('@preload')

        cy.store()
        cy.window().its('store').invoke('getState').its('todos').should('deep.equal', [{
            id: 1,
            text: 'Hello world',
            completed: false
          }, {
            id: 2,
            text: 'Goodnight moon',
            completed: true
          }])
...
```

Let's turn this whole thing into a custom Cypress command. We can open up our side bar, go under `cypress/support/commands.js`.

This file has a couple of examples. We can either have parent commands, child commands, or dual commands. Since we'll call store directly on cy, that'll make it a parent command. A child command would be chained off of some existing command.

Let's follow this formula. `Cypress.Commands.add("store")`. Since it's a parent command, we won't pass in the option for previous subject. Instead, our second argument is just the function we want to run when we run the command. Let's paste in our command and make sure we return it.

### commands.js
```js
Cypress.Commands.add("store", () => {
    return cy.window().its('store').invoke('getState')
})
```

If we head back into Cypress and rerun our test, we'll see our custom command ran, or it seems like it did.

![image of the custom command seeming to run](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626691/transcript-images/09_cypress-create-custom-cypress-commands-custom.jpg)

Instead of seeing store logged out here, we see all of the child commands, window, its, invoke, all of the gut contents of our method. That's going to be confusing to our end user.

It would be a lot more helpful if we could just see one log that said store and if when we clicked on it we could actually see the state of the store, the way we do with Cypress commands. How do we do that? Cypress will let us create a log by calling `Cypress.log`. We'll give it the `name` that we want, which is `store`.

Since we want to suppress the output of `cy.window`, we can pass in `log: false`. Most cy commands support log false, but `its` and `invoke` will not. Instead, let's just use a `.then`, which won't log anything. Instead, we'll grab our `$window`. We'll return `window.store.getState()`.

```js
Cypress.Commands.add("store", (str = '') => {
  let log = Cypress.log({name: 'store'})
  return cy.window({log: false}).then(($window) => { return $window.store.getState() })
})
```

If we rerun our test, we'll see that we have logged out the name store. 

![image of the name store logged](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626695/transcript-images/09_cypress-create-custom-cypress-commands-custom-store-logged.jpg)

We have no child commands logged anymore. How do we actually log out the contents of the store inside the console? What we need is some way to attach the state that we just got to the log that we already created.

Fortunately, Cypress supports updating the log throughout the duration of the method. We can call `log.set`. We can pass in a `message`, which will always be a string. We'll call `JSON.stringify(state).` Then we'll pass in `consoleProps`, which will allow us to inspect the state in the console. Here, we'll `return state`. Finally, we return the state from this whole method so that we can continue chaining Cypress commands off of it. 

```js
Cypress.Commands.add("store", (str = '') => {
    let log = Cypress.log({name: 'store'})
    return cy.window({log: false}).then(($window) => { return $window.store.getState() }).then((state) => {
        log.set({
            message: JSON.stringify(state),
            consoleProps: () => {
                return state
            }
        })

        return state
    })
})
```

When we rerun Cypress, we can see our store command now has a stringified version of the state printed out as the message.

![image of the store command with the stringified version of state printed out as the message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626683/transcript-images/09_cypress-create-custom-cypress-commands-custom-store-stringify.jpg)

When it's clicked on in the console, we can look through any piece of state we like, including our to-dos, visibility filter and this example of a deeply nested piece of state.

Since application state can become sprawlingly huge in any application, we want to allow the user to define which piece of state they want logged in the console and what they want to test against, so let's include a `stateName` argument.

By default, we'll return the entire state, but if `stateName.length` is greater than zero, then we'll return just the subset of state that the user asked for. To continue chaining method calls, we'll call `cy.wrap`, passing in the `state`. Don't forget to pass `log: false`. Then we'll call its with the state name. That way, we grab just the piece of state that we're interested in.

Finally, we'll call a callback which will run our `log.set` and `return state`. We'll copy these out. Let's create our callback. This will receive the `state` and run the logging functions. Then in the case where we don't want to run `its`, we'll wrap the state, `log: false`, and then just run the callback. We'll make sure to return the two of these and clean it up.

```js
Cypress.Commands.add("store", (stateName = '') => {
    let log = Cypress.log({name: 'store'})

    const cb = (state) => {
        log.set({
            message: JSON.stringify(state),
            consoleProps: () => {
                return state
            }
        })

        return state
    }

    return cy.window({log: false}).then(($window) => { return $window.store.getState() }).then((state) => {
        if (stateName.length > 0) {
            return cy.wrap(state, {log: false}).its(stateName).then(cb)
        } else {
            return cy.wrap(state, {log: false}).then(cb)
        }
    })
})
```

Now, we can go back to our test in `todos.spec.js` and pass in `todos` to the store and remove the `its`. 

### todos.spec.js
```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.server()
        cy.route('/api/todos', [
          {
            "id": 1,
            "text": "Hello world",
            "completed": false
          },
          {
            "id": 2,
            "text": "Goodnight moon",
            "completed": true
          }
        ]).as('preload')

        cy.visit('/')
        cy.wait('@preload')

        cy.store('todos').should('deep.equal', [{
             id: 1,
            text: 'Hello world',
            completed: false
          }, {
            id: 2,
            text: 'Goodnight moon',
            completed: true
          }])
...
```

When we rerun our test, we'll see that in the store, the only part of the store that we logged out was the part of the store that we were interested in.

![image of the store log that we are interested in](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626691/transcript-images/09_cypress-create-custom-cypress-commands-custom-store-correctlogged.jpg)

Because cy.its accepts dot-separated notation, we can drill into the store as deeply as we want. Remember this deeply nested piece of state, `example.test.first`? We can drill into that, too.

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.server()
        cy.route('/api/todos', [
          {
            "id": 1,
            "text": "Hello world",
            "completed": false
          },
          {
            "id": 2,
            "text": "Goodnight moon",
            "completed": true
          }
        ]).as('preload')

        cy.visit('/')
        cy.wait('@preload')

        cy.store('todos').should('deep.equal', [{
             id: 1,
            text: 'Hello world',
            completed: false
          }, {
            id: 2,
            text: 'Goodnight moon',
            completed: true
          }])

        cy.store('example.test.first')
...
```

When we load it up, we can see this. We can see that it yielded the value one. 

![image of the loaded state](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626679/transcript-images/09_cypress-create-custom-cypress-commands-custom-store-loaded.jpg)

We can see the piece of state that we drilled into. You can see pretty quickly how effective it is to create custom commands with custom logging.
