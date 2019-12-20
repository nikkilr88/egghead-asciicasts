Instructor: [00:00] Here, we have a simple component, which is a greeter component, which does nothing more than writing out here, `Hi there!`. We have registered it in our `app.module.ts`, and we display it here in our `app.component.ts`.

[00:12] In fact, you can see here, that the message gets printed out correctly. 

![message printed perfectly](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-transform-an-angular-component-into-a-native-custom-element-message-printed.png)

Now, assume that we want to get this component into our page in a dynamic way, even maybe from the server side, so from some CMS-like system.

[00:27] Let's simulate that by here inserting `<div id="container"`. Now, we will use here some browser API. We grab here our `container`. Then inside that `container`, we simply use the `innerHTML`, and insert here our `do-greet`.

#### app.component.ts
```jsx
  template: `
     <h1> Angular Elements</h1>
     <div> id="container"></div>
  `
})
export class AppComponent {

  doGreet() {
    const container = document.getElementById('container');
    container.innerHTML = <'do-greet></do-greet>';
  }

}   
```

[00:47] Now, we need some kind of action actually to trigger this. Let's quickly insert here a `button`. 

```ts
<div id="container"></div>
<button (click)="doGreet()">greet</button>
```

Since our greeter component is no more referenced directly within the template, we also need to make sure that we add it to our Angular components here in our module.

#### app.module.ts
```ts
@NgModule({
  declarations: [AppComponent, GreeterComponent],
  imports: [BrowserMOdule],
  providers: [],
  entryComponents: [GreeterComponent],
  bootstrap: [AppComponent]  
})
    
```

[01:14] Now, let's click the button. As you can see, nothing happens. Let's quickly verify whether it gets inserted into our DOM here. If you open our container, you can see that the `do-greet` is actually inside our DOM, but Angular doesn't recognize it.

![do-greet inside of dom](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-transform-an-angular-component-into-a-native-custom-element-do-greet-inside-dom.png)

[01:29] That's the whole point of using Angular elements, because those components which we create -- in this case, `do-greet` -- has to be compilable in a format that it can bootstrap automatically without having to need to rely on Angular itself.

[01:42] The first step to enable Angular elements in our project is to install the Angular elements. We can use the new Angular CLI command, which is `ng add @angular/elements`. This will then not only install the Angular elements but also trigger an Angular schematic, which then installs and configures our project for Angular elements.

[02:04] If you open up now our `package.json`, what we should see is here the installation of `@angular/elements`. 

#### angular.json
```json
"scripts": [
  {
    "input": 
      "node_modules/document-register-element/build/document-register-element.js"
  }
]
```

Moreover, it has also added here the `document-register-element`, which is a library, a polyfill which we need to register our Angular element within the browser API.

[02:20] Finally, if we go to `angular.json`, which is the configuration for how our project is being built, we can see that here a script tag has been inserted, which is exactly that `document-register-element` polyfill, that gets compiled into our Angular element in this case.
 
[02:35] Once we have it installed, we can import here the `createCustomElement` from `@angular/elements`. 

#### app.module.ts
```ts
import { GreeterComponent } from './greeter.component';
import { createCustomElement } from '@angular/elements';
```

Then directly here in our `AppModule` in the `constructor`, we can then use it. The `AppModule` is instantiated once. Therefore, it's a perfect place to instantiate here our custom element.

```ts
export class AppModule {

  constructor() {

  }

}
```

[02:57] First of all here, let's create our element, `const el`, with that `createCustomElement` method. That takes, first of all, the component, which in this case, is our `GreeterComponent`. Then it takes some properties, in this case, we have to pass it in our injector.

```ts
constructor() {
  const el = CreateCustomElement(GreeterComponent, {};)
}
```

[03:14] We can get that `Injector` directly here in the `constructor`. We have to `import` that from Angular core. Then we can pass it along directly inside our `constructor`. 

```ts
import { injector } from '@angular/core';

...

constructor(private injector: Injector) {
  const el = CreateCustomElement(GreeterComponent, { injector: injector}); 
```

Once we have our element here, we have to register it with the native browser API, which is some register which is called `customElements`.

```ts
Export class AppModule {
  constructor(private injector: Injector) {
  const el = CreateCustomElement(GreeterComponent, { injector: injector});
  customElements
}
```

[03:32] We use the `define` method. We give it a name of our custom element. The tag, which is `do-greet`, and then a constructor function, which is in this case, our `el` directly. 

```ts
const el = CreateCustomElement(GreeterComponent, { injector: injector});
customElements.define('do-greet', el);
```

Finally, let's restart our project here.

[03:48] Now, let's refresh our page. If we now click that button, you can see how it gets correctly inserted into our DOM. Here, in the container, nothing changed. You can now see that the ngVersion is being attached here.

![button inserted into dom](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-transform-an-angular-component-into-a-native-custom-element-button-inserted-into-dom.png)

[04:01] This is because now `do-greet` is a separate independent component, which can bootstrap by itself. With that said, that greeter component could directly arrive from some server-side CMS system within some part of HTML, which gets directly inserted without even our Angular app to touch it, which we have here in this simple example, simulated with these inner HTML.