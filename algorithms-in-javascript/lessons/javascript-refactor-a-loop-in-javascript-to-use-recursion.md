Let's write a `counter` function.

#### Untitled-1
```javascript
function counter(){

}
```

Inside of this function, we'll do a `for` loop. We'll do `let n` equals zero. While `n` is less than or equal to `10`, we're going to increment `n`. Inside of this, we'll `console.log(n)`.

Now, let's invoke our function.

```javascript
function counter(){
    for(let n=0; n<=10; n++){
        console.log(n)
    }
}

counter()
```

Our `console.log` shows us that we were successful in creating a simple looping `counter` function.

Let's refactor this to use recursion now, instead of a loop. The first thing we'll do is comment out our function call here, and remove our `for` loop. We're going to `return counter(n+1)`. We'll pass in an `n` as a parameter to our `counter`, and then pass in `0` to our function call. **Recursion, simply put, is when a function calls itself**.

```javascript
function counter(n){
    return counter(n+1)
}

//counter(0)
```

As we can see here, we're returning the result of our own function, adding to the argument by one each time. Adding a `console.log` here with `n` will give us the same result that our `for` loop gave us, however when dealing with recursion it's important to understand two concepts of a recursion function.

```javascript
function counter(n){
    console.log(n)
    return counter(n+1)
}

//counter(0)
```

It needs to have at least one base case and one recursion case. The reason why we commented out our function call is if we were to run this function, it's going to enter an infinite loop. This is because we don't have our base case yet. We do if `n` equals `10`, we `return` our function. 

```javascript
function counter(n){
    console.log(n)
    if(n===10){
        return
    }
    return counter(n+1)
}

//counter(0)
```
Now with that in place, we can invoke our function, and we'll see from our `console.log` that we get numbers 0 through 10 successfully.

```javascript
function counter(n){
    console.log(n)   // 0,1,2,3,4,5,6,7,8,9,10
    if(n===10){
        return
    }
    return counter(n+1)
}

counter(0)
```

This is because we have our base case, if check to stop at `10`, and a recursion case to continue until we hit that `10`. Now, as a side note, there's no performance benefit to using recursion.

In fact, loops are sometimes better for performance. On the other hand, recursion can sometimes be easier to understand. If you struggle to understand what the base case is supposed to be, just think of it as, **"What are you trying to get from this recursion function?"** In our case, we wanted to create a loop that counted from 0 to 10.

10 was the goal, and that was our base case. Let's run another example's function for us to understand this. Let's say we had an array of arrays with numbers in them. Our job is to look through the arrays for the number `6`. If it's anywhere inside of this parent array, then we need to return true, or just the string, yes. I've already gone ahead and created thi

```javascript
const items =[[1,2,3],[4,5,6]]

function findSix(i){
    let hasSix="no!"
    i.forEach(a => {
        a.forEach(l => {
            if(l === 6){
                hasSix = "yes!"
            }
        })
    })
    return hasSix
}

console.log(findSix(items)) //yes!
```

I've called it `findSix`. It's going to take a list of `items`, as you can see down here. Instead of that, we're going to say just start off with initially it does not have a `6` inside of any of the arrays. For that first set of array, we're going to step through each one. We're going to get this first array and the second array inside this first `forEach`.

Then, once we're inside these two arrays, we're going to `forEach` again, looking for `6`. If we do have `6` somewhere in there, as we do on that second inner array, we're going to update our `hasSix` variable. That's what we're going to return. As you can see here, that we get `yes!`. If I change that to `5`, our function switches to `no!`.

This accomplishes our task, however, it's not very dynamic. Meaning if we were to add this `6` around another array, inside of here,

```javascript
const items =[[1,2,3],[4,5,[6]]]
```

we'll see that our function returns `no!` when we still have a `6` in here, and we want it to return `yes!`. In order to accomplish this, we'd have to add another `forEach` loop inside of here. 

Where we say if it's an array, we need to do another `forEach` inside of its contents. Instead of adding more and more for-eaches, or another type of loop, we can refactor this to use recursion.

This entails getting rid of one of the for-eaches, and adding an additional `if` check, where we say if `a` `isArray`, then we need to call this function again in our `hasSix` function, passing in this level array, and assigning its return value to our `hasSix` variable.

```javascript
function findSix(i){
    let hasSix="no!"
    i.forEach(a => {
        if(a === 6){
            hasSix = "yes"
        }
        if(Array.isArray(a)) {
            hasSix = findSix(a)
        }
    })
    return hasSix
}

```

Now with our `console.log`, we'll see that we're getting a `yes!` back here, even though we have this third inner array. It stays `yes!` as we remove it, and goes to `no!` if we get rid of the `6`. Our base case, or the goal of our function, was to find the number `6`.

This was our base case. We're basically repeating this simple logic over and over for the amounts of arrays that we have within our parent array, which makes our function more dynamic. It's why it's said recursion can be easier to read and understand than just using loops.
