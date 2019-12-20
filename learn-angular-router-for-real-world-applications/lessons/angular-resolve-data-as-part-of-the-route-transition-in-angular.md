In our setup here, we have a `people-routing.module.ts`, which follows the routing module pattern here. We have a simple `path`, which specifies whenever that `people` segment is called, and then a variable part, which in this case is the `personid`, then visualize that `PersonDetailComponent`.

#### people-routing.module.ts
```javascript
import { PersonDetailComponent } from './person-detail.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes = [
  {
    path: 'people/:personId',
    component: PersonDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
```

Now, what happens inside the component is that we, in the `ngOnInit`, registered to the router `params`. We use here the pipeable operators, and we use a `switchMap` for getting here, that route parameter, which via that neat little trick here, we convert from a string to a number.

#### person-detail.component.ts
```javascript
ngOnInit() {
  this.activeRoute.params
    .pipe(
      switchMap(params =>
        this.peopleService.getPersonById(+params['personId'])
      )
    )
    .subscribe(person => {
      this.person = person;
    });
}
```

Then we pass it on to our `peopleService`, which on the other side, returns an observable from a static part, of a set of people. If we execute that and specify in the URL, `people/1`, we will see how the data gets displayed. If we switch to `2`, another person gets displayed, and so on.

![People 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355065/transcript-images/angular-resolve-data-as-part-of-the-route-transition-in-angular-people-1.png)

Now, while this is a perfectly valid approach to get the data inside your routed component, we would like to move that logic, however, outside that component and to move it to the phase where we navigate between routes.

This can be done by using so-called route resolvers. The first step is to create such a new class inside our `people` folder. Let's call that `person-resolver.service.ts`, which is a normal Angular service class. Let's paste in here a simple scaffold. Now, what we need to do is to implement a specific interface, which is called `Resolve`.

For now, we resolve `any` kind of data object, because we don't have a `class` actually here. This is a simple example. Otherwise, you would specify here person class or person interface. Now, if we implement that interface, we get a method that is called `resolve`, which takes in a couple of parameters. Let's import all of them from the Angular router.

#### person-resolver.service.ts
```javascript
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonDataResolver implements Resolve<any> {
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  }
}
```

The next step is now to move that logic over from our `person-detail.component.ts` to our `person-resolver.service.ts`. Let's copy what's in our `ngOnInit()`, and move it inside of our `resolve`. Next, we need to get the `peopleService`, so let's get that injected in the `constructor`, just as we usually do. Then we need to resolve here the different kind of parameters.

```javascript
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { PeopleService } from './people.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonDataResolver implements Resolve<any> {
  constructor(private peopleService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.activeRoute.params
      .pipe(
        switchMap(params =>
          this.peopleService.getPersonById(+params['personId'])
        )
      )
      .subscribe(person => {
        this.person = person;
      });
  }
}
```

As you can see, we get already in the `resolve` method a parameter `route`, which is the snapshot of the current route. We don't need to subscribe to the parameters, but we can directly extract them in our `resolve`.

Let's say something like `personId = route.params['personId']`. Again, let's convert that to a number. Now, we can invoke our `personService` by giving it here that `personId`. We can remove the remaining part, `this.activeRoute.params` and everything below that.

```javascript
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { PeopleService } from './people.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PersonDataResolver implements Resolve<any> {
  constructor(private peopleService: PeopleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const personId =  +route.params['personId'];

    this.peopleService.getPersonById(personId);
  }
}
```

Now, let's quickly take a look at how that `Resolve` interface is being constructed. If we take that `resolve` method, we can see that has a return type. It expects either an observable, a promise, or a simple value.

That's a convenient part, because in this case, for instance, we return an observable, so we don't have to subscribe. We can directly return that observable to that resolve function. 

```ts
return this.peopleService.getPersonById(personId);
```

Great, so our resolver is implemented, and like with any Angular service, we also need to register it, of course, in the `providers` section.

Let's import it here, `PersonDataResolver`. 

#### people.module.ts
```javascript
@NgModule({
  imports: [CommonModule, PeopleRoutingModule],
  providers: [PeopleService, PersonDataResolver],
  declarations: [PersonDetailComponent]
})
```

Then we need to jump basically to the route definition, in the `people-routing.module.ts`, and register our resolver here. Here, we can use the `resolve` property, which is part of that routing definition. Then we give it a name, which in this case is `person`, and then pass in here the resolver.

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: 'people/:personId',
    component: PersonDetailComponent,
    resolve: {
      person: PersonDataResolver
    }
  }
];
```

That name here will now be available within our routed component. Let's go to the `person-detail.component`. We can remove here actually the whole part because we won't need that anymore. We still need, however, the `activeRoute`. What we can do here is to say `this.activeRoute.data`, and we `subscribe` to that.

Now, inside that `data`, we have a variable which is called exactly as we specified it in the resolve part of our people routing module, the `person` inside of `const routes`. This will now contain our resolve `person`, and we can simply associate it here to our `person` variable.

#### person-detail.component.ts
```javascript
constructor(
  private activeRoute: ActivatedRoute,
  private peopleService: PeopleService
) {}

ngOnInit() {
  this.activeRoute.data.subscribe(data => {
    this.person = data['person'];
  });
```

If we save this here and refresh again, you can see it still works.

Now, the difference is our data is no longer loaded here from our `PersonDetailComponent`, but rather it is loaded within our `PersonDataResolver`, which gets called whenever we route from a different route via that `/people/:personId`.