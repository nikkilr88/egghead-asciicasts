The first service that we're going to add is authentication. To add a new service using Amplify, we can run `amplify add` with the name of the service. The service name that we're going to be adding is `auth`, so we can run `amplify add auth`.

#### Terminal
```
amplify add auth
```

[00:16] Here, we'll be asked if we would like to use the default authentication and security configuration. We'll choose `yes`. Now the new configuration has been created in our project. We'll run `amplify push` to push the new configuration into our account and create and provision the new resources.

```
amplify push 
```

Next, we'll be prompted and asked if we would like to continue. If you look at the operation, you can see that it is set to create. This means it will create a new authentication service in our account. This may take a couple of minutes to complete.

![Create new authentication service](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391505/transcript-images/react-native-use-the-aws-amplify-withauthenticator-hoc-to-implement-a-react-user-authorization-flow-operation-create.jpg)

Now that the authentication service has been created, we should be able to look in our source directory and see a new file that was created for us called `aws-exports.js`. This file is created and updated by the CLI, so there's no reason for us to change it.

We will, though, be using it in the next step to configure our React application with the AWS resources. To configure our React app with the AWS resources, we can open up `src/index.js`. 

#### index.js
```
vi src/index.js
```

Here, we'll `import Amplify from 'aws-amplify'` library. The configuration from `aws-exports`, and we'll call `amplify.configure`, passing in the `config`.

```javascript 
import React from 'react'; 
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

ReactDOM.render(<App />, document.getElementByID('root'))
registerServiceWorker();
```

Next, we'll open `src/App.js`. Here we'll first `import` the `withAuthenticator` higher order component from the `AWS-Amplify-React` library. Instead of exporting the app component as a default export, we'll instead wrap the `App` component with the `withAuthenticator` higher order component.

#### App.js
```javascript 
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default withAuthenticator(App);
```

Now we're ready to test it out. To run the app, run `npm start`. 

#### Terminal 
```
npm start
```

Our app should now be protected by user authentication flow. The first thing we'll do is click create account and create a new account.

![Create an Account](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391499/transcript-images/react-native-use-the-aws-amplify-withauthenticator-hoc-to-implement-a-react-user-authorization-flow-create-account-in-app.jpg)

After the account has been created, you should receive an authentication code in your email. To confirm the sign up, paste in the authentication code from your email. After you've confirmed your account, sign into your account.

After we've signed in, we should be redirected to the main app. You'll notice that if you refresh the page, the user remains signed in. This is because the user session is stored in local storage.

![Main App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391499/transcript-images/react-native-use-the-aws-amplify-withauthenticator-hoc-to-implement-a-react-user-authorization-flow-main-app.jpg)

Next, let's add a sign out button. To do so we'll go back into `app.js` and pass in a second argument to `withAuthenticator`. Here, we'll pass in an object with an `includeGreetings` key set to `true`.

#### App.js
```javascript 
export default withAuthenticator(App, { includeGreetings: true});
```

Now when we refresh, we should see a sign out button at the top right corner of the page.

![Sign Out Button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391501/transcript-images/react-native-use-the-aws-amplify-withauthenticator-hoc-to-implement-a-react-user-authorization-flow-sign-out-button.jpg)

To view enabled Amplify services at any time, we can run `amplify status`. Here, we're given the resource name for the authentication that we just created.

#### Terminal
```
amplify status 
```

To view the Cognito authentication service in your AWS account, open the AWS console and search for Cognito. In the Cognito dashboard, click on manage user pools and then click on the user pool for the application that we just created.

Here, we can view the settings for the Amazon Cognito user pool that we've created and also view any of the users that have signed up.

![Amazon Cognito user pool](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391500/transcript-images/react-native-use-the-aws-amplify-withauthenticator-hoc-to-implement-a-react-user-authorization-flow-amazon-cognito-user-pool.jpg)
