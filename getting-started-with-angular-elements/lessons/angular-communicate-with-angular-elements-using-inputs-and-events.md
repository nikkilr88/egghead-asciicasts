Instructor: [00:00] When you compile an Angular component, such as a `greeter` component, into a web component, in a real-world scenario, you want to input some data and output some data from it. Let's quickly take a look at how that would work.

[00:12] From an Angular perspective, inputs are managed by that `@Input` decorator. Let's say, for instance, we get here an `@Input() name;`. We need to import that. We could say `hi` and `name` that gets passed to our component here. So far, that works perfectly.

#### greeter.component.ts
```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'do-greet',
  template: `
    <div>
      Hi, {{ name }}!
    </div> 
  `,
  styles: []
})
export class GreeterComponent implements OnInit {
  @input() name;

  constructor() {}

  ngOnInit() {}
}
```

[00:28] Now, let's do the build compilation of our web component again. 

#### Terminal
```
$ ./buildWC.sh
```

You can already see that it reflects your change. We could go over to our index HTML page and say something like that, `name="Juri"`. 

#### index.html
```html
<do-greet name="Juri"></do-greet>
<!-- <script src="./zone.js"></script> -->
```

When I save this, you can see how it perfectly works.

![Hi Juri](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-communicate-with-angular-elements-using-inputs-and-events-hi-juri.png)

[00:47] We can pass it in via that name property here. Similarly, we can do this for the events. In `greeter.component.ts` in the `class`, this is a normal `@Output` mapping. Let's call it `greet`, which is a new `EventEmitter`. 

#### Greeter.component.ts
```ts
export class GreeterComponent implements OnInit {
  @Input() name;
  @Output() greet = new EventEmitter();  
```

You need to import that event emitter here from Angular core.

```ts
import { Component, OnInit, Output, EvenEmitter } from '@angular/core';
```

[01:07] To be able to trigger it, let's here add a `button` with the `click` event, `doGreet`. 

```ts
  Hi, {{ name }}!
</div>
<button (click)="doGreet"()">Greet</button> 
```

We also need to implement that accordingly in our component, where we simply then `emit` on our event emitter. We say here `emit` `hi`, `this.name`.

```ts
constructor() {}

doGreet() {
  this.greet.emit(`Hi, ${this.name}`);  
}
```

[01:28] Great. We can now recompile our component, always using our script, `./buildWC.sh`. Once that compilation finishes, we can again go to our `index.html` file, and now react to that event.

[01:42] Now, events are handled as you would typically do with DOM Elements. First of all, we need to grab an instance here of our DOM element. We use here the `querySelector` API of the browser, and we get here our `do-greet`.

#### index.html
```html
<script>
  const el = document.querySelector('do-greet');
</script>  
```

[01:55] Now to add element, we say `addEventListener`. We need to listen to our `'greet'` event, which is a custom event we just defined. We will here get the event object. First of all, let's log that out to the console to see what it looks like.

```ts
const el = document.querySelector('do-greet');
el.addEventListner('greet', (ev) => {
  console.log(ev);
});  
```

[02:11] Let's go here to the console and click the 'greet' button. You can see here, we get an instance of such a custom event. 

![ev logged to console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-communicate-with-angular-elements-using-inputs-and-events-ev-logged-to-console.png)

If you want to get the detail which we pass, it's directly inside that detail property. Here, we can see `"Hi Yuri"`, which was the object which was triggered from the inside.

![hi-yuri-in-devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-communicate-with-angular-elements-using-inputs-and-events-hi-yuri-in-devtools.png)

[02:27] Here, we could say something like `alert(eve.detail)`. 

```ts
el.addEventListner('greet', (ev) => {
  alert(ev.detail);
```

If you click, you can see how the message pops up directly. In this way, you can see how we can define inputs and outputs via those events.

[02:41] Obviously, we could also specify the input directly here over at programmatic API. You see that will work as well.

```ts
const el = document.querySelector('do-greet');
el.name = 'Joe';
...
el.addEventListner('greet', (ev) => {
  alert(ev.detail);
```
