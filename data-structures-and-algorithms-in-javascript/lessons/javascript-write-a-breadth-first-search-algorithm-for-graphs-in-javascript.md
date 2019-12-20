As the name implies, breadth-first search is a graph search algorithm that starts at one node and explores as widely as possible before going further down adjacent nodes. We'll add a `breadthFirstSearch` method to our graph object.

We want to accept two arguments, a `starting` node key to find which node in our graph to start from and a `visitFn` function to call when we visit each node. The first thing we need to do is get the `startingNode` using the `getNode` method.

#### index.js
```javascript
breadthFirstSearch(startingNodeKey, visitFn){
  const startingNode = this.getNode(startingNodeKey)
}
```

Next, we need to keep track of which nodes we have `visited` and which ones we haven't. There are several ways we can do this. I'm going to do it through using an object.

I'm going to `reduce` our `nodes` down to an object where each key is the current node's `key` and the value is set to `false`, that I can set to `true` later on when we've visited that corresponding node.

```javascript
breadthFirstSearch(startingNodeKey, visitFn){
  const startingNode = this.getNode(startingNodeKey)

  const visited = nodes.reduce((acc, node) => {
    acc[node.key] = false
    return acc
    },
    {}
  )
}
```

Next, we'll need to keep track, in order, which nodes that we need to visit. We'll use a `createQueue` function I've imported from another lesson. The first node we need to visit is our `startingNode`, so we'll `enqueue` it.

```javascript
const queue = createQueue()
queue.enqueue(startingNode)
```

Now, `while` the queue is not empty, we want to perform our search algorithm. Part of our algorithm will enqueue more nodes. This will continue to go on until we've visited every node in our graph.

Each time we run through this loop, we want to `dequeue` the first item out of our `queue` and set that as the `currentNode`. If we haven't visited this node before, we need to call our visit function on it and set its corresponding value to `true` in our `visited` hash.

```javascript
while (!queue.isEmpty()) {
  const currentNode = queue.dequeue()

  if (!visitedHash[currentNode.key]) {
    visitFn(currentNode)
    visited[currentNode.key] = true
  }
```

Now, we want to loop through each neighbor of our `currentNode`. If we haven't `visited` before, we want to add it to our `queue`. 

```javascript
while (!queue.isEmpty()) {
  const currentNode = queue.dequeue()

  if (!visitedHash[currentNode.key]) {
    visitFn(currentNode)
    visited[currentNode.key] = true
  }

  currentNode.children.forEach(node => {
    if (!visited[node.key]) {
      queue.enqueue(node)
    }
  })
}
```

Now that we've implemented breadth-first search, let's try it out on a graph.

I've premade a graph for us that I'll copy-paste the code into our file. It looks like this. 

![Graph](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-write-a-breadth-first-search-algorithm-for-graphs-in-javascript-graph.png)

I want to use breadth-first search to print out the `node` keys as arrive at each one, into the console.

I'll start from node `a`. If I bring the graph back onto the screen and we compare it to the result in the terminal, we can see how we branched out from node `a` and visited all of its neighbors before proceeding down node `b`'s neighbors.

![Result](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-write-a-breadth-first-search-algorithm-for-graphs-in-javascript-result.png)
