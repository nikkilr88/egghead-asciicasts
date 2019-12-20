Instructor: [00:01] As you start adding tests to your code base, it would be really nice if you make sure that people don't actually code that reduces the amount of code coverage that you have in your project, because you're working toward improving the code coverage in your project.

[00:14] For example, this utilities file, maybe that's really important and you don't want to drop the level of coverage in this utilities file by somebody add a new function that isn't tested.

[00:24] What we're going to do here to make that happen is, I'm going to add a coverage threshold. We want our global coverage threshold to have certain elements. Here, we have the statements, branches, functions and lines. Those are the four elements of code coverage.

[00:39] I'm going to say, "Statements, we want 100 percent, branches 100 percent, functions 100 percent, and lines 100 percent."

```js
 setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}
```


Let's see what happens if I run the test scripts with coverage here. We're going to get a bunch of errors saying, "Hey, the global coverage threshold for statements was not met." The same for branches lines and functions.

[01:01] Let's add something that's maybe a little bit more reasonable. I typically like to do a couple percentage points lower than what we have currently so that as changers are made and things, we have a little bit of flexibility here. I'm going to go ahead and for our statements, we'll do 34 percent.

[01:17] For our branches, we'll do 24 percent. For our lines, let's do 34. For our functions, we'll do 29. 

```js
 setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 24,
      functions: 34,
      lines: 29,
    },
  },
}
```

Now, we can `npm t` to run our test again. Our test script almost passes. It looks like I mistyped this. It should be 31 on our function. Let's do 29 on this funtions. 

```js
    global: {
      statements: 34,
      branches: 24,
      functions: 29,
      lines: 29,
    },
```


Now, we run `npm t` again. Our tests are indeed passing.

[01:42] Now, as people add new code to our code base, they need to make sure they add some test so that they don't break this coverage threshold and ultimately break the build. Now, one really important thing about coverage to remember is that it's not a perfect metric for confidence.

[01:56] The problem is that not all lines in your code base are equal. For example, maybe this utilities file is super, super important because it's used just all over the place. The autoscaling text has this line here that's really not that important, it doesn't happen all that often. Even if that were to happen, it's not a huge deal that that gets broken as an example.

[02:16] These lines that are being missed or hit in our test are not completely equal. Let's say that you had one file, for example, this utils file. You just really wanted to make sure you never drop coverage on this. What we're going to do is we're going to specify an additional property. That property is a glob that matches the file that we want to make sure we never break.

[02:36] Here, we'll say source-shared-utils.js and with this, we're going to say we want our statements to stay at a hundred percent. Right now, the branches are at 80, so we'll just leave that where it is. Functions are at 100 and lines are at 100. Hopefully one day, somebody can add some test to increase the branches coverage.

```js
 setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  coverageThreshold: {
    global: {
      statements: 34,
      branches: 24,
      functions: 29,
      lines: 29,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
}
```

[02:57] Now if I `npm t`, I'm actually going to get a failure even though my utils is totally covered. The reason I'm getting that failure is because now my global coverage threshold has dropped. That's because when you start adding the specific files for the coverage threshold, that reduces the global coverage threshold because Jest will actually pull that coverage out of your total numbers.

[03:22] Let's go ahead and we'll change our statements to bring it down to a 31 and our branches will bring that down to 18. 

```js
 setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  coverageThreshold: {
    global: {
      statements: 31,
      branches: 18,
      functions: 29,
      lines: 29,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
}
```

We'll save that, run `npm t` and our test are all passing.

[03:34] Let's see what happens if we mess up our utilities coverage by updating the branches to 100 percent. 

```js
 './src/shared/utils.js': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
```

We haven't made it to 100 percent and it tells us specifically the coverage for files mentioned in this glob is not meeting the coverage threshold of 100 percent for branches.

[03:51] We get a really clear picture of which one of the files we need to add coverage for. We fixed that NMP run are a test again here. We've run all of our test suites and the coverage numbers are being met.

[04:03] On review, to make sure that we maintain our coverage threshold, we added this coverage threshold property that has a global coverage numbers set to something that is relatively close to where we are today. We can improve this overtime and increase this as we increase our code coverage in our project. We can also specify some specific files that we want to maintain a higher code coverage on.

```js
 setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
}
```
