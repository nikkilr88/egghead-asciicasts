Instructor: [00:00] Variants allow us to express module options that are exclusive to a data structure. Let's create a variant answer referring to a set of so-called constructors, or also called tags, each of them separated by the pipe character, `|`. Constructors must be capitalized. 

#### Terminal
```javascript
Reason #
type answer = 
  | Yes
  | No
  | Maybe;
type anser = Yes | No | Maybe;
```

[00:18] We can bind these constructors using the `let` keyword like any other value. For example, `isReasonGreat`. `Yes`. `IsItRaining`? `Maybe`. 

```javascript
Reason # let isReasonGreat = Yes;
let isReasonGreat: answer = Yes;
Reason # let isItRaining = Maybe;
let isItRaining: answer = Maybe;
```

This data structure allows us to express this or that with as many options as we want. In computer science, this is called tagged unions. 

[00:40] Variants' usefulness is mostly coming along with the `switch` expression. It allows us to check every possible case of a variant. We create a `let` binding message, open a `switch` expression for `isReasonGreat`, then, we enumerate every variant constructor, each followed by an arrow and the corresponding case. So far, so good. 

```javascript
Reason #
let message = 
  switch (isReasonGreat) {
  | Yes => "Yay"
  | No => "No worries"
  | Maybe => "You better keep watching :)"
  };
let message: string = "Yay";
```

[01:11] We could have achieved the same result with an `if/else` expression, but when using variants in combination with `switch`, we get a rich amount of type system assistants. For example, the compiler will give us a type error if we forget to cover a case. It even points out which cases are missing. Also, the compiler warns us if two cases are redundant. 

```javascript
Reason #
switch (isReasonGreat) {
| Yes => "Yay"
| No => "No worries"
| Maybe => "You better keep watching :)"
| Yes => "Cool"
};
Characters 105-108:
Warning 11: this match case is unused.
- : string = "Yay"
```

[01:35] There is more to variants, though. Each of its constructors can hold extra data. Let's create a variant item for an App Store notes, and to-do's. `Note` can only include the text, while a `Todo` has text, as well as a Boolean indicating if it's done or not. 

[02:03] We can call the `Todo` constructor with these two arguments. In our case, we want to redesign a website and set it to false. To leverage this in a switch expression, we can pattern match on a constructor's parameters, and extract them when needed. 

```javascript
Reason #
type item = 
  | Note(string)
  | Todo(string, bool);
type item = Note(string) | Todo(string, bool);
Reason # let myItem = Todo("redesign website", false);
let myItem: item = Todo("redesign website", false);
```

[02:20] To do so, we can use destructuring. This way, we can give the parameters' names and use them each after the arrow. 

```javascript
Reason #
switch (myItem) {
| Note(text) => text
| Todo(text, checked) => text ++ " is done: " ++ string_of_bool(checked)
};
- : string = "redesign webiste is done: false"
```

While we can give them names, we don't necessarily have to. We also can match against exact values of the constructor. 

[02:41] Here, we add a pattern that matches exactly against a redesigned website with the Boolean set to false.

```javascript
Reason #
switch (myItem) {
| Note(text) => text
| Todo("redesign website", false) => "Please first fix the app"
| Todo(text, checked) => text ++ " is done: " ++ string_of_bool(checked)
};
- : string = "Please first fix the app"
```