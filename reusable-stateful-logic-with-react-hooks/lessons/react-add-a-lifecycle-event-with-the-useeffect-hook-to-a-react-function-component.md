Instructor: [00:00] We'll start our React dev server and kick up a small React app that uses the deprecated but still present battery status API in Chrome, in order to visually show the percentage of battery left on a machine. The lightning bolt shows if our device is currently charging or not.

![Battery](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-add-a-lifecycle-event-with-the-useeffect-hook-to-a-react-function-component-battery.png)

[00:19] This app uses both state and lifecycle events. Let's go take a look and see how it's built. We'll take a look at the React class component version of this app, and then convert it to a function component with hooks.

[00:33] In our `render`, we're mostly returning a `Battery` component and passing all the state values it needs to show the battery meter and lightning bolt. The `componentDidMount` wires up the event handlers, and the `componentWillUnmount` makes sure to remove those event handlers.

#### Playground.class.js
```javascript
  componentDidMount() {
    navigator.getBattery().then(bat => {
      this.battery = bat;
      this.battery.addEventListener("levelchange", this.handleChange);
      this.battery.addEventListener("chargingchange", this.handleChange);
      this.handleChange({ target: this.battery });
    });
  }
  componentWillUnmount() {
    this.battery.removeEventListener("levelchange", this.handleChange);
    this.battery.removeEventListener("chargingchange", this.handleChange);
  }
  handleChange({ target: { level, charging } }) {
    this.setState({ level, charging });
  }
  render() {
    return (
      <section>
        <Battery {...this.state} />
      </section>
    );
  }
```

[00:50] As we convert this class component to a function component, we'll not only need the `useState` hook to manage state, but also the `useEffect` hook to deal with side effects. Now we'll replace the class with a function and comment out the old constructor, which we can't use.

```javascript
import React, { useState, useEffect } from "react";

export default function Playground() {

}
```

[01:06] Instead, we'll create new State for the battery with an updater called `setBattery`, which we're destructuring off of the `useState`, and we'll pass our initial state of the same data we had on line 8 in our constructor, `level` , and `charging` false.

```javascript
 const [battery, setBattery] = useState({ level: 0, charging: false });
```

[01:23] What do we do about `componentDidMount` and `componentWillUnmount`? The `useEffect` hook can take care of those, and also the `componentDidUpdate`, if you've used that before in a React class.

[01:34] We'll type `useEffect`, which takes two parameters. The first one is a function that will get called after every render. We'll come back to the second argument a little bit later.

```javascript
useEffect(() => {

})
```

[01:44] For every render, we want to run what was in the `componentDidMount`. For free, we get this running on updates as well. Next, let's remove the `this`. references, since this isn't a class anymore, and we'll create a local `battery` variable. That takes care of the `componentDidMount`, but what about the cleanup?

```javascript
useEffect(() => {
  let battery;
  navigator.getBattery().then(bat => {
    battery = bat;
    battery.addEventListener("levelchange", handleChange);
    battery.addEventListener("chargingchange", handleChange);
    handleChange({ target: battery });
  });
})
```
[02:03] If you happen to return a function from inside a `useEffect`, it'll use that to clean up after itself. We can copy what was in the `componentWillUnmount` and move it in there. As before, we'll remove instances of `this`., and now, we could remove the `componentWillUnmount` method.

```javascript
useEffect(() => {
  let battery;
  navigator.getBattery().then(bat => {
    battery = bat;
    battery.addEventListener("levelchange", handleChange);
    battery.addEventListener("chargingchange", handleChange);
    handleChange({ target: battery });
  });

  return () => {
    battery.removeEventListener("levelchange", handleChange);
    battery.removeEventListener("chargingchange", handleChange);
  }
});
```

[02:21] Next, we move the old `handleChange` method up a bit higher and convert it to a local function. The important piece here is to replace the `this.setState` with our `setBattery` updater function. 

```javascript
  const handleChange = ({ target: { level, charging } }) =>
    setBattery({ level, charging });
```

Now it's time to talk about that second argument to `useEffect` that I mentioned we'd come back to.

[02:38] You can optionally provide an array of inputs. If provided, the `useEffect` will only run after renders where those inputs have changed. Before, when we didn't provide a value, that meant to run the effect after every render. Another option is to provide an empty array. That means to only run `onMount` and `onUnmount`.

```javascript
  useEffect(() => {
    let battery;
    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingchange", handleChange);
      handleChange({ target: battery });
    });
    return () => {
      battery.removeEventListener("levelchange", handleChange);
      battery.removeEventListener("chargingchange", handleChange);
    };
  }, []);
```

[02:59] At this point, we're almost done. Now, we just need to remove the `render` method and just `return` the part that we want rendered. Instead of spreading the `state`, we'll spread the `battery` object.

```javascript
  return (
    <section>
      <Battery {...battery} />
    </section>
  );
```

[03:11] Now, if we kicked back up our dev server, we should see a fully working React function component that leverages the `useState` and `useEffect` hooks to manage state and side effects. There are a few other things I'd like to explore and explain. Let's switch over to a to-do app that is a little more complex than our battery example.

[03:31] Not only does this app keep state, but a few side effects were added to this app as well, like keeping the to-dos in local storage, updating the document's title with how many incomplete items there are, and listening to the question mark key to show an `About` dialog.

![Todo App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-add-a-lifecycle-event-with-the-useeffect-hook-to-a-react-function-component-todo.png)

[03:47] Let's take a look at these effects and convert them over to React function component. We already have a completed class version of this component. Here, we're handling the key event coming from the keyboard.

