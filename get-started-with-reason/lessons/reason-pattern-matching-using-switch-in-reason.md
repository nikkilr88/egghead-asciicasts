Instructor: [00:00] We have touched pattern matching in previous lessons. For example, simple leveraging its simplest form matching for structural equality. 

#### Terminal
```javascript
Reason # switch("Hello") {
| "Hello" => "English"
| "Bonjour" => "French"
| _ => "Unknown"
};
- : string = "English"
```

Because of structural equality, it also works with other data types like tuples, lists, variants, or records. We can pattern match on `myTodo` tuple that has a description string and a check Boolean.

```javascript
Reason # switch (myTodo) {
| ("redesign website", true) => "Congrats"
| ("redesign website", false) => "Too bad"
};
Warning 8: this pattern-matching is not exhaustive. Here is an example of a value that is not matched: ("", _)
- : string = "Too bad"
```

[00:41] As an alternative, we can use an underscore to match all previous unmatched values for this type. If you only care about the task being checked, we can do the following. 

```javascript
Reason # 
switch (myTodo) {
| (_, true) => "Congrats"
| (_, false) => "Too bad"
};
- : string = "Too bad"
```

A side effect of this change, we made our example exhaustive. Using a name instead of an underscore allows us to extract parts of the tuple.

```javascript 
Reason # switch (myTodo) {
| (_, true) => "Congrats"
| (text, false) => "Too bad, you didn't finish: " ++ text
};
- : string = "Too bad, you didn't finish: redesign website"
```

[01:05] We can use `text` in both cases, but they don't have to be the same name. Of course, this works with any kind of type. For example, if we only care about the text, we could match the text and ignore the checked value.

[01:27] Next up, we explore pattern matching for other data structures. With lists, we can match on an exact list. 

```javascript
Reason # switch (["a", "b", "c"]) {
| ["a", "b", "c"] => true
| _ => false
};
- : bool = true
```

Of course, an underscore can be used, as well. 

```javascript 
Reason # switch (["a", "b", "c"]) {
| ["a", "b", "c"] => true
| _ => false
};
- : bool = true 
```

What's great about pattern matching with lists is that we can use the spread operator to extract the head and tail.

[01:49] Here, we still use the underscore. 

```javascript
Reason # switch (["a", "b", "c"]) {
| [head, ...tail] => print_endline(head)
| [] => print_endline("Empty list")
};
- : unit = ()
```

Once we leave it out, the compiler suggests to us an example we are missing. To how we match, the only case left to cover is an empty list. This allows us to be more explicit without writing a lot more code. In fact, this is the reason why destructuring lists outside of a switch expression is not recommended. The compiler will warn us since an empty list could lead to a run time error.

[02:24] The same goes for the destructuring of arrays. When pattern matching arrays, we can only match arrays of a specific length. The values of the array can be matched using structural equality. We can use an underscore or we extract them using a name.

```javascript
Reason # switch ([|"a", "b", "c"|]) {
| [|"a", "b", _|] => print_endline("a, b and something")
| [|_, "x", "y"|] => print_endline("something, " ++ x ++ y)
| _ => print_endline("An Array")
};
something and foo c
- : unit = ()
```

[02:54] What about records? We, again, use the `todo` example, but this time in the form of a record. We first declare the type and then bind the to do to `myTodo`. 

```javascript
Reason # 
type todo = {
  text: string,
  checked: bool,
};
type todo = { text: string, checked: bool, };
Reason # 
let myTodo = {
  text: "redesign website",
  checked: true,
};
let myTodo: todo = {text: "redesign website", checked: true};
```

As you probably already have guessed, we can match the exact values. We are going to skip that though and move on to an example where we extract the text using the name description.

```javascript 
Reason #
switch (myTodo) {
| {text, checked: true} => "Congrats, you finished: " ++ text
| {text, checked: false} => "Too bad, you didn't finish: " ++ text
}
- : string = "Congrats, you finished: redesign website"
```

[03:32] By the way, we can use panning here. While explained in previous lessons, let's do a quick recap on pattern matching variants. We define a variant of `type item` with the constructor's note and to do. 

```javascript
Reason # 
type item = 
  | Note(string)
  | Todo(string, bool);
type item = Note(string) | Todo(string, bool);
Reason # let myItem = Todo("redesign website", false);
let myItem: item =  Todo("redesign website", false);
```

Using pattern matching, we can check for the constructors and extract parts of them.

```javascript
Reason # 
switch (myItem) {
| Note(text) => text
| Todo(text, checked) => text ++ "is done: " ++ string_of_bool(checked)
};
- : string = "redesign website is down: false"
```

