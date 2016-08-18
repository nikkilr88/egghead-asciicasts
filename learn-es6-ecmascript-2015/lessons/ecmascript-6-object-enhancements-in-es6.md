**ES6** comes with some **object enhancements**. If I want to create a `car` with that `color` and `speed`, I can just say `{color, speed}` and then log out `car.color` and `car.speed`. When I run this, you can see I get `red` and `10`.
``` javascript
var color = "red";
var speed = 10;

var car = {color, speed};

console.log(car.color);
console.log(car.speed);
```
That's because if you **declare a property** with the exact **same name** as something, it'll treat it just as if you did `color:color` and `speed:speed`. This is the **ES5** way, and this is the ES6 way.
``` javascript
var car = {color:color, speed:speed};
```
This even works for functions. If I create a function called `go` and say `vroom`, I can simply add another property here, call it `go`, and then say, `car.go()`. Then I'll run this. You can see it says, `vroom`.
``` javascript
var color = "red";
var speed = 10;
function go() {
  console.log("vroom");
}

var car = {color, speed, go};

car.go();
```
Another cool thing...I'm going to format this just a little bit, put these on new lines...is that instead of using the function keyword, I can actually cut and paste this here. Then I'll just delete that. This is valid syntax for declaring a function on an object. If I save and run again, you'll see I get the same result. 
``` javascript
var car = {
  color,
  speed,
  go(){
    console.log("vroom");
  }
};
```
This is the ES6 way, and that's the ES5 way. It's basically a **shorthand** that saves you some typing.
``` javascript
var car = {
  color,
  speed,
  go: function(){
    console.log("vroom");
  }
};
```
The last fun trick to show you is that if you type something like this, you can actually have a **computed property** where it'll evaluate this. This is pretty much just like if you were to do `car["go"]` like that, but now you're doing it inline inside of an object declaration.
``` javascript
var car = {
  color,
  speed,
  ["go"]: function(){
    console.log("vroom");
  }
};
```
This will still work when I run it. I ran it and got `vroom` still. I can actually extract this `go`. I'll cut that out, say `var drive`, paste it in there. Then we can put `drive` in here, hit save, run it. We still get `vroom`.
``` javascript
var drive = "go";
var car = {
  color,
  speed,
  [drive]: function(){
    console.log("vroom");
  }
};
```
You could do any sort of **string concatenation** or evaluation in there to generate some sort of **string**, which would **evaluate** into the **name** of something that you could then **call** later on.