#### TodoList.class.js
```javascript
  handleKey({ key }) {
    this.setState(prevState => {
      return {
        showAbout:
          key === "?" ? true : key === "Escape" ? false : prevState.showAbout
      };
    });
  }
```

[03:59] We have various lifecycle events for `componentDidMount` and `componentDidUpdate` that read from `localStorage`, `addEventListener`s, and update the document's `title`, and there's the `componentWillUnmount` that removes the keydown handler.

```javascript
  update(todos) {
    const inCompleteTodos = todos.reduce(
      (memo, todo) => (!todo.completed ? memo + 1 : memo),
      0
    );
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
  componentDidMount() {
    const todos = JSON.parse(window.localStorage.getItem("todos") || "[]");
    document.addEventListener("keydown", this.handleKey);
    this.update(todos);
    this.setState({ todos });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.update(this.state.todos);
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }
```

[04:11] A downside of this is that code that is related to a particular feature isn't necessarily located next to each other. The other piece to note is the `About` component that should be shown if the user clicked the question key.

[04:25] Let's copy most of the lifecycle events and helper methods. We'll tweak our app to run an already-started React function component that has all the state wired up without effects, yet. Inside the function component, we'll paste the code from our class component and comment it out for reference.

[04:42] To begin, let's add the piece for `localStorage`. We'll first create a variable, `initialTodos`, and start reading from `localStorage`. We'll use the `todos` key and pass the JSON into our variable. If it's `null`, we'll start with an empty array.

```javascript
 const initialTodos = JSON.parse(window.localStorage.getItem("todos") || "[]");
```

[04:58] Instead of hardcoding to an empty array, we'll replace with our `initialTodos`. 

```javascript
const [todos, updateTodos] = useState(initialTodos);
```
Once we save, our app auto-updates and we can see on the right todo items that we have from before. Pretty neat.

![Local Storage](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386010/transcript-images/react-add-a-lifecycle-event-with-the-useeffect-hook-to-a-react-function-component-localstorage.png)

[05:10] Next, let's introduce an effect with the `useEffect` hook. Here, we'll write to `localStorage` a serialized version of our `todos`. 

However, we don't really want to be writing to local storage after every render, so we'll provide the second argument and tell it to only run if our todos array has changed.

```javascript
useEffect(
    () => {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
);
```

[05:28] On the right, if I make a change, I can immediately refresh the page and the changes have been persisted and restored. However, although our writing to `localStorage` is better, the reading from `localStorage` is happening before every render. Let's fix that.

[05:44] Thankfully, `useState` can also take a function that will be invoked once in order to get its initial value. We could just wrap our `localStorage` call in a function and return the initial value. 

```javascript
 const initialTodos = () => JSON.parse(window.localStorage.getItem("todos") || "[]");
```
Just to make sure, we'll test it out, and it still works, but this time with better performance. That's the `localStorage` feature. Let's move to the document `title` side effect.

[06:06] We'll use the `useEffect` hook as before. We'll paste the code that we got from the old update method. We'll uncomment it. That it that. It works.

```javascript
  useEffect(() => {
    const inCompleteTodos = todos.reduce(
      (memo, todo) => (!todo.completed ? memo + 1 : memo),
      0
    );
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
  });
```

[06:19] For this one, we didn't provide the second argument to tell it when to run. This one is running after every render, mostly because we need to calculate how many items are incomplete. We aren't returning anything, because there isn't really any cleanup necessary. Next feature.

[06:35] Here, we need some more state to determine if our `About` dialog should show up or not. We'll have a `showAbout` and `setShowAbout` updater destructured from `useState` with a default value of `false`. 

```javascript
const [showAbout, setShowAbout] = useState(false);
```

As before, we'll have a `useEffect`.

[06:51] On our way to get some code, we'll remove items that we've already covered, like `localStorage` and `componentDidUpdate`, which leaves us with the `About` dialog feature. We'll grab the `componentDidMount` and `componentWillUnmount` code, and move them into our `useEffect` function.

```javascript
useEffect(() => {
   document.addEventListener("keydown", handleKey);
   return () => document.removeEventListener("keydown", handleKey);
});
```

[07:11] The `addEventListener` can stay like this, but the removeEventListener will return a function that executes that, so React will clean up after itself. Now, we'll replace `this` period with nothing, and provide our own `handleKey` function, where we'll destructure the `key` property from the event arg and call our `setShowAbout` updater.

```javascript
useEffect(() => {
    const handleKey = ({ key }) => {
      setShowAbout(show =>
      
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });
```

[07:34] We'll come down and grab the logic from our comment below, and tweak the end to reference our previous value of `show`. 

```javascript
  useEffect(() => {
    const handleKey = ({ key }) => {
      setShowAbout(show =>
        key === "?" ? true : key === "Escape" ? false : show
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  });
```

Now, we can delete our commented code.

[07:45] Before we're done with this feature, let's add an empty array as the second argument, so that this will only run on the initial mount and unmount.

```javascript
  useEffect(() => {
    const handleKey = ({ key }) => {
      setShowAbout(show =>
        key === "?" ? true : key === "Escape" ? false : show
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
```

[07:53] It's noteworthy to mention that the cleanup function isn't only on unmount. In this case, it is, since I gave it an empty array, but if we hadn't provided a value, or if we gave an array of input values, the cleanup function would run before the `useEffect` code runs. It really depends on the second argument you provide.

[08:14] Anyway, the last bit we need is to grab the `About` component and wire that up. We'll grab the logic that was there before in order to determine the state. We'll paste the `About` component and replace `this.setState` with our `setShowAbout` updater, passing `false`, and import the component at the top.

```javascript
 <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
```

[08:39] Now, does it work? Ah, yes. Yes, it does. Yay.
