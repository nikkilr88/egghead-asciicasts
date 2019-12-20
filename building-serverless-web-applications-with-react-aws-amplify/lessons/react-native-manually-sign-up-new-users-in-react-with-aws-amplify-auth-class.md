Starting in `App.js`, the first thing we'll do is we'll `import auth from` the `AWS-Amplify-library`. Next, we'll create some initial `state`. We'll need to keep up with the `username`, `password`, `email`, `phone_number`, and `authenticationCode` for the user that is being signed up.

#### App.js
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Auth } from 'aws-amplify'

class App extends Component {
  state = { username: '', password: '', email: '', phone_number: '', authenticationCode: '' }
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

export default App
```

Next, we'll need an `onChange` handler to handle the user's text input. This function will call `this.setState`, setting the `event.target.name` and the `event.target.value`.

```javascript
class App extends Component {
  state = { username: '', password: '', email: '', phone_number: '', authenticationCode: '' }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    return (
```

We'll next create a `signUp` and `confirmSignUp` class method. `signUp` will be `async`, so we'll create a try catch block. We'll first destructure the `username, password, email, phone_number` from the `state`. We'll then call `auth.signUp`, passing in the `username` and `password` as well as an `attributes` object containing the `email` and the `phone_number`. If the sign up is successful, we'll `console.log('successfully signed up!')`

```javascript
  signUp = async () => {
    const { username, password, email, phone_number} = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number } })
      console.log('successfully signed up!')
    } catch (err) { console.log('error signing up: ', err) }
  }
  confirmSignUp = async () => {

  }
  render() {
    return (
```

`confirmSignUp` will handle the multi factor authentication, so we'll destructure both the `username` and the `authenticationCode` from the `state`. Here we'll also set up a try catch block. We'll call `Auth.confirmSignup`, passing in the `username` and the `authenticationCode`. If this is successful, we'll `console.log('user successfully signed up!')`

```javascript
  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state
    try {
      await Auth.confirmSignUp(username, authenticationCode)
      console.log('user successfully signed up!')
    } catch (err) { console.log('error confirming sign up: ',err)}
  }
```

This component will contain two forms, one for signing up and one for confirming the sign up. We'll create a variable called `step` that we'll use to toggle these two forms.

```javascript
class App extends Component {
  state = { username: '', password: '', email: '', phone_number: '', authenticationCode: '', step: 0 }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
```

In our `render` method we'll check to see if `this.state.step` is equal to `zero`. If it is, we'll show the sign in form. The sign up form will contain four inputs, each with an onChange method, a name property, and a style property.

```html 
  render () {
    return (
      <div class=className="App">
        {
          this.state.step === 0 && (
            <div>
              <input onChange={this.onChange} name='username' style={styles.input} />
              <input onChange={this.onChange} name='password' style={styles.input} />
              <input onChange={this.onChange} name='email' style={styles.input} />
              <input onChange={this.onChange} name='phone_number' style={styles.input} />
            </div>
          )
        }
      </div>
    );
  }
)
```

We'll also add a `placeholder` attribute. Finally, we'll create a Sign Up `<button>` that will call `this.signUp` when clicked. To create the `confirmSignUp` form, we can just copy and paste the `signUp` form to get started.

```html
      <div class=className="App">
        {
          this.state.step === 0 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input} />
              <input placeholder='password' onChange={this.onChange} name='password' style={styles.input} />
              <input placeholder='email' onChange={this.onChange} name='email' style={styles.input} />
              <input placeholder='phone_number' onChange={this.onChange} name='phone number' style={styles.input} />
              <button onClick={this.signUp}>Sign Up</button>
            </div>
          )
        }
        {
          this.state.step === 1 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input} />
              <input placeholder='password' onChange={this.onChange} name='password' style={styles.input} />
              <input placeholder='email' onChange={this.onChange} name='email' style={styles.input} />
              <input placeholder='phone_number' onChange={this.onChange} name='phone number' style={styles.input} />
              <button onClick={this.signUp}>Sign Up</button>
            </div>
          )
        }
      </div>
```

This form will only need two `inputs`, one for the `username` and one for the `authentication code`. The `<button>` for this form will call `this.confirmSignup`.

```html
        {
          this.state.step === 1 && (
            <div>
              <input placeholder='username' onChange={this.onChange} name='username' style={styles.input} />
              <input placeholder='authentication code' onChange={this.onChange} name='authentication code' style={styles.input} />
              <button onClick={this.confirmSignUp}>Confirm Sign Up</button>
            </div>
          )
        }
      </div>
```

Finally, in `signUp` we'll call `this.setState`, setting the `step` to `one` if the sign up is successful. Next, we'll scroll to the bottom of the component and we'll add a styles variable, setting the styles for the input components.

```javascript
  signUp = async () => {
    const { username, password, email, phone_number} = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number } })
      console.log('Successfully signed up!')
      this.setState({ step: 1 })
    } catch (err) { console.log('error signing up: ', err) }
  }
  confirmSignUp = async () => {

  }
  render() {
    return (
```

Next, we'll scroll to the bottom of the component and we'll add a `styles` variable, setting the `styles` for the `input` components.

```javascript
const styles = {
  input: {
    height: 35, margin: 5
  }
}
```

To test this out, let's run `npm start`. 

#### Terminal 
```console 
npm start 
```

When we sign up a new user, we should see "Successfully signed up" logged out to the console. We should also see the confirm sign up form appear on our screen.

![Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391500/transcript-images/react-native-manually-sign-up-new-users-in-react-with-aws-amplify-auth-class-successfully-signed-up.jpg)

To confirm sign up, use the username you just created as well as the authentication code you received in your email and click Confirm Sign Up. If the sign up is successful, you should see "User successfully signed up" logged out to the console.

To make sure that this user exists, let's jump into the AWS dashboard and go to the Cognito console to look at the new user. In the Cognito dashboard we'll click on 'Manage User Pools' and then we'll click on the name of the user pool for our app. When we click on 'Users and groups', we should now see the new user appear.

![New User](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391501/transcript-images/react-native-manually-sign-up-new-users-in-react-with-aws-amplify-auth-class-cognito-console-user-pool-new-user-exists.jpg)