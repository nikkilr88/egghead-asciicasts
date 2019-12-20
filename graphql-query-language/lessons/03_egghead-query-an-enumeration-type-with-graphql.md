Instructor: [00:00] We've sent the `allPets` query, so we have some information about the pet, their name and their weight. Now, I know that Biscuit and Jungle are cats, because I know that cats, but I might not have all of them memorized.

[00:11] We want to be able to find out what category the pet belongs to. When we're using GraphQL Playground, we can hit control-space. This will surface all of the different fields that are available on this query.

[00:23] Let's go ahead and add `category` to our query. When I click play, we should see `category` being returned.

```graphql
query {
  allPets {
    name
    weight
    category
  }
  totalPets
}
```

 Now, `categories` look like strings, but they all seem pretty similar. `CAT`, `DOG`, `STINGRAY`, and `RABBIT`. GraphQL is a query language for your API, but it's also a type system for your API.

[00:43] The GraphQL spec describes a schema definition language, which we'll use to define all of the different queries and all of the different types that are available on this API. If you click the schema tab, you can take a look at this schema.

` See 0:55 in lesson `
![Schema tab shown on the side of the playground](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563555708/transcript-images/query-an-enumeration-type-with-graphql-schema-tab.png)

[00:56] `allPets` returns a list of pets, and I can access all of the different fields on this pet type by scrolling down. Here, it says that category returns an option called `petCategory`. `petCategory` is an enumeration type that represents a restricted list of options for this field. Cat, dog, rabbit, and stingray.

[01:18] Here's another tip you can use when exploring APIs with GraphQL Playground. You can hover over one of these field names and press command. This will allow you to click on that field, and it'll take you directly to that field definition in the schema.

[01:31] We can do that for weight, command-click, command-click for name, but we can also do it for `allPets` and for `totalPets`.
