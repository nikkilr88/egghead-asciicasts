We can use the Python `open` method to open a file for write access. I'm going to open one called `cars.txt`. Specify the `'w'` for the write mode. Then create a list that contains a list of cars. Then we'll iterate across that list with `for car in cars`. We'll do `f` and call it a `write` method and pass in the name of the `car`.

#### files.py
```python
f = open('cars.txt', 'w')
cars = ['chevy', 'tesla', 'ford']
  for car in cars:
    f.write(car)
```

I'm going to execute this using the `python` command. 

#### Terminal
```bash
$ python3 files.py
```
Then I'm going to open up that `cars.txt` file. 

#### cars.txt
```txt
chevyteslaford
```

It listed our cars, but it did it all on one line. Let's clean that up. We will add a carriage return at the end of each line. 

#### files.py
```python
for car in cars: 
  f.write(car + '\n')
```

We'll save that. Run it again.

#### Terminal
```bash
$ python3 files.py
```

When we check the contents of our file, each car is listed on a separate line, but the original line that we had is missing. 

#### cars.txt
```txt
chevy
tesla
ford
```

Whenever you use the "w" as the file mode, that's a write mode. Write mode replaces the contents of the file every time it opens it.

If, instead, you want to append to it, you have to specify the append mode. 

#### files.py
```python
f = open('cars.txt', 'a')
```
We can do that and run this again. 

#### Terminal
```bash
$ python3 files.py
```
Now, when we take a look at the contents, you can see that it just added to the end of it.

#### cars.txt
```txt
chevy
tesla
ford
chevy
tesla
ford
```

Because my application is exiting here, the file logic's being implicitly closed by Python. In a longer running application, you need to specifically call the method to `close` your file. 

#### files.py
```python
f.close()
```

Or you can create a `with` block. We can iterate across that, just like before. Remember to add our new line character. Whenever this "with" block exits, it will close the file for us automatically. 

```python
with open('cars.txt', 'a') as f: 
  cars = ['chevy', 'vw', 'mazda']
  for car in cars: 
    f.write(car +'\n)
```

When we take a look in `cars.txt`, it's added on new lines to it and it closed the file for us.

```bash
$ python3 files.py
```

It's important that you either remember to close your file or you use a "with" block that automatically closes your file for you so that that file object's not remaining in memory. Eventually, once you're done using the file, the garbage collector will come along and free up that memory, but you really don't want to rely on if or when that's going to happen. 

Let me actually do another quick example here, just to show you that implicit close, whenever the program exits. I'm going to start a `python` shell here and then say `f = open`. We'll use that same file, `'cars.txt'`. Give it write access. Then do `f.write` and just say `'Hello'`. 

#### Terminal
```bash
$ python3
Python 3.7.0 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> f = open('cars.txt', 'w')
>>> f.write('Hello')
>>> f.close()
```

That write operation happened. If we take a look at the `cars.txt` file, whenever we open the file, it deleted the contents of it, but it hasn't written out the word "Hello" yet.

If I close it, that's when it actually does the write operation. 

#### cars.txt
```txt
Hello
```

That's what I was referring to up in `files.py`. Whenever the application exits, it implicitly calls this `close` method. In a longer running application, you'll see your file created, but you won't see the contents as you've written to it, because you didn't close it either by explicitly calling the `close` method or using a `with` block, like we did in the second example.

Working with JSON is going to be common for you as well. Let's create a JSON object called `cars`. It's going to be a list that contains a list of cars. We'll say that the `"make": "chevy"`. We'll have another one where the `"make": "tesla"`. Then we'll create a third one, where the `"make": "porsche"`.

#### files.py
```json
cars = [
  {"make": "chevy"},
  {"make": "tesla"},
  {"make": "porsche"}
]
```

Now, we can `import json`. We'll do a `with` block and say `open('cars.json')` with write access `as f:`. Then we can call the `json.dump` method, pass in our variable of `cars` and our file object `f`.

```python
import json
with open('cars.json', 'w') as f:
  json.dump(cars, f)
```

Then we'll execute that and take a look at our `cars.json` file that was created here. 

```bash
$ python3 files.py
```

There's our json object that was serialized and written out to a file.

#### cars.json
```json
[{"make": "chevy"}, {"make": "tesla"}, {"make": "porsche"}]
```