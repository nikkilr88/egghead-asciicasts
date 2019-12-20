To add subscriptions, the first thing we'll need to do is `import { buildSubscription } from 'aws-appsync'`. 

### app.js
```js
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { graphqlMutation } from 'aws-appsync-react'
import { buildSubscription } from 'aws-appsync'
```

We'll next define our subscription that will hook into the `onCreateTodo` subscription.

```js
const SubscribeToTodos = gql`
  subscription onCreateTodo {
    onCreateTodo {
      id
      title
      completed
    }
  }
`
```

Next, in our `ListTodo`'s graphql operation, we'll pass in a new prop called `subscribeToMore` that will be set to `props.data.subscribeToMore`.

```js
export default compose(
  graphql(ListTodos, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      subscribeToMore: props.data.subscribeToMore,
      todos: props.data.listTodos ? props.data.listTodos.items : [],
      data: props.data
```

Finally, we'll create a `componentDidMount` lifecycle method that we'll call `this.props.subscribeToMore` passing in the `buildSubscription` helper. BuildSubscription takes two arguments, the subscription definition and the query which we'd like to update when the subscription comes through. 

```js
class App extends Component {
  state = {
    todo: ''
  }
  componentDidMount() {
    this.props.data.subscribeToMore(
      buildSubscription(SubscribeToTodos, ListTodos)
    )
  }

...

}
```

Now, we're ready to test this out. Open up your terminal and run npm start.

### Terminal
```bash
$ npm start
```

To test our GraphQL subscriptions, we're going to open up two browser windows in order to see that the data is coming through in the other browser. When we create a Todo in one browser, we should see the other browser update with a new data.

![image showing the todo in the first browswer also in the second browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665283/transcript-images/apollo-subscribe-to-new-data-in-a-react-application-with-aws-appsync-graphql-subscriptions-double.png)
