Instructor: [00:00] Types can accept parameters, similar to generics in other languages. In fact, we encountered them a couple of times already. For example, when creating a list, you need a type list, receiving strings. `string`, in this case, is a type parameter. 

```javascript
Reason # let myList: list(string) = ["red", "green"];
let myList: list(string) = ["red", "green"];
```

[00:17] Here, a list of integers. In this case, the compiler even inverts the type parameter integer. 

```javascript
Reason # [1, 2, 3];
- : list(int) = [1, 2, 3]
```

Pretty cool. Let's take a step back and explore why parameterized types are important. In this case, we create two coordinate types, one containing integers, the other containing floats. 

```javascript
Reason # type intCoordinate = (int, int);
type intCoordinate = (int, int);
Reason # type floatCoordinate = (float, float);
type floatCoordinate = (float, float);
```

Now we can use them. 

```javascript
Reason # let locationOne: intCoordinate = (10, 20);
let locationOne: intCoordinate = (10, 20);
```

[00:43] Using type parameters, we can create the type that has coordinates instead, that accepts one type parameter. Here, we declare that type parameter `'a` of coordinate must be the same for the first and the second type in the tuple of two elements. 

[00:57] It's as if `type` is a function that takes in parameters and returns a new `type`. 

```javascript
Reason # type coordinate('a) = ('a, 'a);
type coordinate('a) = ('a, 'a);
```

From this point on, we can use the type coordinate. Here, we apply the coordinate type function and return a type tuple with two integers, trying the same construct using float works, as well. 

```javascript
Reason # let locationOne: coordinate(int) = (10, 20);
let locationOne: coordinate(int) = (10, 20);
Reason # let locationTwo: coordinate(float) = (10.5, 20.2);
let locationTwo: coordinate(float) = (10.4, 20.2);
```

[01:15] The hopefully obvious benefit is that we can kill repetition when creating more generic types. If the `type` parameters feature wouldn't exist, the standard library probably wouldn't include the type list, the product integer list, and string list. 

[01:32] Since a list is a very common use case, I'm convinced implementing a general-purpose list type accepting a type parameter was a great decision. Another example would be `option` since some accept all sorts of types. In fact, we can implement our own option like this. 

[01:57] Similar to our first example, the type parameter integer is inferred. 

```javascript
Reason # 
type ourOption('a) = 
  | OurNone
  | OurSome('a);
type ourOption('a) = OurNone | OurSome('a);
Reason # OurSome(42);
- : ourOption(int) = OurSome(42)
Reason # OurSome("Vienna");
- : ourOption(string) = OurSome("Vienna")
```

By the way, type parameters have to start with a tick (`'`) and then must be followed by a character or word. In case you wonder, a type can also receive multiple type parameters. Here, we create a record type ship that accepts two type parameters which map to `id` and `cargo`. 

```javascript
Reason #
type ship('a, 'b) = {
  id: 'a,
  cargo: 'b,
};
type ship('a, 'b) = { id: 'a, cargo: 'b, };
Reason # {id: 223, cargo: ["Apples"]};
- : ship (int, list(string)) = {id: 223, cargo: ["Apples"]}
```

[02:26] Also, types also can be composed. As we see in this example, the type ship has a field of `cargo`, which is a list of strings. It's also important to mention before we wrap up that using type parameters doesn't mean we lose any type safety guarantees. Data-mining the type is just deferred to a later stage.