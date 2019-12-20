[00:01] Let's first start by creating a directory called `npx-test`. 

#### Terminal
```
mkdir npx-test && $_
```

We'll immediately change directories to our new folder. In order to start using Node modules, let's first create a `package.json` with `npm init`. 

```
npm init -y
```

You could provide the `--yes` flag or `-y` for short to automatically generate a `package.json` without it having to ask you questions.

[00:22] It'll just use the default values. `NPM` will then print out the contents of the `package.json` for us to see. Sure enough, it looks legit. 

#### package.json
```json
{
    "name": "npx-test",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\"
    }
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

Now,let's install `ESLint` with `npm install`, or `npm i` for short, and save it as a dev dependency with `--save-dev` or `-D` for short.

#### Terminal
```
npm i eslint -D
```

[00:42] If we cat our `package.json`, you'll see that there is now a dev dependency of `ESLint`. 

#### package.json
```json
}
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
      "eslint": "^5.0.1"
  }
  ```

If we wanted to confirm that the package was actually installed, we could run the command `npm -ls eslint`. Yes, we have indeed installed `ESLint` locally.

#### Terminal
```
npm ls eslint
```

[00:58] Before we move on, let's create a small JavaScript file so that we could exercise `ESLint`. We'll echo `let X equals one, semicolon, Y equals two, semicolon`, and then redirect the output to an `index.js` file. 

```JavaScript
echo "let x = 1; y = 2;" > index.js
```

Since we previously confirmed that `ESLint` is installed locally, you might be tempted to start interacting with it on the terminal.

[01:20] For example, `eslint --init`. 

```
eslint --init
```

No, that does not work. It doesn't know about my locally installed version. It's looking for something that's globally installed. You could get around this by manually poking into your local `Node` modules bin folder in order to run `ESLint`.

```
./node_modules/.bin/eslint --init
```

[01:38] That will work, but it's somewhat cumbersome, and not obvious at first. Another approach could be to leverage Unix command substitution, which takes the output from the `npm bin` command, and replaces the command itself.

[01:51] Then proceed to invoke the locally installed `ESLint`. 

```
$(npm bin)/eslint --init
```

Likewise, this works, but it still could be better, which is where `NPX` comes into play. As long as you have `NPM` version 5.2 or above, then you're good to use `NPX`.

[02:05] One of the many things it can do is allow you to invoke locally installed `Node` modules from the terminal. Here, we can `npx eslint --init`, and it'll work just fine. No more messy commands in the terminal.

```
npx eslint --init
```

[02:20] Here, I'll pick a few options to get `ESLint` set up for us. Let's go with the standard style guide. Yes, we'll install the dependencies. Now, we have an `ESLint RC` file. At this point, you could start playing around with different commands from the terminal, leveraging the locally installed version of `ESLint`.

[02:38] Here, for example, we see a couple of errors that it detected. 

![errors found](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1560799658/transcript-images/npm-use-npx-to-run-locally-installed-node-modules-errors-found.jpg)

If you feel good about this command, and want to promote it as an `NPM` script, then you could hop into the `package.json` file, and in the script sections, add a new script. In our case, we'll call it `Lint`. Its value, we'll type the same command that we had before.

#### package.json
```javascript
"lint": "eslint --cache --fix ./"
```

[02:58] Now, once we save our `package.json`, we could confirm that it does exist as a script by running `npm run`. Sure enough, it does. Now, we could run the script from the terminal with `npm run lint`, and it works.

#### Terminal
```
npm run lint
```

You may have noticed there was a lot of extra noise on the terminal.

[03:13] If that happens, and you'd like something a bit cleaner, you could try the command again, but this time, append the `-s` flag to run at the silent log level, which outputs much less results.

```
npm run lint -s
```
