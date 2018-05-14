Instructor: [00:00] Let's make our data constructor with the keyword, `data Foo equals Foo | Bar String`. This is saying we have a `data` constructor of `Foo`, and it has two types of `Foo` and `Bar`, which expects a `String`.

[00:14] Let's make a function `runFoo`, with the types of `Foo -> String`. Now, we're going to do a bit of pattern matching. On the next line, `runFoo Foo = "Damn right, it's foo"`. If we look to the right, we have an error.

[00:28] What it's saying is that all the cases in the foo constructor haven't been covered. We've done `runFoo Foo`. Now, we also need to do `runFoo (Bar s) = "Yeah it's Bar and " <> s`

```
data Foo - Foo | Bar String

runFoo :: Foo -> String
runFoo Foo = "Damn right it's Foo"
runFoo (Bar s) = "yeah it's Bar and " <> s
```

[00:44] Those two symbols,  `<>`, represent string concatenation. In JavaScript, the equivalent would be `++`. Looking at `runFoo`, `bar`, `s`, we know that we expect our `s` to be a string. We're just concatenating two strings, which will be, "Yeah, it's bad," and whatever the string that we pass in.

[00:59] Let's see this in action by typing `runFoo foo`. 

```
main = render =<< withConsole do 
    log $ show $ runFoo Foo
```

As you can see, it outputs, `"Damn right, it's foo"`. If we look at `runFoo`, it did a pattern match on `Foo`, and gave us back the string, `"Damn right, it's foo"`. Let me explain something.

[01:11] It might be a little bit confusing when we look at `data Foo equals Foo | Bar String`. What we'll do is we'll change the second value to `Foo1`. On line 10, we'll change `Foo1` there. 

```
data Foo - Foo1 | Bar String

runFoo :: Foo -> String
runFoo Foo1 = "Damn right it's Foo"
runFoo (Bar s) = "yeah it's Bar and " <> s

main = render =<< withConsole do 
    log $ show $ runFoo Foo1
```

Now, you can see that on line nine, we have `runFoo`, which uses a data constructor of `Foo`, which tells us that we need to pattern match against `Foo` on and `Bar`.

[01:33] Let's test this out. We'll go to `runFoo`, and we will change it to `(Bar "his buddy"`. I'll `runFoo` function pattern matches on the `Bar`, and it takes the `s` as, `"His buddy"`. It concatenates `s`, which is, `"his buddy"`. It's, `"Yeah, it's bar and his buddy"`.

## Output
```
"Yeah it's Bar and his buddy"
```

[01:52] It should be added that if you were to do `runFoo Bar`, and then say `1`, the compiler would fail with a type error, because it is expecting a string. There you have it, some basic data constructors in PureScript.