Whether you're using `Travis CI`, `CircleCI`, `Codeship`, or whatever `CI` service you're using, it probably works pretty well with `Codecov`.

`Codecov` is an awesome place where we can report our code coverage numbers and keep track over time how our project is doing with coverage. 

[Homepage for Codecov](https://www.codecov.io)

It's really easy to use. It has an `npm module` called `codecov` which is simply a CLI that you can run during your build, which will take your codeCoverage report and ship it up to `Codecov`.

[Link to the page with the NPM command](https://npm.im/codecov)

### Terminal
```bash
$ instanbul cover jasmine-node --captureExceptions spec/./node_modules/.bin/codecov
```

Let's go ahead and add that configuration to our `travis` file. We'll add an `after-script` that will run `npx codecov@3`.

### travis.yml

```yml 
sudo: false
language: node_js
cache:
  directories:
    - ~/.npm
    - ~/.cache
notifications:
  email: false
node_js: '8'
install: echo "install happens as part of setup"
script: npm run setup
after_script: npx codecov@3
branches:
  only: master
```

`Npx` is built into `npm`, and it simply installs the module. If it has a binary, it will run that binary for us. That's all that we need to have working for our `Travis CI`. We'll go ahead and commit this, push this up, and watch Travis report to `Codecov`.

With that committed and pushed, our `Travis` will run and we can look at the bottom here where we are running that `npx Codecov@3 `command, and we can see the output from `Codecov` which takes our coverage reports and uploads those to `Codecov`.

![image of the output from Codecov](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907431/transcript-images/egghead-report-jest-test-coverage-to-codecov-through-tavisci-report-generations.png)

We can look at our `Codecov` dashboard, codecov.io/gh/the user and GitHub repo, and then we can look at the coverage chart over time. We can see a coverage burst. 

![image of the Codecov dashboard](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907432/transcript-images/egghead-report-jest-test-coverage-to-codecov-through-tavisci.png)

We can look at the files and see how our `coverage` is doing in each one of these files. 

![image of the file directory](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907437/transcript-images/egghead-report-jest-test-coverage-to-codecov-through-tavisci-files.png)

There's a whole bunch of other things that you can do with `Codecov`.

In review, all that we needed to do was whatever service that you're using, whether it be `Travis`, `CircleCI`, `Codeship`, or any of the others, find a way to add an `after-script`. It's something that runs after all of your tests have run. You can report your code coverage numbers to `Codecov` using `npx`, which comes built-in within `npm` version 5, and run the `Codecov` command.

Here, we're specifying we want to run it on version 3. It will take your coverage directory and the information that's generated in here from `Jest` and upload that coverage report to `Codecov`.

