Instructor: [00:00] The pet library just got some funding, some VC money, so we're going to open up our browser and head over to the new version of the app. We're going to go to `https://funded-pet-library.moonhighway.com`.

[00:13] You'll notice our new endpoint here at the center of the screen. With a larger budget comes more engineers and some enhancements to our API, one of which is that we have some more specific queries that may be easier to track.

[00:28] Let's write our `query` for `totalPets`.

```graphql
query {
  totalPets
}
```

 We'll see 25, but we have these new queries here, `availablePets`. We also have `checkedOutPet`, and we can access those values without having to use any filters or send any arguments.

```graphql
query {
  totalPets
  availablePets
  checkedOutPets
}
```

[00:43] We also have another query here called `customersWithPets`.

```graphql
query {
  customersWithPets {

  }
  totalPets
  availablePets
  checkedOutPets
}
```

 Now, if we look at this in the schema, we'll see that this query will return a list of all of the customers who currently have pets checked out.

[00:54] This refactor gives us access to the same data, but we don't have to use as many arguments, and we've moved a lot of the logic of filtering, sorting to the server instead of having to handle this in the playground.

```graphql
query {
  customersWithPets {
    username
    name
  }
  totalPets
  availablePets
  checkedOutPets
}
```

![New query data returned](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/explore-refactored-graphql-queries-query-data.png)
