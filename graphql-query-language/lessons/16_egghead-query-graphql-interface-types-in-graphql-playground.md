Instructor: [00:00] If we sum the `allPets` query for `id` and `name`, we are going to see ID and name returned to us, just as we expect, but in the funded pet library, these data relationships are designed pretty differently.

[00:11] Let's open up the `AllPets` query in our schema and we'll see that the pet is no longer a type, but instead it's an interface.

[00:18] An interface is an abstract type that includes a set of fields. These fields must be used when creating new instances of that interface. We have an interface called `Pet`. This is the base class. It has certain fields on it.

[00:32] We have several different implementations of that interface. Remember, our numerator from before that had `Cat`, `Dog`, `Rabbit`, and `Stingray`, these are now implementations of this interface.

[00:44] If we scroll down to the `Cat`, we'll see that `Cat` is a separate type that implements the `Pet` interface. It has all of the different fields that are part of that interface, but then we can extent the `Cat` to have a couple of different ones, so sleep amount and curious are now available on that `Cat`.

[01:00] Let's click on `Stingray`. That's another type. We have a couple of extra fields defined on that as well. Same with the `Rabbit` and the `Dog`. `allPets` returns a list of pets, but all of these pets are different types, different implementations of the `Pet` interface.

[01:16] If I want to see which one is which, I can query the `_ _` `typename` field, this will give me the data about what type of pet we're querying.

```graphql
query {
  allPets {
    __typename
    id
    name
  }
}
```

 The way that we write a query for an interface is also a little bit different.

[01:29] Remember those extra fields that we had on the cat. I can use an inline fragment, `... on Cat`, and then I can query that field. Whenever there is a cat in the response, we're going to see a `sleepAmount` value for the cat. For all other types, we're not going to see that extra field.

```graphql
query {
  allPets {
    __typename
    id
    name
    ... on Cat {
      sleepAmount
    }
  }
}
```

![Sleep Amount for all cats shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/query-graphql-interface-types-in-graphql-playground-sleep-amount.png)

[01:47] We can do this for any additional fields that we'd like to. I can say `on Stingray` and get how `chill` the stingray is on a scale of 1 to 10. This will be provided in the response only for stingrays.

```graphql
query {
  allPets {
    __typename
    id
    name
    ... on Cat {
      sleepAmount
    }
    ... on Stimgray {
      chill
    }
  }
}
```

[02:00] An interface gives us a little bit more flexibility when we're designing our domain's objects. We have a pet, that is an interface. Some base fields on that pet interface, and then we can create implementations of that interface and then create custom fields for each additional pet type.
