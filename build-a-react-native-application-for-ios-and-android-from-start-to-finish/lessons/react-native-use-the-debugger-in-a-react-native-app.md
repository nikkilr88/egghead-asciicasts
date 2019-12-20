Instructor: [00:00] With remote JS debugging turned on:

![Remote Debugger](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750465/transcript-images/react-native-use-the-debugger-in-a-react-native-app-remote-turned-on.jpg)

You can add a debugger statement directly in your code. 

#### App.js
```javascript
 render() {
    
    debugger

    return (
      <View style={{
        flex: 1
      }}>
```

Now when we run, the app stops executing when it hits the debugger line and loads a debugger pane in the Web browser.

![Stops](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-use-the-debugger-in-a-react-native-app-stops.jpg)

[00:16] The debugger shows the code when the debugger statement was hit. We can see the execution is currently paused. We can see the execution 'Call Stack'. It shows that we're in the `render` method of our `App.js`, which is helpful when you're deep into your application.

[00:32] One of the most helpful panes in the debugger window is the `Scope` pane. 

![Scope](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-use-the-debugger-in-a-react-native-app-scope.jpg)

Here you can see all the values of the variables currently in scope. If we take a look at `this.state`, we can see our `search` term is `null` because the `App` component has just loaded.

[00:49] If we want to test certain variable values, this `Scope` pane is actually interactive. We can change the value of t`his.state.search` to `React`. 

![Interactive](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750456/transcript-images/react-native-use-the-debugger-in-a-react-native-app-scope-interactive.jpg)

Then when we hit the play button to resume execution, we immediately see the search value change to React. The restaurant list filters to show only the React Cafe.

![Resume](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750461/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-resume.jpg)

[01:09] This is a super powerful way to investigate bugs in React Native apps because you can check and change the values of your variables while your program is executing.

[01:19] Let's trigger the debugger statement again by changing one character in the live search. Now we're paused again. The scope pane can get crowded in a large application. To help see just the search value, we'll add a `Watch` statement. Click the plus next to watch. Type `this.state.search`. We can see the current value of React.

![Watch](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750458/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-watch.jpg)

[01:45] Now if we hit play again and change the search term again, the debugger will pause and the watch pane is updated with the latest search value from state. We activated the debugger with a `debugger` command in code.

[02:01] We can also set breakpoints with the debugger open. If I want more information about the `restaurants` in this filter statement, then I can put a breakpoint here by clicking on the line numbers in the debugger. If I continue executing by pressing the play button, the debugger will pause again on the breakpoint.

[02:21] Now I can check the scope pane again. I can see the local place variable. If I press play a couple more times, I can see every value of the place variable as the filter method operates. 

![Breakpoint](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750454/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-breakpoint.jpg)

Once I'm done with the breakpoint, I can turn it off again by just clicking right on the breakpoint.

[02:39] There's one more neat thing the debugger can do. That is to automatically pause on an exception. Up here, we can turn on pausing on caught exceptions. 

![Pause](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750464/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-pause.jpg)

To see this in action, we'll purposefully throw an exception in the render method.

[02:54] When we run that now, we don't see the red error screen in the simulator like we would expect. Instead, we see that the debugger has paused on the exception. We can see all the variables, including `state` and `props`, in the scope pane like before. 

![Paused](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549750462/transcript-images/react-native-reload-the-simulator-when-changes-occur-in-react-native-apps-paused.jpg)

Pausing on a caught exception can be a great way to figure out what is actually going wrong during an exception.
