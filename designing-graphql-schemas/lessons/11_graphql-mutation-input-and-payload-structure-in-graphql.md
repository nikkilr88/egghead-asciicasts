Instructor: [0:00] We want to add a mutation to create a product. Same as with queries, we start with an example on how it should be used. We add a mutation and name it `CreateProductMutation`. Since almost all the time when using a client we use GraphQL variables, we're also going to use them here.

```graphql
mutation CreateProductMutation($name: String!, $description: String)
```

[0:18] We add `$name`, which is a mandatory string, and `$description`, an optional string. After that, we add the actual mutation, `createProduct`, and pass in the arguments, `name` and `description`. The expected result is a product, and we ask for its `id` and `name`. The provided variables would look like this.

```graphql
mutation CreateProductMutation($name: String!, $description: String) {
  createProduct(name: $name, description: $description) {
    id
    name
  }
}
```

```json
{
  "name": "Greenbook",
  "description": "Made out of recycled materials."
}
```

[0:47] This approach comes with several issues. **Providing a lot of arguments can get very tedious from a client perspective, and directly returning the product means we can't extend it without changing the product type.**

[1:01] What to do about those? Like so often when it comes to GraphQL, we can learn from Relay. In particular, from the Relay input object mutation specification. **One of the things this specification specifies is that a mutation should accept only a single input argument.** Sounds doable.

[1:28] Our variables then will be nested inside the input. Why do we do this? **It makes things easier on the client, since we can construct one object and pass it in as input, instead of multiple variables and arguments.**

```graphql
mutation CreateProductMutation($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
  }
}
```

```json
{
  "input": {
    "name": "Greenbook",
    "description": "Made out of recycled materials."
  }
}
```

[1:45] In fact, the more arguments your mutations have, the more you will appreciate this change. Next up, we take a closer look at the response. **The specification expects us to only return an object, including a client mutation ID, in case it is provided as part of the input.**

[2:06] OK, while it makes sense to use it in combination with Relay, it might not immediately add value to our use case. All right, shall we do it? Let's take a closer look at the [Relay documentation](https://relay.dev/docs/en/graphql-server-specification#mutations), where we can find more conventions, including examples.

[2:24] One thing that stands out here is that in to-do ship payment returns multiple entities. In this case, faction and ship. This makes a lot of sense, since the mutation here introduces a ship to a faction, and both entities are affected by this change.

[2:43] This is exactly why it's better to return a unique payload type, rather than just a single entity. Even though we might not need it right now in our `CreateProductMutation`, it at least prepares us for future changes, where we might want to add additional fields.

[3:00] How does this change look like for our example? We return the `product`, but nested inside the field `product` as part of the payload. 

```graphql
mutation CreateProductMutation($input: CreateProductInput!) {
  createProduct(input: $input) {
    product {
      id
      name
    }
  }
}
```

Looks pretty good so far. Let's see if we are ready to add the `Mutation` to our type definitions.

```grapql
type Mutation {
  createProduct(input: CreateProductInput!): CreateProductPayload!
}
```

[3:22] Be aware that our mutation doesn't make any sense without an input, and therefore the input argument is mandatory. Our `CreateProductInput` type itself contains `name` and `description`.

```graphql
input CreateProductInput {
  name: String!
  description: String
}
```

[3:38] Our `CreateProductPayload` contains a field, `product`, returning the product. Now, we can verify that it works by running the mutation. We copy the example and paste it into the browser. In addition, we also copy the variables.

```graphql
type CreateProductPayload {
  product: Product!
}
```

[4:05] Great. Works as expected. Last, but not least, while not part of the specification, and even not mandatory for Relay, I highly recommend to follow Relay's naming conventions. We already applied them, but here once again.

[4:22] **By convention, mutations are named as verbs. In our case, `createProduct`. The inputs are the name with input appended at the end. In our case, `CreateProductInput`. Then return an object that is the name with payload appended. In our case, `CreateProductPayload`.**

[4:44] In conclusion, following the specification and the conventions will save you from a lot of trouble.
