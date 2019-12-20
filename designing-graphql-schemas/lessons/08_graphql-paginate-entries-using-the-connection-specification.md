Instructor: [00:01] After some custom development, we want to make another change to our workshop. We plan to add a section to the detail page, previewing recommended adapters and access files for each laptop. To do so, we can extend our sample query by a field `recommendedProducts` and ask for the names and image URLs. In the result, we would receive a list of `recommendedProducts`. For example, a USB to HDMI adapter, as well as a USB to SD card adapter.

**query**
```graphql
{
  product(id: "abc") {
    name
    recommendedProducts {
      name
      image {
        url
      }
    }
  }
}
```
**result**
```graphql
{
  "product": {
    "name": "Blackbook",
    "recommendedProducts": [
      {   
        "name": "USB to HDMI Adapter",
        "image": {
          "url": "https://www.example.com/x.png"
        }
      },
      {   
        "name": "USB to SD Adapter",
        "image": {
          "url": "https://www.example.com/y.png"
        }
      }
    ]
  }
}
```

[00:39] This only works well as long as the list never grows beyond the reasonable size to fetching one goal. **In our case though, the list of Access files might include hundreds of different products. What to do in such a case? Pagination to the rescue.** We add limit arguments to limit amount of `recommendedProducts`, fetching them on request. With the page argument, we can fetch one specific page at a time.

**query**
```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(limit: 5, page: 2) {
      name
      image {
        url
      }
    }
  }
}
```

