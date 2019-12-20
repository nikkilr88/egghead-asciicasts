Usually, in a real-world application, you might want to guard access to specific routes. Certain users might be able to enter, for instance, the `contact` route, and other `people` might be able to enter the people route.

Or even more differently, for instance, the home `contacts` routes are open routes, where you can access, even in anonymous mode. However, if you access, for instance, the `people` route you have to be logged in.

To demonstrate how we can protect certain routes in Angular, I've implemented here a very, very simple Angular authentication system. We have in our `auth.service.ts` file, an authentication service, which works very simple.

It has an `isLoggedIn` flag, which is by default `false`. It has a method which can be queried, whether the current user's logged in or not, and then we have a `login` and a `logout` method, which merely set that Boolean flag.

#### auth.service.ts
```javascript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = false;

  constructor() {}

  isLoggedIn() {
    return this._isLoggedIn;
  }

  login() {
    this._isLoggedIn = true;
  }

  logout() {
    this._isLoggedIn = false;
  }
}
```

Again, in a real-world application, you would probably have here a verification for a token. You would call the back end to see whether there is an active session, and so on. Moreover, as you can see here, we have that login and logout button here at the route component.

If you go into the `app.component.html`, you can see that in the template, I am merely switching that on and off. 

#### app.component.html
```html
<div style="text-align: right">
  <a href="javascript:;" *ngIf="authService.isLoggedIn(); else loginTmpl" (click)="logout()">Logout</a>

  <ng-template #loginTmpl>
    <a href="javascript:;" (click)="login()">Login</a>
  </ng-template>
</div>
```

When you click those buttons, then in the `app.component.ts` code, I'm invoking the `login` or `logout` of our authentication service.

#### app.component.ts
```javascript
constructor(public authService: AuthService) {}

login() {
  this.authService.login();
}

logout() {
  this.authService.logout();
}
```

Great. Let's go to our `app-routing.module`. Let's assume we want to guard that access to the `people` module. If we're doing so in Angular, we can use the `canActivate` property here on the route configuration.

#### app-routing.module.ts
```javascript
{
  path: 'people',
  loadChildren: './people/people.module#PeopleModule',
  data: {
    preload: true
  },
  canActivate: []
},
```

Let's go and implement such a guard. First of all, we need to create here a new class. Let's call that `auth.guard.ts`. This is a normal Angular service, so we need to inject the `@Injectable`, and create the class.

Let's call it `AuthGuard`, and implement `CanActivate`. Make sure that the `import` is correct. You can `import` that directly from the `@angular/router`. We also need to import here the `Injectable`, and then we can implement here the interface.

#### auth.guard.ts
```javascript
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

}
```

Which is `canActivate`, which takes the `route`, which is an `ActivatedRouteSnapshot`, and then also the current `state` of the router. As the return value here, we have a Boolean. For now, let's return, just `false`. 

```javascript
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
    return false;
  }
```

Now having that `RouteStateSnapshot`, we could again query that route configuration, and for certain routes, based on its path, or some other properties, we could allow people to enter or not, into that current route.

However, in our specific implementation, we want to query the authentication service which we have seen before. We can inject that here, just as we normally do. We might also need an instance of the current `router`. Let's `import` it also from `@angular/router`, and then we can start with the actual implementation.

```javascript
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return false;
  }
}
```

In our example here, this is quite simple. We can say `this.authService.isLoggedIn`. If the user is logged in, then `return true`, so he can enter that route. Otherwise, we don't want to let him enter. Therefore, what we do is we use the router and navigate directly again to the home route.

We also `return` here, `false`, such that that route doesn't get activated. 

```javascript
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean {
  if (this.authService.isLoggedIn()) {
    return true;
  } else {
    this.router.navigateByUrl('/');
    return false;
  }
}
```

With that, our implementation should be concluded. All we have to do is register it also in the `providers` array. We can register here our `AuthGuard`.

#### app-routing.module.ts
```javascript
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomRoutePreloader
    })
  ],
  providers: [CustomRoutePreloader, AuthGuard],
  exports: [RouterModule]
})
```

Finally, once we have registered it here on the `providers` array, we can also reference it here in the `canActivate` array. 

```javascript
  {
    path: 'people',
    loadChildren: './people/people.module#PeopleModule',
    data: {
      preload: true
    },
    canActivate: [AuthGuard]
  },
```

Now, if you click that `contacts` part, it works without any problems. If we take that `people` link, however, we get redirected to the home automatically.

Now, let's log in. Let's try again, and now, you can see, we've passed basically that guard, and we enter successfully into the route. Most importantly, this also works when the user directly modifies the URL up here. If someone goes to the URL and wants to enter that guarded route, it would refresh here, and you would automatically be redirected to home again.

Also, note that if you have a route with children, for instance, if we would have a normal route, let's say up in our `about` path, and you have `loadChildren`, below here, where we have to find other routes as a sub-route of this `about`. 

Then you may also want to take a look at the `canActivateChild` function where you can pass into the same `authGuard` just that you don't only have `canActivate`, but also the `canActivateChild`, which can have the same implementation, however.