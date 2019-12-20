Instructor: [00:01] Let's make sure that we have some data in our graph that we can work with. 

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

By querying our GraphQL API, we can see that there are some data points that can be inferred by the relationships going to and from a `node`.

[00:13] One such piece of data could be the list of `species` found on a given `Planet`. The only way we can currently get that information is by going through our list of people and collecting their `HomeWorld` and `species` name properties.

![GraphQl Query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831938/transcript-images/build-complex-schema-relationships-with-the-cypher-directive-in-neo4j-graphql-js-graphQL-query.png)

[00:29] Optimistically, we can update our `schema` to show a list of `species` on a `Planet`. Let's take a look at how we can use the Cypher directive provided by `Neo4j-graphql-js` to make this easy for us.

#### index.js
![Updated schema list](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/build-complex-schema-relationships-with-the-cypher-directive-in-neo4j-graphql-js-updated-schema-list.png)

[00:42] Let's further edit our `Planet` `schema` and add the `@cypher` directive along with its statement property, which represents a Cypher statement to run against the database.

[00:52] The `this` parameter represents the `Planet` `node` in question. As it happens, this will return one `species` per person that connects back to the `Planet`. We'll need to only `RETURN DISTINCT species`.

![Updated schema with the @cypher directive](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831939/transcript-images/build-complex-schema-relationships-with-the-cypher-directive-in-neo4j-graphql-js-updated-schema-pt2.png)


[01:07] Now, we'll restart our API and write a query that includes the `Planet`'s `species` property.

![New query with Planet's species property](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544831938/transcript-images/build-complex-schema-relationships-with-the-cypher-directive-in-neo4j-graphql-js-updated-query-with-species-planets.png)
