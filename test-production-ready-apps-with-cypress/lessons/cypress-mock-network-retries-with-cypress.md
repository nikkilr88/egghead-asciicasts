Networks fail for all kinds of reasons, and it's common for our frontend code to retry in the face of network errors. Thanks to Cypress, we can test this behavior easily.

Let's start by creating a new context for `Todo creation retries`. In here, we'll make two tests. The first we'll say is `it('retries 3 times', function()`. This will be the success case, where on the third time the retry is successful. Then, we'll say `it('fails after 3 unsuccessful attempts', function ()`, and we'll go ahead and attach `.only` to our `context`, so this will be the only series of tests that we'll run.

### todos.spec.js
```js
describe('Todo Application', () => {
  beforeEach(function() {
    cy.fixture('todos/all.json').as('todos')
  })

  it('loads the page', function () {...
  })

  context.only('Todo creation retries', function() {
      it('retries 3 times', function() {

      })

      it('fails after 3 unsuccessful attempts', function () {

      })  
    })
  })
```

Let's go ahead and start off each test with a `beforeEach` context, which loads up the page in a known state. In this case we have the two todos that we've typically been using. Now we're ready to get started writing our test.

```js
describe('Todo Application', () => {
  beforeEach(function() {
    cy.fixture('todos/all.json').as('todos')
  })

  it('loads the page', function () {...
  }) 

context.only('Todo creation retries', function() {
    beforeEach(function() {
        cy.server()
        // Alias the fixture data
        cy.route('/api/todos', '@todos').as('preload')

        cy.visit('/')
        cy.wait('@preload')
    })
```

Let's head into Cypress and see what the interaction looks like to create a new todo. We'll type "third todo," and press enter, and we see that shows up on the page, so let's replicate that.

We'll click on our Selector Playground, and we'll see that this is called "data-cy new todo," so we'll go ahead and copy that. 

![image of the selector playground](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626674/transcript-images/12_cypress-mock-network-retries-with-cypress-selector.jpg)

We'll paste it in and say that we type `'3rd Todo'` and then we'll use the special key `enter`, and that will interact with the page for us.

```js
context.only('Todo creation retries', function() {
    
    ...
    
      it('retries 3 times', function() {
          cy,get('[data-cy+new-todo]').type('3rd Todo{enter}')

      })

      it('fails after 3 unsuccessful attempts', function () {

      })  
    })
  })
```

If we head back in the Cypress, we can see what the POST request is that's created here. 

![image of the post request](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626667/transcript-images/12_cypress-mock-network-retries-with-cypress-req.jpg)

We post `api/todo`, so let's go ahead and mock that out. That's going to be `cy.route`. The `method` is going to be `'POST`. The `url` is going to be `/api/todos`. The first response is going to be a `500` status code, and we'll just reply with an empty `response`. Let's say this is `createTodo`, so we give it an alias. 

```js
context.only('Todo creation retries', function() {
    
    ...
    
      it('retries 3 times', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo')

          cy,get('[data-cy+new-todo]').type('3rd Todo{enter}')

      })
```

Then, we'll scroll down here and say `cy.wait` for `('@createTodo')`.

```js
context.only('Todo creation retries', function() {
    
    ...
    
      it('retries 3 times', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo')

          cy,get('[data-cy+new-todo]').type('3rd Todo{enter}')

          cy.wait('@createTodo')
      })
```


Let's head back to Cypress. We'll see that we successfully waited on createTodo, and instead of hitting our real backend, which sent us a 201, now we're sending back a 500, which means that our frontend should start retrying. 

![image of cypress succesfully waiting on createTodo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626687/transcript-images/12_cypress-mock-network-retries-with-cypress-wait.jpg)

Let's go ahead and say that we're going to `cy.wait` for this again, so we'll call this `.as('createTodo2')`, this will be the second version of the request. We can alternatively just wait on `createTodo` a second time, but this makes it a little more explicit what we intend.

```js
context.only('Todo creation retries', function() {
    beforeEach(function() {
        cy.server()
        // Alias the fixture data
        cy.route('/api/todos', '@todos').as('preload')

        cy.visit('/')
        cy.wait('@preload')

        cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo')

        cy,get('[data-cy+new-todo]').type('3rd Todo{enter}')

        cy.wait('@createTodo')

        cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo2')

        cy.wait('@createTodo2')
    })
```

We'll come back to our test and see that createTodo two hangs indefinitely, and that's because our frontend doesn't yet do any retrying. 

![image of createTodo2 hanging indefinitely](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626692/transcript-images/12_cypress-mock-network-retries-with-cypress-hang.jpg)
 
