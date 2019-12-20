I'd like to use this project as a starting point for new projects, so I don't have to worry about all this configuration. Let's strip this down to a simple hello world app, so we can use all the tooling, but avoid having too much code to clean up at the start of each new project.

To start, I'm going to come down here. I'm going to get rid of this import for this `Warning` component, because we're not going to need that anymore.

#### App.js
```jsx
import React from 'react'
import { hot } from 'react-hot-loader

class App extends React.Component {
  state = {
    count: 0
  }

  ...
}
```

Then I'm going to come over into my file explorer, and I'm just going to delete `Warning.js`.

With that gone, let's go down into our class. We're not going to need the `state`, or the `increment` and `decrement` methods anymore. We can come down here, and we can get rid of this destructuring of `state`, because we don't have anymore `state`.

We'll leave the `<h1>Hello World</h1>`, but we're going to remove this `h2`, our `buttons`, and our `count` output.

#### App.js
```javascript
import React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World.</h1>
      </div>
    )
  }
}

export default hot(module)(App)
```

We can save that, and then we can come over to `styles.css`. Most of the CSS is a reset, so I'd like to keep this included.

#### styles.css
```css
html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

...
```

If we scroll down to the bottom, we have this `.warning` class that was used for demonstration purposes. We can get rid of this, and we can save that. Now, we can jump into our terminal, and let's commit this code.

I'm going to `git status`, and we'll see that we've modified our `App`. We've deleted `Warnign`, and we've modified `styles.css`. I'm going to do a `git add`, and just add everything. Then I'm going to do a `git commit -m "Code cleanup"`.

This is going to run all of our pre-commit checks, and it'll run our tests and our linter. Everything passes. Now, we have our commit. I'm going to clear that, and then I'm going to do a `git push` to push this up to GitHub.

With that done, I'm going to go to GitHub. I'm going to look at my repo, and you'll see here that I have my most recent commit.

#### Github
![GitHub](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563598/transcript-images/git-create-a-new-project-by-cloning-the-boilerplate-project-github.png)

I want to create a new project based on this repository. I'm going to go to the clone or download link, and I'm going to grab this URL.

Then back in my terminal, I'm going to navigate out of this project. I'm just going to go up a level into my projects directory. I'm going to do a `git clone`, and I'm going to pass in this flag called `depth`. I'm going to set that to equal `1`.

#### Terminal
```
git clone --depth=1
```

That's just going to minimize the amount of git history that I have to `clone` with this repository. I'm going to paste in that URL that I copied from GitHub, and then I'm going to specify the folder that I want to put this in.

I'm going to start a new project with this. This'll be `my-awesome-new-app`.

#### Terminal
```
git clone depth=1 git@github.com:avanslaars/egghead-react-boilerplate.git my-awesome-new-app
```
I'm going to run this, and this is going to clone that project repository into this new `my-awesome-new-app` folder. With that done, I can `cd` into `my-awesome-new-app`.

If we do an `ls`, we'll see that it has all the things that this boilerplate project has, but now, it's been copied to a new directory. I want to open this up in Code. I'm just going to `code .` to open this in my editor.

Now, I have this new copy of my repository opened up in Visual Studio Code. Now, if I come in here, and I do a `git log`, we're only going to see one entry. This is what happened when I added that `depth` equals one flag to my `git clone`.

#### Git history entry
![Git history entry](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/git-create-a-new-project-by-cloning-the-boilerplate-project-git-log.png)

It's only going to pull down the most recent commit, so I don't have all 30 or so commits in this history. The reason I did that is because we're actually going to delete this repository's history from this copy of it, and we're going to initialize our own Git project here.

I'm just going to hit `Q` to get out of the log. I'm going to run an `ls` on this directory, and I'm going to pass the `-a` flag to show everything. We'll see this `.git` repository that we don't see in our file list. This is hidden.

This is where all of our Git information is stored. If I come in here, and I do a `git remote -v`, it'll show our original remote. All this information resides in that folder. We're going to remove that. We're going to do an `rm -rf .git`.

Now, we'll see that my prompt has changed, because I'm no longer in a Git repository. I can do a `git status`, and it'll tell me this is not a Git repository. I'm going to create a new Git repository in this directory just by running `git init`.

#### Everything is new
![Everything is new](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/git-create-a-new-project-by-cloning-the-boilerplate-project-everything-is-new.png)

Now, I have empty repository. We'll see that everything is new for this repository. If I do a `git status`, all of our files are untracked at this point. We can do a `git add`, and that'll add everything. If I do a `git status` one more time, now, these are all seen as new files.

Then I can do a `git commit -m`, and we'll say `initial commit`. If I `git status` one more time, we'll see that our working tree is clean. I can `git log`, and now, I have a new entry for new repository, with my single initial commit.

With this local repository in place, I'm going to create one on GitHub that I can push this up to. I'll go to GitHub, and I'm going to use the plus up here to create a new repository. I'm going to call this `my-awesome-new-app`.

#### New Repo
![New Repo](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/git-create-a-new-project-by-cloning-the-boilerplate-project-new-repo.png)

I'm going to leave everything as-is and create the repository. I need this `remote add origin` with my URL in it, so I'm going to copy that. Run that back in my terminal, so that'll add the remote. I can verify that with `git remote -v`.

Then I can push to master with `git push -u origin master`. Then I can reload my GitHub page, and verify that it shows up. There's all my starting code. Now, I can move the terminal out of the way, and I'm going to open up my `package.json` file.

We'll see that this still has the old project name. I'm going to update that to `my-awesome-new-project`. I'll save that.

#### package.json
```js
{
  "name": "my-awesome-new-project",
  ...
```

Then I'm going to scroll down, and we'll see that we have all this repository information. This is also left over from our original project.

I'm going to take this `repository` field, and I'm going to delete that. I'm going to do the same thing for `bugs` and `homepage`, because all three of those are pointing to the GitHub page for my old project. I'll save this, and then I'm going to go into the terminal.

#### package.json
```js
// REMOVED

"repository": {
  "type": "git",
  "url": "git+https://github.com/avanslaars/egghead-react-boilerplate.git"
},
...
"bugs": {
  "url": "https://github.com/avanslaars/egghead-react-boilerplate/issues"
},
"homepage": "https://github.com/avanslaars/egghead-react-boilerplate#readme",
```

I'm going to run `npm init -y`. We'll see that in the preview, we have updated fields for `bugs`, `homepage`, and `repository` that all use our new remote. If I close `package.json`, and open that again, we'll see the refreshed view of that, with our `repository`, `bugs`, and `homepage` appended to the end.

With all of that updated, I'm going to close out the `package.json` and clear my terminal. I'm going to come into my `readme.md`, and this is the only thing left over that we don't want. We'll update this to `My Awesome New App`.

We can save that, and then down in my terminal, the last thing we have to do is run an `npm i` to install of our dev and runtime dependencies for this project. With that done, we should be able to run any of the commands that we configured in our original project.

I can come in here, and I can do an `npm run dev`. That does a dev build, and loads up in the browser. Now, we have a working project. We can replace this hello world with our awesome new app.
