Instructor: [0:00] When naming queries, it's common to use the name of the returned value. When asking for a single `product`, the query would be named product. It's a simple solution and works well.

**index.js**
```graphql
type Query {
  product(id: ID): Product
}
```
**query**
```graphql
{
  product(id: "abc") {
    name
  }
}
```

[0:13] Things get a bit more complicated in case we want to offer multiple ways on how to retrieve a single product. For example, in our webshop we want to support slugs for product URLs. The URLs then would look like this -- /product/blackbook or /product/greenbook.

```
https://example.com/product/blackbook
https://example.com/product/greenbook
```

[0:34] To support querying for a product by slug, **we can extend the product query to also accept the slug argument.** In this case, we would change our query product to support two optional arguments, ID and slug. Either one of them should be provided.

```graphql
product(slug: "blackbook") {
  name
}
```
**index.js**
```graphql
type Query {
  product(id: ID, slug: String): Product
  productBySlug(slug: String!): Product
}
```

[0:54] This solution though is quite problematic. Since both arguments are optional, we could leave out both. While this is not what we have intended, we could just return any product. As said, this is not what we intended, but in some cases, this might be fine or even desired.

**query**
```graphql
product {
  name
}
```

[1:14] Nevertheless, there are more issues. Since there are two arguments, we also could provide both. In case someone provides both and both belong to one product, we could return the product. What if the ID and slug belong to different products? Pooh. Suddenly, we have to think about a problem that should never happen.

```graphql
product(id: "abc", slug: "blackbook") {
  name
}
```

[1:39] In addition to that, **if someone is new to our GraphQL schema and exploring it, it's absolutely not clear which of these arguments should be provided and which can be omitted.** All in all, this approach doesn't sound like a good idea.

[1:55] What works well, on the contrary, is creating separate queries and postfixing them with by and the argument or arguments used to retrieve the result. We change product to `productById` and `productBySlug`. In this case, we would have separate queries. For each of them, the argument is mandatory.

```graphql
productById(slug: "blackbook") {
  name
}
productBySlug(id: "abc") {
  name
}
```

**index.js**
```graphql
type Query {
  productById(id: ID!): Product
  productBySlug(slug: String!): Product
}
```

[2:19] Definitely less confusing and we don't need to care about undesired edge cases. **Let me add that since it's very common to fetch entities by ID, it's also very common to omit the ById postfix.** In the end, that's a convention your team has to decide on and carry it through.

```graphql
type Query {
  product(id: ID!): Product
  productBySlug(slug: String!): Product
}
```
