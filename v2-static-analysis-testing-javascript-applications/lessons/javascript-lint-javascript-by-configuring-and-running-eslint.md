Instructor: [00:00] To get ESLint installed in this project, I'm going to run `npm install` and save it as a `--dev-dependency eslint`. With that running, I can open up the `package.json` here. It's going to pop it into my dev dependencies in my `package.json`.

### Terminal Input
```
npm install --dev-dependency eslint
```

### package.json
```json
"eslint": "^6.1.0"
```

[00:13] With that installed, I can look in the `.bin` directory under `node_modules`. I'll find `eslint` right there, which is exactly what I want. With that, I can now run `npx eslint .`, and run that across my project files. That's going to say `no ESLint configuration found`.

### Terminal Input
```
npx eslint .
```

[00:30] Let's go ahead and make that configuration. We'll go right here to the root of the project and create a `.eslintrc` file. With that, I can run `npx eslint .` across my project again.

[00:41] I'm going to get this error, parsing error -- `the keyword 'const' is reserved`. The default configuration for ESLint is that it's going to parse your files like their ECMAScript 5 files.

[00:55] My files are going to be written in the latest version of JavaScript. I need to configure ESLint to parse my files properly.

[01:02] That's where I'm going to bring in the `"parserOptions"`. In the `"parserOptions"`, I'm going to specify my `"ecmaVersion"`. That's going to be `2019`. I'm also going to specify the `"sourceType"` to be `module` rather than `script`, because my JavaScript files are going to be modules.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module"
  }
}
```

[01:20] I'm also going to say `"ecmaFeatures" { "jsx": true }`, so that ESLint can parse the JSX that I'm going to be adding to my project in the future.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

[01:31] With this now, I'm going to go ahead and run `npx eslint .` across my project. I'm no longer getting the parser error, but I'm not getting any rule violations.

[01:40] That's because even though I have problems in this code, I haven't configured ESLint to check for those particular problems. I'm going to go back to my `.eslintrc` and I'm going to add a `"rules"` configuration. One of the rules I want applied to my project is `"valid-typeof"`.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "valid-typeof": "error"
  }
}
```

[01:56] If I set that to error now, and I run `npx eslint .`, I'm going to get that rule being broken. I get an error in my output here, `invalid typeof comparison value`. The reason that's happening is because this is got a typo in it. That is exactly what I want. This actually fails the script.

### .eslintrc
![invalid type-of error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890652/transcript-images/javascript-lint-javascript-by-configuring-and-running-eslint-terminal-error.jpg)

[02:13] If I were to put this in my continuous integration, it would actually fail my build, which is what I want. I don't want to have any `typeof` typos in my production code.

[02:23] However, if you're in a situation where you're migrating to ESLint and it's hard for you to go update all of the things, then it might be useful to change from `"error"` to `"warn"`.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "valid-typeof": "warn"
  }
}
```

[02:32] In this case, it's going to give you the same output just as a `warning`, but the script will not actually fail, so your build can continue to deploy or whatever it is that you're doing there.

[02:42] I'm going to go ahead and change this back to an `"error"`. Now I'm going to paste a couple of extra rules in here. If I run `npx eslint .` now, I'm going to get a whole bunch of errors for all of those rules that I've broken.

### .eslintrc
![rules errors in terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890641/transcript-images/javascript-lint-javascript-by-configuring-and-running-eslint-rules-errors.jpg)

[02:54] One other rule that I want to configure in here is the `"strict"` rule. The `"strict"` rule is special because it is a configurable rule. Instead of saying error right here, I actually provide an array where the first element is the `["error"]`, `["warn"]`, or `["off"]`. We're going to leave that as an error.

[03:13] Then the second element in the array is the options that I want for this particular rule. Each rule is going to have different options. You'll need to look at the documentation for it.

[03:23] For the `"strict"` rule, I'm going to say `"never"` because I actually never need the use strict pragma in any of my files because these are all going to be compiled with Babel, which will add the `'use strict'` for me anyway.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "strict": ["error", "never"],
    "valid-typeof": "error",
    "no-unsafe-negation": "error",
    "no-unused-vars": "error",
    "no-unexpected-multiline": "error",
    "no-undef": "error"
  }
}
```

[03:35] With that, now I can run `npx eslint .` across my project, and I'll get the `'use strict' is unnecessary inside of modules`, rule being broken. I'll get that output there.

### .eslintrc
![use-strict error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890643/transcript-images/javascript-lint-javascript-by-configuring-and-running-eslint-use-strict-error.jpg)

[03:47] One other thing that I'm noticing in here is it's saying, `'console' is not defined`. It's breaking the `no-undef` rule. I'm going to be running this code in the browser.

[03:56] What I'm going to do here is I'm going to specify my environment. I'll say, `"browser"` is `true`. With that specified, I can now run `npx eslint .`, and I no longer get that particular error because it knows that the console is actually available in the environment where I'm running this code.

### .eslintrc
```json
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "strict": ["error", "never"],
    "valid-typeof": "error",
    "no-unsafe-negation": "error",
    "no-unused-vars": "error",
    "no-unexpected-multiline": "error",
    "no-undef": "error"
  },
  "env": {
    "browser": true
  }
}
```

[04:13] In review, to make all of this stuff work, I have my `package.json` here. I specify `"eslint"` in my `devDependencies`, and then I create an `.eslintrc` file where I configure ESLint on the type of JavaScript that it's going to be trying to parse in this project, the rules that I want my code to be following, as well as the environment where this JavaScript is expected to run.

[04:37] That is going to impact some of these rules.
