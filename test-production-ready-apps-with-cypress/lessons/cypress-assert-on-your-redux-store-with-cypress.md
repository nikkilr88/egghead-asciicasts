Right now we're not able to make assertions at all levels of the stack. We'd really like to be able to. When breakdowns happen, we want to know why they happened and where they happened. Is something not painted on the UI because of a UI issue? Is it because of the underlying representation in the redux store? Right now we don't know.

We can't make any assertions on our front-end stores of any kind. Let's go ahead and make that possible. We'll start by opening `src.index.js` which is where in our application we've defined the store. We'll say, `if(window.Cypress)` which means we're in a Cypress testing environment. Then we know we're safe to expose the store on the window.

### index.js
```js
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { rootSaga } from './sagas/TodoSagas'
import App from './components/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

if(window.Cypress) {
    window.store = store
}

render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
```

We then go back to `todos.spec.js`. Cypress exposes the window as `cy.window` which will help us access it. Remember that Cypress code is asynchronous. We don't just have access to window here. Let's take a call back and `{console.log($window.store)}` just to make sure we've set everything up properly. 

### todos.spec.js
```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.window().then(($window) => {console.log($window)})

        cy.get('[data-cy=todo-item-3]')
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

It looks like we have. 

![image of the console.log functioning properly](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626687/transcript-images/08_cypress-assert-on-your-redux-store-with-cypress-windowlog.jpg)

Cypress exposes a way to access these properties by using `its`. We can say, `.its('store')`.

What we want is to be able to make assertions against the state of the store. In order to get the state of the store, we would normally call, `getState` which is a function, not a property like store. In order to do this, we can call, `.invoke`.

We can call, `.invoke('getState')` Now we should have our state. Let's take a look. We'll `console.log($state)`. 

```js
describe('Todo Application', () => {
  it('loads the page', () => {
    cy.visit('/')

    cy.window().its('store').invoke('getState').then(($state) => { console.log($state)})
    ...
```

Great, this looks like the state we expect because this is before we've waited for any pre-load.

![image of the expected state](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626692/transcript-images/08_cypress-assert-on-your-redux-store-with-cypress-expect.jpg)

Instead, let's make an assertion on the store. We can say it `should('deep.equal'`,  `todos`, which will have the state of the to-dos array and `visibilityFilter`, which will be, `show_all`. We want to assert that the to-dos have loaded. Let's go ahead and paste in the to-dos that we expect to be there and save it out. 

```js
describe('Todo Application', () => {
    it('loads the page', () => {
        cy.visit('/')

        cy.window().its('store').invoke('getState').should('deep.equal), {
            todos: [{
                "text": "Hello world",
                "completed": false,
                "id": 3
            }
            {
                "id": 4, 
                "completed": true,
                "text": "Goodnight moon"
            }
          ],
          visibilityFilter: 'show_all'
        })
        ...
```

Let's revisit Cypress and see what happens. In fact, this test still passes because Cypress waits for the to-dos to load just like Cypress will wait until the specified time-out for UI elements to load.

![image of the test passing in cypress](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626687/transcript-images/08_cypress-assert-on-your-redux-store-with-cypress-success.jpg)

It will also wait until the specified time-out for our stores state to match what we expect. This makes it really easy to wait for an assert on asynchronous behavior.
