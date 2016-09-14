As we talked about a few videos ago, the biggest component in our application is going to be this `Profile` component we'll make, because that's what's going to manage the state for this `userProfile` component, the `Repos` component right here, and also the `Notes` component. Let's go ahead in this video, let's make this `Profile` component, and then let's just make these three child components.

![App Component](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/github-notetaker-egghead/AppComponent.png)

Let's go ahead and head over to our `components` folder. Let's make a new file called `Profile.js`. Very first thing we're going to do, as always, is require React. We're going to need `react-router` later on, so let's just require it right now. That should be good for now.

**components/Profile.js**
``` javascript
var React = require('react');
var Router = require('react-router');
```

Let's go ahead and make a new `Profile` variable and set it equal to `React.createClass` to create our component. Then, let's go ahead and set the `render` method. This render method is going to `return`. Let's go ahead and make sure that we export this component.

**components/Profile.js**
``` javascript
var Profile = React.createclass({
  render: function(){
    return(
      <div className="row">
        <div className="col-md-4">
        User Profile Component
        </div>
        <div className="col-md-4">
          Repos Component
        </div>
        <div className="col-md-4">
          Notes Component
        </div>
      </div>
    )
  }
})

module.exports = Profile;
```

Looking back at our application that's finished, you'll notice that this is the component we're building right now, the `Profile` component. This component is going to be managing three different states really. It's going to be managing the user's profile data, the user's repo data, and this notes data.

Let's come in our component. We're going to add a `getInitialState` method on this component. What `getInitialState` does is it's going to set the initial state of the component, meaning anything that this component is going to handle, any state that this component is going to handle, you're going to basically initialize that state right now.

You usually just initialize it with empty data. We're going to return `notes`, which is going to be an array, `bio`, which is going to be an object, and `repos`, which is going to be another array.

**Profile.js**
``` javascript
getInitialState: function(){
  return {
    notes: [],
    bio: {},
    repos: []
  }
}
```

Eventually, these are going to get populated. These data sets are going to be passed down to these children components, which they'll then render.


Let's go ahead and add this new `profile` component to our routes. Now let's head over to `routes.js`. The very first thing we're going to do is require our new profile component that we made, `../component/Profile`.

**routes.js**
``` javascript
var Main = require('../components/Main');
var Home = require('../components/Home');
var Profile = require('../components/Profile');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Route = Router.IndexRoute;
```

Now what we want to do is we want to be able to hook up our `Profile` component to our `router`.

Down here, we're going to say `oute`. We're going to specify a new route. So whenever someone goes to our "app/profile/some username", this route is going to be `active`. The component that's going to be activated is this `Profile` component.

**routes.js**
``` javascript
module.exports = (
  <Route path="/" component={Main}>
    <Route path="profile/:username" component={Profile} />
    <IndexRoute component={Home} />
  </Route>
);
```

Let's go ahead and verify that this is all hooked up now. When we go to our "app/profile/any name", what we should see is our `Profile` component, which should give us just this static text. Webpack is still running. If we hit refresh and then go to `/profile/tylermcginnis`, here we go. We got our static text.

![Profile Component](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/github-notetaker-egghead/ProfileComponent.png)

You might have seen this little gross hash up here. You can get rid of that. I'm not going to worry about it in this video, but if you want to get rid of it, go ahead and look into [React router's create hash history](https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md).

The reason I'm not going to do it in this video is because you have to have a server. We're obviously serving these just going to the path itself. So we're not going to do it. But you can get rid of these using React router. Don't worry too much about those.

Everything seems to be working, but what we still haven't done is we still haven't figured out a way to get the username that we pass in through the URL into our `Profile` container. **A very fundamental principle of React is this idea of passing props down to a component**.

You'll notice here that our profile component has this state, but what if we were rendering another child component? Let's say we had a component called `DisplayRepos` because we'll eventually have something like that.

The way we want to get these repositories down to this component is something like this. We could say, `repos = this.state.repos.` I'm going to call this `childRepos` just so you can see the difference.

**Profile.js**
``` javascript
var Profile = React.createclass({
  render: function(){
    return(
      <div className="row">
        <div className="col-md-4">
          <DisplayRepos childRepos={this.state.repos} />
        User Profile Component
        </div>
        <div className="col-md-4">
          Repos Component
        </div>
        <div className="col-md-4">
          Notes Component
        </div>
      </div>
    )
  }
})
```

What we're doing is we're saying, "Hey, display repos. You're going to receive this.state.repos as `childRepos`". Now if we were to go inside of this `DisplayRepos` component, the way we would access child repos is by querying `this.props.childRepos`.

Through props, we're able to gain access to data that's stored in our parents or stored in any other higher component. The reason I tell you this is because this is kind of how React router works.

Right now, everything's good, and our profile's working, but we actually haven't figured out a way to query our username yet. What we're going to do is let's just `console.log(this.props)`. Let's take a look at that.

**Profile.js**
```javascript
render: function(){
  console.log(this.props);
  return(...)
}
```

If I'm here, here's our `props` objects. This is everything that's being passed to the `profile` component. You'll notice that one of these is called `params`. This has a username property which is Jake.

![this.propsjake](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/github-notetaker-egghead/this.propsjake.png)

If I change this, then `params` has a username property which is Tyler McGuinness.

