We've talked a lot in this series how the **state** of these three components is being **managed** in this **outer profiles** component. 

![Main Component](./images/components.png)

What we're going to talk about in this video is how we can **manipulate the state** of an **outer component** from **inside** of **another** component. Specifically, this `addNote` component is what we're going to build.

Let's go ahead and head over to our `Profile.js` file. The biggest thing to remember is that you want to **manipulate** the state where that state **lives**. For example, this **state** of this `notes` is living in the `profiles` component, so what we want to do is we want a write a function inside of this `profiles` component, **pass** that function **down** to our **child** component, and then eventually invoke it.

Let's go ahead and write that very first function that we're going to pass down to our child component. We're going to call it `handleAddNote`. What it's going to do is it's going take in a new note, and then we are going to update Firebase with the new note.

### Profile.js
``` javascript
handleAddNote: function(newNote){
	// update firebase, with the newNote 
},
```
What's going to happen is, because we have **bound** our **note's state** to our `childRef` here, whenever we update this **endpoint**, those changes are automatically going to be **pushed through to our state**. 

### Profile.js
``` javascript
var childRef = this.ref.child(this.props.params.username);
this.bindAsArray(childRef, 'notes'); 
```

What's going to happen is we'll update Firebase. Those changes will be pushed through. The component will re-render, and then we'll have that brand new note.

Here, what we're going to do is we're going to say `this.ref.child` at `this.props.params.username`, because we **don't** want to **update** our **root ref**. Instead, we want to update the endpoint at our root `ref/`, whatever the username we're on is. Then we're going to go one level deeper. I'm going to say `.child(this.state.notes.length)`.

### Profile.js
``` javascript
handleAddNote: function(newNote){
	// update firebase, with the newNote 
	this.ref.child(this.pops.params.username).child(this.state.notes.length)
},
```

What's going to happen is we're eventually going to call `.set()`. What `.set()` does is, whatever we **pass in**, that's going to **replace the data** at this **location**. Or, if there's no data there, as in this case, it's going to **set that new data**.

There's a few ways to do this. Firebase also has a `.push()` method that we can use, but that's going to create its own `key`. Instead, we want to use the the key `012345`, or however many items are in the array. What I'm going to do now is we're going to pass in `newNote`.

Again, what's going to happen here is when this function's called, it's going to be given a new note, 

### Profile.js
``` javascript
this.ref.child(this.pops.params.username).child(this.state.notes.length).set(newNote),
```

and then we're going to go to `this.ref.child/TylerMcGinnis`, or `/whatever` username we're on. Then we're going to go to `/` however many items are in the array, and then we're going to set a brand-new item there to `newNotes`.

What that should do is that should just **append** this `newNote` to the end of our **Firebase**. What that will do is, because we have, up here, used `bindAsArray`, that's going to receive new data, and that's gong to **push** through to our note **state**, which then **updates the view**.

Now what we need is we need some way to get this `handleAddNote` down to our `notes` container so that we can create that button and invoke it there. As you guessed it, what we're going to do is **pass** it in as a **prop**. Let's say `addNote`, and it's going to be equal to `this.handle.addNote`.

### Profile.js
``` javascript
<Notes
	username={this.props.params.username}
	notes={this.state.notes}
	addNote={this.handleAddNote} /> 
```

Now let's head over to our `notes` component. Very first thing, let's go ahead and add a `propType`, because this is going to be `required`. For functions, you do you func, end is required.

### Notes.js
``` javascript
proptypes: {
	username: React.PropTypes.string.isRequired,
	notes: React.PropTypes.array.isRequired,
	addNote: React.PropTypes.func.isRequired,
}
```

As we talked about with the `NotesList`, we could go ahead and make this component a part of the `notes` component, or what we can do is just make it its own component, which I like a little bit better.

Let's go ahead and create a new file in our `notes` folder, and let's call it `addNote.js`. We're going to `require` react. We're going to create our component, using `react.createClass`. Then, as always, we're going to `export` it.

Here, let's go ahead and very first thing now we're going to do some type checking. It's going to take in a `username` which is a string, and it is `required`. It's also going to take in that `addNote` function that we're getting from our `profile` component. So, `PropTypes.func.isRequired`.

### AddNote.js
``` javascript
var React = require('react');

var AddNote = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		addNote: React.PropTypes.func.isRequired,
	}
});

module.exports = AddNote; 
```

Now let's go ahead and have a render function. What this is going to return is our **UI**, which a `div`. Let's give it a classname of `input-group`. Now what we want to do is we need an input field, and we also need a button that we can click to submit the new note.

Let's go and make our input field, `type=text`, classname is `form-control`, which is a Bootstrap thing. Let's also give it a placeholder of `addNewNote`.

