In the GraphQL `schema` that we built here, we have a field called `video` that returns explicitly a `Video` type. While it's great that we're returning a specific type, sometimes it's necessary for us to query our GraphQL server for a collection or a list of a certain type.

**index.js**
```javascript
type Query {
  video: Video
}
```

If we wanted to get a listing of all the videos that we may have, we add a field to our `Query` type called `videos`. In order to note that this field returns a list of videos, we'll use these square brackets. Inside of the square brackets, we'll write down the type for `Video`.

**index.js**
```javascript
type Query {
  video: Video,
  videos: [Video]
}
```

What we've created here is a field called `videos` that returns a **GraphQL List type** of the `Video` type. Now that we have this `videos` field defined, let's go and actually build out the collection of videos that will return from our `resolvers`.

We'll create a variable called `videoA` that holds all the fields of a `Video` type. We'll also go and create a `Video` called `videoB`. Finally, we'll go and create our variable called `videos` that is just the collection of `videoA` and `videoB`.

**index.js**
```javascript
const videoA = {
  id: 'a', 
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true,
};
const videoB = {
  id: 'b', 
  title: 'Ember.js CLI',
  duration: 240, 
  watched: false,
};
const videos = [videoA, videoB];
```

Now that we have our collection of videos, let's go and update our `resolvers`. Now we have a `videos` field, so we need to be able to tell our GraphQL `schema` how to actually resolve the `videos` field. So I'll add in `videos`, which will just be a function that will return our collection of `videos`.

**index.js**
```javascript
const resolvers = {
  video () => ({
    id: '1', 
    title: 'Foo',
    duration: 180,
    watched: true
  }),
  videos: () => videos,
};
```

We can then update our `query` that we have down here by just changing a single letter instead of requesting the `video` field, we'll just request the videos field. For each of these fields that we have listed, it's actually going to go through our collection of `videos` and get the field for each individual video and return the results.

**index.js**
```javascript
query myFirstQuery {
  videos {
    id,
    title,
    duration,
    watched
  }
}
```

We can verify this by running our `query` against our `schema` that we've defined and including our `resolvers`. 

**index.js**
```javascript
graphql(schema, query, resolvers)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

If we switch into our Terminal and run `$ node index.js`, we'll get a response which has the `data` field and it returns a collection of `videos`.

**index.js**
```bash
{ data: { videos: [ [Object], [Object] ] } }
```