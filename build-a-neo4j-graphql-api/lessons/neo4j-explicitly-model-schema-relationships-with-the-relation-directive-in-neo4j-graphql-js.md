Instructor: [00:00] Let's start out by making sure we don't have any data in our graph, so we can start with a clean slate. 

```bash
MATCH (n) DETACH DELETE n
```

Now, we can fill a few nodes representing a `Person`, a `Species`, a planet, and a `Film`. While we create these, we'll also relate them to each other.

```bash
CREATE (luke:Person{ name: "Luke Skywalker"})
CREATE (human:Species{ name: "Human"})
CREATE (tatooine:Planet{ name: "Tatooine"})
CREATE (empire:Film{ name: "The Empire Strikes Back"})
```

[00:17] We can get a quick look at the graph model we built to see how these nodes relate to each other. A `Person` has a `Species` and `Homeworld`, and appeared in a `Film`. A `Species` appeared in a `Film`, and a planet appeared in a `Film`.

![A graph representation of nodes and relationships](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831941/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-graph.png)

```bash
CREATE (luke:Person{ name: "Luke Skywalker"})
CREATE (human:Species{ name: "Human"})
CREATE (tatooine:Planet{ name: "Tatooine"})
CREATE (empire:Film{ name: "The Empire Strikes Back"})
Merge (luke)-[:HAS_SPECIES]->(human)
Merge (luke)-[:HAS_HOMEWORLD]->(tatooine)
Merge (luke)-[:APPEARED_IN]->(empire)
Merge (human)-[:APPEARED_IN]->(empire)
Merge (tatooine)-[:APPEARED_IN]->(empire)
RETURN
```

[00:32] We can see a tidy little graph as the result of that query, which looks like what we can call a subgraph in our model. 

![first query result](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831941/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-1st-query-result.png)

Let's create schemas in our API to represent the new `Film` and `Species` nodes that we've added.

[00:45] We'll also fill in the properties and types of our relationships. 

#### index.js
```js
const typeDefs = `
type Person {
  name: String!
  homeworld: Planet 
  species: [Species] 
  films: [Film] 
}
type Planet {
  name: String!
  films: [Film]
}
type Species {
  name: String!
  films: [Film]
}
type Film {
  title: String!
  people: [Person] 
  planets: [Planet] 
  species: [Species] 
}
`
```

If we run our API server, we can put together a query to get back all of the nodes we created. What's missing, however, is any indication of the relationships between these nodes.

![no relationships shown in graphql](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831940/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-no-relationships-graphql.png)

[01:02] In typical GraphQL fashion, we could write some resolvers to handle this for us. Instead, we're going to let `neo4j-graphql-js` do the lifting. Enter the `@relation` directive. We can use this to easily describe within our schema any relationships a type of node has to another node.

[01:19] We can reference external `Film` nodes by decorating `Person`, `Planet`, and `Species` with relations that go out to a `Film`. That goes the same for a `Person`'s `Homeworld` and `Species` properties. Similarly, we can reference these same nodes from a `Film` by describing them on the `Film` schema as relations that come in from some other node.

```js
const typeDefs = `
type Person {
  name: String!
  homeworld: Planet @relation(name: "HAS_HOMEWORLD", direction: "OUT")
  species: [Species] @relation(name: "HAS_SPECIES", direction: "OUT")
  films: [Film] @relation(name: "APPEARED_IN", direction: "OUT")
}
type Planet {
  name: String!
  films: [Film] @relation(name: "APPEARED_IN", direction: "OUT")
}
type Species {
  name: String!
  films: [Film] @relation(name: "APPEARED_IN", direction: "OUT")
}
type Film {
  title: String!
  people: [Person] @relation(name: "APPEARED_IN", direction: "IN")
  planets: [Planet] @relation(name: "APPEARED_IN", direction: "IN")
  species: [Species] @relation(name: "APPEARED_IN", direction: "IN")
}
`
```

[01:43] Now, we can take a look at our updated API and query against these relations. As with any other GraphQL implementation, we can query and hydrate data in an arbitrarily nested structure. Not only do we save some development cycles by not building resolvers, but we also get to keep working in a Graph mindset.

![shows neo4j relationships in graphql](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831941/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-shows-neo4j-relationships.png)

[02:03] Let's take a look at our API's logged output. Rather than query the database for a `Person` node, read its properties in JavaScript, then go back to the database to hydrate those properties, `neo4j-graphql-js` will create a single query, and walk the graph in one step to fill in all of the data we need.

![generated neo4j query from graphql](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831945/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-generated-neo4j-query.png)

[02:22] The schema tab in our GraphQL playground will also now contain a whole new class of mutations. Now, we can not only create nodes, but also relationships between existing nodes.

![shows graphql schema](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831940/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-shows-graphql-schema.png)