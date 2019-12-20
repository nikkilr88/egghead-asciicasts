Instructor: 00:01 This ng template allows the parent component to control what view is displayed based on the state of the `ToggleComponent`. This `ToggleComponent` still has some hidden logic that controls how the state is updated, when this toggle function is called.

#### app.component.html
```html
<toggle (toggled)="log('toggle', $event)">
  <ng-template let-on="on" let-fns="fns">
    <switch [on]="on" toggler (click)="fns.toggle()">
    </switch>
  </ng-template>
</toggle>
```

00:19 In this case, that logic is just toggling the ON value of the component. We're going to use the State Reducer Pattern to give the parent control over how that state is updated.

00:31 In `toggle.component.ts`, first, we'll create an interface for the `ToggleComponent` state. It just has one `on: boolean` property. 

#### toggle.component.ts
```ts
export interface ToggleState {
  on: boolean;
}
```

Then, we'll create a type for the `ToggleStateReducer`. It's a function that takes the current `state` which is of type `ToggleState` and it `changes` object which is a `Partial` value of that `<ToggleState>`. That will return a new toggle state.

```ts
export type ToggleStateReducer = 
  (state: ToggleState, changes: Partial<ToggleState>)
    => ToggleState;
```

00:54 This may look familiar to those use Redux, state is your current state, and changes fills the role of the action and it returns a new toggle state. Now, we'll configure our `ToggleComponent` to take a `stateReducer` as an input that will be of type `ToggleStateReducer`.

01:12 We'll initialize that to a function that takes a `state` and some `changes`. It returns a new object with that spreads out the current `state` and overrides that with the new `changes` that are passed in.

```ts
export class ToggleComponent {
  ...
  @Input() stateReducer: ToggleStateReducer = 
    (state, changes) => ({ ...state, ...changes });
...
}
```

01:25 Now, we need to actually use this state reducer. In this `setOnState` function, we'll create our `oldState` which is just the current `on` state. We'll calculate the `newState` by using the `stateReducer` function with the `oldState` passed in and the new `on` value as it changes object.

01:45 If our state reducer has actually changed the state object, then we will apply the changes with the new state value. 

```ts
setOnState(on: boolean) {
  const oldState = { on: thison };
  const newState = this.stateReducer(oldState, { on });
  if (oldState !== newState) {
    this.on = on;
    this.toggled.emit(this.on);
  }
}
```

Now in order to use this, we'll go to `app.component.html`. We'll set the `[stateReducer]` to our own custom `stateReducer`.

#### app.component.html
```html
<toggle (toggled)="log('toggle', $event)" [stateReducer]="stateReducer">
```

02:01 Now, let's define that in our TypeScript file, `app.component.ts`. Let's say our `AppComponent` wants to keep track of the number of times the toggle is clicked. We want to create a state reducer that will stop the button from toggling, if we reach a certain limit.

02:15 We'll set our `stateReducer` function to be a function that takes the current `state` and some `changes`. If the number of `timesClicked` is more than our limit, we'll just `return state` with no changes. If the `on` value has actually being modified, we're going to increment this.`timesClicked` by one.

02:37 Finally, we'll pass through our changes just like the default state reducer. 

#### app.component.ts
```ts
import { Component } from '@angular/core';
import { ToggleState } from './toggle/toggle.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {
  timesClicked = 0;
  
  stateReducer = (state: ToggleState, changes: Partial<ToggleState>) => {
    if (this.timesClicked > 3) {
      return state;
    }
    if (changes.on !== undefined) {
      this.timesClicked = this.timesClicked + 1;
    }
    return { ...state, ...changes };
  }

  log(message, value) {
    console.log(message, value);
  }
}
```

Now, let's see if this works. We're going to keep clicking and it stopped. Looks like it's working.