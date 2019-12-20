When working with Divide and Conquer, it's important to understand that these types of algorithms are recursive algorithms. Divide and Conquer isn't a simple algorithm that you can apply to a problem.

Instead, it's a way to think about a problem. When faced with a problem, you can think, "How can I divide or split this problem down to its simplest form?" **Recursion empowers this mentality, because it requires a problem to be able to broken down into sub-problems, and then returns or solves them up from the bottom.**

Let's create a function called `sum` that takes an array.

#### Untitled-1
```javascript
function sum(arr){

}
```

We'll say `let` the `total` equals `0`, then `for` each `i` of `arr`, increment the total by `i`. Then we'll `return total`.

```javascript
function sum(arr){
    let total = 0
    for(let i of arr){
        total+=i
    }
    return total
}
```

Now, we'll `console.log` our `sum`, passing through an array of `[1,2,3,4,5]`.

```javascript
function sum(arr){
    let total = 0
    for(let i of arr){
        total+=i
    }
    return total
}

console.log(sum([1,2,3,4,5]))   //15
```

Perfect. We see that gives us `15`. We are simply just looping through each item inside of our array, and adding it onto each other, which gives us `15`. How could we use Divide and Conquer and recursion to break this down into smaller problems?

**Let's first think about what is the simplest case with our numbers?** If we had an array of just one number, or even an empty array, that would be pretty easy to sum up. It would just be zero or that one value. This is our base case.

```javascript
function sum(arr){
    if(arr.length === 0) return 0
}
```

Our goal is to move closer to this with each recursive call.

In order to remove an element each time we recursively call this function, we first need to make sure we're adding up that removed item to the remaining state of the array. We'll do that by slicing off the rest of the array, and then adding it to the first value of the array.

```javascript
function sum(arr){
    if(arr.length === 0) return 0
    return arr[0] + sum(arr.slice(1))
}
```

Recursion is a first-in, last-out. Our function on the first `return` call returns a one plus the `sum` of two, three, four, and five. Then within that function, we're returning a two plus the `sum` of three, four, and five. It'll continue to do this until we reach our base case, we return zero.

Which is then added to the last number, five. Then it's five plus four, which makes it nine plus three. 12 plus 2, and finally, 14 plus 1, which gives us our value of `15`. Recursion is nice because it keeps returning our new state after each function.