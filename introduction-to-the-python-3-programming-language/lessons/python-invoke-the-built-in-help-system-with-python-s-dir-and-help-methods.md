I have my string `foo` here, and I need to convert it to upper case letters. I know that's possible, but instead of going to Stack Overflow or Google, I can use the `dir` method in bash and provide the object in question. Whenever I run that, it gives me a list of everything that's possible with that object. It knows that this is a string, so it only gives me string-based operations.

#### Terminal
```bash
>>> "foo"
'foo'
>>> dir("foo")
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mod__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmod__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find', 'format', 'format_map', 'index', 'isalnum', 'isalpha', 'isascii', 'isdecimal', 'isdigit', 'isidentifier', 'islower', 'isnumeric', 'isprintable', 'isspace', 'istitle', 'isupper', 'join', 'ljust', 'lower', 'lstrip', 'maketrans', 'partition', 'replace', 'rfind', 'rindex', 'rjust', 'rpartition', 'rsplit', 'rstrip', 'split', 'splitlines', 'startswith', 'strip', 'swapcase', 'title','translate', 'upper', 'zfill']
```

In the output here, the first thing you see are these double under methods. They're called double unders because they start with a double underscore. These methods aren't intended for you to call them directly, but they do show you the possible operations. For example, if I wanted to add `"foo + bar"`, that actually uses the `__add` method, but I used the plus symbol instead of calling it directly.

```bash
>>> "foo + bar"
'foobar'
```

Back to my current problem though, of how to convert it to upper case, I look at the rest of the methods here and there's one called upper. Sounds like what I need.

To see how to use it, I can call bash's built-in help system and provide my string plus the method that I'm trying to figure out how to use. 

```bash
>>> help("foo".upper)
```

That opens up the built-in help menu, it shows me that if I call the string with the `.upper` method, it'll return a copy of the string converted to upper case. Let's try that out. I'll say `"foo".upper()`, and there it is, all upper case letters.

```bash
>>> help("foo".upper)
>>> "foo".upper()
'FOO'
```

