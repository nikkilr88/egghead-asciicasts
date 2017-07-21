We have this small application here which when provided a user name will access the GitHub API and display this user card. Inside this `Profile` component, we're using some internal state and we're making the API call inside one of the lifecycle hooks.

As a demonstration of how to use `Redux` with `Preact`, we'll refactor this to no longer use internal state and we'll also remove this fetch call from here, and we'll be able to place this in a separate file.

That will be possible because we'll no longer have to update the state in this manner, 

####Profile.js
```javascript
...
this.setState({
	user,
	loading: false
})
...
```
because we'll have a global store where all of that happens in a single place. To get started, let's switch over to the command line, and we need to install three packages.

We'll say `yarn add`, and we'll bring in `redux` -- we'll use `redux-thunk` to handle the async API call -- and then `preact-redux`. Once they're installed we'll go back to the editor, and we'll bring in the libraries we just installed. We'll `import provider from preact-redux`. This is just as you would do it if you're using `React`, it's just a preact specific version of it. Then we'll also bring in `thunk from redux-thunk`, `createStore`, and `applyMiddleware` from `Redux`. 

####Index.js
```javascript
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
```

Next, we'll create a `reducer` function that will handle updates to our store. If we `import reducer from ./reducer`, 

```javascript
import reducer from './reducer';
```

and then create that file, we can `export default function` that takes in `state` and the current `action`. We'll `return state`, and we'll provide a `switch` statement and say for `actions.type`, `userFetch`, we'll simply return a new object that has a `user: null` and the `loading: true`.

####reducer.js
```javascript
export default function (state,action) {
	switch(action.type) {
		case 'USER_FETCH':
			return {
				user: null,
				loading: true
			}
	}
	return state;
}
```

In the case that the user is fetched correctly, we'll say that this is fulfilled, we'll set the user equal to the `action.payload`, and `loading` will be `false`. The `default` case will be to return the state.

```javascript
export default function (state,action) {
	switch(action.type) {
		case 'USER_FETCH':
			return {
				user: null,
				loading: true
			}
		case 'USER_FULFILLED':
			return {
				user: action.payload,
				loading: false
			}
		default: return state;
	}	
	return state;
}
```

Now, we have our reducer, so we can go ahead and create the `store`. We'll say `const store = createStore`. We'll pass in the `reducer` we just created. Our initial state will be `loading: true`, and `user: null`. There's a third argument we'll call `applyMiddleware` from `redux`, and we'll pass in `thunk`.

####index.js
```javascript
import reducer from './reducer';

const store = createStore(reducer, {
	loading: true
	user: null
}, applyMiddleware(thunk))
...
```

This will allow us to do some asynchronous things later on. OK, we have the `store`, and we'll just move `import app` below `import reducer`. Now we'll change the `render` method and wrap our `app` inside a `<div>`. Then we'll use the `Provider` component from `preact-redux`, we'll pass the `store` as a `prop`.

```html
...
render((
	<div>
		<Provider store={store}>
			<App />
		</Provider>
	</div>
), document.querySelector('main'));
```

Now any component rendered within this component will have access to the `store` should they request it. We hit save now, we should see everything still working.

![Still working](../images/react-define-functional-components-in-preact-the-result.png)

Now we can go ahead and update the `Profile` component to use the store.

The first thing we can do is remove this `constructor` in `Profile.js` now, because it won't be needed at all. Next, this section, all of `fetch`, can be extracted into a separate function. Let's create a file called `actions.js` and we'll just `export` a `function` called `fetchUser`.

This will receive the `username`, and then it will `return` a `function`, and thanks to the `redux-thunk` middleware, we'll have access to the `dispatch` function in here.

####actiion.js
```javascript
export function fetchUser (username) {
	return function(dispatch) {

	}
}
```

Then we can paste in the code that we copied from our class before, and instead of setting the state like this, we can instead `dispatch` an action to be of type `USER_FULFILLED`, and it will have a `payload: user`.

```javascript
export function fetchUser (username) {
	return function(dispatch) {
		fetch('https://api.github.com/users/${username}')
			.then(resp => resp.json())
			.then( user => {
				dispatch({type: 'USER_FULFILLED', payload:user})
				})
				.catch(err => console.error(err));
	}
}
```

Just before this Ajax call happens, we'll dispatch the action `userFetch`. That will allow our user interface to update to a loading state.

```javascript
export function fetchUser (username {
	return function(dispatch) {
		dispatch({type: 'USER_FETCH'})
	...
	}
})
```

Now, back in the profile component, we need to now connect `Profile.js` to the `Redux store`. To do so, we'll bring in the `connect` method from `preact-redux`, and then we'll call `connect` and with the function it returns, we'll pass in our `Profile` component. 

####Profile.js
```javascript
import { connect } from 'preact-redux';

...

export default connect()(Profile);
```

Now, to this `connect` method, we can provide a function that will `map` values in the global store onto this component's `props`.

We call that `mapStateToProps`. It gets access to the entire state tree, and whatever you `return` on the left, those properties will be available as `props` in the component.

```javascript
...
const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		user: state.user
	}
}

export default connect()(Profile);
```

The second function will be `mapDispatchToProps`. Inside of here, we have access to the `dispatch` method. Anything we return on this object will be `mapped` onto the component's `props` too. So the component will be able to call this method `fetchUser` with a `username`, and then we dispatch the result of calling our `thunk` that we made in the other file, and it's been imported.

```javascript
...
const mapStateToProps = (state)
...
const mapDispatchToProps = (dispatch) => {
	return {
		fetchUser: (username) => dispatch(fetchUser(username))
	}
}
... 
```

Now we just need to pass in these two functions, `mapStateToProps` and `mapDispatchToProps`. 

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(profile);
```

Now in the component we need to make use of this `fetchUser` function. In the `componentDidMount`, we can call `this.props.fetchUser`, pass through the `username` which will be coming via the React router.

```javascript
...
componentDidMount() {
	const username = this.props.match.params.user;
	thisprops.fetchUser(username);
}
...
```
The final step is to switch from using the `state` in the render method to instead using `props`. So we can move `{loading, user}` as arguments in the `render` method, make it the sole argument, 

```javascript
render({loading,user})
```


hit save, and we can see it's working again. 

![Still working](../images/react-define-functional-components-in-preact-the-result.png)

As you can see, everything about Redux works just as you'd expect to with preact. The only real difference is you need to bring in the `preact-redux` library, rather than `react-redux`.