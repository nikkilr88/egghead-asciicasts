Instructor: 00:00 In this course, I will be using **Create React App** (CRA) as my background setup. Create React App comes with a lot of built-in configurations and installed dependencies that we need to get up and running with React Jest and Enzyme.

00:12 If you're not using Create React App, you need to install as dev dependencies, `jest`, `babel-jest`, `babel-core`, `babel-preset-env`, and `babel-preset-react`. 

```bash
$ npm install --save-dev jest babel-jest babel-core babel-preset-env babel-preset-react
```

Once our package is installed, we need to create a new file for our `.babelrc`. We'll paste in our `presets`, `"env"` and `"react"` so that we can use ES6 and React and setup our test.

#### .babelrc
``` json
{
  "presets": ["env", "react"]
}
```

00:35 Next, we need to make sure we have a script for actually running our test. Again, Create React App has this for us. However, one can simply just put `jest` here, and that will our test as well.

#### package.json
```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "eject": "react-scripts eject"
  },
```

00:48 Also, if you inaudible Create React App, the Jest doc goes the detail on how to get it configured with Webpack, including how to handle select assets, CSS modules, and working with Webpack 2.

01:00 With Jest configured, we can install as a dev dependency enzyme. 

```bash
$ npm install --save-dev enzyme
```

Once this finishes, we will see it added to our package JSON.