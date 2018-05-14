Instructor: [00:00] Before we explore the type option, you need to understand why it's needed. For example, if you try to bind null to the integer `age`, it doesn't work. Null simply does not exist. 

#### Terminal
```javascript
Reason # let age: int = null;
Error: Unbound value null
```

[00:12] This is great since `null` is the cause of many, many bugs. In fact, its inventor, Sir Tony Hoare, stated, I call it my billion-dollar mistake, was the invention of the null reference in 1965. 

[00:28] Nevertheless, null serves a purpose. Sometimes you want to refer to something, and don't know ahead if the corresponding value will be available. Reason, therefore, offers the variant option, shipping with the standard library. 

[00:43] An option has two constructors, for one's `None`, indicating that no value is available, and then `Some`, indicating that there is a value. It is passed in as an argument of any type. 

```javascript
Reason # None;
- : option('a) = None
Reason # Some(42);
- : option(int) = Some(42)
Reason # Some("Hello World");
- : optoin(string) = Some*"Hello World")
Reason # Some([1, 2, 3]);
- : option(list(int)) = Some([1, 2, 3])
```

We combine any of those to name. 

```javascript
Reason # let meaningOfLife = None;
let meaningOfLife: option('a) = None;
Reason # let meaningOfLife = Some("42");
let meaningOfLife: option(string) = Some("42");
```

As with any other variant, we can use it in combination with the `switch` expression. 

```javascript
Reason # let message = 
  switch (meaningOfLife) {
  | None => "Sadly I don't know"
  | Some(value) => "The meaning of life is: " ++ value
  };
let message: string = "The meaning of life is: 42";
```

[01:24] This is great. With option, we have a tool at our disposal that allows us to simulate a novel value while still being type-safe, meaning a pure Reason program doesn't have null errors. What a blaze.