With our `SimpleService` in place, I can now render out things off of that `SimpleService`. We'll just render out `simpleService.message`, and you'll see that message we declared on it, `Hello, from the Simple Service`, if I navigate to that, that's just this message here.

**Browser Output**
```
I'm a Home component
Hello from the Simple Service!
```
This is pretty typical of a smart container, is being able to inject services that are declared within your application, things that are specific to your application, and creating these couplings between modules and your views.

For presentation components -- I'll bring back in `<widget-one>` -- instead of injecting things through the constructor, we're actually going to pass it in through an input. I'll say `message` is equal to `simpleService.message`. 

**home/home.component.ts**
``` javascript
import {Component} from "@angular/core";
import {SimpleService} from "../services/services.module";
@Component({
  selector: 'home',
  template:`
<div>I'm a Home component</div>
<div>{{simpleService.message}}</div>

<widget-one [message]="simpleService.message"></widget-one>
})
export class HomeComponent{
  constructor(private simpleService:SimpleService){}
}
```
Now if I navigate to my `widget-one`, and I'll set up an `@Input` here, call this `message`, and then use the message in my template. Let's just say `One's message:`, then an `<h3>` of `{{message}}`. 

**widgets/widget-one.component.ts**
``` javascript
import {Component, Input} from "@angular/core";
@Component({
  selector: 'widget-one',
  template: `
<h2>One's message:</h2>
<h3>{{message}}</h3>
})
export class WidgetOne{
  @Input() message;
}
```
If you look in my `HomeComponent`, you'll see the `simpleService.message` here, as well as being passed into my widget here. 

**home/home.component.ts**
``` javascript
@Component({
  selector: 'home',
  template:`
<div>I'm a Home component</div>
<div>{{simpleService.message}}</div>

<widget-one [message]="simpleService.message"></widget-one>
})
```
I'll hit save, and you'll see the message from my service rendered out in my template, and it's also rendered out in this component -- this `widget-one` that we created.

**Browser Output**
``` 
I'm a Home component
Hello from the Simple Service!

One's message:
Hello from the Simple Service!
```
The main difference here is that, in `widget-one`, there is no reference to that `services.module`. In fact, inside of this entire `WidgetModule`, there's no reference to that `services.module`. It's completely decoupled from our application. This makes it a pure...basically, what's called a presentation component.

Whereas, in my `HomeComponent`, which is coupled to my application, because it knows about this `services.module` -- granted it knows as little about it as possible, but it still knows about it. With my `widget-one`, I could actually pass in a string, say `Hello, world!` I'll hit save here.

Now we have one `widget-one` and another `widget-one`, using different data, completely. 

**home/home.components.ts**
``` javascript
@Component({
  selector: 'home',
  template:`
<div>I'm a Home component</div>
<div>{{simpleService.message}}</div>

<widget-one [message]="simpleService.message"></widget-one>
<widget-one [message]="'Hello world'"></widget-one>
})
```
Again, that's because it's completely decoupled. It's not working from the constructor. It's simply working from the idea of having inputs, where you pass your data in, versus passing your services and data in through a constructor.
**Browser Output**
``` 
I'm a Home component
Hello from the Simple Service!

One's message:
Hello from the Simple Service!
One's message:
Hello world
```
Presentation components use inputs for passing data in, and these smart containers use the constructor for dependency injection to pass the services in.