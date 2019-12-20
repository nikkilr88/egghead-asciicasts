Now that we've configured our React application to connect to our AppSync API, let's go ahead and query for data and render it to our screen. To do so, open `src/app.js`.

Here, we'll go ahead and `import gql from 'graphql-tag'` tag as well as `import { graphql, compose } from 'react-apollo'`. 

### index.js
```js
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
```

Next, we'll define our query. The query that we're going to execute is `listTodos`, which will return an `items{}` array with an `ID`, a `title` and a `completed` value for every item in the array.

```js
const ListTodos = gql`
  query listTodos {
    listTodos {
      items {
        id
        title
        completed
      }
    }
  }
`
```

Next, we'll scroll down and update our default export. Instead of exporting the `App` component, we're going to export the `compose` higher-order component, passing in app as the second function argument.

For the first argument to compose, we're going to go ahead and pass in a `graphql` query of `listTodos`. The second argument to `graphql` will be an object containing an `options:` object as well as a props object for any props we'd like to pass down to the component.

For the `options:`, we'll set a `fetchPolicy` of `cache-and-network` so that when the application loads, it will read first from the cache and then fetch data from the network. 

```js
export default compose(
  graphql(ListTodos, {
  options: {
    fetchPolicy: 'cache-and-network'
```

For the props, we'd like to pass down a prop of `todos`, which will reset as an empty array if `props.data.listTodos` does not exist.

If it does exist, we'll then pass down the `props.data.listTodos.items` array. 

```js
export default compose(
  graphql(ListTodos, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    todos: props.data.listTodos ? props.data.listTodos.items : []
  })
})
)(App);
```

Now, in our `render` method, we'll have access to `this.props.todos`. We'll map over the items in the `Todos` array, returning the item title for every item in the array.

```js
class App extends Component     
 render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {
          this.props.todos.map((todo, index) => (
            <p>{todo.title}</p>
          ))
        }
      </div> 
    );
  }
```

We should be able to test this out. Open your terminal and run npm start.

### Terminal
```bash
$ npm start
```
If this is successful, you should see the `todo` titles rendered to your screen.

![image of the titles rendered onscreen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665278/transcript-images/react-execute-queries-to-an-aws-appsync-graphql-api-from-a-react-application-success.png)