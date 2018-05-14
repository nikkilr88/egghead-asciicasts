Instructor: [00:00] Reason has lexical scoping. Don't worry in case you aren't familiar with this term, as in this lesson; I will guide you through the relevant implications. 

[00:09] First, we create the local scope using curly braces. It can contain one or multiple imperative statements, while the last one will automatically be returned. 

#### Terminal
```javascript
Reason # { 42; };
- : int = 42
Reason # 
{ 
    print_endline("Hello");
    42:
};
Hell0
- : int = 42
```

In this case, the value of the scope is the same as if we would type 42. 

[00:29] Inside a scope, we can access bindings outside of its current scope, but `let` bindings defined inside a scope aren't accessible from the outside. 

```javascript
Reason # 42;
- : int = 42
Reasn # let x = 2;
let x: int = 2;
Reason # { 42 + x; };
- : int = 42
Reason # 
{
  let y = 2;
  42+ y;
};
- : int = 42
```

In fact, we can shadow a `let` binding inside a scope, and it won't affect the `let` bindings outside of this local scope, even with different types. 

[00:53] Here, we bind the string `"Hello"` to the name `foo`. Then we create the scope where we bind the integer `2` to the name `foo` again. If you refer to foo outside of the block, it's still `"Hello"`. 

```javascript
Reason # let foo = "Hello";
let foo: string = "Hello";
Reason # 
{
  let foo = 2;
  foo;
};
- : int = 2
Reason # foo;
- : string = "Hello"
```

Since every block returns the last statement as an expression, we can also bind the result to a name. 

```javascript
Reason #
let meaningOfLife = {
  let a = 40;
  let b = 1;
  a + b + 1;
};
let meaningOfLife: int = 42;
Reason # meaningOfLife;
- : int = 42
```

[01:25] In the coming lessons, we will see blocks being used many times to create a local scope for constructs like switch expressions or function definitions. Keep in mind, every time curly braces are used in Reason, it's the same scoping behavior.