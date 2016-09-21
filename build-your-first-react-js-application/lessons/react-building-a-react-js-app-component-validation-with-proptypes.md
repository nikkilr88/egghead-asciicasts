One of the fundamental pieces of React is to be able to build components and to be able to have those **components be reusable throughout your entire application**. Part of making your components reusable is making sure that these props that we pass in the component have `propType` validation on them. What I mean by that, is when we use `UserProfile`, our `UserProfile` component will be pretty worthless if we don't give it a `username`, and if we don't give it a `bio`. The same thing with `repos` and with `notes`.

If we come in here and we just render the `Notes` component list this, it's going to break because the `Notes` component is very reliant upon this `username` and upon these `notes`. 

**components/Profile.js**
``` javascript
<Notes notes={this.state.notes} />
```
What we can do, and a feature that React gives us is this idea of `propTypes`. If we head over to our `Repos.js` file, what we can do is as a property on a `createClass` object, we can come in here and add `propTypes`.

**Github/Repos.js**
``` javascript
var Repos = React.createClass({
	propTypes: {

	},

	...

)}
```
Basically what this is going to allow us to do, is it's going to allow us to **validate the props** that are being passed in to make sure that they're the right type, and also if we want them to be required, we can also specify that as well. So looking at how the `Repos` component is being used, you'll notice here we're passing in `username` and we're passing in a `repo`. So what we're going to do is on `propTypes` we're going to say the `username` is `React.PropTypes`. It's going to be a `string`, and we want that to be `.isRequired`. Then with repos again `React.PropTypes`, this is now going to be an array, and it's going to be `.isRequired`. 

**Github/Repos.js**
``` javascript
propTypes: {
	username: React.PropTypes.string.isRequired,
	repos: React.PropTypes.array.isRequired
},
```
We don't have to have it required, but as we talked about earlier when we use repos, we basically need a `username` and a `repos` array for this, so let's go ahead and now when we render our `Repos` component, let's go ahead and take out `username` and let's see what happens. 

**components/Profile.js**
``` javascript	
<Repos repos={this.state.repos}/> 
```

Now you'll notice we get this warning, "Failed `propType` required `username` was not specified in `repos`."

**console**
```
// Warning: Failed propType: Required prop 'username'
// was not specified in 'Repos'. Check the render method of 
// 'Profile'.
```
Because we said this `username` needs to be required, it threw an error. So we come back here and instead of throwing in a string, let's go ahead and throw in an array, and remember we said it needs to be a string, and it needs to be required. 

**components/Profile.js**
``` javascript
<Repos username={[]} repos={this.state.repos}/> 
```
So what's going to happen is this is going to throw another error, and say, hey, you gave us an array and we actually needed a string. So again this whole idea of `propType` or type checking makes it so that our components are being used in the way that we intend for them to be used.

**console**
```
// Warning: Failed propType: Invalid prop 'username'
// of type 'array' supplied to 'Repos', expected string. Check 
// the render method of 'Profile'.
```
Let's go ahead and go over to `userProfile`, and let's add some prop checking here. So again, check out `propTypes` which is an object and we want the `username` to be `react.propTypes.string`, it `isRequired`, and then `bio` is same thing, `react.propTypes` it's going to be an object that `isRequired` for this component to function correctly.

**Github/UserProfile.js**
``` javascript
var UserProfile = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		bio: React.PropTypes.object.isRequired
	},

})
```
Then let's go ahead and head over to `Notes`, and again `notes` we're going to set up `propTypes` and the `username` that we're passing in as always is a `string` that `isRequired`, this component also needs `notes` that is an `array` that `isRequired`. 

**Notes/Notes.js**
``` javascript
var Notes = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		notes: React.PropTypes.array.isRequired
	}
```
All right, so let's go ahead and run this and make sure everything's working well. Perfect. Let's test this one more time, let's go to our `notes`, let's go ahead and take off notes and this should throw an error.

There we go, `Failed propType`. So everything is working correctly, but now what we've done is we've made the `userProfile`, the `repos`, and the `notes` component all validate that they're being used correctly.