Let's update this `greet` module with some modern JavaScript syntax. I'm going to start by replacing this `const greeting` string with `getGreeting`, which is going to be a function, and we're going to make this an arrow function.

We're going to have this accept a `name` argument. Then we'll use string interpolation to insert that `name` into the resulting string, so replace `world` with dollar sign curly braces and a variable inside that string.

#### greet.js
```javascript
const getGreeting = name => `Hello ${name}`
```

We pass this "World." We expect to get "Hello World" back. Then, I'm going to come down to our `export` and I'm going to update my default export to `export getGreeting`. I can save that.

```javascript
const getGreeting = name => `Hello ${name}`

export default getGreeting
```

I'm going to jump back into `index.js` where I'm consuming this. I'm going to `import getGreeting from './greet'`. In here, I'm going to call that function and I'm going to pass it the string `world`.

#### index.js
```javascript
import getGreeting from './greet'

console.log(getGreeting('world'))
```

I can save that. Now that we've updated this code, let's drop into the terminal and I'm going to do an `npm run build` to run webpack. We'll see that we get some output. We have an `app.bundle.js` based on this new code.

I'm going to run `node dist/app.bundle.js`. Let's see what this code does. 

![Console Output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/babel-transform-modern-javascript-features-with-babel-console-output.png)

We'll see that we get our console of `Hello world`, exactly what we'd expect. Let's take a look of the output. We're looking at the minified production output from webpack, but if we jump to the very end of the file, we'll be able to tell what's happening in this code.

![End of file](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/babel-transform-modern-javascript-features-with-babel-end-of-file.png)

If we'd look at this output code, we'll see that we have an arrow function that's using string interpolation. This is just the minified version of our `getGreeting` function. It's being called `n` here. `e` is what we call `name` in our source code, but the string interpolation is still happening, and our function call is happening with our `console.log`.

The modern JavaScript features that we've used here are still modern JavaScript features. As we saw, this runs fine if you're running a current version of node. If we try to put this in an older browser, it doesn't support these things. Then, our code isn't going to work.

We need a compiler as part of our process. It helps us transform this new style JavaScript into JavaScript that will run in down-level browsers. We're going to use `Babel` for this.

I'm going to drop into the terminal and install a few more dev dependencies. We use `npm i -D` to install these as dev dependencies. We're going to have three items. We're going to have `@babel/core`. We're also going to have `@babel/cli`. We're going to have a preset which is called `@babel/preset-env`, and we'll press Enter to install those. With those installed, let's take a look at how Babel works.

Babel-cli will put an executable in that `node_modules/.bin` directory. We could run it like this. We can do `node_modules/.bin/babel`. The other way we could do this is we can use the shorthand. We can use `$()`. Inside the parentheses, we can type`$(npm bin)/` and npm bin will just expand to `node_modules/.bin`.

Now we can run Babel and one of the arguments that we're going to pass in the Babel is going to be a source file. In this case, we're going to do `src/greet.js` and we'll hit enter.

#### Terminal
```javascript
$(npm bin)/babel ./src/greet.js
```

We'll see that it essentially gives us exactly what we gave it. We passed in `src/greet.js` and it spit back out the same exact code. It still has the arrow function, still has the string interpolation, still has our export default.

Let's try this one more time, but this time we're going to pass a second argument. We're going to give it the `presets` flag. We're going to set that to equal that preset that we installed as part of our dependencies or @babel/preset-env.

```javascript
$(npm bin)/babel ./src/greet.js --presets=@bable/preset-env
```

![Output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/babel-transform-modern-javascript-features-with-babel-console-output.png)

This output is very different from our input. We'll see that it's added `use strict` at the top here. We have this `Object.defineProperty` entry here. This lets importing modules. Note that this is a transpiled ES modules. We don't want to worry too much about this, but the important part here is that it's taken that arrow function that use string interpolation.

We no longer have `const`, we have `var`. We now are using a function expression. Inside instead of string interpolation, it's using `concat` on a string and passing a second string into it. We've taken our modern JavaScript code and Babel knows how to take that, convert it to an AST and then spit out JavaScript that will run in all the browsers.
