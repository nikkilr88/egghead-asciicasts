Let's say we're having a little bit of trouble with this `getScale` method, and we want to debug it. One thing you could do is you could `console.log` here to make sure that the code is getting here, and then you could `console.log` maybe `in if statement`.

### auto-scaling-text.js
```js
class AutoScalingText extends React.Component {
    static propTypes = {
        children: PropTypes.node,
    }
    node = React.createRef()

    getScale(){
        const node = this.node.current
        console.log('here')
        if (!node) {
             console.log('in if statement')
            return 1
        }
    }

    ...
}
```
Then you can open up your tests and run `npm t`, and then `auto-scaling-text` to run just that test.

### Terminal
```bash
$ npm tauto-scaling-text

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest "auto-scaling-text"

 PASS  src/shared/__tests__/auto-scaling-text.js
  ✓ renders (35ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.135s
Ran all test suites matching /auto-scaling-text/i.
```

We'll see OK, cool. This is a nice feature that Jest provides, as it tell you where these `console.log` happened in the source code. Then we can see the `console.log` here. It is getting inside the `in if statement`.

Let's figure out why that's happening. This sort of debugging with `console.log` is not really super awesome. It'd be really nice if we could have the same kind of experience debugging our tests that we have when debugging our application in the browser.

00:45 We can use Node's built-in `expect` flag and Chrome's integration with that flag to make this a really great experience for debugging our tests. Let's get rid of these `console.log` statements. What I really want is to have a `debugger` statement here, so that my `debugger` can break on that line.

### auto-scaling-text.js
```js
getScale(){
    const node = this.node.current
    debugger
    if (!node) {
        console.log('in if statement')
        return 1
    }
}
```

If we look at our `package.json` for where we're running these tests, we're going to see that we have a `test` that's pointing to `jest`. For us to be able to use the Node `debugger`, we're going to write a `test:debug` script right here.

### package.json
```json
{
  "name": "calculator",
  "version": "1.0.0",
  "description": "See how to configure Jest and Cypress with React, Babel, and Webpack",
  "main": "index.js",
  "scripts": {
    "test": "jest",
    "test:debug": "",
    "dev": "webpack-serve",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --listen 8080 dist",
    "lint": "eslint .",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm run setup && npm run validate"
  },

  ...

}
```

This, we want to actually use `jest`, but we need to use the `--inspect-brk` flag from Node. What we're going to do is we'll say `node --inspect-brk`. Then we need to point to the `jest` binary, but we can't simply put `jest` here, because that will be interpreted as an argument to `Node`.

```json
"scripts": {
    "test": "jest",
    "test:debug": "node --inspect-brk jest",
    "dev": "webpack-serve",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --listen 8080 dist",
    "lint": "eslint .",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm run setup && npm run validate"
  },
```

What we're going to do is I'll pop open the `node_modules` here. We'll look down here for `jest`, and inside the `bin` directory, there's that Jest file. That's what's actually being run when we run `jest`. I'll say `node_modules/jest/bin/jest.js`.

That's the the file I want Node to run, with this `--inspect-brk` flag. Jest, by default, actually runs our tests in parallel, but that doesn't really help us a lot when we want to debug our tests. We want to have them `--runInBand`.

```json
"scripts": {
    "test": "jest",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand",
}
```

That's a flag that you can pass to the Jest binary. With that set up, now, I can run in my terminal `npm run test debug`, and I get this output, "Debugger listening on this port. For help, you can learn about the inspector."

### Terminal
```bash
$ npm run test debug
```

![image of the output he describes](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907435/transcript-images/egghead-step-through-code-in-jest-using-the-node-js-debugger-and-chrome-devtools-initial-output.png)

There are a couple ways to open this up. In the Chrome browser, I can say `chrome://inspect`. That will open up this inspector here. We have this remote `Target`, and we have this as one of the things we can inspect. I'll click on `inspect`, and that pops open a very familiar debugger experience.

![image of the chrome inspector developement window](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907430/transcript-images/egghead-step-through-code-in-jest-using-the-node-js-debugger-and-chrome-devtools-chrome.png)

Now, if I hit play through, it will load all of the modules for me, and it breaks on that `debugger` statement. Now, I can `inspect` the world. I can say `node`, and I see, oh, `node` is null. That's because this hasn't actually rendered yet.

![image of node being null](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-step-through-code-in-jest-using-the-node-js-debugger-and-chrome-devtools-null-node.png)

If I continue stepping through, I return `1`, and then my `scale` is `1`. That explains what's going on. You can debug through this way. It makes working with your tests a lot easier. You can also open the test itself, `autoscaling-text.js` inside of my test file.

Jest and Babel do a really great job with source maps. You can click on this `SM`, and that will show you your original code.

![image of drop down with SM to show original code](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907432/transcript-images/egghead-step-through-code-in-jest-using-the-node-js-debugger-and-chrome-devtools-null-node-sm.png)

You can see the transpiled code with `auto-scaling-text.js`. This is the version that the browser is actually running. Another way that you can pull this up is, if we cancel this, and then run that again, we'll see that same output again.

```bash
$ npm run test debug
```

![image of the output he describes](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907435/transcript-images/egghead-step-through-code-in-jest-using-the-node-js-debugger-and-chrome-devtools-initial-output.png)

We'll see this in our `chrome://inspect`. If we open up a new tab, and then pop open the developer tools with inspect, then you'll see this nice little `node` icon that you can click on. That will also pop up the dev tools, which you can play through and start debugging.

![image of node icon after opening a new tab](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-step-through-code-in-jest-using-the-node-js-debugger-and-chrome-devtools-node-icon.png)

In review, to make this work, all we needed to do is create this `test debug` script, where we run `node` with the `--inspect-brk` flag, and then point to the `node` file that we want to run. Specifically with `jest`, we run the `runInBand` flag, so that it will work with our debugging experience.

It doesn't try to run all of our tests in parallel, and instead allows us to run each one of these tests within the same process, so we can `debug` just that one process.