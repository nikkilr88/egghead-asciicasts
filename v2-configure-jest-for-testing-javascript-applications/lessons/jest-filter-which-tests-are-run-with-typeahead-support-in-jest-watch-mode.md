Instructor: [00:01] Here in watch mode, I'm running the client project. I've got my utils and all of the tests for my client side running. If I wanted to just go down to maybe the calculator display, I'm going to hit `p` then `cal` and that's running three of the tests because we've got auto-scaling-text.js and then calculator-display.js and calculator.js.


[00:21] I guess I had to be more specific and say `calculator-display`, so that I can just run the thing that I'm trying to focus on.

```bash
pattern> calculator-display
```

It will really nice if I can get some feedback as I'm typing that out. That's what we're going to go for by installing this new watch mode plugin.

[00:36] We're going to `npm install` and save that as a dev dependency, Jest watch type ahead. 

```bash
npm install --save-dev jest-watch-typeahead
```

This actually comes with two watch plugins that we're going to add to our jest-common.js file. The first one is jest watch type ahead file name. The second one is test name. 

```js
watchPlugins: [
  'jest-watch-select-projects',
  'jest-watch-typeahead/filename',
  'jest-watch-typeahead/testname',
]
```


With this installed, we can now run `npm t` to get us going on our test.

[00:59] We're going to do a capital P to select only client and then we're going to hit A to run all the tests. Now, I'm going to hit a lowercase P. Now, we get these nice new outputs. "Start typing to filter by a file name regex pattern".

[01:12] Cool. We'll hit CAL and we're getting some output indicating how many of our files match our output here. Now, I can just go down to these specific tests that I want to have run our calculator-display under test. We hit that, and now our client is running that specific file.

[01:30] This also helps us if we want to run a couple of these. We have `cal.*.js` and we can go back and say, "Oh no, that wasn't enough," so we're going to do that `cal.*-.*.js`. Now, we're getting all the ones that have hyphens in it. We can really narrow down these specific files that we want to have run.

[01:47] Now, here if we do `utils.js` and then we can specify, "Hey, I want to run the test under shared," then that's the file we're going to have run. I can hit the T key to filter on the test name regex pattern and I can say `form`. This will show me all of the test names that match my pattern, so similar to the file names and I can select the specific tests.

[02:08] In review, to make these work, we installed as a dev dependency our jest-watch-typeahead module and then configured our watch plugins for our Jest configuration to include jest-watch-typeahead/filename and jest-watch-typeahead/testname.
