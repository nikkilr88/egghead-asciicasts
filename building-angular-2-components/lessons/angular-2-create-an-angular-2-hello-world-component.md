Our systems JS configuration says we need an App folder with a main file inside of it, which it will load and compile as the default file, so let's go ahead and create that.

`app/main.ts`, From here we want to create our component, so let's say `AppComponent`, and each class that's a `Component` will need the `Component` decorator.

**app/main.ts**
``` javascript
import {Component} from "@angular/core";
@Components({
  selector: 'app'
})
export class AppComponent{}
```
The `Component` decorator starts with a `selector`. We'll call this `app`. What this means is that this `app` needs to match in our `index.html`, a tag on this page.

**index.html**
``` html
<!DOCTYPE html>
<html>
  <head...>
  <body>
    <app>Loading...</app>
  </body>
</html>
```
We'll say `<app>`, and that matches with this selector of `app`. So inside of here, this content will be replaced. We'll just say `Loading...`, and then once this is loaded, then that `Loading...` message will go away.

Back in our `main.ts`, let's make a `template` of `<div>` saying `I'm the App Component`. We're not doing anything with this component yet.

**app/main.ts**
``` javascript
import {Component} from "@angular/core";
@Components({
  selector: 'app',
  template: `
<div>I'm the App Component</div>
`
})
export class AppComponent{}
```
We actually need to bootstrap it inside of a module, so go ahead and export a class called `AppModule`, and decorate that with `NgModule`.

**app/main.ts**
``` javascript
@NgModule({

})
export class AppModule{}
```
Inside of my `NgModule`, I need to say what I'm going to declare. The components I'm going to use. These are called `declarations`, and I want to use my `AppComponent`, and I also want to treat that as the `bootstrap` component.

**app/main.ts**
``` javascript
@NgModule({
  imports: [BrowserModule],
  declarations:[AppComponent],
  bootstrap:[AppComponent]
})
```
So we'll `bootstrap:[AppComponent]`. Then there's also a module we'll want to use because we're working inside of the browser, and that's declared inside the `imports`, and that's the `BrowserModule`.

Because you can target multiple platforms other than the browser, you need to explicitly state that you want to target the browser. Then finally to bootstrap, we'll use the `platformBrowserDynamic` method.

We'll invoke it and say `.bootstrapModule()`, and we'll bootstrap the `AppModule`. 

**app/main.ts**
``` javascript
platformBrowserDynamic().bootstrapModule(AppModule);
```
When I hit save here, you'll see loading, and then `I'm the App component`, because our platform is bootstrapping this module. This module is configured to use the browser.

**Browser Output**
```
I'm the App Component
```
It's declaring the `AppComponent`, so it'll look up that `selector` and use it, and because this is the application module, we're saying to bootstrap this right away.

Then, inside of this component, we're saying find the selector called `app`, and drop in this `<div>` inside of there to match the `index.html` loading.