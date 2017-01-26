`<template>` elements are major building blocks of Angular 2. I'm talking about this `template`, where it's the actual element. Not this keyword `template` that's on the `@Component` decorator.
#### app.component.ts
``` javascript
@Component({
  selector: 'basic',
  template: `
<template>
This is content inside a template
</template>
`
})
export class BasicComponent{}

@Component({
  selector: 'app',
  template: `
<basic></basic>
`
})
export class AppComponent{}
```
This template, if I put anything inside of it, and say, This is content inside a template, and I hit save. You'll see this basic is used in here. You'd expect this to show up in any other element, except in a template element, browsers don't render template elements.

You can actually grab a ref to this. I'll say `foo`. Then, programmatically, in the basic component we can look up that template using `@ViewChild` and say, "I want `foo`, and I know that's a `template`."

``` javascript
@Component({
  selector: 'basic',
  template: `
<template #foo>
This is content inside a template
</template>
`
})
export class BasicComponent{
  @ViewChild('foo') template
}
```
This is essentially querying for this, and getting this referenced to the template. As long as we have from there, as long as we have the `ViewContainer` ref to the element itself, we can go ahead and just use the lifecycle hook to just use the `view` to create an embedded `view` of the template.

``` javascript
export class BasicComponent{
  @ViewChild('foo') template

  constructor(private view:ViewContainerRef){}

  ngAfterContentInit() {
    this.view.createEmbeddedView(this.template)
    this.view.createEmbeddedView(this.template)
    this.view.createEmbeddedView(this.template)
  }
}
```

You'll see, we've now rendered out this `template` inside of my app basic. This is content inside a template. We can actually do that multiple times so that it renders out as many times as we need it.

This approach, though, does require you to manually create a template, and have a component with that template in it, we can look it up, and use that to create the embedded view.