Instructor: [00:00] To begin using `react-axe`, first we need to install it. We can do so by running `npm install`, we're going to save this to our development dependencies, and it's called `react-axe`. Now we can see that in our development dependencies here in our `package.json` file.

#### package.json

```javascript
"devDependencies": {
    "react-axe": "3.3.0",
  },
```

Now we need to initialize it.

[00:26] You're going to want to go to whatever file it is that starts up your application. For me and my project here, it's in `index.js`. We want to get `react-axe` initialized before we render our first component in our react application.

[00:41] We want to make sure that `react-axe` is only running in our development environment, because it's going to be logging errors to the console, and it also has a little bit of a performance hit, so we only want to run it in development, not in our `production` application.

[00:56] We can make sure it only runs in our development environment by wrapping it in a block where we check the environment. We're going to check that this is not `production`. Now inside our block we will dynamically import `react-axe`, and we will pass to the `axe` constructor the `React` and `ReactDOM` objects.

#### index.js

```javascript
if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}
```

[01:25] Then finally, this third argument is a timing delay in milliseconds for how long `react-axe` will wait after a component renders, before it will begin analysis again. We're going to go with `1000`. Now that we've got `react-axe` initialized, we can go ahead and use it.

[01:44] Here's a sample application I have with some accessibility issues baked in. I've got Chrome dev tools open over here on the right. Note that `react-axe` works best with Chrome. It's noted to work OK with Firefox and Safari. It's highly recommended that you use it with Chrome at this time.

[02:02] You can see I have a number of issues being reported in the console now by `react-axe`. They're ordered by their severity, so we have `serious`, `critical`, `moderate`. A really nice feature of `react-axe` is that it dedupes findings.

![Sample App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545899/transcript-images/02_react-use-react-axe-to-audit-accessibility-issues-at-runtime-during-development-sample-app.jpg)

[02:18] For instance, here, I have two form inputs that have the same issue, and they're only reported here once keeping the console logging nice and clean. When I hover over each of these, it goes ahead and highlights the elements on the page.

[Highlight](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545911/transcript-images/02_react-use-react-axe-to-audit-accessibility-issues-at-runtime-during-development-highlight.jpg)

[02:33] If I want to learn more about this finding, they've got links for each of the findings where you can go and learn about the issue. Here they list the severity level which WCAG standard is being violated with this finding, info on how to fix the problem, why it's important, and more information and links to more resources on this issue.

![Link](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545903/transcript-images/02_react-use-react-axe-to-audit-accessibility-issues-at-runtime-during-development-link.jpg)

[03:02] This is a great way to learn more about accessibility and how to solve accessibility problems. If I resolve this issue here, now we can see that that `Critical` finding has been resolved and it's no longer being reported in the console.

[03:20] Now if we want to configure `react-axe` to behave differently than the default, we have the ability to pass in a configuration object where we can add new rules, modify existing rules, modify how it reports the console, all sorts of different things we can do to configure `react-axe` further. We can do this by creating a `config` object.

[03:45] If, for instance, we want to modify the rules, we add our `rules` property which is an array, and it takes an object for each rule we want to either provide or modify. For this example, we're going to modify the `radiogroup` rule.

```javascript
var config = {
  rules: [
    {
      id: "radiogroup",
      enabled: true
    }
  ]
};
```

[04:04] This rule is disabled by default so we're going to enable it. Once we've created our `config` variable, we can go ahead and pass that as the fourth argument to the `axe` constructor.

```javascript
if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe");
  axe(React, ReactDOM, 1000, config);
}
```

Let's go ahead and change this back to `false` so we can see the before and after.

[04:21] Here we have `modal` in our sample application that has a couple radio buttons. We do have a couple other findings, but one thing we don't have, is whether these radio buttons are in a radio button group.

![Radio Before Rule](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545883/transcript-images/02_react-use-react-axe-to-audit-accessibility-issues-at-runtime-during-development-radio-before.jpg)

Let's go ahead and turn that rule back on.

[04:38] Let's change `enabled` to `true`, now we can see that finding being reported here in `react-axe`'s logging output. There it is, pointing to our radio buttons.

![After Radio Rule](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545903/transcript-images/02_react-use-react-axe-to-audit-accessibility-issues-at-runtime-during-development-after-radio.jpg)

Once again, if we want to know more about this finding and what we can do to fix it, we can just click on the link provided in the console. If we go ahead and fix this issue, we can see that that finding is no longer being reported.
