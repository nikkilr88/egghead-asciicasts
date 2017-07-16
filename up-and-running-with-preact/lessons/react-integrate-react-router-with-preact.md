Here is an application that is currently using the `preact-router`. We have a `home` component that is loaded when we hit the home page. We have a `profile` page that receives a `user` prop. We have an `error` page should we visit a path that is not listed in any of these components.

####App.js
```html
export class App extends Component {
  render() {
    return (
      <div class="app">
        <Router>
        	<Home path="/" />
         	<Profile path="/profile/:user" />
         	<Error default />
        </Router>
      </div>
    );
  }
}
```

Now, if we wanted to continue using Preact for its speed and small file size, but we wanted to use the `react-router`, which is the most popular router from the React community, then we can do that. We just need to change a couple of things in our application.

The first thing we need to do is install `preact-compat`. We're over on the command line. We can type, `yarn add preact-compat`. Whilst we're here we'll also install `react-router-dom`. 

####Terminal
```bash
$ yarn add preact-compat react-router-dom
```

Now we need to add an alias in our webpack configuration. We'll add `resolve`, `alias`, and then we'll alias both `react` and `react-dom` to `preact-compat`.

####webpack.config.js
```javascript
...
resolve: {
	alias: {
		'react': 'preact-compat',
		'react-dom': 'prect-compat',
	}
}

devtool:
...
```

Inside the `react-router` library it's going to expect to be able to bring in `react`, so by providing `react` and `react-dom`, when they attempt to do that, webpack will switch out react with `preact-compat`, which has all the little bits in there to make other libraries think that `preact-compat` is actually `react`, such as prop types and things like that.

We add this alias, solely for the purpose of the `react-router` library. Now let's go back to our App and start using `react-router`. The first thing we'll do is change this import. Instead of using `preact-router`, change that for `react-router-dom`. We'll want the browser router. We'll also need a few more components from this library. We'll need `route` and `switch`. Now we can redefine our paths and components in a way that `react-router` understands. 

####App.js
```javascript
import { BrowserRouter as Router,
	Route,
	Switch 
} from 'react-router-dom';
```

Let's delete Home, Profile, and Error, and start again. We'll wrap these in a `switch` component, as we only ever want to render one of them at a time. Now, for each path we have, we will use a route component. For the home page, we want to match the `exact` `path` of `/` and when this matches we'll load the `component={home}`.

```html
... 
<Router>
	<Switch>
		<Route exact path="/" component={Home} />
	</Switch>
</Route>
...
```

We'll follow the same pattern for profiles, except we don't want exact. We'll provide profile, call end user, so that we can get the username from the URL. We'll provide the profile component.

```html
... 
<Router>
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path ="/profile/:user" component={Profile} />
	</Switch>
</Route>
...
```

Finally, for the `Error` page or the 404 page, we can provide it here and then just remove the path altogether. 

```html
... 
<Router>
	<Switch>
		<Route exact path="/" component={Home} />
		<Route path ="/profile/:user" component={Profile} />
		<Route component={Error} />
	</Switch>
</Route>
...
```

The switch will handle this for us. If the profile or home component don't match, the error component will load. When we reload the page, we can see that everything appears to be working. But we're not quite there yet. Let's try it out and see what happens.

Type `shakyshane` into the input box, hit enter, and we get nothing. Let's open up the home component, see what's happening. The Preact router gives us a route function that allows us to navigate from anywhere in our application. We don't have that with `react-router`. What we do have is a higher-order component that we can use to wrap this `Home` component and it will give it access to the router.

We'll change `react-router` to `react-router-dom` and we'll get hold of `withRouter`. 

####Home.js
```javascript
import { withRouter } from 'react-router-dom';
```

Now let's wrap this home component. We'll change this to instead say `const Home` is equal to the result of calling this higher-order component with our component, `const Home = withRouter`. This is a function, so the arrow here. This will give us access to the `router`. That means we can pass it into the search function as the first parameter. Then we can change the signature to accept the router. We'll change this to instead be `router.history.push`. Here, we are interacting with the react-router directly. Finally, if we `export` this as a `default`, and see what happens when we hit Save.

```html
function search(router, query) {
  if (query !== '') {
    router.history.push(`/profile/${encodeURIComponent(query)}`);
  }
}

const Home = withRouter((router) => {
  return (
    <section>
      <p>Enter a Github Username</p>
      <input type="search"
             placeholder="eg: shakyshane"
             onSearch={e => search(router, e.target.value)}
             />
    </section>
  );
});

export default Home;
```

Again, we'll type `shakyshane` into the input box, hit Enter, and you can see we don't get the result we expect. 

![Unexpect Result](../images/wrong-result-react-integrate-react-router-with-preact.png)

Which is fine, because at least we navigated to the right place and we know we're almost there. Now let's go into the profile component and figure out why we're not getting what we expect here.

The reason we're getting David and not Shaky Shane is that the way in which `react-router` gives you access to the properties or to the matches in the path is different to how it works in `preact-router`. But this is an easy fix. Let's just say `const username = this.props` and `react-router` gives us a `match`. From that we can say on the `params` give me the `user`.

####Profile.js
```javascript
...
componentDidMount () {
	const username = this.props.match.params.user;
	fetch ....
...
}
```

You can see that this maps on to what we provided in the `Route` path in App.js. Now we can substitute `this.props.username` for `username` in `fetch`. Save. 

```javascript
...
componentDidMount () {
	const username = this.props.match.params.user;
	fetch('htts://api.github.com/users/${username}')
...
}
```

When it reloads there, you can see it's correctly accessing `profile/shakyshane` segment of the URL, pull in GitHub's API, and load in the profile component as we expected. 

![Working as Expected](../images/react-define-functional-components-in-preact.png)

To finish this lesson, let's check that the error or the 404 page is working correctly. If we hit a URL that doesn't match any paths that we've defined, you can see we do get the error component. But if we click home now, you can see that that actually reloaded the page. It didn't navigate internally within the app. Now let's go into the error component and see why that is.

The `preact-router` hijacks any links on the page like this and makes it seamlessly work with the router. But with `react-router`, we need to bring in another component called `Link`. We'll replace this anchor, `a` with a `Link` and we say `to`, and that should be enough.

####Error.js
import { h } from 'preact';
import { Link } from 'react-router-dom';

export default function Error() {
	return (
	<div>
		<p>Error!</p>
		<p><Link to="/">Home</p>Link></p>
	</div>
	)
}

Behind the scenes, `react-router` will replace `Link` with a regular anchor link. You hit Save, try and access a page that doesn't exist again, we get the error, and if we click Home, you can see we were navigated immediately back to the home page.

To recap, you can absolutely use `Preact` with `react-router`. You just need to add those few lines in your webpack configuration and then you can use the router exactly as you would with React.