[01:06] **There are several issues, though, with this approach. One of them is that, we can't tell if there's a previous or next page.** Before explaining all the other issues, I want to briefly show you the established best practice, solving all these issues at once, the relay cursor connections specification, or short, **[connections spec](https://facebook.github.io/relay/graphql/connections.htm)**.

[01:28] **It's a specification that defines a standardized way for exposing connections in GraphQL. While it originated in relay, it doesn't require us to use relay, but turned out to be a really good idea, and so became a best practice.** Let me illustrate it by creating an example query to retrieve `recommendedProducts`. We would use the argument, `first`, to limit the result and provide a cursor -- basically the ID of the last item of the previous page -- to the argument, `after`. If we want to fetch the previous page, we can provide `last` five and `before`, with a cursor.

```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(last: 5, before: "cde") {
      
    }
  }
}
```

[02:10] Now, instead of directly asking for the `name` and `image`, we get back `edges` and `pageInfo`. Edges return a list of `node`s. In there, we can finally query for the `name` and the `image`. `pageInfo` contains `hasNextPage`, `hasPreviousPage`, `startCursor`, and then `endCursor`.

```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(last: 5, before: "cde") {
      edges {
        node {
          name
          image {
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
}
```

[02:35] While it's not obvious yet, let me tell you that this will solve all the problems with connections you can possibly imagine. Maybe not all of them, if you're very creative, but most of them. All right. Before we dive more into the explanations of how and why, let's talk about the elephant in the room. **It looks ugly, and it's way more bloated than feels necessary. Nevertheless, in the next couple minutes,** I hopefully will change your mind, and you'll consider using the connections spec a good choice.

[03:11] How do we get there? Let's take a step back and start from our initial pagination design and let one issue with a suitable solution after another. First, we need to retrieve the information if there's a previous and next page. To do so, we can add another field, `recommendedProductsPageInfo`, pull out the same arguments, `limit` and `page`, and create a `hasNextPage`, as well as `hasPreviousPage`. Not particularly exciting to duplicate the arguments. We can refactor it and nest both inside one field. Way better.

**query**
```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(limit: 5, page: 2) {
      products {
        name
        image {
          url
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
```

[03:54] All right, so next up. Our CS team recommends us to show how often an adapter and Sd has been brought to get out with the current product. Let's add to field `boughtTogetherPercentage` to our query. At first sight, this looks like it's going to be completely fine. There's one issue though that will only show itself once we write down the type definitions. So let's do that.


```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(limit: 5, page: 2) {
      products {
        name
        image {
          url
        }
        boughtTogetherPercentage
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
```

[04:21] We add the field `recommendedProducts` to `Product`, and add the type `RecommendedProductConnection`. In there, we add the field `products`, returning a list of products. Then, we add `boughtTogetherPercentage` to product. Exactly this is where we have a problem. `boughtTogetherPercentage` only makes sense in relation to another product.

**index.js**
```graphql
type Product {
  name: String
  description: String
  image: Image
  recommendedProducts(limit: Int, page: Int): RecommendedProductConnection
  boughtTogetherPercentage: Float
}

type RecommendedProductConnection {
  products: [Product]
}
```

[04:47] If you query for a single product, this `boughtTogetherPercentage` field doesn't make sense at all. To tackle this issue, we can create a new type, `RecommendedProduct` with the field `boughtTogetherPercentage`, and change our connection type. 

```graphql
type RecommendedProduct {
  name: String
  description: String
  image: Image
  recommendedProducts(limit: Int, page: Int): RecommendedProductConnection
  boughtTogetherPercentage: Float
}

type RecommendedProductConnection {
  products: [RecommendedProduct]
}
```

One thing that bothers me, though, is that there's a lot of duplication. This isn't necessary. Instead of spreading out all the fields, we can simply refer to the product.

```graphql
type RecommendedProduct {
  product: Product!
  boughtTogetherPercentage: Float
}
```

[05:27] So far, so good. What I have to add here is the outcome. So far, is definitely more complex than referring to a list of product with the field `recommendedProducts` in the connection type. On the other hand, it's a beautiful solution, allowing us to attach meet information. Now that our types are in a good state, we go back to our sample query and check how this type changes affect it. We change products to `recommendProducts`, and this `name` and `image` inside `product`.

**query**
```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(limit: 5, page: 2) {
      recommendedProducts {
        product {
          name
          image {
            url
          }
        }
        boughtTogetherPercentage
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
}
```

[06:03] My next concern is the page argument. To explain why using a page index isn't a good idea, I best walk you through a couple of data fetching scenarios. We can start with a page index scenario that comes with out any issues. On the left side, we see a list of items stored in the data base. If the client requests the first page with a limit of five, the server will return the first five items. Then, the client can ask for the second page and we'll receive the items 6 until 10. So far, so good.

![illustrates the client receiving the correct paginated data from the server](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576293410/transcript-images/08_graphql-paginate-entries-using-the-connection-specification-index-pagination.jpg)

[06:38] Let's start over. The client ask for the first page and receives the first five items. Before asking for the second page, something else is happening. Another user removes the items three and four from the list. This is obviously affecting the pages.

[07:00] Now, our client requests the second page and receives items 8 until 12. Our client is missing item six and seven. No warning, no indication that the client missed these entries. Depending on your context, this can be neglectable, but in some environments, missing a message while on entry, can lead to horrible outcomes.

![illustrates missing data in the client when the server data is affected during requests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576293410/transcript-images/08_graphql-paginate-entries-using-the-connection-specification-missing-paginated-data.jpg)

[07:27] **Can we prevent it? Of course. Cursors to the rescue. The concept of providing an ID as a reference or position in the list.** How does this work? Let's go for the last scenario once again, but now with cursors. The client requests the first five items and leaving out the cursor, basically means giving the first page. Then, items three and four are removed. After that, the client requests the first five items after the cursor ID 5, because this is the last ID our client was aware of.

[08:04] As you can see, the item 6 to 10 are returned and no items are missing. Fantastic. That said, with our real time updates, users might still miss if entries have been deleted. Like in our case, item three and four are still on the list of the client. Nevertheless, at least the client won't miss a message, which is definitely better than missing them.

![illustrates how cursors solve the pagination issue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576293410/transcript-images/08_graphql-paginate-entries-using-the-connection-specification-cursors.jpg)

[08:29] What does this mean for our query? We replace `page` with `after` and passing the ID of the last item was called `endCursor`. After convenience, we can add the field `endCursor` to our `pageInfo`. 

```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(limit: 5, after: "cde") {
      recommendedProducts {
        product {
          name
          image {
            url
          }
        }
        boughtTogetherPercentage
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
}
```

This allows us to fetch the next page, but how can we fetch the previous page using cursors? Simply by replacing the argument `after` with `before`. In our implementation, we can make sure the once `before` is provided, we retrieve to previous items. Again, out of convenience, we can add the field `startCursor` to our `pageInfo`.

```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(limit: 5, before: "cde") {
      recommendedProducts {
        product {
          name
          image {
            url
          }
        }
        boughtTogetherPercentage
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
}
```

[09:08] Now, we are at a point where it's really interesting to compare our current query with the connection spec example we wrote before. The structure is identical and the only difference is the naming of certain fields. This makes a lot of sense, because if we start to generalize these names and replace `recommendedProducts` with `edges`, `product` with `node` and `limit` with `last`, we get the exact same result. Fascinating. By applying several common feature requests, we ended up with the connection spec.

```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(last: 5, before: "cde") {
      edges {
        node {
          name
          image {
            url
          }
        }
        boughtTogetherPercentage
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
}
```

[09:48] I hope with this little exercise, I could convince you that while the connection spec comes with some complexity, it's a really good idea. Make sure your scheme is ready for changing equirements. Pretty cool.

[10:02] Before we conclude the lesson, let us implement the type definitions so you have seen it at least once. We changed arguments to accept `first` integer, `after` ID, `last` integer, and `before` ID. Then we changed `products` to `edges` in the `RecommendedProductConnection`, and `product` to `node` in the `RecommendedProduct`. Since the `RecommendedProduct` is part of a connection, it also makes sense to post fix it with edge.

```graphql
type Product {
  id: ID!
  name: String
  description: String
  image: Image
  recommendedProducts(first: Int!, after: ID): RecommendedProductConnection!
}

type RecommendedProductEdge {
  node: Product!
  cursor: ID!
}

type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: ID!
    endCursor: ID!
  }

type RecommendedProductConnection {
  edges: [RecommendedProductEdge]
  pageInfo: PageInfo!
}
```

[10:32] At the final step, we add the type `pageInfo` containing `hasNextPage`, `hasPreviousPage`, start cursor, and end cursor. Then add it to our connection. We copy our example query and verify that it works. Great. To fetch the next page, we only need to replace the arguments and query for first five and after CDE. Works like a charm.