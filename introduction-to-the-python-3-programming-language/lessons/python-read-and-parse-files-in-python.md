We've got a CSV file here with three data points in each row. It includes a name, the type of animal it is, and then a true false value to indicate whether or not it's housebroken.

#### animals.csv
```csv
Will,human,True
Dennis,dog,True
Phelps,toad,False
Hootie,owl,False
Vonni,human,True
```

The Python open method returned a file object that makes it easy to work with files. It's built into Python, so we don't need to do anything other than type the name of our variable and then use the open method, specify the name of our file, and then the mode that we want to open it in.

I'm using the R to specify read or you can also specify W for write or A for append. If you don't specify anything at all, read mode is assumed.

#### files.py
```python
f = open('animals.csv')
```

Using our file object, we can print out each line with something like `for line in f` and then just print out the line. 

```python
f = open('animals.csv')

for line in f: 
  print(line)
```

I can execute it with the Python 3 command and then the name of the file I've been working in which is `file.py`. It prints out each line from the CSV.

#### Terminal
```bash
$ python3 files.py
Will,human,True

Dennis,dog,True

Phelps,toad,False

Hootie,owl,False

Vonni,human,True
```
In long-running files, you're going to want to remember to close your file as soon as you're done reading that using the `close` method. If you don't do that, the file's going to remain open and continue using memory in your application. The Python garbage collector will eventually free that memory, but you don't want to rely on when or if that happens.


You can either close it using the `close` method or comment that out. 

#### files.py
```python
f.close()
```

You can use a `with` block. We'll do `with open`, provide our file name again, specify our mode, and then give it a variable name of `f`. Then we can call the `read` method of our variable `f`. When this with block exits, it will automatically close that file for you.

```python
# f = open('animals.csv')

# for line in f:
#     print(line)

# f.close()

with open('animals.csv', 'r') as f:
  print(f.read())
```

We print that again, and it returns the same output, basically just reading through each line of the file, printing that out.

#### Terminal
```bash
$ python3 files.py
Will,human,True
Dennis,dog,True
Phelps,toad,False
Hootie,owl,False
Vonni,human,True
```

We're working with a CSV file, so let's take advantage of some of the features for working with CSV. I'm going to `import csv` module which is a core Python module. Then we'll start our `with` block again, open up our CSV file, still using read mode, and give it a variable name of f.

#### files.py
```python
import csv
with open('animals.csv', 'r') as f:
```

I'll create a variable called `animals` using the CSV reader method and give it the file object we created in our `with` block. Now we can iterate across that and say `for row in animals`, and each row is a list of the variables contained in the CSV row.

```python
with open('animals.csv', 'r') as f:
  animals = csv.reader(f)
  for row in animals:
```

If you remember the third column in our CSV file is a string with the word true or false indicating whether or not the animal is housebroken. Using that, we can say `if row[-1]` which will grab the last element or the last item from that row object, can say if that's equal to `'True'`, then we can `print` out the name and the type of animal it is and indicate that it's housebroken.

We use our format method to grab the positional operators there. We'll grab the first item in the list and the second item in the list which will be the name of the animal and the type of animal. 

```python
if row[-1] == 'True':
  print("{0} is a {1} and is  housebroken".format(row[0], row[1]))
```

Then we'll deal with the false conditions by grabbing the last item, saying if that's equal to `'False'`, we'll print out a very similar statement except that we'll indicate that it's not housebroken.

```python
elif row[-1] == 'False':
  print("{0} is a {1} and is not housebroken!".format(row[0], row[1]))
```

Now when we run that, it's iterated through our CSV file, inserted the name of the animal, the type animal, and used our logic for true or false to indicate whether or not it's housebroken.

#### Terminal
```bash
$ python3 files.py
Will is a human and is housebroken
Dennis is a dog and is housebroken
Phelps is a toad and is not housebroken!
Hootie is a owl and is not housebroken!
Vonni is a human and is housebroken
```

We can do the same thing with JSON files as well or very similar thing anyways. I've got this JSON file here that has the same data in it except it's formatted in JSON instead of a CSV file. If we go back to our code that we're working on here, we'll comment this out.

#### animals.json
```json
[
  {"name": "Will", "type": "human", "housebroken": "True"},
  {"name": "Dennis", "type": "dog", "housebroken": "True"},
  {"name": "Phelps", "type": "toad", "housebroken": "False"},
  {"name": "Hootie", "type": "owl", "housebroken": "False"},
  {"name": "Vonni", "type": "human", "housebroken": "True"}
]
```
Now we'll `import json`, use our `with` block to open our `animals.json` file with read mode, and then we'll say `data = json.load`, which is going to read in that file object we created. For now, let's just `print` that out so I can show you what it looks like.

#### files.py
```python
import json
  with open('animals.json', 'r') as r:
    data = json.load(r)
      print(data)
```

 It just printed out the JSON object itself. The way the JSON's formatted is it's an array and inside of each array are the key value pairs for each item.

#### Terminal
```bash
$ python3 files.py
 {"name": "Will", "type": "human", "housebroken": "True"}, {"name": "Dennis", "type": "dog", "housebroken": "True"}, {"name": "Phelps", "type": "toad", "housebroken": "False"}, {"name": "Hootie", "type": "owl", "housebroken": "False"}, {"name": "Vonni", "type": "human", "housebroken": "True"}
```

Let's get rid of this and then we'll iterate through this. We'll say `for row in data`, and since it's JSON data, we can say `row` and then grab the key name that we want to print out. We'll grab the `name` key and `print` out its value. 

```python
import json
with open('animals.json', 'r') as r:
  data = json.load(r)
  for row in data:
    print(row['name'])
```
When that runs, it reads in the JSON, converts it to a JSON object. We iterate through that object, find the key value pair with the key of name, and print out its value.

```bash
$ python3 files.py
Will
Dennis
Phelps
Hootie
Vonni
```