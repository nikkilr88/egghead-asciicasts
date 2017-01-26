To create our first directive, I'll go ahead and use the directive decorator, making sure to import it, and then, set up the `selector` for our Directive.

The selector I'm going to choose is `h1` so that this matches up with this. Then, this decorator is going to decorate this class. Well, let's call it `FirstDirective`. 

#### app.component.ts
``` javascript
import { Component, Directive } from '@angular/core'

@Directive({
  selector: 'h1'
})
export class FirstDirective

@Component({
  selector: 'app',
  template: `
<h1>Hello, Angular</h1>
  `
})
export class AppComponent{}
```

Then make sure to add that `FirstDirective` to your list of declarations.
#### app.module.ts
``` javascript
const imports = [BrowserModule]
const boostrap = [AppComponent]
const declarations = [
  AppComponent,
  FirstDirective
]
@NgModule({
  imports,
  declarations,
  boostrap
})
export class AppModule
```

I just want to hop back over here. If I save, it's not really going to do anything. That's because we haven't added any sort of behavior or anything to this directive.

The most divisible thing to look at is if I do, like, a host-binding picture and import that. The `@HostBinding` to `innerText` is, `I'm a directive`.
#### app.component.ts
``` javascript
export class FirstDirective {
  @HostBinding() innerText = `I'm a directive!`
}
```
Now, I want to hit Save. You'll see that it's completely changed the `innerText` of its host. `h1` is the host of this directive, because that's what we've looked up.

This is looking up any property on this element and changing it based on what we said it to. That's much more common to have a directive as an attribute, you use the attribute CSS syntax to select it. Let's call this, "Look up first," as an attribute on any element.

``` javascript
@Directive({
  selector: '[first]'
})
export class FirstDirective

@Component({
  selector: 'app',
  template: `
<h1 first>Hello, Angular</h1>
<h2>No first here</h2>
<h3 first>This will be gone</h3>
  `
})
```

If I say, `First`, it'll create an `h2`. I'll leave off, `No first here`. Then, what you do in `h3` with the first on it. I'll say, `This will be gone`. I'll hit Save. You'll see that this `first` wrote, `I'm a directive`. Skipped this one, and added it to this one. This `first` is finding `first` and `first`. It doesn't find it here.