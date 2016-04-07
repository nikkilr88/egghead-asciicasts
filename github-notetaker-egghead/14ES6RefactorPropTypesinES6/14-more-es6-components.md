This video is going to be very similar to the last video. Let's go ahead and refactor our repos JS file, and our userProfile JS file, in order to use more ES6-type syntax. First thing as always, we are going to import React from React, and delete this line.

Let's go ahead and create our UserProfiles class, which extends React component. Once we do that, let's go ahead and export default UserProfiles. Once we've done that, let's go ahead and add our render method in here, which is going to return this UI.

### UserProfile.js
```javascript
import React from 'react'

class UserProfile extends React.Component {
  render(){
    return (
      <div>
        {this.props.bio.avatar_url && <li className="list-group-item"> <img src={this.props.bio.avatar_url} className="img-rounded img-responsive"/></li>}
        {this.props.bio.name && <li className="list-group-item">Name: {this.props.bio.name}</li>}
        {this.props.bio.login && <li className="list-group-item">Username: {this.props.bio.login}</li>}
        {this.props.bio.email && <li className="list-group-item">Email: {this.props.bio.email}</li>}
        {this.props.bio.location && <li className="list-group-item">Location: {this.props.bio.location}</li>}
        {this.props.bio.company && <li className="list-group-item">Company: {this.props.bio.company}</li>}
        {this.props.bio.followers && <li className="list-group-item">Followers: {this.props.bio.followers}</li>}
        {this.props.bio.following && <li className="list-group-item">Following: {this.props.bio.following}</li>}
        {this.props.bio.following && <li className="list-group-item">Public Repos: {this.props.bio.public_repos}</li>}
        {this.props.bio.blog && <li className="list-group-item">Blog: <a href={this.props.bio.blog}> {this.props.bio.blog}</a></li>}
      </div>
    )
  }
}

export default UserProfile;
```

Lastly, we'll need to go and add propTypes onto our class. UserProfiles.propTypes equals that Object. This looks good. Let's go ahead and modify Repos now. We are going to import React from React, create our Repos class, which extends React component.

### UserProfile.js
```javascript
UserProfile.propTypes = {
  username: React.PropTypes.string.isRequired,
  bio: React.PropTypes.object.isRequired
}
```

Let's go ahead and throw our render method in here as well. Beautiful, and next, let's go ahead and add our profile, or add our propTypes to our Repos class. Now, let's go ahead, and let's move our mapping function inside of our components.

### Repos.js
```javascript
import React from 'react';

class Repos extends React.Component{
  render(){
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
  }
}

Repos.propTypes = {
  username: React.PropTypes.string.isRequired,
  repos: React.PropTypes.array.isRequired
}

export default Repos
```

Going to drop this right here, and indent this, change that to be an arrow function. Works great, so, now let's go ahead, and find where all of these are being imported, or these two files are being imported.

I believe, it's just in Our Profile JS. Here, we are going to import Repos, from github/repos, and then, we'll also import UserProfile from github/UserProfile. Let's see if this's working. There we go.

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
