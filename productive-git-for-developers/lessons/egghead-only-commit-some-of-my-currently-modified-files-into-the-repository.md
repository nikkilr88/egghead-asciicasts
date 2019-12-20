Instructor: [00:00] I'm having here some sample project, which in this case is an Angular project. It doesn't matter, because what we would like to look now at is how we can commit single files into our Git repository. I've made a couple of changes.

[00:13] I've worked quite for a while, so I have changed here, for instance, in the app component. I've changed some HTML and some title here. Then, I've also added some files, some new packages to my application which then change here to package JSON, to package log file, and some other kind of files in my repository such as the index HTML.

[00:31] If you jump over to our terminal and do a `git status`, we see all of these files that have been changed. Actually, I don't want to commit them all at once with a single commit message because there are different things I did here in this modifications.
#### Terminal 
```
git status
```
![Using the git status command](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272142/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-git-status.jpg)

[00:45] What I would like to commit is these two files, because I've actually changed some behavior of the app like changing the title.

![Files we want to commit together](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-files-we-want-to-commit.jpg)

 The other files, I would like to actually commit separately, because in those commits, I've actually added the new package to my application.

[01:00] Let's create the first commit. I can do a `git add` to add our files to the staging areas such that they can then be committed into our repository. Let's use the `src/app/app.component.html` as well as the `src/app/app.component.ts file`.

```
git add src/app/app.component.html src/app/app.component.ts file
```
![Using git add to commit our two files](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270532/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-using-git-add.jpg)

[01:17] I can commit these files individually by simply appending one path after the other two to get at command. I could also use wildcard. I could do the `app.component*`, which would then commit basically both the HTML and the TS part.
```
git add src/app/app.component*
```
 Now, you can see these two are ready. They are in the staging area for my git repository.
 ![Our two files are ready to be committed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270533/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-files-ready.jpg)

  I could simply do a `git commit -m` and say `feat`, `change to title of the app`.

```
git commit -m 'feat: change to title of the app'
```
![Using git commit to commit our two files](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270532/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-git-commit.jpg)

[01:46] Let's do another `git status`.
```
git status
```
 Now we see those two fonts have been committed. We just have the remaining ones here in our repository left.
 
![Files left for us to commit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-files-left-to-commit.jpg)

  Again, we could now selectively pick some of these files or rather do a `git add .` for all of them, because they all belong to the same operation and do a `git commit -m 'install @angular/ material`.

```
git add

git commit -m 'install @angular/ material
```
![Adding the rest of our files](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270533/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-committing-all-our-files.jpg)

[02:13] If you now do a `git status`, we see we have a clean history.

```
git status
```
![git status showing us nothing to commit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270533/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-nothing-to-commit.jpg)

 Let's take a look at our log. We can now see we have a log for installation of Angular material and a log for the new feature of our app where we changed actually the title.

 ```
git log
 ```
 ![Using git log to look at our history](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/only-commit-some-of-my-currently-modified-files-into-the-repository-using-git-log.jpg)
