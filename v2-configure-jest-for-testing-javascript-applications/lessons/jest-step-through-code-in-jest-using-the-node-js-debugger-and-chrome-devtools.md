Instructor: [00:01] Imagine I'm writing this test, and I want to do a little bit of debug on this getScale function. I'm thinking, "OK, why is it returning 1 here? Why is that Node not defined?" I'm going to console.log(node). Maybe I'll console.log('in here'). I'll console.log('not in there'). 

```js
function getScale(node) {
console.log(node)
  if (!node) {
  console.log('in here')
    return 1
  }
  console.log('not in there')
  const parentNode = node.parentNode

  const availableWidth = parentNode.offsetWidth
  const actualWidth = node.offsetWidth
  const actualScale = availableWidth / actualWidth

  if (actualScale < 1) {
    return actualScale * 0.9
  }
```


I want to just `npm run test:watch`. We want to see that output right there.

[00:26] We've got a bunch of these outputs. We've got a Node up here. Let's go ahead, and we'll just run autoscaling tech. We'll say `autoscaling`. Then, I'll just run the one. We're getting undefined, and then we're getting in here.

[00:38] Node is undefined. It's a little bit harder to debug. As cool as it is that Jest will give us this output to tell us exactly where that console.log happened, it would be nice if I could just step through the code in the same familiar development environment that I have when I'm running in the browser.

[00:54] What I really want to be able to do is just add a debugger statement in here and have my browser dev tools stop right there. I can do that in the browser, but I can't do it when I'm running my test. Or can I?

[01:04] That's what we're going to add here. I'm going to add a new script called test:debug. Node has built into it the special flag called --inspect-brk, which is inspect break, which means Node will start up a process, and before running any of the code, it will add a break point. Then you can hook up the Chrome debugger to debug that Node process.


[01:25] What is the process we want to have run? We want to have the Jest process run, but we can't pass Jest because that would just be passed as an argument to Node. Node wouldn't know what to do with Jest. We need to pass it a path to the Jest binary.

[01:40] Where is that Jest binary? Let's go up here into our Node modules. We'll go down to Jest. We can find that in here. We've got Jest right here. Here, we have the bin directory. There's the jest.js. That's the file we want to have Node run.

[01:57] We'll do node_modules/jest/bin/jest.js. Jest runs all of our files in parallel. We're going to run runInBand because running in parallel won't work very well with what we're trying to do here because it spawns new Node processes, so that won't work very well.

[02:15] By running in band, it ensures that all of our test run in the same Node process so we can debug that process with our Chrome developer tools. We're also going to add the watch flag here because that makes the development experience a lot easier. We'll go ahead and save that.

```js
"scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
    "dev": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --single --listen 8080 dist",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
    "lint": "eslint --ignore-path .gitignore .",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm install && npm run validate"
```

[02:29] I'm going to quit this. We'll `npm run test:debug` instead. That's going to give me this output saying that a debugger is listening, and we can go look up some help there. I can show you how we can get this up and running. If you open up Chrome and go to chrome://inspect, that will take you to this special view where I'll show you the different debugger sessions available.

[02:53] One of those is Node. I can click on Inspect right here and that will pop open the Chrome Developer Tools. Then I can play through here and it will stop on that debugger statement that I left in my code and I can see, "Oh OK, here's the Node," and if I back up, "Oh, that's where it's getting called."

[03:10] The nodeRef, "Oh, we're not initializing that to anything. This is the first time it's getting called." That explains why our nodeRef.current is undefined.

[03:18] We can look all throughout the call stack and if we go far enough, we can actually find our test utility right here and ultimately our calculator test, which is running the code that ultimately runs into this auto scanning text test. Then we can just close this.

[03:35] Another way that we can start up the DevTools is by opening Chrome and then opening the DevTools with the Inspect button here. There should be a Node button that we can click right in our DevTools. That will pop open the DevTools as well.

[03:48] In review, to make all of this magic happen, we simply added a script called test:debug and then we used Node with the --inspect-brk flag to point to the Jest binary. Now when you said, "Hey Jest, don't run in parallel, just run in band," and it will run with a --watch flag. As we're making changes, our DevTools can stay open and we can interact with our code through the DevTools with Chrome.
