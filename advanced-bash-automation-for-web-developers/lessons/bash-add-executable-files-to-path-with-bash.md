Instructor: [00:00] `$PATH` is an environment variable that is a list of directories Bash looks in for executable files. If I do `echo $PATH`, I can see that list, and so here's a folder and then this is delimited by colons, and there's another folder.

![Echo $PATH](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-add-executable-files-to-path-with-bash-echo.png)

[00:16] If we run `which grep`, for example, tells us that the grep commands executable file is located in the `/usr/bin` folder which we can see is up here. 

#### Terminal
```bash
$ which grep
/usr/bin/grep
```

All the commands that are available on Bash have to be in one of these folders in your path to work.

[00:30] Let's say that I've written a script that I want to make usable everywhere I am in Bash. Instead of, for example, putting it in my home directory and always executing it via an absolute path, I can put the folder my script is in in my path which will allow me to execute it like any other Bash commands.

[00:45] There are two common ways to do this on Mac OS and Linux. The first way to do this is by modifying our `$PATH` environment variable in `bash_profile`. If I open `bash_profile` in my code editor, so I'm going to `export PATH`, and I'm going to reference the `$PATH`'s variable again, because I don't want to overwrite it or anything.

#### .bash_profile
```javascript
export PATH="$PATH"
```

[01:05] I basically want to take everything that's already in my path and just appends to the very end of it. We'll do a colon. I'm going to put my folder that says my home directory, and I'm going to create a folder called `my-scripts` here. The executable that I ultimately want in my path will live in the `my-scripts` folder.

```bash
export PATH="$PATH~/my-scripts"
```

[01:22] Note, that we're using `export` here because we want the changes to our `PATH` variable to be visible, and be in effect for all sub-shells of our current shell. For example, if we invoke the script that then invokes another script that creates a new process every time.

[01:36] I wouldn't want the changes in our paths to be visible to all those child processes. This is sort of just a best practice thing. OK, so lets save that, let's jump back to the terminal, so let's do `mkdir -p my-scripts`. And then I'm going to `echo` a really basic script into it. I'm going to call it `hello`

#### Terminal
```bash
$ mkdir -p my-scripts
$ echo 'echo hello' > my-scripts/hello
```

[01:57] Notice, I don't have a `.sh` extension or anything, just because the file name is going to be the name of the command that's executed, and I want the command to be called just `hello` with no extension. Then we're going to add executable permissions to it with the change of mode (`chmod`) `+x` commands.

```bash
$ chmod +x my-scripts/hello
```

[02:16] Now we just see the `source .bash_profile` again, and then if we run `hello` we can see that that works. 

![Hello](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-add-executable-files-to-path-with-bash-hello.png)

We `echo $PATH`, we can see right here at the end this is the `my-scripts` folder that I added. 

![my-scripts](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-add-executable-files-to-path-with-bash-myscripts.png)

Awesome. That's working. Another way to add an executable to `$PATH` is by `symlink`ing an executable file into an existing folder that is always in `$PATH`.

[02:37] Let's see how we do that. Let's create a second script. I'm going to call mine `hello2`. That's in my home directory. It's not in my path, and I'll give that executable permissions.

#### Terminal
```bash
$ echo 'echo heelo2' > hello2
$ pwd
/Users/cameronnokes
$ chmod +x hello2
```

[02:56] Now what we're going to do is we're going to `symlink` this into our `usr/local/bin`. If you remember here in `$PATH`, our `usr/local/bin`. Here's our first one. That's a good spot for executables for our user. I'm going to run a link commands which is `ln`.

[03:08] I'm going to pass the `s` flag which tells us to create symbolic link. A `symlink` or symbolical link is basically a special file that points to the location of a different file. It doesn't really have any contents of its own. It's just a pointer to another file on your hard drive.

[03:23] This is the target. This is what's going to be symlinked, and note that I have to have an absolute path here or it's not going to work. Then I'm going to put that in `usr/local/bin`. 

```bash
$ ln -s ~/hello2 /usr/local/bin
```
OK, so we run and that's it. That will work off the bat without any kind of sourcing Bash profile.

```bash
$ hello2
hello2
```
