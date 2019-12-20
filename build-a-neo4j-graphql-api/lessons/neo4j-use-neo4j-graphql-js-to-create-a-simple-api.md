Instructor: [00:00] We'll start out by partially populating our graph with `Planet` and `Person` nodes, using some data from Swappy that we can reference by parameter.

```sql
CREATE (alderan:Planet) SET alderan = $alderan
CREATE (hoth:Planet) SET hoth = $hoth
CREATE (c3po:Person) SET c3po = $c3po
CREATE (r2d2:Person) SET r2d2 = $r2d2
RETURN
```

#### Running, populated graph
![Running, populated graph](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276287/transcript-images/egghead-use-neo4j-graphql-js-to-create-a-simple-api-running-popluated-graph.png)

Now that we've got a running, populated graph, all we need is an API to allow us to access it.

[00:15] Here's a little bit of boilerplate to get an Apollo GraphQL server up. There's nothing out of the ordinary here, other than the `driver` we're passing into the `context: {}`, which we are creating from the `neo4j-driver` module to connect to our running instance.

[00:30] We can fill in our `typeDefs` with some high-level information about the two node types we've put into the graph. Let's only go as far as the `name` property for right now and expose those two types in the query.

#### index.js
```javascript
const { v1: neo4j } = require('neo4j-driver')
const { ApolloServer, makeExecutableSchema } = require('apollo-server')

const driver = neo4j.driver(
  `bolt://${process.env.NEO4J_HOST}:7687`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS))

const typeDefs = `
type Person { name: String! }
type Planet { name: String! }
type Query {
  Person: [Person]
  Planet: [Planet]
}
`

const schema = makeExecutableSchema({ typeDefs })

new ApolloServer({
  schema,
  context: { driver },
}).listen(8000, '0.0.0.0')
  .then(({ url }) => console.log(`GraphQL API ready at ${url}`))
```

[00:43] Now that we've got all of our basic structures in place, let's spin up the API and head over to the playground to see what we can see. Let's start by getting a list of all of our people and planets.

#### No Resolvers
![No Resolvers](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/neo4j-use-neo4j-graphql-js-to-create-a-simple-api-oh-no-null.png)

[00:55] Oh no, we forgot to build our resolvers. Not to worry, let's see what the `neo4j-graphql-js` module can do for us. We can add the module and destructure its `augmentSchema` function to add a little magic to our type definitions.

#### index.js
```javascript
const { v1: neo4j } = require('neo4j-driver')
const { ApolloServer, makeExecutableSchema } = require('apollo-server')
const { augmentSchema } = require('neo4j-graphql-js')

const driver = neo4j.driver(
  `bolt://${process.env.NEO4J_HOST}:7687`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS))

const typeDefs = `
type Person { name: String! }
type Planet { name: String! }
type Query {
  Person: [Person]
  Planet: [Planet]
}
`

const schema = augmentSchema(makeExecutableSchema({ typeDefs }))
```

[01:11] Let's get that running again and head back to the playground. Our first surprise will be in running that query again. `neo4j-graphql-js` seems to have implemented our resolvers for us, what a pal.

#### Resolvers Implemented
![Resolvers Implemented](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/egghead-use-neo4j-graphql-js-to-create-a-simple-api-resolvers-implemented.png)

If we take a look back at the debug output for our running API, we can even see that the augmented schemas have translated the resolution process into Cypher queries to run against Neo4j.

#### Debug output for our running API
![Debug output for our running API](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/egghead-use-neo4j-graphql-js-to-create-a-simple-api-debug-output-for-our-running-API.png)

[01:37] We've got one more surprise in the schema tab, where we can see we've got a few extra goodies waiting for us. Not only have those augmented queries that we wrote gained a few default parameters, but we've also got a pair of mutations for each of our node types.

#### Default Parameters
![Default Parameters](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/egghead-use-neo4j-graphql-js-to-create-a-simple-api-default-parameters.png)

[01:53] At this point, we can even go so far as to delete the queries that we specified and just let neo4j-graphql-js do the lifting for us.

#### index.js
```javascript
const { v1: neo4j } = require('neo4j-driver')
const { ApolloServer } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')

const driver = neo4j.driver(
  `bolt://${process.env.NEO4J_HOST}:7687`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS))

const typeDefs = `
type Person { name: String! }
type Planet { name: String! }
type Query {
  Person: [Person]
  Planet: [Planet]
}
`

const schema = makeAugmentedSchema({ typeDefs })
```

We can even replace Apollo's `makeExecutableSchema` function with a bespoke `makeAugmentedSchema` function and get the same results.
