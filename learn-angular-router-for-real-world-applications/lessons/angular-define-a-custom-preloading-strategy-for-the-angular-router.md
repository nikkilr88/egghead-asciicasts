This Angular application has two lazy loaded routes, and both of them are being preloaded automatically at startup, by using that `PreloadAllModules` strategy. This one is already built into Angular, so you can directly `import` it from `@anguler/router`, and reference it in the configuration of your route configuration.

#### app-routing.module.ts
```javascript
import { RouterModule, PreloadAllModules } from '@angular/router';

const routes = [
  {
    path: 'contacts',
    loadChildren: './contacts/contacts.module#ContactsModule'
  },
  {
    path: 'people',
    loadChildren: './people/people.module#PeopleModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
```

Now, in a larger application, however, you might want to control which files are being preloaded and which just get loaded once the user clicks that specific name. Luckily, we can customize the preloading strategy. Let's create here a new file, and let's call that `custom-root-preloader.ts`.

Here we create a normal class, and we implement the preloading strategy. 

#### custom-route-preloader.ts
```javascript
export class CustomRoutePreloader implements PreloadingStrategy {}
```

We need to `import` a `PreloadingStrategy` from the `@angular/router`. We now also need to implement the interface function of the preloading strategy, which in this case is called `preload`.

Which takes us the first `route`, the current route, of the router, so I'll `import` that as well. Then a `load` function which allows us to determine whether to load or not load the current route. That here returns an `Observable`. For now, that returns `Observable` f type `<any>`, and also `import` that, as well.

```javascript
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable} from 'rxjs';

export class CustomRoutePreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
  }
}
```

Now, you can imagine with that `route` object here, and we can determine the current path and based on that, decide whether we call that `load` function to preload that specific route, or whether we delay it to when the user clicks it.

Now, in my specific case what I would like to do is to apply some kind of flag on my route configuration, such that I can specify preload equals the true, and when that is set, it preloads that current route. We use that `data` property on our route, which allows us to define some configuration property statically.

Let's implement this functionality. Basically, I am saying here when the `route.data` is defined and that `route.data` has a `'preload'` specified, then we invoke here that `load` function, which will then preload this specific route. We also `return` the value here, which is returning an observable.

```javascript
export class CustomRoutePreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    } 
  }
}
```

In the other case, we `return` an empty observable, which we can specify as follows. Let's also `import` here an according operator here from `rxjs`. 

```javascript
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

export class CustomRoutePreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    } else {
      return of(null);
    }
  }
}
```

Now obviously, the next step is to go to that `app-routing.module.ts`, and instead of using here the `PreloadAllModules`, we `import` here our `CustomPreloader`.

#### app-routing.module.ts
```javascript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomRoutePreloader
    })
  ],
  exports: [RouterModule]
})
```

We also need to define our `CustomPreloader` in the `providers` section. 

```javascript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomRoutePreloader
    })
  ],
  providers: [CustomRoutePreloader],
  exports: [RouterModule]
})
```

With that, we should be set up. Now, let's refresh our page. Let's open up the dev tools. Let's go to the network panel. Let's go to the home, and refresh, so we don't have any lazy loaded route here selected.

You can see now, nothing gets preloaded. That's actually because we specified that it should only be preloaded when that preloading is specified on the route configuration. 

![Nothing Preloaded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-a-custom-preloading-strategy-for-the-angular-router-nothing-preloaded.png)

Now, we could go into our `app-routing.module`, and tell, for instance, that that `people` module should be preloaded while the `contact` module should stay there, and only be loaded when the user clicks on it.

We use that `data` property, and we specify `preload: true`. 

```javascript
{
  path: 'people',
  loadChildren: './people/people.module#PeopleModule',
  data: {
      preload: true
  }
}
```

Let's save again. Now, we can see that the `people` module gets preloaded, just as we assumed, and the `contact` module on the other side only gets preloaded when I click on it.

![People Preloaded](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-define-a-custom-preloading-strategy-for-the-angular-router-people-preloaded.png)