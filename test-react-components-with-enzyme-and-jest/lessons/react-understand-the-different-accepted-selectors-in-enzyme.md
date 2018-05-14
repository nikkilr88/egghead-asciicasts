Instructor: 00:00 As we see, many methods in the Enzyme API accept a selector as an argument, there are five different valid types of selectors. 

#### App.test.js
```javascript
describe('<App />', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
  })
```

We can use the element syntax, like we are doing here, or we can use the `.class` syntax, the `#ID` syntax, or the `[href=""]` attribute syntax. We can also combine these together: `'a[href="tyler"]'`.

00:21 We are also able to use contextual selectors such as the `'.tyler > .clarck'` >, +, and the ~. All these that I have shown so far are valid CSS selectors and are just one of five categories of selectors that are accepted.

00:36 The next category is the prop selectors. Instead of our `App.js`, let's paste in a component called `Title` that simply returns a div with a `text` prop. Let's add this `Title` underneath our header and give it a prop of `some title`.

#### App.js
```javascript
const Title = ({text}) => <div>{text}</div>

class App extends Component {
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
      </div>
    );
  }
}
```

00:53 Now instead of our `App.test.js`, we can use the attribute syntax to look for the element with the text prop. 

#### App.test.js
```javascript
describe('<App />', () => {
  it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('[text="Some title"]').text()).toBe('Welcome to React')
  })
```

This is obviously handy when looking for specific components and set up our render tree. Now the key and ref prop cannot be used in the situation.

01:09 The third and fourth categories entail referencing a component constructor and display name. Referencing a component constructor would be passing through a function that replicates the constructor of the component we are trying to find. 

```javascript
it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('function App() { return ...}').text()).toBe('Welcome to React')
  })
```

If we are using a display name with our component, all we simply need to do is pass through a string with that title.

```javascript
it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('App').text()).toBe('Welcome to React')
  })
```

01:31 Finally, we can use the object property selector to find nodes. This is where we're able to pass an object as an argument that matches properties of an element. 

```javascript
it('h1 contains correct text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find({alt: 'logo'}).text()).toBe('Welcome to React')
  })
```

So this alt logo will match on this image element.

#### App.js
```javascript
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <h1 className="App-title">Welcome to React</h1>
</header>
```

01:45 Undefined properties are not allowed in the object property selector. This will cause an error to be thrown.