[04:04] This is what pattern matching comes down to. With all the examples we've used until now, with each pattern, we can do two things at the same time. We can check what structure a value has and extract parts of the value.

[04:17] I hope by now you have a pretty good idea on how to leverage pattern matching. Since there are a couple more things that make our lives easier, we move on. Until now, we learned when we want to match multiple items and return the same result, we can do this.

```javascript
Reason
switch (2) {
| 1 => "between 0 and 4"
| 2 => "between 0 and 4"
| 3 => "between 0 and 4"
| _ => "lower than 1 or higher than 3"
};
- : string = "between 0 and 4"
```

[04:40] That's a lot of repetition. What we can do instead is using the pipe character to make sure multiple patterns result in the same case. 

```javascript
Reason #
switch (2) {
| 1 | 2 | 3 => "between 0 and 4"
| _ => "lower than 1 or higher than 3"
};
- : string = "between 0 and 4"
```

The best part though, this works with any arbiter in nesting. As an example, we use a request with the possible state success and error. An error contains the error code.

[05:08] Using the pipe character, we can match multiple error codes when pattern matching for error. 

```javascript
Reason # 
type request = 
  | Success(string)
  | Error(int);
Reason #
switch (Error(502)) {
| Success(result) => result
| Error(500 | 501 | 502) => "A server error occurred."
| Error(code) => "Unkown error occured. Code: " ++ string_of_int(code)
};
- : string = "A server error occured."
```

Sometimes though even that is not convenient or concise enough. Using the `when` keyword, we can even use custom logic as part of the pattern.

[05:31] For example, there are 12 documented HTTP server error codes. A function checking for the whole range would come in quite handy.

[05:44] Using `when`, we can apply the function to an `if` condition. Be aware by doing so, we lose the compiler's ability to check for exhaustiveness. 

```javascript
Reason #let isServerError = code => code >= 500 && code <= 511;
let isServerError: int => bool = <fun>;
Reason #
switch (Error(502)) {
  | Success(result) => result
  | Error(code) when isServerError(code) => "A server error occurred."
  | Error(code) => "Unkown error occured. Code: " ++ string_of_int(code)
  };
  - : string = "A server error occured"
  ```

If we remove the last entry, the compiler will warn us. It will also mention that this case might be already covered by the guarded clause. In general if possible, optimize your switch expressions to be exhaustive, especially when using variants. Meaning, try to avoid the `when` keyword, as well as the fall through case.

[06:14] Let me elaborate a bit on this. Here, we have the constructor slowly success and error. Now, think about having a switch expression in your code base that looks like this. 

```javascript
Reason # 
type request = 
  | Loading 
  | Success(string)
  | Error(int);
type request = Loading | Success(string) | Error(int);
Reason #
switch (Error(501)) {
| Loading => "Loading..."
| Success(result) => result
| _ => "An error occurred."
};
- : string = "An error occurred."
```

Works as expected. Three months later, the business requirements change and we want the user to manually trigger fetching the request. This means we are extending our variant request with yet another constructor, `NotRequested`.

```javascript
Reason #
type request = 
  | Loading 
  | Success(string)
  | Error(int);
  | NotRequest;
type request = Loading | Success(string) | Error(int) | NotRequested;
```

[06:48] If you rerun the existing switch expression, we notice that the compiler doesn't warn us about the new constructor. It's clearly a bug that the UI renders an error for the constructor not requested. Ideally, we wouldn't miss that. What would be even better is if the program wouldn't even compile if we forgot this new case. If we declare every case explicitly, the compiler will warn us. To make sure the compiler compiles and fixes the bug, we extend the switch expression.

[07:23] That's why it's recommended to avoid the fall through case and rather opting for explicitness. When matching for values, we can give them names using the S keyboard. This also works with nested structures. Here, we have a nested tuple. In the pattern we name the nested tuple `numberPair`.

```javascript
Reason #
switch ((1, (4, 2))) {
| (1, (_, _) as numberPair) => numberPair
| _ => (0, 0)
};
- : (int, int) = (4, 2)
```

[07:49] Last but not least, there's one special case of pattern matching, ternary conditional. Reason's ternary is just syntax sugar for a Boolean switch.

```javascript
Reason # let isMorning = true;
let isMorning: bool = true;
Reason # let message = isMorning ? "Good monring" : "Hello";
let message: string = "Good morning";
Reason # 
switch (isMorning) {
| true => "Good morning"
| false => "Hello"
};
- : string = "Good Morning"
```