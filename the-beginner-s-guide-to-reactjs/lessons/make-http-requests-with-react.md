This is our starting app. 

```javascript
const usernmae = 'kentcdodds'
const element = (
    <div>
        <div>
            {`@${username} works at `}
            ... some company
        </div>
    </div> 
)
ReactDOM.render(
    element, 
    document.getElementById('root'),
)
```

We'll start out with a `class` called `UserCompany`. That `extends React.Component`. Then that'll have a `render` method. We're going to say `return this.state.company || 'Unknown'`. Then we'll go ahead and initialize our `state` here with `{company: undefined}`.

Then we'll use that `UserCompany` inside of our second `<div>`, and we'll pass the `username` prop. 

```javascript
class UserCompany extends React.Component {
    state = {company: undefined}
    render() {
        return this.state.company || 'Unknown'
    }
}
const username = 'kentcdodds'
const element = (
    <div>
        <div>
            {`@${username} works at `}
            <UserCompany username={username} />
        </div>
    </div> 
)
ReactDOM.render(
    element,
    document.getElementById('root'),
)
```

We'll use that later, and get rid of to. Next, we're going to do a `componentDidMount`, and we're going to need the Axios library.

I'm going to go ahead and paste a `<script>` for the Axios library.

```html
<script type="https://unpkg.com/axios@0.16.2/dist/axios.min.js"></script>
```

We're going to make a request in `axios` with a couple options. Our `url` is going to be `https://api.github.com/graphql`. Then the `method` will be `post`.

The `data` will be `query` as a string. This is going to look like an object, but it's a GraphQL query. We'll say ``user(login: `${this.props.username}` ``, and we're going to get the `company` for the user that we pass in here.

```javascript
class UserCompany extends React.Component {
    state = {company: undefined}
    componentDidMount() {
        url: 'https://api.github.com/graphql',
        method: 'post',
        data: {
            query: `{
                user(login: `${this.props.username}` {
                    company
                })
            }`
        }
    }

    render() {
        return this.state.company || 'Unknown'
    }
}
```

Then we need to add `headers` for authentication. We'll say `Authorization` and `bearer TOKEN`. 

```javascript
class UserCompany extends React.Component {
    state = {company: undefined}
    componentDidMount() {
    axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        data: {
            query: `{
                user(login: `${this.props.username}`) {
                    company
                }
            }`,
        },
        headers: {Authorization: `bearer TOKEN`},
    })
    ...
}
```

We need to get that token from somewhere. We'll go to GitHub, and go to settings. We'll go to our developer settings, personal access tokens.

We'll generate a new [token](https://github.com/settings/tokens/new). We'll call this `UserCompany`, and we only need the user `readuser`. We'll generate that token and copy that. Then we'll paste that into our `Authorization:`. Now, when that request finishes, we'll say `.then` we'll take the `response`, and we'll say `this.setState`. `company` is the `response.data.data.user.company`.

```javascript
class UserCompany extends React.Component {
    state = {company: undefined}
    componentDidMount() {
    axios({
        url: 'https://api.github.com/graphql',
        method: 'post',
        data: {
            query: `{
                user(login: `${this.props.username}`) {
                    company
                }
            }`,
        },
        headers: {
            Authorization: `bearer YOUR_GENERATED_TOKEN`
        },
    }).then(response => {
        this.setState({
            company: response.data.data.user.company,
        })
    })
}
```

Now, we get Kent C. Dodds works at PayPal. 

![Company rendered](../images/make-http-requests-with-react-company-rendered.png)

Let's go ahead and say that the request takes a little bit of time. We see that blinks `unknown` really quick there.

It's not that it's unknown. It's that we don't know it yet. We haven't completed the request, so we're going to add just `loaded: false` to our state here. Then when we set the state, we can say `loaded: true`. Then we'll say `this.state.loaded`.

If it's loaded, then we'll do this. Otherwise, we'll do dot-dot-dot. 

```javascript
class UserCompany extends React.Component {
    state = {company: undefined, loaded: false}
    componentDidMount() {
        axios({
            url: 'https://api.github.com/graphql',
            method: 'post',
            data: {
                query: `{
                    user(login: `${this.props.username}`) {
                        company
                    }
                }`,
            },
            headers: {
                Authorization: `bearer YOUR_GENERATED_TOKEN`
            },
        }).then(response => {
            this.setState({
                loaded: true
                company: response.data.data.user.company,
            })
        })
    }
    render() {
        return this.state.loaded ? this.state.company || 'Unknown' : '...'
    }
}
```

Now, we get the dot-dot-dot, and then @PayPal. 

In review, to make an asynchronous request, you're going to use `componentDidMount`. You can use a library like `Axios` to make a request, and when that request resolves, you `setState`. Then you `render` that `state` in your `render` method.

Now, if there happened to be an error with this request, then we could add an `error` handler. In here, we could say `this.setState` with `error` and `loaded: true`. Then we could reference this.state.error in here, and do something different in the error case.

```javascript
class UserCompany extends React.Component {
    state = {company: undefined, loaded: false}
    componentDidMount() {
        axios({
            url: 'https://api.github.com/graphql',
            method: 'post',
            data: {
                query: `{
                    user(login: `${this.props.username}`) {
                        company
                    }
                }`,
            },
            headers: {
                Authorization: `bearer YOUR_GENERATED_TOKEN`
            },
        }).then(response => {
            this.setState({
                loaded: true
                company: response.data.data.user.company,
            })
        }, error => {
            this.setState({
                error, 
                loaded: true,
            })
        })
    }
    render() {
        return this.state.error ? this.state.loaded 
        ? this.state.company || 'Unknown' 
        : '...'
    }
}
```

