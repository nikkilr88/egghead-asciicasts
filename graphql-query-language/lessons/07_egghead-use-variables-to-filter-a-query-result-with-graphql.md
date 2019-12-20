Instructor: [00:00] We'll start by opening up a new tab in GraphQL Playground by clicking the plus, and we're going to use this new tab to write a new `query`. We'll use our `allPets` query from before, but this time, we want to pass in some optional arguments.

```graphql
query {
  allPets()
}
```

[00:14] If we take a look at all pets in the schema, we'll see that category and status are potential filters for this query. I'm going to add `category:` `DOG`. We just want to see the dogs, and we just want to see those dogs that are `AVAILABLE`.


```graphql
query {
  allPets(category: DOG status: AVAILABLE) {
  }
}
```

[00:29] Now, I can make a selection for `id`, `name`, `status`, and `category`, and I'll just see those dogs that are available.

```graphql
query {
  allPets(category: DOG status: AVAILABLE) {
    id
    name
    status
    category
  }
}
```

 Right now, these values are being passed in-line as strings with the query, but we also have the option to provide values as dynamic values.

![allPets query with hard coded values passed in](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/use-variables-to-filter-a-query-result-with-graphql-all-pets-query.png)

[00:44] Let's say you wanted to build a UI for this. You might have some dropdown filters. You'd need some sort of mechanism for passing back dynamic user input. To pass dynamic values with a GraphQL query, we're going to use variables.

[00:59] The first thing I want to do is I want to set up these variables on line one. We're going to use the dollar sign and `category`, and then we'll define what type category is, which is `petCategory`. Then we'll provide `status`, which is `petStatus`.

```graphql
query ($category: PetCategory $status: PetStatus){
  allPets(category: DOG status: AVAILABLE) {
    id
    name
    status
    category
  }
}
```

[01:13] Next, we'll provide these variables to our `allPets` query by using the dollar sign and the name of the argument.

```graphql
query ($category: PetCategory $status: PetStatus){
  allPets(category: $category status: $status) {
    id
    name
    status
    category
  }
}
```

 Now, if I click play, we're going to have these variables set up, but we're not passing any values yet. This is just going to give me everything.

![Variables set up in the query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/use-variables-to-filter-a-query-result-with-graphql-variables-set-up.png)

[01:28] Because those values are nullable, we can provide `null`, and this will just show me all of the pets. When I want to provide those values, I'm going to open up the query variables panel. Here, I'm going to pass the values as JSON.

#### Query variables panel

```graphql
{
  "category": "DOG"
  "status": "AVAILABLE"
}
```

[01:42] I'll provide the `category` and the `status` to find those available dogs. These values will then be passed, and our response should reflect that.

![query variables panel is set with dog and available](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/use-variables-to-filter-a-query-result-with-graphql-query-variables-panel.png)

 This will be dynamic, so I can change it to `cat`. This will show me all the available cats.

```graphql
{
  "category": "CAT"
  "status": "AVAILABLE"
}
```
![Cats available arguments set](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555709/transcript-images/use-variables-to-filter-a-query-result-with-graphql-cats-available.png)

[01:58] The GraphQL query language also gives us a way to pass default values for these variables. For example, if I set the default with an equals sign to `STINGRAY` for `PetCategory`, and I click play, the default isn't going to be used. We're still going to pull those values from the query variables.

#### GraphQL playground

```graphql
query ($category: PetCategory=STINGRAY $status: PetStatus){
  allPets(category: $category status: $status) {
    id
    name
    status
    category
  }
}
```

[02:16] However, if I remove that, and I don't pass the cat value, then it will use the default. If that value is not provided, we're going to use the default.
