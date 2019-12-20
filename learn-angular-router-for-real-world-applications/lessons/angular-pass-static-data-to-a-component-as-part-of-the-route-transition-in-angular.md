The Angular router allows us to pass in not only dynamic data via, for instance, a resolver, as in this case, but also some static data, which happens at compile time. That can be especially useful if you want to configure the router component based on different kind of scenarios.

What we can do is to use a specific property called `data`. In `people-routing.module.ts`, within that `data` object, we can specify some key. For instance, let's say `loadAddresses`. We set it to `true`. As a result, we can now access that `loadAddresses` properly in different kind of places.

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: 'people/:personId',
    component: PersonDetailComponent,
    data: {
      loadAddresses: true
    },
    resolve: {
      person: PersonDataResolver
    }
  }
];
```

For instance, let's take a look here at `person-resolver.service.ts` which has been specified here. We can jump into our `resolve`. Wherever we have that `route` object, we can simply access the `route.data`, in this case `'loadAddresses'`. Let's console out this `personDataResolver`. Let's console out here the `loadAddresses`. 

#### person.resolver.service.ts
```javascript
resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  console.log('PersonDataResolver', route.data['loadAddresses']);
  
  return this.peopleService.getPersonById(+route.params['personId']);
}
```

If we open up the developer tools on our console here, we can already see that here is the `PersonDataResolver`, which prints out `true` as we specified in our properties there.

![DataResolver true](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-pass-static-data-to-a-component-as-part-of-the-route-transition-in-angular-dataresolver-true.png)

Similarly, of course, we can go into the `PersonDetailComponent`, then access the same values there as well. Here, you can see we already `subscribe` to the `data`. We can do something like `console.log('Person detail Component', )` and then log out `data['loadAddresses']`. 

#### person-detail.component.ts
```javascript
ngOnInit() {
  this.activeRoute.data.subscribe(data => {
    console.log('Person detail component', data['loadAddresses']);
    this.person = data['person'];
  });
  ...
}
```

You can see how that gets printed out.

![Person Detail](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-pass-static-data-to-a-component-as-part-of-the-route-transition-in-angular-person-detail.png)

Otherwise, you need to access the `snapshot`, which in this case is perfectly fine because the `data`, in this case, is static and not dynamically resolved. 

```javascript
ngOnInit() {
  this.activeRoute.snapshot.data['loadAddresses']
}
```

Of course, this is not limited to Boolean values. In the `data` property, we could also specify an entire object. That depends on the use case which we want to solve.