### AddNote.js
``` javascript
var React = require('react');

var AddNote = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		addNote: React.PropTypes.func.isRequired,
	}
	render: function(){
		return (
			<div className="input-group">
				<input type="text" className="form-control" placeHolder="Add New Note" />
			</div> 
		)
	}
});

module.exports = AddNote; 
```

Now what we want to do is, if you'll remember, we have our `handleAddNote` function. We eventually want to give that a new note. That **new note** is going to be whatever we **type** into this **input field**. What we need is a way to get the value of this input field before we pass it to our `addNote` function.

What we're going to do is we're going to use this thing called a **ref**. 

### AddNote.js
``` javascript
<input type="text" className="form-control" placeHolder="Add New Note" ref={}/>
```

What a **ref** is is basically like a **name tag** that you give an input field, so that you can access that **specific value later**. The **ref** I'm going to give it, we're going to give it a function. Let's call that function note `setRef()`.

```javascript
ref={this.setRef}
```

Inside of this function, we are going to be passed the specific **ref**, and then we're going to take that **ref**, and then **add** it as a **property** on our **instance**. Later, we'll be able to query this **property**, and we'll be able to get the value of this specific **input field**.

### AddNote.js
``` javascript
var React = require('react');

var AddNote = React.createClass({
	propTypes: {
		username: React.PropTypes.string.isRequired,
		addNote: React.PropTypes.func.isRequired,
	},
	setRef: function(ref){
		this.note = ref; 
	},
	render: function(){
		return (
			<div className="input-group">
				<input type="text" className="form-control" placeHolder="Add New Note" />
			</div> 
		)
	}
});

module.exports = AddNote; 
```

Let's go ahead and make a button. One side note -- this app isn't very accessible. I'm big into accessibility, but for the sake of just learning React, we're going to ignore this for now, which is something you should never do. This button is going to have a type of `button`, and we are going to have an `onClick` handler.

Now what's going to happen is we want to run a certain function whenever someone clicks on this button. The function we're going to run, let's do `handleSubmit`. 
Then, up here, let's go ahead and make a `handleSubmit` method that doesn't do anything for now, until we finish off our button. Let's give it `Submit`, and then we'll close our button.

### AddNote.js
``` javascript
	<div className="input-group">
		<input type="text" className="form-control" placeHolder="Add New Note" />
		<span className='input-group-btn'> 
			<button className="btn btn-default" type="button" onClick={this.handleSubmit}>Submit </button>
		</span>
	</div> 
```

Now what we want to have happen is, whenever someone clicks on this button, we're going to grab the `value` from this input field and we're going to pass it to a function that we're eventually going to **pass down** as a **prop**.

Now what we want to do is finish off this `handleSubmit` function. The very first thing that we need to do is we need to go to our `input form`, and then we need to grab the `value` off of it and save that. I'm going to save `var newNote = this.not.value`. Remember, `this.note` is coming because that is what we did here with `setRef`, with our ref. Then, `.value` is a **property** on our specific **ref**.

So we have the value, and then what I'm going to do is say `this.note.value` equals an **empty string**, just to clear that input field. Then I'm going to call `this.props.addNote`, **passing** it our **new note**. Remember, `addNote`, we're getting from our `Profile` component, so when we call `this.props.addNote`, we're going to that new note, **pass** it to handle `addNote`, which should then **update Firebase**.

### AddNote.js
``` javascript	
handleSubmit: function(){
	var newNote = this.note.value;
	this.note.value = '';
	this.props.addNote(newNote)
},
```

Now we need to make sure that `addNote` is getting **passed** from our `Profile` component, all the way down to our `addNote` component. Let's go ahead and check out our `notes` component. Now let's go ahead and required `addNote`. 

### Notes.js 
``` javascript
var AddNote = require('./AddNote'); 
```

Now what we can do is, right here, let's go ahead and throw that in.

`AddNote` took in two things. It took in a `username`, which, again, we're getting from **props**, so `this.props.username`. It's going to also take in a `addNote` function, which we're also getting from **props**. If this is working correctly, the way it works is we have our `notes` component, and we're passing it the notes.

We're also passing it this `handleAddNote` function, which is right here, which is going to eventually, when it gets invoked, take in a new note, and then **set** -- whatever profile we're on -- a **new value** to whatever new note's passed in.

If we follow this, we go to `notes`. This creates a `addNotes` component, where we give it a `username` and we give it `addNote`.

### Notes.js 
``` javascript	
render: function(){
	return (
		<div>
			<h3> Notes for {this.props.username} </h3>
			<AddNote username={this.props.username} addNote={this.props.addNote} />
			<NotesList notes={this.props.notes} />
		</div>
  	)
}
```

In `addNote`, when this button is **clicked**, whatever's in this **input field** gets **taken**, gets **reset**, and gets **passed** to the functions. Inevitably, something is wrong with this. Let's go ahead and see if it's working.

So Webpack is working, we refresh, and there we go. It worked