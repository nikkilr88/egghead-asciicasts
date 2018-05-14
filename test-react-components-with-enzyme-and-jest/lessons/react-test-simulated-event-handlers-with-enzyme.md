Instructor: 00:00 Sometimes, we'll have components that will use event methods, such as `onClick`, `onChange`, and `onMouseOver`. We can use Enzyme to not only simulate these events on our rendered components but can check that conditional rendered attributes work as expected.

00:16 Let's start a new test. We'll say `it('on Button Click changes p Text', () => {}`. Into this block, we'll do a const `wrapper` equals `shallow` our `App` component, then const `button` equals `wrapper.find` our button, `expect` that our `wrapper.find('.button-state').text()).toBe('No!')`.

#### App.text.js
``` javascript
it('on button click changes p text', () => {
  const wrapper = shallow(<App />)
  const button = wrapper.find('button')
  expect(wrapper.find('.button-state').text()).toBe('No!')
})
```

00:39 With our initial failing test, let's implement the corresponding JSX -- p `className="button-state"`, and then `this.state.on` ternary yes or no, then a button `onClick` with a function where we update the state `on` to `true`. We'll save this off. Actually, we'll add a state object up here at the top for our `on` property. Perfect.

#### App.js
``` javascript
class App extends Component {
  state = { 
    on: false
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Title text="Some title" />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className='button-state'>{this.state.on ? 'Yes!' : 'No!'}</p>
        <button onClick={() => this.setState({on: true})}>Click</button>
      </div>
    );
  }
}
```

01:08 Now, the only failing tests we'll have are our snapshot tests because we've updated the layout of our component. Our button test that we just added will pass because our initial state is `false`, so our text says `No!`. If we update our snapshots, we can get all of our tests passing.

01:27 Back inside of our tests, we'll add `button.simulate` a `click` event. Now we'll expect that our `wrapper.find('.button-state')`
 `text` is actually `yes`. We'll save it off. Perfect. It looks like our tests still pass.

#### App.test.js
``` javascript
it('on button click changes p text', () => {
  const wrapper = shallow(<App />)
  const button = wrapper.find('button')
  expect(wrapper.find('.button-state').text()).toBe('No!')
  button.simulate('click')
  expect(wrapper.find('.button-state').text()).toBe('Yes!')
})
```

01:43 Even though the name would imply this simulates an actual event, `simulate` will target the component's prop based on the event that we give it. For example, we're using `click` here. This will actually get the `onClick` prop on our component and call it.

01:59 What if we were working with an input element and whenever a user types into the input, it updates the component's state? 

Our new test -- we'll on `input change title changes text`. Since at this block, we'll do const `wrapper` = `shallow` our `App` component, const `input` = `wrapper.find` our input element, then expect that our `wrapper.find('h2').text()` at first is an empty string.

02:25 However, after we simulate a `change` event on our input, we want that our `wrapper` h2 text to be `Tyler`. 

```javascript
it('on input change, title changes text', () => {
  const wrapper = shallow(<App />)
  const input = wrapper.find('input')
  expect(wrapper.find('h2').text()).toBe('')
  input.simulate('change')
  expect(wrapper.find('h2').text()).toBe('Tyler')
})
```

Inside of our `App.js`, we'll add our h2 -- `this.state.input`. In our input element, `onChange`, we want to take the event and update our `input` state to `e.currentTarget.value` type text. Now our state will add our `input` first as an empty string.

#### App.js
``` javascript
class App extends Component {
  state = { 
    on: false,
    input: ''
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Title text="Some title" />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p className='button-state'>{this.state.on ? 'Yes!' : 'No!'}</p>
        <button onClick={() => this.setState({on: true})}>Click</button>
        <h2>{this.state.input}</h2>
        <input onChange={(e) => this.setState({input: e.currentTarget.value})} type='text' />
      </div>
    );
  }
}
```

02:57 If we update our snapshots, we'll see that we still have a test failing. Our on input change test is failing. This is because our simulated event is looking for this `currentTarget` property from the event. Our test does not have that being passed through to the method.

03:16 Our simulate method takes an optional event object that we can mock out for our method. 

#### App.test.js
```javascript
it('on input change, title changes text', () => {
  const wrapper = shallow(<App />)
  const input = wrapper.find('input')
  expect(wrapper.find('h2').text()).toBe('')
  input.simulate('change', {currentTarget: {value: 'Tyler'}})
  expect(wrapper.find('h2').text()).toBe('Tyler')
})
```

If we save this, we can see that our on input change test is now passing because it's looking at our mocked-out event object grabbing `Tyler` from the value and updating our `h2`. Now our last expect is working properly.