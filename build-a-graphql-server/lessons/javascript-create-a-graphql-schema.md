To get started with **GraphQL**, let's actually go and make the project directory that we're going to be working in. In our case, I'm going to make a directory called `getting-started`

Let's go ahead and `cd` into that. Inside of here, I'm going to use `yarn`'s `init` command, and pass in the `-y` flag just to say yes to all the questions that they ask.

**terminal**
```bash
yarn init -y
```

This is going to generate our `package.json` file inside of our project. Now, we can go ahead and add GraphQL to our project. We'll do `$ yarn add graphql`. Once that's installed, we can go ahead and actually open up our project in your text editor of choice.

Once you have your project directory open up in your text editor, go ahead and add an `index.js` file. This is what we're going to be using for building out our first Schema. Open up `index.js`. What we can do in the first line here is actually import two pieces from the `GraphQL` package.

The first one is going to be `graphql`, the second one is going to be a tool called `buildSchema`. We'll just `require` them from the graphql package.

**index.js**
```javascript
'use strict';

const { graphql, buildSchema } = require('graphql');
```

The next step here is to actually go ahead and build out our Schema. We can use that `buildSchema` utility here, which actually takes in a string.

In this case, I'll use a [template literal]( https://egghead.io/lessons/ecmascript-6-string-templates), and inside of here, we can write out two types. The first type is going to be our Schema type. I'll write out `type Schema`. `Schema` takes in a variety of fields, but in this case, we're only going to write out `query`.

**index.js**
```javascript
const schema = buildSchema('
type Schema {
  query: Query
}
');
```

`Query` is going to refer to another type called `type Query`, and this is going to be a type that has a single field called `foo`, which is of type `String`.

**index.js**
```javascript
type Query {
  foo: String
}
```

What we've actually created here is a description of the capabilities of our GraphQL server. We've created a type called `Schema`, which is a definition of queries, mutations, and some descriptions. In this case, we're just going to be calling the `query` field. We've also created the `Query` type, which defines a field called `foo`, which is of type `String`.

**index.js**
```javascript
const schema = buildSchema('
type Query {
  foo: String
}

type Schema {
  query: Query
}
');
```

What this will allow us to do is to query our Schema for `foo`, and it will give back a value of a `String`. The way that GraphQL knows how to return a value or what value to return, is through the idea of something called a **resolver**. Let's go ahead and create our resolvers, `const resolvers =`.

**index.js**
```javascript
const resolvers = {
  
};
```

Inside of this object literal, we'll just write one for `foo` which is going to be a function that returns the string `'bar'`.

**index.js**
```javascript
const resolvers = {
  foo: () => 'bar',
};
```

Now that we've actually written out the capabilities of our GraphQL server and we've written how to resolve any requests for a particular field, let's go ahead and create our first `query` which in this case will be a `String`.

We'll call it `query myFirstQuery`. What we can request on this `query` is the field `foo`. Let's actually go and use the `graphql` function that we acquired earlier, passing in our `Schema`, our `query` that we want to execute, as well as our `resolvers`. What this function returns is a Promise.

**index.js**
```javascript
const query = '
query myFirstQuery {
  foo
}
';

graphql(schema, query, resolvers)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

```

I'll call `.then`. We'll give it the result callback, and then, we'll just log out what the result is. Let's also go ahead and `.catch` any kind of error as well, and log that out to the console. What we're doing here with GraphQL is stating that we want information from this `query`.

In this case, we're requesting the field `foo`, and `graphql` is going to validate that `query` against the `schema` which lists out all the functionalities and capabilities of a GraphQL server. Once it's validated that, it will actually go and get all of the data for that field based off of our `resolvers`.

What this means is that when we go into our terminal and type in `node index.js` in order to execute our Script, we'll actually get back an object that has a field called `data`. Inside of that, we get the field that we requested `foo`, and then the value `bar`.

**terminal output**
```bash
{ data: { foo: 'bar' } }
```
