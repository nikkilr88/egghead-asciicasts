Instructor: [00:00] Let's say I want to create a backup of a file. I want the backup to retain the same name as the file but just append `.backup` on the end. I'll just go ahead and create a dummy file here. 

#### Terminal
```bash
$ touch index.js
```

If I wanted to create a backup of the file, I would do copy `index.js`.

[00:14] Instead of passing the file name there again, I can do braces -- that's why it's called a brace expansion as it uses braces -- and do comma and then `.backup`. 

```bash
$ cp index.js{,.backup}
```

Let's see how that works. Cool. That works just like we wanted.

```bash
$ ls
index.js    index.js.backup
```

[00:27] Another thing I can do with brace expansions is create several folders with the same structure. If I wanted to do a monorepo style setup, I could do packages and then I'll have my different package names here.

[00:41] Then I want each one to have a `src` folder in it. 

```bash
$ mkdir -p packages/{pkg1,pkg2,pkg3}/src
```

Let's do that and then see how that came out. Yeah, that's the folder structure I wanted.

![Folder Structure](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-and-copy-multiple-files-with-brace-expansions-in-bash-folder.png)

[00:51] Let's dive into a little bit how it works a bit more, so let's do a basic example. Let's do `echo` and do `pre`. I'm going to do `a,b,b` there and braces and then `post`. 

```bash
$ echo pre-{a,b,c}-post
pre-a-post pre-b-post pre-c-post
```

Brace expansions follow this kind of format. There's what's called a preamble which is the string that occurs before our braces, and then there's a postscript which occurs after it.

[01:14] This is a list of strings. We can see when we run it, it basically iterates through this list and then prepends or appends the preamble and the postscript as needed.

[01:25] Know that this also supports empty items in the list. 

```bash
$ echo pre-{,b,c}-post
pre--post pre-b-post pre-c-post
```

If we go back to our copy example, we'll just use `echo` instead. We had `index.js`, and then we had an empty element and `.backup`.

```bash
$ echo index.js{,.backup}
index.js index.js.backup
```

[01:42] If we `echo` that out, we can see that that's exactly the arguments that we need to pass to the copy command. Basically, when we run this with copy, the brace expansion gets interpreted, and these arguments gets passed to copy and then copied exactly as we need to, which just saves a lot of typing along the way.

[01:59] Another thing brace expansions can do is rearranges. For example, if I do `echo`, brace, `1`, two dots, and then `10`, it's going to interpret this as an integer sequence, and it fills in the missing numbers from that range.

```bash
$ echo {1..10}
1 2 3 4 5 6 7 8 9 10
```

[02:16] The same applies to letters. This can be useful for generating a lot of test files. For example, if I do `touch` and I do test through 10, let's list that out. What you see here is all my test files that I created.

![Test Files](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-and-copy-multiple-files-with-brace-expansions-in-bash-test-files.png)

[02:31] Note that this works because the touch command accepts multiple inputs. Not all commands do that, so you have to check the commands documentation before you can be sure something like this will work.
