I have the `schema` right now where all we have is the `Schema` type, as well as the `Query` type. Sitting on the `Query` type is a bunch of ad hoc fields that we have here that are just basic GraphQL primitive types.

**index.js** 
```javascript
type Query {
  id: ID,
  title: String,
  duration: Int, 
  watched: Boolean
}
```

Really, none of these fields relate to the `Query`type itself. Instead, all of these fields relate to a `Video` type. Instead of having a type `Query` here, we can actually make a GraphQL object type called `type Video` and we grab all of these fields and place them on the `Video` type.

**index.js** 
```javascript
type Video {
  id: ID,
  title: String,
  duration: Int, 
  watched: Boolean
}
```

Now, instead of having our type `Query` contain all of those fields, we can instead have `video` as the field that someone will query and what it will return is the `Video` type.

**index.js**
```javascript
type Query {
  video: Video
}
```

Now, we can actually go and update the `resolvers` that we have for the `schema`, and instead of returning a function for each of the fields that we have, we can actually have a `video` field. What this is going to return is an object. This object has an `id` field, it has a `title` field, it has a `duration` field, and then finally it has a `watched` field.

We can go and actually delete all of the resolvers that we have for the other fields that used to live on the `Query` type.

**index.js**
```javascript
const resolvers = {
  video () => ({
    id: '1', 
    title: 'Foo',
    duration: 180,
    watched: true
  }),
};
```

With this new `video` resolver defined, let's go and update our `query` that we had. Instead of querying the fields directly, now, we're going to be querying the `video` field. The `video` field is a video **object type**. We query for fields on that object type using these curly braces.

**index.js**
```javascript
const query = '
query myFirstQuery {
  video {

  }
}
';
```

On `video`, we know that we have an `id` that we can `query` for, as well as a `title`, `duration`, and `watched` fields that we can also query for.

**index.js**
```javascript
const query = '
query myFirstQuery {
  video {
    id,
    title,
    duration,
    watched
  }
}
';
```

Now, we can use `graphql` to actually resolve our query.

If we hop into our terminal and run `$ node index.js` and hit Enter, we actually get our response from our GraphQL server with our `video` field and all of the fields that we requested on that type.

**Terminal Output**
```bash
{ data: { video: { id: '1', title: 'Foo', duration: 180, watched: true } } } 
```