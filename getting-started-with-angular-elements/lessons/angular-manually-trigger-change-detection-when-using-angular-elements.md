Instructor: [00:00] What you might have noticed is that when we embedded our Angular element inside our React application, the animation which is typical for our form stopped to work. They only work once we click a button. In between, when we jump around, they don't seem to work correctly.

[00:17] If we look at the static example, that one seems to work just as we expect. The reason here is that the Web component tag in our `index.html` is just before our script. If we move that down here, 

#### index.html
```html
<script>
  ...
</script> 

<feedback-form name="Juri"></feedback-form>
```

the change detection cannot hook on properly again, and we have just the same problem.

#### index.html
```html
<feedback-form name="Juri"></feedback-form>


<script>
  ...
</script> 
```

[00:33] The reason here for this event and animation not to work correctly is that the Angular material forms rely on these animations, which again are dependent on the change detection which happens within Angular. The change detection's typically are triggered by a library called `Zones`, which, at this stage of Angular elements, is not that refined at the very maximum, especially when you use Angular elements outside the Angular application.

[01:01] There is a workaround which we can apply right now. These things will change in the future versions of Angular elements. Right now, what we can do is to inject in our `app.module.ts` a so-called `appRef`. That application ref gets imported here from Angular Core.

```ts
import { Injector, NgModule, ApplicationRef } from '@angular/cor';

...

export class AppModule {
  constructor(injector: Injector, appRef: ApplicationRef){
...
    const el = createCustomElement(FeedbackFormComponent, {
```

[01:18] We can trigger change detection manually. What we can do is here to use RxJS `interval` and say every 50 milliseconds what you should do is re-subscribe. Then we trigger the change detection manually. We do `appRef.tick`, which will then refresh the application.

```ts
customElements.define('feedback-form', el);

interval(50).subscribe(() => appRef.tick());
```

[01:38] Note, if you need higher-frequency updates, you can even lower that one. You should take care that it is not too much of a performance drain for your Web component.

[01:49] Also, if you don't run into this problem of animations and you can fully control the change detection cycle, you can always import the change detector ref manually, and trigger change detection. However, in this case, we don't have control over how our Angular material forms work. Therefore, we have to apply such workarounds.

[02:07] Good. Let's recompile our Web component. 

#### Terminal
```
$ ./buildWC.sh
```

Once it's compiled, let's copy it over again to our React application. 

```
$ cp -v demo/ngelements.js ../my-react-app/public/assets/demo/ngelements.js -> ../my-react-app/public/assets/ngelements.js
```

Let's refresh. Now you can see how the animations work correctly, the input fields getting bigger when focused and smaller when out of focus because behind-the-scenes change detection is executed on our Web component.
