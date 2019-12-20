Let's create a script that we're going to execute with Python. 

#### Terminal
```bash
$ vim hello.py
```

We can do something as simple as say `print("hello world!")`. 

#### hello.py
```python 
print "Hello world"
```

We can execute that by just typing `Python` and then passing in the name of the script and `execute`.

#### Terminal
```bash
$ python hello.py
Hello world
```
If we wanted to use `Python 3`, we need to call `print` as a function, save that, and then we can call it with the `Python 3` command and again pass in the script name and it executes as well.

#### hello.py
```python
print("Hello world")
```

#### Terminal
```bash
$ vim hello.py
$ python3 hello.py
Hello world
```

We can also make this a stand-alone executable. We'll include our shebang here and then pass in `userbin env` and tell it to find the Python environment. We need to mark that as executable, so we'll modify the attributes to include the executable bit. Now, we can type inaudible 0:48 hello.py and it runs as well there.

#### hello.py
```python
#! /usr/bin/env python

print("Hello world")
```

#### Terminal
```bash
$ vim hello.py
$ chmod +x hello.py
$ ./hello.py
Hello world
```