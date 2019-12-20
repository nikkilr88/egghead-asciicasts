Instructor: [00:00] I'd like to adjust this query to include a photo. I want to return a photo for each of these pets. Let's see if there's anything in the schema that'll help us out with that.

[00:09] I'm going to search for photo using this search box at the top. I can select `photo`. It looks like photo is an object. The photo type has fields for full-size image and thumbnail-size image, both of which are strings. Each pet would have a photo.

[00:26] If I query `photo`, it gives me this error message that says, `"Field photo of type photo must have a selection of subfields."`

```graphql
query {
  allPets {
    name
    weight
    category
    photo
  }
  totalPets
}
```

![Error message shown in the return panel produced from the query above](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/send-a-nested-graphql-query-error-message.png)

 Because `photo` is an object, I'm going to need to add another selection set here.

```graphql
query {
  allPets {
    name
    weight
    category
    photo {
      thumb
    }
  }
  totalPets
}
```

[00:38] This allows us to have some flexibility when we are sending a query. A `photo` may have more than one field associated with it. Then we can request just the fields that we want with our GraphQL query.

```graphql
query {
  allPets {
    name
    weight
    category
    photo {
      thumb
      full
    }
  }
  totalPets
}
```
