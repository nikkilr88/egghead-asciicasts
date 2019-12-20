Instructor: [00:00] I'm happy with ESLint, but I want to make sure that people don't forget to run ESLint. One thing that I can do is add the ESLint script to my `"scripts"` configuration here in my `package.json`.

[00:11] I'll add a `"lint"` script, we'll run `"eslint ."` on my code base and now, I can run `npm run lint` and it lints my code base, which is great. We actually have one problem here and that is if I run `npm run build`, then that's going to build the project, put it out in the `/dist` directory. This generates my output for what I'm going to send to the end user.

### package.json
```json
{
  ...
  "scripts": {
     "build": "babel src --out-dir dist",
     "lint": "eslint ."
   },
  ...
}
```

### Terminal Input
```
npm run lint
...
npm run build
```

[00:35] Now if I run `npm run lint`, I'm going to get linting errors because Babel is going to add new strict to my output.

### Terminal
![lint error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890639/transcript-images/eslint-run-eslint-with-npm-scripts-lint-error.jpg)

[00:45] I don't actually care to lint the `//dist` directory, the built version of my library. What I'm going to do is I'm going to add an `.eslintignore` file right here. With that, I'm just going to copy this `.gitignore`, and we'll just ignore everything that we have in our `.gitignore`. Now I can run `npm run lint`, and it's working great.

### .eslintignore
```
node_modules
dist
```

[01:07] It seems wasteful to have my `.eslintignore` file be exactly what my `.gitignore` file is. That's often the case. What I'm going to do instead is we'll get rid of this file. We'll go to our `package.json`, and I'll add a flag, `--ignore-path .gitignore`.

### package.json
```json
{
  ...
  "scripts": {
     "build": "babel src --out-dir dist",
     "lint": "eslint --ignore-path .gitignore"
   },
  ...
}
```

[01:24] I'm saying, "Hey, ESLint, when you're looking for the ignore file for the list of directories and files that you should ignore, I want you to use the `.gitignore` file." That way, as I make updates to the `.gitignore` file, I'm not linting anything that is ignored in git anyway, which is probably going to be pretty consistent for the lifetime of the project.

[01:43] Now I can run `npm run lint`. That runs ESLint with that `--ignore-path` flag, and I get exactly the output that I'm expecting.

### Terminal
![expected output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890639/transcript-images/eslint-run-eslint-with-npm-scripts-expected-output.jpg)

[01:52] In review, to make all this work, we added a `"lint"` script to our `"scripts"` configuration in our `package.json`. In here, we run `eslint` with `--ignore-path` pointing to the `.gitignore` file, and then we run it across our project. It's linting across all files that are JavaScript files that are not in the `/dist` or `/node_modules` directory.

[02:12] That way, we can be pretty confident that we don't have any code that is violating some ESLint rules that we've configured.
