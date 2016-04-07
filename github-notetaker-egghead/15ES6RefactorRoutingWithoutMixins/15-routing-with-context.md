We only have four more components left until our entire app has been ES6-ified, so what we're going to do real quick is take care of this Home component since it's really small.

Import React from React, and then let's go ahead and create a class home which extends react.component, so just the same stuff we've been doing. Have a render method which returns this object, and then let's go ahead and export default home, so nothing new yet.

### Home.js
```javascript
import React from 'react';

class Home extends React.Component {
  render(){
    return(
      <h2 className="text-center">
        Search By Github Username Above
      </h2>
    )
  }
}

export default Home;
```

Now let's head over to the main.js file. Now, like usual, let's import react from react. Now let's create our main class, which extends react component, and then we're going to export default main. Once we do that, let's add our render method, which is going to return us the UI for this component.

### Main.js
``` javascript
import React from 'react';
import SearchGithub from './SearchGithub'

class Main extends React.Component {
  render(){
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <SearchGithub history={this.props.history}/>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main
```

The last component we're going to modify in this video is the search GitHub component, so same thing. We're going to do this. You should be very used to this by now. We're going to create a class of search GitHub, which extends react.component, and then we're going to export default search GitHub.

### SearchGithub.js
```javascript
import React from 'react';
import Router from 'react-router';

class SearchGithub extends React.Component {

}

export default SearchGithub;
```

Let's bring these three functions up here. Let's get rid of the function, and let's get rid of these commas.

### SearchGithub.js
```javascript
class SearchGithub extends React.Component {
  getRef(ref){
    this.usernameRef = ref;
  }
  handleSubmit(){
    const username = this.usernameRef.value;
    this.usernameRef.value = '';
    this.history.pushState(null, "/profile/" + username)
  }
  render(){
    return (
      <div className="col-sm-12">
        <form onSubmit={() => this.handleSubmit()}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={(ref) => this.getRef(ref)} />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github</button>
          </div>
        </form>
      </div>
    )
  }
}
```

If you'll remember, functions inside of classes with react don't get auto-bounded, or this keyword doesn't get auto-bound. What we're going to have to do is make these arrow functions, which then invoke the specific function on the instance, and with GitRef, we're going to pass it ref.

This looks really good. Let's change this to const really quick. Perfect.

Now what you'll notice is everything is good except for this guy right here. If you remember correctly, what the router.history mixin is doing is it's taking our instance and it's mixing a few methods onto it. One of those methods is history, so we can call this .history.pushdate.

Because we no longer have that mixin, this .history's going to be undefined. We need to find another way to get history into this search GitHub component.

If you check out our routes, what React Router does is if you have a component that's being handled by the router, that component will receive certain properties and certain methods from the router. The problem is search GitHub isn't being handled by the router.

But we know that main is, and main is rendering search GitHub, so what if we do this? What if we say history is going to be this.props.history because React Router is going to pass main a history method.

### Main.js
```javascript
class Main extends React.Component {
  render(){
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <SearchGithub history={this.props.history}/>
          </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}
```

Then what we can do is in search GitHub, let's add some prop types of history, which is going to be react.proptypes.object, and it's going to be required.

### SearchGithub.js
```javascript
SearchGithub.PropTypes = {
  history: React.PropTypes.object.isRequired
}
```

Then all we need to do is change this .history to this .props.pushdate, so let's see if this works, and it does.

### SearchGithub.js
```javascript
handleSubmit(){
  const username = this.usernameRef.value;
  this.usernameRef.value = '';
  this.props.history.pushState(null, "/profile/" + username)
}
```

To recap, because we can't use mixins with react, we have to figure out another way to get history into this component. We do that by passing history from the main component into search GitHub as props, and the reason that the main component has access to this .props.history is because the main component is being controlled by the router.
