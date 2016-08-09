Let's go ahead and start **refactoring** some of our **components**. In this video, we are going to refactor all of the components in our `notes` folder, so let's go ahead and start with `NotesList`.

The very first thing, instead of **require**, we need to `import react` from `react`. Once we've done that, now what we need to do is you'll notice here we're using `react.createClass`. Instead, let's go ahead and use the **built-in ES6 class** syntax.

We're going to go `class`, and the name of our class. We're going to have it `extend react.Component`, and let's go ahead and capitalize Component. Now we've created our class, and real quick, let's go ahead and `export default NotesList`.

What we're going to do now is have our `render` method. Remember, we don't need to type out function. Then I'm just going to copy this and throw it into here. The next thing we're going to do is let's go ahead and **remove function** and use our **arrow syntax**, as we talked about before.

### NotesList.js
```javascript
import React from 'react';

class NotesList extends React.Component{
  render(){
    var notes = this.props.notes.map((note, index) => {
      return <li className="list-group-item" key={index}>{note['.value']}</li>
    })

    return (
      <ul className="list-group">
        {notes}
      </ul>
    )
  }
}

export default NotesList;
```

Throughout this series, what we've done to **loop over** any lists is we've **mapped outside** of our **return block** here and then saved it into a **variable**, and then used our variable down here. I want to show you a little bit different syntax, just because you might see it.

I'm going to go ahead and take this **map function** and I'm going to throw it in right there, and then just fix this indention. This is technically the same thing as before, but instead of saving it to a variable, we're now actually just **looping inside** of our **template**.

Even take this a little bit further, so what I'm going to do is I'm going to **destructure** `this.props`. What that means is I can do something like this.

What that's done is it's taken the `notes` property on `this.props`, which is this guy right here, and **saved** it into a **variable** called `notes`. I can get rid of this line right here, so `notes.map`, and now what I can do -- and I could have done this before, but I'm just showing you now -- is I'm going to go ahead and use the **implicit return** here to keep this all on one line like that. Then we get something like this.

### NotesList.js
```javascript
render(){
  { notes } = this.props;
  return (
    <ul className="list-group">
      {notes.map((note, index) => <li className="list-group-item" key={index}>{node['.value']}</li>)}
    </ul>
  )
}
}
```

I'm not a huge fan of that, just because it seems a little bit scrunched just to force it to be on one line, but you've seen how powerful **arrow syntax** can be, and you've also seen this new idea of **destructuring variables**.

Let's see and make sure this still works. `NotesList` is still going fine, so cool. There is our `NotesList` component.

The last change I'm going to make is, if you'll notice, this is how we had it before. If you use curly braces, then you need to have an explicit return here.

### NotesList.js
```javascript
render(){
  { notes } = this.props;
  return (
    <ul className="list-group">
      {notes.map((note, index) => {
          return <li className="list-group-item" key={index}>{node['.value']}</li>)
        }
      }
    </ul>
  )
}
}
```

But what some people do -- I'm just doing this so you can see all the different patterns -- is if you put a `paren` right here and not a `curly brace`, you can still...let's move this down here, and then we need two of these. Those match up, and then these should match up.

You can still take advantage of that **implicit return**, as long as you don't have a `curly brace` here. Some people really like this syntax. I'm not a huge fan of it, but it should still work, as well. Let's see.

### NotesList.js
```javascript
render(){
  const { notes } = this.props;
  return (
    <ul className="list-group">
      {notes.map((note, index) => (
          <li className="list-group-item" key={index}>{node['.value']}</li>
        ))}
    </ul>
  )
}
}
```

There's our `notes` component still rendering. I'm going to keep it like this, but you've seen the different patterns that people use for looping over items in a **react** component.

Let's head over to our `AddNote` component, so same thing. Instead of that, we're going to `import react` from `react`. We're going to create a class called `AddNote`, which `extends React.Component`, export default, `AddNote`.

Let's go ahead and move our render method up, so here, we type **render**, which returns this **UI**. Add a `handleSubmit` method. Notice here, we don't have to put commas in between our methods because we're technically not in an object, so I'm going to move this up, as well.

### AddNote.js
```javascript
import React from 'react';

class AddNote extends React.Component {
  handleSubmit(){
    var newNote = this.note.value;
    this.note.value = '';
    this.props.addNote(newNote);
  }

  render(){
    return(
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add New Note" ref={this.setRef}/>
        <span className='input-group-btn'>
          <button className="btn btn-default" type="button" onClick={this.handleSubmit}>Submit</button>
        </span>
      </div>
    )
  }
}

export default AddNote
```