Let's head back to our code and make sure we do some retries.

This will be in `TodoSagas.js`. We'll import the `retry` from `"redex-saga/effects"`. The `createTodo` function is what actually creates the todo-now, so let's call this `createTodoAttempt`, and we'll make sure this retries three times.

Let's go ahead and use a try, because after three unsuccessful attempts, this will raise an error, and we'll `yield` using the retry-saga. We'll `retry` three times for one second each, and we'll retry using the `createTodoAttempt` method, and then we'll pass it our action. If we're successful, we will yield the action `'ADD_TODO_SUCCESS'`, and after three unsuccessful retries, we'll catch that error, and instead we'll yield a new action called `'ADD_TODO_FAIL'`. 

### TodoSagas.js
```js
import { takeEvery, takeLatest, put, all, select } from "redux-saga/effects";
import axios from "axios";

function getBaseUrl() {
  return 'http://localhost:3000'
}

function* createTodo(action) {
    try {
      yield retry(3, 1000, createTodoAttempt, action)
      yield put({type: 'ADD_TODO_SUCCESS'})
    } catch(e) {
      yield put({...action, type: 'ADD_TODO_FAIL'})
    }
}

function* createTodoAttempt(action) {
  yield axios.post(`${getBaseUrl()}/api/todos`, {text: action.text, completed: false})
}

```

If we return to Cypress, we'll see that we've now waited for both our first and second createTodo attempts and replied in both cases with a 500.

![image of cypress waiting for both tests to finish](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626686/transcript-images/12_cypress-mock-network-retries-with-cypress-doublewait.jpg)

Let's go ahead and finish our test. We'll move out the first two `createTodo` attempts to the `beforeEach` hook, because in both cases we're going to be using that, and then in the third `createTodo` attempt, in one case it'll be successful, and in the second case it will be unsuccessful. We can leave this 500 for the third createTodo for the unsuccessful attempt, and in the successful attempt, we'll just go ahead and change our status code to 201. 

### todos.spec.js

```js
it('retries 3 times', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo')

          cy,get('[data-cy+new-todo]').type('3rd Todo{enter}')

          cy.wait('@createTodo')

          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo2')

           cy.wait('@createTodo2')
      })

       it('retries 3 times', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 201, 
            response: ''
          }).as('createTodo3')

          cy.wait('@createTodo3')
       })

        it('fails after 3 unsuccesful attempts', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo3')

          cy.wait('@createTodo3')
```

We'll see that Cypress does in fact wait for each subsequent createTodo attempt, but we still haven't made any assertions.

![image of Cypress waiting for each attempt](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626695/transcript-images/12_cypress-mock-network-retries-with-cypress-waiting.jpg)

Let's go ahead and say that in the successful case, we will get the `todo-list`, and the todo-list `.children`, `.should` have length `3`. In the unsuccessful case, let's just assume that it gets removed from the DOM, so it'll have length `2`.

```js
...
        it('retries 3 times', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 201, 
            response: ''
          }).as('createTodo3')

          cy.wait('@createTodo3')

          cy,get('[data-cy=todo-list]')
            .children()
            .should('have.length', 3)
       })

        it('fails after 3 unsuccesful attempts', function() {
          cy.route({
            method: 'POST',
            url: '/api/todos',
            status: 500, 
            response: ''
          }).as('createTodo3')

          cy.wait('@createTodo3')

          cy,get('[data-cy=todo-list]')
            .children()
            .should('have.length', 2)
       })
```


Of course, this fails in our Cypress test, because we still have all three children on the DOM.

![image of the 3 children DOM fail](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626675/transcript-images/12_cypress-mock-network-retries-with-cypress-fail.jpg)

The reason for that is because our reducer doesn't yet respond to the AddToDoFail method, which we added in our saga after three unsuccessful attempts. Let's go ahead and just finish this interaction. 

### todos.js
```js
import {
  TODOS_LOADED,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  LOCAL_CLEAR_COMPLETED,
  BULK_EDIT_TODOS,
  ADD_TODO_FAIL,
} from '../constants/ActionTypes'

...

    case ADD_TODO_FAIL:
      return state.filter(todo => todo.text !== action.text)

```

We'll uncomment this so it filters out the Todo. 

```js
case ADD_TODO_FAIL:
  return state.filter(todo => todo.text !== action.text)
```

We will go back to our test and see that it passed. With Cypress, network retries are easy to test, because for each XHR request, we can stub out a different response and then wait for them in order.

![image of the test passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1559626680/transcript-images/12_cypress-mock-network-retries-with-cypress-pass.jpg)
