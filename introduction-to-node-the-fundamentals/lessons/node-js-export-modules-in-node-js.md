Exporting modules can be pretty confusing when you're first getting started with Node. An easy way to think about them is it's a way to expose your functions so they can be used elsewhere in your application, like the way that you export an environment variable in your operating system and that allows that variable to be accessed from anywhere.

There are two ways that you can do this, either exporting individual functions or exporting the entire file. We'll first start by creating a file called "circle.js." We'll create a variable called "pi." It's equal to Math.PI.

Then, let's create a function called "area," that requires a single parameter, r. It's going to return pi * r * r. Then, we'll create a second one, called "circumference," again, taking one variable, r. This time, it's going to return 2 * pi * r.

If we save and exit that, then, we can go into a Node shell. We can create a variable called "circle" and then grab all of that code that we wrote by using the require statement, and then, the dot and forward slash, which tells the require statement to look for our circle.js file in the current directory.

Now, we can access those functions that we exported through our circle variable. We can do circle.area, pass in that required parameter. We get the area of the circle. Same thing with the circumference. We get our circumference.

If we go back and look in that file real quick, we saw that we used the export statement that exported a function called "area." We used the export statement again to export a function called "circumference." That made those functions accessible outside of this file.

The other way of doing this is by using module.exports. Module.exports can return any valid JSON script object, such as a string, a Boolean, a number, a date, or whatever, but the export statement we see here can only return a module instance.

The big difference between the two is that the exports statement is just a helper function for module.exports. All it's going to do is collect properties, and then, attach them to module.exports if and only if module.exports doesn't already have something attached to it.

Let's do another example using module.exports now and see how we can use that to return the exact same functionality. We'll create a circle.js file again and start by including our variable pi that's equal to Math.PI.

Now, we'll say module.exports is equal to a function. That function's going to require a single parameter. Then, we're going to say it's going to return a JavaScript object. Here's where we're going to define our functions that we want to return.

First, we'll define area. That's a function. It's going to return pi * r * r. Then, we can define our circumference function. It's going to return 2 * pi * r. If we save and exit that, go back into our Node interface.

Once again, create a variable called "circle." That's going to be equal to require. Then, include our circle.js file.

Now, we'll say "var myCircle is equal to circle." Here's where we'll include the parameter that was required. Now that myCircle object has access to the area function, and it has access to the circumference function.

To summarize that, the general thumb rule is use the exports statement to export instances of modules. Use the module.exports statement to export JavaScript objects.