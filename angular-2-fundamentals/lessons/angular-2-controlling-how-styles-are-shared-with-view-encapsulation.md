When you add a style sheet to your project -- I'll just add `tachyons` in here and hit save -- you'll notice that those styles will apply to everything in your project. That's the expected behavior. I can actually go into my components and for example on my `button` I could say I want to use the classes from this library of `white` text on a background of `bg-black` with the `code` font.

**simple-form.component.ts**
``` javascript
<button
  class="white bg-black code"
  (click)="update.emit({text:message})">Click me!</button>
```
When I hit save, you'll see that it grabs all of those. It made this white. It made the background black. It's using a different font now. It's using all of that from that library that I passed in.

![Button styles](../images/angular-2-controlling-how-styles-are-shared-with-view-encapsulation-button-styles-overwritten.png)

While my `styles` that I defined in here have not leaked out to my project, `styles` that I pass in globally are available inside of my components. You can stop that behavior by defining `encapsulation` inside your project. If I say `encapsulation: ViewEncapsulation.Native`. Make sure to import that. 

**simple-form.component.ts**
``` javascript
@Component({
  encapsulation: ViewEncapsulation.Native,
  selector: 'app-simple-form',
  template: ` ... `,
  styles: [ ... ]
})
```
Then when I hit save, I'm going to lose those styles. You'll see that my components are back to the way they were, and it's ignoring any global styles that we defined.

![Back to Native Style](../images/angular-2-controlling-how-styles-are-shared-with-view-encapsulation-native.png)

This `Native` setting means no styles in, no styles out. The default is `Emulated` where it allows those global styles in, but no styles go out. 

**simple-form.component.ts**
``` javascript
@Component({
  encapsulation: ViewEncapsulation.Emulated,  // .None
  selector: 'app-simple-form',
  template: ` ... `,
  styles: [ ... ]
})
```
There's also `None` where styles defined inside your component would be also defined globally, but I don't see many use cases for that. I almost always leave it on the default. Define some styles inline where I need them. Otherwise just use the global styles from whatever library I'm using.