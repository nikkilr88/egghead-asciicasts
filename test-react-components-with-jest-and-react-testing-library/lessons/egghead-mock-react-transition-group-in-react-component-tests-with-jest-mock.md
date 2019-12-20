Kent C Dodds: [00:00] Here, we have this `HiddenMessage` component that will show its `children` in a `div` inside of this `Fade` component when you click on this toggle `button`. That `Fade` component is using `CSSTransition` from `react-transition-group`, which is an animation library. It will `Fade` in the `children` after 1,000 milliseconds.

### hidden-message.js
```javascript
import {CSSTransition} from 'react-transition-group'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

class HiddenMessage extends React.Component {
  state = {show: false}
  toggle = () => {
    this.setState(({show}) => ({show: !show}))
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={this.state.show}>
          <div>{this.props.children}</div>
        </Fade>
      </div>
    )
  }
}
```

[00:17] In our test, we don't want to wait 1,000 milliseconds before we can verify that the `children` have been added or removed from the document. We're going to mock out the `CSSTransition` component from `react-transition-group` in our test.

[00:28] Let's go ahead, and we'll `import React from 'react'`, because we're going to need that. We'll also `import {render} from 'react-testing-library'`, and we'll `import {HiddenMessage} from '../hidden-message'`. Then we'll add a test, `'shows hidden message when toggle is clicked'`.

### mock-component.js
```javascript
import React from 'react'
import {render} from 'react-testing-library'
import {HiddenMessage} from '../hidden-message'

test('shows hidden message when toggle is clicked', () => {

})
```

[00:48] Next, our test is going to render that `HiddenMessage`. We need to have some message in here so I'm going to make a variable called `myMessage`. We'll have it say `'hello world'`, and then we'll put `myMessage` as a child to `HiddenMessage`.

[01:01] Then we're going to need to click on that `button`, so we'll `getByText`. That'll equal render that `HiddenMessage`, and we'll get that `toggleButton`. That'll be `getByText(/toggle/i)` in our case there. Then we'll need to fire an event on the `toggleButton`.

[01:17] We'll bring in `fireEvent` from `react-testing-library`, and we'll fire a `click` event on the `toggleButton`. Then we can expect `getByText(myMessage).toBeInTheDocument()`. Cool.

```javascript
test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText} = render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = getByText(/toggle/i)
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
})
```

[01:31] If we save that, and then pop open our test here, we've got a failing test. The reason is, if we come up here, it's going to tell us it cannot find the `getByText(myMessage)`. Let's go ahead and we'll mock out our `CSSTransition` here so that the `Fade` will render the `children` immediately, rather than having to wait for the `CSSTransition`.

[01:53] We'll say `jest.mock('react-transition-group')`, and then we'll return `CSSTransition`. This is going to be a function component that simulates the same API as the component that we have from `react-transition-group`.

[02:07] The way that this works is, we have a `Fade` here. That takes an `in` prop. Then we forward that prop along to `CSSTransition`. `CSSTransition` takes an `in` prop to know whether or not the `children` should be rendered.

### hidden-message.js
```javascript
import {CSSTransition} from 'react-transition-group'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

class HiddenMessage extends React.Component {
  ...
  render() {
    return (
      <div>
        ...
        <Fade in={this.state.show}>
          <div>{this.props.children}</div>
        </Fade>
      </div>
    )
  }
}
```

[02:20] That's exactly what our mock is going to do. We'll say `props`, and if `props.in`, then we'll render `props.children`, otherwise, we'll render `null`. Now, if we save that, our test is passing.

### mock-component.js
```javascript
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  }
})
```

[02:32] In addition to this, we're going to take this `getByText` assertion. We'll put it right before the `fireEvent.click`, and we'll assert that it's `.not` in the document. We save that, we're going to get an error, because we're trying to `getByText(myMessage)`, and it can't find that.

```javascript
test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText} = render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = getByText(/toggle/i)
  expect(getByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
})
```

[02:46] We're going to use the query version of this API, `queryByText`, and we'll `expect` it not to be in the document at this point. Then we can toggle this thing again, and we'll `expect` it not to be in the document anymore.

```javascript
test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(<HiddenMessage>{myMessage}</HiddenMessage>)
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
```

[02:57] That covers an entire use case for our component. In review, to properly mock a third party component, you need to simulate the same API that it has. We had the `CSSTransition`, we had a good reason to mock it, and so we created a Jest mock for `react-transition-group`.

[03:13] Then we returned our own version of the `CSSTransition` that worked synchronously to render the `children`. Then our test could run synchronously as well.
