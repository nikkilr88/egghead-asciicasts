Let's add ESLint to this project to help us avoid some common JavaScript errors. We'll start with an `npm i -D` to save this as a dev dependency, and we're going to install `eslint`. Because this project uses React, we're also going to install `eslint-plugin-react`.

#### Terminal
```javascript
npm i -D eslint eslint-plugin-react
```

With that installed let's open up our `package.json`. In our `"script"` section, we're going to add a script we'll call `lint`. The body of the script is going to be a call to `eslint`. We're going to have it basically just have it lint all of our JavaScript files.

#### package.json
```javascript
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack-dev-server --open --config webpack.config.dev.js",
    "dev:hot": "npm run dev -- --hot",
    "test": "jest",
    "format": "pretty-quick",
    "lint": "eslint ./"
  },
```

I'll save that. Now, in the terminal, I'm going to run that script with `npm run lint`, and we're going to get this error that ESLint couldn't find a configuration file. We can set that up with this ESLint init command.

#### Couldn't find config file
![Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-error.png)

Let's clear out our terminal and we're going to use NPX to do this, `npx eslint`. We'll pass it that `init` flag.

#### Terminal
```
npx eslint --init
```

We're going to get a series of prompts, and let's walk through those now. We can pick between using a popular style guide, answering questions about our style, or inspecting our JavaScript files.

#### eslint --init
![eslint init](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-eslint-init.png)

We're going to go with the `Answer questions about your style` option. It's going to ask which version of that kind of ECMAScript we use. We're going to go down to `ES2018`. Are we using ES6 modules? The answer to that is `yes`. Where will your code run? The answer to this is actually both, because we also want to lint things like our webpack config files.

I'm going to use `a` to toggle both Browser and Node on.

#### Browser & Node
![Browser & Node](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563595/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-browser-node.png)

Because we're using both browser and Node, we do use `CommonJS`, `JSX`, and `React`. Our style of indentation is `Spaces`. We use `Single` quotes. `Unix` line endings, semicolons, we'll say `no`, and the format for our config file can just be `JSON`. It's going to create this `eslintrc.json` file.

It's also going to tell us that we have a dependency, this `eslint-plugin-react@latest`, which we installed along with ESLint, so that's handled. We can get rid of this, and in our `.eslintrc`, we'll see that it's created this config file with quite a few options. At the top of this file, we have this `env` key, and that defines the environments that our code can run in.

#### .eslintrc.json
```javascript
"env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
},
```
As you'll see, we have multiple environments. Some of our code is Node-based. Some is meant for the browser. This is going to make sure that things like the window global in our browser code doesn't throw an error, because it's not defined somewhere. This environment's going to say that window is an acceptable global to use.

Then we have the `extends` key. This allows us to extend existing configurations. ESLint comes with this built-in `recommended` configuration that we're going to extend here, and we'll come back to this in a second.

```javascript
"extends": "eslint:recommended",
```

`parserOptions` configures things like support for JSX and our ES version. 

```javascript
"parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
```

You'll see that we have this `react` plugin, so this is going to apply some React-specific configuration.

```javascript
"plugins": ["react"]
```
Then we have the `rules` section. When we look at the rules, you're going to see things like `indent`, `linebreak-style`, `quotes`, and `semicolons`. 

These are all formatting-related, and since this project is already configured with Prettier, we're not going to enforce those rules through ESLint, we're just going to let Prettier automatically format our code. For this configuration, we can actually delete this entire `rules` section.

If I get that terminal out of the way, I can come up here, and I can delete the `rules` key, and the entire object value. We'll save that. If we jump back up, we can go back to this `extends`. Part of what this recommended ESLint config does is it includes certain rules that are recommended.

If we look at the ESLint website, there's a long list of rules. They're broken out into categories, things like possible errors, best practices, etc. If we scroll down, any rule that has a checkbox in this column to the left here is part of that recommended set of rules.

As we can see as we scroll through here, there's a lot of rules that are included out of the box, when we extend that recommended config. Rather than defining a bunch of specific rules, we're going to stick with the recommended ones.

#### Recommended Rules
![Recommended Rules](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563597/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-recommended-rules.png)

Let's go back to the code, and in our terminal, let's run that `lint` command again, now that we have our configuration file in place. I'm going to `npm run lint`, and we're going to get another failure. Let's expand this, and let's take a look. We'll see that we have a lot of problems.

#### Semicolon rule errors
![Errors](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563597/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-recommended-rules.png)

