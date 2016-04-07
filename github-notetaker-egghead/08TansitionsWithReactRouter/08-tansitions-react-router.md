As of right now, our menu we've been creating is just a bootstrap menu with a text menu. But what we actually want to have happen is we, as we've been doing, want to be able to enter a username, and when I click Search GitHub it goes and it transitions to this new route, passing along the username that we typed in. That's what we're going to do in this video.

Let's go ahead and go back to our code, and let's go ahead and make a new file inside of our components folder called Search GitHub.js.

The very first thing, we're going to require React. Then what we're going to do is we're going to require the router, because we're going to rely on the router to actually do the transition for us between our routes, so require React router.

### SearchGithub.js
```javascript
var React = require('react');
var Router = require('react-router');
```

Then, as always, we make a component using React.create class. Then we export this component.

The mixins we're going to use for the transition is the history property on the router object. Then let's do a render function, which returns, it's going to return a form, so we're just going to have to bootstrap stuff here.

### SearchGithub.js
``` javascript
var SearchGithub = React.createclass({
  mixins: [Router.History],
  render: function(){
    return()
  }
)};

module.exports = SearchGithub;
```

This form is, whenever it gets submitted, is going to run this.handle submit, which we'll create in a second. Then from here, we're going to have two divs, one is going to be the input field, which is going to be of type text and a class name of Form Control. Then as we talked about in the last video, as a ref equal to this.get ref, which is going to call this function.

Then what we'll do is we'll have this input ref and let's go ahead and say this.username ref equals ref.

``` javascript
getRef: function(ref){
  this.usernameRef = ref;
}
```

The next container is going to be our button. Whoa. This button is going to be of type submit, have a class name of BTM, BTM block, and we'll say BTM primary for the color and have a text of Search GitHub, and then we're going to close our button.

### SearchGithub.js
``` javascript
render: function() {
  return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={this.getRef} />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className=" btn btn-block btn-primary"> Search GitHub</button>
        </form>
      </div>
  )
}
```

Now, what we need to do is we need to make a function called Handle Submit, that will get the value of our username ref and transition us to our profile route, passing along that username that we're getting from the ref.

Inside here, let's go ahead and create a Handle Submit method. As usual, let's go ahead and get the username, just as we did before. That's going to get us the username of this input field, or the value of the input field. Then let's go ahead and reset that to an empty string.

### SearchGithub.js
``` javascript
handleSubmit: function(){
  var username = this.usernameRef.value;
  this.usernameRef.value = '';
  this.history.pushState(null, "profile/" + username);
}
```

Then, this is kind of where the magic happens.

Again, because we're using a mixin, what React is doing is it's taking any properties on the React [inaudible 4:00] modular object, and t's adding it to our instance. One of those properties is called History, which has a property called Push State.

What we can do is Push State allows us to transition to a new route. We, the route we want to transition to is profile/plus whatever this username is. Because if you'll remember a few videos ago in our routes config, we said, hey, whenever someone goes to profile/whatever username, go ahead and render this profile component.

### SearchGithub.js
``` javascript
var React = require('react');
var Router = require('react-router');

var SearchGithub = React.createclass({
  mixins: [Router.History],
  getRef: function(ref){
    this.usernameRef = ref;
  },
  handleSubmit: function(){
    var username = this.usernameRef.value;
    this.usernameRef.value = '';
    this.history.pushState(null, "profile/" + username);
  },
  render: function() {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group col-sm-7">
              <input type="text" className="form-control" ref={this.getRef} />
            </div>
            <div className="form-group col-sm-5">
              <button type="submit" className=" btn btn-block btn-primary"> Search GitHub</button>
          </form>
        </div>
    )
  }
});
module.exports = SearchGithub;
```

What we're doing here is we're saying, hey, whenever someone clicks on this Handle Submit button, go ahead and grab the username and then go ahead and take them to this profile/whatever that username route is.

The last thing to do is, let's head over to our main component. Instead of menu here, we are going to render our Search GitHub component, which we need to require.

### Main.js
``` javascript
var React = require('react');
var SearchGithub = require('./SearchGithub')

var Main = React.createclass({
  render: function() {
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <SearchGithub />
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
});
```

Let's say Search GitHub equals, and we're in the same directory, so let's just get Search GitHub, and now let's check to see if this is working.

We head over here, we can search for a username and it should redirect us to /profile/this username. Then our notes component renders, let's give this another test, and there we go.

![Finished](./images/Finished.png)
