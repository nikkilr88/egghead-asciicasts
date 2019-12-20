Instructor: [0:00] For this course, we're going to design the schema of a web shop selling laptops and related accessories. Where do we start? I recommend starting with one use case. In our case, we're going to pick the detail page of one product.

[0:16] In an ideal scenario, we would have deep knowledge about the domain, and a fixed list of use cases and requirements. Reality is often very different, though. That's why I recommend using the approach of starting with the user interface.

[0:32] While naturally you might want to start out with defined types, I urge you to start with writing down the queries, and possibly their example results, because this is what the developers building your clients will do. This way, you can see how you're going to use the schema. Let's do this by retrieving this one laptop with only its name. The expected result would look like this. Great.

**graphql query**
``` graphql 
  {
    product(id: "abc") {
      name
      description
    }
  }
```
**result**
```json 
  {
    "product": {
      "title": "Blackbook";
      "description": "Great …”
    }
  }
```

[1:05] Next up, we add the description. We add it to the query and then to the result. Let's implement it in our schema and verify it works as expected. We add the `type Product`, and with it the `name` and `description`.

**index.js** 

```js
  const { ApolloServer, gql } = require("apollo-server");

  const typeDefs = gql`
    type Product {
      name: String
      description: String
    }

     type Query {
      product(id: ID!): Product
    }
  `;
``` 

[1:24] Then we add a `Query` `product`, returning a `product` based on the `ID`. Once implemented, we can copy our previously defined example query, switch to the browser, and verify that it works as expected. Looks good to me.

[1:43] As said, while this process doesn't automatically lead us to a good design, it's a good way to start. To me personally, a well-designed GraphQL schema allows you to cover all known use cases and behaviors in a domain-driven fashion while still being optimized for change.

[2:02] Regarding the domain knowledge, there's not much more that we can do than just learn about it, but is there something that we can do to optimize for changing requirements? There is, and we will explore them in this course.
