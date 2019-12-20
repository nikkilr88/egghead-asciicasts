Instructor: [00:00] The component that's using this `Query` component is actually a `class` component itself, `User`. It's keeping track of a `filter` state and it needs to get the context and it needs to get the `GitHubContext` just like our `Query` component did.

### user/index.js
```js
class User extends Component {
  static propTypes = {
    username: PropTypes.string,
  }
  static contextType = GitHubContext
  state = {filter: ''}

...
}
```

[00:14] Let's go ahead and change this to use hooks. I'm just going to make a `function` called `User` and that's going to take our props. We're only taking `username` and that does not have a default, but we do have some `propTypes` here so I'll take those out. We'll say user dot `propTypes` equals that.

```js
function User({username}) {

}
User.propTypes = {
  username: PropTypes.string,
}
```

[00:29] Then let's take care of this `GithubContext`, so we're going to `const client = useContext(GithubContext)`. Let's pull in `useContext` from React. I also noticed we're going to want `useState`, so I'll just pull that in here while I'm up here.

```js
import {Component, useState, useContext} from 'react'

function User({username}) {
  const client = useContext(GitHubContext)
}
```

[00:48] Next, let's go ahead and use that `state`. We're taking care of this context. We'll take care of this state now. We just have one item of state, so I'm going to say `filter` and `setFilter` equals `useState`. We'll initialize it to the same value that we were initializing it to before. We've taken care of state initialization.

```js
function User({username}) {
  const client = useContext(GitHubContext)
  const [filter, setFilter] = useState('')
}
```

[01:07] Then we want to `handleFilterUpdate`. That actually is a function that accepts the `filter` and sets the `filter` value. That looks suspiciously like the `setFilter`. We actually don't need to have a `handlFilteUpdate`. If we did then we could just move this right up and make this a const and then use it as we had before. Change this to `setFilter` with that `filter`.

```js
function User({username}) {
  const client = useContext(GitHubContext)
  const [filter, setFilter] = useState('')
  const handleFilterUpdate = filter => {
    setFilter(filter)
  }
}
```

[01:29] That would work just as well, but that's basically just a pass through function, so it's worthless. Let's just get rid of it. 

```js
function User({username}) {
  const client = useContext(GitHubContext)
  const [filter, setFilter] = useState('')
}
```

Next, we have just our `render`. That's all that's left. What I'm going to do is I'm going to take this `return`, the first one in our  `class User`, all the way down to this closing parentheses, cut it out, and we'll put it right up in our `function User`.

```js
function User({username}) {
  const client = useContext(GitHubContext)
  const [filter, setFilter] = useState('')
  return (
    <Query
      query={userQuery}
      variables={{username}}
      normalize={normalizeUserData}
    >
      {({fetching, data, error}) =>
        error ? (
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
                    onClick={this.context.logout}
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
    </Query>
  )
}
```

[01:47] Then I can get rid of the `User` class entirely. I'll hit save here. Now the last thing that we need to do to make sure that everything is working is look for `this.`. If you find `this.` anywhere in a component that should be a function component, then you've got a problem there. You missed something in your refactor.

[02:07] That's what we did. We missed `this.context.logout`. What I'm actually going to do is I'll just get rid of `this.context`. This `logout` is going to come from `client` here, so I'll just destructure that and `logout`. 

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
    </Query>
  )
}
```

[02:19] Let's look for `this.`. There's another one in our `<RepoFilter />`. This is that function that we saw that was totally useless, so we're going to say `setFilter` and this on update is just going to call our `setFilter` with the new filter. Now let's look for `this.` again. Looks like we are totally good to go. We can get rid of this `Component` import now and let's make sure that everything is working.

[02:39] I'm just going to go check `Kent C. Dodds` on our website. Go, loading our data. There it is. It's all working just like it was before, except it is using arguably a simpler function component. We have our context, we have our state, and we have our JSX that we're rendering.
