Instead of making a new component every time we click add component, let's instead move this third one around within the list of our current components. I'll just delete everything inside of `onClick`. I'm going to say `Move Component`, just so that's explicit there.

**home/home.component.ts**
``` javascript
@Component({
  selector: 'home',
  template: `
<button (click)="onClick()">Move Component</button>
<div #container></div>
})
export class HomeComonent{
  @ViewChild( ... ) container;

  constructor( ... ){}

  ngAfterContentInit(){ ... }

  onClick(){

  }
}
```
Then I'll need a reference to `widgetRef`, so I'll say this, this, and make sure we have declared it up here. Now we'll have access to this `widgetRef` once it's created, and `onClick`, you can get the container, and say move and then `this.widgetRef`.

**home.component.ts**
``` javascript
export class HomeComonent{
  @ViewChild( ... ) container;

  widgetRef;

  constructor( ... ){}

  ngAfterContentInit(){
    const widgetFactory = this.resolver
      .resolveComponentFactory(WidgetThree);
    
    this.container.createComponent(widgetFactory);
    this.container.createComponent(widgetFactory);
    this.container.createComponent(widgetFactory);
    ...
    this.widgetRef = this.container
      .createComponent(widgetFactory, 2);
    this.widgetRef.instance.message = "I'm third";
  }

  onClick(){
    this.container.move(this.widgetRef.hostView, 3);
  }
}
```
The important part to remember here is you're not actually moving the widget reference, you're moving the view reference that lives inside of the created template. This is something called `hostView` on the widget reference, like there's an `instance` of the component on the widget reference, and there's the `hostView`, the rendered template, of the widget reference.

Let's move that to the third position. I'll hit save, or the fourth position, since it's zero-based. Hit save, and then when this renders, I'll click, and you'll see this one moved from here down to here. To have a bit more fun with this, I'll say `const randomIndex`.

This will just be `Math.random()` times the `this.container.length`. Just make sure to floor that, `Math.floor()`, so it'll round it down. We'll move it to a `randomIndex` every time I click. 

**home/home.component.ts**
``` javascript
onClick(){
  const randomIndex = Math.floor(Math.random() * this.container.length)
    this.container.move(this.widgetRef.hostView, randomIndex);
  }
```
This way, when I click on this button, this will start jumping around in the list to random positions.

You can see it moving, and moving, and moving anywhere in between zero, one, two, three, four, five, six, seven, eight. Clicking, clicking, clicking, and moving it around. Again, there is an API on the `container` itself, the view container ref that we have from here, that allows you to move these elements.

Finally, we can either insert a new element, which would work the same way, or an obvious one you'll want to note is `detach`. You detach by index. I'll just say detach the one at `2`. I'll hit save, and you'll say, "There's my component, my rendered element, and it's gone."