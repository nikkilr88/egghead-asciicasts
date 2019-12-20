Instructor: [00:00] Apart from parameters that are required, functions or methods in `Dart` can also specify optional parameters. These come in two flavors, `positioning` and `named`. The required parameters are listed first, followed by any of the optional parameters. Optional positional parameters are defined inside opening and closing square brackets, separated by commas.

#### Dart

```dart
void main() {
  yell('Hello, World');
  yell('Hello, World', true);
}

yell(String str, [bool exclaim,]) {
  var result = str.toUpperCase();
  if (exclaim) result += '!!!';
  print(result);
```

#### Console Output

```text
HELLO WORLD
HELLO WORLD!!!
```

[00:29] The exclaim parameter defaults to null. Let's specify a default `Boolean`, and add another parameter. Optional named parameters are defined inside opening and closing curly brackets.

```dart
void main() {
  yell('Hello, World');
  yell('Hello, World', true);
  yell('Hello, World', true, '🙀');
}

yell(String str, [bool exclaim,]) {
  var result = str.toUpperCase();
  if (exclaim) result += '!!!';
  if (emoji.isNotEmpty) result += emoji;
  print(result);
```

[00:57] Using optional named parameters will help you define functions and methods that are self-documenting. Here's how you would use these in a case of methods. Let's invoke our method. Let's refactor our method example with named parameters, update the method call, run again.

```dart
void main() {
  yell('Hello, World');

  // Optional positional parameters
  yell('Hello, World', true);
  yell('Hello, World', true, '🙀');

  // Optional named parameters
  whisper('Hello world', mysteriously: true);
  whisper('Hello world', mysteriously: false, emoji: '🤫');

  Person('Jermaine').speak(emoji: '😎');
}

yell(String str, [bool exclaim, String emoji = '']) {
  var result = str.toUpperCase();
  if (exclaim) result += '!!!';
  if (emoji.isNotEmpty) result += emoji;
  print(result);
}

whisper(String str, {bool mysteriously, String emoji = ''}) {
  var result = str.toLowerCase();
  if (mysteriously) result += '...';
  if (emoji.isNotEmpty) result += emoji;
  print(result);
}

class Person {
  Person(this.name);

  String name;

  speak({String emoji = ''}) {
    var result = 'My name is $name';
    if (emoji.isNotEmpty) result += emoji;
    print(result);
  }
}
```

#### Console Output

```text
HELLO WORLD
HELLO WORLD!!!
HELLO WORLD!!!🙀
hello world...
helo world🤫
My name is Jeramine😎
```