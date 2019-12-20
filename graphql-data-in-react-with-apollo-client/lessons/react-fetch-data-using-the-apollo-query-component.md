The query component allows us to fetch data and provides the data as a render prop. We `import { ApolloProvider, Query } from "react-apollo";` and use it in our JSX tree. The `query` component has one mandatory prop, a query. For the query, we are again going to use the `gql` tag with a `query` string inside it. So far, so good.

#### app.js
```js
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            {
              recipes {
                id
                title
              }
            }
          `}
          >   
      </ApolloProvider>
    );
  }
}
  
export default App
```

The query component's child must be precisely one function. It receives a query result object containing the `data`. This `data` object initially is empty, but once loading finished, it contains the results of our query. Without the `recipes` attached to `data`, we `return null`. Once we receive the recipes, we can render them.

```js
{({data }) => {
  if (data.recipes === undefined) return null;

  return (
    <ul>
      {data.recipes.map(({ id, title }) => 
        <li key={id}>{title}</li>
      )}
    </ul>
  )
}}
```

Works like a charm. 

![image of the browser displaying the data as a list](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543362544/transcript-images/react-fetch-data-using-the-apollo-query-component-list.png)

There's one gotcha, however. At the moment, we don't know why our `recipes` are undefined, because they could be still loading or an error could have occurred. To help with that, the query component exposes two more properties, `loading` and `error`. It allows us to run a different UI depending on the state of the query.

```js
{({data, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <ul>
      {data.recipes.map(({ id, title }) => 
        <li key={id}>{title}</li>
      )}
    </ul>
  )
}}
```

If we refresh the web app, we can see our loading UI rendering until loading is finished and the actual data arrived. 

![image of the browser loading](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543362545/transcript-images/react-fetch-data-using-the-apollo-query-component-loading.png)

To test the error UI, we stop the server. As expected, we now see the error case is rendered.

![image of the browser showing the error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543362545/transcript-images/react-fetch-data-using-the-apollo-query-component-error.png)

Before I wrap up this lesson about the query component, we want to refactor the code a bit. First, we're going to extract the query component, fetching and rendering the recipes into its own recipes component. Of course, we also need the required imports. 

#### recipes.js
```js
import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default function() {
  return (
    <Query
      query={gql`
        {
          recipes {
            id
            title
          }
        }
      `}
    >   
      {({data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;

        return (
          <ul>
            {data.recipes.map(({id, title}) => 
              <li key={id}>{title}</li>
            )}
          </ul>
        )
      }}
    </Query>
  )
};
```

Then, we can use the recipes component inside our application. 

#### app.js
```js
import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import Recipes from "./recipes.js"

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Recipes /> 
      </ApolloProvider>
    );
  }
}
  
export default App
```

As you can see, our `recipes` still render, and our refactoring worked.

![image showing the recipes rendered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543362545/transcript-images/react-fetch-data-using-the-apollo-query-component-recipes-working.png)

Next up, we extract the `query` into its own constant. While this entirely depends on your preferences, I find the code easier to pass if the query is separate. 

#### recipes.js
```js
import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const recipesQuery = gql`
{
  recipes {
    id
    title
  }
}
`;

export default function() {
  return (
    <Query
      query={recipesQuery}
    >   
      {({data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;

        return (
          <ul>
            {data.recipes.map(({id, title}) => 
              <li key={id}>{title}</li>
            )}
          </ul>
        )
      }}
    </Query>
  )
};
```

Also, you can extract the `query` into a separate file inside or possibly even outside the component folder if you reuse it multiple times.