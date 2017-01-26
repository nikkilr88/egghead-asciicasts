We can also easily build a directive, which checks if a service is online. It will disable this button if the service is offline. I'm going to call it `online`. It's not going to have any input, I'm not going to worry about putting the square brackets around it. I'll leave it like that. I'll leave it on this first button, for now.
#### app.component.ts
``` javascript
@Component({
  selector: 'app',
  template: `
<button online [track]="'One Button'">One</button>
<button  [track]="'Two Button'">Two</button>
<button  [track]="'Three Button'">Three</button>
`
})
export class AppComponent{
  //only for visuals
  constructor(private tracking: TrackingService){}
}
```
Let's call this `@Directive` -- we'll have the selector -- and call it online, for the attribute of `[online]`, and then, export the `class OnlineDirective`. 

``` javascript
@Directive({
  selector: '[online]'
})
export class OnlineDirective
```

Then module, add that to the `declarations`. 
#### app.module.ts
``` javascript
const imports = [BrowserModule]
const bootstrap = [AppComponent]
const declarations = [
  AppComponent,
  TrackDirective,
  OnlineDirective
]
```
Then, we'll also need a service, an `@Injectable`, an `export class OnlineService`.

This will have a property called `online`, which will start as `true`, and then in our constructor, we'll have an interval running, saying that, Every one second, that `this.online` toggles randomly, I'll just say, "random." It's greater than point 5. This is either `true` or `false`, randomly. Then, we'll add this `OnlineService` to our providers.
#### app.component.ts
``` javascript
@Injectable()
export class OnlineService{
  online = trueconstructor(){
    setInterval(() =>{
      this.online = Math.random() > .5
    }, 1000)
  }
}
```
From here, all we have to do is take that `OnlineService`, inject it into our directive so: `constructor(private online: OnlineService){}` Then, we simply set up a `@HostBinding` to `disabled`, which is a property on each of these elements.

We'll say, `get disabled`. `return this.online`, which is a service name, and the property is also `online`. This property is this one on the `OnlineService`.

``` javascript
export class OnlineDirective{
  @HostBinding('disabled') get disabled(){
    return this.online.online
  }

  constructor(private online:OnlineService){}
}
```
Let's save now. You'll see this button one will randomly toggle between disabled and enabled. When it turns grey, it's disabled. We can make that even more apparent, if we do something like add a style. We'll call this `offline`.
#### styles.css
``` css
.offline{
  color: red
}
```
The style will say that the `color: red`, and then in my `@HostBinding`, I can set up another one, which is bound to `class.offline`. The `class` property on the element, and then adding this and removing this class, and I'll say, `get offline`, and then, return the exact same thing, what I had saved here.

``` javascript
export class OnlineDirective{
  @HostBinding('disabled') get disabled(){
    return this.online.online
  }

  @HostBinding('class.offline') get disabled(){
    return this.online.online
  }

  constructor(private online:OnlineService){}
}
```

This now toggles between red and black. When it's black it's enabled. When it's red it's disabled. Black and red. That's all linked up to this service here, which toggles on and off. I can go ahead and add this online to my other buttons. "Online." "Online."

![offline buttons](../images/angular-2-combine-hostbinding-with-services-in-angular-2-directives-offline-buttons.png)

Now, this is going to behave on all of these three buttons. Red and black. Red -- nothing. Black, clicking "nothing." This directive is controlling the `disabled` property, and adding and removing this `offline` class based on this service.