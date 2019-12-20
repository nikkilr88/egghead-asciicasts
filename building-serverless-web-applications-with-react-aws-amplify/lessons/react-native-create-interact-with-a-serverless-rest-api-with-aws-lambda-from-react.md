To add a `REST` API using a AWS Lambda function, we can run the `amplify add API` command. For the type of service, we'll choose `REST`. The API that we'll be creating will be fetching a list of people. We'll call the API `PeopleAPI`. For the path, we'll give it a path of `/people`.

#### Terminal
```
amplify add api
people api
/people
```

For the Lambda function data source, we'll `Create a new Lambda function`. Next, we're asked for a label for the Lambda function. We'll call this `peoplefunction`. For the name of the Lambda function, we'll also call it `peoplefunction`. For the function template that we'd like to use, we'll use a `Serverless express function`.

```
Create a new Lambda function
peoplefunction
peoplefunction
```

Next, we'll be asked if we'd like to edit the local function now. We'll choose `yes`. This should open up `amplify/backend/function/peoplefunction/source/app.js` in our text editor.

In `App.js`, we'll see the code for our Lambda function. We'll scroll down until we see `app.get/people`. Right now, `/people` is returning an object with the `success` property and a `URL`. We'll go ahead and create a new array called `people` and hard-code some data.

#### app.js
```javascript
/**********************
* Example get method *
***********************/

app.get('/people', function(req, res) {
  const.people = [
    { name: 'Nader' , hair_color: 'brown' },
    { name: 'Lilly' , hair_color: 'black' },
    { name: 'Victor' , hair_color: 'blonde' }
  ]
  res.json({success:' 'get call succeed!', url: req.url});
});

app.get('/people/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});
```

Next, we'll update the response to return the array of `people`. 

```javascript
/**********************
* Example get method *
***********************/

app.get('/people', function(req, res) {
  const.people = [
    { name: 'Nader' , hair_color: 'brown' },
    { name: 'Lilly' , hair_color: 'black' },
    { name: 'Victor' , hair_color: 'blonde' }
  ]
  res.json({
    people
  });
});

app.get('/people/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});
```

Save this file and drop back to the command line. We're next asked if we'd like to restrict API access. Since we have authentication enabled,we'll choose `yes`. For access, we'll give `Authenticated users only` access. For the type of access, we'll choose `read`.


With the local configuration created, we can run `amplify push` to push the new configuration to our account and create the resources. 

#### Terminal 
```
amplify push 
```

Once the resources have been created, open up `App.js`. Here, we'll first `import API from 'AWS-Amplify'`.

#### App.js
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react'
import { API } from 'aws-amplify'
```

In our `class` definition, we'll define an initial `state` of `people` and set it to an `empty` array. We'll create a `componentDidMount` lifecycle method that we'll call `API.get`. Here we'll pass in the name of the API as well as the path that we would like to fetch.

```javascript 
class App extends Component {
  state = { people: [] }
  async componentDidMount() {
    const data = await API.get('peopleapi', '/people')
}
```

The data returned from the API will be an object with an array of people. When the data is returned from the API, we'll call `this.setstate`, setting the `value` of `people` to `data.people`.

```javascript 
class App extends Component {
  state = { people: [] }
  async componentDidMount() {
    const data = await API.get('peopleapi', '/people')
    this.setState({ people: data.people })
}
```

In our `render` method, we'll `map` over the `people` array, showing the person's `name` as well as the `hair_color` for every `item` in the array.

```javascript 
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.state.people((person, i)) => (
            <div>
              <h3>{ perosn.name }</h3>
              <p>{ person.hair_color }</p>
            </div>
          ))
        }
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true })
```

Now we'll save the file, and we'll run `npm start` to launch the app.

#### Terminal 
```
npm start 
```

If everything is working properly, we should see the data rendered to our screen. 

![Rendered Data](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391501/transcript-images/react-native-create-interact-with-a-serverless-rest-api-with-aws-lambda-from-react-data-rendered-in-app.jpg)

Right now, our API is only returning hard-coded data. Let's update the API to fetch data from a third-party API. To do so, we're going to need to install the Axios package to send HTTP requests. Change into `amplify/backend/function/peoplefunction/src`.

#### Terminal
```
cd amplify/backend/function/peoplefunction/src
```

[04:06] From within this directory, we'll go ahead and install the Axios package. 

```
yarn add axios 
```

We'll next open `App.js` from the `backend/function/peoplefunction/source` folder. Here, we'll first `require axios` from the Axios package. We'll then call `axios.get`, passing in the URL for the open source Star Wars API. Axios will `return` a `promise`. We'll set a `.then` and a `.catch` function. If there's an `error`, we'll return a `JSON` object containing an `error` property and setting `people` to `null`.

#### App.js
```javascript
/**********************
* Example get method *
***********************/

var axios = require('axios')
app.get('/people', function(req, res) {
  //const.people = [
  //  { name: 'Nader' , hair_color: 'brown' },
  //  { name: 'Lilly' , hair_color: 'black' },
  //  { name: 'Victor' , hair_color: 'blonde' }
  // ]
  axios.get('https://swapi.co/api/people/')
    .then()
    .catch(err => {
      res.json({
        error: err, 
        people: null
      });
    })
});
```

If it's successful, we'll go ahead and create a new variable called `people`, setting it to `response.data.results`. We'll then return a `JSON` object with an `error` property set to `null` along with the `people` array.

```javascript
  axios.get('https://swapi.co/api/people/')
    .then(response => {
      const people = response.data.results
      res.json({
        error: null, 
        people:
      })
    })
    .catch(err => {
      res.json({
        error: err, 
        people: null
      });
    })
});
```

Since we've made changes to our Lambda function, we're going to need to run `amplify push` again.

#### Terminal 
```
amplify push 
```

Once the resources have been updated in your account, we'll run `npm start` to restart the React app. 

```
npm start 
```

When the app loads, we should now see the data being returned from the Star Wars API.

![Star Wars API data](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391502/transcript-images/react-native-create-interact-with-a-serverless-rest-api-with-aws-lambda-from-react-star-wars-api-data.jpg)
