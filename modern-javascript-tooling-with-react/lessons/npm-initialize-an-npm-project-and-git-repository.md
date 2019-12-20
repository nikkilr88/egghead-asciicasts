I've created an empty directory called `react-boilerplate`, and opened a terminal window pointed to that directory. I'm using VS Code's integrated terminal, but you can use whichever terminal works for you.

Let's initialize our project using `npm init`. Running `npm init` will prompt us with some questions. We'll run through them here, but in the future, if you'd like to just use the defaults, you can skip the prompts by passing in the `-y` flag. I'll remove that flag, and let's walk through the questions.

The first question we're going to get is for the `package name`. By default, it's just going to our directory name. We can press enter to accept that. `Version` is going to start at `1.0.0`.  We're going to change this to `0.1.0` I like to start new projects as a minor version, iterate for a little bit, and then set it to `1.0` when I feel like it's ready for an initial release. That's what we'll do here. We can provide a `description`. All of these things are optional.

I can just press enter and leave that blank. Entry point will default to `index.js`. That's fine for now. We'll leave the test command, and accept the defaults. Git repository, we don't know yet. Let's press enter for that.

Keywords, we can put some descriptive keywords here. This is good if you're going to publish to npm, and you want people to find your package. We can leave that blank for now. author, you can put your information here.

We can choose a license. I'm just going to accept the defaults for all of these for now. When we press enter on that last question, it's going to give us a preview of the JSON that it's going to put in our `package.json` file.

#### terminal
```json
{
  "name": "react-boilerplate",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

We'll see that it's taken the `name`. It took our new, updated `version` number. `description` is blank, `main` is the default. It gives us a `scripts` section with a default test script, and we have an empty `author` and the ISC `license`.

We're just going to press enter to accept this. Once that's done, if we reveal our files, we'll see that we have a `package.json` file. Let's open up the `package.json`, we'll see exactly what we got in that preview. We have our `name`, `version`, `description`, all the fields that we were prompted for, whether it's an updated value like `version` or one of the default values that we just accepted.

Now that we have a file in our project, let's make it a Git repo so that we can track our changes, we can use branches to isolate our changes, and we can push this code up to GitHub. I'm going to switch back to the terminal, and I need to initialize this Git repository.

I'm going to type `git init`, and now, it's initialized this Git repo. We can see that my prompt shows the branch, which we didn't have before, because it wasn't a Git repository. VS Code is going to highlight this as a changed file.

![Git](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/npm-initialize-an-npm-project-and-git-repository-git.png)

Now, we can type `git status`, and we'll see that we're on our `master` branch, we have no commits yet, and we have this one untracked file, which is our `package.json`. The prompt is going to tell us that we have `nothing added to commit`, but we have untracked files present. It's going to tell us to `use "git add" to track`.

We're going to do `git add`, and we're going to specify the file that we want to add. In this case, it's our `package.json`. We'll press enter. Now, if I run `git status` again, we'll see that we're still on our `master` branch, we still have no commits, but now, we have changes to be committed.

It's going to show us this new file, `package.json` entry. Now, we can create our initial commit. I'm going to type `git commit -m`, and I'm going to give it a commit message. In this case, we're just going to say `initial commit`.

We'll press enter, and we'll see that we have one file changed. It's made 11 insertions. Now, let's go `git status` one more time, and we'll see that we have nothing to commit. It's telling us our working tree is clean, because all the changes that we've made have already been committed.

Now, I can type `git log`, and it's going to give us details of our commit. Once we have more commits, we'll see more entries when we run `git log`. To get out of this, I'm just going to hit `q`, and that'll return us back to our prompt.
