Instructor: [00:00] First, let's write a function declaration called `myTypes` and give it a type of `Int`. Now, let's write the function itself, `myTypes = 1`. Let's explain a little bit about the type declaration. We have `myTypes`, two colons, and then the word `Int`. You can think of the two colons as the introduction of what type your function is. In this scenario, our function has a type of integer.

[00:22] Let's change the value of `myTypes` to `1.0`. The right-hand side of our screen is the output of the compiler. 

## Output
```
Error 1 of 1
Could not match type

    Number

with type

    Int
```

When our program compiled, the compiler noticed there was an error. It could not match type `Number` with type `Int`. Because we changed our value from `1`, which was an integer, to `1.0` which is a number, the compiler showed us the error.

[00:42] JavaScript does its error-checking at run time, but PureScript has a compiler, which makes sure that your program has no errors before it converts it all into JavaScript.

[00:50] Let's try another one. This time, we'll change our value to a `"string"`. As expected, the compiler's picked up an error. Let's make this right by changing our type declaration to `String`. Now, the compiler has no errors.

```javascript
myTypes :: String
myTypes = "string"
```

[01:02] Let's change our type declaration to `Boolean`. As you can see, the compiler picks up an error. Now, we'll change the actual value to be `true`. Once again, everything back to normal, and the code compiles.

```javascript
myTypes :: Boolean
myTypes = true
```

[01:14] It should be said that a compiler doesn't require these type declarations, but let's demonstrate why they are used in our next example. We're going to make a new function called `addMe`. Let's start our declaration. We'd write `Int -> Int -> Int`. This type declaration would be read int to int to int.

```javascript
addMe :: Int -> Int -> Int
```

[01:35] What does that mean? It takes an integer, another integer, and it returns an integer. Let me demonstrate that for you by writing `addMe a b = a + b`. The first int in our type declaration would be the `a`, the second int would be the `b`, and the returning int would be `a + b`.

```javascript
addMe :: Int -> Int -> Int
addMe = a b = a + b
```

[01:56] The way I simplify it in my mind is I look at the last type, and I think, "That's my return type of my function. And then, whatever values to the left of that are the types of the inputs to your function." In this case, we have two types, and we have two inputs, `a` and `b`.

[02:11] Let's see this function in action. We'll write `addMe 5 6`, which results in `11`. 

```
main = render =<< withConsole do 
    log $ show $ addMe 5 6
```

This is exactly what I would expect because we're adding `a` and `b`, which is `5` + `6`. Now, let's make our second value a string of `"a"`. Straightaway, you'll see the compiler show an error. It "Could not match the type String with Int".

[02:31] In a language like JavaScript, that would have worked. It would have just returned a string, `5a`. But, PureScript has a type system to catch out these types of errors. We have a function that expects two integers, but we've passed an integer and a string. Straightaway, the compiler will notice that that's an error because it wants two integers, not an integer and a string.

[02:51] Let's switch that back. We'll have `addMe 5 5`, which returns the expected `10`. 

```
main = render =<< withConsole do 
    log $ show $ addMe 5 5
```

As I mentioned before, technically, the type declarations aren't needed. If you didn't type them in, the compiler would infer them for you. What it is great for is to let you know in the future exactly what your function does. For this instance, we expect two Int's, and we'll return an Int.

[03:12] There you have it, a simple introduction to types in PureScript.