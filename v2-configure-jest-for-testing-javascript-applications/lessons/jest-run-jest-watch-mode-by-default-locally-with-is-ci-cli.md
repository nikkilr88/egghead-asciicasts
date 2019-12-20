Instructor: [00:01] Jest watch mode is really awesome and I pretty much always want to run that locally. It's unfortunate that I can run `npm t` to run the test script, but if I want to run the watch script, I have to run `npm run test:watch`.

[00:13] This is so much to type. It'd be really nice if I could just say `npm t` and that runs the Jest mode and watch mode locally. If I run MPMT on CI, it runs Jest with courage. To do that, I'm going to `npm install` and save as a dev dependency is CI, CLI.

```bash
npm install --save-dev is-ci-cli
```

[00:32] With this installed and saved into my dev dependencies, then I can add a new script that I'm going to call test:coverage. That's where I'm going to put our Jest coverage script.

[00:45] In our test script, I'm going to say is CI. If it is CI, then we're going to run test:coverage. Otherwise, we'll run test:watch. 

```js
  "scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch\"",
    "test:coverage": "jest --coverage",
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
  },
```

With that setup, now I can run `npm t` and that will determine, "Oh, you're local, so I'm going to run the watch script."

[01:03] If I'm on CI, for example, so we say CIS1, then the SCI script is going to determine, "Oh, you must be in CI because the CI environment variable set to one and so I will therefore run the test coverage script." Now, we don't need to worry about whether we're running the test script or the test:watch script.

[01:23] If we want to just run the test:coverage script explicitly, we can always run `npm run test:coverage`. That will run that coverage script explicitly, or `npm run test:watch` and that will run it explicitly as well. It just makes it a lot nicer when we can run `npm t`. It will run the script that is relevant based on the environment we're currently running in.

[01:44] To make this work, we NPM installed and saved as a dev dependency is CI CLI. Then we're able to use is CI and CLI. Then we're able to use is CI CLI with is CI specifying which NPM script to run if we're in CI and which script we want to run if we're not in CI. Then we moved our jest with the coverage flag to a new script called test coverage.
