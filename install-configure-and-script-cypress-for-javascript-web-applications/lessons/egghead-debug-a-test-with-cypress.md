Let's say that we have a bug here, where we expect this to equal `4` when we added `1` and `2`, but it actually equals `3`. We open up our cypress test and this thing's totally broken.

![Broken](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907821/transcript-images/egghead-debug-a-test-with-cypress-broken.png)

How do we go about debugging this? Maybe clicking on the wrong button or something is going on wrong. What do we do to debug this? What we would traditionally do is, we'd add a `debugger` statement here and cypress will rerun our test. We can actually open up our developer tools.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    debugger
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('total')
      .should('have.text', '3')
  })
})
```

When we have that opened up and we can look in that `debugger` statement, and we can inspect the world at this point in time. The problem is that we're queuing up cypress to execute these commands that will happen at a later time.

![Debugger](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907817/transcript-images/egghead-debug-a-test-with-cypress-debugger.png)

If we wanted to know what this subject that were clicking on here is, then we have to do a little bit more work. What we're going to do is we'll add a `.then`. This is going to give us our `subject`. Then, we'll have to `return` the `subject` to keep the chain going, but then we can add our `debugger` right here.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .then(subject => {
          debugger
          return subject
      })
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('total')
      .should('have.text', '4')
  })
})
```

If I save that and we'll play this through, then we're going to get our `debugger` statement at this point. We have our `subject`. We can open up our console here. We'll look in that `subject` variable. We'll see it's a jQuery wrapped button.

![JQuery Wrapped Button](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907818/transcript-images/egghead-debug-a-test-with-cypress-jquery-wrapped-button.png)

If we say `subject[0]` that's our `button` node, then we can see exactly what node is being interacted with at this point in time.

![Jquery button](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907823/transcript-images/egghead-debug-a-test-with-cypress-jquery-button.png)

Executing a `.then` here, which is promise like, but it's not exactly the same thing as a promise, so you can't do `async await`.

But using `.then` here to say, "Hey cypress, after you've gotten this `subject`, I want to inspect that, and make sure to return the `subject`, so that the test can continue with that `subject` as if you didn't do anything to change that `subject`. Then, you can put your `debugger` statement and inspect what's going on at this point in time."

We can move this around at any part in or test here to inspect what the `subject` is at any point in time. That can be really, really helpful in debugging our tests.

```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .then(subject => {
          debugger
          return subject
      })
      .getByTestId('total')
      .should('have.text', '4')
  })
})
```

If we wanted to debug some code that's in our source code, then we can actually do the same thing. If I wanted to, for example, going to this `index.js` and I wanted to debug here, then I can do that.

#### index.js
```javascript
ReactDOM.render(
  <Component initialState={{}}>
    {({state, setState}) => {
      debugger
      return (
        <LoadUser
        user={state.user}
        setUser={loadedUser => setState({user: loadedUser})}
      >
```

I'll go and play this through. I get my `debugger` statement right here which is perfect. I can look at the `state`. I see the `state` is an empty object or play through, and the things are still broken.

![Debugger src](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907818/transcript-images/egghead-debug-a-test-with-cypress-src-debugger.png)

What if I wanted to see what the `state` was here now, when we don't have access to the `state`? I'm going to do a little trick here. Anywhere inside of your source code, you can actually do `if(window.Cypress){` and anything inside of this `if` statement will actually execute when we're running in our cypress test, but not when your application is actually running.

So we can add `window.appState = state` and `window.setAppState = setState`.

```javascript
ReactDOM.render(
  <Component initialState={{}}>
    {({state, setState}) => {
      if(window.Cypress) {
        window.appState = state
        window.setAppState = setState
      }
```

You could do this with your redux store, or just about anything you can think of to provide some better debugging tools for your cypress test. I'll go ahead and save that.

Just to see what's going on, we'll add a `debugger` right here.

```javascript
ReactDOM.render(
  <Component initialState={{}}>
    {({state, setState}) => {
      debugger
      if(window.Cypress) {
        window.appState = state
        window.setAppState = setState
      }
```

Then, let's go ahead and open our console. We'll refresh, and we'll get that stopped right there. We'll step over. We're inside of this `if` statement setting `appState` and this `setAppState`.

![Set State](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907823/transcript-images/egghead-debug-a-test-with-cypress-set-state.png)

We'll play through. We can look at `window.appState`. We'll see that's an empty object and we can call `setAppState`. We can call that with a `user` with `name` of `someone`.

#### Chrome Console
```javascript
window.appState
> {}
window.setAppState({user: {name: 'someone'}})
```

That's going to rerender our app, so we'll hit that debugger again. Look right here, we have `register` and `log in`.

When I click play through, now that we have a `user`, we have `log out`. We can debug a lot of things. If you were to put your redux store in here, you can do a bunch of things and set your app into a certain state to make things a lot easier.

In fact, we could also use this in our cypress test as well to access some variables if that's at all helpful.

In review, to debug your test with cypress, you can add a `.then`, you'll get access to the subjects. You can add a `debugger` there.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .then(subject => {
          debugger
          return subject
      })
      .getByTestId('total')
      .should('have.text', '4')
  })
})
```

If you wanted to debug in your source code, you add a `debugger` anywhere in your source code and that will also be stopped in your developer tools.

You can also run some code that's specific to cypress to expose some internal state of your application to make it easier to develop and debug your cypress test.

#### index.js
```javascript
ReactDOM.render(
  <Component initialState={{}}>
    {({state, setState}) => {
      debugger
      if(window.Cypress) {
        window.appState = state
        window.setAppState = setState
      }
```