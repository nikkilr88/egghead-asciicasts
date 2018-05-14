Instructor: 00:00 Full DOM rendering is ideal for use cases where you have components that may interact with DOM APIs, or may require the full React lifecycle in order to fully test a component.

00:11 For example, if you need to test the `componentDidMount` lifecycle. Let's import `mount`, and then copy this `describe` block. This first one is using `shallow` rendering. The second is going to use that `mount` rendering method.

#### App.test.js
```javascript
import { configure, shallow, mount } from 'enzyme'

describe('<App /> shallow rendering', () => {
  ...
})

describe('<App /> mount rendering', () => {
  ...
})
```

00:25 Next, let's change the `shallow`s to `mount`. Full DOM rendering requires that a full DOM API be available at the global scope. This means that we must run our test in an environment that at least looks like a browser environment.

```javascript
describe('<App /> mount rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
  })
  it('matches the snapshot', () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
```

00:39 The recommended approach is to import a library called `jsdom`, which is essentially a headless browser implemented completely in JS.

00:48 Now, I have jsdom already installed, because I am using Create React App, but if you're not, then you'll need to install this package.

```bash
$ npm install jsdom
```

00:55 The `mount` method has a second optional configuration object that holds `context`, as well as `attachTo`. The `context` object is context that we want to pass into our component. The `attachTo` is when we want to attach our component to a specific DOM element.

```javascript
it('h1 contains correct text', () => {
  const wrapper = mount(<App />, context: {}, attachTo: DOMElement)
  expect(wrapper.find('h1').text()).toBe('Welcome to React')
})
```

01:14 Unlike shallow or static rendering, full rendering actually mounts the component in a DOM, which means that test can affect each other if they're using the same DOM.

```javascript
describe('<App /> mount rendering', () => {
  it('h1 contains correct text', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('h1').text()).toBe('Welcome to React')
    wrapper.unmount()
  })
  it('matches the snapshot', () => {
    const tree = mount(<App />)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount()
  })
})
```

01:22 We're using the `unmount` method here to unmount the component from the DOM. This can also be used to simulate a component growing through an unmount mount lifecycle in React.

01:32 Also, many of the same methods shallow rendering has can be used with `mount`. As you can see, our new test block is passing with the `snapshot` and the `find` method.

01:44 As a heads-up, the `mount` `toJson` rendering is slightly different than the shallow rendering. Our snapshot test will fail if we switch this out.