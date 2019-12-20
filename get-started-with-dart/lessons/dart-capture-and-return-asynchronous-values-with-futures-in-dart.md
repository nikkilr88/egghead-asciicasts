Instructor: [00:00] Futures allow you to capture a value or error that will be returned at some point in time. These operate in a similar fashion to promises, if you've worked with JavaScript. Here is a basic example of a future object that returns a result at some point.

```dart
import 'dart:html';
import 'dart:async';
import 'dart:convert';

void main() {
  var result = Future(() => 'Hello, World!');
  print(result));
```

[00:16] Running this returns a string label that represents a future instance rather than the actual result.

![String label that represents a Future instance](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508417/transcript-images/capture-and-return-asynchronous-values-with-futures-in-dart-future-instance-result.jpg)

This happens because futures work in an asynchronous manner. We need to use the `then` method to capture the results once the computation is complete.

```dart
void main() {
  var result = Future(() => 'Hello, World!');
  result.then((str) => print(str));
```

#### Console Output
```text
Hello, World!
```

[00:31] Here is another example that adds a delayed period of time before returning the result. Use the `catchError` method to handle exceptions.

```dart
  var delayedResult = Future.delayed(Duration(seconds: 2), () => 'Displayed after 2 seconds');
  delayedResult.then((str) => print(str));

  Future(() => throw 'There was an error'
    .catchError((err) => print(err));
}
```

#### Console Output
```text
Hello, World!
There was an error
Displayed after 2 seconds
```

[00:52] You can also chain your success and error methods. We can chain as many `then` blocks as possible. To demonstrate that, let's create a variable called `showError`, which will be used to trigger the `catchError` method callback. Then let's modify the computed result with this variable.

```dart
  var delayed = Future.delayed(Duration(seconds: 2), () => 'Displayed after 2 seconds');
  delayed.then((str) => print(str));

  var showError = false;
  Future(() => showError ? throw 'There was an error' : '{"data": "success"}')
    .then((str) => print(str))
    .then((dataMap) => print(dataMap["data"]))
    .catchError((err) => print(err));
```

#### Console Output
```text
Hello, World!
{"data": "Success"}
Displayed after 2 seconds
```

[01:16] In our first success handler, convert the result to a map object using the `json.decode` method in the Dart convert library. Dart libraries are also feature-rich with functions that return future objects. Here is an example using the `HttpRequest.getString` method to make an API call.

```dart
  var showError = false;
  Future(() => showError ? throw 'There was an error' : '{"data": "success"}')
    .then((str) => json.decode(str))
    .then((dataMap) => print(dataMap['data']))
    .catchError((err) => print(err));

  HttpRequest.getString('https://swapi.co/api/people/1')
    .then(print)
    .catchError((err) => print('There was an error: $err'));
```

![http request](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508419/transcript-images/dart-capture-and-return-asynchronous-values-with-futures-in-dart-http-request.jpg)

[01:44] This works as expected as long as a future is returned. For asynchronous functions that are not based on the Future API, we can use the `completer` class to wrap it within a future context. To demonstrate, let's create a function that accepts a callback function to be triggered once an asynchronous operation is complete.

```dart
  lookupVersion(cb) => Timer(Duration(seconds: 2), () => cb('v2.1.0'));
  lookupVersion((version) => print('Got the version: $version'));
```

[02:09] To wrap this function so that a future is returned, we can use the `completer` class that comes from the Dart async library. Create a wrapper function with a return type set to future. Create a Completer object and return its future.

[02:24] Before the return statement, run our `lookUpVersion` operation. In the callback function, we can resolve our future by invoking the `complete` method on our `Completer` object.

```dart
  Future lookupVersionAsFuture() {
    var completer = Completer();

    lookupVersion((version) => completer.complete(version));
    return completer.future;
  }
  lookupVersionAsFuture()
    .then((version) => print('Got the `Future` version: $version'))
    .catchError(print);
}
```

#### Console Output
```text
Hello, World! 
Success
Got the version: v2.1.0
Got the `Future` version: v2.1.0
```

[02:43] To trigger the `catchError` method call, use the `completeError` method. `Future` based APIs can also be used with `async`/`await` syntax. To do that, let's create a function, marking it with the async keyword before the opening curly bracket. For any function returning a `future`, prepend the `await` keyword before invoking it. Let's invoke this function.

![async/await function](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/apture-and-return-asynchronous-values-with-futures-in-dart-async-await.jpg)

```dart
  Future lookupVersionAsFuture() {
    var completer = Completer();

    lookupVersion((_) => completer.completeError('There was a problem!'));
//     lookupVersion((version) => completer.complete(version));
    return completer.future;
  }
  lookupVersionAsFuture()
    .then((version) => print('Got the `Future` version: $version'))
    .catchError(print);

 Future lookupVersionWithAsyncAwait () async {
   var version = await lookupVersionAsFuture();
   print('Got the `async/await` version: $version');
  }
  lookupVersionWithAsyncAwait();
}
```

#### Console Output
```text
Hello, World! 
Success
Got the version: v2.1.0
Got the `Future` version: v2.1.0
Got the `async/aait` version: v2.1.0
```

[03:15] To handle exceptions, wrap your `await` calls in a `try`/`catch` statement. Then modify `lookUpVersion` as `future` to respond with an error. Let's run again. Let's pass this one more time. This concludes the lesson.

```dart
  Future lookupVersionAsFuture() {
    var completer = Completer();

     lookupVersion((version) => completer.complete(version));
//      lookupVersion((_) => completer.completeError('There was a problem!'));
    return completer.future;
  }
  lookupVersionAsFuture()
    .then((version) => print('Got the `Future` version: $version'))
    .catchError(print);

  Future lookupVersionWithAsyncAwait () async {
    try {
      var version = await lookupVersionAsFuture();
      print('Got the `async/await` version: $version');
    } catch(e) {
      print('Caught Exception: $e');
    }
  }
  lookupVersionWithAsyncAwait();
}
```

#### Console Output
```text
Hello, World! 
Success
Got the version: v2.1.0
Got the `Future` version: v2.1.0
Got the `asyn/await` version: v2.1.0
```