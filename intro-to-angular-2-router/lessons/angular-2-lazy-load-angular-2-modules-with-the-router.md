At this point, you probably think it's weird that my `declarations` inside of my `app.module.ts`, I need to declare the context and the `HomeComponent`. And then in my routes, I need to declare them as well. That seems like a lot of boilerplate and hard-coded dependencies between the router and components.

What you can actually do about that is, in...I'll take my "home" Directory. I'm going to create a Home Module. These modules are going to allow me to **lazy load** these packages or modules, or bundles of components and files, so we'll put another `NgModule` here.

**home/home.module.ts**
```javascript
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

@NgModule({

})
```

This one will have `imports:[CommonModule],`. `CommonModule` has `ng-if` and all the common template things you'll use. It will have a `declarations: [HomeComponent]`. You remember how we just did that before in our app.module. Then we can `export default class HomeModule`.

**home/home.module.ts**
```javascript
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

@NgModule({
  imports:[CommonModule],
  declarations: [HomeModule]
})
export default class HomeModule{}
```

What we do in here is in our `imports` we use that same `RouterModule`. This time instead of `forRoot` we use `forChild`. We'll configure the routes here, so `routes`. We say this time, the `path`. The root path of this module will load the component, `HomeComponent`. Drop these `routes` in here.

**home/home.module.ts**
```javascript
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

const routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports:[CommonModule, RouterModule.forChild(routes)],
  declarations: [HomeModule]
})
export default class HomeModule{}
```

Then in my app.routes instead of saying component, I can say `loadChildren`. And `loadChildren` takes a string which will completely decouple these. The string will be `app/home/home.module` which is basically pointing to this app/home/home.module.

**app/app.routes.ts**
```javascript
import {RouterModule} from "@angular/router";
import {ContactsComponent} from "./contacts/contacts.component.ts";
const routes = [
 {path : '', loadChildren: 'app/home/home.module'},
 {path: 'contacts', component:ContactsComponent}
];

export default RouterModule.forRoot(routes);
```

Finally in my app.module I can get rid of this `HomeComponent` reference, get rid of the `import`. I'll hit Save,

**app/app.module.ts**
```javascript
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import appRoutes from "./app.routes";
import {ContactsComponent} from "./contacts/contacts.component";

@NgModule({
    imports:[BrowserModule, appRoutes],
    declarations:[AppComponent, ContactsComponent],
    bootstrap:[AppComponent]
})
```

and now this will still load the `HomeComponent`. It's just that now we've decoupled this home and everything inside of it from the application.

I can do the same thing in my contacts component. Let's extract those routes out just like we did before. We'll say home.routes.ts. In my module I define my `routes`, so I'll paste those in here. 

**home/home.routes.ts**
```javascript
const routes = [
  {path: '', component: HomeComponent}
];
```

I'll grab this `RouterModule.forChild`, export that as the `default`. I'll make sure it'll import everything.

**home/home.routes.ts**
```javascript
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
const routes = [
  {path: '', component: HomeComponent}
];

export default RouterModule.forChild(routes);
```

Then in my `HomeModule` I can get rid of that `RouterModule`, just `import homeRoutes from "./home.routes"`. Now I'll drop my `homeRoutes` in here. That was just for organization purposes, and everything will still work the same.

**home/home.module.ts**
```javascript
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./home.component";
import homeRoutes from "./home.routes";

@NgModule({
  imports:[CommonModule, homeRoutes],
  declarations: [HomeModule]
})
export default class HomeModule{}
```

Now, let's do that same thing for contacts, real fast. We'll say contacts.module.ts. We'll create the `NgModule`. We'll import the `CommonModule`. We'll declare my contacts component, and export a default class of contacts module.

**contacts/contacts.module.ts**
```javascript
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ContactsComponent} from "./contacts.component";
@NgModule({
  imports:[CommonModule],
  declarations: [ContactsComponent]
})
export default class ContactsModule
```

We'll define our routes in a file. We'll say contacts.routes ts. This will be `routes`, which is an array. This one will have the path at the root again, with a component of `ContactsComponent`. Then we'll export a default `RouterModule.forChild(routes);`.

**contacts/contacts.routes.ts**
```javascript
import {ContactsComponent} from "./contacts.component";
import {RouterModule} from "@angular/router";
const routes = [
  {path: '', component: ContactsComponent}
];

export default RouterModule.forChild(routes)
```

In my contacts.module I can import the contacts routes from `contactsRoutes`, and drop them in my imports because this is a full module to import and load in.

**contacts/contacts.module.ts**
```javascript
import contactsRoutes from "./contacts.routes"

@NgModule({
  imports:[CommonModule, contactsRoutes],
  declarations: [ContactsComponent]
})
```

Finally, in my app.routes I can say, `loadChildren: 'app/contacts/contacts.module'`. This is still at the 'contacts' path, that's fine.

**app/app.routes.ts**
```javascript
const routes = [
 {path : '', loadChildren: 'app/home/home.module'},
 {path: 'contacts', loadChildren: 'app/contacts/contacts.module'}
];
```

In my app.module I can get rid of declaring the `ContactsComponent`, remove the import.

I'll hit Save, and now you'll see "I'm the home component", and then it's /contacts. You'll see the load, "this is a contacts component". We've decoupled these modules and inside the router we can remove these imports as well. Inside my route configuration for the app, you can see I'm loading in other modules.

**app/app.routes.ts**
```javascript
const routes = [
 {path : '', loadChildren: 'app/home/home.module'},
 {path: 'contacts', loadChildren: 'app/contacts/contacts.module'}
];
```

**I'm lazy loading them in**. This is doing this at run time, so that your final builds are as small as possible. Your code is split across these different modules. The angular compiler is set to split and organize these modules just as you would expect, so you don't have to worry about that too much.

This `loadChildren` that you see here is configured in whatever you're using for a loader. But basically, the angular CLI or angular2 starter, or the basic system JS build will all pre-configure this for you.

Based on your custom settings, this path might change, so just check your loader and your build configuration on how that's set up. Again, you'll find no references to `home` or `contacts` inside of your app.module, or app.component. Everything is defined inside of app.routes where it's just a string pointing to the module it's going to load.

These modules are self-contained, and have their own route definitions based on the component it's going to use at this path.

**home/home.modules.ts**
```javascript
const routes = [
  {path: '', component: HomeComponent}
];
```

Similarly with contacts, we'll see the path is nothing but this is really app routes contacts and then nothing. That's how when we load contacts, it will still load in that module, and load in this contacts component.