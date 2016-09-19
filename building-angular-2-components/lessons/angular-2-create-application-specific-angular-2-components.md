A feature component usually lives inside of its own directory with its own module. I'll create a directory called `home`, and say `home.component.ts`. Inside of this file, we'll create a `@Component`. This will have a `selector: 'home'`, and a `template` of a `<div>` saying, `I'm a home component`.

**home/home.component.ts**
``` javascript
import {Component} from "@angular/core";
@Component({
  selector: 'home',
  template: `
  <div>I'm a Home component</div>
`
})
export class HomeComponent{}
```
Just make sure to decorate this as a `class`. Then our feature component is basically done. It's just some configuration inside of this `home` directory, where we create a `home.module.ts`. Inside of here, we'll say `NgModule`. Our `declarations`, we need to declare the `HomeComponent`. As well this time, we also need to `export` the `HomeComponent`. Now we export the class `HomeModule`. 

**home/home.module.ts**
``` javascript
import {NgModule} from "@angular/core";
@NgModule({
  declarations:[HomeComponent],
  exports:[HomeComponent]
})
export class HomeModule{}
```
The reason you're declaring this twice inside of `exports` and inside of `declarations` is because you could be importing this `HomeComponent` from somewhere else.

You either *declare* it or *import* it inside of the `imports` where you import other modules. Because this is living inside of this module, we just declare it, and then re-export it. Now inside of our `AppModule`, we can import the `HomeModule`.

**app/app.module.ts**
``` javascript
import ...
@NgModule({
  imports:[BrowserModule, HomeModule],
  declarations:[AppComponent],
  bootstrap:[AppComponent]
})
export class AppModule
```
Inside of our `AppComponent`, we now have access to the `HomeComponent`. This `<home>` matches the `home` component `selector`. 

**app/app.component.ts**
``` javascript
import {Component} from "@angular/core";
@Component({
  selector:'app',
  template: `
  <home></home>
`
})
export class AppComponent{}
```
You can see between these two components, `home` and `AppComponent`, in app we're just using that `home` selector, in `home`, now we've created that `selector`, and created a `template` for it.

I'll hit save. You'll now see `I'm a home component`. 

**Browser Output**
```
I'm a Home component
```
Again, the full div structure looks like this, where you have your `main`, which is bootstrapping the `NgModule`. The module is importing both the `BrowserModule` and the `HomeModule`.

**app/app.module.ts**
``` javascript
import ...
@NgModule({
  imports:[BrowserModule, HomeModule],
  declarations:[AppComponent],
  bootstrap:[AppComponent]
})
export class AppModule
```
In the `AppComponent`, you're referencing this `home` selector, which is available because in `AppModule`, you're importing the `HomeModule`. This `home` selector is available because in `AppModule`, you are importing `HomeModule`.

Everything in `HomeModule` is available to this, but the only thing we're exporting for now is just the `HomeComponent`. 

**home/home.module.ts**
``` javascript
import {NgModule} from "@angular/core";
@NgModule({
  declarations:[HomeComponent],
  exports:[HomeComponent]
})
export class HomeModule{}
```
`HomeComponent` has a selector of `home`, and a template of, `I am a home component`, which lands here as, `I'm a home component`.