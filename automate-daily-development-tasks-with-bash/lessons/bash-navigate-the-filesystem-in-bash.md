To start, let's open the terminal application. This is how we interact with Bash on macOS.

When you first open Bash, you're started in your user's home directory. You can tell where you are in Bash by looking at before the prompts here. 

#### Terminal
```bash
cnokes-ml:~ cameronnokes$
```

We see we have this tilde `~` character. The tilde is a special character that represents your user's current home directory.


To see what that is, we can run the `pwd` commands, which stands for print working directory. That'll print out an absolute file path of our current working directory. 

```bash
cnokes-ml:~ cameronnokes$ pwd
/Users/cameronnokes
```

If we want to change the current working directory, you can run `cd`, which stands for change directory.

I'm going to go to `Repos/egghead-bash/`. As I type the file path, you can hit the tab key, and it'll autocomplete for you. 

We `cd` there, and we can see that this portion before the Bash prompt changed to represent that directory.

```bash
cnokes-ml:~ cameronnokes$ cd Repos/egghead-bash/
cnokes-ml:egghead-bash cameronnokes$
```

Now that we're here, let's see what other files and folders we have in this directory. To do that, I'll run the `ls` command. `ls` stands for list. You can see we have one folder here called sandbox.

```bash
cnokes-ml:egghead-bash cameronnokes$ ls
sandbox
```

Let's `cd` into `sandbox`. 

```bash
cnokes-ml:egghead-bash cameronnokes$ cd sandbox/
```

Let's run the `ls` again in here. 

```bash
cnokes-ml:sandbox cameronnokes$ ls
index.html      index.js
```

I have two files, `index.html` and `index.js`. 

Plain list, doesn't give us a lot of information. One thing we can do is we can pass a flag to `ls`, the long flag `-l`, that'll give us a long listing, which gives us more information, such as this little dash `-` tells us that it's a file.

```javascript
cnokes-ml:sandbox cameronnokes$ ls -l
-rw-r--r-- 1 cameronnokes staff 0 Feb 19 20:23 index.html
-rw-r--r-- 1 cameronnokes staff 21 Feb 19 20:23 index.js
```

This tells us the user (cameronnokes) and group (staff) that owns the file. This tells us when it was created or last modified (Feb 19 20:23), and then here's the filename (index.html).

I also have a Git repository initialized at this folder. Whenever you have a Git repository, there is a hidden `.git` folder. To see hidden files and folders, we can pass the `-a` flag. I'll pass that along with the long listing flag.

```javascript
cnokes-ml:sandbox cameronnokes$ ls -la
drwxr-xr-x 5 cameronnokes staff 160 Feb 19 20:36 .
drwxr-xr-x 3 cameronnokes staff 96 Feb 19 20:36 ..
drwxr-xr-x 9 cameronnokes staff 288 Feb 19 20:36 .git
-rw-r--r-- 1 cameronnokes staff 0 Feb 19 20:23 index.html
-rw-r--r-- 1 cameronnokes staff 21 Feb 19 20:23 index.js
```

When we do that, we can see now here is the `.git folder`. We can see it's a folder or directory, because it has the `d` there. We also see these two folders. There's the `..` and the `.`. What are those?

The `.` stands for the current working directory, and the `..` stands for the parent directory of the current folder that you're in. These are special folders that the operating system and the filesystem sets up.

If we `cd` into the `..`, we'll go up a directory

```javascript
cnokes-ml:sandbox cameronnokes$ cd ..
cnokes-ml:egghead-bash cameronnokes$
```

And you can see we're in `egghead.bash` now. If we `cd` back to `sandbox`, we're back there.

```javascript
cnokes-ml:egghead-bash cameronnokes$ cd sandbox/
cnokes-ml:sandbox cameronnokes$
```