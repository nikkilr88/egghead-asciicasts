Kent C Dodds: [00:00] Here, we have a super simple `Toggle` component, but it's special because it is using the **render props API**, where instead of rendering its `children` or rendering some specific UI, it calls its `children` as a function, expecting and providing the `on` state, and a mechanism for updating the state, this `toggle` function.

### toggle.js
```jsx
import React from 'react'

class Toggle extends React.Component {
  state = {on: false}
  toggle = () => this.setState(({on}) => ({on: !on}))
  render() {
    return this.props.children({on: this.state.on, toggle: this.toggle})
  }
}

export {Toggle}
```

[00:18] Let's see how we could test this in a way that's simple and comprehensive. I'm going to add a test that it `'renders with on state and toggle function'`. Then we're going to need to `import React from 'react'`, because we'll be rendering the `Toggle` component.

[00:33] We'll `import {render} from 'react-testing-library'`, and we'll `import {Toggle} from '../toggle'`. Let's go ahead, and we'll render that `Toggle`. We need to provide a function as `children` here. I'm going to make a variable called `children`, and that's going to take an `arg`. It's not going to return anything.

[00:52] Then we'll pass `children` here inside `Toggle`, but we need to have access to what `children` is called with. What I'm going to do is I'm going to make a `childrenArg`, and that's going to be an object. Then inside of here, I'm going to say `Object.assign(childrenArg, arg)` and that's the `arg` that it's being passed.

### render-props.js
```jsx
import React from 'react'
import {render} from 'react-testing-library'
import {Toggle} from '../toggle

test('renders with on state and toggle function', () => {
  const childrenArg = {}
  const children = arg => Object.assign(childrenArg, arg)
  render(<Toggle>{children}</Toggle>)
})
```

[01:07] Then here, we can `expect(childrenArg).toEqual({on: false, toggle: expect.any(Function)})`. Then we can go ahead and call `childrenArg.toggle()`, and we'll make this assertion again, except `on` should now be `true`.

[01:28] We've verified the logic of this `Toggle` component. Now, if I open up my tests, I have an error here, because I'm returning an object from my `children` function, and `toggle` is returning what my `children` function returns.

[01:40] I need to make sure that `children` returns `null`. There we go. Now, my test is passing.

```jsx
test('renders with on state and toggle function', () => {
  const childrenArg = {}
  const children = arg => {
    Object.assign(childrenArg, arg)
    return null
  }
  render(<Toggle>{children}</Toggle>)
  expect(childrenArg).toEqual({on: false, toggle: expect.any(Function)})
  childrenArg.toggle()
  expect(childrenArg).toEqual({on: true, toggle: expect.any(Function)})
})
```


This component is pretty simple, and a single test is all we really need for this component. If we had a more complex component that required multiple tests, then I would probably make a `setup` function here that does all of this setup for me, and simply returns an argument with `childrenArg`.

```jsx
function setup() {
  const childrenArg = {}
  const children = arg => {
    Object.assign(childrenArg, arg)
    return null
  }
  render(<Toggle>{children}</Toggle>)
  return {
    childrenArg
  }
}
```

[02:03] Then I can get `childrenArg` from calling `setup`. In review, the way that this works is I create a reference to an object that I'm calling `childrenArg`. Then whenever `Toggle` renders, it's going to call this `children` function.

```jsx
function setup() {
  const childrenArg = {}
  const children = arg => {
    Object.assign(childrenArg, arg)
    return null
  }
  render(<Toggle>{children}</Toggle>)
  return {
    childrenArg
  }
}

test('renders with on state and toggle function', () => {
  const {childrenArg} = setup()
  expect(childrenArg).toEqual({on: false, toggle: expect.any(Function)})
  childrenArg.toggle()
  expect(childrenArg).toEqual({on: true, toggle: expect.any(Function)})
})
```

[02:16] Then I'll assign all the properties from the argument that `Toggle` is passing to my `children` function onto that `childrenArg` object. Because I have a reference to that, I can check what the properties of that `childrenArg` are, and verify that those properties are correct.

[02:31] This is the API that my render prop component exposes, so this is what I'm testing. Then I can even make calls to those functions, which should result in a rerender, and then make additional assertions based off of what should have happened when I called that function.

[02:45] It might also be wise to add one or two integration tests, where I use the `Toggle` component in a more typical way, and verify that I can interact with that component in a way that supports one of my use cases for this component in the first place.
