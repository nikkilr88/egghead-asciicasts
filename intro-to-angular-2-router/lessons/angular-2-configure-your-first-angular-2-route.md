Taking a basic Hello World! App from Angular 2 with a main app module and `AppComponent`, just with a Hello World! Template, configuring routes looks something like `const routes`, which is just an array of these route configurations.

**app/app.module.ts**
```javascript
const routes = [
  
];
```

We'll say the `path` of nothing, we'll load a component of, and we just need to create a component we want to load. I'll say `@Component`, and this other template of I'm a home component, and that's just a decorator for a class which we'll call home component.

**app/app.module.ts**
```javascript
@Component({
  template: '
I'm a home component
'
})
export class HomeComponent{}

const routes = [
  {path: '', component:HomeComponent}
];
```

Drop `HomeComponent` in here, and then we put these routes inside of our `imports`, so we have a `RouterModule` which can configure the routes for our root, so you drop them in here, and this will configure and set up everything you need to use the router.

**app/app.module.ts**
```javascript
@NgModule({
    imports:[BrowserModule, RouterModule.forRoot(routes)],
    declarations:[AppComponent],
    bootstrap:[AppComponent]
})
```

Now, if I hit save, this isn't going to work or do anything yet, for two reasons. One being, the `AppComponent`, which used to be what we bootstrapped, now this needs to use the `router-outlet`.

**app/app.component.ts**
```javascript
import {Component} from "@angular/core";
@Component({
  selector:'app',
  template '
<router-outlet></router-outlet>
'
})
export class AppComponent{}
```

This `router-outlet` is where the main component, or that `HomeComponent` we're loading is going to be dropped. That template is going to be loaded and dropped in here, and then that component also needs to be declared so that it knows to include it and make sure and use that.

**app/app.module.ts**
```javascript
@NgModule({
    imports:[BrowserModule, RouterModule.forRoot(routes)],
    declarations:[AppComponent, HomeComponent],
    bootstrap:[AppComponent]
})
```

Basically, if the compiler doesn't find a component in the `declarations`, it's going to try and optimize and drop those things out, so you need to define them somehow. We'll go ahead and save now.

You'll see we now have "I'm a home component", which is coming from this `HomeComponent` component, declared in this route object inside of our `routes`, which was passed into the router module `forRoot`, and then dropped into our `AppComponent` into the `router-outlet`.

Let's go ahead and extract this stuff. We'll create a new typescript file inside of a home directory called `home.component.ts` and we'll just grab this `HomeComponent` which we declared, cut and paste.

**home/home.component.ts**
```javascript
@import {Component} from "@angular/core";

@Component({
  template: '
I'm a home component
'
})
export class HomeComponent{}
```

Make sure and import anything that's missing its imports back in our app module. Make sure and import `HomeComponent`. We'll grab these routes, cut them, and we'll drop them into a file called `app.routes.ts.`

**app/app.routes.ts**
```javascript
import {HomeComponent} from ".home/home.component";

const routes = [
  {path: '', component:HomeComponent}
];
```

We'll go ahead and paste that in here. Make sure to import that `HomeComponent`. Then, back in the module, we can even grab this `RouterModule` configuration `forRoot`. Drop that in our `app.routes.ts`, and I'm actually going to export that as the default of our app routes.

**app/app.routes.ts**
```javascript
import {HomeComponent} from ".home/home.component";
import {RouterModule} from "@angular/router";

const routes = [
  {path: '', component:HomeComponent}
];

export default RouterModule.forRoot(routes);
```

Make sure to import the `RouterModule`. Now in my app module, I can get rid of this import, and instead, now I'll `import appRoutes from "./app.routes"`. This `appRoutes` is just going to point to that `default` export, which is a configured `RouterModule`, and I can just drop that inside of my imports.

**app/app.module.ts**
```javascript
@NgModule({
    imports:[BrowserModule, appRoutes],
    declarations:[AppComponent, HomeComponent],
    bootstrap:[AppComponent]
})
```

I'll say `appRoutes`, and I still need to declare my `HomeComponent`, so I'll go ahead and import that.

**app/app.module.ts**
```javascript
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import appRoutes from "./app.routes";
import {HomeComponent} from "./home/home.component";
```

When I hit save, now, everything should work just the same, showing "I'm a home component".

Which is the `appRoutes` with these `routes` configured, pointing to the `HomeComponent`, and the `HomeComponent` is in this home directory with the template of "I'm a home component". Again, load it into the `router-outlet` of my `app.component.ts` file.