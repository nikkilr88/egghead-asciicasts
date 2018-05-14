Instructor: [00:00] This is how an anonymous function looks like. 

#### Terminal
```javascript
Reason # (x) => x + 1;
- : int => int = <fun>
```

A function is defined by one or more parameters inside parenthesis, then an arrow followed by the body. In case it's only oneparameter, the parenthesis can be omitted. 

[00:13] Using `let`, we can bind the function to the name `plusOne`, call the function -- we use its name -- followed by the arguments within parenthesis. 

```javascript
let plusOne = x => x + 1;
let plusOne: int => int = <fun>;
Reason # plusOne(4);
- : int = 5
```

Before we move on, one brief remark on the wording. 

[00:26] In casual conversations, the terms parameter and argument are often used interchangeably. Technically,they have a different meaning. A function accepts parameters. When calling the function with concrete values, these are the arguments. In this lesson, I try my best to use these terms correctly. Let's get back to it. 

[00:46] Not sure if you already noticed it, but it wasn't necessary to declare a type of the parameter, nor the type of the return expression. If we want to, we can provide the types explicitly. The type of a parameter is declared after a colon, right after a parameter's name. The return type comes after the closing parenthesis and before the arrow. 

```javascript
Reason # let add = (x: int, y: int) : int => x + y;
let add: (int, int) => int = <fun>;
Reason # add(1, 3);
- : int = 4
```

[01:10] Keep in mind we can leave out each of these type declarations independently from each other. For example, we could let the parameter `y` be inferred, or we could remove the return type. In case of more complex functions, we can open a local scope by surrounding the body with a block. 

[01:27] Here, we want to add an integer to a float, and the result should be a float. When using a block, the last expressionis always returned, and since there is no return keyword, there is no such concept as an early return inside a function. 

```javascript
Reason # let add = (x, y) => {
  let z = fload_of_int(x);
  y +. z;
};
let add: (int, float) => float = <fun>;
```

So far so good. 

[01:43] Another feature of the language its partial application of arguments. To demonstrate it, we use an add function. We can add two integers together by calling the function with two arguments. Providing one argument is also possible. 

```javascript
Reason # let add = (x, y) => x + y;
let add: (int, int) => int = <fun>;
Reason # add(3, 2);
- : int = 5
Reason # add(3);
- : int => int = <fun>
```

[01:59] Instead of throwing an error, it will return as a function where only one, in our case the second parameter, needs to be provided. Let's bind the function to a name and use it. 

```javascript
Reason # let addThree = add(3);
let addThree: int => int = <fun>;
Reason # addThree(2);
- : int = 5
```

Voila. Same result, different path. 

[02:16] Alternatively, we could call the functions directly one after another. This functionality comes out of the box for every function in Reason, and it's called carry. It turns this definition into this one. 

```javascript
(x, y) => x + y;
- : (int, int) => int = <fun>
Reason # (x) => (y) = x + y;
- : (int, int) => int = <fun>
```

In fact, as you can see, it even renders the output of both the same way. Of course, this works with more parameters as well. 

[02:45] We can provide all arguments or just partially apply them. By the way, partially applying multiple arguments works as well. Now, you might wonder why is this useful. Let me demonstrate to give you anexample. 

[03:03] We have a list of numbers and we want to increase every item by four. To do so, we use our add function. We can use the function `list.map`. It accepts a function as a first parameter and the list as the second. 

```javascript
Reason # let numbers = [4, 11, 5];
let numbers: list(int) = [4, 11, 5];
Reason # let add = (x, y) => x + y;
let add: (int, int) => int = <fun>;
Reason # List.map(x => add(4, x), numbers);
- : list(int) = [8, 15, 9]
```

[03:17] Next up, we want to achieve the same result leveraging partial application. If we use `add` with the argument `4`, we get back a function accepting one parameter. 

```javascript
add(4);
- : int => int = <fun>
```

In our case, this matches exactly the signature that `list.map` accepts, meaning we can write this. 

```javascript
Reason # List.map(add(4), numbers);
- : list(int) = [8, 15, 9]
```

Is it better? That depends on your taste. This version is certainly more concise compared to this one. 

```javascript
Reason # List.map(x => add(4, x), numbers);
- : list(int) = [8, 15, 9]
```

[03:50] While this being a simple example, partial application of arguments makes functions more versatile, and can come in quite handy. In case you heard about partial application and carrying for the first time and think it's a lot to take in, don't worry. Let it sink in a bit. In the meantime, move on to another feature, `label` parameter. 

[04:09] So far, we have only seen position parameters. Add a `~` sign before a parameter, and that's all you need to declare a parameter as labeled. 

```javascript
Reason # let name = (~firstName, ~latName) => firstName ++ " " ++ lastName;
let name: (~firstName: string, ~latName: string) => string = <fun>;
```

When invoking the function, we can name the arguments then.

```javascript
Reason # name(~firstName="Jane", ~lastName="Doe");
- : string  "Jane Doe"
```

[04:29] The benefit here is that we can provide them in any order. This helps us a great deal to not screw up when invoking a function. Where labeled parameters really start to shine, though, is in combination with partial application. 

