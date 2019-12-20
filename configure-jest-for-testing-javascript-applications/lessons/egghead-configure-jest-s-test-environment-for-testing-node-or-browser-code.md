Jest does a lot of awesome things for us by default. One of those awesome things is simulating a browser environment in Node. Here I can add a `console.log(window)`,

#### utils.js
```js
console.log(window)
```

and if I run my test, I'm going to see that huge object logged to the console.

#### Terminal
```bash
npm t
```

For these tests, we're not actually using `window` at all. We're not using the browser environment. This all can run in Node or the browser. The way Jest is doing this is it's using a module called JSDOM which will simulate this browser environment. There's a little bit of a performance hit for Jest to set up this JSDOM test environment. If you're just writing code that can run in Node then it's better to tell Jest to run that code in a Node test environment and not set up JSDOM.

#### utils.js
```js
function getFormattedValue(value, language = 'en-US') {
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  })

  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/)

  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]
  }
  return formattedValue
}

export {getFormattedValue}
```

We can do this simply by running `npm t` and then passing on the argument `"--env=node"`. That's going to throw an error because now `window` is not defined.

#### Terminal
```bash
npm t -- --env-node
...
Reference error: window is not defined
    ...
        7 console.log(window)
    ...
```

Let's go ahead and set up a configuration that will set this for us. I'm going to add a configuration file to the root of the project called `jest.config.js`, and Jest will pick up this configuration file by default.

Here I'm going to say `module.exports` equals this object, and we'll have a property called `testEnvironment`, and that's going to be `'jest-enviroment-node'`.

#### jest.config.js
```js
    module.exports = {
        testEnviroment: 'jest-enviroment-node',
    }
```
Now if I run my test, I'm going to get that error again because `window` is no longer established in this environment we're using Node.

#### Terminal
```bash
npm t
...
Reference error: window is not defined
    ...
        7 console.log(window)
    ...
```


If I want to specify that environment then I can say `'jest-enviroment-jsdom'`.

#### jest.config.js
```js
    module.exports = {
        testEnviroment: 'jest-enviroment-jsdom',
    }
```

I'll run my test again, and I get that huge object logged to the console again.

#### Terminal
```bash
npm t
```

I'm going to leave it this way because this is a project that's intended for the browser, so we want our Jest environment to be JSDOM. I'm going to make it explicit even though that's the default.

I'm going to go ahead and get back here into `utils.js` and remove that `console.log(window)` because that's kind of annoying. We'll run our test again to make sure that all goes away.

Perfect. In review, this is how we establish our Jest configuration. We make a `jest.config` file here, your `module.export`, your configuration, and then Jest will pick it up automatically when you run the Jest command.