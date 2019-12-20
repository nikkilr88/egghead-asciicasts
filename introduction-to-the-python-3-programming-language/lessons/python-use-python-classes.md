I'm going to start just by creating a generic class, and call it `Ball`. It's going to have a property called `color`, and I'm going to set it to the value of `'red'`. 

#### ball.py
```python
class Ball:
  color = 'red'
```

In my lower pane here, I'm going to open a Python console. I'm going to access that ball class and say `from ball`, which is the name of my file, `import ball`. That's going to import my class. I can create a new instance of that by creating a variable name. I'll call it `myBall`, and say that it's equal to an instance of the class `Ball()`.

#### Terminal
```bash
$ python
Python 2.7.13 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from ball import Ball
>>> my_ball = Ball()
```

Then if I want to see the properties of it -- in this case, the color -- I can use dotted notation, and it returns the value for that attribute. Using this ball class, every instance of the class will have the color red.

```bash
>>> my_ball.color
'red'
```

If I create `another_ball`, and then we check the `color` attribute of it, it's red also. 

```bash
>>> another_ball = Ball()
>>> another_ball.color
'red'
```

Most of the time, you're probably going to want to set some default properties for your class objects. For instance, we want to know about the `radius`, `color`, and `weight` of each particular ball.

To do that, a class uses a special double under, `__init__`, method that gets called when the class is created. We'll define it, and then it requires some properties. First, it gets a copy of itself, and then the properties that we want to define.

#### ball.py
```python
class Ball:
  def __init__(self, radius, color, weight):
``` 

We said we wanted a `radius`, `color`, and the `weight`. What I'm going to do is I'm going to specify that `self.radius`, or basically this is another way of saying the radius of the instance that's being created is going to be equal to the radius that was passed to the init method whenever the instance was created. Same thing for color, and it's true for the weight as well. I'll save that, and then I'm going to switch back down to my console here. 

```python
self.radius = radius
self.color = color
self.weight = weight
```

Because we're just running the interactive console, and we've already imported the ball class, I need to exit the console, and then go back into it so that we can reimport it.

That's only a factor because of the way I'm explaining to you how the class works. Most of the time, this is never going to come up, so I wouldn't worry about it too much. 

We'll create a `red_ball`. That's going to be an instance of the `Ball` class. It's going to have a radius of `10`, a color of `'red'`, and weight of `2` pounds. Then we'll create a `blue_ball`. It's going to be a separate instance of the class with a radius of `12`, color of `'blue'`, and a weight of `5`. 

#### Terminal
```bash
>>> from ball import Ball
>>> red_ball = Ball(10, 'red', 2)
>>> blue_ball - Ball(12, 'blue', 5)
```

If we take a look at the `red_ball.color`, it's red, and the `red_ball.weight` is two. Then for the `blue_ball`, just to show you how that works, the color is blue, and the weight of it is five.

```bash
>>> red_ball.color
'red'
>>> red_ball.weight
2
>>> blue_ball.color
'blue'
>>> blue-ball.weight
5
```

Each instance of the class has its own set of properties that can be different from all other instances. These are known as the instance attributes, meaning that they're different for every object. In the first example, when we define the color red, that's known as a class attribute, because it's the same for every object instantiated from that class.

Objects instantiated from a class can have default methods as well. Let's create another new class here, and we'll call this one `Football`. We'll start by giving it a docstring, and say that it's just `"""A standard, regulation NFL ball"""`.

#### ball.py
```python
class Football:
  """A standard, regulation NFL ball"""
```

Then we'll give it our `__init__`, which receives `self` as the first argument. Then it has an argument for `diameter`, `color`, and `pressure`. We'll set each of these equal to the parameters specified when the class is instantiated. Then we'll give it a couple of default methods.

```python
def __init__(self, diameter, color, pressure):
  self.diameter = diameter
  self.color = color
  self.pressure = pressure
```

We'll give it an inflate method that takes itself as the first argument, and then the `psi` change. We'll say `self.pressure` is equal to `self.pressure` plus the `psi` change for when the `inflate` method is called. 

