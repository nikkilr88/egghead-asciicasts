Instructor: [00:00] We'll begin by running `sudo apt-get update` to update the package repository listings configured on our system.

#### Terminal

```bash
~$ sudo apt-get update
```

`install apt-transport-https` to allow us access to repositories using the HTTPS protocol.

```bash
~$ sudo apt-get install apt-transport-https
```

Add the Google Linux sign in key to your apt key list to allow us to register the dot repository.

```bash
~$ sudo sh -c 'curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -'

```

[00:26] You may need to install the `curl` package if it's not already installed. Then try the command again. Then register the dot repository.

```bash
~$ sudo sh -c 'curl https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list'
```

This will now allow us to install the dart SDK.

```bash
~$ sudo apt-get update
~$ sudo apt-get install dart
```

[00:52] To install the development version of the `dart` SDK, register the unstable dot repo instead. Then run the same command to install `dart`. You can confirm you have dot installed by going directly to the `bin` directory.

```bash
~$ .usr/lib/dart/bin/dart --version
Dart VM version: 2.1.0 (Unknown timestamp) on "linux_x64"
```

After installing the SDK, add its `bin` directory to your path environment variable.

```bash
~$ echo 'export PATH="$PATH:/usr/lib/dart/bin"' >> ~/.profile
```

[01:15] Now you should be able to use the `dart` command directly. In your working folder, create a `pubspec.yaml` file. A pubspec file contains meta data and configuration related to a dot project.

[01:30] We will enter the minimum information about our project such as the `name`, `description`, and an `author`.

#### pubspec.yaml`

```yaml
name: awesome_dart_app
description: An awesome Dart application
author: Jermaine Oppong
```

All starting files go in a `bin` folder. Let's create one containing a `main.dart` file. In this file we will define a top level function called `main`. `dart` requires this function to start our application. In this function we'll `print` the current `DateTime`. Save the file and run. 

#### main.dart

```dart
void main() {
  print(DateTime.now());
}
```

This completes the lesson.
