Instructor: [00:01] In `modal.js` we have a simple modal component that creates an element, appends that to the document and removes it when it's unmounted and it's using reactDOM.createPortal to render the children into that element. 

#### modal.js
```js
import React from 'react'
import ReactDOM from 'react-dom'

let modalRoot = document.getElementById('modal-root')
if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
}

// don't use this for your modals.
// you need to think about accessibility and styling.
// Look into: https://ui.reach.tech/dialog
function Modal({children}) {
  const el = React.useRef(document.createElement('div'))
  React.useLayoutEffect(() => {
    const currentEl = el.current
    modalRoot.appendChild(currentEl)
    return () => modalRoot.removeChild(currentEl)
  }, [])
  return ReactDOM.createPortal(children, el.current)
}

export {Modal}
```

Let's see how we test something like this.

[00:14] We're going to `import React from 'react'` and we're going to `import {render} from '@testing-library/react'` and then we'll `import` the `Modal` from that `modal` module. 

#### portals.js
```js
import React from 'react'
import {render} from '@testing-library/react'
import {Modal} from '../modal'
```

We're going to add a `test` for modal shows the children and then we want to `render` that `Modal`.

[00:31] We'll render a `div` in here with a `data-testid` of `test`. What we need to get from here is a `getByTestId` so we can access that test. Then we'll just simply expect getByTestId test to be in the document. 

```js
test('modal shows the children', () => {
  const {getByTextId} = render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  expect(getByTestId('test')).toBeInTheDocument()
})
```

Save that and our test is passing.

[00:51] What's interesting about this is this div is not appearing inside of the container that render creates for us. You might think we have to do something special to get access to the div that's being rendered in a totally different DOM node, but actually the `getByTextId` and all of the queries that are returned here by default are going to be bound to document.body.

[01:12] With the way that our portal is implemented, we're automatically creating this model route elements and appending that to the body over in `modal.js`. Your model contents actually do need to be appended to the body one way or another.

[01:23] By having all of the queries bound to the body, you don't actually have to do anything special to get the DOM nodes that are rendered in this model. Let me show you one other thing here. We're going to a `debug` here in the `const`. We'll call a `debug`. 

```js
test('modal shows the children', () => {
  const {getByTextId, debug} = render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  debug()
  expect(getByTestId('test')).toBeInTheDocument()
})
```

We'll save that. Here's what it looks like.

[01:37] This is the container that React touching library is creating for us to render stuff into that container, but our model doesn't actually render anything in that container. Instead, it simply returns a React portal which is going to render our children to the element that we create in our layout effect.

![debug printed in the terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574730718/transcript-images/scikit-learn-test-react-portals-with-within-from-react-testing-library-debug-printed-in-terminal.jpg)

[01:53] Those children are going to get appended to the div that's inside that model root node. If you wanted to limit these queries to just the contents of your model, then one way that you could do that is by using a React testing libraries `within` utility.

[02:07] We'll say, `within`. Then we want everything to be within this model route which we can see right here in our output. We'll just say, `document.getElementById`, `'model-route'`. 

```js
test('modal shows the children', () => {
  const {getByTextId, debug} = render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  within(document.getElementById('modal-root'))
  expect(getByTestId('test')).toBeInTheDocument()
})
```

This is going to return all the same queries that we get from render except they'll be bound to this element rather than the body.

[02:27] We can say, `getByTestId` Then we can just get rid of all of this stuff from `render`. 

```js
test('modal shows the children', () => {
  render(
    <Modal>
      <div data-testid="test" />
    </Modal>,
  )
  const {getByTestId} = within(document.getElementById('modal-root'))
  expect(getByTestId('test')).toBeInTheDocument()
})
```

Our test should continue to pass except if there's anything rendered outside of that model, then we won't be able to access it. For example, let's just render a fragment here.

[02:40] We'll render the `modal` there, and we'll render a `div` with the `data-testid` of `foo`. 

```js
test('modal shows the children', () => {
  render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div dta-testid="test" />
      </Modal>
    </>
  )
  const {getByTestId} = within(document.getElementById('modal-root'))
  getByTestId('foo')
  expect(getByTestId('test')).toBeInTheDocument()
})
```

Now, if I say get by test ID foo, we're going to get an error here because foo does not appear within our scoped element. If we wanted to get access to that, then we'd have our `bodyUtils`.

[02:59] We'll just give it that name. That's no convention or anything. 

```js
test('modal shows the children', () => {
  const bodyUtils = render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div dta-testid="test" />
      </Modal>
    </>
  )
  const {getByTestId} = within(document.getElementById('modal-root'))
  bodyUtils.getByTestId('foo')
  expect(getByTestId('test')).toBeInTheDocument()
})
```

Then that will work just fine, or we could get rid of this. We could do another `within` that is `document.body`, `getByTestId('foo')`.

```js
test('modal shows the children', () => {
  render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div dta-testid="test" />
      </Modal>
    </>
  )
  const {getByTestId} = within(document.getElementById('modal-root'))
  within(document.body).getByTestId('foo')
  expect(getByTestId('test')).toBeInTheDocument()
})
```

[03:11] That works fine, or you can take this even further and import `queries` from React testing library and say `queries.getByTestId`. This one is going to accept the container as the first argument. You can say `document.body`. 

```js
import {render, within, queries} from '@testing-library/react'


test('modal shows the children', () => {
  render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div dta-testid="test" />
      </Modal>
    </>
  )
  const {getByTestId} = within(document.getElementById('modal-root'))
  queries.getByTestId(document.body, 'foo')
  expect(getByTestId('test')).toBeInTheDocument()
})
```

That works just as well. You have a couple of options here.

[03:27] I recommend that you typically just stick with what render's going to give you. If you want a scope things down, then you can scope it down using within. I'll tell you about one other option, and that is your `baseElement` option that you can specify below our fragment. Here, we can say our `baseElement` is that modal root.

[03:45] Then, we can do `{getByTestId} = render`. We'll get rid of this `within` at the bottom. 

```js
test('modal shows the children', () => {
  const {getByTextId} = render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div dta-testid="test" />
      </Modal>
    </>
    {baseElement: document.getElementById('modal-root')}
  )
  queries.getByTestId(document.body, 'foo')
  expect(getByTestId('test')).toBeInTheDocument()
})
```

Save that, and that will work just as well. The `baseElement` is basically saying, "Hey React testing library, the queries that you give me back from render, I want those to be bound to this element rather than the body."

[04:01] There are a couple ways to do this, but if I were writing this test and it just so happens that I am, then this is probably what I would wind up with. I'd just leave render as it is. Then, I'd say, "Hey, I want to get some specific queries that are within the modal root."