Instructor: [0:00] We already have a mutation updating a connection, `addProductsToCart `. Next up, we want to allow users to remove products. No problem. We can add the mutation, `removeProductsFromCart`.

```graphql
updateProductsInCart(input: { productIds: ["abc"] })
removeProductsInCart(input: { productIds: ["abc"] })
```

[0:17] Now we add two mutations to manipulate the products in the cart connection. Should we implement an `updateProductsInCart` instead? In almost all situations, the answer should be no. Let me elaborate why.

[0:33] Think about the situation where the user has two tabs of the web shop open. In Tab A, she adds the product with the ID ABC. Later on, in Tab B, she adds the product with the ID BCD. In case we would use an `updateProductsInCart`, the first mutation in Tab A would update the list to include ABC.

[0:55] Without any real-time updates in Tab B, though, the current state is still referring to an empty list of products. Adding the product BCD will also mean the list only includes BCD. On the server, this would be the end result. Let's compare it to `addProductsToCart `.

```graphql
# Tab A
updateProductsInCart(input: { productIds: ["abc"] })
# Tab B
updateProductsInCart(input: { productIds: ["bcd"] })
# Server: ["bcd"]
```

[1:17] Since this mutation doesn't rely on the current state, the clients can be out of date, but the end result on the server will still be correct and include ABC as well as BCD. That's exactly why an `addProductsToCart ` and `removeProductsFromCart` is superior to an `updateProductsInCart`.

```graphql
# Tab A
addProductsToCart(input: { productIds: ["abc"] })
# Tab B
addProductsToCart(input: { productIds: ["bcd"] })
# Server -> ["abc", "bcd"]
```

[1:37] In some edge cases, though, it's required to reset or update the full list. In such a case, not all hope is lost. You can implement a validation strategy where the client has to send information of the latest state in form of the full list or a content hash.

[1:54] The server can validate if the input is correct and, depending on the use case, abort the action or reply with information about the lost items.
