Functions start with the keyword `def` followed by the function name. Then there's a set of parentheses, and you'll put any parameters inside the parentheses followed by a colon. The next line gets indented, and you write the code for your function here. We can say `print("Heisenberg")`, and then we can execute that function just by calling the name.

#### functions.py
```python
def say_name(): 
  print("Heisenberg")

say_name()
```

To run that, I'll give it the `Python3` command followed by the name of the file containing my code, and it prints out the Heisenberg.

#### Terminal
```bash 
$ python3 functions.py
Heisenberg
```

You can use the return keyword to return the result of a function. In Python, functions always return something even if you don't. Let me show you what that means.

In our current function, we're not returning anything explicitly, so I can say `foo = say_name()`, which will execute our function. Then parent `foo` will print the return result. 

#### functions.py
```python
foo = say_name()
print(foo)
```

If I run that again, it executes the function, runs the parent statement and then a return value is actually none. A Python function will return none if you don't tell it what to do otherwise.

#### Terminal
```bash 
$ python3 functions.py
Heisenberg
None
```

Let's explicitly return something in our function. We'll start with the including parameter that we're going to call `name`, and then we'll just change our function to return `name`. When we call that, we need to include the parameter name that the function requires, so I'll include my name. 

#### functions.py
```python
def say_name(name): 
  return name

foo = say_name("Will")
print(foo)
```

When we execute that, the value of `foo` now is no longer none, but it's the value that we passed into the function.

#### Terminal
```bash 
$ python3 functions.py
Will
```

One other thing that's considered good practice in Python functions is to include a doc string. A doc string is just a string that tells what the function does, so this returns the name passed in as a parameter. What that does is it builds into the Python help system documentation for your function.

#### functions.py
```python
def say_name(name): 
  """
  Returns name passed in as a paramter
  """
  return name
```

You can see whenever I hover over this in visual code, it grabs that doc string, return and show the documentation I created for that function. That would work even if the function was in a different file. Or if you were using the Python console, you could get that using the Python DIR command followed by the name of the function.

The parameters that we have here, in this case, the one called `name`, are local to the scope of the function. Let me show you what that means. We'll do that by creating a new function. We'll create one called `add`, and we'll give it two parameters, `num1`, `num2`. We'll just return the `sum` of those. Now I'm going to create another instance or another variable called `num1`, and it's going to be equal to the return value of our functions. Let's try that out and see what that looks like. It's probably going to help if we print that out to the console. 

```python
def add(num1, num2):
  return num1 + num2

num1 = add(1, 2)
print(num1)
```

So try that again. It returns three. 

#### Terminal
```bash 
$ python3 functions.py
3
```

You can see that the variable named `num1` inside the scope of the function doesn't conflict with the variable named `num1` outside the scope of the function.

It's good to know that that's not really recommended best practices because if you're reading this code, you can get confused very easily as to which `num1`'s actually being referred to. But I just wanted to point out that the scope here keeps that from becoming a problem.

We can also have default arguments in here. We can set `num1` equal to a default of `1` and `num2` equal to a default of `2`. That allows us to call the function without having any parameters supplied at all.

#### functions.py
```python
def add(num1=1, num2=2):
  return num1 + num2

num1 = add()
print(num1)
```

#### Terminal
```bash 
$ python3 functions.py
3
```
One of the reasons you may want to do this is if you have a function that has many parameters, then you can specify the default. That's going to allow you to call those functions with calling fewer parameters especially if some of those are commonly the same thing.

We can use keywords for our argument names as well. I'm going to create another function here called `madlibs`. It's going to have a required function called `name`, and then two optional parameters. The first is a `noun` that we're giving it a default value of `"shoes"` and then `adjective` that we're going to give a default value of `"red"`. We'll just concatenate all of that into a string that will `return`.

We'll provide the name parameter as the first argument to our format method, our adjective will come next, followed by the noun. We can create a variable called `madlib` which is equal to our `madlibs` function and will provide as the required argument my name and then print that out so you can see what that looks like real quick. 

#### functions.py
```python
def madlibs(name, noun="shoes", adjective="red"):
  return "{0} has {1} {2}".format(name, adjective, noun)

madlib = madlibs("Will")
print(madlib)
```

The end result is it says, "Will has red shoes".

#### Terminal
```bash 
$ python3 functions.py
Will has red shoes
```

To specify that as a keyword argument, we have our name specified, and then I can say our noun and set that equal to a different value, and then I can specify also the adjective as well. 

#### functions.py
```python
madlib = madlibs("Will", noun="boots", adjective="black")
print(madlib)
```

Now it returns "Will has black boots".

#### Terminal
```bash 
$ python3 functions.py
Will has black boots
```

Here's why you would want to do keywords. I can take our `adjective`, and I can supply those out of order or in any order that I want, and it still works.

#### functions.py
```python
madlib = madlibs("Will", adjective="black",  noun="boots")
print(madlib)
```

#### Terminal
```bash 
$ python3 functions.py
Will has black boots
```

Let me show you another way that this works because they are still positional arguments. I can supply the word boots and black. Now we haven't specified any keyword arguments, but it still works.

#### functions.py
```python
madlib = madlibs("Will", "boots", "black" )
print(madlib)
```

#### Terminal
```bash 
$ python3 functions.py
Will has black boots
```

Let me show you what you can't do. I can't say a keyword argument and then return to positional arguments. So that's not going to work.

#### functions.py
```python
madlib = madlibs("Will", Noun = "boots", "black" )
print(madlib)
```

#### Terminal
```bash 
$ python3 functions.py
SyntaxError: positional argument follows keyword argument
```

Once you start using the keyword arguments, you have to finish out the function with keyword arguments. We can fix that by specifying our keyword argument for the rest of the function. 

#### functions.py
```python
madlib = madlibs("Will", noun="boots", adjective="black")
print(madlib)
```

That works.

#### Terminal
```bash 
$ python3 functions.py
Will has black boots
```

Then just for completeness, I can show you that it works whenever we use them as all keyword arguments as well.

#### functions.py
```python
madlib = madlibs(name ="Will", noun="boots", adjective="black")
print(madlib)
```

#### Terminal
```bash 
$ python3 functions.py
Will has black boots
```


