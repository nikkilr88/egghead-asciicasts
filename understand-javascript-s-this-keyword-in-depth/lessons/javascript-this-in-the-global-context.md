Instructor: [00:01] JavaScript's `this` mechanism behaves a little differently compared to other languages. It might not always be intuitive. Let's start off by looking at how `this` works in the global execution context. When used outside of any function, `this` refers to the global object.

[00:18] In the browser, that would be `window`. It doesn't matter whether or not we are in strict mode. A top-level `this` always refers to the global object. Now let's switch over to node. At the top level, `this` is equivalent to the global object as well, which is called `global`.

![this equals globl](../images/javascript-this-in-the-global-context-this-equals-global.png)

[00:42] However, that is only true within the node REPL. Let's execute the same line of code within a node module. Suddenly, we get `false`. 

![this doesnt equal global](../images/javascript-this-in-the-global-context-this-not-equal-global.png)

This is because, in the top-level code of a node module, `this` is equivalent to `module.exports`.

[01:09] If we now run the program again, we get true. The node engine runs each module code inside of a REPL function. That REPL function is invoked with a `this` value set to `module.exports`. In a future lesson, we are going to discuss how to invoke a function with a specific `this` value using either `call`, `apply`, or `bind`.