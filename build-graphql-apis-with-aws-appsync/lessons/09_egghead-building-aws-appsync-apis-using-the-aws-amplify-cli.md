In addition to creating and managing our AppSync APIs from the AWS console, we can also do so using the aws-amplify CLI. The first thing we'll do is we'll install the CLI by running `npm install -g @aws-amplify/cli`.

### Terminal
```bash
$ npm install -g @aws-amplify/cli
```

Once the CLI has been installed, we'll run `amplify configure` to configure the CLI with the user from our AWS account. This should open up the AWS console. 

### Terminal
```bash
$ amplify configure
```
![image showing the AWS console which opens upon running the terminal command](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673413/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-console.png)

Once the console is open, sign into your account and jump back to the command line. Next, we'll be asked to specify an AWS region, and then the username for the new user that we're about to create.

### Terminal
```bash
Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue

Specify the AWS Region
? region: us-west-2
Specify the username of the new IAM user:
? user name: amplify-cli-us-west-user-2
Complete the user creation using the AWS console
https://console.aws.amazon.com/iam/home?region=...
Press Enter to Continue
```

Next, this should open up the IAM console on the AWS dashboard. 

![image of the IAM console on the AWS dashboard](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673412/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-IAMconsole.png)

Here, we can accept all of the defaults by clicking the `Next Permissions` button, `Next Review` button, and then the `Create User` button. Once the user's been created, we'll be given an access key ID and a secret access key.

![image of the access key ID screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673412/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-key.png)

Copy the access key ID to the clipboard and jump back to the command line. Here, we'll paste in the access key ID to the prompt, go back to the AWS console, copy the secret access key, and paste it into the prompt as well. Finally, we'll be prompted for a profile name for the new user.

### Terminal
```bash
Enter the access key of the newly created user:
? accessKeyId: AKIAJIB657**********
? secretAccessKey: Ni5igJ1NpWwslj3Mp2t0********************
This would update/create the AWS Profile in your local machine
? Profile Name: us-west-2-demo-user

Successfully set up the new user.
------ 
$ 
```

Now that the CLI has been installed and configured, let's go ahead and create a new React application that we'll use later on to interact with the new API.

```bash
$ create-react-app my-restaurant-app
```

Once the React application has been created, we'll `cd` into the new directory, and run `amplify init` to initialize a new Amplify project. 

```bash
$ cd my-restaurant-app
$ amplify init
```

Here, we'll be prompted for the default editor, the type of app that we're building, the framework that we're using, the directory path, the distribution directory path, the build command, and the start command.

Next, we'll be asked if we'd like to use an AWS profile. We'll choose yes, and choose the profile that we just created. 

![image showing prompting answers and user profile choice](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673414/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-demo-user.png)

Once the project's been initialized, we can begin adding new services by running amplify add. The first service we'd like to add is the GraphQL API. We'll run amplify add api.

```bash
$ amplify add api
```

For the type of service that we'd like to create, we'll choose GraphQL. For the API name, we'll call the API `myrestaurantapp`. For the authorization type, we'll choose `API key`. When we're asked if we have an annotated GraphQL schema, we'll choose `No`. Next, we're asked if we'd like to have a guided schema creation. We'll choose `Yes`, and for what best describes our project, we'll choose a `Single object with fields`. Now, we're asked if we'd like to edit the schema. We'll choose `Yes`, and this should open up the schema into our editor of choice. 

![image showing all the answers to the previous questions](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673413/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-demo-qs.png)

For the schema, we'll create a schema with a `type Restaurant`, that has an `id: ID!`, a `name: String!`, a `description: String`, and a `location: String` field. 

### schema.graphql
```graphql
type Restaurant @model {
  id: ID!
  name: String!
  description: String
  location: String
}
```

Once you've updated the schema, click save and jump back to the command line. Now that the GraphQL configuration is complete, we can run `amplify push` to create the new AWS AppSync GraphQL API in our account.

### Terminal
```bash
$ amplify push
```

Now that the API has been created, let's jump back to the AWS console to view the API in our account. From within the AWS account, double-check to make sure you're in the same region in which you created your API.

![image of region double check in the AWS console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673413/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-regioncheck.png)

Next, click on AWS AppSync, or search for AWS AppSync in the AWS services search bar. In the AppSync dashboard, click on the name of the API that we just created. 

To test out the API, click on queries, so we can begin running queries and mutations against the API. 

![image of the queries screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673412/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-queries.png)

The first operation we'd like to execute is a mutation to create a new restaurant. To view the API documentation, click on the docs link in the right corner of the screen. 

Here, we see that `createRestaurant` takes an `input:` with a `name`, a `description` and a `location` field. 

```graphql
mutation create {
  createRestaurant(input: {
    name: "Babalu"
    description: "Great tapas"
    location: "Jackson, MS"
  }) {
    id name description location
  }
}
```

To execute an operation, click on the orange play button.

![image showing the output of clicking the orange play button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673413/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-orangeplaybutton.png)

Now that we've created a couple items in our API, let's go ahead and query for those items. 

```graphql
mutation create {
  createRestaurant(input: {
    name: "Manship"
    description: "Great lunch"
    location: "Jackson, MS"
  }) {
    id name description location
  }
}
```

The query that we're going to run is list restaurants. `listRestaurants` returns an `items` array with an `id`, a `name`, a `description`, and a `location` for every item in the array. 

```graphql
query list {
  listRestaurants {
    items {
      id 
      name 
      description
      location
    }
  }
}
```
![image showing the result of running the list function](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673413/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-list.png)

We can also pass in a filter argument for filtering and searching.


```graphql
query list {
  listRestaurants(filter: {
    description: {
      contains: "lunch"
    }
  }) {
    items {
      id 
      name 
      description
      location
    }
  }
}
```
![image showing the filtered results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673413/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-listfilter.png)

Now that the API has been created, let's jump back to the React app to begin querying for items within our React application. The first thing we'll need to do is `yard add aws-amplify`.

### Terminal 
```bash
$ yard add aws-amplify
```

Once Amplify has been installed, open `src/index.js` to configure the React application. 

```bash
$ code .
```

Here, we'll `import Amplify from 'aws-amplify'`, some configuration that was created for us in aws-exports.js, and then call `Amplify.configure(config)`, passing in the config. 

### index.js
```js
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)
```

In `src/app.js`, `import { API, graphqlOperation } from 'aws-amplify'`.

### app.js
```js
import { API, graphqlOperation } from 'aws-amplify'
```

Next, we'll define a `query` of `listRestaurants` that returns the `items` array. 

```js
const query = `
  query {
    listRestaurants {
      items {
        id name description location
      }
    }
  }
'
```

In the class definition, we'll first create an initial state, with an empty restaurants array. In `componentDidMount`, we'll `query` the `data` from our API, and then call `this.setState`, updating the `restaurants` array with the `data` that's returned from our API.

```js
class App extends Component {
  state = { restaurants: [] }
  asynce componentDidMount() {
    const data = await API.graphql(graphqlOperation(query))
    this.setState({
      restaurants: data.data.listRestaurants.items
    })
  }
}
```

Finally, in our render method, we'll map over the restaurants array, showing the restaurant name for every item in the array. 

```js
this.state.restaurants.map((restaurant, index) => (
   <p key= {index}>{restaurant.name}</p>
))
```

To test everything out, we'll run npm start, and launch the application in our browser. 

### Terminal 
```bash 
$ npm start
```

If everything's working correctly, we should see the two restaurants show in our URL.

![image of the app in the browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542673412/transcript-images/egghead-building-aws-appsync-apis-using-the-aws-amplify-cli-finalbrowserrender.png)
