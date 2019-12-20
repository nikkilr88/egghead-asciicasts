Instructor: [00:00] Here we have an app, bootstrap by Create React App. In order to modify this configuration, we'll need to eject the project so that we can add React's ESLint custom hooks plugin. To do this, run `npm run eject` and respond with a `y` to declare that you know what you're doing. Keep in mind there isn't an easy way to undo this outside of Git trickery.

[00:26] If you aren't using Create React App, then you probably have full access to control your ESLint settings. Now that we have ejected, let's open up our code editor. Inside of code we'll open up the integrated terminal and install the custom hooks plugin from npm with `npm i eslint-plugin-react-hooks`. We'll install the `next` dis tag since it's still prereleased.

#### Terminal
```javascript
npm i eslint-plugin-react-hooks@next
```

[00:53] You may have your ESLint config somewhere else such as at your root in an `eslintrc` file, but Create React App uses the `package.json` file for its configuration. Here you'll find an `eslintConfig` section and you can add a `plugins` array containing `react-hooks`.

#### package.json
```javascript
  "eslintConfig": {
    "extends": "react-app",
    "plugins": [
      "react-hooks"
    ]
  },
```

[01:11] Also add a `rules` object with a key of `react-hooks/rules-of-hooks` with the value of `error`. 

```javascript
  "eslintConfig": {
    "extends": "react-app",
    "plugins": [
      "react-hooks"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error"
    }
  },
```
Now let's take these new rules for a spin. We'll open up the `Playground.js` file and so far so good. No errors yet.

[01:29] Before we make some errors, let's remove some code to make things more clear. There are two main rules when using hooks, one of which is to only call hooks at the top level like we're doing on line four with `useState`.

#### Playground.js
```javascript
import React, { useState } from "react";

export default function Playground() {
  const [text, setText] = useState("");
```

[01:43] However, if we were to call a hook inside a condition for example on only Mondays and have a special state defaulting to false, that isn't top level and we'll get an ESLint error. 

![Eslint Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-add-linting-to-help-enforce-rules-when-using-react-hooks-error.png)

React hook `useState` is called conditionally. React hooks must be called in the exact same order in every component render.

[02:06] In a similar but different way, let's introduce a new `todos` array with values `one`, `two`, and `three`. We'll map over them inside our unordered list. For each item we'll render a list item with the todo value. Let's introduce a new `count` state hook starting at `0`. We'll append the count to the `item` and on each `onClick` we'll increment the value.

![Second Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-add-linting-to-help-enforce-rules-when-using-react-hooks-second-error.png)

[02:34] We have an error here too. The error says, "React hook use state cannot be called inside a callback." This error is out for two separate reasons. One, it's not used at the root level. It's used inside of a map, which is basically a loop. The second rule is that hooks must only be called from a React function, either React function component or custom hook.

[02:57] We haven't talked about custom hooks just yet, but they're basically just a special function that starts with `use` and this special type of function can use React hooks without error. Creating a `dontDoThis` function that creates `nope` state would be an error since `dontDoThis` doesn't start with `use`.

[03:18] If we attempted to start our dev server at this point, it'll fail because we marked these ESLint rules as errors. The output from Create React App also shows these errors in the browser to show the problems at hand. There's currently an issue with Create React App to add support for the ESLint hooks plugin, so in the future you shouldn't need to eject your app when that's supported.

![Create React App Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-add-linting-to-help-enforce-rules-when-using-react-hooks-create-react-error.png)