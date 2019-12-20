Instructor: [00:00] The most basic form of shell parameter expansion can be used to expand variables. I run `echo ${HOME}`. 

#### Terminal
```bash
$ echo ${HOME}
/Users/cameronnokes
```
That expands to just the `HOME` variable. Of course, in most scenarios, it's easier just to do this, just `echo $HOME`.

[00:15] In case you need to output text without any spaces after the variable, shell parameter expansion can be useful. For example, if I wanted to `echo` the current username, underscore, and then I'm going to do the current year.

[00:31] I do with the `date` commands like that. 

```bash
$ echo $USER_$(date '+%Y')
2018
```

We can see it just echoes the year, but where is my user? The problem is that Bash is looking for a variable named `USER_`, which doesn't exist. If we use shell parameter expansion, we can do the `USER` in there, underscore, and then this date, and it works.

```bash
$ echo ${USER}_$(date '+%Y')
cameronnokes_2018
```

[00:52] That occasionally has its uses. Another thing we can do with shell parameter expansions is use a variable, and if it doesn't exist, fall back to a `default`. For example, I'll set up my shell parameter expansion here, and then I'll pass the variable name.

[01:07] Then a `:-`, and then the `default` value here. 

```bash
$ echo ${str:-'default'}
default
```

This is expanded just to `default`, because there is no string variable. That doesn't exist. It's not set, so it echoes out def`ault. If I were to replace that with a variable that does exist, then that's used instead.

```bash
$ echo ${USER:-'default'}
cmaeronnokes
```
[01:26] This can be particularly useful in a script. Let's see how that would work. I'm going to create a small script I'll call `count-files.sh`. What this'll do is count the number of files in a directory. The first parameter that we pass to this script will be the directory.

[01:43] I'll do `dir` equals the first position parameter to this. Then the command here is going to be `find` in dir. 

#### count-files.sh
```bash
dir=$1
find "$dir"
```

The `type` is file, and `maxdepth` is `1`. Then I'll pipe that output to the word count command, and tell it to count the lines.

```bash
dir=$1
find "$dir" -type f -maxdepth 1 | wc -l
```

[02:01] This would work if the user of the script always passed this first parameter to it, but if we wanted to say that by default, it'll just find in the current directory, we can use shell parameter expansion here. By default, we'll say use the current working directory.

```bash
dir=${1:-$PWD}
find "$dir" -type f -maxdepth 1 | wc -l
```

[02:20] Let's save that. We'll give it execute permissions. If we run it in our current directory, we can see we create a number of files in here. We have `14`. 

#### Terminal
```bash
$ chmod +x count-files.sh
$ ./count-files.sh
    14
```

We can see, I didn't pass a parameter to it, and it just defaulted to using the current working directory.

[02:36] Now, let's try passing something. We'll pass the `packages` folder that we created, and there's no files in there.

```bash
$ ./count-files.sh packages/
    0
```