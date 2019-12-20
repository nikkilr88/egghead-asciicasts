Instructor: [00:00] Streams represent a sequence of data events that occur while reading information from a data source. Streams are especially used when dealing with data sources like HTML events emitted from button clicks or reading data from a file.

[00:13] To demonstrate the concept of streams, we will use the `StreamController` interface. This will help us handle streaming data as well as invoke events by feeding data into the controller. The stream is exposed through the stream property, which contains the listen method for handling streaming data.

[00:29] To invoke a data event, use the `add` method to feed data to the stream. Let's run this example.

![Adding data to the stream](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508417/transcript-images/capture-and-handle-data-sequences-with-streams-in-dart-data-stream.jpg)

A `StreamController` is also a generic class, which means that we can specify the type of data we expect to be handled in the stream. We can also listen for errors and done events on the stream.

#### Dart

```dart
import 'dart:async';
import 'dart:html';

void main() {
  StreamController<String> controller = StreamController<String>();

  controller.stream.listen(
    (data) => print('Received data: ${data.toUpperCase()}'),
    onDone: () => print('No more data on stream.'),
  	onError: (e) => print('Caught Exception: $e'));

  controller.add('Hello');
  controller.add('World');
```

[00:51] To invoke the `onError` handler, use the `addError` method. To invoke the `onDone` handler, use the `close` method. Calling the `close` event also returns a future, meaning we can add a `then` callback method. Let's refactor with `async`/`await` syntax.

```dart
controller.add('Hello');
controller.add('World');

controller.addError('Throwing this error!');

await controller.close();
print('$controller is fully closed');
```

#### Console Output
```text
Received data: HELLO
Received data: WORLD
Exception: This is an error.
No more data on stream.
Instance of '_AsyncStreamController<String>' is fully closed.
```

[01:18] There are two types of streams in Dart, single subscription and broadcast streams. The example we've seen so far is a single subscription stream. This means that we can only attach a single stream listener event. Attempting to add another listener will throw a run-time error.

![Runtime error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508417/transcript-images/capture-and-handle-data-sequences-with-streams-in-dart-run-time-error.jpg)

```dart
  controller.stream.listen(
    (data) => print('Received data: ${data.toUpperCase()}'),
    onDone: () => print('No more data on stream.'),
  	onError: (e) => print('Caught Exception: $e'));

//   controller.stream.listen((data) => print('Received data again: $data'));
```

[01:38] With a broadcast stream, we can implement more than one listener. To create one, invoke the `asBroadcastStream` method. Let's write some listeners and feed some data to them.

![Adding more listener's to the subscription](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/capture-and-handle-data-sequences-with-streams-in-dart-adding-listeners.jpg)

```dart
void main() async {
  /// Single subscription
  StreamController<String> controller = StreamController<String>();

  controller.stream.listen(
    (data) => print('Received data: ${data.toUpperCase()}'),
    onDone: () => print('No more data on stream.'),
  	onError: (e) => print('Caught Exception: $e'));

//   controller.stream.listen((data) => print('Received data again: $data'));

  controller.add('Hello');
  controller.add('World');

  controller.addError('Throwing this error!');

  await controller.close();
  print('$controller is fully closed');

  /// Broadcast stream
  StreamController<String> controller2 = StreamController<String>();
  Stream<String> controllerAsBroadcast = controller2.stream.asBroadcastStream();

  controllerAsBroadcast.listen((data) => print('Received data: $data'));
  controllerAsBroadcast.listen((data) => print('Received data again: $data'));

  controller2.add('Hello');
  controller2.add('World');
}
```

[02:01] We can also use `async`/`await` syntax to listen for streaming data. Streams can be created from generic types such as futures. To demonstrate, let's create a `future`.

```dart
//   await for (var data in controllerAsBroadcast) {
//     print('`Awaited` for data: $data');
//   }

  Future<String> result = HttpRequest.getString('https://swapi.co/api/people/1');
```

[02:17] Using the `fromFuture` named constructor, we can produce our stream. Let's add our listener, then run.

```dart
Future<String> result = HttpRequest.getString('https://swapi.co/api/people/1');
Stream<String> resultStream = Stream.fromFuture(result);

resultStream.listen((data) => print('=> Got data: $data'),
  onDone: () => print('No more data on stream.'));
```

![Added listener](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508419/transcript-images/dart-capture-and-handle-data-sequences-with-streams-in-dart-added-listener.jpg)

[02:32] We can also implement basic error-handling by defining an `onError` handler. Let's trigger this error by using a wrong endpoint. We can also add a list of futures to the stream.

[02:46] To demonstrate, let's add another API call that returns a future. Using the `fromFutures` named constructor, pass a list containing both futures, and listen for the result.

```dart
  Future<String> result = HttpRequest.getString('https://swapi.co/api/people/1');
//  Stream<String> resultStream = Stream.fromFuture(result);

//  resultStream.listen((data) => print('=> Got data: $data'),
//	 onError: (e) => print(e.type),
//	 onDone: () => print('No more data on stream.'));

  Future<String> result2 = HttpRequest.getString('https://swapi.co/api/people/2');
  Stream<String> peopleStream = Stream.fromFutures([result, result2]);

   peopleStream.listen((person) => print('=> Got person: $person'),
	 onDone: () => print('No more people on stream.'));
 }
```

[03:09] Streams can also be created from iterable types, like list or set. Here is an example of a stream produced from a list using the `fromIterable` named constructor.

```dart
  List<String> chars = 'Dart is awesome'.split('');
  Stream<String> charStream = Stream.fromIterable(chars);
```

[03:19] Then we will listen for each character fed to the stream. Let's run. 

#### Console Output
```text
D
a
r
t

i
s

a
w
e
s
o
m
e
```

One useful application of this would be simulating a typing effect using a timer.

```dart
//   charStream.listen(print);
  var idx = 0;
  charStream.listen((char) {
    Timer(Duration(milliseconds: idx * 200), () => print(char));
    idx++;
  });
}
```

![simulating a typing effect](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/capture-and-handle-data-sequences-with-streams-in-dart-typing-effect.jpg)

[03:39] This concludes the lesson.