One tricky thing that we need to do is when you're using `React.createClass`, that this keyword is automatically **auto-bound** to the **correct context** for you, which makes it really convenient. But one got-you you're going to have over and over again with ES6 classes in **react** is that `this` keyword is **not** auto-bound.

We want `this` keyword **inside** of this function to be the same as `this` keyword, so what we're going to do is just a `handlesubmit.bind`, so that this keyword **inside** of this **context** is the **correct** one. That looks good, so now the only thing left we need to do is worry about `propType`.

### AddNote.js
```javascript
render(){
  return(
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Add New Note" ref={this.setRef}/>
      <span className='input-group-btn'>
        <button className="btn btn-default" type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
      </span>
    </div>
  )
}
```

What's a little bit different about **prop types**, too, is you have to **add** them to the **class itself**, so we're going to come up here and type `AddNote`, and as a **property** on `AddNote`, have our `propTypes` object, and that should be it for this component.

### AddNote.js
```javascript
class AddNote extends React.Component {...}

AddNote.propTypes = {
  username: React.PropTypes.string.isRequired,
  addNote: React.PropTypes.func.isRequired
}

export default AddNote
```

One small fix real quick is to set this **equal** to the **object** instead of having a **colon**, so set this to equals. Now we just need to do a few more things.

First, let's go ahead and fix our `setRef` function, and delete all this junk down here. Get rid of the `function` keywords. We have `setRef` now.

### AddNote.js
```javascript
setRef(ref){
  this.note = ref;
}
```

What we could do is we could come in here and do `.bind(this)` again, because remember that `this` keyword is going to be different. But **another pattern** that I really like is instead of doing `.bind`, what we can do is we can create a **arrow function** right here and then call `this.setRef`. Then we're going to get a ref, and then let's pass that there.

### AddNote.js
```javascript
render(){
  return(
    <div className="input-group">
      <input type="text" className="form-control" placeholder="Add New Note" ref={(ref) => this.setRef(ref)}/>
      <span className='input-group-btn'>
        <button className="btn btn-default" type="button" onClick={() => this.handleSubmit()}>Submit</button>
      </span>
    </div>
  )
}
```

Remember, **arrow** functions **don't create** their own **context**. `this` keyword inside this arrow function is the **exact same** as the one **out here**, so this is actually the preferred way that I like to get around the **auto-binding** issue. Instead of using `.bind`, I just like to create these **arrow functions**. Then we'll invoke `handleSubmit`, and then this function will run.

This looks good. Let's go ahead and check webpack. Let's start webpack, and it looks like we have an issue. That's back in `NotesList`, so come here.

You can't **destructure** like this. You obviously need to **assign** it a **variable type**, so we have `const`. That looks good.

What we need to do is every time we change a component, we need to go and figure out where that **component is being required** and **change** that, as well. Let's go ahead, and everywhere we're using `AddNote`, which is right here, so we're going to `import AddNote` from `AddNote`, and then we also change `NotesList`.

### Notes.js
```javascript
var React = require('react');
import NotesList from './NotesList';
import AddNote from './AddNote';
```

Let's go ahead and do that one, as well, and then let's check these files. I think we're good. Let's see if webpack's good. Let's see if we have any errors. So far, so good.

Let's go ahead and modify the last file, our `Notes.js` file. I swapped out our **require** for some **imports**. Now let's go ahead and create a `class Notes` which extends `React.Component`, and then we're going to `export default Notes`.

### Notes.js
```javascript
import React from require('react');
import NotesList from './NotesList';
import AddNote from './AddNote';

class Notes extends React.Component {
  render(){
    return(
      <div>
        <h3> Notes for {this.props.username} </h3>
        <AddNote username={this.props.username} addNote={this.props.addNote} />
        <NotesList notes={this.props.notes} />
      </div>
    )
  }
}

export default Notes;
```

Let's go ahead and move our render method up, so that looks good. Now the only thing left to do is our `propTypes`.

### Notes.js
```javascript
Notes.propTypes = {
  username: React.PropTypes.string.isRequired,
  notes: React.PropTypes.array.isRequired,
  addNote: React.PropTypes.func.isRequired
}
```

Again, the very last thing is now we need to figure out where we're importing `Notes`, or where we're requiring it, and modify that. Let's go ahead and change in our `Profile.js` component to our file, `import Notes` from `Notes`, from this. There we go.

### Profile.js
```javascript
var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile= require('./Github/UserProfile');
import Notes from './Notes/Notes';
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
import getGithubInfo from '../utils/helpers';
```
