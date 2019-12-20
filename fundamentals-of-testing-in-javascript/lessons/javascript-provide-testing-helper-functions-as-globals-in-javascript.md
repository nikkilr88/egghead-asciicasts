These testing utilities are pretty useful. We want to be able to use them throughout our application in every single one of our test files.

We could put these into a module that we would require an import into every single one of our test files, but many testing frameworks embrace the fact that you're going to be using these in every single one of your test files, and so they just make them available globally.

I am going to cut this out of our testing file. I am going to go to `setup-global.js` file, and I will paste it into here, and then I will say `global.test = test`, and `global.expect = expect`.

#### setup-globals.js
```javascript
async function test(title, callback) {
  try {
    await callback()
    console.log(`✓ ${title}`)
  } catch (error) {
    console.error(`✕ ${title}`)
    console.error(error)
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`)
      }
    }
  }
}

global.test = test
global.expect = expect
```

I can run 

```javascript
node --require ./setup-globals.js lessons/globals.js
```
and then our test file. 

We get the same result as we did before. Now, we can use this `setup-globals` in every single one of our test files. With that setup, all of our test files can use the `test` and `expect` global variables.