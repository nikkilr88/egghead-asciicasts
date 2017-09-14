Here we're inside of a Git repo called `utility-functions`. To create a `README.md` file, we can create a file called `README`. The convention is to use a markdown file, so we add the `.md` for markdown extension. I've opened up this `README.md` file in my code editor, and now let's create a description for the project here.

It's also common and helpful to provide some code examples in your `README.md`, so I'll make an `# Examples` header. Then I'll add a code snippet. 

#### README.md
```javascript
A collection of utility functions

# Examples

getRancomElement([1, 2, 3]);
//=> 2

getRandomNumber(1, 10);
//=> 4
```

Now we have a simple document at the root of our project that has a description of what the project is as well as a few code examples.

There are lots of other things that you can put in your `README.md` as well as lots of other markdown syntax that you can learn, like these examples here. The important thing is that no matter what, at least, have a simple `README.md` that explains what your repo is for. Now let's do a `git status`, and we'll see that our `README.md` is untracked.

Let's stage it, and then we'll create a `commit`. We'll say, "Adding README". Then let's `push` it to our remote repo. Now if we look at our repo on our GitHub page, we can see if we scroll down that our `README.md` is being rendered. It says, "A collection of utility functions," and then it has a few code examples from the document that we created...