Now that we know how to query data from our AppSync API, let's look at how to perform mutations.

The first thing we'll do is we'll `import { graphqlMutation } from 'aws-appsync-react'`. 

### app.js
```js
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { graphqlMutation } from 'aws-appsync-react'
```

Next, we'll define our mutation. The mutation we'd like to create is create-to-do. The create-to-do mutation will take in two arguments, the title and the completed values.

```js
const CreateTodo = gql`
  mutation($title: String!, $completed: Boolean) {
    createTodo(input: {
      title: $title
      completed: $completed
    }) {
      id title completed
    }
  }
`
```

Next, in our class, we'll go ahead and create some initial state, setting a `todo:` value as an empty string. We'll also add an `addTodo` class method. Here, we'll check to see `if (this.state.todo)` is equal to an empty string. If it is, we'll `return` from the function. We'll then `const todo` object setting the title as `this.state.todo` and the `completed: false`.

```js
class App extends Component {
  state = { todo: '' }
  addTodo = () => {
    if (this.state.todo === '') return
    const todo = {
      title: this.state.todo,
      completed: false
    }
  }

  ...
}
```

 We'll then call `this.props.createTodo(todo)`. `this.props.createTodo` is a prop that we'll be creating and passing down as a prop in just a moment. Finally, we'll call `this.setState()`, resetting to-do to an empty string.

 ```js
 this.props.createTodo(todo)
    this.setState({ todo: '' })
  }
```

In the `render()` method, we'll have an `input` component that has an `onChange` method that will call `this.setState`, setting the `todo` value equal to the `e.target.value`. 

```js
render() {
  return (
    <div className="App">     
    ...

    <input
      onChange={e => this.setState({ todo: e.target.value })}
```

It will also have a value of `this.state.todo` and a placeholder of to-do-name. We'll then create a `button` with an `onClick` handler that will call `this.addTodo`. 

```js
<input 
  onChange={e => this.setState({ todo: e.target.value })}
    value={this.state.todo}/>
  <button onClick={this.addTodo}>
    Add Todo
  </button>
```

Finally, in `compose`, we'll add another argument of `grapql` mutation. `grapql` mutation takes three arguments -- the `mutation`, the `query` so we can update the UI with an optimistic response, and the `type`.

```js
export default compose(
  graphqlMutation(CreateTodo, ListTodos, 'Todo'),
```

Now we should be able to test this out. Open your terminal and run npm start. 

### Terminal
```bash
$ npm start
```

We should be able to now create new to-dos and have them show up in our in our UI with an optimistic response.

![image showing the succesful execution of the todo: ice cream](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665275/transcript-images/react-execute-mutations-to-an-aws-appsync-graphql-api-from-a-react-application-ice.png)

If we refresh the screen, we should see the data still rendered to our UI, showing that the data has indeed been stored in our database.

![image post refresh showing ice cream still there](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665275/transcript-images/react-execute-mutations-to-an-aws-appsync-graphql-api-from-a-react-application-ice.png-cream-refresh.png)

One of the most powerful things about the AWS AppSync client is that it actually works offline. To test this out, let's open the console and click on the network tab. Here, we can set our app as being offline by clicking offline. Now, if we create a new to-do, we see that our UI has been optimistically updated, but no network request has been initiated. 

![image showing the offline button and the updated UI](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665275/transcript-images/react-execute-mutations-to-an-aws-appsync-graphql-api-from-a-react-application-ice.png)

When we unclick offline to put our app back online, we see that the network request has now been executed.

![image showing online and executed network request](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665275/transcript-images/react-execute-mutations-to-an-aws-appsync-graphql-api-from-a-react-application-ice.png)