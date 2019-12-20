Instructor: [0:00] Let's start a new git project by going to New on [GitHub](https://github.com/new) and entering a repository name of 'git_mistakes'. I'll make that public and initialize it with a README.

[0:14] Once it's created, I can find the clone link and in a terminal I will `git clone` that repository. Then I can `cd` into it. I'm going to `touch index.html`, which'll be the first file that we make. In a text editor, we can open that folder.

#### Terminal
```bash
git clone {your-repository}
cd git_mistakes
touch index.html
```

[0:35] In our `index.html` file, let's paste in some HTML. 

#### index.html
```html
<html>
  <head>
  </head>
  <body>

    <h1>Fixing git mistakes</h1>
  
  </body>
</html>
```

Now we want to add this to a commit. First, let's do a `git status` to see that we have `index.html` that is not tracked yet. It's untracked. We can `add index.html`. Now if we do a `git status`, we have it as changes to be committed.

#### Terminal
```bash
git status
git add index.html
git status
```

[0:56] This is what we call staged or in the index. We can commit that with `git commit -m`. We'll say `Adding index.html to gitmistokes`.

```bash
git commit -m 'Adding index.html to git-mistakes'
```

[1:08] As soon as I type that, I realize that I said mistokes instead of mistakes, so I want to change that commit message. Since I haven't pushed this yet, I can just say `git commit --ammend`. Now I can say that I want to give it a new message of `Adding index.html to git-mistakes`.

```bash
git commit -m 'Adding index.html to git-mistakes'
```

[1:30] If I do a `git log --oneline`, I can see I have my initial commit that GitHub made when it made the project, and then I have my adding index.html to git mistakes. It actually rewrote the commit message that had a typo in it.
