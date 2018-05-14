Instructor: [00:01] We install `BuckleScript` using `npm install`. 

#### Terminal
```bash
$ npm install -g bs-platform
```

Reason can compile to native binaries like code and JavaScript. 

[00:08] In this example, we quickly run through how to set up your first Reason JavaScript project using the BuckleScript platform. BuckleScript ships with the CLI tool `bsb`. 

[00:18] It allows us to create a new project, and ships with a couple of themes. We're going to choose the `basic-reason` theme. 

```bash
bsb -init my-new-project -theme basic-reason
```

[00:26] The project contains a `package.json` file and a `node_models` directory, pretty standard for a JavaScript project. What's special, though, is a `bsconfig.json` file, which allows you to configure BuckleScript specifically to this project. 

[00:42] Going through all the possible options and configurations is probably best to be explained in a separate course. We're instead going to focus on getting our first output with this default configuration. 

[00:53] This example comes with only one `Demo.re` file. We delete it and create a `Main.re` file instead. Inside the file, we get started with printing a Hello World. 

#### Main.re
```javascript
print_endline("Hello World");
```

Now we run `npm run build`. 

#### Terminal
```bash
$ npm run build
```

[01:08] This will compile each Reason file to a matching JavaScript file, which means we can run it with Node or in the browser. As you can see, printing worked as expected. 

[01:20] BuckleScript ships with a JS library that has a couple of utilities like `log`. 

#### Main.re
```javascript
Js.log("Hello World!")
```

`log` is quite useful, as it allows us to print larger structures and debug them. 

#### Terminal
```bash
$ npm run build
$ node Main.bs.js
Hello World!
```

[01:30] As a next step, we have the module `Math.re` with an `add` function. 

#### Math.re
```javascript
let add = (x, y) => x + y;
```

In `Main.re`, we can use `Math.add`. 

```javascript
Js.log(Math.add(2, 3));
```

If you build again and run `Main.re`, you can see that using the math module worked out of the box. 

#### Terminal
```bash
$ npm run build
$ node Main.bs.js
5
```

[01:49] By the way in case you don't want to build manually all the time, you can use `npm start`, which will watch for file changes and compile accordingly. Now you're ready to get started with your first Reason project.