The way you access route parameters with `react-router` is the same way you access any data that's being passed down to a child component, it's through `this.props`. Let's just display that to the page right here. `this.props.params.username`.

**Profile.js**
``` javascript
render: function(){
  return(
    <div className="row">
      <div className="col-md-4">
        <DisplayRepos childRepos={this.state.repos} />
      User Profile Component --> {this.props.params.username}
      </div>
      <div className="col-md-4">
        Repos Component
      </div>
      <div className="col-md-4">
        Notes Component
      </div>
    </div>
  )
```

Again, the reason it's called the username is because that's what we specified inside of our routes.

When I load this, we should see user profile component and then the name of the route param. I changed this. It updates it.

![Viewing this.props.params.username](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/github-notetaker-egghead/Viewingthis.props.params.username.png)

One thing I didn't mention was the way you display variables inside of JSX is just with this single curly brace.

Go ahead and make some more components in your `components` folder. Go ahead and make a `Github` folder. Also, make a `Notes` folder. In the `Github` folder, make two files. The first file is going to be called `Repos.js`. The second file will be called `UserProfile.js`.

In the `Notes` folder, let's go ahead and make a file called `Notes.js`. What these three files are going to be are the **component definitions** for each of our three components, our user profile component, our user repos component, and our notes component.

Let's go ahead inside of Repos. We're going to require React. Then we'll make a new component using `React.createClass`. We'll have it just render something simple. It's going to render `REPOSSS`.

**Repos.js**
``` javascript
var React = require('react');

var Repos = React.createclass({
  render: function(){
    return(
      <div> REPOSSS </div>
    )
  }
})

module.exports = Repos;
```

Because this is going to very similar to the other ones as well, let's just copy and paste. We have `UserProfiles`. This is `USER PROFILE`, and then `Notes` is going to be `Notes`. I'm going to change this to "NOTES".

Now let's head over to our `Profile` component and use each of these components we just made. The very first thing we're going to do is let's require all of these to `Repos` is going to be `require`. We need to go into `Github/Repos` and then `UserProfile`. It's going to be the same thing. It's in the `Github` folder. Then our `notes` component is inside the `Notes` folder.

**Profile.js**
``` javascript
var Repos = require('./Github/Repos')
var UserProfile = require('./Github/UserProfile')
var Repos = require('./Notes/Notes')
```

Now in order to use this, you saw this a little bit earlier, but what we're going to do is simply say `<UserProfile />`. It's self-closing. Then, here, instead of repos, we have our `Repos` component. Here instead of notes. We have our `Notes` component.

**Profile.js**
``` javascript
render: function(){
  return(
    <div className="row">
      <div className="col-md-4">
      <UserProfile />  
      </div>
      <div className="col-md-4">
        <Repos />
      </div>
      <div className="col-md-4">
        <Notes />
      </div>
    </div>
  )
```

Let's see if this works. There we go. This is good.

![Displaying Components](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/github-notetaker-egghead/DisplayingComponents.png)

But you'll notice here we have `UserProfile`, `Repos`, and `Notes`. We also have `repos`, `bio`, and `notes`. What we want to do is we don't just want to render these components. We actually want to pass data down to them so that data can be rendered inside of these child components.

`UserProfile`, what we're give it first is a `username`. If you'll remember earlier, we can access the username of a route parameter by doing `this.props.params` and then whatever that route param is called. In this case, it's called username.

But we also want to the `bio` which is currently living on our state. Same thing with repos. We're going to pass it down repos as `this.state.repos`. Then notes, `this.state.notes`.

**Profile.js**
``` javascript
render: function(){
  return(
    <div className="row">
      <div className="col-md-4">
      <UserProfile username={this.props.params.username bio={this.state.bio}}/>  
      </div>
      <div className="col-md-4">
        <Repos repos={this.state.repos}/>
      </div>
      <div className="col-md-4">
        <Notes notes={this.state.notes}/>
      </div>
    </div>
  )
```

Now let's go ahead and go into `UserProfile`. Let's just render the props that it's getting. Let's return one big `div` just so we can verify we're getting stuff. We'll say, "USER PROFILE!"

Then here let's do the `this.props.username`. Here, let's do bio as `this.props.bio.name`

**Userprofile.js**
``` javascript
var Repos = React.createclass({
  render: function(){
    return(
      <div>
        <p> USER PROFILE! </p>
        <p> Username: {this.props.username} </p>
        <p> Bio: {this.props.bio.name} </p>
      </div>
    )
  }
})
```

because, let's go back to our profile, now let's initialize bio just with some default name. Now if we go, our `UserProfile` renders Jake or whatever the route param is. Then we also get bio.

Just real quick, I'm going to go ahead and inside `Repos` let's just show that's we're at repos. The repos are `this.props.repos`. Same thing for notes. We're on notes. Let's render the `this.props.notes`.

Let's see if this works. There we go. Let's go ahead and initialize notes with 1, 2, 3, and repos with a, b, c.

**Profile.js**
``` javascript
getInitialState: function(){
  return {
    notes: [1,2,3],
    bio: {
      name: 'Tyler McGinnis'
    },
    repos: ['a','b','c']
  }
}
```

And voilà!

![Finished](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/github-notetaker-egghead/Finished.png)
