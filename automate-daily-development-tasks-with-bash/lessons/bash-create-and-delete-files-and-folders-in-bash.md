To create a file in Bash, we use the `touch` command and we pass the file name. I'll call mine `file.txt`. 

#### Terminal
```bash
$ touch file.txt
```

If we list this directory out, we can see it has the file.txt in there. 

```bash
$ ls
file.txt
```

At this point, the `file.txt` is going to be empty though, it initializes an empty file. Let's see how we would add content to it. For that, we'll use the `echo` command. `echo` is sort of like the console.log of Bash. If I do `echo hi` it logs out my string there.

```bash
$ echo 'hi'
hi
```

If we do `echo hi` and we use the right angle bracket operator, that will direct my string into the `file.txt`. 

```bash
$ echo 'hi' > file.txt
```

If we `cat file.txt` now, we see it has `hi` for its file of contents. 

```bash
$ cat file.txt
hi
```

If we do that again, and let's change the string to `hi again` and run that we'll `cat` it again. 

```bash
$ echo 'hi again' > file.txt
cat file.txt
hi again
```

We can see it has `hi again`. If we do it multiple times it will overwrite the existing file contents in there.

If we want to append to the file, let's append `hello world` to it. We just used two of those brackets and that will append it to the very end of the file. 

```bash
$ echo 'hello world' >> file.txt
cat file.txt
hi again
hello world
```

Also while `touch` is a common way to initially create a file, you can actually just use plain `echo`. If we want to create a file and then initialize contents to it immediately, we can just do `echo hello` and let's name a file here, we'll just call it `file2.txt`. Then if we `cat` that out, we can see that it both created our file and initialized it with the string that we passed to echo.

```bash
$ echo 'hello' > file2.txt
$ cat file2.txt
hello
```

To make a directory in Bash, we'll use the `mkdir` command. We just pass the directory name that we want. I'll call mine `folder`. 

```bash
$ mkdir folder
```

Let's list it out. 

```bash
$ ls
file.txt    file2.txt       folder
```

We can see we have our two text files and our folder there now. Let's say I want to create several nested folders all at the same time, like I want to do `mkdir a/b/c` We try that, it's not going to let us. 

`mkdir` by default wants a complete file path to the very end. It wants these `a` and `b` directories to exist before it will create a `c` directory in them.

What we can do is if we pass the `-p` flag, it will create each of those intermediary directories as needed. If I do `a/b/c` now, that will create all the folders we need. 

```bash
$ mkdir -p a/b/c
```

Here's the `a` folder. 

```bash
$ ls
a   file.txt    file2.txt   folder
```

I list out `a/b` like that. Then there's our `c` folder. 

```bash
$ ls a/b/
c
```

To remove a file we use the `rm` command. Let's get rid of our `file.txt`. We list it out and we see it's gone.

```bash
$ rm file.txt
$ ls
a       file2.txt    folder
```

Note that the `rm` command permanently deletes a file. It doesn't move it to the trash or anything. If we want to remove a folder, we can't just use plain `rm`. 

`rm` by default only removes files. If we pass the `-r` flag that will tell it to recursively remove the folder and everything in it.

```bash
$ rm -r folder/
$ ls
a       file2.txt
```

Oftentimes, you'll see `rm` used with the `-r` flag and the `-f` flag. The `-f` flag is a sort of a nuclear option. It prevents Bash from prompting you for confirmation when you remove a file, as well as erroring out if a file or directory doesn't exist. If we do that on `a`, that will remove that folder and all of its contents, as well.

```bash
$ rm -rf a
$ ls
file2.txt
