I can create a dictionary by specifying the variable name, and then a set of empty braces. You may know dictionary as a hashmap, as well.

#### Terminal
```bash
>>> age = {}
```

If I want to add an item to it, I'll use a `[]` and the `key`, because these are key-value pairs, and then the value I want to assign to that `key`. I can do this for a couple more examples, and then if I `print` out the dictionary, it shows the three key-value pairs that I added to it.

```bash
>>> age['will'] = 40
>>> age['bob'] = 30
>>> age['john'] = 20 
>>> age
{'will': 40, 'bob': 30, 'john': 20}
```

If I want to just retrieve an individual value from the list, I specify the name of the dictionary, the value or the key that I want to retrieve from it, and then it returns the value.

```bash
>>> print(age['will'])
40
```

I can do the same thing if I want to retrieve the `age` for the key `'bob'`. I'll specify age, the key name that I'm looking for, and the value gets returned.

```bash
>>> print(age['bob'])
30
```

I can use the `in` operator to see if a key exists. If I want to see if the key will exist in the dictionary age, it returns true, but if I specify the name of a key that doesn't exist, it returns false.

```bash
>>> 'will' in age
True
>>> 'austin' in age
False
```

Dictionaries also have a get method. I can do `age.get`, and then request the key name that I want, and then there's an optional string that we can append on there of what the get method will return if that key is not found. In this case, Will was found, so it returned the value. If I use the `delete` method to delete the key named Will and then run that same command, it prints out the not found string that we applied.

```bash
>>> print(age.get('will', 'Not found'))
40
>>> del age['will']
>>> print(age.get('will', 'Not found'))
Not found
```

If I want to iterate over all of the key value pairs in the dictionary, I can specify the variable names for my key and my value, and then specify `in` the dictionary, and then call the `items` operator to iterate over it. Then we'll use our `print` command. Just print the two variables `key` and `value`, and it prints them out.

```bash
>>> for key, value in age.items(): 
...     print(key, value)
... 
('bob', 30)
('john', 20)
``` 