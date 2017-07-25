Sooner or later you're going to find that you've written some code yourself that can either benefit others in your team, or the Node.js community as a whole. In this lesson we're going to create a module, and get it ready to publish.

I'm going to create a new directory called "Say Hello World," where we will create our module. Then we'll change directory into our Say Hello World directory, and then scaffold out our application using npm init. It's going to default to the name of our application, or the name of our module, as the directory name, which is fine for us. The version we'll change to 0.1.0. Description, this is going to write, hello world out to the console.

The entry point that it's asking us for here, is going to be the JavaScript file that contains our application code, and index.js will work fine for us. Test command will be the command that you need to issue to execute your unit test. The Git repository we're going to leave blank for now, because I don't have a repository set up, but this will be where you enter in the path to your repo.

Keywords are just words that you're going to enter in that describe that module, that are going to make it easier to find on the npm registry, or via searches. The author is going to be me, and the license I'm going to change to the MIT license.

Then it provides our package.json file here for us to review that has all of the basic components needed in a package.json file, and npm init was used, because that prompt is formed, so we don't have to remember what they are, and makes it a little easier.

Now we're ready to actually write some code. That code, as defined by our entry point, that we specified, is going to go in index.js. This is just going to say "module.exports." We're going to create a single function here that just writes out to the console "Hello world."

Then we can close that, and close that. As this is written, whenever we call "Say it," it's going to write out to the console hello world. We can save and exit there.

Now we want to see that this installs correctly, and does what we think it's going to do. We're going to do that locally. We're first get out of that directory, make a new directory, and we're just going to call it "Test Hello World." We're going to use npm to install it, and we're going to give it the relative path to our module that we created.

Now we can enter into the node shell interface, and actually type var say hello world. Then require the module that we just installed.

Then if we call that, it writes out hello world to the console, just like we expected it to. We verified that we can install this, and it works like we want. We're almost ready to publish it. There's just a couple of things we didn't do here.

One is the part you saw me skip over, the Git repo. It's common practice to include your code via a Git repo. The other thing is the test. We didn't do any tests for this, but in a real module that you're going to be sharing with others, you're going to want to have tests in there, and be able to demonstrate test coverage of your code.

Then the final thing is you want to have a readme file in there that will describe what your module does, how to install it, how to develop against it, as well as your contact info. Using Markdown is an excellent choice for that readme doc because the formatting is supported both by GitHub and npm.