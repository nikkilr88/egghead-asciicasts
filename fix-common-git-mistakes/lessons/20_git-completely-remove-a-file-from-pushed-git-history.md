Instructor: [00:00] We pushed a `.env` file with a secret here and we want to really scrub this from the git repo. There is one nuclear option that we could do, although you should still consider any secret you push to GitHub as lost or compromised and changed it.

[00:16] If we go to this [GitHub help article](https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository), it has this BFG repo cleaner, which will be able to delete files in the repo and all of the repo's history. Let's go to that [tool here](https://rtyley.github.io/bfg-repo-cleaner/) and see how to use this for out `.env` file.

[00:34] First, we have to download the JAR file and tell Chrome we want to keep it. We have to follow the instructions in the usage section. Let's do that. First, we're going to go up one directory, `cd ..`, and we're going to make a new directory and I'll call it `cleanup`, but you can call it whatever you like. I'll see the enter `cleanup`.

[00:56] Now, I need to git clone as a mirror my repository. 

#### Terminal
```bash
cd ..
mkdir cleanup
cd cleanup/
git clone --mirror {github clone link}
```

Let's go back to GitHub, back to my repository and get the URL for it. When I'm cloning as a mirror, what the BFG tool is going to do is delete the history locally and then when we push to GitHub, GitHub won't mirror our new re-written histories.

[01:19] Let's look at `ls` and we have just the `git Mistakes.git` Directory. 

```bash
ls
  git-mistakes.git
```

What we're going to do is look at the instructions and use the `--delete-files` command. Because it's a JAR file, we have to run it with `java -jar`. Let's do `java -jar` and mine went to the downloads directory under bfg.jar.

[01:45] I want to `--delete-files`, the files I want in my repository. I'm going to do --delete files. I want to delete the `.env` file in the `git Mistakes.git` Repository.

```bash
java -jar ~/Downloads/bfg-1.13.0.jar --delete-files .env git-mistakes.git/
```

We can see that it did that and now the instructions. The files are deleted, but now I need to strip that file from the history.

[02:08] I'm going to copy this exact command, `cd some-big-repo.git`. First, we're going to cd into the repository. Then we're going to use `reflog` to do a garbage collection of all the history of that file. I'm going to look and see into git mistakes and I'm going to copy and paste that line and it send it's done cleaning the objects.

```bash
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push
```

[02:28] Now I can do a `git push`. What happened is the BFG rewrote the history locally and then we're pushing it up to GitHub. It doesn't work on the pull request here, but that's OK because our environment was in master.

[02:42] If we look at GitHub now, we can go to `git-mistakes` and if we look at the commit history, here's where it says we added the ENV file. If we look at the files in that commit, we can see that is showing zero changes with zero additions or deletions.

[03:00] We've successfully removed this file completely from GitHub. Again, if you have secrets in that file, consider them compromised at this point, but this is how we can actually `cleanup` GitHub history.
