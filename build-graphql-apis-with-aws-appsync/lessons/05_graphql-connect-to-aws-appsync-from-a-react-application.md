Now that we've created our AWS AppSync API, let's go ahead and create a new React application that we'll use to interact with the API. Using `create-react-app todo-app`, we'll create a new React application called TodoApp.

### Terminal
```bash
$ create-react-app todo-app
npx: installed 63 in 3.436s

Creating a new React app in /Users/samgrinis/todo-app.

...

Installing react, react-dom, and react-scripts...

...

+ react@16.6.3
+ react-dom@16.6.3
+ react-scripts@2.1.1
added 1768 packages from 678 contributors and audited 35639 packages in 30.465s
found 0 vulnerabilities

...

We suggest that you begin by typing:

  cd todo-app
  npm start

Happy hacking!
```

After the application has been created, let's go ahead and change into the new directory to install some dependencies. 

```bash
$ cd todo-app
```


Use either `yarn add aws-appsync aws-appsync-react graphql-tag react-apollo` or `npm i aws-appsync aws-appsync-react graphql-tag react-apollo`.

```bash
$ npm i aws-appsync aws-appsync-react graphql-tag react-apollo

+ aws-appsync@1.4.0
+ aws-appsync-react@1.2.0
+ graphql-tag@2.10.0
+ react-apollo@2.3.1
added 53 packages from 177 contributors and audited 35774 packages in 10.49s
found 0 vulnerabilities
```

After the dependencies have finished installing, go ahead and open up the application in your code editor. 

```bash
code .
```

The first thing we'll do here is we'll create a new file in our source directory called `AppSync.js` that will hold our AppSync configuration.

![image of the code opened in VSC and with the addititino of AppSync.js](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665280/transcript-images/graphql-connect-to-aws-appsync-from-a-react-application-vsc.png)

Next, we'll open up our AWS AppSync dashboard, scroll to the bottom, and click the download button to download the AWS AppSync.js config file.

![image of the dashboard with the download button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665293/transcript-images/graphql-connect-to-aws-appsync-from-a-react-application-download.png)

After the file has been downloaded, open it up in your code editor, copy the contents, and past it into the new `AppSync.js` file that we just created in our new project.

![image of the code pasted into the new appsync.js file](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665286/transcript-images/graphql-connect-to-aws-appsync-from-a-react-application-pasted.png)

Next, open up `source/index.js`. We'll `import Client from 'aws-appsync'`, `import { ApolloProvider } from 'react-apollo'`, `import { rehydrated } from 'aws-appsync-react'`, and then `import AppSync from './AppSync'` that we just created.

### index.js
```js
import Client from 'aws-appsync'
import { ApolloProvider } from 'react-apollo'
import { rehydrated } from 'aws-appsync-react'
import AppSync from './AppSync'
```

Next, we'll create a variable called `client` by creating a new AppSync client, passing in the URL, region, and authentication information for the client configuration.

```js
const client = new Client({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AppSync.authenticationType,
    apiKey: AppSync.apiKey
  }
})
```

Next, we'll `const` a new component called `withProvider` that will be the new entry point for our application. This will contain the `<ApolloProvider>` wrapping the `<Rehydrated>` component from aws-appsync-react, which then wraps the main `<App />` component. Finally, for the client prop to `</ApolloProvider>`, pass in the new client variable that we just created.

```js
const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)
```

For the component argument to `ReactDOM.render`, replace the `<App />` component with the new `withProvider` component that we just created.

```js
ReactDOM.render(<WithProvider />, document.getElementById('root'));
registerServiceWorker();
```

To make sure that everything is working correctly, we'll go ahead and run the React application by running `npm start`.

### Terminal
```bash
$ npm start
```

If the React app loads and there aren't any errors, then you're ready to go to the next step.

![image showing the loaded react app successful](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665277/transcript-images/graphql-connect-to-aws-appsync-from-a-react-application-no-errors.png)
