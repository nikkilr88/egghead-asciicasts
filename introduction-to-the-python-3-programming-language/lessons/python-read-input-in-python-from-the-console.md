In Python, we can receive input from the user using the Python input function. I'll create a variable called `name`, and then call the `input` function. We'll provide a string inside of that which is going to serve as our prompt to the user. Then we're just going to `print` out the results.

#### imput.py
```python
name = input('Name: ')
print(name)
```

To run that, type the `Python3` command followed by the name of my file, and it prompts me for my name. When I enter it, it returns it. So that's for Python 3.

#### Terminal
```bash
$ python3 input.py
Name: Will
Will
```

If it try to do it with Python 2, when I enter my name, it errors out. 

```bash 
$ python input.py
Name: Will
Will
```
The input function is only for Python 3. To do the same thing with Python 2, we need to use `raw_input`. 

#### input.py
```python
name = raw_input('Name: ')
print(name)
```

If we change it to raw_input and try that again, it works just like the Python 3 example did.

#### Terminal
```bash 
$ python input.py
Name: Will
Will
```

Once we have that variable from the input, we can use it just like we would with any other variable in Python. We can format a statement here that says, `"Hello, {0} nice to meet you!"`. We'll insert their `name` with the `format` method. 

#### input.py
```python
name = raw_input('Name: ')
print("Hello, {0}. Nice to meet you!".format(name))
```

If we run that, it returns the name formatted inside of the string.

#### Terminal
```bash 
$ python input.py
Name: Will
Hello, Will. Nice to meet you!
```

We can use this same pattern to prompt for multiple inputs as well. I can prompt for the `name`, I can prompt for the `job` and I can prompt for `location` and then combine all of that into a single print statement. Say, "Hi," insert their name, insert their job, and their location and use our format operator or our format method to grab those variables of `name`, `job`, and `location`.

#### input.py
```python
name = input('Name: ')
job = input('Occupation: ')
location = input('location: ')

print("Hi {0}, being a {1} in {2} must be exciting!".format(name,job,location))
```

Now if we try that out, we'll insert my name, my job, and where I'm at, and it returns a print statement. 

#### Terminal
```bash 
$ python3 input.py
Name: Will
Occpuation: Code Monkey
Location: Arizona
Hi Will, being a Code Monkey in Arizona must be exciting
```

We can even make this a little bit interactive. We'll get a `response` from them. Let's say if they respond with `yes` or a `y` or a `yeah`, we'll respond with, `"How exciting!"`. Or if they give us a negative response such as `no`, `n`, or `nope` I guess, we'll `print` out `"That's too bad!"`. Finally we'll say, `"I thought so too!"`, if they give us something that's not either positive or negative.

#### input.py
```python
response = input('Is it?')
if response in ('yes', 'y', 'yeah'):
  print("How exciting!")
elif response in ('no', 'n', 'nope'):
  print("That's too bad!")
else:
  print("Yeah, I thought so too!")
```

Let's run that now. My name's Will, occupation, code monkey, location is Arizona. There's our printed response. It says, "Is it?" I'll just say yeah. It says, "How exciting."

#### Terminal
```bash 
$ python3 input.py
Name: Will
Occpuation: Code Monkey
Location: Arizona
Hi Will, being a Code Monkey in Arizona must be exciting
Is it?
How exciting!
```

Everything we give through the input function is a string. If we try to do something like grab one number and then prompt them for a second number and then print out the sum of those two numbers, watch this. 

#### input.py
```python
num1 = input('Enter a number: ')
num2 = input('Enter another number: ')
print(num1 + num2))
```

We'll enter one and two, and it prints our 12, which is not what we want, because it's two strings. When you add two strings together, it just concatenates them.

#### Terminal
```bash 
$ python3 input.py
Enter a number: 1
Enter another number: 2
12
```

We need to convert those to integers.

#### input.py
```python
num1 = input('Enter a number: ')
num2 = input('Enter another number: ')
print(int(num1) + int(num2))
```

If we try that again, we get the response we were looking for, which was three.

#### Terminal
```bash 
$ python3 input.py
Enter a number: 1
Enter another number: 2
3
```