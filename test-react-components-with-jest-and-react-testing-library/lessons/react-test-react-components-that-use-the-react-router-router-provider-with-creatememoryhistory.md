Kent C Dodds: [00:00] Here, we have this `Main` component that's rendering a `Link`, a `Switch`, and a `Route`, all from `react-router-dom`. We want to be able to test this `Main` component so that I can click on the `Link` and have that render the `Home` component. I click on this `<Link to="/about">`, it renders the `About` component, and if I go to a `Route` that isn't supported, I go to this `NoMatch` component.

### main.js
```jsx
import {Switch, Route, Link} from 'react-router-dom'

const About = () => (
  <div data-testid="about-screen">You are on the about page</div>
)
const Home = () => <div data-testid="home-screen">You are home</div>
const NoMatch = () => <div data-testid="no-match-screen">No Match</div>

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

[00:20] In `react-router.js`, let's go ahead and `import React from 'react'`. We'll `import {render} from 'react-testing-library'`, and then we'll `import {Main} from '../main'`. I'm going to `test` that `'main renders about and home and I can navigate to those pages'`

### react-router.js
```jsx
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render} from 'react-testing-library'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {

})
```

[00:42] First thing I'm going to do is I'll `render(<Main />)`. I'm going to `getByTestId`, which is how I'm going to know which page I'm looking at. I also want to be able to click on the `Link` components, so I'll `getByText`.

[00:57] I should be rendering the `Home` page right from the start. I'm starting on the path of `/` so it should render my `Home`. I'm going to add an assertion to `expect(getByTestId('home-screen').toBeInTheDocument()`.

[01:12] Then I'll `fireEvent.click(getByText())`. We want to click on this `<Link to="/about">`, so I'll `getByText(/about/i)`. We're going to need that `fireEvent` from `react-testing-library`. Then I'll `expect(getByTestId('about-screen').toBeInTheDocument()`.

### react-router.js
```jsx
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {Main} from '../main'

test('main renders about and home and I can navigate to those pages', () => {
  const {getByTestId, getByText} = render(<Main />)
  expect(getByTestId('home-screen').toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(getByTestId('about-screen').toBeInTheDocument()
})
```


[01:32] I could also verify that the `Home` screen has been removed, so `.not.toBeInTheDocument`. If we're going to do that, then we need to get the `queryByTestId`. For good measure, I'll do the same here, `queryByTestId` `.not.toBeInTheDocument`.

```jsx
test('main renders about and home and I can navigate to those pages', () => {
  const {getByTestId, queryByTextId, getByText} = render(<Main />)
  expect(getByTestId('home-screen').toBeInTheDocument()
  expect(queryByTestId('about-screen').not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen').not.toBeInTheDocument()
  expect(getByTestId('about-screen').toBeInTheDocument()
})
```

[01:51] We've got a pretty good test here. Let's go ahead and open up our test. Wow, we've got a bunch of errors. Here's the problem. When you render a component that uses `Link`, `Switch`, or `Route` from `react-router-dom`, these components are going to be looking for a `Router` in the tree. We don't have a `Router` in the tree.

[02:09] This is a really common problem for components that use `react-router-dom` components. We need to render this within a React `Router` so they have access to the React `Router` context. Let's go ahead and do that.

[02:20] We'll `import {Router} from 'react-router-dom'`. Normally, you're going to be using a `BrowserRouter`, but we're going to use `Router` directly so that we can provide our own `history` object. We `import {createMemoryHistory} from 'history'`. Then we'll create our `history` from `createMemoryHistory`. Here, we can specify our `initialEntries`.

```jsx
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByTestId, queryByTextId, getByText} = render(<Main />)
  expect(getByTestId('home-screen').toBeInTheDocument()
  expect(queryByTestId('about-screen').not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen').not.toBeInTheDocument()
  expect(getByTestId('about-screen').toBeInTheDocument()
})
```

[02:44] I'll say our `initialEntries` are /, so that we start out on the `Home` screen. Then we'll take this `Main` and we'll actually render it in a `Router` that has the `history` object `history`. We'll render `Main` inside of that `Router`. We'll save here, pop open our tests. Our tests are working.

```jsx
test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByTestId, queryByTextId, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByTestId('home-screen').toBeInTheDocument()
  expect(queryByTestId('about-screen').not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen').not.toBeInTheDocument()
  expect(getByTestId('about-screen').toBeInTheDocument()
})
```

[03:02] Let's make sure that they can break. I'll remove this `not` here, and perfect. Our assertions are running.

[03:09] In review, the reason that we had to render the `Main` within the `Router` is because `Main` is using components that rely on a `Router`'s context to be rendered into the tree so we can render that `Router` ourselves.

[03:22] We're using `react-router-dom`'s `Router` component, which is the base component here, so that we can provide our own `history`. That history is a `createMemoryHistory`. It's a history that lives in memory. It's not actually a browser history. We have some fine-grained control over the `initialEntries` for our history, so we can start out on any page that we like.

[03:40] With that `history`, we render that `Router` with that `history`, then render the `Main`, and all of the components inside of `Main` are going to work. Then we made a couple of assertions for whether the `Home` screen or `About` screen appear on the page.

[03:54] We click on the `<Link to="/about">`, and then we verify that the `Home` screen is no longer rendered, and that the `About` screen is rendered.
