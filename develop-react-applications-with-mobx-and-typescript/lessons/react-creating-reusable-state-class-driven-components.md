We start off with the simple list application from the previous lesson. You can add items to the list and reset the list if you want. Now, looking at the app, it could be great if you had a reusable input component.

#### app.tsx
```typescript
<input
  value={appState.currentItem}
  onChange={e => appState.changeCurrentItem(e.target.value)} />
```

Similarly, if you look at `ApplicationState`, it could be great if you could create a reusable field state instead of having to create two things. 

#### appState.ts
```typescript
@observable
  currentItem = '';

@action
changeCurrentItem(newValue: string) {
    this.currentItem = newValue;
}
```

You create a new file `field.tsx` to contain these two reusable pieces of information.

You bring in the usual `React` `observable` and `action` from `mobx` and `observer` from `mobx-react`. 

#### field.tsx
```typescript
import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
```

We can refactor the reusable portion of the state into a nice class called `FieldState` that has the `value` and the `onChange` action to change the value.

```typescript
export class FieldState {
  @observable
  value = '';

  @action
  onChange(newValue: string) {
    this.value = newValue;
  }
}
```

Similarly, we can refactor the rendering of the `FieldState` into a reusable `FieldInput` component that takes the `fieldState` as a prop and wires it into a browser native input element. 

```typescript
@observer
export class FieldInput extends React.Component<{ fieldState: FieldState }>{
  render() {
    return (
      <input
        value={this.props.fieldState.value}
        onChange={
          (e) => this.props.fieldState.onChange(e.target.value)
        }
      />
    );
  }
}
```

In our `ApplicationState`, instead of these two pieces of information, we have a single `FieldState`. 

Now, we simply carry out the refactoring required as courteously pointed out by TypeScript.

#### appState.ts
```typescript
@observable
  currentItem = new FieldState();

  @action
  addCurrentItem() {
    this.items.push(this.currentItem.value);
    this.currentItem.onChange('');
  }

  @action
  reset() {
    this.items = [];
    this.currentItem.onChange('');
  }
```

This already results in a few less lines and less lines of isolatable logic into our application code. Similarly, in `app.tsx`, we get to use our `FieldInput` and simply wire it to the `currentItem` in the application state.

#### app.tsx
```typescript
<FieldInput fieldState={appState.currentItem} />
```

As you can see, the application still works as expected. Note that, if you wanted, we could easily share this reusable logic of field state maintenance. Next ideas to include in such a class would be adding validation and error maintenance along with the ability to compose field states into a nice cohesive form state.

This is exactly what the library `formstate` does. You bring it in from npm and just use that instead of our custom rolled FieldState. 

```javascript
npm install formstate
```

We wire our `input` to use that generic field state and initialize the `currentItem `in app state to also use the same `FieldState`.

#### field.tsx
```typescript
import { FieldState } from 'formstate';

@observer
export class FieldInput extends React.Component<{ fieldState: FieldState<string> }>{
  render() {
    return (
      <input
        value={this.props.fieldState.value}
        onChange={
          (e) => this.props.fieldState.onChange(e.target.value)
        }
      />
    );
  }
}
```

#### appState.ts
```typescript
import { FieldState } from 'formstate';

@observable
 currentItem = new FieldState('');
```

Note that, having the ability to author our own field input allows us to design an input that matches our requirements. We get to define our own design without having to worry about the core logic of field state management and validation.

#### field.tsx
```typescript
<input
  style={ border: '1px solid skyblue' }
  value={this.props.fieldState.value}
  onChange={
      (e) => this.props.fieldState.onChange(e.target.value)
  }
/>
```

There is, of course much more to the [formstate](https://formstate.github.io/#/) library. However, the focus here was simply to demonstrate the reusability of state classes with state class prop components.