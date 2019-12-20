Instructor: [00:02] If you have not yet installed `eslint`, then you will need to do that first, and then include the plugin. It's `eslint-plugin-jsx-a11y`. I am going to save it to our development dependencies.

```javascript
npm install eslint eslint-plugin-jsx-a11y --save-dev
```

[00:23] Now that that's installed, we need to configure it. You want to go to your `eslint`, config. Mine is in `eslintrc.json` file. We will add a section for plugins. Again, it is `jsx-a11y`.

#### eslintrc.json

```javascript
{
    "extends":[
        "react-app"
    ],
    "plugins":[
        "jsx-a11y"
    ]
}
```

[00:44] Now if we want to configure the `rules`, we can do that here. You'll just specify whatever rule it is you want to configure. For instance, if I wanted to set `alt-text` to `warn`, I could do that here.

```javascript
{
    "extends":[
        "react-app"
    ],
    "plugins":[
        "jsx-a11y"
    ],
    "rules": {
        "jsx-a11y/alt-text":"warn"
    }
}
```

[00:59] If, instead, you want to extend the recommended or strict set of rules, we can do that as well. We would get rid of our specific rule definitions and add to the `extends` section, `plugin:jsx-a11y`, and we'd either do `strict` or `recommended` for recommended mode.

```javascript
{
    "extends":[
        "react-app",
        "plugin:jsx-a11y/recommended"
    ],
    "plugins":[
        "jsx-a11y"
    ]
}
```

[01:23] Let's go ahead and get ready to run it. If you have not done so previously, we can create a script for the linter. We would add to our `scripts` section in our `package.json` file. I am going to call this `lint`. We run it with the `eslint` command, and you specify the directory that you want to lint. For my project, it's called `src`.

#### package.json

```javascript
"scripts"{
  "lint": "eslint src"
}
```

[01:51] Another really helpful thing we could do is if every time we run `test` we want to run the linter first, we can add a `pretest` script that will run our linter.

```javascript
"scripts"{
  "pretest": "npm run lint",
  "lint": "eslint src"
}
```

[02:11] Let's go ahead and try this out. I've got a line of code that should trigger the linter and give us the error. Right here, we have `img` and it is missing an `alt` attribute. You'll also notice I've got some squiggly lines here.

![Missing alt](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545916/transcript-images/07_react-set-up-eslint-to-audit-accessibility-issues-in-react-img-missing-alt.jpg)

[02:27] Some IDEs will integrate with your `eslint` config and will actually visually show you when there is a finding. We can already see if we hover over that that it knows I am missing my `alt` attribute.

[02:40] Anyway, if you are not using an IDE that integrates with `eslint`, you can continue to run it from the command line. No problem.

[02:47] This should give me an error. Let's go ahead and run it, and see that that happens. I am going to run the `test` script, just to show it will run my linter before it runs tests. I don't have any `test`. We're just going to see that the linter will show us the error. There it is.

![Lint Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545914/transcript-images/07_react-set-up-eslint-to-audit-accessibility-issues-in-react-lint-error.jpg)

[03:06] Here is my error, `img elements must have an alt prop` That's what we're expecting. If I go ahead and fix that real quick, and let's run it again. This time I am just going to run the lint script directly.

[03:29] Let's see that my finding was fixed, and it was. Here we go. Because the command line isn't showing any more output, that means there were no more errors found.
