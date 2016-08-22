**Default arguments** in **ES6** allow you to assign some defaults to these guys. If I run this right now you'll see I'll get `undefined, undefined` because nothing was passed in for `greeting` or `names`, so when they get logged out they're both `undefined`.
``` javascript
function greet(greeting, name){
  console.log(greeting + ", " + name);
}

greet();
```
If I want his `name` to at least default to `John`, if I don't pass anything in, I can get `undefined` to `John`. I didn't pass anything in here, but I said the `name` should at least be `John` so it logs out the `name` as ``John``.

If I pass in `Hello` here, and then run this, you can see I get `Hello, John`. `Hello` comes through the `greeting`, logged out here as `Hello` and the `name` still defaults to `John`, and then is logged out here.
``` javascript
function greet(greeting, name = "John"){
  console.log(greeting + ", " + name);
}

greet("Hello");
```
If I say `Hello, Bill`, the default will be overridden and I'll get `Bill` **instead** of `John`, because the default was `John`, but I said explicitly to say `Bill`.
``` javascript
function greet(greeting, name = "John"){
  console.log(greeting + ", " + name);
}

greet("Hello", "Bill");
```
Where this gets a little bit crazier is when you **assign a default function** to one of the arguments. Right now, `complete` is `undefined`, so it will say `undefined is not a function` when I try to invoke it.
``` javascript
function receive(complete){
  complete();
}

receive();
```
But, if I **pass in a function** and say `log complete`, and I run this, you can see it logs `complete` out, because it invokes it when it's passed in.
``` javascript
function receive(complete){
  complete();
}

receive(function(){
  console.log("complete");
});
```
But, I can take this function, I'll cut it out of here and then assign that as the default function and then I'll rerun it and you'll see I still get `complete`.
``` javascript
function receive(complete = function(){
  console.log("complete");
}){
  complete();
}

receive();
```
We can make this a little bit shorter using the [arrow syntax](https://egghead.io/arrow-function) that I've covered before. If I do that and then get rid of the braces and then bring everything up to the same line, you can see that I can assign a default function, all within that same line, run it again, and I still get `complete`.
``` javascript
function receive(complete = ()=> console.log("complete")){
  complete();
}
```
If you want to go completely crazy with arrow functions, which I don't recommend, you could go `let receive` and I'll assign it to an arrow function, delete these braces, pull everything up to the same line, and then just invoke it this way. It still runs and this just doesn't look like JavaScript.
``` javascript
let receive = (complete = ()=> console.log("complete")) => complete();
```
It's not a JavaScript you'd write, but it's very unfamiliar with the new syntax, with the arrow functions and the default assignments all working on the same line.