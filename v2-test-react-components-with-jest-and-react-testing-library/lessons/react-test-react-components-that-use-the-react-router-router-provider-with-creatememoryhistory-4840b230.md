Instructor: [00:01] Here we're using React render DOM to render a `Link` and a `Switch` and a couple `Routes` here in this main component. We have a home and about page, and we render both of those inside of this switch. If neither one of those match, then we're going to render this `NoMatch` component.

### main.js
```js
function Main() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}
```

[00:17] Let's go ahead and test this. I'm going to import React from React. We'll import render testing library React, and we'll import main from our main file there. Then we'll add a test to that `main renders about and home and I can navigate to those pages`. Then we're going to render that `Main`, and that `Main` doesn't take any `props`, so we'll just leave it as that is.

```js
test('main renders about and home and I can navigate to those pages', () => {
 render(<Main />)
})
```

[00:45] If I want to make some insertions that I can click on this `Link` and it takes me to the home screen, I want to get my role heading so I can verify that we are on the home screen. Let's go back here. We'll say `getByRole`. We also want to do a get by text, so we can click on this home button. Let's do `getByText`.

[01:05] Then let's actually take a look at what things look like right now. We'll do `debug` and call `debug` right there, save that.

```js
import React from 'react'
import {render} from '@testing-library/react'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  const {getByRole, getByText, debug} = render(<Main />)
  debug()
})
```

Oh-oh. We've got a big error here. It says, "You should not use the `Link` outside of a router." Oh, OK. Let's not use link outside of a router. We'll import `Router` from `react-router-dom`.

[01:26] Normally, you're going to actually import `BrowserRouter` from react-router-dom, but we're going to import router so that we can create our own history and specify which page we're landing on. I'm going to import `createMemoryHistory` from history. That way, I can create my own history and specify the `initialEntries` for the history.

[01:47] Let's do that. We'll have our history object `createMemoryHistory` and then we'll do `initialEntries` that's going to be an array and we're going to start on `'/'`. If we wanted to have some other entries for backward in our history, then we can also have foo and bar. We're on this current page, but we're not going to do that. We'll just have that one page on the home page.

```js
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
```

[02:11] Then, we need to render `Main` within that `Router`. We'll say `Router` where the `history` is our own `history`. We'll put `Main` in there, save that and take a look at the output. Excellent. Now we're rendering home and about. We have the home component rendered right there. Perfect.

```js
test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole, getByText, debug} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  debug()
})
```

[02:29] Let's go ahead and assert that we are on the home screen, so expect `getByRole` heading `toHaveTextContext` home. Then, we need to fire an event to click on the about link. Let's bring in and `fireEvent`. Come back down here and fire event `click` get by text about and we'll assert that the heading now is about.

```js
test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})
```

[02:54] Get rid of that `debug` statement and save this and our test is passing. You know what? Let's just put that debug back in so we can observe what is going on between these clicks. The first time, we have the link showing up every time that's our nerve and then this is the contents.

[03:11] We're on the home page then we click on the link and now we are on the about page. Perfect.

In review, the tricky part of this is that when you try to render React or outer DOM components like link and switch and route, those need to access the context of that as exposed by a React `Router` component.

[03:28] If you just simply try to render this `Main` outside of a `Router` context, then it's not going to work. You're going to receive that error that we got. The trick is that you render the `Main` component within a `Router`.

[03:40] This is a really common problem that you'll have any time you have a component that requires some context, you need to render that component with the context provider. In our case, that's the `Router`. Let's go ahead and clean this up by getting rid of the `debug`. We'll save that and have a nice clean test that's passing here.
