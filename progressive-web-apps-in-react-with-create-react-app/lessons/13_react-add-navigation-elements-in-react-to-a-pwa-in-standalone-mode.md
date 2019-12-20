Add React Router with `yarn add react-router-dom`. 

#### Terminal
```bash
$ yarn add react-router-dom
```

I've exported a new app that has the list at the route URL and a profile page at `/profile`. 

#### src/app.js
```js
export default () =>
  <Router>
    <div>
      <Route path="/" exact component={List} />
      <Route path="/profile" exact component={Profile} />
    </div>
  </Router>
```

Both of those components are in the same file, `src/app.js`. In the list header, there's a `<Link to="/profile">Profile</Link>` page, which is just a simple page that displays a user profile icon.

```js
<span>
  <Link to="/profile">Profile</Link>
</span>
```
```js
<div style={{ textAlign: 'center' }}>
  <img 
    src={GreyProfile} alt="profile" 
    style={{ height: 200, marginTop: 50 }} 
  />
  <p style={{ color: '#888', fontSize: 20 }}>username</p>
</div>
```

When we run that, we can see the profile link in the header. 

![image of the profile link](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630127/transcript-images/react-add-navigation-elements-in-react-to-a-pwa-in-standalone-mode-link.png)

Clicking the link takes us to the next page. 

![image of the profile](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630131/transcript-images/react-add-navigation-elements-in-react-to-a-pwa-in-standalone-mode-prolife.png)

In the browser, users will know to hit the back button to go back to the home page. 

![image of profile back](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630128/transcript-images/react-add-navigation-elements-in-react-to-a-pwa-in-standalone-mode-back.png)

If they've just installed this PWA on a mobile device and it's running in standalone mode, then there's no typical web controls. 

There's no forward or backward. Let's make sure to add a back button to the profile page.

In `src/app.js`, `import Back from './back.png'`. 

#### src/app.js
```js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import GreyProfile from './grey_profile.png'
import Back from './back.png'
```

Then we can switch the logo and the header to a `back` button. 

```js
const Profile = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <Link to="/">
              <img src={Back} alt="logo" style={{ height: 30 }} />
            </Link>
            Profile
          </span>
      </nav>
```

Now when we run in standalone mode, the user knows they can hit the back button to go to the home page. 

![image of the mobile back button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629674/transcript-images/react-add-navigation-elements-in-react-to-a-pwa-in-standalone-mode-buttons.png)

When you have a PWA that can be installed on mobile devices, always make sure you add navigation elements to allow access to all parts of your app without using the web browser controls.
