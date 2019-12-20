A module is just a function that's been extracted to a file. For example, I can have a function called `total` that has one parameter, called `n`. I'm going to specify my `tax_rate = .07`, and then it's going to `return n * tax_rate + n`.

#### tax.py
```python
def total(n):
  tax_rate = .07
  return n * tax_rate + n
```

If we give this function a price, it will return the total price, including the tax rate for that purchase. I save that as `tax.py`. To use that, we can just import it. We can import it from the Python shell or the Python console with `import tax`. To see it in action, we can say `print`, and then `tax`, which was the name of the import, dot and then `total`, which is the name of our function. Then supply the parameter that it needs, the parameter n, and it returns the total value.

#### Terminal
```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import tax
>>> print(tax.total(5))
5.35
```

Using the same steps, you can use that in another file, not just the Python console. If I create a new file called `using_tax.py`, I can do the same thing, `import tax`, and then `print(tax.total())`. We'll give it `7` this time.

#### using_tax.py
```python
import tax 

print(tax.total(7))
```

Save that, and execute it using the python3 command, passing in a file name, and it returns the results. 

#### Terminal
```bash
$ python3 using_tax.py
7.49
```

You may be wondering, why would you want to do that? This is a pretty simple function. The reason is this may be a common function, and it'll probably grow in complexity over time.

By extracting your functions into modules, you can allow every developer on your team the ability to reuse that code and get the updates to that code without having to do a bunch of copy pasting, or keeping multiple versions of it.

Let me show you something else here. I'm going to say `print(__name__)`. That's in the tax.py code. 

#### tax.py
```python
`print(__name__)`
```

Now, if I call that, it returns main, 

#### Terminal
```bash
$ python3 tax.py
__main__
```

but if I open a Python shell, and `import` that, the name is equal to the import name I gave it, which is tax.

```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import tax
tax
```

Here's why that's import. Currently our total module in the tax code is only accessible whenever it's imported as a module. If I say if `__name__` is equal to `__main__`, that tells us that someone has executed this directly, rather than importing it.

Whenever you import it, it gets the name tax. Whenever you run it directly as an argument to the Python command, it has the name main. The reason you would want to do that is if you wanted to execute this in a standalone fashion, rather than importing it.

With this `if` command, we can say we know someone's executing it as a Python command, so we're going to `import sys`. Then let's say `total` is equal to, converting to an `int(sys.argv[1])`. 

#### tax.py
```python
if __name__ == "__main__":
  import sys
  total(int(sys.argv[1]))
```

Now, if I use the python3 command, call the `tax.py` code, and supply an argument, it worked, but it didn't do anything with it.

#### Terminal
```bash
$ python3 tax.py 10
```

Let's actually print that out this time. 

#### tax.py
```python
if __name__ == "__main__":
  import sys
  print(total(int(sys.argv[1])))
```

Try that again, and we get 10.7. 

#### Terminal
```bash
$ python3 tax.py 10
$ 10.7
```

What this has done is it's given us a way to execute the tax.py code from the command line as a standalone, or we can still import it, and access that module directly.

I'm going to create one more function here. This one's going to be called `tax_amount`. It's going to have a parameter named `n`. We're going to specify our tax rate again, equal to `.07`. Then we're just going to return `n * tax_rate`, which is going to show us the total amount of tax for a given purchase.

#### Tax.py
```python
def tax_amount(n):
  tax_rate = .07
  return n * tax_rate
```

If go back over to `using_tax.py`, we have our `total` amount. Then we can also print `tax.tax_amount`. 

#### using_tax.py
```python
print(tax.total(7))
print(tax.tax_amount(7))
```

When we run that, we get two values. 

#### Terminal
```bash
$ python3 using_tax.py 
7.49
0.49000000000005
```

One's a total amount for our purchase with tax, and the other was just the amount of tax that was on it.

The reason I wanted to show you that is we imported tax up here, which imports both of those functions. If we only wanted to import one, we could say from tax, import taxAmount. That's only going to import the taxAmount function. We'll comment out the total, take off the dot notation there. Now, whenever we run it, we only return the tax amount. The reason you would want to do this is, for larger modules, you may not be using all of the functions defined within that module.

#### using_tax.py
```python
from tax import tax_amount

# print(tax.total(7))
print(tax_amount(7))
```

Using the `from` syntax, it allows you to only import the modules that you need, which reduces the memory footprint of your running Python code. There's no sense in loading things into memory if you're never going to use them.

#### Terminal
```bash
$ python3 using_tax.py
0.49000000000005
```

It keeps your code nice, tight, and concise, and allows it to scale better, more efficiently, and run faster ultimately.

