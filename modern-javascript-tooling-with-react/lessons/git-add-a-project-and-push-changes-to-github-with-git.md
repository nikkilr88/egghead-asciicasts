Right now, this project is configured as a Git repository locally. I'd like to also be able to push it up to GitHub. I'm going to go to [http://github.com](http://github.com) and log in.

Once logged in, I'm going to use this plus sign in the top-right corner to choose New repository. 

![Github Plus](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/git-add-a-project-and-push-changes-to-github-with-git-plus-sign.png)

It's going to bring me to a form where I can choose my `owner` and give it a `repository name`. In my case, I'm going to call it `egghead-react-boilerplate`. Then I'm going to give it a `description`.

This is going to be the output for this Modern Tooling with JavaScript course. I'm going to make it Public. I'm going to leave all this as the defaults. I'm going to click the green Create repository button at the bottom. 

![Create Repo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/git-add-a-project-and-push-changes-to-github-with-git-repo-creation.png)

Then I'm going to get this page. I'm going to get some setup instructions, depending on my scenario.

![Setup  Instructions](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/git-add-a-project-and-push-changes-to-github-with-git-setup.png)

Since we've already created a local repository, we're going to scroll down to the `Push an existing repository from the command line option`. I could use this clipboard icon over here to copy both of these commands, but we're going to take these one step at a time.

Let's start by copying the first line, the `git remote add origin` and then our address. I'll copy that. Then I'm going to come back into the terminal. I'm going to start, and I'm going to type `git remote -v`. This is going to show us a list of our remote repos, places that we can push this local repository to be online. We'll see that it returns no results.

Let's paste that code that we copied from GitHub. I'll press Enter. 

#### terminal
```javascript
git remote add origin git@github.com:avanslaars/egghead-react-boilderplate.git
```

Then I'm going to run `git remote -v` a second time. Now we'll see that we have two entries. We have one for fetch and one for push. Both are named `origin`. Both are using that GitHub address.

![git -v](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/git-add-a-project-and-push-changes-to-github-with-git-v.png)
With our remote in place, let's go back to the GitHub page. 

Let's take this second line. This is going to allow us to push our master branch up to that origin remote. I'll copy that. I'll come back here, paste. We'll see that it's pushed our branch from our local master to our remote master.

```javascript
git push -u origin master
```

Let's go back to GitHub, and let's refresh the page. Now we'll see that it has our `name` and `description`. It's showing our `package.json` and our initial commit.

![Refresh](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/git-add-a-project-and-push-changes-to-github-with-git-refresh.png)

We'll see this little message here. It says, `Help people interested in this repository understand your project by adding a README.` We have a green button where we can add it directly on GitHub, but instead let's go back to our project and add a `README` there.

I'm going to reveal my files here. I'm going to add a new file. I'll call it `readme.md`, because this is a Markdown file. Then we're going to add a title. We'll say `React Boilerplate`. We can add more details later. We'll save that.

#### readme.md
````markdown
# React Boilerplate
````
Then I'm going to go back into the terminal. I'm going to run `git status`. We'll see that we have an untracked file because we created this `readme.md`, but we haven't added it to Git yet. We can do that by running a `git add readme.md`.

If we get status again, we'll see that we have a new change that's ready to be committed. It's staged, but it hasn't been committed yet. We'll commit with `git commit -m`. We'll give it a descriptive summary. We'll say, `Added a readme.` That's been added.

We can get status again. We'll see that there's a message here. It says, `Your branch is ahead of 'origin/master' by 1 commit.` We've made a local commit. We haven't pushed it up yet. We can push that by running `git push`. We'll see that it's pushed our master update to our remote master.

If we go back to GitHub and we refresh the page, we'll see now there's a `readme.md` in our file list. It's going to show us this `readme.md` as the default contents of this repository's page on GitHub.

![Readme](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/git-add-a-project-and-push-changes-to-github-with-git-readme.png)

Now we have GitHub set up as our remote for our repository. Let's go back to our code. In the terminal, I'm actually going to run a second `npm init`. I'm going to pass it the `-y` flag and let it do its default thing this time.

We're going to see that we're going to get this preview. We'll see that our `name` is the same. The `version` is what we specified originally when we created this. `Description`, `main` scripts, all that has stayed the same, but now we have these `repository` `bugs` and `homepage` fields.

This has all been added because `npm` was able to see our local `.git` directory, which is hidden from view on our file list, and pull out our remote repository information. It's defaulted the `bug` `url` to GitHub issues, the `homepage` to the `readme`. Our `repository` information knows it's a Git repository. It gives it the `url`.

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
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/avanslaars/egghead-react-boilerplate.git"
  },
  "keywords": [],
  "bugs": {
    "url": "https://github.com/avanslaars/egghead-react-boilerplate/issues"
  },
  "homepage": "https://github.com/avanslaars/egghead-react-boilerplate#readme"
}
```

With that done, if I run `git status`, we're going to see that we've modified our `package.json`. It needs to be committed. I'm going to add that to be committed. I'm going to do a commit with `git commit -m`. Then we'll say that "I updated the package.json".

If I run a status after that, we'll see that our local branch is ahead by 1 commit. We can push that up. If I check the status again, everything is good. If I refresh GitHub, we'll see that it has that latest updated `package.json` commit applied to it.
