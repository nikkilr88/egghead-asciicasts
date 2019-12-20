We've a list here containing the animals found in my local zoo. I'm going to create a new list containing the animals that I have in my backyard which is a `monkey`, a `bear`, and a `pig`. 

#### Terminal
```bash
$ python
Python 2.7.10 (default, Oct 23 2015, 19:19:21) 
[GCC 4.2.1 Compatible Apple LLVM 7.0.0 (clang-700.0.59.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> zoo_animals = ['giraffe', 'monkey', 'elephant', 'lion', 'bear', 'pig', 'horse', 'aardvark']
>>> my_animals = ['monkey', 'bear', 'pig']
```

If I want to create a list of animals that live in a zoo, but I don't have in my yard, I can create a new list called `not_my_animals`. Then I can say, `for animal in zoo_animals`, referencing the zoo animals list. Can use an `if` statement to say, `if animal is not in my_animals,` we'll check that list and see if the name of the animal exists in there. If it doesn't exist, then we'll append that animal to the list called `not_my_animals`. That runs and if we take a look at the not my animals list, it contains a giraffe, elephant, lion, horse, and aardvark.

```bash
>>> not_my_animals = []
>>> for animal in zoo_animals:
...     if animal not in my_animals:
...             not_my_animals.append(animal)
... 
>>> not_my_animals
['giraffe', 'elephant', 'lion', 'horse', 'aardvark']
```

List comprehension will allow us to do the same thing, but in a much more concise way. I'll create another list called `other_animals`. We will start recreating a new list and say, `[animal for animal in zoo_animals if animal not in my_animals]`.

Let me show you the output of that real quick, and we will break it down to see how it works. 

```bash
>>> other_animals = [animal for animal in zoo_animals if animal not in my_animals]
>>> other_animals
['giraffe', 'elephant', 'lion', 'horse', 'aardvark']
```

We can put the same list that we did in our first example. With list comprehension what we did is we said the same things. For every animal in zoo animals, if that animal is not in my animals, then add it to the list.

I think the most confusing thing about list comprehensions is the order that things are laid out here. The first thing laid out is animal, which is the end result of this operation. It's our variable. We have our variable animal, which is the animal from for animal in zoo animals, and we have our conditional statement, if not if animals not in my animals.

Let us try a different example and see if we can make it a little more clear. We've a list of sales figures here and we need to calculate what the total amount of sales tax was. We create a new list called `sales_with_tax`, and it is going to be an empty list.

```bash
>>> sales = [3.14, 7.99, 10.99, 0.99, 1.24]
>>> sales_with_tax = []
```

We will just say, `for sale in sales:`, and we can append the sales item `* 1.07` which will indicate the value plus seven percent tax. When we run that, each of the items from the sales list has been multiplied by seven percent.

```bash
>>> for sale in sales: 
...     sales_with_tax.append(sale * 1.07)
... 
>>> sales_with_tax
[3.3598000000000003, 8.5493, 11.759300000000001, 1.0593000000000001, 1.3268]
```
One of the things that we'll notice here is, in this example we did this across every item in the list. In our previous example, we had our conditional if statement to determine which items applied. This time we are applying it to every item in the list.

If we want to do the same thing with list comprehension, we will create a new list. This time we can just say, `sale * 1.07 for sale in sales`, so it is the same thing. Our new variable that is the result of this operation is the first thing listed.

```bash
>>> sales2 = [sale * 1.07 for sale in sales]
>>> sales2
[3.3598000000000003, 8.5493, 11.759300000000001, 1.0593000000000001, 1.3268]
```

Then, our iterator is the second thing for sale in sales, and there is no conditional this time, so that's the end of the statement. When we take a look, we get the exact same results as we did before.

One of the things that make list comprehension so confusing, is the way that they are written out. In our first example, we created a new list of animals that lived in a zoo, but weren't in my backyard. We did that all on one line, but watch this. We can create a new list and I can do a break there, create our variable, create our iterator, our conditional statement, and close our list.

```bash
>>> zoo_animals
['giraffe', 'monkey', 'elephant', 'lion', 'bear', 'pig', 'horse', 'aardvark']
>>> my_animals
['monkey', 'bear', 'pig']
>>> 
>>> new_2 = [
...     animal
...     for animal in zoo_animals
...     if animal not in my_animals
... ]
```

When we take a look at `new_2`, we get the exact same results, but I broke it up on two different lines to make it more readable. That is completely acceptable to do, and probably recommended whenever you have longer, more complex list comprehensions.

```bash
>>> new_2
['giraffe', 'elephant', 'lion', 'horse', 'aardvark']
```