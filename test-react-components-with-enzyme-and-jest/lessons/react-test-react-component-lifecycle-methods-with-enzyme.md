Instructor: 00:00 When we work with React components, we sometimes utilize lifecycle methods to help conditionally render our components. It is helpful to use the Enzyme to test that these lifecycles are called appropriately while testing their purpose inside of our components.

00:15 We'll start a new test. Well, say, `it calls componentDidMount`, and then into this block we'll `jest.spyOn(ourApp.prototype, 'componentDidMount')`, then const `wrapper` = `shallow(<App />)` components. We'll `expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)`.

#### App.test.js
``` javascript
it('calls componentDidMount', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
  })
```

00:34 Jest's `spyOn` method gives this ability to mock out the `componentDidMount` method inside of our `App` component. With this mock in place, we can test for this lifecycle to be called once.

00:50 Now, you might have assumed that this test would pass automatically because `componentDidMount` fires when the component is rendered. However, it is failing because it cannot find this method on our component.

01:01 We can easily make this test pass by adding an empty `componentDidMount` method on our component. Once we save it, we can see that now all of our test pass.

#### App.js
``` javascript
class App extends Component {
  ... 

  componentDidMount() {
  
  }

  ...
}
```

01:12 If we added a `lifecycle` property to our state and updated that inside of our `componentDidMount`, we can actually utilize this lifecycle method. We'll add a p-tag with a class name of lifecycle and print whatever our lifecycle state is.

```javascript
class App extends Component {
  state = { 
    on: false,
    input: '',
    mainColor: 'blue',
    lifeCycle: ''
  }

  componentDidMount() {
   this.setState({ lifeCycle: 'componentDidMount' })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h3 className={this.state.mainColor}>Everyone is Welcome!</h3>
        </header>
        <Form />
        <p className="App-intro">Hello World</p>
        <p className='button-state'>{this.state.on ? 'Yes!' : 'No!'}</p>
        <button onClick={() => this.setState({on: true})}>Click</button>
        <h2>{this.state.input}</h2>
        <input onChange={(e) => this.setState({input: e.currentTarget.value})} type='text' />
        <p className='lifeCycle'>{this.state.lifeCycle}</p>*
      </div>
    )
  }
}
```

01:27 Now with that in place, we can do another `expect`. We'll find our p-tag by the `.lifecycle` class. Grab the text, and make sure that that equals `componentDidMount`. We'll update our title and we'll save it off.

#### App.test.js
``` javascript
it('calls componentDidMount, updates p tag text', () => {
  jest.spyOn(App.prototype, 'componentDidMount')
  const wrapper = shallow(<App />)
  expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
  expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
})
```

01:41 Inside of our terminal, we can see that our only failing tests are our snapshot tests that we've done. If we update those, our tests are passing, including calls `componentDidMount`.

01:52 Now, in another test we've written, we've set props to test some come conditional content. We can take that once step further and test a corresponding lifecycle method. If we wrote `it setProps calls componentWillReceiveProps`, then inside of this block, we'll do `jest.spyOn(app.prototype.componentWillReceiveProps)`.

02:10 `const wrapper = shallow(<App />)` component. `wrapper.setProps`, we'll make a height to true. We'll `expect` that `app.prototype.componentWillReceiveProps.mock.calls.length` is one.

```javascript
it('setProps calls componentWillReceiveProps', () => {
  jest.spyOn(App.prototype, 'componentWillReceiveProps')
  const wrapper = shallow(<App />)
  wrapper.setProps({ hide: true })
  expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
})
```

02:30 Again, we use Jest's `spyOn` method to mock out `componentWillReceiveProps` lifecycle method. When we use this `setProps` method from Enzyme, it's going to call `componentWillReceiveProps`. Our tests will fail because this method does not exist yet on our class.

02:48 Similar to `componentDidMount`, we can simply add `componentWillReceiveProps` onto our class. This will be enough to pass our test.

#### App.js
```javascript
componentWillReceiveProps() {
    this.setState({ lifeCycle: 'componentWillReceiveProps' })
  }
```

02:58 Let's take this one step further and update the state lifecycle property to now say `'componentWillReceiveProps'`, then we'll write a new expect where we'll expect that `wrapper.find('.lifecycle')` p-tags is now `componentWillReceiveProps`.

#### App.test.js
``` javascript
it('setProps calls componentWillReceiveProps', () => {
  jest.spyOn(App.prototype, 'componentWillReceiveProps')
  const wrapper = shallow(<App />)
  wrapper.setProps({ hide: true })
  expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
  expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
})
```

03:16 Once we save this and grab our terminal again, all of our tests are still passing. If we rerun this, they still pass, including our new test `setProps` calls `componentWillReceiveProps`.