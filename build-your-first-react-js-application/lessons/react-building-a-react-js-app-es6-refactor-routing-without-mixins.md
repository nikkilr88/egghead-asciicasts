We only have four more components left until our **entire** app has been **ES6-ified**, so what we're going to do real quick is take care of this `Home` component since it's really small.

`import React from react`, and then let's go ahead and create a class `Home` which `extends React.Component`, so just the same stuff we've been doing. Have a `render` method which returns this object, and then let's go ahead and `export default Home`, so nothing new yet.

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

Now let's head over to the `Main.js` file. Now, like usual, let's `import React from react`. Now let's create our `Main class`, which `extends React.Component`, and then we're going to `export default Main`. Once we do that, let's add our `render` method, which is going to return us the **UI** for this component.

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

The last component we're going to modify in this video is the `SearchGitHub` component, so same thing. We're going to do this. You should be very used to this by now. We're going to create a class of `SearchGitHub`, which `extends React.Component`, and then we're going to `export default SearchGitHub`.

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
            <button type="submit" className="btn btn-block btn-primary">SearchGitHub</button>
          </div>
        </form>
      </div>
    )
  }
}
```

If you'll remember, **functions** inside of **classes** with **React** don't get **auto-bounded**, or `this` keyword doesn't get **auto-bound**. What we're going to have to do is make these **arrow** functions, which then **invoke** the **specific** function on the instance, and with `gitRef`, we're going to pass it ref.

This looks really good. Let's change this to `const` really quick. **Perfect**.

Now what you'll notice is everything is good except for this guy right here. If you remember correctly, what the `Router.History` **mixin** is doing is it's taking our **instance** and it's **mixing** a few **methods onto it**. One of those methods is `history`, so we can call this `.history.pushSate`.

Because we **no longer** have that **mixin**, this `.history`'s going to be **undefined**. We need to find another way to get **history** into this `SearchGitHub` component.

If you check out our `routes`, what **React Router** does is if you have a **component** that's being **handled** by the `Router`, that component will **receive certain properties** and certain **methods** from the `Router`. The problem is `SearchGitHub` isn't being **handled** by the `Router`.

But we know that `Main` is, and `Main` is rendering `SearchGitHub`, so what if we do this? What if we say **history** is going to be `this.props.History` because **React Router** is going to pass `Main` a `history` method.

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

Then what we can do is in `SearchGitHub`, let's add some `propTypes` of `history`, which is going to be `React.propTypes.Object`, and it's going to be **required**.

### SearchGithub.js
```javascript
SearchGithub.PropTypes = {
  history: React.PropTypes.object.isRequired
}
```

Then all we need to do is change this `.history` to `this.props.pushState`, so let's see if this works, and it does.

### SearchGithub.js
```javascript
handleSubmit(){
  const username = this.usernameRef.value;
  this.usernameRef.value = '';
  this.props.history.pushState(null, "/profile/" + username)
}
```

To recap, because we can't use **mixins** with **React**, we have to figure out another way to get `history` into this **component**. We do that by **passing** `history` from the `Main` component into `SearchGitHub` as **props**, and the reason that the `Main` component has access to `this.props.history` is because the `Main` component is being controlled by the **Router**.
