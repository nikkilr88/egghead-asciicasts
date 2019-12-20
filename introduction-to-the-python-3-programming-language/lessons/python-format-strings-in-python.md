In Python, we can do basic string declarations like `name = 'Will'`. If there is a quote in there, we can start our string with double quotes, and that single apostrophe will be included as part of the string.

#### Terminal
```bash
$ python
Python 2.7.10 (default, Oct 23 2015, 19:19:21) 
[GCC 4.2.1 Compatible Apple LLVM 7.0.0 (clang-700.0.59.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> name = 'will'
>>> my_ball = "Will's ball"
>>> my_ball
"Will's ball"
```

We can do multi-line strings as well. When you use multiline strings, the carriage returns are preserved, so that as you print those out, it's returned exactly as you typed it in.

```bash 
>>> multiline= """Will's ball
... is red
... and bouncy!"""
>>> multiline
"Will's ball\nis red\nand bouncy!"
```
There are different ways to escape characters as well. Take a look this. If I start my string with a single quote, and then I want to refer to Will's ball, I need to escape that, because this single quote would terminate the string. 

```bash
>>> print('Will\'s ball is red')
Will's ball is red
```

I can escape it with the backslash character, or as you saw at the beginning of the lesson, I can use a double quote, and that single quote will be ignored. 

```bash
>>> print("Will's ball is red")
Will's ball is red
```

I can also use the triple quotes, and the single quote will be ignored as well. 

```bash
>>> print("""Will's ball is red""")
Will's ball is red
```

I can also include characters like the tab character, and that'll get interpreted whenever the string is parsed.

```bash
>>> print("Will's\tball\tis\tred")
Will's	ball	is	red
```

Let's take a look at how we can format some strings. We'll do `item = 'ball'`, except that's a string, so I need to quote it as a string. We'll say the `color = 'red'`. Now, I can say `print`, and pass in the substitution character, `%s`,  here and here, and that's the end of my string.

Then I tell it the variables that I would like substituted in that string. Whenever it prints out, it prints out "Will's ball is red."

```bash
>>> item = 'ball'
>>> color = 'red'
>>> print("Will's %s is %s." % (item, color))
Will's ball is red. 
```
One other way you can do this is with the string's format operator or format method. I'll specify item `0` and item `1`, terminate my string, and then use `.format`, and pass in the variables I'd like substituted, so when it prints out, it prints out "Will's ball is red."

```bash
>>> print("Will's {0} is {1}".format(item, color))
Will's ball is red
```
As you might expect, those are positional operators, so the number inside of the curly brackets there is the positional variable that you want specified.

```bash
>>> print("Will's {1} is {1}".format(item, color))
Will's red is red 
```


