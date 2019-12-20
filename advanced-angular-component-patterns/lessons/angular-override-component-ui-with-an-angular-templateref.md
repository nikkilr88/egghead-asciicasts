Instructor: 00:00 This compound toggle component gives you three child components that let you interact with the state of the toggle. This `<toggle-button>` lets you toggle the value on or off.

00:10 The `<toggle-on>` component displays something when the toggle is on. The `<toggle-off>` component displays something when the toggle is off. These three child components fully cover all the possible values of the toggle.

00:22 Say we had a component with state that was a bit more complicated. What we'd really want is for a toggle component to just give us the state that's inside of it and let us fill in the details of how to display that.

00:34 The way we'll do that is using the `<ng-template>` tag. You can explicitly specify which part of the state you're interested in and then use that state inside of your template.

#### app.component.html
```html
<div toggle (toggle)="onToggle($event)">
  <ng-template let-on="on">
    {{ on ? 'On' : 'Off' }}
  </ng-template>
</div>
```

00:45 This template isn't wired up at all. Let's go do that. First off, we can get rid of these child components, `toggle.button.component.ts`, `toggle.off.component.ts`, `toggle.on.component.ts`, and `toggle.toggleProvider.directive.ts`. You see our toggle module gets a lot simpler. 

#### toggle.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleComponent } from './toggle.component';

@NgModule({
  declarations: [
    ToggleComponent,
  ],
  imports: [ CommonModule ],
  exports: [
    ToggleComponent,
  ],
})
export class ToggleModule {}
```

We'll need to change this `ToggleDirective` back into a component, `toggle.directive.ts` -> `toggle.component.ts`.

01:03 Let's set up the `TemplateRef`. We'll get a reference to the `TemplateRef` using `@ContentChild`. We'll call it `layoutTemplate`.

01:11 Let's define the `template` for this component. In order to use the `TemplateRef`, we need an element to drop it on, but we don't need a real HTML element. We'll use the `<ng-container>` placeholder.

01:24 To instantiate the TemplateRef, we'll use the `ngTemplateOutlet` structural directive. We'll tell it to use the `layoutTemplate`. We also want to specify a context, which is how we can pass in the state of this toggle component.

#### toggle.component.ts
```ts
import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild, TemplateRef } from '@angular/core';

@Component({
  exportAs: 'toggle',
  selector: 'toggle, [toggle]',
  template: `
  <ng-container *ngTemplateOutlet="layoutTemplate; context: { on }">
  </ng-container>
`,
})
export class ToggleComponent {
  @Input() on: boolean;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  @ContentChild(TemplateRef)

  setOnState(on: boolean) {
    this.on = on;
    this.toggled.emit(this.on);
  }
}
```

01:38 If we go back to `app.component.html`, you see we're passing in the `on` state. The value is false. We're displaying off here. We'd also like to be able to update the state.

01:49 We'll add in a `<switch>` component and then use the `click` event to trigger some function that will update the `toggle` state for us. 

#### app.component.html
```html
<div toggle (toggle)="onToggle($event)">
  <ng-template let-on="on" let-toggle="toggle">
    {{ on ? 'On' : 'Off' }}
    <switch [on]="on" (click)="toggle()"></switch>
  </ng-template>
</div>
```

We need the `TemplateRef` to provide us with that toggle function that will update the state when we call it.

02:01 We need to hook that up in the `toggle.component.ts`. All we need to do is add to the context object a `toggle` property that references a toggle function.

#### toggle.component.ts
```ts
template: `
<ng-container *ngTemplateOutlet="layoutTemplate; context: {
  on, toggle: toggle }"></ng-container>
`,
```

We'll define that toggle function in the component.

02:13 We'll define the `toggle` function using an arrow function to automatically bind the this context to the `toggle` component. We can do `this.setOnState` with not `this.on`.

```ts
toggle = () => {
  this.setOnState(!this.on);
}
```

02:26 We need to update this output event to be `toggled` so the name doesn't conflict with this function here. 

```ts
  @Output() toggled: EventEmitter<boolean> = new EventEmitter();
```

When we click the switch on the website, it changes the state.

02:35 Let's compare the before and after here. There's just one toggle component. We've gotten rid of the child components. The `AppComponent` simply uses the state that's passed in and uses a function to change that state.

02:51 The parent component is both more flexible, because we're dealing with the raw state, and simpler, because we don't need to learn a new set of child components for each new compound component that we use.

03:02 There are a few items to tidy up with this implementation. We should change this `<div>` tag to a `<toggle>` tag, so that people don't expect it to behave like a directive, since it's really a component.

#### app.component.html
```html
<toggle (toggle)="onToggle($event)">
  <ng-template let-on="on" let-toggle="toggle">
    {{ on ? 'On' : 'Off' }}
    <switch [on]="on" (click)="toggle()"></switch>
  </ng-template>
</toggle>
```

03:12 This red squiggle on `(click)="toggle()"` is actually a false negative. It doesn't really hurt anything, but if you really want to get rid of it, you can work around doing something like this.

```html
<toggle (toggle)="onToggle($event)">
  <ng-template let-on="on" let-fns="fns">
    {{ on ? 'On' : 'Off' }}
    <switch [on]="on" (click)="fns.toggle()"></switch>
  </ng-template>
</toggle>
```

03:22 Pass in a functions object that has `fns.toggle` defined on it and then hook it up in your `toggle.component.ts`. Instead of putting toggle here, you rename it to functions.

03:33 Make it an object that has toggle defined on it. 

#### toggle.component.ts
```ts
template: `
<ng-container *ngTemplateOutlet="layoutTemplate; context: {
  on, fns: {toggle: toggle} }"></ng-container>
`,
```

If you go back to the `TemplateRef`, it no longer has a validation error. The component works just as it did before.