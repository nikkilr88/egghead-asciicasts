To add storage using Amazon S3, we'll run the `Amplify add storage` command. For the type of storage, we'll choose `content`. For the project name, you can either use the default or provide a name of your own.

#### Terminal 
```
amplify add storage
```

Next, we're prompted for a bucket name. If you do use a custom bucket name, please be aware that the bucket name needs to be unique.

For access, we only want to give `authorized users` access. For the type of access, we'll choose `read` and `write`. Now that the resources have been created locally, we'll run `amplify push` to create the service in our account.

```
amplify push
```

Once the resource has been successfully created in your account, go ahead and open up `App.js` in your text editor. The first thing we'll do is we'll `import` the `storage` API `from aws-amplify`. In the `class` definition, we'll create some initial `state` containing a `fileUrl`, a `file`, and a `filename`.

#### App.js
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { Storage } from 'aws-amplify'

class App extends Component {
  state = { fileUrl: '', file: '', filename: ''}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })
```

We'll create a `handleChange` method that will handle the file input. We'll save the file data in a variable we'll call `file`. Then we'll call `this.setstate`, setting the `fileUrl`, the `file`, as well as the `filename`.

```javascript 
class App extends Component {
  state = { fileUrl: '', file: '', filename: ''}
  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }
```

We'll next create a function called `saveFile` that will save the file in our S3 bucket. `SaveFile` will call `Storage.put`, passing in the `filename` as well as the `file data`.

```javascript 
class App extends Component {
  state = { fileUrl: '', file: '', filename: ''}
  handleChange = e => {
    const file = e.target.files[0]
    this.setState({
      fileUrl: URL.createObjectURL(file),
      file,
      filename: file.name
    })
  }
  saveFile = () => {
    Storage.put(this.state.filename, this.state.file)
    .then(() => {
    })
  }
```

If this is successful, we'll `console.log` `'successfully saved file!'` and then call `this.setstate`, resetting the `fileUrl`,the `file`, and the `filename`. If there's an `error`, we'll log out the `error`.

```javascript
  saveFile = () => {
    Storage.put(this.state.filename, this.state.file)
    .then(() => {
      console.log('successfully uploading file!')
      this.setState({ fileUrl: '', file: '', filename: ''})
    })
    .catch(err => {
      console.log('error uploading file!', err)
    })
  }
```

In our `render` method, we'll first create a `file input` and set the `onChange` handler to `this.handleChange`. We'll then create an `<img>` with the `source` set to `this.state.fileUrl`. Finally, we'll create a `<button>` with an `onclick` handler set to `this.saveFile`.

```html   
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input type='file' onChange={this.handleChange} />
        <img src={this.state.fileUrl} />
        <button onClick={this.saveFile}>Save File</button>
      </div>
    );
  }
}
```

Now we can test it out. Open the Terminal and run `npm start`. 

#### Terminal 
```
npm start
```

Here, we should be able to upload and save files. If the save is successful, we should see `successfully saved file!` logged out to the console.

![Successfully Saved File!](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391501/transcript-images/react-native-store-data-in-amazon-s3-with-react-successfully-saved-file.jpg)

Let's take a look at the bucket. To view your S3 buckets, open the AWS console and search for S3 in the AWS Services search bar.

In the S3 dashboard, we can now search for the name of the bucket we just created. In the public folder, we should now see any images that we uploaded.

![Public Folder Images](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391502/transcript-images/react-native-store-data-in-amazon-s3-with-react-s3-public-folder-images.jpg)

Next, let's look at how to get images from our S3 bucket. To do so, click on an image that we've uploaded already and save the name of the file to your clipboard.

Next, we'll go back to `App.js` and make some updates. The first thing we'll do is we'll remove all of the `state` with the exception of the `fileUrl`. We'll remove the two existing `class` methods and replace them with a `componentDidMount` lifecycle method. `ComponentDidMount` will call `Storage.get`, passing in the `name` of the image, and then calling `this.setState`, resetting the value of `fileUrl`.

#### App.js
```javascript
class App extends Component {
  state = { fileUrl: ''}
  componentDidMount() {
    Storage.get('1500x500.jpeg')
    .then(data => {
      this.setState({
        fileUrl: data
      })
    })
    .catch(err => { 
      console.log('error fetching image')
    })
}
```

In our `render` method, we can go ahead and delete the `<input>` as well as the `<button>` components. 

```html 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <img src={this.state.fileUrl} />
      </div>
    );
  }
}
```

To test it out, open the Terminal and run `npm start`. 

#### Terminal 
```
npm start 
```

When the app loads, we should see the image render to our screen.

![Image Rendered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391505/transcript-images/react-native-store-data-in-amazon-s3-with-react-image-rendered.jpg)

Storage also has a `storage.list` method that will list out all of the images available in the S3 bucket. To learn more, check out the docs at [aws-amplify.github.io](aws-amplify.github.io).