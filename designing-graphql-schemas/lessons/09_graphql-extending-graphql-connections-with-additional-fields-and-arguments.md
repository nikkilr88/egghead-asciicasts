Instructor: [0:00] While in the connections spec, arguments, how they should be implemented, as well as the field structure, is well-defined. It doesn't prevent us from extending it with fields useful to our use cases. In fact, we already did exactly that, by adding the field `boughtTogetherPercentage`.

[0:19] While probably obvious to you by now, we also can extend `pageInfo`. So far, we only can retrieve the information if there is a next or previous page. This works well for endless scroll. In case we want to have pagination, this wouldn't be sufficient, though, since such a UI would allow the user to directly visit multiple pages ahead of the current one.

![pagination component shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576293410/transcript-images/09_graphql-extending-graphql-connections-with-additional-fields-and-arguments-pagination-component.jpg)

[0:43] At this point, we only can retrieve the `startCursor` for the next page. In order to retrieve the necessary information in one query, we can add a new field, `hasThreeNextPages`, and ask for the `cursor`. Why so? Let me demonstrate this by adding it to our examples response.

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
        hasThreeNextPages {
          cursor
        }
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
}
```

[1:04] `hasThreeNextPages` would return an array of three items. Each of them would return a `cursor` ID, so we can use it for our `after` argument when requesting more entries of the connection. 

**result**
```graphql
{
  "product": {
    "name": "Blackbook",
    "edges": [
      {  
      "node": { 
        "name": "USB to HDMI Adapter",
        "image": {
          "url": "https://www.example.com/x.png"
        }
      }
      "boughtTogetherPercentage": 0.95
      },
      { 
        "node": {
          "name": "USB to SD Adapter",
          "image": {
            "url": "https://www.example.com/y.png"
          }
        },
        "boughtTogetherPercentage": 0.91 
      }
    ],
    "pageInfor": {
      "hasNextPages": [
        { "cursor": "ert" },
        { "cursor": "tyu" },
        { "cursor": "ewq" },
      ],
      "hasNextPage": true,
      "hasPreviousPage": true,
      "startCursor": "qwe",
      "endCursor": "ert"
    }
  }
}
```

Be aware that, in case there are only two pages, the returned result will only return two entries, and our user interface can reflect that.

[1:27] Sometimes, a bit more flexibility is required, though, especially when serving multiple clients. In this case, we could pass in an argument `amount`, instead of hard-coding the expected amount of next pages. Then, if you want to ask for five more pages, you could do so by changing the amount. For previous pages, we can do exactly the same.

```graphql
{
  product(id: "abc") {
    name
    recommendedProducts(last: 5, before: "cde") {
      
      ...

      pageInfo {
        hasNextPages(amount:3) {
          cursor
        }
        hasPreviousPages(amount: 3) {
          cursor
        }
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
    }
  }
}
```

[1:51] Let's briefly go through how this would look like in our type definitions. We add a type `PaginationEntry` containing a `cursor`. Then we extend `pageInfo` with `hasNextPages`. It accepts the argument `amount` and returns a list of pagination entries. For `previousPages`, we can do exactly the same.

```graphql
type PaginationEntry {
  cursor: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  hasNextPages(amount: Int!): [PaginationEntry!]!
  hasPreviousPages(amount: Int!): [PaginationEntry!]!
  startCursor: ID!
  endCursor: ID!
}
```

[2:20] **While you don't have to, I would still recommend to provide and implement the `pageInfo` fields specified in the connection spec. Clients like Relay will expect them to be there, and in case you provide them, it allows you to be flexible with your choice of clients in the future.**

[2:38] One note about the type name. In case the only one to use `hasNextPages` for recommended products, it's best to have a separate type, `RecommendProductsConnectionPageInfo`, including all fields. In addition to that, you can have `pageInfo` for other connections. Let's verify if this works as expected.

```graphql
type RecommendedProductConnectionPageInfo {
  ...
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: ID!
  endCursor: ID!
}

type RecommendedProductConnection {
    edges: [RecommendedProductEdge]
    pageInfo: RecommendedProductConnectionPageInfo!
  }
```

[3:12] Looks good. We receive a list of cursors for both fields. So far, so good. There is one more addition I want to point out, but now, we only extended the connection spec with fields, but nothing's preventing us from adding arguments to the connection itself.

[3:31] Common examples are filters or order arguments. For example, we could add the field `orderBy`, allowing us to order the result by `CREATE_AT` or `NAME`.

```graphql
type Product {
  id: ID!
  name: String
  description: String
  image: Image
  recommendedProducts(
    first: Int
    after: ID
    last: Int
    before: ID
    orderBy: RecommendedProductConnectionOrder
  ): RecommendedProductConnection!
}

 enum RecommendedProductConnectionOrder {
  CREATED_AT
  NAME
}
```

[3:45] While obvious in hindsight, for quite a while, I thought of the connection specification as something very static and inflexible. I thought extending it was not intended and would be harmful, but the contrary is the case.

[3:59] In fact, if you take a closer look, it even says so in the specification multiple times, "May contain other fields."
