A tree is a graph without any cycles. A cycle is when three or more nodes are connected in a circuitous path. Tree nodes, instead of having neighbors and no hierarchy like a graph, might be thought of having children and are hierarchical.

Each node can contain many children. Node children may have an edge between them, and they may not be connected to any other parent node. To write our tree data structure, we'll start by creating a function to create our nodes.

#### index.js
```javascript
function createNode
```

Each node receives a `key` as an argument. We'll `return` that `key` in the object returned by the factory function. Next, a tree node can have many `children`, so we'll create an array and return that reference.

```javascript
function createNode(key) {
    const children = []

    return {
        key,
        children
    }
}
```

Lastly, we'll add a method called `addChild` so that we can add children to this node. `addChild` will receive a `childKey` as an argument, create the `node`, push it to the `children` array, and `return` that node.

```javascript
function createNode(key) {
    const children = []

    return {
        key,
        children,
        addChild(childKey) {
          const childNode = createNode(childKey)
          children.push(childNode)
          return childNode
        }
    }
}
```

Now we can create our tree factory function. Trees must have a root node, so we'll expect the `rootKey` to be passed as an argument when the tree is created. We'll use this key to create a node, and we'll assign it to `root` and return it in our tree object.

```javascript
function createTree(rootKey) {
  const root = createNode(rootKey)

  return {
    root
  }

```
This tiny object is all we need to begin to use our tree, since each node contains in it the ability to add nodes to it. Perhaps the most common tree structure web developers deal with on a regular basis is the DOM tree. The HTML of every page on the web is a tree structure.

We can create the basic layout of a page pretty quickly with our tree. I'll create a tree and name it `dom`, giving it the root key of `html`. Our `html` node adds two children, `head` and `body`.

Our `head` node receives one child, our `title`. Our `body` node likely has many elements. In our case, we'll give it a `header`, a `main`, and `footer`. Our `header` probably has an `h1`. Our main perhaps has a paragraph. Our `footer` might have the copyright year.

```javascript
const dom = createTree('html')
const head = dom.root.addChild('head')
const body = dom.root.addChild('body')
const title = head.addChild('title - egghead Tree Lesson')
const header = body.addChild('header')
const main = body.addChild('main')
const footer = body.addChild('footer')
const h1 = header.addChild('h1 - Tree Lesson')
const p = main.addChild('p - Learn about trees!')
const copyright = footer.addChild(`Copyright ${new Date().getFullYear()}`)
```

Now that we have our tree structure, it might be nice to visualize it. Let's create a `print` method that traverses our tree and logs out each node's key. I want to return a string from our `print` method, and I'll be concatenating onto this string with each level we traverse through our tree.

I'm going to create a variable called `result`, and I will `return` that. I'm going to create a `traverse` function that we'll call recursively on our nodes. Traverse will accept three arguments, the `node` it's operating on, a `visitFn` function to fire on each node, and a `depth` argument I'm going to use for my output.

```javascript
function createTree(rootKey) {
  const root = createNode(rootKey)

  return {
    root,
    print() {
      let result = ''

      function traverse(node, visitFn, depth) {
        
      }

      return result
    }
  }
}
```

`depth` isn't necessary in this implementation and could be derived from the data, but this will be useful for the lesson. Now, we start by visiting our current node. Then, if the `node` has any children, we want to traverse through each one of them, passing them same visiting function but increasing the `depth` by `1`.

```javascript
function traverse(node, visitFn, depth) {
  visitFn(node, depth)

  if (node.children.length) {
      node.children.forEach(child => {
          traverse(child, vistFn, depth+1)
      })
  }
}
```

Now I'll create a function to pass as our visiting function. This function will mutate our result string. For the very first node key, I only want to return the `key`. For every subsequent `key`, I want to create a new line and then add twice as many spaces as the `depth` before each node `key`.

```javascript
function addKeyToResult(node, depth) {
    result +=
      result.length === 0
        ? node.key
        : `\n${' '.repeat(depth * 2)}`
}
```

This will give a nice nested layout to our output. Next, I want to `traverse` starting from the `root` node and passing our visiting function and a `depth` of 1.

```javascript
traverse(root, addKeyToResult, 1)
```

Now that our `print` method is complete, let's call it on the `dom` tree we created before. 

```javascript
console.log(dom.print())
```
We need to create a little more room in our terminal so we can see the full visualization. There you can see our dom tree printed out.

![DOM Tree](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429647/transcript-images/javascript-build-a-tree-data-structure-in-javascript-dom-tree.png)