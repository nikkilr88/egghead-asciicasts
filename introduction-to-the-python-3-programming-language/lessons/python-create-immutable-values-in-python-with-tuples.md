To create a tuple in Python, you create name of your variable and you just add the items to it as a comma-separated list. You can add mixed data types to it as well. When we print it out, it looks much like a list, except for the fact that it's wrapped in parentheses versus square brackets, and as a matter of fact, to access individual elements, those are done the same way that you do with a list in Python.

#### Terminal
```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> t = 'dog', 'cat', 12345
>>> t
('dog', 'cat', 12345)
>>> t[0]
'dog'
>>> t[1]
'cat'
```

The difference between a list and a tuple is the fact that tuples are immutable and can't be changed once they're created. If we use the DRI method and specify our tuple you can see in the list of objects, methods, and properties that are available there's nothing for append, or add, or extend, or anything like that.

```bash
>>> dir(t)
['__add__', '__class__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getitem__', '__getnewargs__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__mul__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__rmul__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', 'count', 'index']
```

If you need to change a tuple -- let me just show you this real quick -- here's the ID of our tuple named t. 

```bash
>>> id(t)
4492264648
```

If we want to add a value to that, we have to recreate it, so we'll say t is equal to, and then specify all the items that we had in it before. Then, we can specify the new item that we want to add to it. 

```bash
>>> t = 'dog', 'cat', 12345, 'foo'
```

If we take a look at the ID of it now, you can see that the ID number has changed to reflect the fact that we added `foo` to the end of it.

```bash
>>> id(t)
4491890504
>>> t
('dog', 'cat', 12345, 'foo')
```