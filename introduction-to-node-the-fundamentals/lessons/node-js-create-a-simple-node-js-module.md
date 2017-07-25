In this lesson, we're going to talk about modules, talk a little bit about what they are, and see how we can use them. Modules are a concept in Node that allow you to add functionality written by others to your application. It allows you to refactor your own code for readability and usability.

To get started, let's just create a JavaScript file called "circle.js." Inside of there, we're going to first create a variable called "pi," that's equal to Math.PI. Then, we're going create a couple of functions. First, we're going to create an area function that takes a parameter r. It's going to return pi * r * r.

We'll create a second function, called "circumference." Again, it's going to take a parameter r. This time, it's going to return 2 * pi * r. We can save that and exit. In order to use those functions that were exported inside of the circle.js file, we're going to create a variable called "circle."

Then, we're going to include the require statement with a dot whack. That's a relative path indicator just telling the require statement to look for our file, circle.js, inside the current directory.

Now, the circle variable has access to those functions. If we call circle.area and pass in the parameter four, we can see that the area is returned. If we do circle.circumference, we get the circumference of the circle returned.

There are several different ways that this require object can grab modules and include them in your application. The first way is just how we saw here, where we use the require object and then we give it a relative path to a file that we want to include.

One of the other ways that you can include a module is if you've installed that module locally in your node_modules folder, then you can grab it from there. I've already installed the module Colors by using npm install colors. We can include it here by just calling that module name, and then we can use it directly.

The third way for including modules is to include the globally available Node modules that exist within Node core itself. These include HTTP, Net, OS, File, FS, and all the others that are found in the Node API docs. All of these are available with no other requirements. You can just do "var http = require http," and it's going to be included.

When you include modules, it follows a hierarchy that determines how the modules are going to get loaded, and how it's going to determine which ones are available. It looks at the global modules first. If it finds one by that name, that's the one it's going to use, even if you have a local module by that same name. The globals always override.

The second place it's going to look, if it doesn't find a global module by that name that you required, it's going to look in the local node_modules folder.

If we look in ours, it would look for the modules colors, new-relic, and say-hello-world. If it doesn't find it there, then, it's going to start directory traversal, and work its way up.

If we look at the current directory, I'm in /users/willbutton/code. It's already checked /users/willbutton/code/node_modules, and then, from there, it will look in /users/willbutton/node_modules. If it doesn't find it there, it's going to traverse up to /users/node_modules.

If it doesn't find it there, it's going to go all the way up to the root and look in a folder /node_modules. If it doesn't find your module there, it will return with a "Module not found" error.

One other thing to know is that when you include a module...let's use our circle module as an example, again. You can say, "require ./circle," just like that. Notice that we've left the .js file extension off, but if I do circle.area(4), it still works.

What Node does is whenever you require a module, it will look, automatically, for files with the name ".js." If it finds circle.js, it's going to treat that as JavaScript file. It's also going to look for files with the .json file extension.

If it finds one of those, it's going to treat it as a JSON object. The last thing it will do is look for a file with the .node file extension. When it finds those, it treats those as compiled modules.