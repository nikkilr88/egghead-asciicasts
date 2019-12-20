Instructor: [00:00] For this course, any GraphQL server would do because I'm quite familiar with it, we're going to use Apollo server. Usually, Apollo server requires you to define the type definitions in the GraphQL schema language and to the servers.

**package.json** 
``` json
{
  "private": true,
  "name": "designing-graphql-schemas-course",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Nik Graf",
  "scripts": {
    "start": "nodemon index.js"
  },
  "dependencies": {
    "apollo-server": "^2.9.7"
  },
  "devDependencies": {
    "nodemon": "^1.19.4"
  }
}
``` 

[00:15] For this course though, we're mostly not going to write your servers and simply `mock` the schema. This allows us to iterate faster when assigning the schema. We can activate the `mock` mode by passing in the option mocks and set it to `true`.

**index.js** 
``` js 
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  mocks: true
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

```

[00:31] If we now run `Yarn start`, the server will spin off and under `local host:4000`, we provide us with a GraphQL ID. Let's visit the URL in a browser and run a query. As you can see, our server is running and now the query was mocked.

[00:51] The Apollo server under `mock` mode by default will `mock` any type but it also gives us the opportunity to customize the mocks per type. Let's return just `Hello` for `String` instead of the `Hello World`. Therefore, we create a new object `mocks` containing one property. Its key is `String` and the value, a function returning Hello.

[01:15] Be aware that the GraphQL schema type `String` starts with an uppercase `S` and therefore, the object key has to do as well, then we replace the `mocks` Boolean with the full object to a name punning in JavaScript, we can simply remove the `:true`.

``` js 
const typeDefs = gql`
  ...
`;

const mocks = {
  String: () => "Hello"
};

const server = new ApolloServer({
  typeDefs,
  mocks
});

```

[01:32] If we rerun the query, we can see that our `String` is now mocked with just `Hello`. Having paths of the schema `mock`, but other paths being actually resolved is also possible. We extend our type definitions with Hello to colon string and implement the resolve for it.

[01:56] We pass through servers object to Apollo server and the mutations set `mock` and entire schema to false. Now, we can create for `helloTwo` and `Hello`. As you can see, `helloTwo` returns the resolved result while `Hello` still relies on the `mocks`. This setup should take you quite far when exploring and iterating on a new schema design.

``` js 
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Real Hello Workshop"
  }
};

const mocks = {
  String: () => "Hello Workshop"
};

const server = new ApolloServer({
  typeDefs,
  mocks,
  mockEntireSchema: false,
  resolvers
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

```

