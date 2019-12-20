The `if` statement is probably the most well-known flow control statement in Python. To show you how that works, let's create a variable called `x`, and `x` is going to convert to an integer, the input it receives from a console prompt. We'll evaluate `x` with an if statement and say `if x < 0:`, we'll set the value to `zero` and then `print("Negative number changed to zero")`

#### flow.py
```python
x = int(input("enter an integer: "))
if x < 0:
  x = 0
  print("Negative number changed to zero")
```

We can run that with the `Python3` command and then provide the name of the file. I'm prompted for the integer, so if I enter the value `-1`, it evaluates to true in the `if` statement, sets the value to `zero` and then prints out our statement. 

#### Terminal
```bash
... python3 flow.py
enter an integer: -1
Negative number changed to zero. 
```

If we run it again and I give it something that won't evaluate to true such as the number `2`, whenever it runs, the `if` statement doesn't evaluate to true and there's nothing left in the program to do, so the program exits.

```bash
$ ... python3 flow.py
enter an integer: 2
```

Let's expand on it a little bit and give it something else to do. If statements can have optional `elif` and `else` statements, so let's give it an `elif` which stands for else if, and we'll say `if x = zero`, then we'll just `print("zero")`. 

#### flow.py
```python
x = int(input("enter an integer: "))
if x < 0:
  x = 0
  print("Negative number changed to zero")
elif x == 0:
  print("zero")
```
Notice that the `if` and `elif` conditional statements aren't indented, but the code blocks that execute when they evaluate to true are indented. This is important because in Python everything is space sensitive so you have to get it right or your program won't execute.

Next, we'll say `elif x == 1`, then we're going `print("one")` and we'll give it a final `else` clause that's going to execute if none of the other statements evaluate to true. 

```python
$
elif x == 1:
  print("one")
else:
  print("Some other number")
```

Let's run it again and if I give it a `-1`, that's the condition, we originally had, so that still works. 

#### Terminal
```bash
$ ... python3 flow.py
enter an integer: -1
Negative number changed to zero. 
```

Run it one more time, and if I give it the integer of `1`, the `1` is printed out, and if I give it a number that we didn't code for such as `3`, that triggers the else statement which prints out some other number and then exits.

```bash
$ ... python3 flow.py
enter an integer: 1
one
... python3 flow.py
enter an integer: 1
Some other number
```

An if statement constructed like this with multiple `elifs` is a substitute in Python for a switch or case statements that you'll find in other languages. A for statement can be used to iterate over any sequence which can be a list or a string.

To show you how those work, I'm just going to go into the Python console. I'm going to create a list called pets and inside of the list we'll have cat, dog and elephant. I'm going to start our for loop by typing `for pet in pets:`.

```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> pets = ['cat', 'dog', 'elephant']
>>> for pet in pets:
```

We've got the keyword `for` and it's going to iterate over the list object pets and for each item in the pets list, it's going to create a temporary variable called `pet` with that value. Inside the for block, we're going to print out `I have a`, and then use the format method to and the positional operator to print out the name of the pet. As the for loop iterates through the list, the variable pet is set to the list element from that iteration. 

```bash
...     print('I have a pet {0}'.format(pet))
... 
I have a pet cat
I have a pet dog
I have a pet elephant
>>> 
```

We can also create a for loop in combination with the range operators. We can say `for i in range`, and then specify the end of the range. It'll increment up to but not including the endpoint number specified in the range.

```bash
>>> for i in range(5):
...     print(i)
... 
0
1
2
3
4
```

You can also specify the starting point of the range in the range method if you supply two arguments. The first one is the starting point, the second one is the endpoint and as that runs, it starts as `10` and then goes up to but doesn't include the endpoint of `15`.

```bash
>>> for i in range(10, 15):
...     print(i)
... 
10
11
12
13
14
>>> 
```

You can specify the increment or the step for it as well. The increment or step is provided as the third argument to the range method, and as this executes it starts at `0`, goes up to but doesn't include `10` counting by two's.

```bash
>>> for i in range(0, 10, 2):
...     print(i)
... 
0
2
4
6
8
```

You can increment with negative numbers as well. This time if we start the range at `10` and then go down to `0` with a step of `-1`, when it runs, it counts from 10 all the way down to 1. 

```bash
>>> for i in range(10, 0, -1):
...     print(i)
... 
10
9
8
7
6
5
4
3
2
1
```

You can use a while statement to keep a loop that continues running as long as a given condition is true.

```bash
>>> x = 1
>>> while x < 10:
...     print(x)
...     x = x + 1
... 
1
2
3
4
5
6
7
8
9
```

I've got a variable of `X` set to `1` and I can say `while x < 10`, `print(X)` and then increment `x` by `1`. Remember that the code inside of your loop block has to be indented, and when this runs, it continues to print in an increment the value of `x` until the statement `x` less than `10` no longer evaluates to true.

All of the loop statements with the exception of while will continue to iterate and loop until they've reached the end of their given sequence. Our original for statement iterated over the list of pets, cat, dog and elephant, and once it started, it continued iterating until it got to elephant, the last item in the list.

You can terminate a loop with a break statement. If we do for pet in pets, and then evaluate if the `pet` is equal to the word `dog`, we'll print `'No dogs allowed'` and then `break`. Otherwise or in Python lingo else, we'll print out `'We love ` and use our positional operator with the format method to print out the name of the pet.

```bash
>>> pets 
['cat', 'dog', 'elephant']
>>> for pet in pets:
...     if pet == 'dog':
...             print('No dogs allowed')
...             break
...     else:
...             print('We love {0}!'.format(pet))
... 
We love cat!
No dogs allowed
```

If we look at what happened here, the first item in the list, cat, doesn't evaluate to true in the if statement, so it triggered the else and printed we love cat. The next item dog does evaluate to true, so it printed no dogs allowed and then broke the loop and the word elephant was never reached in iteration.