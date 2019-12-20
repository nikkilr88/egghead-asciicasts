Instructor: [00:00] Once we are able to create and read data from our Neo4j graph, we can use the same concepts to update our nodes.

```sql
MATCH (luke:Character { name: "Luke Skywalker"})
SET luke.hair_color = "blonde"
RETURN luke
```

It's also possible to represent the changes using a collection of values or parameters. When using Neo4j Desktop, these are set with the `params` keyword.

```bash
$ :params { luke_params: { hair_color: "blonde", skin_color: "fair"}}
```
```sql
MATCH (luke:Character { name: "Luke Skywalker"})
SET luke.hair_color = $luke_params.hair_color,
    luke.skin_color = $luke_params.skin_color
RETURN luke
```

[00:19] We can also update our node by setting all of our parameters and leaving the existing ones intact with the `+= operator`, or we could replace all of the current properties with those in our parameters with the `= operator`. This will have the effect of removing Luke's gender property.

[00:39] We can also use `REMOVE` to remove any properties we have set on a node. Let's remove Luke's eye color.

```sql
MATCH (luke:Character { name: "Luke Skywalker"})
REMOVE luke.eye_color
RETURN luke
```

[00:47] Cypher also provides us with a `MERGE` clause, over `MATCH` and an optional `CREATE`. This will either create or match an existing node, with the value of name set to R2-D2.

```sql
MERGE (r2d2:Character { name: "R2-D2" })
RETURN r2d2
```

[00:59] Along with `MERGE`, we can use `ON MATCH SET` and `ON CREATE SET` if we want the two operations to behave differently depending on whether we `MATCH` an existing node or `CREATE` a new one.

```sql
MERGE (c3po:Character { name: "C-3PO" })
ON MATCH SET
    c3po.changed = timestamp()
ON CREATE SET
    c3po.changed = timestamp(),
    c3po.created = timestamp()
```
