Now we have our very nice notetaker GitHub application where we can search for a username. We get that user's information. Then we can go ahead and add a new note about this user.

As you might have noticed, as we've been developing this, we haven't really been utilizing any of the new features from ECMAScript 2015, or as I'll refer to it in the next few videos, ES 6.

What we're going to do now is we're going to go through this entire application and we are going to rewrite a lot of our code with these brand new features coming in from ES 6.

The first question you might have is, "Hey, I need some way to transpile my ECMAScript 6 code to ES 5 code," because right now not all browsers support ES 6.

Well, remember the very first or second video of this series when we set up our presets? What we did is we said, "Hey, we want to be able to transpile React code, but we also want to be able to transpile ES 2015 or ES 6 code. So we can do this now without really making any changes to our webpack-config file.

First, let's start with our files that aren't React components, and then we'll go from there. The very first thing, we don't need to do this Require syntax anymore, because ES 6 comes with its own built-in import/export module system. What we can do is we are going to import Axios from Axios. Line two is the exact same thing as line one, so we can go ahead and get rid of line one.

### helpers.js
``` javascript
import axios from 'axios'
```

Actually one of my favorite features of ES 6 is called string literals. Notice here how we have one string plus a variable plus another string. If we go ahead and we change these to instead of being single quotes, we change them to a back tick, and if you don't know where a back tick is, that's fine, because I didn't know when I first looked at it either. A back tick is right left to the one key on just a normal QWERTY keyboard.

What we can do now is, I'm going to go ahead and remove these. We can remove our plus signs as well. Since this username is a variable, all we do is dollar sign, curly brace, and then close the curly brace. It's almost like we have our own templating language now, where this evaluate to the string that we had before.

### helpers.js
``` javascript
function getRepos(username){
  return axios.get(`https://api.github.com/users/${username}/repos`);
}
```

We're going to come down here and do the same thing here. Get rid of these single quotes. Instead of adding, we're just going to use our string literal. There we go.

### helpers.js
``` javascript
function getUserInfo(username){
  return axios.get(`https://api.github.com/users/${username}`);
}
```

The next thing we're going to do is we can go ahead and remove this function, just like that. With methods, instead of writing the name of the function, or the name of the method, colon, and then function, what you can do is you can remove function completely. This is just shorthand for that. That's really nice. It will save us some keystrokes.

I'm going to move this down just for now so we can still see it. What we can do here is this idea of arrow functions in JavaScript. Now, the benefit of an arrow function is it doesn't create a new context, so that the this keyword, outside of the arrow function, will be the exact same as the one inside the arrow function. But because we're not using the this keyword in this code at all, it won't give us to much benefit, except we don't have to write the word function, again, just saving us some keystrokes.

It's going to take in an array. All right, so there's that. One other thing that I see real quick is, again, we don't need to do moduled exports because ES 6 comes with its own module system. Since we're only exporting one thing, we can type export default helpers, and these are roughly the same thing.

### helpers.js
``` javascript
var helpers = {
  getGithubInfo(username){
    return axios.all([getRepos(username), getUserInfo(username)])
      .then((arr) => {
        return {
          repos: arr[0].data,
          bio: arr[1].data
        }
      })
  }
}

