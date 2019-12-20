Instructor: [00:00] Let's install the Dart SDK using Brew on Mac. We will register the Dart repository by running `brewTop.-lang/dart`.

#### Terminal

```
$ brew tap dart-lang/dart
```

![Installing Dart SDK](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508417/transcript-images/setup-your-first-dart-project-Dart-SDK-setup.jpg)

This now enables us to install the SDK.

```
$ brew install dart
```

![Brew installing Dart](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552508418/transcript-images/setup-your-first-dart-project-brew-dart.jpg)

Alternatively, you can install the dev channel version by passing the development flag, `--devel`.

[00:23] Once the SDK is successfully installed, create and open your working folder in your editor of choice. We will begin by creating a `pubspec.yaml` file. This file contains metadata about a Dart project. We will enter some basic information about our project such as a `name`, `description`, and an `author`.

#### pubspec.yaml

```yaml
name: awesome_dart
descripition: My first Dart project
author: Jermaine Oppong
```

[00:44] It's conventional to have a `bin` folder containing our executables. We'll create a `bin` directory containing our `main` executable. This will be called `main.dart`. In this file, we'll create a `main` function in order for our Dart program to run, and you will `print` out to the console. Save the file and run.

```dart
void main() {
  print("My first Dart program.");
}
```
