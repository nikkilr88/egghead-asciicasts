Instructor: [00:00] Let's kick up our dev server to run our example React app. On the right, you can see a relatively simple Todo app. You can add, check off, and delete items.

[00:10] This one has a special toggle in the upper right-hand corner. This controls the theme of the app. There's a dark theme and a light theme. Let's check out the code and see how this is handled.

![Toggle Theme](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-use-the-usecontext-hook-to-wire-up-the-react-context-api-toggle.png)

[00:25] Let's first go to the `App.js` file. On line five, the app is using the React Context API to control how the theme is getting passed through the components. 

#### App.js

```javascript
import ThemeContext from "./Theme/T
```

In the `render`, the `ThemeContext` provider is passing the theme `value` to its consumers.

```javascript
<ThemeContext.Provider value={theme}>
```

[00:40] The theme changes when the Switch component is changed on line 51. 

```javascript
<Switch
  checked={theme === "light"}
  onChange={this.handleThemeChange}
/>
```

The `componentDidMount` is grabbing the theme value from `localStorage`. The `handleThemeChange` is flipping the theme and saving that to `localStorage` as well.

```javascript
  componentDidMount() {
    const theme = window.localStorage.getItem("theme") || this.state.theme;
    this.setState({ theme });
  }
  handleThemeChange = flag => {
    const theme = flag ? "light" : "dark";
    this.setState({ theme });
    window.localStorage.setItem("theme", theme);
  };
```

[00:54] How do we consume the context? In a React class, there are two ways. One is to import the `ThemeContext` and use render props with the `Consumer`. It'll pass the value, which is the `theme`, and you can use it how you wish.

[01:10] It's easier to see if we collapse the code. The `Consumer` expects a function that will get invoked with the `theme` that then can be used.

#### TodoList.class1.js
```javascript
import ThemeContext from "./ThemeContext";

<ThemeContext.Consumer>
    {theme => (
      <Container todos={todos}>
    )}
</ThemeContext.Consumer>
```

[01:21] Another way to consume context in a React class is to also import the `ThemeContext`, but this one is much more straightforward. You give the class a `contextType` and assign it to your context. 

#### TodoList.class2.js
```javascript
TodoList.contextType = ThemeContext;
```

Then when you want to use the context value, you reference the `context` property off of `this`. That's it. `this.context` represents the theme in this case.

```javascript
<List theme={this.context}>
```

[01:44] Let's now switch to a function component that mostly has all the theme stuff taken care of. If we kick up our dev server, I'll show you close it is.

[01:53] On the right, if I flip to the light theme, almost everything looks as it's supposed to, except the border around the ToDos. It should be darker, not a while line.

![Border](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-use-the-usecontext-hook-to-wire-up-the-react-context-api-border.png)

[02:04] Let's go into the code and see how to add context to a function component. You might have already guessed it. You import a `useContext` hook from React.

#### TodoList.func.js
```javascript
import React, { useState, useContext } from "re
```

[02:15] To leverage the `useContext` hook, you just create a variable to store the context value and set it to `useContext` passing the context you want to consume, which in our case is `ThemeContext`.

```javascript
const theme = useContext(ThemeContext);
```

[02:28] Now we can use the theme wherever it is needed. In this case, we need to replace the hard-coded dark value on line 38 to be a `theme`.

```javascript
<List theme={theme}>
```

[02:37] Now we should be able to try the app out again. This time, when we switch themes, it looks much better, or at least as it should be.
