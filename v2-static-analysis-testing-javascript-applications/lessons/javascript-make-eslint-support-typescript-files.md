Instructor: [00:00] Right now, we have ESLint configured to run across all of the JavaScript files in our project, but it doesn't run across the TypeScript files. If I run `npm run lint`, I'm not going to get any linting errors in here at all.

### Terminal Input
```
npm run lint
```

[00:13] TypeScript makes lots of rules that ESLint has unnecessary because TypeScript is great that way, but there are some rules that ESLint has that would be useful in TypeScript. Right now, we're getting this red underline because ESLint in VS Code is trying to parse this file, but it can't because it's written in TypeScript.

### typescript-example.js
![parsing example error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890639/transcript-images/javascript-make-eslint-support-typescript-files-error-example.jpg)

[00:31] We need to enable ESLint to be able to parse this TypeScript file. To do that, I'm going to `npm install`, and save these as devDependencies, `@typescript-eslint`, `eslint-plugin`, and `@typescript-eslint/parser`. With these two installed, they're going to go in my devDependencies right here. I can now configure ESLint.

### Terminal Input
```
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

[00:56] The first thing I'm going to do here is in my `"lint"` script, I want to make sure that ESLint runs across TypeScript files, so I'm going to add an `--ext` for extension `.js`, `.ts`, and `.tsx`. Now when I run `npm run lint`, it's going to run across my TypeScript files. Of course, it still isn't configured to parse TypeScript files properly, so let's go ahead and do that next.

### package.json
```json
{
  ...
  "scripts": {
     "build": "babel src --extensions .js,.ts,.tsx --out-dir dist",
     "lint": "eslint --ignore-path .gitignore .",
     "check-types": "tsc",
     "prettier": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|ts|tsx)\"",
     "format": "npm run prettier -- --write",
     "check-format": "npm run prettier -- --list-different",
     "validate": "npm run check-types && npm run check-format && npm run lint && npm run build"
   },
  ...
}
```

[01:21] Now we're running ESLint across multiple files, not just TypeScript files and so we're going to keep the same configuration, but I want to override this configuration for TypeScript files. We're going to use ESLint's overrides configuration property. For `"files"` which matched this glob of `**/*.+(ts|tsx)`. For any TypeScript files, I want this configuration to be applied.

### .eslintrc
```json
{
  ...
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)"
    }
  ]
}
```

[01:52] We'll set the `"parser"` to be `"@typescript-eslint/parser"`, so the one we just installed. For the `"parserOptions"`, we need to specify where our TypeScript configuration is. That's what the `"project"` property and the `"./tsconfig.json"` pointing to our configuration file.

### .eslintrc
```json
{
  ...
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      }
    }
  ]
}
```

[02:13] Then, we want to specify some plugins, which have some custom rules for us that are specific to TypeScript. We're going to have `@typescript-eslint/eslint-plugin`. This adds a couple additional rules that we can configure. We're not going to configure those manually, instead, we're going to extend these `"extends"` a couple of pre-built configurations.

[02:35] There are `"plugin"` configurations and the plugin is going to be from `@typescript-eslint/eslint-recommended`. We'll also have a plugin `@typescript-eslint/recommended`. What this one does is it disables some rules that are not necessary because we're using TypeScript. I'll show an example of that really quick.

### .eslintrc
```json
{
  ...
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint/eslint-plugin"],
      "extends:" : [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}
```

[03:01] If we go to our example here, you remember how this was a typo and this was breaking the valid type of rule. If we have that same problem in a TypeScript file, we're going to get two warnings. We'll get one from ESLint, and we'll also get one from TypeScript because TypeScript has a much better picture of what our code is supposed to be.

### typescript-example.js
![typescript eslint error example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890643/transcript-images/javascript-make-eslint-support-typescript-files-error-ts-eslint.jpg)

[03:23] It's doing some of the same linting capabilities by itself. That's why it's useful to enable this particular `"plugin"` configuration set because it disables some of those rules that TypeScript renders unnecessary. This rule set is some specific rules from the TypeScript ESLint plugin that are useful for TypeScript files that are sometimes specific to the way that you're writing your interface, for example.

[03:48] Let's clean that up. Then we'll run `npm run lint`. That's going to run linting across all of our files. We are still getting some ESLint errors here. It's saying it's expecting a semicolon from the rule `@typescript-eslint/member-delimiter-style`.

[04:05] This is a style specific rule. It doesn't have any bearing on whether your program worked properly or not. It's just saying that you should probably have a `;` here, but it's not necessary. It conflicts with my Prettier configuration where if I save that, it removes those semicolons.

### typescript-example.js
```js
interface User {
  name: {
    first: string
    middle: string
    last: string
  }
}
```

[04:21] To disable that, we already have installed in this project `"eslint-config-prettier"`. `"eslint-config-prettier"` is able to disable the rules from `"typescript-eslint"` that are not necessary.

[04:33] We're going to add, as our final extend, `"eslint-config-prettier/@typescript-eslint"`. With that, if we go to our TypeScript file, we're no longer getting those warnings. We can npm run lint, and there are no errors there either.

### .eslintrc
```json
{
  ...
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint/eslint-plugin"],
      "extends:" : [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:eslint-config-prettier/@typescript-eslint"
      ]
    }
  ]
}
```

[04:49] In review, to make this work, we added `"@typescript-eslint/parser"`, and `"@typescript-eslint/eslint-plugin"` to our `package.json`. Then we updated our ESLint configuration to use the `"overrides"` property so that all files matching `.ts` and `.tsx` use the `"@typescript-eslint/parser"` pointing to our custom `"./tsconfig.json"`.

[05:08] We added some TypeScript specific ESLint rules so that we could extend these built-in configurations and utilize some of those rules that typescript-eslint provides to us. Then we finally extended the `"eslint-config-prettier"`, so we disable all the rules that typescript-eslint adds that we don't necessarily need because we're using Prettier.
