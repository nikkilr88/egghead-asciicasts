To begin querying for data, we first need to make sure that there's data available in our database to query against. To go ahead and input the data into our database, we'll go ahead and execute a couple of `createTodo` mutations.

### Queries
```javascript
mutation create {
  createTodo(input: {
    title: "Book Flight"
    completed: false
  }) {
    id 
    title 
    completed
  }
}
```
![image of the result of running this bit of code](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665286/transcript-images/aws-executing-queries-within-the-aws-appsync-console-book-flight.png)

Now that the mutations have been executed, we can click on docs and then query to view the available queries. Here we see two available queries, `getTodo`, which returns a single to-do, and `listTodos`, which returns an array of to-dos. 

![image of the queries getTodo and listTodos](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665287/transcript-images/aws-executing-queries-within-the-aws-appsync-console-docs-queries.png)

The first query we'd like to execute is the `listTodos` query.

`ListTodos` returns a `TodoConnection` input. `TodoConnection` contains an items array and a next token that's a string. For our `query`, we'll only return the array of items. Each item in the `items` array is a type of to-do which has a property of `id`, `title`, and `completed`. 

```javascript
query list {
  listTodos {
    items {
      id title completed
    }
  }
}
```

When we execute this query, we should see `listTodos` return with an array of items.

![image showing the array of items from listTodos](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665288/transcript-images/aws-executing-queries-within-the-aws-appsync-console-list-todos.png)

The next query we'd like to execute is `getTodo`. `getTodo` takes in an id as as argument and returns a single to-do. To test this out, we'll create a `query get` that will execute the `getTodo` query, passing in the `id` of the workout to-do.

```javascript
query get {
  getTodo(id: "0c49440a-e644-4c3b-9ae1-188-e2743565b") {
    title completed
  }
}
```
![image showing the result of executing this single todo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665291/transcript-images/aws-executing-queries-within-the-aws-appsync-console-single-todos.png)

`ListTodos` also has a filter property that's useful for doing filtering and searching. We'll test this out by creating a `listTodos` query with a filter that filters on the `title` with titles only containing the string "Work Out."

```javascript
query list {
  listTodos(filter: {
    title: {
      contains: "Work Out"
    }
  }) {
    items {
      id title completed
    }
  }
}
```

![image showing the result of running this filtered todo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665291/transcript-images/aws-executing-queries-within-the-aws-appsync-console-single-todos.png-contain.png)


It may be useful to filter our to-dos based on the completed value. To test this out, let's go ahead and execute a `mutation update` the completed value of one of our to-dos to `completed: true`.

```javascript
mutation update {
  updateTodo(input: {
    id: "0c49440a-e644-4c3b-9ae1-188-e2743565b"
      completed: true
  }) {
    id
  }
}
```
![image showing the mutation update on the todo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542665288/transcript-images/aws-executing-queries-within-the-aws-appsync-console-mutuation-update.png)

Now we can update our filter to filter on the completed value equal to true.
