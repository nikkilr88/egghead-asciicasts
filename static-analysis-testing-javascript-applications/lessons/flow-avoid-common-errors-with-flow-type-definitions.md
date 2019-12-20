To install **Flow**, we're going to `npm install` as a dev dependency, `--save-dev flow-bin`. **flow-bin** will be added to our dev dependencies here, and it includes a binary in the .bin directory called Flow. We can use that in our scripts in `package.json`.

#### Terminal Input
```
npm install --save-dev flow-bin
```

I'll add a `flow` script, and that will simply be `flow`.

#### package.json
```json
"scripts": {
    "lint": "eslint src",
    "flow": "flow",
    "format": "npm run prettier -- --write",
    "prettier": "prettier \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run lint && npm run prettier -- --list-different"
},
```

Now, if we run `npm run flow`, it's going to tell us that we need to run Flow with `init` to configure Flow. Let's go ahead and do that.

#### Terminal Input
```
npm run flow
```

We'll `npm run flow init`, and that's going to create a new file for us called `.flowconfig`, where we configure Flow to ignore certain files, include specific files, and we have several other options available to us.

#### Terminal Input
```
npm run flow init
```

We're going to go ahead and leave those out. Now, we're going to add a new file that I'm going to call `flow-example.js`. I'm going to paste a bunch of code into here to demonstrate how to use Flow. Here, I have an add function that takes `a` and `b`.

#### flow-example.js
```js
function add(a: number, b: number): number {
    return a + b
}
type User = {
    name: {
        first: string,
        middle: string,
        last: string,
    },
}
function getFullName(user: User): string {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join('')
}
add(1,2)

getFullName({name: {first: 'Joe', middle: 'Bud', last: 'Matthews'}})
```

Each of those is a `number`, and it returns a `number`. We can define those types right in our JavaScript, making it a lot easier for us to avoid common mistakes. We can also define custom types. This is a `User` object that has a `name` property. That `name` property has properties of its own.

This `getFullName` function is expecting a `User` object that is a `user` of that type, and it returns a `string`. Then we can use those functions, where we can add one and two, and get the full name of this `User` object.

Now, if I open up my terminal here, and I run `npm run flow`, it's going to start up flow for me, and type check all of the files that I have in my project that have a Flow pragma at the top. We're all set. We don't have any errors.

#### Terminal Input
```
npm run flow
```

Let's see what would happen if I did have an error. I'll pass a string in here.

#### flow-example.js
```js
add('1', 2)
```

Run flow again, and immediately, it's going to tell me it cannot call the string `1`, because it's a string, and that's not compatible with a number.

It says here's where that string is, and this is the function that it's being called into. That's the number that this one is supposed to be. You can either fix the type definition by changing this to accept a string, or you can fix the function call so that this is a number.

![error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908124/transcript-images/egghead-install-run-and-configure-flow-error.png)

We could pass `number` in here, and that would get Flow to be happy again.

```js
add(Number('1'), 2)
```

We'll just go ahead and clean that up here, and it can do the same thing here in `getFullName`. If I changed `middle` to the Boolean `false`, and then ran flow again, I'm going to get a similar error, saying, "Cannot call getFullName with this object literal, because Boolean is incompatible with string in the property name.middle."

```js
add(1, 2)

getFullName({name: {first: 'Joe', middle: false, last: 'Matthews'}})
```

There's a whole category of errors that I don't need to worry about running against, because the types are going to be checked statically when we run our `validate` script. Speaking of the `validate` script, let's go to our `package.json`.

We've got our Flow right here. Let's add flow to our validate script. We'll say `&& npm run flow`.

#### package.json
```json
"validate": "npm run lint && npm run prettier -- --list-different && npm run flow"
```

Now, if we run `npm run validate`, we're actually going to have a problem. We're getting a parsing error from ESLint.

#### Terminal Input
```
npm run validate
```

The parsing error is it's saying there's an unexpected token. That token is in `flow-example.js`, that colon right there.

#### flow-example.js
![parsing error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908125/transcript-images/egghead-install-run-and-configure-flow-parcing-error.png)

ESLint actually doesn't understand Flow syntax. To help it out, we're going to install a parser. I'm going to `npm install --save-dev babel-eslint`.

#### Terminal Input
```
npm install --save-dev babel-eslint
```

With `babel-eslint` installed, I can go to my ESLint configuration and add `parser: babel-eslint`.

#### .eslintrc
```json
{
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": "2018"
  },
  "extends": [
    "eslint:recommended"
  ],
  "rules": {
    "no-console": "off"
    "semi": ["error", "never"],
  },
  "env": {
      "browser": true
  }
}
```

Now, if I run `npm run validate`, ESLint is going to pass, Prettier will pass, and Flow will pass. We're all set.

#### Terminal Input
```
npm run validate
```

In review, to install Flow, you `npm install` as a dev dependency `flow-bin`, and get that added to your dev dependencies. That will add the Flow binary, so you can use it in your scripts here. Then we also added that to our `validate` script.

Then you can start using the Flow comment at the top of your files, which will enable Flow for this particular file. Then you can start adding type definitions to your JavaScript to help avoid some really common errors in programming with JavaScript.