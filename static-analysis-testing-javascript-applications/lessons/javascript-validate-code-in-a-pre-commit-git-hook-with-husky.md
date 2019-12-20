It's great that we have this `validate` script that people can run before they commit their code to make sure that they don't commit anything that is breaking linting rules, or they forgot to format with Prettier, or is breaking flow.

It would be great if we could automatically run this `validate` script when people commit code so they don't forget to do so. We're going to install a tool called Husky that will install git commit scripts.

I'm going to `npm install --save-dev husky`. We're going to want to watch the output here to see what Husky does. Here, it says, we're starting Husky here. We're going to set up git hooks. Then we're finished.

#### Terminal Input
```
npm install --save-dev husky
```

What does that mean? Let's go ahead and take a look at our `git` directory. There's a hooks directory inside of there. There are a bunch of git hooks in here. We have some samples that we can look at. For example, the pre-commit file. We'll say, `pre-commit`

```
cat .git/hooks/
cat .git/hooks/pre-commit
```

![git directory](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908127/transcript-images/egghead-run-the-validate-script-in-a-pre-commit-git-hook-with-husky.png)

Here, this is actually a Husky-generated file. Husky puts this file in here when it's installed. It will call our `pre-commit` script that we configure in our `package.json`. Let's see that in action.

I'm going to add a script here called `precommit`. What do we want to do before people commit? We want to run this `validate` script, so `precommit` will be `npm run validate`.

#### package.json
```json
"scripts": {
    "lint": "eslint src",
    "format": "npm run prettier -- --write",
    "prettier": "prettier \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run lint && npm run prettier -- --list-different && npm run flow",
    "precommit": "npm run validate"
},
```

With that, we can `git commit --am 'stuff'`. It runs Husky's `precommit` script. That ran our linting, our Prettier, and flow. If we were to make a change that had a problem...for example, we have some ESLint issue in `example.js`.

#### Terminal Input
```
git commit -am 'stuff'
```

We try to commit bad stuff, `git commit -am 'bad stuff'`. Husky's going to run. Because ESLint had an error, this commit hook will not allow the commit to go through. If I look at the `git status`, I'll see that I still have that file modified.

#### Terminal Input
```
git commit -am 'bad stuff'
git status
```

I can get around this if I add that` --no-verify` flag. I could `git commit -am 'bad stuff' --no-verify`. Then it doesn't even run Husky at all. That's a convenient workaround if you need it.

#### Terminal Input
```
git commit -am 'bad stuff' --no-verify
```

To do this, we installed Husky. Then we added a `precommit` script to run `npm run validate`. Any time we tried to commit, Husky will run `npm run validate` to validate that we are not breaking linting, that we didn't forget to run Prettier, and that all of our files passed flow.