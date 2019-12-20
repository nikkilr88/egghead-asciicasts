A graph is a collection made up of nodes, also known as vertices, that may or may not be connected to other nodes. These connections are called edges. To build our graph, we're going to start by creating our node factory function.

When we create a node, we need to give it a value that we can use to identify it. We'll call it a `key`. We'll describe adjacent nodes in our graph as `neighbors`, as there is no hierarchy implied by the data structure.

Lastly, we need a way to add `neighbors` to our node, so we'll add an `addNeighbor` method that pushes a node into our `neighbors` array.

#### index.js
```javascript
function createNode(key) {
  const neighbors = []

  return {
    key,
    neighbors,
    addNeighbor(node) {
      neighbors.push(node)
    }
  }
}
```

Now we can create our graph factory function. `createGraph` receives an argument, `directed`. A directed graph's edges point in one particular direction, from one node to another. In order for two nodes to have symmetric edges, they must both point to each other.

In an undirected graph, we assume the symmetry of edges. We'll set `directed` to `false` by default. We'll `return` it in the object created by our factory function.

A graph is a collection of `nodes` and a collection of `edges`, so we'll create arrays for both of them in closure. We'll pass these references to our returned object as well.

```javascript
function createGraph(directed = false) {
  const nodes = []
  const edges = []

  return {
    directed,
    nodes,
    edges,
  }
}
```

Now we'll start adding methods to our graph. The first will be the `addNode` method. `addNode` receives a `key` as an argument and uses our `createNode` function to add a node to the `nodes` array.

We also want to be able to get nodes from our graph. We'll add a `getNode` method. `getNode` will search for a matching key and return the first one. We'll use array's `find` method to accomplish this.

```javascript
function createGraph(directed = false) {
  const nodes = []
  const edges = []

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find(node => node.key === key)
    },
  }
}
```

Next, we need to be able to add edges between nodes. We'll create an `addEdge` method. `addEdge` receives two arguments, a key for the first node and a key for the second node. We'll use our `getNode` method to get those two nodes.

We then will add `node2` as a neighbor to `node1`. This happens regardless of whether the graph is directed or undirected. The same goes for pushing our edge into the `edges` array. We'll simply pass a string of our two keys, adding a delimiter between them.

If the graph is undirected, we also want to add `node1` as a neighbor of `node2`. We're not going to worry about adding a second edge because we don't want the number of edges in our graph to be misrepresented. If we were to add an edge here, we'd have to implement a way of resolving both edges as one were we ever to count them and provide an edge's length property.

```javascript
addEdge(node1Key, node2Key) {
  const node1 = this.getNode(node1Key)
  const node2 = this.getNode(node2Key)

  node1.addNeighbor(node2)
  edges.push(`${node1Key}${node2Key}`)

  if (!directed) {
    node2.addChild(node1)
  }
},
```

Now that we can add nodes and edges, we'd probably like to be able to visualize our graph. We'll create a `print` method that will print out our nodes and neighbors in the console. We want to return a string derived from our nodes. I'm going to `map` over our nodes, gather some data about them, and `return` a `result`.

We'll start by destructuring the `key` and `neighbors` from each node. The string we're going to return will always start with the `key`. If there are any `neighbors`, we want to `map` over each one of them and concatenate that neighbor's `key` into our `result`.

Once that's done, we can `return` the `result`. We'll call a `join` with a new line on our array of strings. 

```javascript
print() {
  return nodes
    .map(({ children, key }) => {
      let result = `${key}`

      if (children.length) {
        result += ` => ${children
        .map(node => node.key)
        .join(' ')}`
      }

      return result
    })
    .join('\n')
},
```

Now we can create a `graph` and try it out. I'm going to create a directed graph of the Shevlin family -- me, my wife, and our two cats, Krios and Tali. This graph will describe who loves whom in this household.

My wife and I love each other very much. We can add an edge between us going in both directions. We love our cats, her a tad more than me. I'm more of a dog person. We have no way of weighting our edges in this graph. Instead, we'll just add edges from me to both our cats and from Anna to both our cats.

Next, our cats have very little love for each other. They tolerate one another, but they do fight from time to time. We won't put any edges there.

`Krios` does love `Anna`. `Tali` shows some affection towards me. We'll add edges there. Now if we call the `print` method on our graph and run it in the terminal, we should see a print out of my family's relationships.

![Results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-build-a-graph-data-structure-in-javascript-result.png)
