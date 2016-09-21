This video is going to be very similar to the last video. Let's go ahead and refactor our `Repos.js` file, and our `UserProfile.js` file, in order to use more ES6-type syntax. First thing as always, we are going to `import React from 'react'`, and delete this line.

Let's go ahead and create our `UserProfiles` class, which `extends React.Component`. Once we do that, let's go ahead and `export default UserProfiles`. Once we've done that, let's go ahead and add our `render` method in here, which is going to return this UI.

**Github/UserProfile.js**
```javascript
import React from 'react'

class UserProfile extends React.Component {
  render(){
    return (
      <div>
        {this.props.bio.avatar_url && <li> <img src={this.props.bio.avatar_url}/></li>}
        {this.props.bio.name && <li>Name: {this.props.bio.name}</li>}
        {this.props.bio.login && <li>Username: {this.props.bio.login}</li>}
        
        ...

      </div>
    )
  }
}

export default UserProfile;
```
Lastly, we'll need to go and add `propTypes` onto our class. `UserProfiles.propTypes` equals that Object. This looks good. Let's go ahead and modify `Repos` now. We are going to `import React from 'react'`, create our `Repos` class, which `extends React component`.

**Github/UserProfile.js**
```javascript
UserProfile.propTypes = {
  username: React.PropTypes.string.isRequired,
  bio: React.PropTypes.object.isRequired
}
```
Let's go ahead and throw our `render` method in here as well. Beautiful, and next, let's go ahead and add our profile, or add our `propTypes` to our `Repos` class. 

**Github/Repos.js**
``` javascript
import React from 'react';

class Repos extends React.Component{
  render(){...}
}

Repos.propTypes = {
  username: React.PropTypes.string.isRequired,
  repos: React.PropTypes.array.isRequired
}

export default Repos
```
Now, let's go ahead, and let's move our mapping function inside of our components.

**Github/Repos.js**
```javascript
return (
  <div>
    <h3> User Repos </h3>
    <ul className="list-group">
      {this.props.repos.map((repo, index) => {
        return (
          <li className="list-group-item" key={index}>
            {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
            {repo.description && <p>{repo.description}</p>}
          </li>
        )
      })}
    </ul>
  </div>
)
```
Going to drop this right here, and indent this, change that to be an arrow function. Works great, so, now let's go ahead, and find where all of these are being imported, or these two files are being imported.

I believe, it's just in our `Profile.js`. Here, we are going to `import Repos`, from `./Github/repos`, and then, we'll also `import UserProfile from './Github/UserProfile'`. Let's see if this's working. There we go.

### Profile.js
```javascript
var React = require('react');
var Router = require('react-router');
import Repos from './Github/Repos';
import UserProfile from './Github/UserProfile';
import Notes from './Notes/Notes';
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
import getGithubInfo from '../utils/helpers';
```
