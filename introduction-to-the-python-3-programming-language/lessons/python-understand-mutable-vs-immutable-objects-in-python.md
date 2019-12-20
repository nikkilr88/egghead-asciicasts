Everything in Python has an `id` and a `value`. If I create a list, I can check the `id` of that list using the `id` function.

#### Terminal
```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> b = []
>>> id(b)
4521676488
>>> 
```

If I pinned the number three to that list, I can check the `id` of it again, and the same `id` is returned. This means that the list object in Python is mutable, and the same is true for dictionaries.

```bash
>>> b.append(3)
>>> b
[3]
>>> id(b)
4521676488
>>> 
```


Immutable objects, however, can't be altered. If I create `a` and set it equal to `4`, we can check the `id` of `a`, and then if I say `a` is equal to `a + 1` and then check the `id` of `a` again, you can see that we have a new `id`, so the new variable was created instead of just modifying the existing one.

```bash
>>> a = 4
>>> id(a)
4517321984
>>> a = a +1
>>> id(a)
4517322016
>>> 
```

Things that are immutable in Python are strings, integers, and tuples. Let's take a look at a string real quick, if we check the `id` of our phrase. I can modify the value of it from `Hello` to `World` and check the `id` of it again, and you can see that we have a new `id`.

```bash
>>> phrase = "hello"
>>> id(phrase)
4523222608
>>> phrase = "world"
>>> id(phrase)
4523222664
>>> 
```

While that may seem a little strange since we're referring to the same variable, the good news is that you don't have to track the `id`. Python does that for you.