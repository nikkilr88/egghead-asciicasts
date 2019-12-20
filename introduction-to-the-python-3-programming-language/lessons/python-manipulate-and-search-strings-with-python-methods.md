If we start our REPL interface, we can create a string just by saying, `"The ball is red"`. You can access the string methods using the dot and then the name of the methods. We could do `endswith` and pass in the substring that we're looking for. It returns true, if that string is found.

#### Terminal
```bash
$ python3 
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> "The ball is red".endswith("red")
True
```

This works with variables too. I can create a variable called `my_string`, and say its equal to `"The ball is red"`, and create a second variable called `substring`. That's going to be equal to `"red"`. Perform that same operation using the variable names, so `my_string.endswith(substring)`. It's going to return true as well.

```bash
>>> my_string ="The ball is red"
>>> substring = "red"
>>> my_string.endswith(substring)
True
```

If you have a string like the ball is red, we can search within it for specific characters, and it returns the index number of where your substring is found. If the substring is not found, it returns a negative one.

```bash
>>> "The ball is red".find("is")
9
>>> "The ball is red".find("foo")
-1
>>> 
```

You can format strings also using positional operators and the format method. There's a `.join` method as well that accepts a list. We have the strip methods as well, so if I do `" Will ".strip()`, it strips out the white spaces from the beginning and the end. Or if I do `lstrip`, it strips off the left side spaces. As you might expect, `rstrip`, strips the spaces from the right side.

```bash
>>> "The {0} is {1}".format("ball", "red")
'The ball is red'
>>> "".join(["the ", "ball ","is ", "red"])
'the ball is red'
>>> " Will ".strip()
'Will'
>>> " Will ".lstrip()
'Will '
>>> " Will ".rstrip()
' Will'
>>> 
```

I could continue on showing you all of the methods available, but you'd probably get pretty bored, because they all operate the same way. Instead, let's look and see how you can discover the methods that are available yourself. I'll use that using the `dir`.

I'll pass in just a string. When that returns, it shows me everything that you can do with a string in Python. You can see listed here are the join methods, the split methods, and the format methods that we've already used as well as some others.

```bash
>>> dir("Will")
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mod__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmod__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find', 'format', 'format_map', 'index', 'isalnum', 'isalpha', 'isascii', 'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'join', 'ljust', 'lower', 'lstrip', 'maketrans', 'partition', 'replace', 'rfind', 'rindex', 'rjust', 'rpartition', 'rsplit', 'rstrip', 'split', 'splitlines', 'startswith', 'strip', 'swapcase', 'title', 'translate', 'upper', 'zfill']
>>> 
```
If you want to know how one of those operates, you can type `help`, and then the name of the method and it returns a help screen telling you what the method does and how to use it.

```bash
>>> help("will".rstrip)
Help on built-in function rstrip:

rstrip(chars=None, /) method of builtins.str instance
    Return a copy of the string with trailing whitespace removed.
    
    If chars is given and not None, remove characters in chars instead.
```