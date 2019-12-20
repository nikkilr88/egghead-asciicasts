Let's take a look at the following code. We're going to `import sys`, and then we're going to `print` the conversion of an integer from `sis.argv1` which will be the first parameter passed after the file name and conversion of an integer from `sis.argv2`. 

#### errors.py
```python
import sys
print(int(sys.argv[1]) / int(sys.argv[2]))
```

When we run that, we used a Python command followed by the name of the file and then four and two, and we get the result of four divided by two.

#### Terminal
```bash
$ python3 errors.py 4 2 
```
So if I run that again and instead of giving it a number, give it a string, we get an error. 

```bash
$ python3 errors.py 4 foo 
```

You and I can read that and understand this error as a result of providing a string, not a number.

Users of your application may not have the skills or desire to interpret this error, so let's capture this error instead. We'll use a `try` except block where we'll execute the same code and then use an `except` to capture an exception that's raised, in this case, the value error. When that happens, we can take a separate action, and we can just print out a message, `'Something is wrong'`. 

#### errors.py
```python
try:
  print(int(sys.argv[1]) / int(sys.argv[2]))
except exception as e:
  print('Something is wrong')
```
Now when we execute that, we get our message, `Something is wrong`.

#### Terminal
```bash
$ python3 errors.py 4 foo 
Something is wrong
```

That's better, but we still haven't told our user how to recover and how to continue on. So we can do something then to just say, `You must enter a valid number`.

#### errors.py
```python
try:
  print(int(sys.argv[1]) / int(sys.argv[2]))
except exception as e:
  print('You must enter a valid number')
```

We'll run it again, and I get the message, `You must enter a valid number`. 

#### Terminal
```bash
$ python3 errors.py 4 foo 
You must enter a valid number
```

But what if I enter a `0`? Zero is a valid number, but we gave the wrong error message to the user.

#### Terminal
```bash
$ python3 errors.py 4 0 
You must enter a valid number
```

This is where we can start doing multiple exceptions. I'm going to comment this code out real quick and then just un-comment our original statement, just to show you the actual exception. When we entered a string, we got this value error. 

```bash
$ python3 errors.py 4 foo 

ValueError: Invalid literal for int() with base 10: 'foo'
```

That was the type of exception that was raised. When we tried to divide by zero, we got a zero division error, and that was the type of exception that it raised.

```bash
$ python3 errors.py 4 0 

ZeroDivisionError: division by zero
```

Now let's go back to our code and handle those specific exceptions. We'll change this one. Instead of handling a general exception, we'll catch the value error, and then we'll add another `except` block here. This one's going to handle the `ZeroDivisionError`. We'll tell them that `"You can't divide by zero"` whenever this one is triggered.

#### errors.py
```python
try:
  print(int(sys.argv[1]) / int(sys.argv[2]))
except ValueError as e:
  print('You must enter a valid number')
except ZeroDivisionError as e:
  print("You can't divide by zero")
```

Now let's test this out again. Here's our string and that tells them they must enter a valid number, and then dividing by zero, we tell them that you can't divide by zero.

#### Terminal
```bash
$ python3 errors.py 4 foo 
You must enter a valid number
$ python3 errors.py 4 0 
You cant divide by zero
```

There's two things I want to point out here. The first is this is generally how I go about writing my code. I'll write the code, and then I'll write unit tests that throw the common exceptions I'm expecting to see from the clients or from the application usage. Then I'll write the exception handlers to handle those specific types.

I got that from whenever we would throw it up here in our trace-back. When I provided it with a string, it threw the value error. Whenever I provided it with a zero, it threw the zero division error. That was the knowledge that I used to write the exception handlers up here.

The second thing I want to point out is that it's generally discouraged to just capture all exceptions using the general top level exception like this. The reason is because you only want to catch the exceptions that you know what to do with.

For example, in this case, whenever the user doesn't enter a valid number, we want to handle that explicitly and tell them why they threw the error. You could even go so far as to prompt them again using an input to enter a different number. On the other hand though, if you just captured that top-level exception, `ValueError` -> `Exception`, it's going to trigger for any exception including exceptions that you don't know how to handle. This can actually swallow those exceptions or bury them.

The general rule is just that if an exception happens, you either know what to do with it or you want to make absolutely certain that it gets seen. By letting that exception go un-handled, it causes your application to crash, throws out the logs. It's not the most graceful experience, but it does prevent that exception from being swallowed.

If you go to the [Python website](https://docs.python.org/3/library/exceptions.html), in the documentation, you can find the built-in exceptions. This is a really good place to start building your own knowledge about what exceptions exist and which ones might apply to you and which ones you might want to handle.

Another thing to note is that imported modules can extend the error class to raise errors specific to their purpose. For example, we could be using the request library for making API calls of an external API server.

If I do a quick Google search on Python request exceptions, it takes me right to the documentation for the [request library](http://docs.python-requests.org/en/master/_modules/requests/exceptions/). It shows me the different exceptions that are available here.

For example, there's a specific exception for a time-out if the server that you're calling times out. Then that will throw an exception which you can handle within your application and either try again or, if it's a user-type application, prompt the user that there was a time-out and offer them some suggestions of what they would like to do.