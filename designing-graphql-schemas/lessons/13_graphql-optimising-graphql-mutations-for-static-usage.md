Instructor: [00:00] There's one improvement we can make to our `addProductToCart` mutation. Right now, it works well for user interface where the user can add one item at a time. What if the user interface allows them to select multiple items and add them to the cart at once?

```graphql
addProductToCart(input: { productId: "abc" })
```

[00:17] No problem. We can run multiple queries and mutations in one request. For example, we can add `addProductToCart` twice with different product ID values.

```graphql
addProductToCart(input: { productId: "abc" })
addProductToCart(input: { productId: "bcd" })
```

[00:29] To implement that on a client, we would trade a query, including n mutations where n is the amount of selected products. In reality, most graphQL clients are not doing well with this pattern, and static queries are way easier to handle, which then often results in a solution where we iterate over each product and sending one request per mutation.

```js
selectedProducts.forEach((product) => addProductToCartMutation(product));
```

[00:57] This is not ideal. Since we get a lot of products, this can result in a lot of requests. What if we change the mutation to `addProductsToCart` and refit, change the argument `productId` to `productIds`?

```graphql
addProductsToCart(input: { productIds: ["abc", "bcd"] })
```

[01:14] Now, we can pass in multiple products. This is great. It's more flexible since we can implement both UIs. At the same time, we didn't lose any clarity on the use case. The mutation is still about adding products to the cart.

[01:31] **The only thing to keep in mind here is that it also has an impact on the behavior. When running two `addProductToCart` mutations in one request, in the backend, the second one would only start once the first one executed successfully.**

[01:47] In comparison to that, for `addProductsToCart`, it's up to you if you want this behavior or if you prefer inserting both at once.
