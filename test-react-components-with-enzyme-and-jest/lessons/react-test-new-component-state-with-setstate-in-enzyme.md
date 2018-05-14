Instructor: 00:00 Sometimes, our React components use local state to conditionally update our component attributes. If we wanted to simulate and test different component contexts, we can manually update the rendered component inside of our testing environment.

00:15 For our new test, we'll say `it updates class name with new state`. Inside of this block, we'll do const `wrapper` equals `shallow` `App` component. We'll expect that we find the `.blue` class with a `length` on `1` and our red class `0`. Until we update our `state`, we'll put `mainColor` to `red`. Now, we'll expect that our `blue` is `0` and `red` is `1`.

#### App.test.js
``` javascript
it('updates className with new State', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('.blue').length).toBe(1)
  expect(wrapper.find('.red').length).toBe(0)
  wrapper.setState({ mainColor: 'red' })
  expect(wrapper.find('.blue').length).toBe(0)
  expect(wrapper.find('.red').length).toBe(1)    
})
```

00:41 Now, inside of our `App.js` file, let's add our `mainColor` property, initially to be blue. Our H3 class name is `this.state.mainColor`. We'll say, "Everyone is welcome." Close H3 and save it. Perfect.

#### App.js
``` javascript
class App extends Component {
  state = { 
    on: false,
    input: '',
    mainColor: 'blue'
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h3 className={this.state.mainColor}>Everyone is Welcome!</h3>
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

00:55 Now, the only failing tests we have are snapshots. If we update these, we're going to see that our test now pass. Now, as you can imagine, when we use this `setState` method on our wrapper, it will invoke `setState` on the root component and cause it re-render.

01:12 This is useful for testing our components in different states.