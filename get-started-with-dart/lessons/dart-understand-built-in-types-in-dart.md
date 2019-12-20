Instructor: [00:00] In Dart, every `type` is an `object`, including the built-in types. `Numbers` can be defined either as an integer or a double. `Integers` represent whole `numbers`, while `doubles` allow you to define floating point digits. You can also perform the usual operations with these numerical types.

#### Dart

```dart
void main() {
  // Number
  int num1 = 5;
  double num2 = 10.0;

  print(num1 * num2);
  print(num1 / num2);
  print(num1 + num2);
  print(num1 - num2);
```

#### Console Output

```text
50
0.5
15
-5
```

[00:19] `Strings` can be defined with single or double quotes. `Strings` have support for template literals by default, which means we can contain expressions inside `strings` without using concatenation. Another feature of template literals are multi-line `strings`, which you define with triple opening and closing quotes.

[00:44] The recommended way of concatenating long `strings` is to use the `adjacent` version. Instead of having the pluses in this example, we could do it without. In fact, if they're very long, you could have them on separate lines. Let's bring these out to the console.

```dart
// String
var str1 = 'Lorem';
var str2 = "ipsum";
String str3 = '$str1 $str2 dolor';
var str4 = """Multi
Line
String""";
var str5 = 'These '
  'are '
  'adjacent';

print(str1);
print(str2);
print(str3);
print(str4);
print(str5);
```

#### Console Output

```text
Lorem
ipsum
Lorem ipsum dolor
Multi
  Line
  String
These are adjacent
```

[01:05] `Booleans` are values that are set as either `true` or `false`. Apart from simply printing these out, they can also be used in various operations.

```dart
// Boolean
bool isBrowser = true;
var isInvisible = false;

print(isBrowser || isInvisible);
print(isBrowser && isInvisible);
```

#### Console Output

```text
true
false
```

[01:14] `Functions` are self-contained program segments that carry out a specific task. `Functions` can also be set as a value to an `identifier`. Here's an example that calculates the difference between two integers. There's also a shorthand version.

```dart
// Function
sum(a, b) {
  return a + b;
}
print(sum(5, 10));

var difference = (int a, int b) {
  return a - b;
};
print(difference(20, 10));

var product = (int a, int b) => a * b;
print(product(3, 3));
```

#### Console Output

```text
15
10
9
```

[01:38] A `list` is a collection of elements with a length. These are similar syntax to other languages. `List` types also come with the utility of methods to iterate over its elements.

```dart
// List
var fruits = ['banana', 'pineapple', 'lemon'];
print(fruits.length);

fruits.forEach((fruit) => print(fruit));
var mappedFruits = fruits.map((fruit) => 'I love $fruit').toList();
print(mappedFruits[1]);
```

#### Console Output

```text
3 banana pineapple
lemon
I love pineaple
```

[01:58] `Maps` represent objects that contain key and value pairs of data. Keys can be accessed using array bracket notation and iterated over using methods like `forEach`.

```dart
// Map
var user = {
  "name": "Sam",
  "age": 25,
  "isSubscriber": true,
};
print(user["name"]);

user.forEach((key, value) => print("Key: $key, Value: $value"));
```

#### Console Output

```text
Sam
key: name, value: Sam
key: age, value: 25
key: isSubscriber, value: true
```

[02:13] `Runes` allow you contain characters that are outside of the UTF-16 set of characters. For example, emojis. Here's an example. Then using the `fromCharCodes` method of the string constructor, we'll pass in our `input`.

```dart
// Runes
Runes input = new Runes('I \u2764 Dart');
print(new String.fromCharCodes(input));
```

#### Console Output

```text
I ♥ Dart
```

[02:27] `Symbols` are a human-readable string that represents an identifier or a source. These identifiers could be library names, instance variables, and methods, for example. We can create `symbols` using the symbol constructor, or the symbol literal syntax. Let's run.

```dart
// Symbol
Symbol simb1 = Symbol('input');
var simb2 = #input;

print(simb1);
print(simb2);
```

#### Console Output

```text
Symbol("input")
Symbol("input)
```
