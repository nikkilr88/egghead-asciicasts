To execute a mutation or a query, click on the queries link in the left-hand menu to open the graphical editor. To view available `queries`, `mutations` and `subscriptions`, we can click on the docs link on the right side of the page. To view available mutations, click on mutation. 

![image of the queries graphical editor](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665291/transcript-images/graphql-create-your-first-aws-appsync-graphql-api-graphical-queries.png)

Here, we see three available mutations -- `createTodo`, `updateTodo` and `deleteTodo`. 

![image of the screen with the createTodo, updatedTodo, and deleteTodo options](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665287/transcript-images/graphql-create-your-first-aws-appsync-graphql-api-todo-create.png)

The first mutation we'd like to create is `createTodo`, so I'll go ahead and define a new `mutation` called create that will execute createTodo.

`CreateTodo` takes an `input` of type `createTodo(Input)`. `createTodo(Input)` accepts a `title` and a `completed` value. From this mutation, we'll return an `ID`, a `title` and a `completed` value. To execute the mutation, click on the orange play button.

### Queries
```javascript
mutation create{
  createTodo(input: {
    title: "Get Groceries"
    completed: false
  }) {
    id
    title
    completed
  }
}
```
Now that we've successfully executed a mutation, let's open up our data source to view the data in our table. In the table view, we should be able to click on the items tab to view the data in our table.

![view of the data table based on the executed mutation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665289/transcript-images/graphql-execute-mutations-within-the-aws-appsync-console-todo-table.png)

Next, let's go ahead and copy the ID of the Todo to our clipboard. 

![image of the id string we need to copy](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665286/transcript-images/graphql-execute-mutations-within-the-aws-appsync-console-id-string.png)

The next mutation we'd like to execute is an update. We'll create a `mutation update` and execute the update to do a mutation. For the `input: {ID...`, we'll paste in the `ID` that we copied onto our clipboard from the database. The update to do a mutation will change the `completed` value from false to `true`.

```javascript
mutation update {
  updateTodo(input: {
    id: "c20f55bb-5645-4d6c-17487286bc31"
    completed: true
  }) {
    id title completed
  }
}
```

In our data source, we should now see the completed value change from false to true when we refresh. 

![image of the data file value changed from false to true](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665289/transcript-images/graphql-execute-mutations-within-the-aws-appsync-console-true.png)

Finally, let's go ahead and create a delete mutation. This mutation will execute the `deleteTodo` mutation, taking an `input` with an ID field being the `ID` that we copied earlier to our clipboard.

```javascript
mutation delete {
  deleteTodo (input: {
    id: "c20f55bb-5645-4d6c-17487286bc31"
  }) {
    id title completed
  }
}
```

Once we execute this mutation, we should be able to go back to our data source, refresh and see that the item has been deleted.

![image showing that the item has been deleted](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665287/transcript-images/graphql-execute-mutations-within-the-aws-appsync-console-deleted.png)
