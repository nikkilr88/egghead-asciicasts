In this lesson, we're going to talk about some of the objects that are available to all Node applications, without having to require anything. These are given the generic term globals.

The first one we're going to take a look at is the global namespace object itself, appropriately named Global. If you're used to programming in the browser, you're familiar with global as being the top level scope. That means if you do something like var foo, then you define a global variable.

If you define var foo inside of your Node application, it's going to be global to the application module itself, not to all of Node. So, let's take a look and see how that's going to work.

We're going to start by entering the Node REPL interface. We do that by entering the node command without any additional arguments.

From here, if we just type "global", we get a list of all of the global objects. There's a ton of stuff going on here. If I scroll back up through it, just to give you an idea, it's got all kinds of information here. We're going to go through some of that a little later on in the lesson.

But, the thing I want to show you right now is if we type var foo="This is test", and now we run the global object again, you can see the very last thing on our list here is our variable that we just created, and it's in the global scope. All right?

So, let's do a quick example to show how global scope is not really global as you might be thinking of global.

I'm just going to switch to a new tab here, and I'm just going to create a file called globalfoo.js. We're going to create a global variable called GlobalFoo. And then we're going to export two functions here. Let's export one called Set Foo that takes a parameter. It's just going to set GlobalFoo equal to the value that we pass in.

Our second one that we're going to create is going to be called Return Foo. It won't take any parameters, and it's just going to return the value of GlobalFoo.

All right. If you're not familiar with using the exports, don't worry too much. All it's going to do is make these functions available to any application that includes this file, via the require statement, which we'll take a look at next.

So, back in our Node REPL interface here, now we're going to include that code from the globalfoo.js file inside our REPL interface here, using the require global object.

Require is Node's module loading system. What it does is it allows us to segregate and keep our code in reusable and readable modules, and then just pull those modules in as we need them inside our application. It's important to understand that the part of require that global is the require object itself, not the code that it pulls in.

So, we're going to include our file here.

And now we can actually say mod Foo, Set Foo, and pass in a value. And if we want to see that value in action, a call to Return Foo, and it's 42, just like we passed in. All right?

sIf we look back at our code here, we saw that we created this as a global variable, but yet over here when we type "global", it's not plural, we can see our mod Foo module that we imported is available, but that global variable is not, because that variable GlobalFoo was global to this code, not global to the application where we were using it.