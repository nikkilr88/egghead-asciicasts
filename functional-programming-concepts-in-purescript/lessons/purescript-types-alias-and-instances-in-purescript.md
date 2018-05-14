Instructor: [00:00] We'll start off by typing `type PersonRec = { name :: String`. On the next line, we'll do `, age :: Int`, and then we'll close our curly braces. 

```
type PersonRec = { name :: String
                 , age :: Int
                 }
```

I'll explain what's going on in a minute, but first we'll create a new data constructor. We'll do that by saying `data Person = PersonA`, and then we'll reference `PersonRec`.

```
type PersonRec = { name :: String
                 , age :: Int
                 }
data Person = PersonA PersonRec
```

[00:26] Let's explain a bit of what's going on. The data constructor `Person` has a value of `PersonA`, which has a type of `PersonRec`. If we look at `PersonRec`, that has a record. One of its value is `name`, and that has a type of `String`. Its second value is `age`, and that has a type of `Int`.

[00:43] Let's create a function to use these. We'll call it `whoAmI`, and it has a type of `String -> Int -> Person`. On the next line, we'll do `whoAmI`, with the inputs `name` and `age`, and that `= PersonA { name, age }`. 

```
whoAmI :: String -> Int -> Person
whoAmI name age = PersonA { name, age }
```

Let's put this in action.

[01:03] We'll go down to line 17. After `show`, we'll type `whoAmI`, with the string `"Vince"` and the integer `99`. 

```
main = render =<< withConsole do 
    log $ show $ whoAmI "Vince" 99
```

Oh, we've got an error. It says "No type class instance was found for data.show.show person."

## Output
```
No type class instance was found for

    Data.Show.Show Person
```

[01:18] The reason this is happening is because we're using a function called `show`. We can't actually print anything out using `show`, because our data constructor `Person` doesn't have an instance to allow us to do this.

[01:29] Let's make an instance, so that should become a lot clearer. Instances start off with the keyword `instance`, and we'll call it `showPerson`. That has a type of `showPerson where`. Then, on the next line, we'll do a bit of pattern matching.

[01:41] We'll write out `show (PersonA { name, age }`. That'll equal a string of `"PersonA { name "` and we'll close off that string. We'll concatenate `show name`, which has been brought in from the pattern match. On our next line, we'll concatenate with another string of `", age: "`. We'll concatenate that with `show age`. Finally, we'll concatenate it a string as `"})"`.

```
instance showPerson :: Show Person where
    show (PersonA { name, age }) = 
        "PersonA { name: " <> show name
        <> ", age: " <> show age <> "})"
```

[02:11] Now that we've finished it, if you look to the right, it says persona, name, Vince, and the age, 99. 

## Output
```javascript
PersonA { name: "Vince", age: 99 }
```

Why did we need to do all that? In our function of `whoAmI`, we return a type `Person`, which is `PersonA`, and the object `name` and `age`.

[02:24] The thing is that we don't have anything to show this, so we have to build it ourselves. This is why we create the `instance`. The name of this `instance` is quite irrelevant and used to aid the readability of the output in JavaScript. If the type `show` is user to type `Person`, this is what our `instance` is going to deal with.

[02:41] On our next line, when we use `show` with `PersonA` and the record of name and age, then we want to return a string and use the function `show` to display our name and age as part of the string. Let's change things around a little bit. We'll change the int to `300` and the string to `you`. 

```
main = render =<< withConsole do 
    log $ show $ whoAmI "You" 300
```

You can see that's updated on the right-hand side.

## Output
```javascript
PersonA { name: "You", age: 300 }
```

[03:02] So you get an understanding of what we're doing with the string that we output, we'll change `name` on line 15 to `whatever`. If you look on the right, it says `PersonA { whatever: "You", age: 300`. The reason for creating an instance for `show` is because our type alias is a record. Those records, `name` and `age`, don't have an instance to how, so we manually need to create them.

[03:26] In this lesson, you were able to see type aliases, and that's where we created the record of `name` an `age`. Secondly, the `instance`, where we created an `instance` for `PersonA` to be able to work with `show`.