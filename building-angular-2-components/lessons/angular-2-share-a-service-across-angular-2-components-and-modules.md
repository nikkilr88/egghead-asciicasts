To illustrate the difference between **smart** components and **presentation** components, first we need to make a **service**, so let's go ahead and create a `services` directory `/simple.service.ts`. This service is injectable.

We export class `SimpleService`, and this will have a message saying `Hello from the Simple Service`. 

**services/simple.service.ts**
``` javascript
import {Injectable} from "@angular/core";
@Injectable()
export class SimpleService{
  message = `Hello from the Simple Service!`
}
```
To share this service across modules, we create a `ServicesModule`. We'll just call it `services.module.ts`, and this is `NgModule` as well.

Since we're going to share these services across our entire application, we don't really need to declare anything in here. We're going to export a class called `ServicesModule`.

**services/ServiceModule.ts**
``` javascript
import {NgModule} from "@angular/core";
@NgModule({})
export class ServicesModule{}
```
Have a static method on it called `forRoot()`, which returns an object, and on that object, we'll say the `NgModule` is going to be `ServicesModule`, and the `providers` are going to be `SimpleService`.

**services/ServiceModule.ts**
``` javascript
import {NgModule} from "@angular/core";
@NgModule({})
export class ServicesModule{
  static forRoot(){
    return {
      ngModule: ServicesModule,
      providers: [SimpleService]
    }
  }
}
```
This is going to help it so that the same instance of simple services used throughout the application, so that in my `AppModule`, when I import my `ServicesModule`, I'm actually going to say `forRoot` and invoke that static method off of it.

**app/app.module.ts**
``` javascript
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {HomeModule} from "./home/home.module";
import {ServicesModule} from "./services/services.module";
@NgModule({
    imports:[BrowserModule, HomeModule, ServicesModule.forRoot()],
    declarations:[AppComponent],
    bootstrap:[AppComponent]
})
export class AppModule{}
```
That way, instead of giving me the configuration that usually comes from here, I'm actually giving this object, which has an `ngModule` pointing to itself, and then listing the `providers` in here so it gives us that same `SimpleService` throughout the application.

Now because that's configured an `AppModule`, that service is actually available inside of all of our components.

So if I go into `HomeComponent`, I can use the dependency injection syntax to inject, I'll say `private simpleService`, and `SimpleService`, and you'll see that the export here automatically, the one the WebStorm picked up was from `simple.service`.

**home/home.component.ts**
``` javascript
import {Component} from "@angular/core";
import {SimpleService} from "../services/simple.service"
@Component({ ... })
Export class HomeComponent{
  constructor(private simpleService:SimpleService){}
}
```
A good practice here is actually in your `ServiceModule` to export all of the things that you import and want to use inside of this module. 

**services/services.module.ts**
``` javascript
import {NgModule} from "@angular/core";
import {SimpleService} from "./simple.service"

@NgModule({})
export class ServicesModule{ ... }

export {
  SimpleService
}
```
That way, in your components, I can import this from the `ServicesModule`.

I'll still get the same thing, but inside of the `ServicesModule`, it's going to allow me to refactor and change things here, as long as I still export something called `SimpleService`.

I can change as much as I want underneath the hood of this entire module. So this module is kind of a wrapper around this directory, and then re-export everything from this module.