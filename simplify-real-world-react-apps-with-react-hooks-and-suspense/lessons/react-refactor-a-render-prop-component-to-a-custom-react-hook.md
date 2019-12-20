Instructor: [00:01] Now, this `Query` component is a render prop API. That makes it really nice, because we can declaratively use this `Query` component, passing our query variables and our normalize function, and then get the state and render based off of that state.

### user/index.js
```js
function User({username}) {
  const {logout} = useContext(GitHubContext)
  const [filter, setFilter] = useState('')
  return (
    <Query
      query={userQuery}
      variables={{username}}
      normalize={normalizeUserData}
    >
      {({fetching, data, error}) =>
        ...
      }
    </Query>
  )
}
```

[00:15] It's a really nice API, but it is a little bit nested. What if we could actually turn this `Query` into a custom hook? This `Query` isn't actually rendering anything. What if, instead of calling the children prop that we're passing it, it actually just returned these items of state, `fetching`, `data`, `error`?

[00:32] Let's take a look at what that might look like. We're going to need these items of state. We'll just pull these three things out right here. I'll say `const` those. We'll destructure those off of `useQuery`, and then we'll want to pass all of these values to `useQuery`.

[00:45] We'll just JavaScriptize those really quick. `variables` will be an object, and then our `normalize` will be this `normalizeUserData`. 

```js
function User({username}) {
  const {logout} = useContext(GitHubContext)
  const [filter, setFilter] = useState('')

  const {fetching, data, error} = useQuery({
    query: userQuery,
    variables: {username},
    normalize: normalizeUserData,
  })

  ...
}
```

Cool, and then with that, let's take this error all the way down to this closing parentheses right above our closing `</Query>` tag. We'll cut out our entire `<Query>` tag and past in that `return error`. Wow, that's a lot less nested. It's actually quite a bit easier to read. If we had multiple of these `render` prop-based APIs, we could maybe change them to be hooks as well, and have even less nesting.

```jsx
function User({username}) {
  const {logout} = useContext(GitHubContext)
  const [filter, setFilter] = useState('')

  const {fetching, data, error} = useQuery({
    query: userQuery,
    variables: {username},
    normalize: normalizeUserData,
  })

  return error ? (
    <IsolatedContainer>
      <p>There was an error loading the data</p>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </IsolatedContainer>
  ) : fetching ? (
    <LoadingMessagePage>Loading data for {username}</LoadingMessagePage>
  ) : data ? (
    <UserContext.Provider value={data}>
      <Container>
        <Row>
          <Column width="3">
            <Profile />
            <PrimaryButton
              css={{marginTop: 20, width: '100%'}}
              onClick={logout}
            >
              Logout
            </PrimaryButton>
            <ButtonLink css={{marginTop: 20, width: '100%'}} to="/">
              Try another
            </ButtonLink>
          </Column>
          <Column width="9">
            <Text size="subheading">Repositories</Text>
            <RepoFilter filter={filter} onUpdate={setFilter} />
            <RepoList filter={filter} />
          </Column>
        </Row>
      </Container>
    </UserContext.Provider>
  ) : (
    <IsolatedContainer>I have no idea what's up...</IsolatedContainer>
  )
}
```

[01:18] Our tree would be a lot smaller, which would be good, too. Sweet. Let's go ahead and make this happen. I'm going to take this `useQuery`, I'm going to scroll up here to the top, where I'm importing `Query`, and I'm going to do a named import for `useQuery`.

```js
import {useQuery} from './components/query'
```

[01:31] Now, let's go back to our `Query` component here, and let's make this a custom hook. Instead of `Query`, we're going to do `useQuery`. Instead of `children`, we're going to just simply return the `state`. Then we can have export `{useQuery}`.

### components/query.js
```js
function useQuery({query, variables, normalize = data => data}) {
  ...

  return state
}

export default Query
export {useQuery}
```

[01:50] Now, we probably aren't going to be able to refactor our entire application to be using this new custom `useQuery`. We probably will still have some areas of the application that need to have a render prop-based API of this `Query` component.

[02:04] Let's go ahead and make that. We'll just say const `Query` equals a function component that has `children`. Then it takes a bunch of other `...props`, as it was before. Here, we'll just call `children` with `useQuery` `props`.

```js
const Query = ({children, ...props}) => children(useQuery(props))

export default Query
export {useQuery}
```

[02:17] That's identical to what we had before. We've done a simple refactor. Nothing has changed for the users of this `Query` component. If we save that, we can even take a look at our tests, and our tests are still passing as well.

[02:31] Our tests are actually using our `Query` component. Actually, this is the way that I prefer to test custom hooks, is by creating a render prop-based API out of them, and then rendering that render prop-based API, and testing it like a regular React component.

[02:49] In review, to make this work, we went to our `User` situation. We took all the contents of the `children` prop, the things that we were returning from our children function, and we simply returned our `<IsolatedContainer>`. Then we got the data we needed from the `useQuery`, from the custom hook version of our render prop-based component.

[03:08] We plucked off the data that needed in our render, and we provided as an object, the options that this custom hook needs. Then to make that work in our custom hook, we simply rename this to `useQuery`. We removed the `children` prop, and we treated this as a regular options object.

[03:26] Then instead of returning a call to `children` and passing the `state`, we simply return the state. Then to make this easier to test, and to ensure other places in the application can continue to use the render prop-based `Query` component, we created a very simple render prop-based `Query` component that simply uses the `useQuery` hook.
