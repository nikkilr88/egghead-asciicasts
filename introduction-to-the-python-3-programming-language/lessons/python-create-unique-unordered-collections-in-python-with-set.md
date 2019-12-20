I can create a set in Python by giving it the variable name, starting with a curly bracket and then starting to add my set items to it. I can add a list of animals here including `monkey`, `bear`, `dog`, and then I'm going to add `monkey` again. We'll add a `cat` to it, we'll add another `bear`, and then we'll add a `gorilla`. Now if I print this out for you, you can see that it eliminated the duplicates, so that's the key to a set. It doesn't allow duplicate values which makes it good for membership testing.

#### Terminal
```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> animals = {'monkey', 'bear', 'dog', 'monkey', 'cat', 'bear', 'gorilla'}
>>> animals
{'dog', 'cat', 'bear', 'monkey', 'gorilla'}
```

For membership testing, in order to see which values are in it we can say `'monkey' in animals`, it will return true. This works very quick, even for large sets. If we ask for something that's not in there, it'll return `False`. Then here's the tricky part. If you want to create an empty set, whenever I created the one for animals above I used the curly braces. If I want to create an empty set, I have to use the word `set` with parentheses after it.

```bash
>>> 'monkey' in animals 
True
>>> 'shark' in animals
False
>>> 
>>> fish = set()
>>> fish
set()
```

To add something to it, we have an `add` method, and I can add a `'shark'` to it. I can add a `'guppy'` to it, and I can add a `'whale'` to it. Then when we take a look at it, it prints out. Then I can remove items using the `remove` method, now I'll remove `'whale'` because it's not actually a fish. Sets also have a `union` method which allows you to merge two different sets together. I can merge `fish` with anima`ls and it returns a new set that contains the de-duplicated values from both of those lists.

```bash
>>> fish.add('shark')
>>> fish.add('guppy')
>>> fish.add('whale')
>>> fish
{'shark', 'whale', 'guppy'}
>>> fish.remove('whale')
>>> fish
{'shark', 'guppy'}
>>> fish.union(animals)
{'dog', 'cat', 'bear', 'monkey', 'shark', 'gorilla', 'guppy'}
``` 