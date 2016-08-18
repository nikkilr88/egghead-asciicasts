A long-standing gotcha with JavaScript is how **var** works. If I have this `message` assigned to `hi`, and I have this `message` assigned to `bye`, you'd probably think, "This one's inside of a **block** so it should have no impact on what this `message` does up here." But if I run this, you'll actually see that that isn't the case. `Bye` is being logged out because this is the same `message`, and it's being **reassigned** to `bye`.
``` javascript
var message = "hi";
{
  var message = "bye";
}

console.log(message);
```
**ES5** does have **function scoping**, so if I were to create a `function` and lock it inside of there, then it wouldn't have any impact, and I would get `hi`. But if I were to create a **for loop**, or some other thing that could use a block, then that wouldn't work, and I get the same result as logging out, `bye`, each time. 
``` javascript
var message = "hi";

function greet(){
  var message = "bye";
}

console.log(message);
```
To help with this problem, we do have **let** in **ES6**, which will allow me to use **block scoping**.
``` javascript
let message = "hi";
{
  let message = "bye";
}

console.log(message);
```
If I rerun this, you'll see that we still get `hi`, even though we have `message` here, and `message` here. This `message`, because it's inside of a block, even though it's not inside of a function, has no impact on the assignment of this `message`. They are two **separate and different entities**. Let's explore this behavior in a bit more detail by creating an array of functions, and a loop where we say `var i` is assigned to `0`, `i < 10`, and `i` is incremented, so `i++`.
``` javascript
var fs = [];
  for(var i = 0; i < 10; i++) {
    fs.push(function (){
      console.log(i);
    })
  }
```
Then we will add a new function to our array each time we go through, which will store `i`, and log it out for us. If we loop through the array of functions using a `forEach`, which will pass in `f`, and then invoke `f()`. 
``` javascript
fs.forEach(function (f) {
  f();
})
```
Again, this function here, which is being passed in through our `forEach` is simply this `function` storing our `i`. You'd think that we'd get **zero through 9**, but in fact when we run this we'll get **10's**, because this `i` is that same `i` being used and reassigned each time.

If I use **let** instead of var now, and rerun this, you'll see that I get **zero through 9**, and it stops before getting to 10, because this is creating a new `i` each time you go through the for loop. 
``` javascript
var fs = [];
  for(let i = 0; i < 10; i++) {
    fs.push(function (){
      console.log(i);
    })
  }
```
What this really means in the end is that if you're used to bringing your variables up to the top of a scope using **var** and things like `var i`, `var temp`, where you want to be careful, because you're afraid of [hoisting](https://egghead.io/lessons/javascript-hoisting-in-javascript) behaviors due to this `i`, and this `temp`,
``` javascript
function varFunc(){
  var previous = 0;
  var current = 1;
  var i;
  var temp;
  
  for(i = 0; i < 10; i+=1){
    temp = previous;
    previous = current;
    current = temp + current;
  }
  console.log(current);
}
```
feel free now to use the let keyword, and instead of declaring it at the top, you can declare it **in-line**, inside of the **for statement**, as well as declaring it inside of the **for block**, and it'll safely create this `temp` **each time** it goes through the for block.
``` javascript
function letFunc(){
  let previous = 0;
  let current = 1;
  
  for(let i = 0; i < 10; i+=1){
    let temp = previous;
    previous = current;
    current = temp + current;
  }
  
  console.log(current);
}

```