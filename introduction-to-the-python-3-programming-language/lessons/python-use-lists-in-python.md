If you've used other programing languages, you may know these as arrays, but in Python, they are called lists. It's just a sequence of objects. It doesn't have to be the same data type, though. We can have a list that has an integer, a string, another integer. It can even contain a dictionary.

#### Terminal
```bash
>>> a = [1, 2, 3, 4]
>>> b = [1, 'cat', 7, {'car': 'chevy'}]
>>> b
[1, 'cat', 7, {'car': 'chevy'}]
```

Individual elements can be accessed by their index numbers. To grab the first item from the list `b`, we can use square brackets and index number. To grab the second number, we would use the index number one. 

```bash
>>> b [0]
1
>>> b[1]
'cat'
```

Let's create an empty list called pets. We'll do that by specifying empty braces. Then we can add to the pets list with the append method. We can add a `'cat'` to it, we'll add a `'dog'`, we can add a `'bear'` to it, and we can add a `'shark'`. When we display the list, all of our items are added to it.

```bash
>>> pets = []
>>> pets.append('cat')
>>> pets.append('dog')
>>> pets.append('bear')
>>> pets.append('shark')
>>> pets
['cat', 'dog', 'bear', 'shark']
```

If we want to get rid of the `dog`, we can use the `remove` method, and specify the item that we want to remove. We can use the `pop` method to remove the last item from the list. If we want to specify which item we'd like to get rid of, we can call the `pop` method, and pass it an index number.

```bash
>>> pets.remove('dog')
>>> pets.pop()
'shark'
>>> pets
['cat', 'bear']
>>> >>> pets.pop(0)
'cat'
>>> pets
['bear']
```

We add our pets back in. We can `sort` the list, which is going to sort the items alphabetically. You can `reverse` the list as well.

```bash
>>> pets = ['cat', 'dog', 'bear', 'shark']
>>> pets
['cat', 'dog', 'bear', 'shark']
>>> pets.sort()
>>> pets
['bear', 'cat', 'dog', 'shark']
>>> pets.reverse()
>>> pets
['shark', 'dog', 'cat', 'bear']
```

To find out how many items are in the list, you can use the `len` method, which is short for length. You can get the number of occurrences of a specific item in the list using the `count` method, passing in the list item that you would like to count, and it returns the number of instances found.

```bash
>>> len(pets)
4
>>> pets.count('bear')
1
``` 