We're going to see a lot of errors related to this unnecessary semicolon rule. If we look, we'll see that this is actually coming from our `app.bundle` code in our `dist` directory. This is generated code. We don't really want to lint this. In the root of our project, I'm going to go in and I'm going to add an `.eslintignore` file.

In that file, I'm going to add the `dist` directory as an ignore.

#### .eslintignore
```
dist
```

I'll save that file, and then back in the terminal, let's run this again. We're still going to get errors, but you'll see we went from 45 problems down to 4. This is progress. Let's scroll up, and you'll see that we're getting a parsing error for this `Unexpected token import`.

#### Unexpected Token Error
![Unexpected Token](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-unexpected-token.png)

To fix this, I'm going to actually install another package. I'm going to `npm i -D` and I'm going to install `babel-eslint`. With that installed, I'm going to go into my `.eslintrc.json` file and right at the top, I'm going to add another key to this file. I'm going to come in here, and I'm going to add a `parser` key. My `parser` is going to be `babel-eslint`.

#### .eslintrc.json
```javascript
"parser": "babel-eslint",
```

I'll go back into the terminal, and I'm going to run `npm run lint` one more time. Now, we've gone from four problems to eight problems, so it seems to be getting worse, but if we look at the errors, we'll see that it's no longer complaining about our syntax. Now, it's complaining about specific errors related to React and some globals that we're using.

#### React Errors
![React Errors](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-react-errors.png)

We can clean these up with some more configuration. I'll get the terminal out of the way, and I'm going to go into this `extend` setting here. I'm going to make this an array of strings, and my second element in this array here is going to be our react/recommended rules from our plugin. 

We're going to prefix this with `plugin`, and that plugin is `react`. From that, we want to use the `recommended` settings.

```javascript
"extends": ["eslint:recommended", "plugin:react/recommended"],
```

We can save that, and let's go back into our terminal, `npm run lint`, again. Now, we're down to three issues. Let's start with this `Component definition is missing display name` issue. 

#### Component Missing Name Errors
![Component Missing Name](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-component-missing-name.png)

This is coming from our React plugin, and this is coming from `Warning.js`. Let's get the terminal out of the way. I'm going to go into `Warning.js`, and here, we're exporting a `default` function component. I'm going to take the `export default`, cut that. I'm going to define a constant called `Warning`, and I'm going to assign that function component to `Warning`.

I'm going to drop down, I'm going to `export default Warning`. We still have the same behavior we had before, but now we can access this function by name. I'm going to come in here, I'm going to set `Warning.displayName`, and I'm going to give that a display name of `"Warning"`.

#### Warning.js
```javascript
import React from 'react'

const Warning = () => <span className={'warning'}>Take it easy!</span>

Warning.displayName = 'Warning'

export default Warning
```

I can close that file, and back in my terminal, I can `npm run lint` one more time. That error has been cleared up, and we're down to two problems. Both of these problems are in our `App.spec.js`, and ESLint doesn't like the fact that we're using `describe` and `it` without having them defined. 

#### Spec Errors
![App Spec Errors](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-app-spec-error.png)

We're not importing them, so if we look at our file here, we'll see that `describe` and `it` are just globals Those are defined by Jest, and this is a legitimate use for these globals, we just need to let ESLint know. We'll come in here, and in our `.eslintrc.json`, we're going to add another environment for jest.

We'll just add a `jest` key, with the value of `true`, we'll save that.

#### .eslintrc.json
```javascript
"env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
    "jest": true
},
```
And then back in the terminal, we can `npm run lint`, and everything passes. We're not breaking any rules, but we do still have this warning left over. I'd like to clear that up. This is saying that the React version's not specified, and the `eslint-plugin-react` wants to see that.

#### React Warning
![React Warning](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/eslint-avoid-common-javascript-errors-with-eslint-react-warning.png)

Let's get the terminal out of the way. In our `.eslintrc`, we're going to add a `settings` key at our top level, and that's going to be an object. That object is going to get a `react` key, which will also be an object. That's going to get a `version`, and that's going to get our version number as a string.

Let's double check in our `package.json`. We can look at our dependencies, and we'll see that we're using React 16.6.1. I'm just going to copy that and paste it right into that config.

```javascript
"settings": {
    "react": {
      "version": "16.6.1"
    }
  },
```
I'll save it, come back in the terminal. I'll run `npm lint` one more time, and now that warning's gone away, and we're not breaking any rules.
