Instructor: [00:00] Let's start by adding a query for `allPets`, and we want to filter this by `category`. We'll look for all the rabbits, and we'll also filter by `status` to find the `AVAILABLE` rabbits. Next, we want to select a few fields.


```graphql
query {
  allPets(category: RABBIT, status: AVAILABLE) {}
}
```

[00:12] We'll grab `name`, `weight`, and `category`, and we should see all of these available rabbits. We also want to grab their `status`.

```graphql
query {
  allPets(category: RABBIT, status: AVAILABLE) {
    name
    weight
    category
    status
  }
}
```

 If only there was a way in the GraphQL query language to make all of these selection sets a little bit more reusable.

[00:27] The good news is, there is. I'm going to create a `fragment` called `PetDetails`. Think of a fragment of being a wrapper around several fields. `PetDetails` is going to be a fragment on a certain type. This is going to be for `Pet`.

```graphql
fragment PetDetails on Pet {

}
```

[00:40] Then we're going to cut and paste all of these fields into the fragment, and we'll use spread syntax, `...`, to push all of the `PetDetails` into this query.

```graphql
query {
  allPets(category: RABBIT, status: AVAILABLE) {
    ...PetDetails
  }
}

fragment PetDetails on Pet {
  name
    weight
    category
    status
}
```

 We're able to send the query and see that all of the field are still being sent with the query.

![Query still working while useing fragment](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/reuse-graphql-selection-sets-with-fragments-query-still-working.png)

[00:54] Now, we can also adjust the fragment to add additional fields. If I wanted to grab the `photo` as well as the `thumbnail`, we can see that the thumbnail for the photo is being returned.

```graphql
fragment PetDetails on Pet {
  name
    weight
    category
    status
    photo {
      thumb
    }
}
```

![Photo & thumbnail returned as well with fragment](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/reuse-graphql-selection-sets-with-fragments-photo-thumbnail.png)

 Let's add onto this query a little bit and add `petByID`.

[01:08] We're going to look for the pet `C-1`, and here, we can reuse `PetDetails` inside of the query so that we don't have to retype them.

```graphql
query {
  petById(id: "C-1") {
    ...PetDetails

  }
  allPets(category: RABBIT, status: AVAILABLE) {
    ...PetDetails
  }
}
```

 There we go, we get all of those fields for that pet. You can also add additional fields alongside your fragment.

[01:24] Let's add `inCareOf`, `name`, and `username`.

```graphql
query {
  petById(id: "C-1") {
    ...PetDetails
    inCareOf {
      name
      username
```

 We should see the person who has checked out this pet. Since we're having so much fun with fragments, we can create a fragment for `CustomerDetails`. We're going to specify that these fields come from the `customer` type, and we can add `name` and `username` from `inCareOf`.

[01:43] We can then push those fields into the query, hit prettify to get rid of that spacing issue again, and click play.

```graphql
query {
  petById(id: "C-1") {
    ...PetDetails
    inCareOf {
      ...CustomerDetails
    }
  }
  allPets(category: RABBIT, status: AVAILABLE) {
    ...PetDetails
  }
}

fragment CustomerDetails on Customer {
  name
  username
}
```

![All fields are returned](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/reuse-graphql-selection-sets-with-fragments-all-fields-returned.png)

 We see all of those fields are being returned. We created a fragment called `PetDetails`. This will take all of these fields and put them into the query.

[01:57] Then we have another for `CustomerDetails`. All of the fields we want are going to be pushed into the query when we use that fragment syntax, ..., and then the name of the fragment.
