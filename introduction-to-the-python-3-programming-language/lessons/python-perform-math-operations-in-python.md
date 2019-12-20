Math operations in Python are pretty straightforward. We can say `3 + 4`, and it returns a sum. We can do `3 - 4`, same as `3*4`, and can even do `3 % 4`. Those all work the same between `Python 2` and `Python 3`.

#### Terminal
```bash
>>> 3 + 4
7
>>> 3 - 4
-1
>>> 3*4
12
>>> 3 % 4
3
```

Division is a little bit different. In `Python 2`, if I do `3/4`, I get `0`. It rounds that to an integer. If I wanted to see the complete value, I need to include the period or dot at the end, and it returns `0.75`. 

```bash
>>> 3 / 4
0
>>> 3 / 4.
0.75
```

Let me show you that in `Python 3`, by actually typing the `Python 3` command. In `Python 3`, if I do `3/4`, I get `0.75`. If I wanted that rounded to an integer, I can use double slashes, and that returns `0`. This works for variables, too. I can create a variable, `a`, and set it to `3`. I can set `b = 4`. If I do `a + b`, it returns `7`. If I do `a / b`, it returns `0.75`, or `a // b`, and it returns `0`.

```bash
$ ~ python3
>>> 3 / 4
0.75
>>> 3 // 4
0
>>> a = 3
>>> b = 4
>>> a + b
7
>>> a/b
.75
>>> a//b
0
```

Quick note on naming variables in `Python`. There are some recommendations here, that they are all in lowercase. We could say `sum = 3 + 4`, or if there is multiple words, it's recommended that they are separated by the underscore.

```bash
>>> sum = 3 + 4
>>> sum_of_two_numbers = 3 + 4
>>> 3_plus_4
```

Finally, it's recommended that variable names don't start with a number. That would not be a recommended variable name in `Python`.