Instructor: [0:00] What to do in case you ended up in a situation where we have a field like image returning a string, but we want to move to image returning full image?

[0:10] **First, our focus should still be on providing value as soon as possible.** Therefore, we add `imageObject` returning the new `Image` type. To get it with this change, we can ship deprecating the field `image`. Then, deploy all these changes together.

**index.js** 
```js
const typeDefs = gql`

  type Image {
    url: String
    description: String
    thumbnailUrl(width: Int, height: Int): String
  }

  type Product {
    id: ID!
    name: String
    description: String
    image: String @deprecated(reason: "Use \`imageObject { url }\`.")
    imageObject: Image 
  }
  ...
`;
```

[0:35] Now, we have to wait. How long? Depends on how quick we can make sure all our users use clients that make use of `imageObject`. If we only have a web client, this can happen rather quick, but in case the API is used by mobile clients, it might take a while until all our users upgraded to a new version.

[0:57] By the way, there is no need to guess this or track this based on the app version usage. Why? **Because in GraphQL there's no way to query for all fields automatically. If we want to have a field in the response, we have to define it explicitly in the query, which means on every request we can track which fields are requested and verify if a field hasn't been requested for a while.**

[1:24] Once the field `image` is not used anymore, we can move on to the next step. We remove `image: String` and, at the same time, add `image: Image`. Basically, we replace one with the other. In addition, we add a deprecation to `image` object referring that the field `Image` should be used. This is great, since we're already very close to the desired outcome.

```js
const typeDefs = gql`

  type Image {
    url: String
    description: String
    thumbnailUrl(width: Int, height: Int): String
  }

  type Product {
    id: ID!
    name: String
    description: String
    image: Image
    imageObject: Image @deprecated(reason: "Use \'image\'.")
  }
  ...
`;
```

[1:51] Last but not least, we eventually can remove the field `imageObject`, but again, only once all our users using clients that use the field image instead of `imageObject`.

[2:03] In summary, with enough time and multiple deploys, you can make breaking changes in a GraphQL schema without ever affecting a single user.
