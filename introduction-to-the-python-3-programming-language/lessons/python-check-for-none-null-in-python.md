In Python, null variables are known as none. Let's create a variable and set it to none. The correct way to check for this is with the `is` operator. There's another way you could do it. You could do `if foo = none` and that works, but it's not the preferred way in Python.

#### Terminal
```bash
$ python3 
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> foo = None
>>> if foo is None:
...     print("It's not there")
... 
Its not there
>>> if foo == None:
...     print("it's still not there")
... 
its still not there
>>> 
```

Let me show you why. If I do `id(foo)`, it gives me the `ID` of the variable `foo`, and in Python everything has an `ID` and a value. Whenever we use the `is` operator, it does an `ID comparison`, whereas if we use the `equals`, then it requires a dict look up and has to iterate through it to do the comparison. The end result is the `is`, is much faster than using `equals` when checking for none.

```bash
>>> id(foo)
4427190632
>>> 
```