**app/main.ts**
``` javascript
import {platformBrowserDynamic} from "@angular/platform-browser";
@Component({
    selector:'app',
    template: `
<div>I'm the App Component</div>
`
})
export class AppComponent{}

@NgModule({
    imports:[BrowserModule],
    declarations:[AppComponent],
    bootstrap:[AppComponent]
})
export class AppModule{}

platformBrowserDynamic().bootstrapModule(AppModule);
```
Now I want to organize each of these into their own files, so I'll go ahead and cut the `component` out, then create a new file in my folder called `app.component.ts`, open that up, and paste in, and then just make sure to import component, hop back over to my main file.

**app/app.component.ts**
``` javascript
import {Component} from "@angular/core";
@Component({
    selector:'app',
    template: `
<div>I'm the App Component</div>
`
})
```
We'll cut out the `NgModule`, cut that, and create a file for that. We'll call this `app.module.ts`. Open it up, and paste. Make sure to import all the necessary imports.

**app/app.module.ts**
``` javascript
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
@NgModule({
    imports:[BrowserModule],
    declarations:[AppComponent],
    bootstrap:[AppComponent]
})
export class AppModule{}
```
Then, back in my main, I can get rid of the imports I don't need and just make sure to import the `AppModule`. If I save, everything's working as it was, we have a main file which simply declares the platform we're using, and the main module we want to bootstrap.

**app/main.ts**
``` javascript
import {platformBrowserDynamic} from "@angular/platform-browser";
import {AppModule} from"./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);
```
We have a `module.ts` file, which is the configuration of how we're starting up, and the different modules we want to use inside our application, and which component to bootstrap, and then we have that `main` component, which we called `AppComponent`, which was bootstrapped by our module.

You can see them sitting in this app folder next to each other, `app.component`, `app.module` and `main`.