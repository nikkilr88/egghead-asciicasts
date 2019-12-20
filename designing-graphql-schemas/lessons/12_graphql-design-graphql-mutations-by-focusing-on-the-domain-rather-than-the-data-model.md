Instructor: [00:00] **The core of this lesson is to focus on a domain model, rather than a data model, when designing mutations.** In order to explain why, we're going to design a web shop checkout flow. In our process, the following things can happen.

[00:15] *User adds a product to the cart, then the user can apply a coupon to the cart, and then the user picks an existing payment information and address and submits the order.* First, we explore how mutations would look like, but focus on our data model.

[00:34] The first two interactions are updates to the cart, so it makes sense to have an `updateCart` mutation. Submitting the order would result in a `createOrderMutation`. Let's look at the details. Our cart includes a list of items and one coupon reference.

[00:53] Let's add fields for both of them and write an example mutation. First, the user can update the cart by updating the product IDs. In order to add another product, both `productIds` have to be provided. Then the user can update the cart to apply a coupon.

```graphql
updateCart(input: { productIds: ["abc"] })
updateCart(input: { productIds: ["abc", "bcd"] })
updateCart(input: { couponCode: "christmasSpecial", productIds: ["abc", "bcd"] })
```

[01:20] Now, we have to make a choice. Either we make both fields `couponCode` and `productIds` nullable, even though `productIds` is not supposed to be nullable, or we require clients to provide all the data all the time.

[01:36] Doing so could result in loss of data to out-of-date clients. Either way, it's not ideal. For now, we go with nullable fields. This allows us to remove the `productIds` from our add coupon use case. At last, the user can submit the order, and with it, provide the previously-fetched address and `paymentInformation` IDs connected to the account.

```graphql
updateCart(input: { couponCode: "christmasSpecial" })
createOrder(input: { addressId: "lkj", paymentInfoId: "jhg" })
```

[02:03] Without going further into up and downsides of this approach, let's also write down the domain-focused approach, and we compare both of them later. The first interaction the user can do is adding a product to the cart.

[02:18] Let's add a mutation, `addProductToCart`. In that process, we also can fill out the input right away. In order to add another product, we can run the same mutation a second time with a different value for the argument.

```graphql
addProductToCart(input: { productId: "abc" })
addProductToCart(input: { productId: "bcd" })
```

[02:36] Next up, user should be able to apply a coupon to the cart. We add an apply coupon to cart mutation. At last, the user can check out. With it, provide the address and payment information IDs. Now that we have both solutions side-by-side, let's compare them.

```graphql
addProductToCart(input: { productId: "abc" })
addProductToCart(input: { productId: "bcd" })
applyCouponToCart(input: { code: "christmasSpecial" })
checkout(input: { addressId: "lkj", paymentInfoId: "jhg" })
```

[03:04] The data model-based solution only has two mutations. In general, I would say having less mutations is a good thing, but reducing two use cases into one mutation comes at a cost. Why so? When exploring a schema and looking at the available mutations in a domain-driven version, it's way more obvious what are the possible actions.

[03:28] In addition, when looking into the `updateCartInput`, it's not clear if `productIds` and the coupon code have to be provided together, or if they can be applied separately. The only way to figure this out is reading up more documentation or using trial and error by running the mutations.

```graphql
input UpdateCartInput {
  productIds: [ID]
  couponCode: String
}
```

[03:48] Another issue with `updateCart` is that we always need to provide the full list of `productIds` whenever we want to add a product. We can fix this by not doing a one-to-one mapping between properties and input fields, but then we also don't match the data model exactly anymore.

[04:07] Let's go back to our issues. While create order indicates well that an order is created, which is really valuable, it's not obvious that it also resets the cart. Checkout also doesn't indicate this, but at least it doesn't hint to the idea that only an order is created.

[04:27] When looking at all of these issues, in conclusion, we can say focusing on the domain model resulted in a superior design. Let's repeat why. **With the domain model, we indicate which actions or use cases are supported.**

[04:43] **There is no need for nullable input fields for non-nullable properties of a model, and we can define which input fields must be provided together in separate mutations.** Before we conclude the lesson, let me add that it's not a trivial task to design mutations for any domain. You really need to understand the domain and its use cases to design a good schema.

**Benefits**
- We indicate which actions/use-cases are supported.
- There is no need for nullable input fields for non-nullable properties of a model.
- We can define which input fields must be provided together in separate mutations.