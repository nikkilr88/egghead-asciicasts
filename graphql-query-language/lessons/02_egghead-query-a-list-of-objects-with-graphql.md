Instructor: [00:00] Let's add onto our query a bit and request some data about the pets that are available at the pet library. If I wanted a list of all of our pets, I'm going to query the `allPets` field. I'll open up our curly braces to select `name` and `weight` for each of these pets, and then I'll click play.

```graphql
query {
  allPets {
    name
    weight
  }
  totalPets
}
```

[00:18] I'll see that `allPets` returns an array of pets with name and weight for each of them.

## Output

```graphql
{
  "data": {
    "allPets": [
      {
        "name": "Biscuit",
        "weight": 10.2
      },
      {
        "name": "Jungle",
        "weight": 9.7
      }
    ]
  }
}
```

 Also, if I collapse the `allPets` field, we'll see that `totalPets` is also being sent in the query, and we get that data as well.

[00:31] If we take a closer look at the query, everything wrapped with curly braces is called a selection set. Each piece of data that we're requesting is called a field. I can also add comments to the query by using the pound sign or hashtag.

[00:45] Then if I were to use this on one of the fields, we'll see that name is now removed from the query and is not returned.
