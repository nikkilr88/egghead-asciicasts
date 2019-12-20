In this `app-routing.module.ts` here, we have a couple of `routes` defined where the component's directly referenced. Then we have some that are lazy loaded. Especially here, the `contact` and the `people` module.

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
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  },
  {
    path: 'people',
    loadChildren: './people/people.module#PeopleModule'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];
```

We can see it here as well in the browser. Down here, when we refresh the application, we get the standard Angular files. When I now click the contacts, the `contact` module file gets loaded. The same thing also for the `people` module.

![Initial](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355067/transcript-images/egghead-avoid-delays-for-lazy-modules-by-applying-a-preloading-strategy-with-the-angular-router-initial.png)

Now, when your application gets larger and grows, these couple of files here -- for instance, the `contact` module, which here in this demo application, is just a couple of kilobytes -- may grow quite a lot. What happens is that when the file is not yet ready, and you reload your application, the user doesn't yet have those modules loaded.

When he clicks the link, it might take a couple of seconds until the megabytes of files are being downloaded for that module. Now, when you implemented lazy loaded, all you want to have is to avoid downloading all those megabytes and megabytes of files when your application loads initially.

The user does not yet interact with these kinds of modules. You want to optimize that time to interactive, such that your application starts as quickly as possible. Then, behind the scenes, you can already download the remaining modules lazily, such that when the user then clicks on those modules, they are already downloaded and ready.

He doesn't recognize this kind of delay. In Angular, this is quite simple. We can go directly to the `app-routing.module.ts`, where we have also defined here our lazy modules, and where we define the root level of our routings.

There, the router takes a second configuration option, where we can specify the `preloadingStrategy`. Then we specify the `PreloadAllModules`. The `PreloadAllModules` gets imported directly from `@angular/router`.

```javascript
import { RouterModule, PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
```

With that, let's save this. Now, let's go to the whole module here. Let's refresh again. As you can see now, the files get downloaded, but also already the `contact`, and the `people` module gets downloaded behind the scenes.

![Preloaded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/egghead-avoid-delays-for-lazy-modules-by-applying-a-preloading-strategy-with-the-angular-router-preloaded.png)

When I click here, the file's already ready, and Angular doesn't have to lazy load it at that moment. The delay of those lazy loaded modules will disappear altogether.