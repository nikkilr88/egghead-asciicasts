Instructor: [00:00] We have a live search box that filters a list of restaurants, but it might be nice to see how it's actually working by logging some values to the console as we type.

[00:09] Start by enabling the developer menu by pressing `command D` for the iOS simulator on a Mac, `command M` for the Android simulator on a Mac, and `control M` on Windows or Linux.

[00:20] You can also bring it up by shaking the simulator through the menu. 

![Shaking](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-write-to-the-console-log-in-a-react-native-app-shake.jpg)

Shaking the device even works to bring up the developer menu on a physical device. Now, with the developer menu up, select Debug JS Remotely.

![Debug JS Remotely](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-write-to-the-console-log-in-a-react-native-app-debug-js.jpg)

[00:33] The bundle will reload in the simulator and a web browser will open with some information about React native JavaScript code. On the browser tab, you can open the developer tools and make sure it's on console.

![Console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-write-to-the-console-log-in-a-react-native-app-console.jpg)

[00:45] Then here, just like for web development, we can see the console output. You can already see some info from the running app. Then we can log info to the screen just like console on the web.

[00:56] Back in the `render` method of `App`, we can log the current value of `search` in the `state`. 

#### App.js
```javascript
render() {
    console.log("search: ", this.state.search)
}
```

If we rerun that and search for something, then we can see the state changing. 

![State Change](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750455/transcript-images/react-native-write-to-the-console-log-in-a-react-native-app-state-change.jpg)

We can also use `console.warn` just like `console.log`.

[01:16] When we run that and search for something, we can see the console.warn statement both as a yellow box in the simulator, and as a yellow background message in the console.

![Console Warn](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750454/transcript-images/react-native-write-to-the-console-log-in-a-react-native-app-console-warn.jpg)

[01:26] If you don't like that yellow box on the simulator itself, we can turn it off. Go to `index.js` and type `console.disableYellowBox = true`. Now when we run that, you can see the warnings in the console, but not the app itself.

[01:45] We can use `log` and `warn`, and also `console.error`. Now when we rerun, we get a big red error screen as well as a red background error in the console. 

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-write-to-the-console-log-in-a-react-native-app-error.jpg)

The red error screen in the app has some interesting properties.

[02:01] First, the stack trace here is interactive, which means you can click into one of the file references and it will jump to that line of code. Even if the line is outside of your code and in React native itself, it will open right to that line in that stack.

[02:16] The red box also signals a runtime error. You can dismiss it and continue running, and the app continues to work. Since we are logging an error on every render, if we change the search string, we'll hit the error again.
