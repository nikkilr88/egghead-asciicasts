[00:01] Let's take a look at the latest version of `create-react-app` on `npm`. We could use `npm view`, or we could just use one of the aliases of `info`, `show`, or just `v`. Then our name, and we could ask the version, which is currently at 1.5.2.

#### Terminal
```
npm v create-react-app version
```

[00:19] If I pull up the command again, and then add an `s`, we could get a list of all the versions, which could get a bit overwhelming. 

```
npm v create-react-app versions
```

What I'd like to do is try out a version of an upcoming release. In particular, one of those `-next releases`.

[00:33] However, those tags are a bit messy. Let's try `npm v create-react-app`, which will list some `dist` tags near the end of the output. 

```
npm v create-react-app
```

`Dist` tags provide aliases for version numbers. In this case, `React` maps next to one of the `2.0.0-next` tags we were looking at earlier. That makes it much easier to type.

[00:54] With that in mind, let's use `npx` to try out the next `dist` tag of `create-react-app`, with `npx create-react-app @next`. We'll ask to create a playground app. 

```
npx create-react-app@next playground
```

`NPX` will temporarily the next version of `create-react-app`, and then it'll execute to scaffold the app and install its dependencies.

[01:14] Once it's installed, we can navigate to the app, and kick it off with `npm` start. 

```
cd playground
npm start
```

Voila, we have an app running that was bootstrapped with the next version of `create-react-app`. However, things may not always go as smoothly when you install `canary`, `alpha`, or `beta` `dist` tags.

[01:31] For example, let's take a look at `ESLint`. We'll create an example project, `npx-eslint`, quickly create a `package.json` file with `npm init -y`, and then create an `ESLint` config with `npx eslint --init`. 

```
mkdir npx-eslint && cd $_
npm init -y
npx eslint --init"
```

In this case, we'll pick the Google style guide, and we'll install the appropriate dependencies.

[01:53] Let's update our `ESLint RC` file and add parser options, `ecma` version six, and save our changes. 

#### Terminal
```
vim .eslintrc.js
```

#### .eslintrc.js
```javascript
module.exports = {
    "extends": "google",
    "parserOptions": {"ecmaVersion": 6 }
    };
```

Before we start playing around with `ESLint`, let's create some problematic `Javascript` code by echoing `let X equals one, semicolon, Y equals two`, and redirect that to an `index.js` file.

#### Terminal
```javascript
echo "let x = 1; y = 2" > index.js
```

[02:14] As we did before, let's `npm view eslint`. 

```
npm view eslint
```

You'll see there is a next `dist` tag pointing to the `5.00-rc.0` release. Let's go ahead and try that out with `npx eslint @next`, passing our current directory to be linted. 

```
npx eslint@next ./
```

Oh, well it appears that we need a module that can't be found in order to run the next release of `ESLint`.

[02:37] Thankfully, `npx` has us covered. We could use the `-p` flag of `npx` to specify packages to install, and add that to the running `$path`. We could try that again with `npx -p eslint @next -p eslint-config-google`. Then `-c` to execute a command.

[03:00] In our case, `eslint./`. 

```
npx -p eslint@next -p eslint-config-google -c "eslint ./"
```

Now, `NPX` will temporarily install the next version of `ESLint`, along with the `eslint-config-google` dependency that it needed, and then executes the `ESLint` to lint our project. Voila, it found our linting error.