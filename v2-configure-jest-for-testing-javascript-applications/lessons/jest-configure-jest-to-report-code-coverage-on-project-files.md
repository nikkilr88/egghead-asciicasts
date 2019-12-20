Instructor: [00:00] As you begin adding tests to a project, it can be really helpful to know how much of your project is tested and where you could use a little bit more help adding new test. For example, we know that our auto scaling text file is being tested because we're rendering it here in several other test, but we don't know how much of this file is being tested.

[00:17] We also know that the app file is not being tested at all, but that's because we're the ones who wrote the test in the first place. It would be really nice if we could just get some insight into how well our code base is being tested.

[00:28] What we're going to do here is add the coverage flag to our test script. 
```js
"scripts": {
    "test": "jest --coverage",
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


Now if I run `npm t` to run that test script, Jest will automatically generate this coverage report that tells me a lot about the coverage for my code base.

[00:41] Part of what this does is it actually creates a coverage directory with all the coverage information for our coverage report and we can open this up in a browser. If we open coverage/lcov-report/index.html, 

```bash
open coverage/lcov-report/index.html
```


then that will open up in our browser right here and we can see that code coverage report right here.

[00:59] We can see in shared, it has utils right here. We're missing one bit of coverage right there, but we're running the rest of these lines five times. Then, in our auto-scaling text, it looks like we are missing a little case right here.

[01:12] In our calculator display, we have a little case right here that we're missing. It's nice we get to see the test cases that we're probably missing, the use case that we're missing in our tests.

[01:21] Under src directory here, we're seeing that calculator is not very well tested. We could probably add a couple of tests to that. Themes is run three times, so that one's fine.

[01:31] One problem that I see with this coverage report is it's including the test directory, which has our test utilities, and these test utilities are absolutely going to get 100 percent code coverage. Otherwise, we'd just remove them. Why would we have a test utility if we're not actually using it?

[01:47] This is a problem because this is going to get 100 percent code coverage. It's going to blow our numbers for our code coverage in our project. We don't need to know how well our test utilities are covered. We want to know how well our application code is covered.

[02:01] In addition, you'll notice that the src directory has calculator in themes, but the src directory also has an app and index. We're not getting any insight into how well those files are being covered, or the fact that they're actually not being covered, which should reduce the overall coverage for our project.

[02:18] It'd be really nice to solve this problem and get a more accurate report on our code coverage. The way that we're going to solve this is in our jest.config.js. We'll add a collectCoverageFrom, and this is an array of globs. We're going to say anything that is under the source directory that ends in js. 

```js
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  collectCoverageFrom: ['**/src/**/*.js'],
```


That's what we want to collect coverage on. This will exclude the test directory with our test utilities in here. This will also exclude the test by default. Jest will automatically exclude the test. We don't need to worry about those. We certainly wouldn't want those included in our coverage report.

[02:55] Now if we `npm run test` to get our coverage of report regenerated, and then we open up that coverage report again, we can compare the old coverage report with the new one. You'll notice that our coverage numbers are getting reduced to reflect our actual coverage way more accurately. We have a much better sense of how well we're doing in our application.

[03:17] In a full-size application, this difference will be stark. Don't be ashamed if you find yourself with like two percent code coverage. You can work your way back up.

[03:25] Here now we have our shared. That has all the same stuff. There's actually nothing different about that one. The source directory now has, in addition to the themes and calculator, our index and our app which both have zero percent code coverage because they're not being included in any of our tests. They probably should be.

[03:42] One other thing that I'm going to do here is because these files are all generated in the coverage directory, they're not useful to be committed to src control. I'm going to go to our gitignore, and we're going to add a coverage line right here. We don't include the coverage report in Git.

```js
dist
node_modules
coverage
```

[03:58] In review to make all of this magic happen, we needed to add to our package JSON the coverage flag to our Jest script. You could add the coverage flag to your watch script, but then the coverage report will get regenerated.

[04:12] If you're only running the test for a couple of your files, that coverage report will get all kinds of messed up. Typically, I only run coverage when I run all of my tests with the regular test script.

[04:23] Another thing that we did here to make sure we're reporting coverage on all of our application files and none of our test files, they specify the correct coverage from so that all of our source files are included in the coverage. Then we also added, to our gitignore, that new coverage directory so we don't commit that to src control.
