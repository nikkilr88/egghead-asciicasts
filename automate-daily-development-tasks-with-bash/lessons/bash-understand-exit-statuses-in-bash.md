In bash, every script, command, or function that runs will return an exit status. To see what that means. If we run `ls`, you can see I am in a directory here, which is just one file. 

#### Terminal
```html
$ ls
script.sh
```
To check the exit status of a command, we use the special question `?` mark variable that bash sets for us.

```html
$ echo $?
0
```

Our `ls` ran successfully, so returned a `0`. An exit status is an integer between `0` and `255`. It tells that the program ran successfully, and if not, what sort of error was encountered.

See what it looks like if we do something that intentionally won't work. If you `ls` on a folder that doesn't exist, it will return an error. 

```html
$ ls noexist
ls: noexist: No such file or directory
```

Let's see what the exit status was.

```html
$ echo $?
1
```

We got `1`, which is what we expect. 

`1` just means a general error. The most common exit statuses return are `0` and `1`. It's up to your command to define what is an error or not.

Lets see another example. Let's run `sleep` for `10` seconds. 

```html
$ sleep 10
```

`sleep` will just start an idle process that just hangs for this number of seconds. While this is running, if I do control c, it will terminate that process.

```html
$ sleep 10
^C
```

It's sends an interrupt signal to the process, and different signals that you can send to the process usually result in different exit statuses.

If I check the exit status for that, you can see it's `130`. 

```html
$ sleep 10
^C
$ echo $?
130
```

Lets see how exit statuses work in scripts. I've already created a script called `script.sh` and it has execute permissions on it. 

In here, if I just call `exit` and pass `1`, this will set the exit status for the script.

```html
exit 1
```

Let's write that out. Let's invoke it. We'll check the exit status, and it's `1` like we expect. 

```html
$ nano script.sh
$ ./script.sh
$ echo $?
1
```

If we don't set an exit status explicitly, it's assumed to be `0` or it's the results of the last command that was run.

Let's go in here. Let's see how exit statuses work with functions. I am going to create an `ok` function. Instead of using `exit` here, because `exit` will cause entire script to stop and exit out, use the `return` keyword. For `ok`, I am going to return `0`, and then for my `fail` function here, I am going to return `1`.

#### script.sh
```sh
ok(){
    return 0
}

fail(){
    return 1
}

fail
ok
```

I am going to call `fail` first, and `ok` second. Let's run this. I run it. 

#### Terminal
```bash
$ ./script.sh
```

Let's check the exit status on it.

```bash
$ ./script.sh
$ echo $?
0
```

We can see it's a `0` even though we have that `fail` function in there. It's because the last run command gets set as the exit status for the script.

If we come in here and if we `echo` like this, we'll see the exit status of each of these functions. 

#### script.sh
```sh
ok(){
    return 0
}

fail(){
    return 1
}

fail
echo $?
ok
echo $?
```

This question mark variable is set for every command or function that's run. 

Run script again. 

#### Terminal
```bash
$ ./script.sh
1
0
```
We can see that it's a `fail` function, the `ok` function, and then the entire script of course will have a `0` exit status.

```bash 
$ echo $?
0
```