Instructor: [00:00] At this point, we've requested data with queries, we've changed data with mutations. There's one more operation type, though, with GraphQL. That is a GraphQL subscription. Let's say we wanted to set up a real-time listener for anytime a pet is returned.

[00:16] The way that we would do this is to use a subscription. Let's close the schema, and in order to check in a pet, we have to check out a pet. In order to do either of those things, we have to be logged in. Let's make sure that we're logged in.

[00:30] We're going to provide our username and our password, and now, I can log in.

```graphql
mutation {
  logIn(username: "ep123" password: "123") {
    customer {
      username
      name
    }
    token
  }
}
```

 The next thing I want to do is grab the token so that I can make myself an authorized user. I will add this to the HTTP headers under the authorization key. We'll add `Bearer` and paste the token.

#### HTTP Headers panel

```graphql
{
  "Authorization": "Bearer your-token-here"
}
```

[00:50] The next step is I want to add a subscription. Let's add a new tab. We're going to add our `subscription` here. These, as we saw, are named just like queries and mutations. This time, it's going to be called `petReturned`.

#### GraphQL playground
```graphql
subscription {
  petReturned {

  }
}
```

[01:03] The `petReturned` subscription returns something. What this returns is the checkout object. We have access to the pet, the checkout date, the check-in date, and whether or not the pet was late.

[01:16] Here, we want to add the `pet` query, and then we'll add `name`.

```graphql
subscription {
  petReturned {
    pet {
      name
    }
  }
}
```

 As soon as I click play, we're going to notice some different behavior. This is listening for any changes, so it's not a request and a response. Instead, we're listening over a web socket.

![GraphQL subscription listening for changes](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/listen-for-data-changes-in-real-time-with-a-graphql-subscription-listening-changes.png)

[01:30] Now, let's open up one final tab here. We're going to add a `mutation` for checkout, and the `pet` that I want to check out is going to be `C-2`. I'll get the `pet` and their `name`, then I'll change this to checkin to check-in the same pet.

```graphql
mutation {
  checkIn(id: "C-2") {
    pet {
      name
    }
  }
}
```

[01:46] Now, if I switch back to our subscription, we see that the `petReturned` subscription has heard some new data.

![New Data returned after pet is checked in](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/listen-for-data-changes-in-real-time-with-a-graphql-subscription-data.png)

 We've echoed back this checkout object. The GraphQL subscription is very useful. Whenever you have any real-time needs in your application, you're going to use a subscription. Then we can use a mutation to trigger that change.
