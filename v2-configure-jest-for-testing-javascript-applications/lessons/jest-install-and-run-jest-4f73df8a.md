Instructor: [00:01] To add testing to an existing project, I'm going to run `npm install` as a dev dependency jest. 

```bash
npm install --save dev jest
```

We're going to get that jest testing framework installed. We'll see that show up in our dev dependencies as soon as it gets installed right here.

[00:15] With jest installed in our dev dependencies right there, we can take a look at the known mantras directory under bin. Right here,we'll see jest, which is exactly what we want. With that installed, we can now add a `test` script, and we'll run simply `jest` in that test script.

### **`package.json`**
```js
"scripts": {
    "test": "jest",
    "dev": "webpack-serve",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --listen 8080 dist",
    "lint": "eslint .",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm run setup && npm run validate"
}
```

[00:31] We'll pop open our terminal again. We'll run `npm run test` or `npm test` or `npm t`. 

```bash
npm run test
```

All three of those will run the same thing. That's going to run jest,and we're going to get this error that says "no files found."

[00:45] It checked 15 files, but none of them matched this test match and so it didn't run any of our files as test. Let's go ahead and create that test file. We'll put it right in the source directory here(src folder), create a new file `__tests__`(underscore, underscore, tests, underscore underscore) and that will match the `testMatch` glob in the terminal. We'll add /example.js. to the file name

`__tests__/examples.js`

[01:06] In here(example.js), we'll just make a test that says, "It works." 

```js
test('it works', () => {})
```

We'll save that and then we'll run our test script again and it runs our example. It works.

```bash
npm t
```

There's no configuration that needs to happen with jest to make this work. It just works out of the box with this test convention here.

[01:25] We can also move this file right here(outside of the `__test__` folder) and name it with a .test, and that will work just as well. I prefer putting everything in the `__test__` directory just so that I can separate my test from my source files.

[01:37] I do want to co-locate the test to where the file is that it's testing as close as possible. You will find that I put my test directory right next to the file that's being tested. One other thing that I want to do here is if we check out my travesty YAML file, this CI configure here, we have this script that runs NPM run setup.

[01:57] That setup script is going to run install and then validate, and that validates that the project is in a working state. Right now, it's running the linting and the build. I wanted to also run the test. If the linting passes, I'm going to have it run the test script. Now, if I run `npm run validate`, it's going to run the linting first, it'll run the test, and then it'll run the build.

```bash
npm run validate
```

[02:20] Run review to make all these work, first, we install the jest and have that added to our dev dependencies in our packet JSON and then we added a test script that runs simply a jest. Then we updated our validate script to run the test as well as the linting and the build.

[02:35] Then we created a file called example.js under source test. Jest default configurations picks that file up and runs it as part of the test script.
