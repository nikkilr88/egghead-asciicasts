Instructor: [00:00] So far, we've sent queries for the pet type, and if we search the schema for pet, we should see all the available fields. Now, there's another main type that's part of this API, and that's called customer.

[00:11] The real power of GraphQL starts to show up when we start to talk about connecting data points. Let's write some queries that connect the pet type with the customer type. The query that we'll send is `petById`.

[00:24] This is going to take in `id` as an argument. This is going to return Biscuit.

```graphql
query {
  petById(id: "C-1") {
    name
  }
}
```

![Pet by id query shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/query-connected-data-with-the-graphql-query-language-pet-by-id.png)

 There's another field on pet called `inCareOf`. `inCareOf` is going to return the customer who has checked out this pet. Biscuit has been checked out by this customer.

```graphql
query {
  petById(id: "C-1") {
    name
    inCareOf {
      name
      username
    }
  }
}
```

![Customer information added to query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/query-connected-data-with-the-graphql-query-language-customer-info.png)

[00:40] To draw the line from customer to pet, we're going to use the `allCustomers` query. `allCustomers` is going to return a list of customers, so we can ask for their name, their username, and we also are going to get their `currentPets`.

```graphql
query {
  allCustomers {
     name
     username
     currentPets {
       name
     }
  }
}
```

[00:54] `currentPets` is going to return a list of any pets that they currently have checked out. That connection is made on the `currentPets` field. `allCustomers` returns a list of customers for each of those customer objects that are going to have a list of current pets that are checked out.

[01:11] This could be an empty array, or this could return a list of custom objects. To go back the other way, `inCareOf` is going to connect a pet with a customer. On the `inCareOf` field, we're going to return the customer who has checked out this pet.
