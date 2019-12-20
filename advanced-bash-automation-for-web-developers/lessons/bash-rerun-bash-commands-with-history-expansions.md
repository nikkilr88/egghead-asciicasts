Instructor: [00:00] History expansions always begin with an exclamation mark. For example, to run the last command that we ran again, we can use double exclamation marks. I run the date commands.

#### Terminal
```bash
$ date
Tue Oct  2 22:46:09 MDT 2018
```

[00:11] Then if I just do two exclamation marks and hit enter, you'll see it'll run it again. 

```bash
$ !!
date
Tue Oct  2 22:46:14 MDT 2018
```
This is particularly useful if you're doing something that requires superuser permission but forgot to put `sudo` at the beginning of the command.

[00:24] For example, you can use Bash to turn your wireless on and off, use `ifconfig`, pass the name of the wireless interface, and say, `down` 

```bash
$ ifconfig en0 down
ifconfig: down: permission denined
```

Doing this requires that you use `sudo`. If I do `!! sudo`, you can see it runs it again. Now it works.

```bash
$ !! sudo
sudo ifconfig en0 down
Password:
```

[00:42] Another handy history expansion is exclamation mark and dollar sign, which refers to the last argument of the previous commands. 

```bash
$ !$
```
For example, if I create a script and I want to give it execute permissions now, I can just do that. 

```bash
$ touch script.sh
$ chmod +x !$
```

I gave that script file execute permissions. It's pretty handy. It saves some typing.
