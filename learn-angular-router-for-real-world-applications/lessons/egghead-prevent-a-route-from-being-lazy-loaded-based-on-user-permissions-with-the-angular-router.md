Here, I have routing configuration where we have a `people` module, and that `people` module uses `canActivate` property here and uses the implementation by this `AuthGuard`, such that the users who are not logged in won't be able to enter that route.

#### app-routing.module.ts
```javascript
{
  path: 'people',
  loadChildren: './people/people.module#PeopleModule',
  canActivate: [AuthGuard]
}
```

If the person clicks that `people` route, it will not be able to enter, and it will be redirected automatically to home, in case the person does something like specifying the `/people` route in the URL.

Now if you pay close attention, let's also refresh this again. This `/people` route is a lazy loaded route. What happens is that, when I'm not logged in here, as it is currently the case, and I click that `/people` route, you can see that the JavaScript file gets loaded over the wire, but we're not able to actually load the `people` module, because we are not logged in.

The point is that, in this case, it's useless to load that `people` module. Angular for that purposes has also something that is called `canLoad`, which takes the same syntax, so we can directly reuse that AuthGuard which I've specified.

```javascript
{
  path: 'people',
  loadChildren: './people/people.module#PeopleModule',
  canActivate: [AuthGuard],
  canLoad: [AuthGuard]
},
```

The only thing we have to do is also implement the `CanLoad` interface, which we again `import` from `@angular/router`. 

#### auth.guard.ts
```javascript
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
}
```

Let's also implement actual interface function, which returns a `boolean`. Let's use that `boolean` here.

We get a `route` configuration and `Urlsegment` in this case again. For our specific implementation here, we won't need any of those. We will use the same implementation. For that purpose, let's extract that into a known function.

In this way, we can now reference the function from both or `canActivate`, and also on our `canLoad` function. 

```javascript
canLoad(route: Route, segments: UrlSegment[]): boolean {
  return this.canEnterRouter();
}

private canEnterRouter() {
  if (this.authService.isLoggedIn()) {
    return true;
  } else {
    this.router.navigateByUrl('/');
    return false;
  }
}
```

Now, let's save both of these files. Now if I click that `people` module, nothing happens.

Also, the file doesn't get lazy loaded over the wire. Now, let's log in to counter check. If I click now, it gets lazy loaded, and our module gets properly visualized.