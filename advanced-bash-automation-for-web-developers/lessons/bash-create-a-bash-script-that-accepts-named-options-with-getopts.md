Instructor: [00:00] To use `getopts`, we invoke it in a `while` loop. I'll say `while getopts`. Then we pass in a string. In the string, we'll pass the options that our script supports, and then `getopts` will parse for us. We'll just do an `a` for now, and then we'll pass the name of the variable that we want each option to be assigned to. We'll just use `opt` there.

#### getopts.sh
```shell
while getopts 'a' opt; do

done
```

[00:24] Here, we'll process each option. I'm going to use a `case` statement. Then we'll handle our `a` here, close our `case` statement. 

```shell
while getopts 'a' opt; do
  case "$opt" in
    a) echo "a found";;
  esac  
done
```

We can see, I have my `getopts` script there already. Then lets invoke `getopts` and pass the `a` option.

#### Terminal
```bash
$ ./getopts.sh -a
a found
```

[00:42] We can see that it's working. Let's see what happens if we don't pass any options. Nothing happens, just the script runs successfully, but no options are found. Then if I pass an unknown option, we see that it's outputting this illegal option. Also note that the exit status of the script is not set to a one or anything.

```bash
$ ./getopts.sh -a
a found
$ ./getopts.sh
$ ./getopts.sh -b
./getopts.sh: illegal option -- b
```

[01:02] A lot of people like to disable this default behavior of `getopts`. The way we do that is we prepend this list here with a colon. That tells `getopts` that we want to handle the unknown option error case on our own.

#### getopts.sh
```shell
while getopts ':a' opt; do
  case "$opt" in
    a) echo "a found";;
  esac  
done
```

[01:16] The way for us to do that is we check for the question mark. This `opt` variable will be set to a question mark if it receives an unknown option. Note that we have to escape the question mark, just because it's a special Bash character.

```shell
while getopts ':a' opt; do
  case "$opt" in
    a) echo "a found";;
    \?) echo "unknown option";;
  esac  
done
```

[01:32] Let's come back here, and we'll do `getopts` `a` and `b`. We can see `a` is found and working like normal, but now, when we pass it `b`, it just says `unknown option`. 

#### Terminal
```bash
$ ./getopts.sh -a -b
a found
unknown option
```

`getopts` also supports passing a value to an option.

[01:50] Let's do `b`, and then we're going to add a colon after `b`. That tells `getopts` that this `b` flag expects a value to be passed to it as well. 

#### getopts.sh
```shell
while getopts ':ab:' opt; do
  case "$opt" in
    a) echo "a found";;
    \?) echo "unknown option";;
  esac  
done
```

Let's handle `b` here. We'll say `b`. I'm going to say `b found, and the value is`.

[02:06] The value is going to be found in this `$OPTARG` variable that `getopts` sets. 

```shell
while getopts ':ab:' opt; do
  case "$opt" in
    a) echo "a found";;
    b) echo "b found and the value is $OPTARG";;
    \?) echo "unknown option";;
  esac  
done
```

As `getopts` iterates through this, will set and reset this `$OPTARG` variable as needed. When it gets to `b`, and it finds a value passed to it, that value will be contained in this `$OPTARG`.

[02:25] Let's try it out. Do `getopts`. We'll do `a` again, and then to `b`, we'll just pass a `123` string. 

#### Terminal
```bash
$ ./getopts.sh -a -b 123
a found
b found and the value is 123
```

Cool. We can see that that's working. Note that only single character and single dash options are supported by `getopts`.

[02:42] There's a lot of different formats for passing options to scripts. Something like that is common, or this. 

```bash
$ --long -long
```
These option formats, though, aren't supported by `getopts`. It has to be single dash and single character, like that.

[03:01] After our `getopts` while loop, it's good practice to shift the options out of the arguments array. That way, if our script accepts additional parameters, we can just process those next. We use the `shift` builtin, and we do a little bit of math here.

[03:16] We say `OPTIND` minus one. `OPTIND` is a variable set by `getopts`. It represents the index of the last processed option. Basically, it'll be equal to the number of options that were processed in total. What this does is, it's going to take all of our options and their values, and it shifts it out of the arguments array.

#### getopts.sh
```shell
shift $(( OPTIND - 1 ))
```

[03:36] For example, if we then wanted to process additional arguments, we could do a for-loop, `for arg in` the arguments array. We'll just do an `echo` here. 

```shell
for arg in $@; do
  echo "received arg $arg"
done
```

If we do that again, we see this still works. If we wanted to pass a list of just anything here, we could see that that works.

![Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-a-bash-script-that-accepts-named-options-with-getopts-example.png)

[03:55] It processed our options just fine. Then after that, we have a separate list that needs to be processed. That happens by our for-loop. We can see that that's working there as well. Jumping back to our script here, if we did not have this shift here, let's see what would happen.

[04:12] We can see it processed our `getopts` just like we expected, but then after we're done processing these, we're done with them. We want them to be out of the arguments array. Because we didn't shift them, we can see that these got processed again by the for-loop.

![Not Shifted](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-a-bash-script-that-accepts-named-options-with-getopts-not-shifted.png)

[04:28] We shift those off, we run it again, and we can see that it behaves just like we want it to.
