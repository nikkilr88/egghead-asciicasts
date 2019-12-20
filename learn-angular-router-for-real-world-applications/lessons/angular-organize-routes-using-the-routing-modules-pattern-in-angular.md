In our neat little application here, we have defined a couple of `routes` where you can see here defined in this array here. 

#### app.module.ts
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
      path: 'people/personedtail',
      component: PersonDetailComponent
  },
  {
      path: 'contacts/list',
      component: ContactListComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
```

Those are being registered, and a `RouterModule.forRoute`, and an app module.

What jumps to one's eye immediately is, when you look at a route configuration, we have here two components, one in the `people` module and one the `contact` module. Both components reside inside separate dedicated modules, which follow the normal pattern of how you structure Angular applications. 

![Standard Modules](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/angular-organize-routes-using-the-routing-modules-pattern-in-angular-modules.png)

They have their own `@NgModule` where it defined their components.

Similarly, we will also like to structure our routes. As you can imagine in a more complex application, this route definition here might get quite complex and quite massive, and turns into being very hard to maintain and to manage.

Therefore one suggestion which has to be taken for sure is to externalize this in its own file and manage it there, but anyway it will be much cleaner to further split those out into their own modules.

This is exactly what a routing module pattern suggests, which is one of the patterns that should be followed according to the official Angular documentation. Let's take a look at how this works. Let's start with the `people` module here and let's similarly define a new file which we call `people-routing.module.ts`

This file is a normal ng module. We need to import the `NgModule` from `@angular/core`, and we define `@NgModule` section below here, and we also `export` it. We call it `PeopleRoutingMmodule`.

#### people-routing.module.ts
```javascript
import { NgModule } from '@angular/core';

@NgModule({

})
export class PeopleRoutingModule {}
```

This follows our official style guide on angular.io. Next, we need to define our routes. We can go back to the `app.module.ts` and copy out that `people` route which is defined inside here.

Let's remove it from here, jump back to our `people-routing.module.ts` and in here we define our `routes`, which is an array which defines here our people component.

```javascript
const routes = [
  {
    path: 'people/persondetail',
    component: PersonDetailComponent
  }
];
```

We need to `import` that as well. Once we have that, we can then import the routing module, so import the `RouterModule` from `@angular/router`, and we can go down into the `@NgModule` section.

```javascript
import { PersonDetailComponent } from './person-detail.component';
import { RouterModule } from '@angular/router';
```

In the `imports` part, we declared the `RouterModule`. At this time, we don't call `forRoute`, as we did in the global router path, but this time we define `forChild` and we pass in the `routes` definitions. Last, we also need to export the `RouterModule` such as that can be then consumed by others.

```javascript
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
```

Once we have defined the `people-routing.module`, we also need to register it on its own `people.module`. That happens directly in the `import` section. Here, we defined `PeopleRoutingModule` when we `import` it from where we have defined it.

#### people.module.ts
```javascript
import { PeopleRoutingModule } from './people-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail.component';

@NgModule({
  imports: [CommonModule, PeopleRoutingModule],
  declarations: [PersonDetailComponent]
})
export class PeopleModule {}
```

We need to do exact thing also for the contacts part. Let me just quickly do that for you. Great. Once we have both modules here defined -- so the `contacts-routing.module` as well as the `people-routing.module` -- we can go back to our `app.module` and do the very same thing also for the application itself.

We take out those definitions. We create its own file `app-routing.module.ts`. Here, we need to `import` the very same things. Then, we can copy in here our route definitions.

#### app-routing.module.ts
```javascript
import { NgModule } from '@angular/core';

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
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

We also need to import their components to the `HomeComponent` here, the `AboutComponent`, and the `NotfoundComponent`. All of them belonged to the global app module, as you can see it get import directly from the local directory.

```javascript
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';
import { AboutComponent } from './about.component';
import { HomeComponent } from './home.component';
```

Finally, we need also to register them. Here you have to pay attention because now we have to define obviously `forRoute` and pass in those `routes` definitions. 

```javascript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
```

Great. We have concluded most of the parts we need to define a jump back to our `app.module`.

We can remove here parts like the `ContactListComponent` and a `PeopleDetailComponent`, as we haven't registered because they have their own registrations in their modules.

What we need to do here is to import `AppRoutingModule`, and finally, we have to register all of them down here. The PeopleModule and the `ContactModule` have already been registered. Here, we need to define `AppRoutingModule` as the last part.

#### app.module.ts
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { NotfoundComponent } from './notfound.component';
import { PeopleModule } from './people/people.module';
import { ContactsModule } from './contacts/contacts.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NotfoundComponent
  ],
  imports: [BrowserModule, PeopleModule, ContactsModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

The sequence here is very important. Each of these defines their own type of child routing modules, which have to be defined before and at the very last comes to `AppRoutingModule`. Because as we know the routings are being processed by sequence, therefore moving around these could have some strange side effects.

If we save and refresh here the browser, we can see that the `/home` route correctly loads. We can then also go to the contacts list, and the contact list works and also the people, person detail works as we expect.