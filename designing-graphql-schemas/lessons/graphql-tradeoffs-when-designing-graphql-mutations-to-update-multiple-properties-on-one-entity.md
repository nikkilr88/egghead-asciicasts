Instructor: 0:00 In our Web shop, admins have to be able to update a product. A simple form with input fields and a save button should do. One thing we could do is create a mutation for each of the input fields, `updateProductName`, `updateProductDescription`, and `updateProductImage`.

0:18 To update the recommended products, we already learned it's better to have two mutations, `addRecommendedProductsToProduct` and `removeRecommendedProductsFromProduct`. These are a lot of mutations, especially when you consider these are just to update one entity, the product. This brings up a question. Can or should we use an updateProduct mutation instead? Well, Yes and no.

0:46 We can create such a mutation, but there are some tradeoffs involved. Shipping it to production is fine as long as it is an informed and conscious decision. Let's explore the tradeoffs based on an example.

0:59 We create an `UpdateProductMutation` with one `$input`. The payload should include a product. 

```graphql
mutation UpdateProductMutation($input: UpdateProductInput!) {
  updateProduct(input: $input) {
    product {
      name
      description
    }
  }
})
```

Our `input` should include the `productId` and the fields that can be updated. For now, we only focus on `name` and `description`.

```json
{
  "input": {
    "productId": "abc",
    "name": "Blackbook+",
    "description": "Ships with a working keyboard."
  }
}
```

1:30 In order to verify our approach, let's implement it in `index.js`. We add the mutation, `UpdateProductInput!`. With it, we create an `UpdateProductInput` as well as an `UpdateProductPayload`. 

#### index.js
```js
input UpdateProductInput {
  productId: String!
  name: String!
  description: String
}

type UpdateProductPayload {
  product: Product
}

type Mutation {
  createProduct(input: CreateProductInput!): CreateProductPayload
  updateProduct(input: UpdateProductInput!): UpdateProductPayload
}
```

We can copy our example mutation and verify if it works as expected.

2:11 If we run that, we updated both fields. What if we only want to update the name? What? Why even do that? Let me explain. Once there are multiple admins that can update a product, the client should only communicate the input fields that changed, to avoid that admins override each other's changes.

2:33 In case we only want to update the name, we leave out the `description`. This even works because description is not a mandatory field in `UpdateProductInput`. At this point, you might think, "Wait a minute. I thought leaving out the exclamation mark means a field can be nullable."

2:53 Yes, you are correct, but for inputs it actually means that the field can be omitted or set to null. This wasn't always the case but was added in October 2016 when the `null` value RFC got merged into the GraphQL specification. This means we can leave out the description and by this indicate to our back end that the description should not be updated. Sounds good.

3:22 What if we want to update description to null? No problem. We explicitly add the field and set it to null. 

#### lcalhost:4000
```json
"description": null
```

This is great, but let's not get too excited about it because here comes the gotcha. We now only want to update the description.

3:43 This means we have to remove the exclamation mark from name to make it optional. With this change, our schema now allows us to provide null for the name as well.

#### index.js
```js
input UpdateProductInput {
  productId: String!
  name: String
  description: String
}

```

3:56 Ugh. Name is a non-nullable property on the product model, but we just tried to update it to null. Our GraphQL server didn't complain. Why so? By making the `name` input field optional, we also made it nullable. Very unfortunate. I mean, not all hope is lost. We can check on the back end and throw an error when name is null. Let me quickly implement an example solver to demonstrate it.

```js
const resolvers = {
  Mutation: {
    updateProduct: (_, args) => {
      if (args.input.name === null) {
        throw new Error("name can't be set to null.");
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  mocks: true,
  mockEntireSchema: false,
  resolvers
});
```

4:44 Now we run the query. Great. Now we see the GraphQL error. All in all, it's not as nice as it could be. That's the first tradeoff. We basically have to make non-nullable properties to be nullable input fields. Without additional documentation, this might add some confusion to your schema.

5:05 The second potential issue is quite rare. We won't explore it in detail. What is it? In case there are some dependencies between input fields, you can't indicate that both have to be provided together using a flat input structure.

5:21 In conclusion, an update mutation requires us to make tradeoffs, but in order to avoid ending up with hundreds of mutations the benefits might outweigh the disadvantages. In the end, that's for you and your team to decide.