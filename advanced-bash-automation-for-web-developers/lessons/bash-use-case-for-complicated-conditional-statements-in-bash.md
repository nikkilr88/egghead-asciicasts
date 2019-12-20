Instructor: [00:00] To create a switch statement in Bash, we use the `case` statement. I'm going to create a switch statement here on the first positional parameter that's passed to the script. We do case in. On the following lines, we'll enumerate the cases that we match against.

#### case.sh
```bash   
case "$1" in
```

[00:14] Then we close the `case` statement with case spelled backwards, just like an `if` statement. 

```bash   
case "$1" in

esac
```

Here, we match against this value. I'm just going to do the string `a`. I follow that by a parenthesis there. Then right here, I execute the code if this `case` is true.

[00:32] I'll just say `echo "a matched"`. Then I do a double semicolon. 

```bash   
case "$1" in
  a) echo "a matched";;
esac
```

Then I'll do `b` here, `echo "b matched"`. That's the syntax for `case`. Also note that this can be on multiple lines. 

```bash   
case "$1" in
  a) echo "a matched";;
  b) echo "b matched";;
  c) 
    echo "c matched"
  ;;
esac
```

Let's jump to a terminal and try this out here.

[00:53] Let's do case, and I'll do `a`. 

#### Terminal
```bash
$ ./case.sh a
a matched
```

That's matching. There's `b`. Let's do `c`. What if we do one that we didn't do? We'll do `d`. We can see that there is no matching case for the d, so just nothing happened. 

```bash
$ ./case.sh a
a matched
$ ./case.sh b
b matched
$ ./case.sh c
c matched
$ ./case.sh d
$
```

Let's do something a little bit more practical.

[01:10] Let's write a script that extracts a file archive, depending on the file extension. Let's clear these cases. We'll make it so that the first file passed to the script is what we match against. One thing that's different about Bash, compared to other programming languages, is that the `case` statement supports pattern matching.

[01:30] It doesn't support full regexes, but it does support Bash's glob-like syntax for pattern matching. We'll see how that works here. We'll do `*.tar` or, and we'll do `*.tgz`. Wildcard here will match anything that ends with this file extension.

#### case.sh
```bash
case "$1" in
  *.tar|*.tgz
esac
```

[01:49] Then the pipe here is an or, just like in regex. In here, we'll say `tar`, and then pass our file name. If you want to read up on this command and the flags, look at the man pages for `tar`. Then next, we'll do gzip. That's `.gz`. We'll unzip, and we'll do `.zip` here.

```bash
case "$1" in
  *.tar|*.tgz) tar -xzvf "$1";;
  *.gz) gunzip -k "$1";;
  *.zip) unzip -v "$1";;
esac
```

[02:10] Then for our last one here, I'm just going to do a wildcard. What this is going to do is that if none of these match, basically then it'll enter this case. In here, I'll just throw an error, just say  Cannot extract one. Then I'll exit with an error status.

```bash
case "$1" in
  *.tar|*.tgz) tar -xzvf "$1";;
  *.gz) gunzip -k "$1";;
  *.zip) unzip -v "$1";;
  *)
    echo "Cannot extract $1"
    exit 1
  ;;
esac
```

[02:28] Let's save that and try it out. We can see here, I've already set up several of these archive file types for us to test. Let's just try it out. We'll run case, and we'll do the tar. It worked. I just had a photos folder in there, so it extracted those.

![Tar](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-use-case-for-complicated-conditional-statements-in-bash-tar.png)

[02:46] Let's jump up, and we'll try the `archive.zip`. 

Cool, that looks like that worked. Let's test our fail case. I'm actually just going to pass our script file in again, because that should fail. OK, cool. I'm seeing the error message. Then let's check the exit status, which is one.
