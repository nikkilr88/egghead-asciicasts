We've got a string, `hello`, saved into the variable `myString`. 

#### 3-transformers.js
```javascript
const myString = 'hello';
```

Now, let's call `toUpperCase` on it. 

```javascript
myString.toUpperCase();  /*?*/ HELLO
```

As expected, we get the uppercase version of hello. Calling `toUpperCase` won't actually change our string, but will return our transformed value.

We can easily make this transformation into its own function, so let's call that `toUpper`. 

Then, we'll take a string, and we're going to return that string then after calling `toUpperCase` on it. We forgot our arrow. 

```javascript
const toUpper = str => str.toUpperCase();
```

Then, we can call that with any string we want, and if we log out our original string, we can see that that still hasn't been modified.

```javascript
toUpper(myString);   /*?*/ HELLO
```

We've got a function here that, when given a value, returns a new transformed value. Now, let's see if we can compose this with some other operations. 

Let's create a new function called `shout` which will also take a string. This is going to return the same string, but with some exclamation marks on it.

```javascript
const shout = str => `${str}!!`;
```

Let's make sure we get back what we expect. 

```javascript
shout(myString); /*?*/ hello!!
```

As we can see, we get our string with our two exclamation marks. Now, let's try and combine our two string transformers. 

Let's create a new function called `scream`. That's going to take a string like before, but it's going to call `toUpper`, but as its input, it's going to call `shout`. Then, we pass the string in.

```javascript
const scream = str => toUpper(shout(str));
```

Now, if we run that, we can see we get a new string representation that combines both `toUpper` and `shout`. 

```javascript
scream(myString);  /*?*/ HELLO!!
```
The execution of `shout` gets passed as an argument into `toUpper`. As you can see, these transformers compose naturally as long as the input and output types don't change.

Anything that expects a string, like `toUpper`, for instance, doesn't care if that string comes from a string literal, or a function that produces a string, or a function that produces a function that produces a string, as long as the outcome is a string. That's why we can compose these functions together.

Our transformers are simple functions that take in some value and return a new representation of that value.