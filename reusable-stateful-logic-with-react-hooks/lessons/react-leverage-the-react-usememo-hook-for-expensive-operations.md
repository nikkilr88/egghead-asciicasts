Let's kick up a dev server for a function Component Todo react app and check out it's features.

on the right at first it seems everything is as normal add new todos one, two, three but as our todos get longer the gradient starts to fade darker and darker. 

This gradient is determined at runtime based on the length of the todo which really isn't too intensive, but we are going to treat it like code that could take a long time and see how we can boost it's performance. If we look at devtools, you can see that for each item it calls a function that determines the gradient and for each item it also does the complex figuring of that gradient. Optimally, we'd like to not do the figuring part every time.

![Console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-leverage-the-react-usememo-hook-for-expensive-operations-console.png)

So, let's dig into the code and see what we can do. The `TodoItem` function component has the code in question. Inside the `TodoItem` component on line 20 is where the `console.log `for the calling is, that is right before the `getColors` function is invoked. 

#### TodoItem.js
```javascript
export default function TodoItem({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  console.log("calling...");
  const ageColors = getColors(todo.text, theme)
```
And on line 9 is where we start to dynamically determine what the gradient should be based on the length of the todo again, this isn't rocket science, but it'd be nice to avoid recalculations if possible.

```javascript
const getColors = (text, theme) => {
  console.log("figuring...");
  const themeColor = styles[theme].todo.backgroundColor;
  const lengthPercentage = (text.length * 100) / 42;
```

To solve our problem, we'll introduce yet another React hook called `useMemo`. To use this hook we'll wrap our `getColors` inside another function and provide that to `useMemo` and pass a second argument describing the inputs we want it to look at to determine if the return value should be recalculated. 

If the inputs haven't changed, then it'll return the answer from the previous calculation. In this case we'll pass the `todo.text` and the `theme` which are the values that are used to determine the colors. 

```javascript
const ageColors = useMemo(() => getColors(todo.text, theme), [
  todo.text,
  theme
]);
```

And now. if we go to run this app again if we start to type we'll only see a bunch of "calling…" console.logs because the "figuring…" part was already memoized on the initial render (before we cleared the console). Much nicer.

To make this nicer still would be not to execute the `TodoItem` at all if it hasn't changed so we can import the `memo` High Order Component and wrap our function to simulate what a `PureComponent` would do comparing the previous and next props. 

```javascript
export default memo(function TodoItem({ todo, onChange, onDelete }) {
```
And now when we run our code we'll only see very few instances of calling or figuring which is great!