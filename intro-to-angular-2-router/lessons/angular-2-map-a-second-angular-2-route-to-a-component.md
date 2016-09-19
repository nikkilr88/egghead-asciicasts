I'll create a second component in a folder called `contacts`, so I'll say `contacts.component.ts`, and this will be a component with a template of, "this is a contacts component". We'll `export class ContactsComponent{}`,

**contacts/contacts.component.ts**
```javascript
import {Component} from "@angular/core";
@Component({
  template:'
This is a contacts component
'
})
export class ContactsComponent{}
```

and then, inside our app roots, just create another path.

I'll duplicate this one, we'll say the path here is `'contacts'`, and when we hit `'contacts'`, we want to load the `ContactsComponent`.

**app/app.routes.ts**
```javascript
import {HomeComponent} from "./home/home.component";
import {RouterModule} from "@angular/router";
import {ContactsComponent} from "./contacts/contacts.component.ts";
const routes = [
 {path : '', component:HomeComponent},
 {path: 'contacts', component:ContactsComponent}
];

export default RouterModule.forRoot(routes);
```

We also need to declare in my app.module.ts, the `ContactsComponent`.

**app/app.module.ts**
```javascript
@NgModule({
    imports:[BrowserModule, appRoutes],
    declarations:[AppComponent, HomeComponent, ContactsComponent],
    bootstrap:[AppComponent]
})
```

Now when I hit save I'll let this refresh, and then, I'll go to /contacts, and enter.

**localhost:8080/contacts**
```
This is a contacts component!
```

You see, "this is a contacts component!", and if I go back to the root, you'll see that this is the "I'm a home component".

**localhost:8080/**
```
I'm a home component
```
