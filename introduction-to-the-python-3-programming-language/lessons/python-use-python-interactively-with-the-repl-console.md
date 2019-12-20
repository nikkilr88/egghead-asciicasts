
If I just type the `python` command, it takes me into the REPL interface, or the interactive Python console. I can type `2 + 2`, and that returns `4`, and so REPL stands for Read Evaluate Print Loop.

#### Terminal
``` bash
>>> 2 + 2
4
```

When I typed `2 + 2`, that was the read phase. I hit enter, it evaluated it, and then it printed `4` and looped back again, back to the cursor, waiting for my next input.

You can do anything here that you would do in a Python application. I can type `print "Hello world"`, and it prints out, or I can use `print` as a function, and that works, too, but let me show you this real quick.

``` bash
>>> print "Hello world"
Hello world
>>> print("Hello world")
Hello world
```

If I go into `python3` -- this is one of the differences between Python 2 and Python 3 -- `print` is available only as a function in Python 3. 

```bash
>>> print "Hello world"
  File "<stdin>", line 1
    print "Hello world"
                      ^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print("Hello world")?
>>> print("Hello world")
Hello world
```

You can also import modules like the `datetime` module, and use that.

Like I just mentioned, `print` is a function in Python 3, so that didn't work. There it prints out the `current datetime`, or the `datetime` is whenever we established that variable.

``` bash
>>> import datetime
>>> now = datetime.datetime.now()
>>> print(now)
2018-09-18 14:28:58.514086
```


You can also create functions. We can say `add(num1, num2)`, and then `return num1 + num2`. We can call that function by calling the function and passing in our parameters, and it returns a sum.

```bash
>>> def add(num1, num2):
...     return num1 + num2
... 
>>> add(1,2)
3
```

Here's the one caveat to using the REPL interface. Whenever I exit this, if I go back into it and I try to run my `add` function again, it doesn't exist, because whenever you close out the REPL interface, all the functions that you created, all the work that you've done has been destroyed unless you saved it out to a file.