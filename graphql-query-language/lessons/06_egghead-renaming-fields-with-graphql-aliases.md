Instructor: [00:00] Our query is telling us how many pets are checked out, but I also want to see how many pets are available. I'm going to add the `totalPets` query to line two, and I'll add the `status` `Available` as an argument.

```graphql
query {
  totalPets (status: AVAILABLE)
  totalPets (status: CHECKEDOUT)
  allPets {
    name
    weight
    category
    photo {
      thumb
      full
    }
  }
}
```

[00:13] If we try to hit play on this, we're going to see some errors returned.

![Error message shown in return panel about different arguments for the same query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/renaming-fields-with-graphql-aliases-error.png)

 It lets us know that fields `totalPets` conflict, because they but have differing arguments, and it recommends that we use different aliases on these fields.

[00:24] If I scroll down a little further, we're going to see where this is happening, line two, column three, and line three, column three. We also see this little faint hit of red, letting us know that there's some sort of a problem.

[00:36] We have a naming collision here. What we'll need to do is preface both of these queries with an alias. I can pick a new name for this field. I'll call it `available` and add a colon. Then I'll add `checkedOut` with a colon in front of that.

```graphql
query {
  available: totalPets (status: AVAILABLE)
  checkedOut: totalPets (status: CHECKEDOUT)
  allPets {
    name
    weight
    category
    photo {
      thumb
      full
    }
  }
}
```

[00:52] I can hit play, and now, I see that `available` and `checkedOut` are returned. The query is successful, and I've renamed these fields in our JSON response.

![queries fixed and data is returned](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/renaming-fields-with-graphql-aliases-queries-fiexed.png)

 This means that I could also grab the `totalPets` without any filters.

```graphql
query {
  available: totalPets (status: AVAILABLE)
  checkedOut: totalPets (status: CHECKEDOUT)
  total: totalPets
  allPets {
    name
    weight
    category
    photo {
      thumb
      full
    }
  }
}
```

[01:04] This will tell us that 25 total pets are part of the library, all bundled in the same query. Aliases can be added to any field, so I added them to top-level queries, like `totalPets`, before. If you wanted to add them to more nested fields, you could do so.

[01:20] I could rename the photo field with an alias called `petPhoto`, and this is going to rename that in the response in all cases.

```graphql
query {
  available: totalPets (status: AVAILABLE)
  checkedOut: totalPets (status: CHECKEDOUT)
  total: totalPets
  allPets {
    name
    weight
    category
    petPhoto {
      thumb
      full
    }
  }
}
```

![Photo renamed in query and data is returned as petPhoto](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/renaming-fields-with-graphql-aliases-photo-renamed.png)
