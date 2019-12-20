Instructor: [00:00] As cool as it is that we have this test script, which will run jest for us and it just runs all of our test, it would be really nice if we didn't have to run that test every time we make a change to our code.

[00:10] Instead, we could just have this running all the time. Anytime we make a change, it runs our test automatically. That's with the jest watch flag test. If we add a script called test:watch and that is going to run jest--watch, then we can create this run `npm run test:watch`.

```js
"scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "dev": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --single --listen 8080 dist",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
    "lint": "eslint --ignore-path .gitignore .",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm install && npm run validate"
  },
```

[00:30] That runs jest--watch, and we enter jest watch mode, which is awesome. Here at the very start, it says, "No test found related to files change since last commit." By commit, it's talking about the git commit. Jest will actually look up and get what files have changed since the last commit.

[00:48] Based on those files that have changed, it will run the test that are relevant for those changed files. We can see an example of this by going to the autoscaling text, and I break something here. Maybe by default, will return two instead of one. That's going to run all the files that are affected by that change.

[01:05] We actually have four tests. There are three of those four tests that are affected by that change. These two tests pass just fine, no problem, but this test fails. That's because we're taking a snapshot. That snapshot changes with this change.

[01:18] With that, we have our snapshot summary. We can update our code changes by pressing the U key, and then we can take a look at other options by pressing the W key to show more so I'll press W. Now we can run all the tests, run only the failed tests.

[01:33] I have a bunch of other commands. One command in particular I want to take a look at is this U to update failing snapshots as indicated here, or press I to update failing snapshots interactively.

[01:45] If you have a whole bunch of snapshots that this change has impacted, and a bunch of them are changing, it can be hard to scroll through all this output and review each and every one of them. You can press the I key to update the failing snapshots interactively.

[01:58] That's what I'm going to do. I'll press I, and it's going to run each test one by one and show me the output for the failing snapshot for that test in particular. Here, I can decide whether or not to update that particular snapshot by pressing the U key to update the failing snapshots for this test in particular.

[02:16] I can also press S to skip or Q to quit interactive snapshot mode. I'll press S to skip. That'll give me a summary of what happened during this interactive snapshot session where in particular, I reviewed one, I skipped that one.

[02:31] Now, I can press R to restart interactive snapshot or Q to quit. I will press Q. Now it's going to run all the tests as I had before.

[02:40] Next, I'm going to press W. Here we're going to press F to run only the failing tests. You'll notice, we're running three tests. We have the autoscaling texts, the calculator display, and the calculator.

[02:51] If I press F, it will only run the calculator display, because that's the one that had a failing test since the last test run. This makes it a lot easier to focus in on the tests that are failing and reduce the output as you're debugging and adding console log statements.

[03:07] Here, I'll press the W key. If I want to get out of this mode, then I press the F key to get out of the failing test mode. I'll press F. That's going to run all of my tests again. I press W here.

[03:20] As a reminder, this is only running the tests that are affected by the change that I've made. If I change this to one again, now there's no changes since the last git commit, so it doesn't run any tests. I can now press A to run all the tests. If I press W, it'll show me all the options, so now I press A. That's going to run all four of the tests in my test suite.

[03:38] I'm going to press W. Now I can press O to run the tests related to the changed files. I'll do that. Again, I'm not running any tests because there were no files changed. Let's change this file again so we get those three tests running.

[03:51] I'm going to press W, and I'm going to press P to filter by a file named regex pattern. If I press P and I want to run auto, that'll run just my auto scaling text. Now I can press W and you can see that I have an active filters here. If I want to clear the active filters, I can press C. That will get me back to the previous mode that I was in before.

[04:13] I'll press W again and press P to filter by a different regex pattern. I'll say .calc.star.js. That's going to run my two calculator tests that I have in here. Now I can press W and I'll press C again to clear those filters. It'll run all the tests that have been changed.

[04:33] I'll note that if I press W here and then A to run all the tests again, it will run all the tests. If I press P now and do `util`, it will focus in on that utils file, even though that file has not been affected by any changes that I've made.

[04:49] Now, if I press W, and we're going to filter by the test name regex, this is similar to a file name regex, except if we look at our utils.gs under our test directory here, we have this test that formats of value. If I press T and then type formats, it's only going to run the test that matches both a util for the test file name and formats for the test name itself.

[05:17] We can see this if I add a test that it is titled, "It is Broken," and then throw a new error, hi.

```js
test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})

test('it is broken', () =>{
  throw new Error('hi')
})
```
I'll save that and it's going to automatically skip that test for me because we're filtering by the test name.

[05:32] If I press W and then press C, I'm going to clear all the filters that means the filename as well as the test name filters. We're going to notice we have that snapshot that's still broken and we have this broken test in the utils test file.

[05:47] Let's go ahead and get rid of this broken test. We'll save that. Now we're only running test relevant to the change that we made here in get scale. We scroll down, press W and there are two more things that I want to show you.

[06:00] First, I'm going to get rid of 2 changed back to 1, save that, we'll press W here and then press H around all of the test. We press W to show all of this and now we have press enter to trigger a test run. This one appears in pretty much every mode.

[06:15] Anytime you need to rerun the test for any reason, you can press enter and it will trigger a rerun of all the test. Finally, and probably most importantly, to get out of this mode, you can press Q at any time to exit just watch mode.

[06:29] Another thing that I'll note is while your in Jest watch mode, if you're running some test and you decide, "Oh. This is taking too long." Maybe you've got thousands of test in here or something, then, you can press any other key at any time and the test run will be interrupted. You can go ahead and change your watch mode as you see fit.

[06:47] In review, all we did to make this magic happen is in our package JSON, we added a test:watch script and that simply runs Jest with the watch flag.

[06:57] One thing to note here is that while NPM does have a run test and it has a test and it has a T command, NMP does not have a short command for test:watch. To run this script, you really have to type out the full NPM run test:watch.

```bash
npm run test:watch
```
