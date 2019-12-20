Instructor: [0:00] I have a project with one HTML file and if I do git log oneline here, we can see that HTML file was added in this commit. Let's say I want to add a couple more files to that same commit. We can `touch app.js` for example and open that up. Inside of here, this will be `our app js code`.

#### Terminal
```bash
touch app.js
```

#### app.js
```js
// our app js code
```

[0:20] To see that, we need to add it in the head in our html file, so we can type `script`, `type="text.javascript"`. The actual files we're making here don't matter so much, but for our project, we want to have at least two files.

#### index.html
```html
<html>
  <head>
  <script type="text.javascript" src="app.js"></script>
  </head>
  <body>

    <h1>Fixing git mistakes</h1>
  
  </body>
</html>
```

[0:36] Now we have the `script` tag added to our HTML. If we do a `git status` here, we can see that we have one untracked file. That's our new `app.js` file and one modified file, that's `index.html`. We want to add those to the same commit. If we do `git log` again, we only want one commit here.

#### Terminal
```bash
git status
git log
```

[0:56] What we can do is actually add this to the stage, so we can do `git add -A` for add all. Now if we do a `git status`, we have changes to be committed and we can use `git commit`.

```bash
git add -A
git status
```

[1:10] If we want to add them to that same commit, this commit, then we can do `--amend` and we can change the git message by saying `'Adding index.html and app.js`. 

```bash
git commit --amend -m "Adding index.html and app.js"
```

Now if we do a `git status`, we have no changes to be committed. If we do a `git log oneline`, all of those files were added to the same commit and it re-wrote the commit message.
