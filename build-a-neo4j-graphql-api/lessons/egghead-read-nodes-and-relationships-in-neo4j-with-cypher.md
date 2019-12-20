Instructor: [00:01] Querying data from Neo4j is done with the `MATCH` clause. The format is similar to `CREATE`, except that the parameters we pass after the label are treated as query parameters.

```sql
MATCH (luke:Character { name: "Luke Skywalker" })
RETURN luke
```

[00:12] We can also use those parameters to represent more complex conditionals with the `WHERE`, `AND`, `OR` clauses.

```sql
MATCH (luke:Character)
WHERE luke.name = "Luke Skywalker"
    AND luke.gender = "male"
    OR NOT exists(luke.gender)
RETURN luke
```

If we are more concerned with querying according to relationships than properties on nodes, we can do so by representing our `MATCH` with multiple relationship conditions.

```sql
MATCH (luke:Character)-[:HAS_SISTER]-(sister),
    (sister)-[:HAS_FRIEND]->(friend)
WHERE luke.name = "Luke Skywalker"
    AND luke.gender = "male"
    OR NOT exists(luke.gender)
RETURN friend
```

#### Representing match with multiple coditions
![Representing match with multiple coditions](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/egghead-read-nodes-and-relationships-in-neo4j-with-cypher-representing-match-with-multiple-conditions.png)

[00:39] We can also forgo specifying any conditions and `RETURN` everything.

```
$ MATCH (node) RETURN node
```
