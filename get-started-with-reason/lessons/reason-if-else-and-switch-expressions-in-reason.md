Instructor: [00:00] `if/else` allows us to perform different expressions based on the provided condition. The condition inside the parenthesis must be Boolean and determines if the first or the second branch is evaluated. 

[00:12] In Reason, if is an expression and therefore can be reduced to a value. This means it can be bound to a `let` binding. In other languages -- for example, JavaScript -- `if` is a statement, not an expression. Trying to bind it to a name would throw a syntax error. Let me demo this briefly in a JavaScript GREPL and try the same construct. 

#### Console
```javascript
if (true) {"Good Morning"} else {"Hello"};
"Good Morning"
```

[00:42] It even seems like good morning's returned, but if you try to assign it to a variable, 

```javascript
var a = if (true) {"Good Morning"} else {"Hello"};

Uncaught Syntaxerror: Unexpected token if
```

the REPL correctly complains about the syntax error. Back to Reason. 

[00:53] While the fact that `if` is an expression can be quite useful, it also comes with its limitations. Every branch -- often `if/else` -- needs to evaluate to the same type, which means we can't do the following. 

#### Terminal
```javascript
Reason # let greeting = if (isMorning) {"Good Morning"};

Error: This expression has type string but an expression was expected of type unit
```

That's because in the case, no else branch is provided. It automatically returns the type unit for a not defined `else` case, like this example. 

```javascript
Reason # let greeting = if (isMorning) {"Good Morning"} else {()};

Error: This expression has type unit but an expression was expected of type string
```

[01:24] This means we can still use `if` for side effects like printing a value as long as the last statement returns the type unit. `print_endline` does so. 

```javascript
Reason # if (isMorning) {print_endline("isMorning is set to true")};

isMorning is set to true 
- : unt = ()
```

Let's move on to the `switch` expression. 

[01:43] It accepts a value and matches it against the `pattern`. The case of the matching pattern, which has to be an expression, then is evaluated. In its simplest form, `pattern` just matches for structural equality. For example, when matching integers, we know that one equals one but doesn't equal zero. 

```javascript
Reason #
/*
switch (<value>) {
| <pattern1> => <case1>
| <pattern2> => <case2>
...
}
*/
();
- : unit = ()
```

[02:05] Let's see an example. For a `lamp` UI interface, we want to convert `0` and `1` to the strings of off and on, pretty straightforward using switch and matching these two numbers. 

```javascript
Reason # let lamp = 
  switch (1) {
  | 0 => "off"
  | 1 => "on"
  };

Characters 12-58:
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
2
let lamp: string = "on";
Reason # lamp;
- : string = "on"
```

Worked as expected. The string value on is bound to the name `lamp`. By the way, this is possible because in Reason, `switch` is also an expression. 

[02:27] There is one issue, though. We get a warning that our pattern matching is not exhaustive, and it provides us with a hint that we didn't cover the example value `2`. It's only a warning, so we could ignore it and move on prototyping our application. 

[02:42] On the other hand, who knows what a possible data source might send? As long as it's an integer, we could even receive two or three at some point. To rule out potential bugs, we could cover the whole integer space, make sure the `lamp` is turned off for every input other than one. 

```javascript
Reason # let lamp = 
  switch (1) {
  | 0 => "off"
  | 1 => "on"
  | 2 => "off"
  | 3 => "off"
  };

Characters 12-58:
Warning 8: this pattern-matching is not exhaustive.
Here is an example of a value that is not matched:
4
let lamp : string = "on";
```

[03:00] Covering the whole integer range would be quite tedious, though. That's why Reason provides us with a special fall-through case. Will our match conditions go to that branch then? To implement such a fall-through case, we can either provide a name as we would do for a `let` binding or a `_` in case the value isn't used in a case. First, we explore the version using the underscore. 

```javascript
Reason # let lamp = 
  switch (1) {
  | 0 => "off"
  | 1 => "on"
  | _ => "off"
  };
Reason # lamp;
- : string = "on"
```

[03:27] Now we can change the provided value to, for example, `1003`, and still get the desired result. If we want to extract the value, we can give it a name. We can use the name, for example to log a warning, and still return the valid result `"off"`. 

```javascript
Reason # let lamp = 
  switch (1003) {
  | 0 => "off"
  | 1 => "on"
  | other => {
    print_endline("Invalid value: " ++ string_of_int(other));
    "off";
  }
  };
Invalid value: 1003
let lamp: string = "off";
```

Pattern matching can be done with any type. Here is an example matching a string. 

```javascript
switch ("Hola") {
| "Hello" => "English"
| "Salut" => "French"
| _ => "Unknown"
};
- : string = "Unknown"
```

[04:06] So far, so good. Until now, we only use pattern matching using structural equality and the fall-through case. Pattern matching, though, has a lot more features. We will explore them later in a pattern matching lesson.