[04:43] We also can choose which argument to apply first when labelling. 

```javascript
Reason # name(~lastName="Doe")(~firstName="Jane");
- : string = "Jane Doe"
```

It's also possible to expose a label parameter with a specific name and use the s-something syntax to refer to the parameter in a function body with a different name. 

```javascript
Reason # let name = (~firstName as f, ~lastName as l) => f ++ " " ++ l;
let name: (~firstName: string, ~lastName: string) => string = <fun>;
Reason # name(~firstName="Jane", ~lastName="Doe");
- : string = "Jane Doe"
```

[05:01] In addition, labeled, but only labeled parameters, can have a default value. If we call the function with all three arguments, the output is, as expected, the full name. 

```javascript
Reason # 
let name = (~firstName, ~middleName="Francis", ~lastName) => {
  firstName ++ " " ++ middleName ++ " " ++ lastName;
};
let name: (~firstName: string, ~middleName: string=?, ~lastName: string) => string = <fun>;
Reason # name(~firstName="Jane", ~middleName="Kim", ~lastName="Doe");
- : string = "Jane Kim Doe"
```

There's one problem, though. If we leave out the middle name, we get back a function. 

```javascript
Reason # name(~firstName="Jane", ~lastName="Doe");
- : (~middleName: string=?) => string = <fun>

```

[05:36] We get back a function because the original function is curried, and we applied the two arguments partially. It expects `middleName` to be provided where we don't intend to pass it in. Since `Francis`, its default value, we expected the full name with the middle name being `Francis`. 

[05:53] In a nutshell, there's a conflict of expectations. Therefore, the Reason core team's recommended practice is to add a positional parameter at the end. Conventionally, this parameter is of type unit. This way, we can call the function with or without the `middleName`. 

```javascript
Reason # name(~firstName="Jane", ~middleName="Kim", ~lastName="Doe", ());
- : string = "Jane Kim Doe"
```

[06:11] In addition, labeled parameters, but again, only labeled parameters, can be completely optional using a question mark after the equal sign. When using the syntax, middle name is wrapped in the standard library's option type and defaulting to none. 

```javascript
Reason # name(~firstName, ~middleName=?, ~lastName, ()) => {
  firstName ++ " " ++ middleName ++ " " ++ lastName;
}:
Error: This expression has type option('a) but an expression was expected of type string
```

[06:28] This means we need to change the body of our function. We use the `switch` expression to add the `middleName` value in case the parameter is provided and ignore it in case the parameter is omitted. 

[06:40] Since we have faced the same conflict of carrying and optional parameters as before, we keep the only parameter at the end. 

```javascript
Reason # name(~firstName, ~middleName=?, ~lastName, ()) => {
  switch (middleName) {
  | Some(value) => firstName ++ " " ++ value ++ " " ++ lastName
  | None => firstName ++ " " ++ lastName
  };
}:
let name: 
  (~firstName: string, ~middleName: string=?, ~lastName: string, unit) =>
  string = <fun>;
```

Invoking name with or without the middle name now works as expected. 

[06:53] To avoid a lot of tedious `switch` expressions, Reason comes with a shortcut syntax to explicitly pass in an option. 

```javascript
Reason # let someName = Some("Francis");
let someName: option(string) = Some("Francis");
Reason # name(~firstName="Jane", ~middleName=?someName, ~lastName="Doe", ());
- : string = "Jane Francis Doe"
```

Reason also provides punning syntax for arguments. Even in case for explicitly passing in an option, here the question mark has to be placed after the name. 

```javascript
Reason # name(~firstName="Jane", ~middleName=?, ~lastName="Doe", ());
- : string = "Jane Francis Doe"
```

[07:18] There are two more gotchas I want to make you aware of regarding parameters. For once, it's possible to pass positional arguments to labeled parameters. For example, when we define `name` like this, we can call it like this. 

```javascript
Reason # let name = (~firstName, ~lastName) => firstName ++ " " ++ lastName;
let name: (~firstName: string, ~lastName: string) => string = <fun>;
Reason # name("Jane", "Doe");
- : string = "Jane Doe"
```

[07:38] While exploring the language, I discovered some edge cases. In general, I recommend you just stay away from it, and rather explicitly label your arguments. The second gotcha is that functions technically always need at least one parameter. 

[07:53] Sometimes, though, we need functions that don't expect any parameter. That's why, out of the box, Reason comes with syntax sugar to accept the unit type in case no parameter has been provided. The same syntax sugar exists for calling the function. Very convenient. 

```javascript
Reason # let hello = (()) => "Hello!";
let hello: unit => string = <fun>;
 Reason # let hello = () => "Hello!";
let hello: unit => string = <fun>;
Reason # hello(())
- : string = "Hello!";
Reason # hello()
- : string = "Hello!";
```

[08:16] One last thing about parameters. In some cases, we have to implement functions that match our parameters to the call list arguments. One example would be `List.map`. `List.map` expects a function that always accepts one parameter. 

[08:32] What about the case when we just want to reset all list items to zero? We don't need the item. Here, the parameter should be prepended with an underscore. As an alternative, we could even only use an underscore. Personally, I prefer underscore item since it's more descriptive.