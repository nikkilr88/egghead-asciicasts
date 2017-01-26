You can listen to events on the element by adding `@HostListeners`, then typing in the name of the event as a string, so `click`. This is just decorating a function. Let's all say `onClick`, so whenever we click, let's just `console.log('click')`.
#### app.component.ts 
``` javascript
@Directive({
  selector: '[first]'
})
export class FirstDirective{
  @Input() first
  @HostBinding() get innerText(){
    return this.first
  }

  @HostListeners('click') onClick(){
    console.log('click')
  }
}
```
From here, anytime I click on one of these elements, click, click, click. You'll see that click was logged out each time. Again, that's because this `first` selector is on each of these elements, `first`, `first`, `first` and its `HostListener` is saying, "Hey. Listen for clicks on these elements."

Now if you'd like to get access to the actual event, after the event name, you say comma and then an array of strings. `$event` is what we want then the `$event` comes in here. Let's going to move this down to the next line for formatting sake.

``` javascript
@HostListeners('click', ['$event']) onClick($event){
    console.log('click')
  }
```

From here I can log out the event, it save here. Now when I want to click on each of this, I'll get the `MouseEvent`. Click, click, click in all the `MouseEvent`. Often you'll combine these `HostListeners` with `HostBindings`.

For example, if in here I set `this.first` to `clicked` and I hit save, because `innerText` is bound to this first, when I click on this, `this.first` changes to `clicked`. Now the inner text is `clicked`. I'll click on this one, that turns into `clicked` and that turns into `clicked`.

``` javascript
@HostListeners('click', ['$event']) 
onClick($event){
  this.first = 'clicked'
}
```

That's because `first` is here. The starting value is whatever we pass in to the attribute or the attribute directive and it's bound to that now so that whenever we change that, when that updates, whatever we're bound to will change as well.