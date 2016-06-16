One of the fundamental pieces of **React** is to be able to **build components** and to be able to have those components be **reusable** throughout your entire application. Part of making your components reusable is making sure that these **props** that we **pass** in the component have **prop type validation** on them. What I mean by that, is when we use `user` profile, our user profile component will be pretty worthless if we don't give it a `username`, and if we don't give it a `bio`. The same thing with `repos` and with `notes`.

If we come in here and we just render the `notes` component list this, 

### Profile.js
``` javascript
username={this.props.params.username}
```
it's going to break because the `notes` component is very reliant upon this `username` and upon these `notes`. 

### Profile.js
``` javascript
notes={this.state.notes}
```
What we can do, and a feature that React gives us is this idea of **propTypes**. If we head over to our `repos.js` file, what we can do is as a property on a **createClass** object, we can come in here and add **propTypes**.

### Repos.js
``` javascript
var Repos = React.createClass({
	propTypes: {

	},
```

Basically what this is going to allow us to do, is it's going to allow us to **validate** the props that are being **passed** in to make sure that they're the **right type**, and also if we want them to be **required**, we can also specify that as well. So looking at how the `repos` component is being used, you'll notice here we're passing in `username` and we're passing in a `repo`. So what we're going to do is on `propTypes` we're going to say the `username` is `react.propTypes`. It's going to be a string, and we want that to be `required`.

Then with repos again `React.propTypes`, this is now going to be an array, and it's going to be `required`. 

### Repos.js
``` javascript
propTypes: {
	username: React.PropTypes.string.isRequired,
	repos: React.PropTypes.array.isRequired
},
```

We don't have to have it required, but as we talked about earlier when we use repos, we basically need a `username` and a `repos` array for this, so let's go ahead and now when we render our `repos` component, let's go ahead and take out `username` and let's see what happens. 

### Profile.js
``` javascript	
<Repos repos={this.state.repos}/> 
```

Now you'll notice we get this warning, "Failed **propType** required `username` was not specified in `repos`."

Because we said this `username` needs to be required, it threw an error. So we come back here and instead of throwing in a string, let's go ahead and throw in an array, and remember we said it needs to be a string, and it needs to be required. 

### Profile.js
``` javascript
<Repos username={[]} repos={this.state.repos}/> 
```

So what's going to happen is this is going to throw another error, and say, hey, you gave us an **array** and we actually needed a **string**. So again this whole idea of **propTypes** or type **checking** makes it so that our **components** are being **used** in the way that we **intend** for them to be used.

Let's go ahead and go over to `userProfile`, and let's add some prop checking here. So again, check out `propTypes` which is an object and we want the user name to be `react.propTypes.string`, it is `required`, and then `bio` is same thing, `react.propTypes` it's going to be an object that is **required** for this component to **function correctly**.

### UserProfile.js
``` javascript
var UserProfile = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		bio: React.PropTypes.object.isRequired
	},
```

Then let's go ahead and head over to `notes`, and again `notes` we're going to set up `propTypes` and the `username` that we're passing in as always is a string that is required, this component also needs `notes` that is an array that is required. 

### Notes.js
``` javascript
var Notes = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		notes: React.PropTypes.array.isRequired
	}
```

All right, so let's go ahead and run this and make sure everything's working well. **Perfect.** Let's test this one more time, let's go to our `notes`, let's go ahead and take off notes and this should throw an error.

There we go, `failed propType`. So everything is working correctly, but now what we've done is we've made the `userProfile`, the `repos`, and the `notes` component all **validate** that they're being **used correctly**.