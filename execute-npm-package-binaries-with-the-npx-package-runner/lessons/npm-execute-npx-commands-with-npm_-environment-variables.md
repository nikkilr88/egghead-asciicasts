[00:01] Let's create a folder, `npx-env`, and create a `package.json` file. 

#### Terminal
```
mkdir npx-env && cd $_
npm init -y
```

If we run `npm run env`, you'll see that there are tons of environment variables that `NPM` makes available to us when running `NPM` scripts.

```
npm run env
```

[00:19] Upon further investigation, we could `grep` those that start with `npm_`, and we'll find that there's a lot of information from inside our `package.json` represented as environment variables. 

```
npm run env | grep npm_
```

What if we wanted to leverage those environment variables while using `NPX`?

[00:36] Let's try that, but first, we'll set up an environment to play around with. Here, we'll install `Babel CLI`, `babel-preset-env`, and `babel-plugin-transform-object-rest-spread`, using `Bash brace` expansion. We'll make them `dev` dependencies with the `-D` flag, and we'll pass `-s` to keep the logging silent.

```
npm i babel{-cli,-present-env,-plugin-transform-object-rest-spread} -Ds
```

[01:00] Now, we'll leverage the preset plugin by adding them to a `Babel RC` file. 

```
echo '{ "presents": ["env], "plugins": ["transform-object-rest-spread"] }' > .babelrc
```

Then we'll add a `Javascript` file that takes an object with properties `one` and `two`, and then spreads it in a new object, with the `three` property.

```javascript
echo "let a = { one: 1, two: 2 }; console.log( { ...a, three: 3 } );" > index.js
```

[01:19] Using `npx` to run our local installation of `Babel`, we'll ask it to transpile our code to the `lib` folder, which works just fine. 

```javascript
npx babel index.js -d lib
```

However, what if we wanted to experiment, and have our output folder be prepended with the version of the package?

[01:36] What if we could use the environment variable `$npm_package_version`? 

```
npx babel index.js -d lib/$npm_package_version
```

Well, it didn't work. The output still went to `lib/index.js`. Let's try that again. However, this time, let's pass the `-c` flag to `npx`, that will execute our command in an `npm run` script-like environment, meaning that it will have access to all the environment variables that we saw earlier.

```javascript
npx -c 'babel index.js -d lib/$npm_package_version'
```

[02:04] Sure enough, now our output file gets put into a `lib/1.00/` folder. Now, since we feel good about our new command, we can open up our `package.json`, and make it an official `NPM` script, where it also has access to all those environment variables.

[02:22] We'll call it `build`, and we'll put the same command that we were just playing around with earlier. 

#### package.json
```javascript
{
   "name": "npx-env",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
       "build": "babel index.js -d lib/$npm_package_version"
   },
```

Now, we could come back and execute our new script with `npm run build`.

#### Terminal
```
npm run build
```