Instructor: [00:00] To create a module, use the keyword `module` followed by the name. The module name must start with a capital letter. Then we have the module block. The purpose of a module is to encapsulate let bindings, type definitions, nested modules, and so on. For example, for our `Math` module, it would contain `pi` as well as an `add` function. 

#### Terminal
```javascript
Reason # `module Math` = {};
`module Math`: { };
Reason # 
`module Math` = {
  let pi = 3.14159;
  let add = (x, y) => x + y;
};
`module Math`: { let pi: fload; let add: (int, int) => int; };
```

[00:26] Using the dot notation, we can access everything contained inside a module. 

```javascript
Reason # Math.pi;
- : float = 3.14159 
Reason # Math.add(2, 3);
- :int = 5
```

As mentioned, we can store types and access them using the dot notation. This also means by default for type inference the compiler doesn't look into other modules than the current one or parent modules. 

```javascript 
Reason # 
module School = {
  type profession = 
    | Teacher
    | Director;
};
module School: { type profession = Teacher | Director; };
Reason # School.Teacher;
- : School.profession = School.Teacher
Reason # let personOne = School.Teacher;
let personOne: School.profession = School.Teacher
```

[00:49] Constantly referring to a value and type in another module can be tedious. To help with that, Reason allows us to open a module's definition and refer to its contents without prepending the name every time. 

[01:03] For once we can open locally by using the module name followed by a dot and then parentheses to wrap an expression. As you can see, we still can access person one coming from the current scope, but also directly access `Teacher` and `Director` of `School`. 

```javascript
Reason # 
let greeting = 
  School.(
    switch (personOne) {
    | Teacher => "Hello teacher"
    | Director => "Hello director"
    }
  );
let greeting: string = "Hello teacher";
```

[01:24] In case you're wondering, if we add  `personOne` defined in set `School` it would by default use the one coming from school. By the way, local open also works for all sorts of data structures like lists and records. 

```javascript
Reason # 
module circle = {
  type point = {
    x: float,
    y: float,
  };
};
module Circle: { type point = { x: float, y: float, }; };
Reason # let center = Circle.{x: 1.2, y: 2.3};
let center: Circle.point = {Circle.x: 1.2, y: 2.3}};
```

[01:49] As an alternative you can use the keyword `open` to globally open a module and import its definition in the current scope. That said, I recommend to use it sparingly as it allows convenience at the cost of ease of reasoning. 

```javascript
Reason # open School;
Reason # let personTwo = Teacher;
let personTwo: profession = Teacher;
```

[02:03] While open on the imports and modules definition, we can extend the module using the keyword include. We define a `module Game`, which has a `type states`. 

```javascript
Reason # 
module Game = {
  type states = 
    | NotStarted
    | Running
    | Won
    | Lost;
};
module Game: { type state = NotStarted | Running | Won | Lost; };
```

In a `module Videogame`, we include this module. 

[02:21] It basically statically copies over the definition of a module. When writing a function inside the module, we can use everything available that comes with `Game`. 

```javascript
Reason # 
module videoGame = {
  include Game;
  let isWon = state => state == Won;
};
module videoGame:
  { 
    type state = game.states = NotStarted | Running | Won | Lost;
    let isWon: states => bool;
  };
```


In our case, we can use the state `isWon`. So far so good. 

```javascript
Reason # videoGame.isWon(videoGame.won);
- : bool = true
```

[02:36] One thing that might be concerning though is that default every let binding and every type that we declare inside a module is exposed. To explicitly define what let bindings types and so on are accessible, we can define a module signature using the keyword module type. The signature name as well must start with a capital letter. 

[02:57] In a signature block we can find the list of requirements that a module must satisfy for that module to match the signature. 

```javascript
Reason # 
module type EstablishmentType = {
  type profession = 
    | Salesperson
    | Engineer;
  let professionDescription: profession => string;
};
module type EstablishmentType = 
  { 
    type profession = Salesperson | Engineer;
    let professionDescription: profession => string;
  };
```

This can be very specific. For example, in our case, the profession is very much set in stone, but for `professionDescription` we only declare that it accepts a profession and returns a string. In fact, you can't even write the implementation in that signature. 

[03:22] To use a signature, we follow the same pattern as with any explicit type declaration. In case we don't match the full signature, the compiler will throw an error. 

[03:33] Let's implement the `professionDescription`. 

```javascript
Reason # module Company: EstablishmentType = {
  type profession = 
    | Salesperson
    | Engineer;
  let professionDescription = p =>
    switch (p) {
      | Salesperson => "Selling software"
      | Engineer => "Building software"
      };
};
module Company: EstablismentType;
Reason # Company.professionDescription(Company.Engineer);
- : string = "Building software"
```

We are good to go. Even though we have a signature, we can now extend our module. Here we add a `let` binding product and reuse it in our profession description. 

```javascript 
Reason # module Company: EstablishmentType = {
  type profession = 
    | Salesperson
    | Engineer;
  let product = "software";
  let professionDescription = p =>
    switch (p) {
      | Salesperson => "Selling " ++ product
      | Engineer => "Building " ++ product
      };
};
module Company: EstablishmentType;
```

[03:53] While the product is available inside the company's call, it's not available in the outside scope since it's not part of the signature. Now you should have a pretty good idea about modules. When should we use modules? We do all the time implicitly since every reason file automatically is a module. 

[04:18] Previously, we defined a `module Math`. Instead of doing so, we could have created a file `Math.re`. To match the previous math module, we bring everything inside the module block into the file. In our case, the binding is `pi` and `add`.

#### Math.re
```javascript
let pi = 3.14159

let add = (x, y) => x + y;
``` 

[04:37] We didn't drive `module Math` in here because this is implicit. If you would do so, we would create a `module Math` inside the `module Math`. In another module, for example `main.re`, we can use `Math`. You ref `print_int` of `Math.add` new line and then print flowed of `math.pi`. 

#### Main.re
```javascript
print_int(Math.add(2, 3));

print_newline();

print_float(Math.pi);

print_newline();
```

[04:56] To try this out we edit these files to an existing progress group project. In the next lesson, we'll cover how to set up such a project. Let me add a native compiler would have worked as well since the module system behaves the same. 

[05:11] When you compile our project and execute main, we can see both values have printed as expected. 

#### Terminal
```Bash
$ npm run build
$ node src/Main.bs.js
5
3.14159
```

While it's not mandatory, it's recommended to start a file name with an uppercase character. In case you don't, Reason will automatically convert it. 

[05:25] `foo.re` would be available as module `Foo`. How are signatures for such file modules? Had a file next to it with the same name, but instead of the file extension `re` we use `rei`. 

#### Math.re
```javascript
let pi: float;

let add: (int, int) => int;
```

We compile and we run main and everything still works as expected. 

[05:52] If we remove `pi` from our `Math.rei` file, compilation will fail. As expected the issue here is that your signature file `pi` isn't available anymore.