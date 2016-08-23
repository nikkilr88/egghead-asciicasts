Let's rewrite this `createGreeting` function to the **arrow function** style. Let's say `arrowGreeting` is message name and then the **fat arrow** with some braces and `return message + name`. Now, that actually looks about the same.
``` javascript
var createGreeting = function(message, name){
  return message + name;
}

var arrowGreeting = (message,name) => {
  return message + name;
}
```
The only difference really is that this is on the right side, whereas the `function` keyword is on the left side, so that'd be here, whereas this would go here. But we can actually make this much smaller.

First, let's remove the braces. I'll remove him, remove him, and move everything up the same line and remove the `return` keyword. This will automatically return `message + name`. You don't have to write the `return` keyword when you don't have the braces in there.
``` javascript
var arrowGreeting = (message,name) => message + name;

```
Second, if there's **only one parameter**, like you only take in a `message`, you can actually get rid of the **surrounding parens** here and just say `message` would return `message`, or `message` would return `hello`, or whatever you want it to **return**. That's why you'll see something like `var squared` is X, which returns `X * X` to be `X squared`.
``` javascript
var arrowGreeting = message => "hello";

var squared = x => x * x;
```
An extremely common scenario that you've probably run into before whether though **click handlers** or anything else is that, you write a function to handle some sort of action and you write the body of the function, and you run into the scenario where you'll assign `that = this` because you actually want to get the name off of the parent scope.
``` javascript
var deliveryBoy = {
  name: "John",

  handleMessage: function (message, hangler) {
    handler(message);
  },

  receive: function () {
    var that = this;

    this.handleMessage("Hello, ", function(message) {
      that.name //get the proper name

      console.log(message + that.name);
    })
  }
}
deliverBoy.receive();
```
The name doesn't exist inside of this scope so we have to do the `that` is `this`, and then, to get `this` in here, you refer to `that`. It can get pretty confusing.

Now, the **arrow function** actually helps handle this scenario. I'm going to delete the `function` keyword. I'll use the arrow function syntax. Then, that here can just become this. I can delete this line, delete `that`, and `this` now refers to the outer scope outside of this function because it's passing in this **lexical scope** that's coming in from **above** the function.
``` javascript
receive: function () {

  this.handleMessage("Hello, ", (message) => {
        console.log(message + this.name);
      })
}
```
`this` is no longer referring to the **scope** inside of the function. It's referring to the scope that's outside of the function.

Again, if you'd prefer to do this in one line of code, we can delete this brace and bring everything up a line. We can delete the semicolon and delete the closing brace. We can remove the paren from here and handle this nicely in a simple one-liner.
``` javascript
receive: function () {

  this.handleMessage("Hello, ", message => console.log(message + this.name))
}
```
When I run this, you can see it prints out `Hello, John` because this is actually this handler right here and it's getting this message through here, which is coming from here. When the message goes here to here to here, down into our arrow function, I add it to this name, and `this.name` is this name now...