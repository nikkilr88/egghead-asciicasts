Instructor: [00:00] In the Funded Pet Library there are a couple of extra queries here that we haven't looked at yet. One is called FamilyPets and the other one is called ExoticPets.

[00:08] Let's click on FamilyPets. We should see that there is some helpful documentation here. It says this query returns a list of FamilyPets, either a cat or a dog.

[00:18] Another useful data structure when we're working with GraphQL is called a union. We use unions when we want to return lists of multiple types.

[00:26] Whenever we query the FamilyPets field, I want to return a list of FamilyPets, either a cat or a dog. Let's go ahead and write that `query`.

[00:35] We're going to say `familyPets`. Let's look for the `typename` here.

```graphql
query {
  familyPets {
    __typename
  }
}
```

 Now let me click Play. I should see Cat, Cat, Cat. As I scroll down, we should see Dog, Dog, Dog, etc.

![Family Pets types shown in returned data](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/query-lists-of-multiple-types-using-a-union-in-graphql-family-pets.png)

[00:47] Unions don't have to share any fields. If I tried to query for the name field for each of these, we're going to see an error. It says cannot query field name on type FamilyPet. It's recommending that I use an inline fragment instead. Let's go ahead and do that.

[01:03] I'm going to use the inline fragment syntax to grab fields from the `Cat`. I'll say name and sleep amount. This should give us that data for just the cats. Dogs will still only have the type name.

```graphql
query {
  familyPets {
    __typename
    ... on Cat {
      name
      sleepAmount
    }
  }
}
```

![On Cat fragment shows sleepAmount for all cats](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/query-lists-of-multiple-types-using-a-union-in-graphql-on-cat.png)

[01:17] If I wanted some dog-specific fields, I could get them with another in-line fragment. We'll use `... on Dog` and see their `name` and whether or not the dog is `good`.

```graphql
query {
  familyPets {
    __typename
    ... on Cat {
      name
      sleepAmount
    }
    ... on Dog {
      name
      good
    }
  }
}
```

[01:30] We use unions whenever we want to return a list of multiple types. These are really useful for things like this with `FamilyPets` being either a `Cat` or a `Dog`, `ExoticPets` with a `Rabbit` or a `Stingray`.

[01:43] You could use this for a number union that returns either an Int or a Float. A lot of different ways to use this but it's a useful data structure to know when you're working with GraphQL.
