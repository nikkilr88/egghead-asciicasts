The move command, or `mv` command, allows us to move files and folders. In my folder here, I have a JS file (`index.js`), and then I have a `src` folder. The src folder is empty.

Let's say I want to move my `index.js` into the `src` folder. I just pass the target of the move, and then the destination. You have to pass the complete file name to the destination.

#### Terminal
```bash
$ mv index.js src/index.js
```

I could rename the file if I wanted here, so I do that. You see I just have a `src` folder in the root, and if I list out `src`, the `index.js` is in there now.

```bash
$ ls src/
index.js
```

For example, if you just wanted to rename a file, let's create a file here,
`touch a.js` and then let's say I want to make `a.js` `b.js`. I just move it to the same folder, and just pass a different file name here as the second parameter.

```bash
$ mv a.js b.js
```

So I do that, then I have my `b.js` there. 

```bash
$ ls
b.js src
```

In this folder, I have the `src` directory. Let's say I wanted to rename that to `lib`. I could do that just like this. That renames the folder.

```bash
$ mv src/ lib
$ ls
b.js lib
$ ls lib/
index.js
```

Let's say I now wanted to move everything in `lib` into `src`. I'll recreate a `src` folder here `$ mkdir src`, and we're going to do move lib and we'll do the asterisk so that it grabs all files and folders under this `lib` folder, and then I do `src`, like that. 

```bash
$ mv lib/* src/
```

Let's list out lib. 

```bash
$ ls lib/
```

We see it's empty now, and then the `index.js` is now in `src`, like we want.

```bash
$ ls src/
index.js
```
To copy a file, we use the copy, or `cp` command. Let's set up a file here, create a `readme.md` file. Let's copy that and put a copy in the source folder.

```bash
$ echo "hello" > README.md
$ cp README.md src/README.md
```

When we do this, we can rename it if we want. I want to keep the same name, but you do have to type out.  Like with move, you have to type out the file name again.

So we do that, we can see we still have a `readme.md` here in the root. 

```bash
$ ls
README.md       b.js        lib     src
```

If we list it out, we see it there, and it should have the same contents. 

```bash
$ ls src/
README.md   index.js
$ cat src/README.md
hello
```

It does, because we just had the hello in there.

If we want to copy an entire folder and all of its sub-folders from one to another, we use the `cp` command. We pass the `-R` flag, which standards for recursive.

If I want to move everything in the `src` folder, such as `src/*`, a wild card to mean everything, and then let's copy everything from the `src` folder to the `lib` folder.

We do that. We should see it has those two files which are the same as are in the `src` folder.

```bash
$ cp -R src/* lib/
$ ls lib/
README.md       index.js
$ ls src/
README.md       index.js
```
