You can see a React app initially created using `create-react-app`.

#### app.js
```js
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
        <div>Hello World!</div>
    );
  }
}

export default App
```

I simplified the content and replaced the stars. To get started with Apollo Client, we run `npm install --save graphql apollo-boost react-apollo` to add the following npm packages, `GraphQL`, `apollo-boost`, and `react-apollo`.

#### Terminal
```bash
$ npm install --save graphql apollo-boost react-apollo
```

The GraphQL package is needed for certain features, like parsing GraphQL queries. `Apollo-boost` is a package coming with the well-configured `ApolloClient` to get started quickly. Last but not least, `react-apollo`. It integrates Apollo with React by providing multiple components and utils.

Then, we `import ApolloClient from "apollo-boost";` and instantiate a `new ApolloClient()`. The only mandatory option we need to provide is the `uri:` for our GraphQL endpoint. In this case, we're using `"http://localhost:4000/"`, since there I already have a GraphQL server running.

#### app.js
```js
import React, { Component } from "react";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});


class App extends Component {
  render() {
    return (
        <div>Hello World!</div>
    );
  }
}

export default App;
```

Let's verify that our client works as expected by requesting data from our GraphQL endpoint using a `.query`. It expects an object containing at least the `query` property. We write one using a template tag notation. What to fetch now? Our backend is a cookbook containing recipes. To get started, we can create all the `recipes`. For each of them, we request the `ID` and the `title`. 

```js
client
  .query({
    query: gql`
      {
        recipes {
          id
          title
        }
      }
    `
  })
```

We `import gql from "graphql-tag"`. Once the query resolves, we print out the results. 

```js
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
```
```js
client
  .query({
    query: gql`
      {
        recipes {
          id
          title
        }
      }
    `
  })
.then(result => console.log(result));
```

As you can see, once we loaded the page, the query was executed and our result logged in the console. So far, so good.

![image of the browswer showing the output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543362545/transcript-images/react-setup-and-connect-an-apollo-client-to-a-react-application-with-apollo-provider-result.png)

Since we have `ReactApollo` available, let's look into how we can set it up. We `import { ApolloProvider } from "react-apollo"` and use it inside our render function.

The provider requires an instantiated Apollo `{client}`. In our case, we take the one we already initialized. Once set up, the `ApolloProvider` now passes the client down the rendering tree via a React context feature.

```js
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
```
```js
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div>Hello World!</div>
      </ApolloProvider>
    );
  }
}
```

Using an `ApolloConsumer`, we can leverage this setup to use the client for our queries deeper down in our React rendering tree. 

```js
import { ApolloProvider, ApolloConsumer } from "react-apollo";
```

In this case, we take our existing query and run it inside the `ApolloConsumer` render prop. To comply to React's API expectations, we returned null. 

```js
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>Hello World!</div>
        <ApolloConsumer>
          {client => {
            client
            .query({
              query: gql`
                {
                  recipes {
                    id
                   title
                  }
                }
              `
            })
            .then(result => console.log(result));\
             return null;
          }}
        </ApolloConsumer>
      </ApolloProvider>
    );
  }
}
```

As you can see, we still got back some results.

![image of the results with the new code](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543362545/transcript-images/react-setup-and-connect-an-apollo-client-to-a-react-application-with-apollo-provider-final-data.png)

While `ApolloConsumer` can be useful in some cases, most of the time, you will be using the Query/Mutation component or higher-order components, all shifting with `ReactApollo`.