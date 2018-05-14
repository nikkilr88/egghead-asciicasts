Instructor: [00:00] Let's get started with the language basics. We already have seen 1 + 1, and if we try `1.1 + 2.2`, it will fail since there's a special operator for adding float values. 

#### Terminal
```
Error: This expression has type float but an expression was expected of type int
```

[00:13] The operators minus, multiply, divide, and module only work for integers. For float, they do as well, if the operator is followed by a dot, `+.`. 

```javascript
Reason # 1.1 +. 2.2
- : float = 3.30000000000000027
```

To compare values, we can use several relational operators, or structural equality using two equal signs.

```
Reason # 2 > 3;
- : bool = false
Reason # 2 == 3;
- : bool = false
``` 

[00:36] If you try to compare values of a different type, for example, an integer and a float, it won't work. We can convert an integer to a float using float_of_int. 

```
Reason # float_of_int(2) > 3.1;
- : bool = false
```

[00:52] In fact, Reason ships a good amount of such utility functions for converting types. All follow the same pattern with `destinationType_of_sourceType`, and the value as a parameter. For example, `Bool_of_string`. 

```
Reason # bool_of_string("true")
- : bool = true
```

[01:12] There we are at our next data type, Boolean. It's pretty straight-forward, as it only can be true or false. Boolean operators are `!`, `&&`, as well as `||`. 

[01:28] Strings are also straight-forward. They are limited using double quotes, `""`. Strings can be concatenated using two plus signs, `++`, and we can also create multi-line strings. 

```
Reason # "Hello" ++ "World";
- : string = "HelloWorld"
Reason # "Hello

World";
- : string = "Hello/n/nWorld"
```

[01:42] While we also can do one-letter strings, Reason comes with a special data type for a single letter, `char`, for character. We can create one by using single quotes, `''`. 

```
Reason # 'a';
- : char = 'a'
```

[01:56] Sometimes, we want to denote a value to nothing, basically similar to undefined in JavaScript. Reason has a special value for this purpose. It is described as an opening parenthesis followed by a closing parenthesis, `()`.

```
Reason # ();
- : unit = ()
``` 

[02:12] This special value has its own type unit, and it's the only element of that type. Therefore, we can't leverage it to make it type-nullable simply because the type unit is not compatible with any other type. If we add `2` to `()`, you can see, this isn't valid, and the compiler throws an error. 

```
Reason # 2 = ();
Error: This expression has type unit but an expression was expected of type int
```

[02:34] Unit can be used in many cases. One of them would be for functions with side effects don't return anything. For example, print integer.

```
Reason # print_int(42);
42- : unit = ()
```