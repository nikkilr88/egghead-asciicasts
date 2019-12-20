Instructor: [0:01] Start with an empty folder. We can write a JavaScript file -- I'll just call it `mycli.js` -- inside of that folder and write a simple script like `console.log('hello world')`. 

#### mycli.js
```js
console.log('hello world')
```

We'll be able to run this CLI with the Node binary `mycli.js`. It's going to give us the expected result of hello world.

#### Terminal
```bash
node mycli.js
```

[0:26] However, this doesn't really look like a CLI. You're explicitly calling the Node binary. Ideally, you want to be able to hide that and just make it assume by default. The standard way to do this is to use a shebang. It's a secret convention at the top of your file to write something like this with a hash and a bang at the start.

#### mycli.js
```js
#!/usr/bin/env node
```

[0:47] This tells your operating system to use whatever is currently installed as the Node binary and to run this file through that Node binary. The user doesn't have to type it out themselves. They could actually type `./mycli.js` and run it perfectly, except for one thing, which is the permissioning system.

[1:09] By default, you are not able to execute files unless you explicitly mark their permission bits as being executable. You can do that by writing `chmod +x mycli.js` in the erminal. 

#### Terminal
```bash
chmod +x mycli.js
```

Now you're able to execute it and get the required result without explicitly invoking the known command.

[1:31] If all CLIs were only used for static script execution, they would not be very interesting. You probably want to take in information from your user to affect the execution of your program in some way. The classical way to do this is to use Node's global process subject. There is a special field on it called `agrv`. Let's log it out. We'll see what that gives you back.

#### mycli.js
```js
console.log(process.argv)
```

[1:59] When I log out `argv`, I get back these this array of two strings. 

#### Terminal
```bash
./mycli.js
hello world
[ '/Users/swyx/.nvm/versions/node/v10.17.0.bin/node',
  '/Users/swyx/Egghead/egghead-cli-workshop/cli/mycli.js' ]
```

The first string tells me the path to the Node binary that the operating system has resolved for me that I'm using to execute the CLI. The second tells me the path to the script that I'm executing that's running the CLI.

[2:20] This is a infinitely long list. It also includes all the arguments that are passed in afterwards. I can pass in something like `myapp` or `ppname=Charizard` and actually see that come out in `process.argv`.

```bash
./mycli.js
hello world
[ '/Users/swyx/.nvm/versions/node/v10.17.0.bin/node',
  '/Users/swyx/Egghead/egghead-cli-workshop/cli/mycli.js', 
  'myapp',
  '--name=Charizard' ]
```

[2:37] Obviously, the first two are not really typically used. You might want to slice that off. I'm going to separate that out into a separate variable called `args` over here. I'll just type `slice(2)`. 

#### mycli.js
```js
console.log('hello world');
const args = process.argv.slice(2);
console.log(args);
```

This is a very common operation to split out something where you just want to access what the user has passed in inside of your Node CLI code.

#### Terminal
```bash
./mycli.js
hello world
[ 'myapp', '--name=Charizard' ]
```

[3:03] From here, you can actually keep on processing the arguments in whatever way you see fit. For example, one of the typical ways is to do it positionally. For example, if I want to have the convention that the first argument is the specified directory, I can just say, `args[0]`

#### mycli.js
```js
const dir = args[0]
```

[3:20] If I want to take a name flag, I can just parse the name flag as well and say something like, `args[1].slice("--name=")[1]`. The way that this works is that I can actually pass in whatever is conforming to the schema that I specified and get back whatever has been processed by my argument parsing system.

```js
const name = args[1].slice("--name=")[1];
```

[3:50] I could of course hand-write everything or use established conventions. There's some dedicated libraries that help you do that. For example, standalone libraries that do argument parsing for you, like minimist, meow, and arg, as well as some post-processing that might be pretty standard, like normalizing and comparing URLs.

[4:09] Any CLI framework will probably also try to do command parsing for you as this is pretty standardized boilerplate-y stuff that you probably don't want to write by hand. Once you're happy with your CLI, you probably want to also publish it because your users are not going to clone your GitHub repo just to play around with your CLI.

[4:28] The best way to distribute your Node CLIs is via npm. You should ideally want to publish it through npm. We're going to init our project here with `npm init -y`. That initializes a `package.json` file.

[4:45] The only thing that you have to add to this `package.json` file to turn this into a CLI is a special `bin` field. This points to wherever your CLI is. Currently, it's at the top level, but you can have it inside a sub-folder if you want. That will tell npm exactly what to do with that bin command.

#### package.json
```json
{
  ...
  "bin": "mycli.js",
  ...
}
```

[5:03] From here, I should also rename the package to something unique which is not taken by npm. I'm going to name it `"eggheadcli-mynewcli"`, for example. Then I can type `npm publish` in the terminal. Once it's published to npm, any user can use the CLI from npx. If I go into a random folder and type `npx eggheadcli-mynewcli`, it's going to install and immediately run it.

[5:30] Because I wrote in this hard dependency on having arguments, I should probably also specify my arguments. `newApp --name=Bulbasaur`. That's going to run accordingly as well.

#### Terminal
```bash
npx eggheadcli-mynewcli1 newApp --name=Bulbasaur
```

[5:45] Of course, you might want to install it rather than just running it through npx. You can also do `npm i -g eggheadcli-mynewcli1`. That installs it inside of your local Node distribution. In fact, it also tells you where it's installed. You can actually go ahead and `ls` that folder.

[6:11] You can see that new CLI that's been installed by you. If you open up that file, you can actually see the contents of the source code that you just published to npm and that you just wrote in your terminal.

[6:26] For the purposes of developer experience, you may not always want to write your code and then publish to npm and then install from npm and then run your code. You may just want to write your code and then run it immediately in a test environment just to see if your code works.

[6:42] The best way to do that is to make sure that you don't have any global installs of your CLI anywhere. I run npm uninstall. Then you can use `yarn link --global`, so globally link your CLI everywhere. Now you're free to edit your code directly and then immediately run them inside of your code.

[7:09] This is a much nicer developer experience for CLIs. You can also use yarn workspaces to do this locally so you don't have to do global links.
