As the name implies, depth first search is a graph search algorithm that explores as far as it can down a particular path before climbing back up and working down another one. We'll add a `depthFirstSearch` method to our graph object.

This method will receive two arguments, a `startingNodeKey` to find which node in the graph to start the search from and a `visitFn` function to be called as we visit each node for the first time. First, we need to get the `startingNode` by using the `getNode` method.

#### index.js
```javascript
depthFirstSearch(startingNodeKey, visitFn) {
  const startingNode = this.getNode(startingNodeKey)
}
```

Next, we need to keep track of which nodes we have visited and which ones we haven't. There are several ways we can do this, but I'm going to do it by keeping a `visited` object where each `key` corresponds with a node's `key`, and the `value` starts as `false`. 

```javascript
depthFirstSearch(startingNodeKey, visitFn) {
  const startingNode = this.getNode(startingNodeKey)
  const visitedHash = nodes.reduce((acc, cur) => {
    acc[cur.key] = false
    return acc
  },
    {}
  )
}
```

Now, depth first search involves a recursive algorithm.

Essentially, if there's another level to go down, we need to explore that one until we reach a dead end. I'm going to create an `explore` function that we will call on our nodes. If we visited this node, then `return` from the function immediately.

```javascript
function explore(node) {
  if (visitedHash[node.key]) {
    return
  }
}
```

Otherwise, call the visiting function on the node and mark it as visited. 

```javascript
function explore(node) {
  if (visitedHash[node.key]) {
    return
  }

  visitFn(node)
  visited[node.key] = true
}
```

Next, we want to loop through each of this node's neighbors and call `explore` on them. Lastly, we start our algorithm by calling `explore` on our `startingNode`. 

```javascript
function explore(node) {
  if (visitedHash[node.key]) {
    return
  }

  visitFn(node)
  visited[node.key] = true

  node.neighbors.forEach(child => {
      explore(child)
  })
}

explore(startingNode)
```

Now that we've created our depth first search algorithm, let's use it.

I've pre-made a graph that I'll copy paste into the file that looks like this. 

![Example Graph](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-write-a-depth-first-search-algorithm-for-graphs-in-javascript-example-graph.png)

I want to call `depthFirstSearch` on our `graph` starting at node `a` and logging out each `key` as we go. 

```javascript
graph.depthFirstSearch('a', node => {
    console.log(node.key)
})
```

If I bring the graph back onto the screen and we call our search in the terminal, we could see that we went as far down the path of `a` we could before we climbed back up and went down another path.

![Result](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-write-a-depth-first-search-algorithm-for-graphs-in-javascript-result.png)
