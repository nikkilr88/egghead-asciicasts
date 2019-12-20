Instructor: [00:00] We can actually verify the file descriptors for `stdin`, `stdout`, and `stderr`. We'll list out our OS's device folder, `dev` stands for device. 

Then we'll `grep`. 

![Dev Folder](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-understand-how-to-redirect-stdin-stdout-and-stderr-in-bash-dev-folder.png)

You see here `stdin` is pointing to file descriptor zero (`fd/0`). Standard out, file descriptor one (`fd/1`), standard error pointing to file descriptor two (`fd/2`).

[00:19] All bash commands will output their data to two streams. Standard out and standard error. To redirect standard out we use the right angle bracket. To redirects our list here. We do that. 

#### Terminal
```bash
$ ls > ls.txt
```

Then if we `cat ls.txt` we can see here's the one file I had in this folder. Then `ls.txt`, it didn't exist before and it was created on the fly before this `ls` occurs. It shows up here.

```bash
$ ls > ls.txt
$ cat ls.txt
index.js
ls.txt
```

[00:49] This works just the same if we do `ls 1> ls.txt`. Now we're explicitly referencing standard out here. We do the same thing, we get the same output. 

You can think of this as a short hand for this. You can see here we're redirecting standard out to file instead of letting it show up in our terminal, which is the default standard out.

[01:11] If we run `ls` on a directory that doesn't exist, which throws an error, we'll see what happens. We'll do `ls noexist` and then as a redirect standard out to `ls.txt`. 

```bash
$ ls noexist > ls.txt
ls: noexist: No such file or directory
```

We see that this is standard error here and this is not redirected because we wouldn't expect to see this on our terminal if it was being sent to this file.

[01:31] How do we redirect standard error? Let's do `ls noexist`. We'll do file descriptor two and send that to `ls-errs.txt`. 

```bash
$ ls noexist 2> ls-errs.txt
```

Note here we're only redirecting a standard error. This is throwing an error. We `cat` this out. You see that it works. Here's a normal error message and it's being captured in this file now.

```bash
$ ls noexist 2> ls-errs.txt
$ cat ls-errs.txt
ls: noexist: No such file or directory
```

[01:56] If we did this on just general directory, we would see it here because we're not redirecting standard out two. 

```bash
$ ls noexist 2> ls-errs.txt
$ cat ls-errs.txt
ls: noexist: No such file or directory
$ ls 2> ls-errs.txt
index.js ls-errs.txt ls.txt
```

How do we redirect both the standard error and standard out to the same file, which is a common use case?

[02:14] Let's do `ls noexist` again and we'll redirect standard out to `ls.txt`. We'll do file descriptor two. Then ampersand file descriptor one. 

```bash
$ ls noexist > ls.txt 2>&1
```

The ampersand here is going to tell bash that this redirection is not going to a file, it's going to a file descriptor. Let's run that. 

Now if we `cat ls.txt` we can see that's where our standard error went. 

```bash
$ cat ls.txt
ls: noexist: No such file or directory
```

Then if we change it to not have an error and we `cat` that again, we see there's our normal standard output.

```bash
$ ls > ls.txt 2>&1
$ cat ls.txt
index.js
ls-errs.txt
ls.txt
```

[02:50] How do we redirect standard in? For example, instead of doing `cat` and passing a file, I can redirect standard in with the left angle bracket and I'll send `ls.txt` to it. 

```bash
$ cat < ls.txt
index.js
ls-errs.txt
ls.txt
```
We can see that it works just the same. I haven't found a lot of use cases for redirecting standard in because most bash commands accept both text or files as an input, but there you have it.
