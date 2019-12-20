In Python, there are always at least three nested scopes whose name spaces are directly available. To show you what that means, I'm going to create a function called `whoami`. Inside, I'm going to create a variable named `i` and have it just be a string that says, `"I am groot"` 

#### scope_test.py
```python
def whoami():
  i = "I am local groot"
  print(i)

whoami()
```

Then we'll print out the string I and color function so I can execute that with the Python command, and it prints out I am Groot.

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
```

Let's create a nested function and redefine `i`. I'm going to create a new function inside of the Who Am I function called `local_groot`. Inside of that, I'm going to create a variable named I and have it say, `"I am local groot"` Then we'll print the value of `i`. We'll execute our `local_groot()` method, and then we'll `print(i)`  again.

#### scope_test.py
```python
def whoami():
  def local_groot():
    i = "I am local groot"
  i = "I am groot"
  print(i)
  local_groot()
  print(i)

whoami()
```

I'll save that, execute it. When it executes, it says, "I am Groot," both times. It's like nothing even happened.

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
I am groot
```

Let me prove to you that it actually did change. To do that, I'm going to `print` the value of `i` while we're inside the function. 

#### scope_test.py
```python
def whoami():
  def local_groot():
    i = "I am local groot"
    print(i)
  i = "I am groot"
  print(i)
  local_groot()
  print(i)

whoami()
```

I'll save that, run it again. 

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
I am local groot
I am groot
```

We define the value of `i`. We `print(i)`. It says, "I am Groot." We execute our local Groot method then print out I am local Groot. Then we print out the value of `i` again where `i` still remains I am Groot.

Let's do one more thing where I show you that. I'm going to `print` out the id of the variable `i` which will show us the object id for that in Python, so we'll do that inside the `local_groot` method. We'll do it here in our outer scope. Then we'll do it again one more time after we've called our `local_groot` function. We set the value to `i`.

#### scope_test.pu
```python
def whoami():
  def local_groot():
    i = "I am local groot"
      print(id(i))
      print(i)
  i = "I am groot"
  print(i)
  local_groot()
  print(i)

whoami()
```

We printed the id which is the 7360, printed out the value I am Groot. Then we went inside our local Groot function, printed the value of I, and that has a different value. It's 3768. So that tells us that it's a completely different variable even though it has the same variable name. After we exit that function, we print ID again. That again refers to the value of the variable I in the outer scope.

#### Terminal
```bash 
$ python3 scope_test.py
4443797360
I am groot
4443803768
I am local groot
4443797360
I am groot
```

I can get rid of those print commands real quick just because It will make our explanation a little easier as I start to tell you about what if you want to override that variable of I? We can do that in Python using the non-local keyword. I'm going to create another function in here. I'm going to call this one `nonlocal_groot`. Inside of it, I'm going to define a variable with the `nonlocal` keyword and give it the variable name `i`, set our value. This time we'll say, `"I am nonlocal groot"`

#### scope_test.py
```python
def whoami():
  def local_groot():
    i = "I am local groot"
    print(i)

  def nonlocal_groot():
    nonlocal i
    i = "I am nonlocal groot"
  i = "I am groot"
  print(i)
  local_groot()
  print(i)
  nonlocal_groot()
  print(i)

whoami()
```

We'll call our nonlocal function and then we'll print out our value for the variable `i`. Everything behaved as it did before except after I called that `nonlocal_groot` function, when we printed out the value of `i`, it was no longer the value of `i` from this outer scope. It was the value `i` am non-local Groot.

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
I am local groot
I am groot
I am nonlocal groot
```

What happens is whenever you use the `nonlocal` keyword, you're telling that method that the variable `i` is not local to this function, and it should look in the outer scope for a variable with that same name. That's what happened here. When `nonlocal_groot` executed, it found this variable `i` in the outer scope. Then when we printed that out, we got the value I am nonlocal groot.

Finally, we have global scopes. We'll create another function here. We'll call this one global Groot. Inside of it, I'm going to use the global keyword to define the variable I. We'll set I equal to the value of I am global Groot. Go down to the bottom here. We're going to execute our global Groot function or method, print out our value of I.

#### sceope_test.py
```python
def whoami():
  def local_groot():
    i = "I am local groot"
    print(i)

  def nonlocal_groot():
    nonlocal i
    i = "I am nonlocal groot"

  def global_groot(name):
    return "I am {0} groot".format(name)

  i = "I am groot"
  print(i)
  local_groot()
  print(i)
  nonlocal_groot()
  print(i)
  global_groot()
  print(i)

whoami()
```

When we run this, it says, "I am nonlocal groot." You might have been expecting that to say, "I am global Groot," because we defined I globally.

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
I am local groot
I am groot
I am nonlocal groot
I am nonlocal groot
```

Let me add one more print line down here, and 

#### sceope_test.py
```python
whoami()
print(i)
```

I'll show you why that didn't work. Save that, run it again, now finally we get our I am global Groot print statement.

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
I am local groot
I am groot
I am nonlocal groot
I am nonlocal groot
I am global groot
```

Let me tell you what happened here. When we called global Groot, we had previously called `nonlocal_groot`, and that set the value of the nonlocal I to I am `nonlocal_groot`.

Enclose this so we have a little more room here. The global keyword indicates that the variable lives in global scope. The `nonlocal` keyword indicates that the variable lives in the enclosing scope.

When we call print for the variable I here on line 21, we were still in the enclosed scope of the Who Am I function, so that's why it printed out I am `nonlocal_groot`. It wasn't until we got down here to line 24 and we printed the variable `i` outside of any other scope that we finally allowed the global scope to take precedence and print out "I am global groot".

If that seems confusing, it probably should. It's the reason that Python best practices recommend against using globally scoped variables. Once you have several functions or several methods nested within each other, it can be really difficult to tell where a global variable takes precedence and where it doesn't.

If you find yourself tempted to use a global variable, what I would recommend instead is creating a parameter for your method that allows you to get around that and then pass in the value that you need. We'll pass in the name and then we'll return that. Get rid of this extra print statement down here, save that. We need to pass in our name to global Groot.

#### scope_rest.py
```python
i = "I am groot"
  print(i)
  local_groot()
  print(i)
  nonlocal_groot()
  print(i)
  print(global_groot("the only"))
  print(i)

whoami()
```

Now when that executes, we passed in the parameter that we needed, we avoid the need for a global variable, and then we just return the value that we needed from that method.

#### Terminal
```bash 
$ python3 scope_test.py
I am groot
I am local groot
I am groot
I am nonlocal groot
I am the only groot
I am global groot
```