Instructor: [00:00] Using the keyword `let`, we can bind the string value `"Hello!"` to the name `greeting`. Once we do that, we can use this name reference, for example, by just typing `greeting`. It results in the output as we would type the string `"Hello!"` itself. 

#### Terminal
```javascript
Reason # let greeting: string = "Hello!";
let greeting: string = "Hello!";
Reason # greeting: 
- : string = "Hello!"
```

[00:18] We can use `greeting` now and pass it around as it would provide the string, for example, to the function `print_endline`. 

```javascript
print_endline(greeting);
Hello!
- : unit = ()
```

Of course, `let` bindings aren't limited to strings. We can bind any value of any type to any name. For example, here, we bind `32` to the name `age`. 

```javascript
Reason # let age: int = 32;
let age: int = 32;
```

[00:38] `let` bindings in Reason are similar to variable declarations in other languages. Since variable has different meanings in various languages, in this course, I'm only going to use the terms `let` binding and name. 

[00:53] The general pattern of `let` binding is that it starts with the keyword `let`, followed by the desired name, which must start with a lowercase character or an underscore. Then, comes a `:` followed by the type. Right after that, `=`, and then the expression to be bound. 

```javascript
Reason # let <name>: <type> = <expression>;
```

[01:12] Coming from a dynamic language like JavaScript, you might wonder why we provide the type here. Reason has static typing, which is different to dynamic typing in the sense that all types must be declared or inferred at compile time. 

[01:29] So far, we only have seen how to declare the type of a value, but what did I mean by can be inferred? Let me explain by an example. We bind the string value, `jim`, to the name `"Jim"`, but this time, we leave out the type definition. 

```javascript
Reason # let jim = "Jim";
let jim: string = "Jim";
```

[01:47] As you can see, the reason compiler inferred that the type of the value is a string. This is a great feature since it allows us to have full type safety without declaring the types all the time. Of course, this works for all sorts of types. Let's bind the value `200` to `height`. It also works for `float`, or even a list of strings. 

```javascript
Reason # let height = 200;
let height: int = 200;
Reason # let temperature = 32.8;
let temperature: float = 32.8;
Reason # let colors = ["red", "green", "blue"];
let colors: list(string) = ["red", "green", "blue"];
```

[02:18] In conclusion, types are optional, but also can explicitly be written down by choice. This goes so far that theoretically, your whole program could be type-inferred. In reality, though, in some cases, the compiler needs your assistance with the type declaration. Sometimes, it's also useful to be more explicit. 

[02:39] Let's move on and talk about immutability. `let` bindings are immutable. This means if we bind the value `Vienna` to the name `city`, we can't change the value of that `let` binding. That said, we could create a new `let` binding of the same name, which shadows the previous binding. From that point onward, the `let` binding will refer to the newly-assigned value. 

[03:07] We could even use a different type since when shadowing a `let` binding, it has nothing to do anymore with the previous one. Next up, I want to demonstrate you how to create a type alias. 

[03:19] We start with the `type` keyword followed by the desired name. Right after that, comes an equal sign, and then the type definition to be aliased. Now, we can use `score` instead of our integer. 

```javascript
Reason # type score = int;
type score = int;
Reason # let x: score = 10;
let x: score = 10;
```

Even type inference works, meaning in this case, the compiler will even opt-in to show the type alias score instead of the type integer. 

[03:43] Of course, type aliases are not limited to basic types like integer. We can create a type alias score, which is a list of the type score. We can even use shadowing for type declarations, meaning, if we declare type alias `foo` for `int`, then use it, re-declare it to `string`, and use `foo` again, it works perfectly fine. 

```javascript
Reason # type foo = int;
type foo = score;
Reason # let ten: foo = 10;
let ten: foo = 10;
Teason # type foo = string;
type foo = string;
Reason # let msg: foo = "Hello";
let msg: foo = "Hello";
```

[04:11] By the way, declaring the types isn't necessary here. I only did it to demonstrate shadowing of type declarations. 

[04:29] That said, I recommend to keep shadowing of bindings, and especially types, to a minimal, and use this feature with caution to avoid confusion.