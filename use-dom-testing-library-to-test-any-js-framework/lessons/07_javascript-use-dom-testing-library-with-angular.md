Kent C Dodds: [00:00] For our Angular test, we're going to need `import {TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing'`. Let's go ahead and create our function for rendering a `component` of `any` type here.

[00:13] We'll use `TestBed.configureTestingModule`. We'll pass in `declaration: [component]`, and `providers` is this array with the object of `provide: ComponentFixtureAutoDetect`, and `useValue: true`. Then we'll `compileComponents`.

### angular.test.ts
```typescript
function render(component: any ) {
  TestBed.configureTestingModule({
    declarations: [component],
    providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
  }).compileComponents()

}
```

[00:32] Then we need to get a DOM node to query. Let's make our `fixture` with `TestBed.createComponent`. We'll pass our `component`, and then we'll get our `container` from `fixture.debugElement.nativeElement`. Then we can return `getQueriesForElement(container)`, and let's go ahead and run our test.

### angular.test.ts
```typescript
function render(component: any ) {
  TestBed.configureTestingModule({
    declarations: [component],
    providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
  }).compileComponents()

  const fixture = TestBed.createComponent(component)
  const container = fixture.debugElement.nativeElement

  return getQueriesForElement(container)
}
```

[00:53] Cool. That gets our test to pass. In review, for testing an Angular component with `dom-testing-library`, you can create this `render` function that will configure the testing module to have the component as the declaration and `ComponentFixtureAutoDetect` with `useValue: true` as one of the providers.

[01:09] Then we compile those components. We create a `fixture`. We get our `container` from the `nativeElement`, from the `debugElement`, from that `fixture`. Then we `getQueriesForElement`. Just for convenience, we'll go ahead and provide the `container`, and we'll spread across the `getQueriesForElement`. That allows us to write our typical DOM testing library test.

### angular.test.ts
```typescript
function render(component: any ) {
  TestBed.configureTestingModule({
    declarations: [component],
    providers: [{provide: ComponentFixtureAutoDetect, useValue: true}]
  }).compileComponents()

  const fixture = TestBed.createComponent(component)
  const container = fixture.debugElement.nativeElement

  return {
    container,
    ...getQueriesForElement(container)
  }
}
```