```python
def inflate(self, psi):
  self.pressure = self.pressure + psi
```
Then our other function will be `deflate`, again receiving itself and then the `psi` change. We'll say `self.pressure = self.pressure - psi`.

```python
def deflate(self, psi):
  self.pressure = self.pressure - psi
```

I'm going to save that, go back into my Python console, and then from ball, I'll `import` the football class. Then we'll create a football for the `bears` that's just going going to be a standard regulation `Football`. It'll have a diameter of `22` centimeters, a color of `'brown'`, and a pressure of `13` pounds.

#### Terminal
```bash
$ python
Python 2.7.13 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from ball import Football
>>> bears = Football(22, 'color', 13)
```

We'll create a ball for the `packers` as well. Again, another standard regulation `Football`, `22` centimeter diameter. The color's going to be `'brown'`, and I now see that I typed the word color up there instead of the word brown, because I can't type and talk at the same time. That's OK. It's not going to affect our example. This one will be `13` PSI. 

```bash
>>> packers = Football(22, 'brown', 13)
```

Let's take a look at the Bears' color, just for fun, and then Bears' pressure. Now, if the Bears inflate their ball by two PSI, it goes up to 15.

```bash 
>>> bears.color
'color'
>>> bears.pressure
13
>>> bears.inflate(2)
15
```

For the Packers, their pressure is currently at 13. If the Packers deflate their ball by one pound, it drops it down to 12 pounds. 

```bash 
>>> bears.pressure
13
>>> bears.deflate(1)
12
```

Now, watch this. I'm going to close the terminal out of the way so that I get a little more room on the screen here. We've got our class football, and classes can inherit other classes. I'm going to create a class called `PatriotsBall`. It's going to inherit the call `Football`. It's going to get everything defined in the football call, and inside of it, I can create a function called `inflate`.

#### ball.py
```python
class PatriotsBall(Football):
  def inflate(self, psi):
    self.pressure = self.pressure - psi
```

The `inflate` function, whenever called, is going to actually reduce the pressure of the ball by the amount specified. Let's see how that works. I'll scroll this up so you can see it here. 

Go back into our Python console, and then `from ball import PatriotsBall`.

#### Terminal
```bash
$ python
Python 2.7.13 (default, Sep 18 2018, 18:48:06) 
[Clang 8.0.0 (clang-800.0.42.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> from ball import PatriotsBall
```

Remember, the ball that I specified there with from ball is the name of the Python file I'm importing from. Create a new instance variable called `patriots`, which is going to be equal to `PatriotsBall`. It inherited from ball, so it as the same default options. We'll give it a standard NFL diameter of `22` centimeters, a color of `'brown'`, and then pressure of NFL regulation `13` pounds. 

```bash
>>> patriots = PatriotsBall(22, 'brown', 13)
```

Let's check the pressure on the Patriots' ball. It's 13. Now, the referees ask the Patriots to `inflate` their ball by two pounds. Now, when we check the pressure, the pressure is actually down to `11`.

```bash
>>> patriots.pressure
13
>>> patriots.inflate(2)
>>> patriots.pressure
11
```

I did all of that to show you that functions defined in a class can be overridden because they aren't protected in any way. Tom Brady approves of this behavior, but for you, I would recommend verifying the attributes and methods of any class you're inheriting, before extending it, and possibly overriding a default behavior that you may later need.

To do that, remember that you can use the `dir` command, and it will show you the methods that get defined whenever that's created. 

```bash
>>> dir(PatriotsBall)
['__doc__', '__init__', '__module__', 'deflate', 'inflate']
```

Then if you do `dir` on an instance of that class, you also get the attributes belonging to that instance as well. In this case, not only the `inflate` and `deflate` methods, but the color, diameter, and pressure as well. 

```bash
>>> dir(patriots)
['__doc__', '__init__', '__module__', 'color', 'deflate', 'diameter', 'inflate', 'pressure']
```
