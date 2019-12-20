Instructor: [00:00] Now that we have an account, we can log in. Let's look at our mutation's list. We should see that there is a logIn mutation. I'm going to go ahead and write that here in our query document. We'll use `logIn` with the capital I. We'll use our `username`, our `password`.

```graphql
mutation {
  logIn(username: "ep123" password: "pass") {

  }
}
```

[00:16] What's returned from the `logIn` mutation is a type called the `logIn` payload. This is a custom object that returns both the customer, all the of the customer details, and the user token. We're going to use the user token to validate that the user is authorized.

![Log in schema](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/authenticate-a-user-with-a-graphql-mutation-log-in-schema.png)

[00:31] When we send the `logIn` mutation, we're going to have access to all of the customer details. Grab their `name`. We're going to grab the `token`.

```graphql
mutation {
  logIn(username: "ep123" password: "pass") {
    customer {
      name
    }
    token
  }
}
```

[00:40] Let's go ahead and hit play. We see our customer name, which is my name that I provided when I created my account. I also see my token.

![Customer information returned](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/authenticate-a-user-with-a-graphql-mutation-customer-info.png)

We're going to place this in another panel here at the bottom called HTTP headers.

[00:53] Now, this is easy to get mixed up with query variables. We'll make sure that we're in the HTTP header section and we'll add the authorization key. We'll add `Bearer`. We'll paste in this token.

#### HTTP Headers panel

```graphql
{
  "Authorization": "Bearer your-token-here"
}
```

[01:07] Once I provide this token in the HTTP headers, I'm going to be able to send queries that are only for authorized uses. Now the query I am going to send here is called "`me`". Me is going to give me information about myself, the currently authenticated user.

#### GraphQL playground

```graphql
query {
  me {

  }
}
```

[01:23] The Me query returns customer details for anyone who's logged in. Here I'll query the name field. I'm going to add an operation `name`, because I have two different operations here in my query document. I'll call query `Me`, and I'll call the mutation `LogIn`.

```graphql
query Me {
  me {
   name
  }
}

mutation LogIn {
```

[01:37] Now, I can send this query and I should see all of the details for myself, because I am a logged in user. Since I'm logged in, I'll be able to check in and check out pets.
