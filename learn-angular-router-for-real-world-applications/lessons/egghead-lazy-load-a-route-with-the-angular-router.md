In this application, the routing is already configured, such that when I click here, you can see the URL updates. Also, the component gets rendered properly and updated. If we check the network panel and select here the JavaScript files -- let's quickly refresh -- you can see the typical Angular files.

![Typical files](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/egghead-lazy-load-a-route-with-the-angular-router-typical-files.png)

We have the `vendor` files, the `main`, which contains our application. Here, it's quite small because it's just a demo application. Then the `polyfills` and the `styles`.

Usually, when the application gets larger, that `main` file increases quite drastically. What you want to optimize for is to refresh the demo application. Whenever the user starts the application, it should start fast, and then basically continue to load behind the scenes further modules as needed.

This is what is called lazy loading. In this specific example, what we would like to do is that the people module should only get loaded once we click on it. Let's configure that. If you take a look at the structure of the application, that people module already resides inside a dedicated folder.

![People Module](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-lazy-load-a-route-with-the-angular-router-people-module.png)

We have the Angular module, which in turn, registers all the necessary components and services. It also registers the `PeopleRoutingModule`, which defines the path for rendering the people routes. 

#### people.module.ts
```javascript
import { PeopleRoutingModule } from './people-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail.component';
import { PeopleService } from './people.service';
import { PeopleListComponent } from './people-list.component';

@NgModule({
  imports: [CommonModule, PeopleRoutingModule],
  declarations: [PersonDetailComponent, PeopleListComponent],
  providers: [PeopleService]
})
export class PeopleModule {}
```

In turn, that `PeopleModule` is referenced here in that `app.module.ts`.

#### app.module.ts
```javascript
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent
  ],
  imports: [BrowserModule, PeopleModule, ContactsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
```

With that, enter our application, gets to know about the routing of that `PeopleModule`. We need to detach that completely. As a first step, let's remove here that `PeopleModule`. We should have no hard reference here in our `app.module.ts`.

```javascript
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent
  ],
  imports: [BrowserModule, ContactsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
```

Of course, the application will break in this way. You can already see here when we refresh, the route is no more known to the application, and in fact, our 404 component gets displayed when the `people` URL here gets displayed.

![404](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-lazy-load-a-route-with-the-angular-router-404.png)

The next step we have to now is to somehow tell the `app.module.ts` whenever that `people` part is being shown. It should lazy load behind the scenes that people module, with its routing, and then activate the according component.

As a first step here, let's go to `app-routing.module.ts` for the application. We need to tell the `app-routing.module.ts` what should happen whenever people is being displayed. Here we add that `people`, and then we cannot reference the `PeopleModule`, because then we would have another import of a JavaScript file, such as these components up here. Then again, it would be bundled into the main file.

#### app-routing.module.ts
```javascript
const routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'people',
   
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
```

The router has a configuration which is called `loadChildren`, which allows us to specify a string. Here, we specify the relative path from that app routing to the people module.

We will say something like, `people`, then the `people.module`, and the according class, which should be instantiated, which is the people module. 

```javascript
{
  path: 'people',
  loadChildren: './people/people.module#PeopleModule'
},
```

This part is the export from that `PeopleModule`, which should be loaded. 

#### people.module.ts
```javascript
import { PeopleRoutingModule } from './people-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail.component';
import { PeopleService } from './people.service';
import { PeopleListComponent } from './people-list.component';

@NgModule({
  imports: [CommonModule, PeopleRoutingModule],
  declarations: [PersonDetailComponent, PeopleListComponent],
  providers: [PeopleService]
})
export class PeopleModule {}
```

In Angular, the lazy loading unit is a module, so we cannot lazy load single components, but always just an entire module, which makes sense given how the modules are defined.

With that, we have set up the lazy loading part. Let's go to the people module. We have still to adjust something about the `people-routing.module.ts`, because now the app routing already specifies the first part of the path, the `/people`. 

In the lazy load, our people module here, together with its people routing, and therefore we have to adjust here the `path` such that here there is an empty string, which will then load the `PeopleListComponent`, and then with the ID, the `PersonDetailComponent`.

#### people-routing.module.ts

```javascript
const routes = [
  {
    path: '',
    component: PeopleListComponent,
    children: [
      {
        path: ':personId',
        component: PersonDetailComponent
      }
    ]
  }
];
```

Let's save. We can see that it gets already displayed. Let's also check our Angular compiler here. If we restart our Angular CLI, we already see that something changed. Now we get the `main.js` file, the polyfills, styles runtime, and so on, but we also get another JavaScript file, which is this `people-people.module.js`

![CLI](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-lazy-load-a-route-with-the-angular-router-cli.png)

The Angular CLI automatically recognize that whenever `loadChildren` with the strings is being specified, it automatically creates a bundle just for those JavaScript files that belong to that module. 

#### app-routing.module.ts
```javascript
{
  path: 'people',
  loadChildren: './people/people.module#PeopleModule'
}
```

Similarly, now let's refresh your application. Let's open a network panel.

We see we get the `runtime`, `polyfill`, `styles`, and so on. Our `main` file, as you can see, has now decreased quite a lot. Instead of `40` kilobytes, it's now `26` kilobytes. If I click the people link, we will see how the people module gets loaded, which contains the remaining bytes, basically, just for that people part of our application.

![People File](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-lazy-load-a-route-with-the-angular-router-people-file.png)