Instructor: 00:00 Let's go and refactor this so it's a little bit more capable. Right now, it only supports the `on` state, but if your component has more than just a couple items of state, it might be a little tedious to keep this updated.

00:10 What we are going to do is take our `state` object and return a new object that combines our controlled and uncontrolled state. Here, in `getState()`, we will `return Object.entries(this.state)`, and we'll `reduce` that within arrow function and we'll initialize our reducer with an empty object.

#### 10-primer.js
```javascript
getState() {
  return Object.entries(this.state).reduce(() => {}, {})
  return { 
    on: this.isControlled('on') ? this.props.on : this.state.on
  }
}
```

00:28 The accumulator for this reducer function is going to be our `combinedState`. We'll de-structure each of the entries to their `key` and `value`.

```javascript
getState() {
  return Object.entries(this.state).reduce(
    (combinedState, [key, value]) => {

    },
    {},
    )
  return { 
    on: this.isControlled('on') ? this.props.on : this.state.on
  }
}
```

00:37 We will `return` our `combinedState` and we'll say `if (this.isControlled(key))`, then our `combinedState` at that `[key]` will equal `this.props[key]`. Otherwise, `combineState[key]` will be the `value` because that's coming from state.

```javascript
getState() {
  return Object.entries(this.state).reduce(
    (combinedState, [key, value]) => {
      if (this.isControlled(key)) {
        combinedState[key] = this.props[key]
      } else {
        combinedState[key] = value
      }
      return combinedState
    },
    {},
  )
}
```

00:57 Now everything is working just as well. This makes our `getState` function more capable because now it will continue to work regardless of what changes we make to our `state`.