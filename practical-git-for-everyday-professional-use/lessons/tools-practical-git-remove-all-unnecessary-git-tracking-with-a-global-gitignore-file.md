If we know that every gitrepo on a machine is going to need to ignore a specific file or folder type, we can create a global `.gitignore`. To do this, let's first change directories to where we store our doc files, which in this case will be my user root, `cd ~`.

Next, let's create a .`gitignore_global` file. The name of this file is up to you. This is the convention that GitHub suggests. Let's open this file in our code editor and we can add any file or folder patterns that we would like to ignore in all of our gitrepos. Let's add `.DS_Store`, 

#### .gitignore_global
```
.DS_Store
```

save and close this file and return to our command line.

We can run `git config -- global core.excludesfile`. The path of where we've placed our global gitignore file, `git config -- global core.excludesfile ~/.gitignore_global`. When we create new gitrepos, and files or folders that match our patterns in our gitignore are created, Git can ignore them from anywhere on our system.