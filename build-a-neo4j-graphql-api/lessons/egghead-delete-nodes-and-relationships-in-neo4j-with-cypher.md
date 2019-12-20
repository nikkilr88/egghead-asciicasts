Instructor: [00:01] Removing nodes from Cypher is as simple as using `MATCH` to find the node and `DELETE` to remove it.

```sql
MATCH (c3po:Character {name:"C-3PO" })
DELETE c3po
```

If we're trying eto delete a node with relationships however, we will need to instruct Neo4j to first `DETACH` that node's relationships and then `DELETE` th node. This will detach and delete all incoming and outgoing relationships for the node in question.

```sql
MATCH (luke:Character {name:"Luke Skywalker"})
DETACH DELETE luke
```

[00:23] We can also use `DELETE` to remove relationships connecting the nodes in our graph.

```sql
MATCH (friend)-[relationship:HAS_SIDEKICK]->(sidekick)
DELETE relationship
RETURN friend, sidekick
```

We can see that Han is no longer related to Chewie through the `HAS_SIDEKICK` relationship.

#### Remove relationships connecting nodes in our graph
![Remove relationships connecting nodes in our graph](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/egghead-delete-nodes-and-relationships-in-neo4j-with-cypher-remove-relationships-connecting-nodes-in-our-graph.png)