export default helpers;
```

Now, in our other file, we can import helpers, and we'll get it just as normal.

I see two more small changes we can make here. With ES 6 we get two more ways to declare a variable with let and with const. They both do two different things, but I'm going to use, and I try to use, const for most of my variables, if I can.

The const declaration creates a read-only reference to a value. Basically what this means is that helpers, it's not necessarily immutable, in a sense where you can still reassign properties to helpers, but you can't reassign the variable itself. It gets you one step closer to immutability, kind of, which is a little bit nicer.

### helpers.js
``` javascript
const helpers = {
  getGithubInfo(username){
    return axios.all([getRepos(username), getUserInfo(username)])
      .then((arr) => {
        return {
          repos: arr[0].data,
          bio: arr[1].data
        }
      })
  }
}
```

It's usually a good practice to have all of your variables be const if they can. If they can't, then switch to let. If they can't be let, then go to var.

The next thing I see here is with this arrow function. With arrow functions, you can make it so you don't have to explicitly return the value you're returning if you do it all on one line. What I mean by that is...I'm going to get rid of this return. We're just going to return this object. I'm going to delete this guy. I'm going to bring this all onto one line, and then delete that first one.

Here, notice how we're just returning an object? Because we're returning an object, I'm going to put an opening paren here, a closing paren right here. Now what's happening is, because we don't have an opening curly brace right here, this arrow function's just going to say, "Hey, looks like they want to return this object."

### helpers.js
``` javascript
const helpers = {
  getGithubInfo(username){
    return axios.all([getRepos(username), getUserInfo(username)])
      .then((arr) => ({repos: arr[0].data, bio: arr[1].data}))
  }
}
```

What we've done is we've taken all those three or four lines of code and made it into one line with implicitly returning this object. It just makes things a little bit cleaner.

Now you'll notice we're just exporting an object which has one property on it, or one method on it, GitHub info. What we might as well do, instead of creating an object, just to export a property on that object, what if we just exported this function, this GitHub info function, as the main default thing that's being exported from our helpers' module? Let me go ahead and reformat this.

### helpers.js
``` javascript
export default function getGithubInfo(username){
  return axios.all([getRepos(username), getUserInfo(username)])
    .then((arr) => ({repos: arr[0].data, bio: arr[1].data}))
}
```

Now what's going to happen is because we're exporting default, if we import GitHub info, what we can do, say we're in another file, I would just do import GitHub info from this path to helpers, whatever. OK?

This is where things get a little bit tricky if you're still using the older Require syntax, because what's going to happen is if we change this, and we say GitHub info equals Require, and then the path to helpers, then all the sudden GitHub info's going to be an object with a default property that then has a get GitHub info property on that.

Because we've made this change, we need to go and find where we're also requiring this file, and make those necessary changes. Let's head over to our profile view. You'll notice here we are requiring helpers. Let's go ahead and just change this to import. I believe it was get GitHub info from, and then the same path, utils/helpers. That allows us to get rid of this Require statement.

### Profile.js
``` javascript
import getGithubInfo from '../utils/helpers'
```

All right, so that looks good. That looks good. Let's go ahead and make sure this is still working. Webpack is running. Helpers is not defined. There we go. We changed the import, but we didn't actually change invocation.

### Profile.js
``` javascript
init: function(username){
  var childRef = this.ref.child(username);
  this.bindAsArray(childRef, 'notes');

  getGithubInfo(username)
    .then(function(data){
      this.setState({
        bio: data.bio,
        repos: data.repos
      })
    }.bind(this))
}
```

Now, if we hit refresh, hopefully what we should see is everything's back to normal. Now let's head over to our app.js file and make some changes here.

As usual, we're going to have the new import module system going on here. I'm also going to change this one, as well. We're going to import routes from config routes. I need to go ahead and get rid of this equal sign.

### App.js
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
var Router = require('react-router').Router;
import routes from './config/routes';
```

You'll notice here that we're not just requiring a module, but we're requiring the module, and then we're getting a property on that module. What we can do is this new ES 6 syntax called named imports. What it allows us to do is it looks the same as other imports, but we've wrapped our import in this object, or in these curly braces. What that's doing is it's saying, "OK. Go ahead and get React router, but get me the router property on this module, rather than the whole module." These two lines are essentially the same thing.

### App.js
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } = from 'react-router';
import routes from './config/routes';
```

Let's go ahead and see if Webpack is still working. There it goes. We're still good here. All right. Now let's jump over to our config routes file and do the same thing here, as well. We're going to do import from.

Then, notice here, too, we have another opportunity to do named imports because, instead of router, we actually want route and we want index route. That looks good. The very last thing is we're going to export default that.

### routes.js
``` javascript
import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';
import { Route, IndexRoute} from 'react-router';

export default (
  <Route path="/" component={Main}>
    <Route path="profile/:username" component={Profile} />
    <IndexRoute component={Home} />
  </Route>
);
```

Let's refresh this page. There we go, no errors. Webpack is still running.