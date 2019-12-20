Instructor: [00:00] The most basic CREATE command has the following structure. `CREATE` followed by a `variable name` and a `label` in parentheses, separated by a `colon`. We can also assign multiple labels to a node.

```sql
CREATE (my_node:Thing:Another)
RETURN my_node
```

[00:13] This will create a node with the label `Character` in our graph.

```sql
CREATE (luke:Character{ name: "Luke Skywalker", gender: "male" })
RETURN luke
```

#### Create a Node
![Create a Node](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276287/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-create-a-node.png)

If we want to do something a little more useful, we can set key value pairs when creating the node. We can also set these properties by using the `SET` clause and referencing the variable `Leia`.

```sql
CREATE (leia:Character)
SET leia.name = "Leia Organa",
    leia.gender = "female"
RETURN leia
```

[00:34] The `CREATE` statement can also be used to create data other than nodes. We can, for instance, create nodes with relationships between them and optionally, create properties on those relationships.

```sql
SET han.name = "Han Solo",
    han.gneder = "male",
    chewie.name = "Chewbacca",
    chewie.gender = "male",
    r.since = "forever"
RETURN han, chewie
```

#### Create Properties on Relationships
![Create Properties on Relationships](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543276288/transcript-images/neo4j-create-nodes-and-relationships-in-neo4j-with-cypher-create-properties-on-relationships.png)

[00:47] We can also `CREATE` a `CONSTRAINT` on our graph, asserting that only one node with a certain property value can exist.

```bash
$ CREATE CONSTRAINT ON (c:Character) ASSERT c.name IS UNIQUE
```

We can do similar things with relationships. Here, we will say that a particular property must exist on all relationships of a given type.

```bash
 $ CREATE CONSTRAINT ON ()-[r:HAS_SIDEKICK]-() ASSERT exsists(r.since)
```

Similarly, we can `DROP` any constraints we may have created.

```bash
$ DROP CONSTRAINT ON (c:Character) ASSERT c.name IS UNIQUE
```
