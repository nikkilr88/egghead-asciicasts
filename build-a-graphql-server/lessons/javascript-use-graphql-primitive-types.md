Let's start out by opening up our `index.js` file in our text editor of choice, and take a look at the GraphQL `schema` that we've created here. In this `schema,` we've actually defined a `Query` type, and it exposes a single field called `foo` that's of type `String`.

In this case, string is a **GraphQL primitive type**, and we actually have several primitive types available to us when we try and define fields on our `schema`. Let's go ahead and try and add some more primitive types now to this `Query` type.

To start off, let's make a field called `id` that's of type `ID`. We'll update `foo` here to be `title`, and title is a `String`. We could also have a field called `duration` which has a type of `Int`, we could also have a field called `watched` which is of type `Boolean`.

**index.js**
```javascript
type Query {
  id: ID,
  title: String,
  duration: Int,
  watched: Boolean
}
```

Now, if wanted to make sure that our `schema` could resolve each of these types, we would go to our `resolvers`, we'd create one for `id`, and in this case, we could have the `id` of 1. We'd update the `foo` field to `title`, we would change `duration` to some kind of integer, and then `watched` would be a `Boolean` value.

**index.js**
```javascript
const resolvers = {
  id: () => '1'
}
```

Now with all these `resolvers` defined, we can go and update our `query` to request the field `id`, the field `title`, the field `duration`, and finally, the field `watched`, and we can use the `graphql()` call to execute our given query against the `schema`.

Let's go ahead and run that in our terminal, I'll do `$ node index.js`, and now, we go ahead and get our response containing a `data` field. Inside of the `data` field we have the `id`, the `title`, the `duration`, and the `watched` values being returned to us.

**Terminal Output**
```bash
{ data: { id: '1', title: 'bar', duration: 100, watched: true } } 
```