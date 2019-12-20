Instructor: [00:01] Here, we'll start a dev server and run our simple React app of a battery status meter. It uses the deprecated battery status API that still happens to be in Chrome for now. The app will respond to changes in battery level, and tracks if the computer is being charged or not. Let's take a look at the function component for this.

[00:20] It's using a combination of `useState` and `useEffect` hooks that are currently defined as part of our component. What if we wanted to use this logic inside of another component? Well, we can introduce our own custom hook for this. What does that look like?

[00:38] It's pretty straightforward. You just make a function. However, there is a catch. Your custom hook has to be prepended with the word `use`. We'll call ours `useBattery`. From this point on, you could do whatever you want in your custom hook. For the most part, we already have the code that we need.

[00:58] We'll grab our `useState`, `useEffect`, and handler, and move all of that into our custom hook, and then we get to decide what we want to expose to the consumer of this hook. In our case, it makes sense to only send the `battery` state. We won't expose the updater since the battery status API does that for us.

#### Playground.func.js
```javascript
const useBattery = () =>{
     const [battery, setBattery] = useState({ level: 0, charging: false });
  const handleChange = ({ target: { level, charging } }) =>
    setBattery({ level, charging });

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
  return battery;
}
```

[01:22] Now, in our main playground component, we'll create a `battery` variable and set it to the return of the custom `useBattery` hook. Now, we could run our app. It works, just as it did before. Now, we have a reusable custom hook that we could use elsewhere.

```javascript
export default function Playground() {
  const battery = useBattery();
  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}
```

[01:41] Now, let's switch gears and look at a `TodoList` component that has several side effect features of its own. It supports `localStorage` to persist to-dos. It interacts with the document `title` to show incomplete items, and responds to `keydown` events to reveal an "About" dialog.

[01:59] Let's pull those three features into their own custom hooks so that they could be reused at a later point in time. Our `TodoList` function component has these features already in it. We just need to refactor those parts out into their own custom hooks.

[02:15] Let's start with the `useLocalStorage` custom hook. We'll accept a `key`, a `defaultValue`, and an optional `callback`. We'll grab the `initialTodos`, the `useState`, and `useEffect` code and paste that into our function.

[02:32] Since we want this to be generic, we could rename things to be less to-do-ish, like `initialValue`, and use the `key` provided, and stringify the `defaultValue`. As for the `todoId` max logic, that doesn't make sense to go here. Let's provide a way for the consuming code to run code from the init, and pass the storage for them to use.

[02:55] Then we'll generalize the state to `storage` and `setStorage`, change `initialTodos` to `initialValue`, update our `localStorage` `key`, stringify `storage`, and only update on changes to `storage`. Then for our API, we'll return `storage` and the setStorage updater in an array.


#### TodoList.func.js
```javascript
const useLocalStorage = (key, defaultValue, callback) => {
  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
    if (callback) {
      callback(valueFromStorage);
    }
    return valueFromStorage;
  };
  const [storage, setStorage] = useState(initialValue);
  useEffect(
    () => {
      window.localStorage.setItem(key, JSON.stringify(storage));
    },
    [storage]
  );
  return [storage, setStorage];
};
```

[03:18] Now, let's use our custom hook. We could delete much of the code, and instead of using the `useState` hook, we'll use our custom `useLocalStorage` hook, passing the `todos` key, an initial value of empty array, and a callback where we `reduce` all the `todo` items to find the maximum `id` value.

```javascript
const [todos, updateTodos] = useLocalStorage("todos", [], values => {
    todoId.current = values.reduce((memo, item) => Math.max(memo, item.id), 0);
});
```

[03:39] Next, let's create a `useDocumentTitle` hook, which will be much simpler than the previous one. This will accept a `title`, and we'll use the `useEffect` and only run it when the `title` has changed. Inside our hook, we'll update the `document` `title` with whatever `title` that was passed. That's it. In this case, we don't need to return anything. There isn't much to do.

```javascript
const useDocumentTitle = title => {
  useEffect(
    () => {
      document.title = title;
    },
    [title]
  );
};
```

[04:02] To use this hook, we'll pull out the logic we had before, save off the dynamic title that was being generated, and use that to pass to our custom `useDocumentTitle` hook.

```javascript
const title = inCompleteCount ? `Todos (${inCompleteCount})` : "Todos";
useDocumentTitle(title);
```

[04:14] The last custom hook we'll create is a `useKeyDown` hook. The API we'll support is an object that defines which keys we want to listen to and the value that they represent. In this case, a `?` is `true`, an `Escape` is `false`, and everything else will be ignored. The second argument will be the initial value of the state.

[04:33] Let's grab the useEffect already defined and come up and create a custom hook called `useKeyDown` with parameters of `map` and `defaultValue`, like we talked about. We'll paste the code from our buffer.

```javascript
const useKeyDown = (map, defaultValue) => {
  useEffect(() => {
    const handleKey = ({ key }) => {
      setShowAbout(show =>
        key === "?" ? true : key === "Escape" ? false : show
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
};
```

[04:45] Here, we'll need to introduce some new state with `useState`, and destructure `match` and a `setMatch` updater with a `defaultValue` of whatever was passed in. In our return, we'll return our `match` State and `setMatch` updater.

```javascript
const useKeyDown = (map, defaultValue) => {
  let [match, setMatch] = useState(defaultValue);
  useEffect(() => {
    const handleKey = ({ key }) => {
      setShowAbout(show =>
        key === "?" ? true : key === "Escape" ? false : show
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  return [match, setMatch];
};
```

[05:02] Then we'll need to replace the `setShowAbout` with `setMatch`, and replace `show` with `preMatch`. As for the logic, since we're making things more generic, it'll look quite different. Here, we'll grab the `keys` of the `map` and see if any of them match the `key` event. If so, then we'll use the value for that item. Otherwise, it would just return the previous state.

```javascript
const useKeyDown = (map, defaultValue) => {
  let [match, setMatch] = useState(defaultValue);
  useEffect(() => {
    const handleKey = ({ key }) => {
      setMatch(prevMatch =>
        Object.keys(map).some(k => k === key) ? map[key] : prevMatch
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  return [match, setMatch];
};
```
[05:25] At this point, we should be able to rerun our app and give it a go. The local storage seems to work, the title's updating, and the "About" dialog shows up. Good deal.
