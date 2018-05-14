Instructor: 00:00 As our component grows and becomes more functional, there are times when we may need to add helper methods to the class, methods that are called in lifecycles after user interaction or just to break down more complex functionality.

00:14 Let's get to bottom here and add a new task for a function that we'll create. Let's say it `handleStrings function returns correctly`. Inside this block, we have const wrapper equals shallow our app components. We'll say const with to return equals `wrapper.instance().HandleStrings()`, Hello World as a parameter. Expect `trueReturn` to be `true`.

#### App.test.js
``` javascript
it('handleStrings function returns correctly', () => {
    const wrapper = shallow(<App />)
    const trueReturn = wrapper.instance().handleStrings('Hello World')
    expect(trueReturn).toBe(true)
  })
```

00:37 Now, at first glance, when we get our terminal, we'll see that is failing because `handleStrings` does not exist on this component yet.

00:47 We're able to access methods on this class because of enzyme's `instance` function. It returns the component that we've shadowed rendered, and give this access to its properties.

00:56 Now, let's go to our `App.js` file and add this `handleStrings` method, which takes the string, and for now, or just return true. This is enough to make all of our tests pass.

#### App.js
``` javascript
class App extends Component {
  state = { 
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: ''
  }
  handleStrings(str) {
    return true
  }
  
  ...
}
```

01:08 Let's do a little more with this function and we'll do `const falseReturn = wrapper.instance().handleStrings('')`. We'll do an empty string this time. We'll except that `falseReturn` is `false`.

#### App.test.js
``` javascript
it('handleStrings function returns correctly', () => {
  const wrapper = shallow(<App />)
  const trueReturn = wrapper.instance().handleStrings('Hello World')
  const falseReturn = wrapper.instance().handleStrings('')
  expect(trueReturn).toBe(true)
  expect(falseReturn).toBe(false)
})
```

01:21 Now, if we save this, we can see that our test will fail. We want `false` but we're getting `true`. Instead of `App.js`, let's modify our `handleStrings` where if the string is Hello World, we want to return `true`. Else, we'll return `false`. I want to save this and grab our terminal. This will pass all of our tests.

#### App.js
``` javascript
handleStrings(str) {
  if (str === 'Hello World') return true
  return false
}
```

01:43 Again, by using the `instance` method on our `wrapper`, we are able to grab properties from our class like the `handleStrings` function. We can pass different arguments and assert that it works as intended.