Instructor: 00:00 This toggle component is exposing its internal state to us through inputs and outputs. However, it doesn't give us any control over what's actually displayed inside of the toggle component.

#### app.component.html
```html
<toggle [on]="true" (toggled)="showMessage($event)"></toggle>
```

00:10 We're going to try to remedy that using a pattern called compound components. This is where multiple components work together to give the parent component more control over how the whole system works.

00:25 We will add three child components to the toggle component -- `<toggle-button>`, `<toggle-on>`, and `<toggle-off>`. Toggle-button will display the switch that toggles on and off.

00:43 `toggle-on`, we'll use to display some message when the toggle is on. `toggle-off` will display a message when the toggle is off. 

```html
<toggle (toggled)="showMessage($event)">
  <toggle-button></toggle-button>
  <toggle-on>On</toggle-on>
  <toggle-off>Off</toggle-off>
</toggle>
```

Now all of these have red squiggles on them because we haven't defined them yet, so let's go do that.

00:58 First, we'll create the `toggle.button.component.ts`. This component looks very similar to the toggle component that we defined previously.

#### toggle.button.component.ts
```ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle-button',
  template: '<switch [on]="on" (click)="onClick()" ></switch>',
})
export class ToggleButtonComponent  {
  @Input() on: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();
  onClick() {
    this.on = !this.on;
    this.toggle.emit(this.on);
  }
}
```

01:08 Next, we'll make the `toggle.on.component.ts`. The `toggle-on` component just has one `@Input` and displays its contents if that input is true. 

#### toggle.on.component.ts
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'toggle-on',
  template: '<ng-content *ngIf="on"></ng-content>',
})
export class ToggleOnComponent  {
  @Input() on: boolean;
}
```

Finally, we'll make the `toggle.off.component.ts`. The `toggle-off` component also takes one boolean input and displays its content only if that value is not true.

#### toggle.off.component.ts
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'toggle-off',
  template: '<ng-content *ngIf="!on"></ng-content>',
})
export class ToggleOffComponent  {
  @Input() on: boolean;
}
```

01:39 We'll also need a `toggle.module.ts` to bundle up all of these components together. That simply takes the toggle component, toggle-on/off, and toggle button declares them here. This `SwitchComponent` is just the UI that displays our toggle. Then it exports them so that other components can use them.

#### toggle.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleComponent } from './toggle.component';
import { ToggleOnComponent } from './toggle.on.component';
import { ToggleOffComponent } from './toggle.off.component';
import { ToggleButtonComponent } from './toggle.button.component';
import { SwitchComponent } from '../irrelevant-implementation-details/switch.component';

@NgModule({
  declarations: [
    ToggleComponent,
    ToggleButtonComponent,
    ToggleOffComponent,
    ToggleOnComponent,
    SwitchComponent,
  ],
  imports: [ CommonModule ],
  exports: [
    ToggleComponent,
    ToggleButtonComponent,
    ToggleOffComponent,
    ToggleOnComponent,
  ],
})
export class ToggleModule {}
```

02:04 All the complexity of this compound toggle component is in this `toggle.component.ts` here. I'm going to get rid of this `toggle.component.html` file since we don't really need it and change the `template` in `toggle.component.ts` to the inline here, and set it to `<ng-content>`, which simply displays whatever is inside of the root title component tags. 

#### toggle.component.ts
```ts
@Component({
  selector: 'toggle',
  template: '<ng-content></ng-content>',
})
```

02:30 Since the switch itself is no longer on this toggle component, we can remove the `onClick` function. We need to get a reference to all three child components. We'll use the `@ContentChild` decorator and get a reference to the `ToggleOnComponent` that's inside of this.

02:52 We'll call this `toggleOn`, so type `ToggleOnComponent`. We'll do the same thing for `toggle-off` and toggle button. We'll fix up our imports. Now we have referenced all three of those child components.

```ts
import { Component, Input, Output, EventEmitter, ContentChild, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';

import { ToggleOnComponent } from './toggle.on.component';
import { ToggleOffComponent } from './toggle.off.component';
import { ToggleButtonComponent } from './toggle.button.component';

@Component({
  selector: 'toggle',
  template: '<ng-content></ng-content>',
})
export class ToggleComponent {
  @Input() on: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  @ContentChild(ToggleOnComponent) toggleOn: ToggleOnComponent;
  @ContentChild(ToggleOffComponent) toggleOff: ToggleOffComponent;
  @ContentChild(ToggleButtonComponent) toggleButton: ToggleButtonComponent;
```

03:25 Anything referenced with the `@ContentChild` decorator is not guaranteed to be present when the component is initialized, so we need to use a Lifecycle hook of `AfterContentInit`. That allows us to use the `ngAfterContentInit` function in our component.

03:48 Inside this function, we know that any content of the component has been processed, so we now have a real reference to the `toggleButton`. When the toggled output is emitted from the toggle button, we can get a subscription to that.

04:13 When that value comes through, we can update our current state and `emit` to the parent. We also need to update the state of all of our child components.

```ts
export class ToggleComponent implements AfterContentInit {
  @Input() on: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  @ContentChild(ToggleOnComponent) toggleOn: ToggleOnComponent;
  @ContentChild(ToggleOffComponent) toggleOff: ToggleOffComponent;
  @ContentChild(ToggleButtonComponent) toggleButton: ToggleButtonComponent;

  ngAfterContentInit() {
    this.toggleButton.toggle.subscribe(on => {
      this.on = on;
      this.toggle.emit(on);
      this.update();
    });
  }
```

04:42 Let's include the toggle.module in our `app.module.ts` out here. `Import { ToggleModule } from 'toggle.module';`. We don't need the `SwitchComponent`, and we don't need that. Let's add the `toggle-on` module here. 

#### app.module.ts
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToggleModule } from './toggle/toggle.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ToggleModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Let's go back to `app.component.html`. Now we have toggle-button and `toggle-on`, `toggle-off`. We can toggle this button on and off. The toggle component works.

05:22 Now we have the flexibility to reposition these child components and add HTML, or other Angular components if we want to.

#### app.component.html
```html
<toggle (toggled)="showMessage($event)">
  <toggle-on>On</toggle-on>
  <toggle-off>Off</toggle-off>
  <toggle-button></toggle-button>
  <b>Hi, Mom!</b>
</toggle>
```