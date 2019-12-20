In this application here, we have here a people part, which displays a list of people. In the code here, you can see how we iterate over that array of people, and by using the `routerLink`, we construct a path to display the child and the detail of each of these people.

#### people-list.component.ts
```html
@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people | async">
        <a [routerLink]="['/people', person.id]">{{ person.name }}</a>
      </li>
    </ul>
  `,
  styles: []
})
```

As a result, when we click on a name on our people page, we see the detail, and then we can go back and see the list again. Now, if we take a closer look at how that routing is being structured, we can see that `people/list` and `people/:personId` are siblings to each other.

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: 'people',
    component: PeopleListComponent
  },
  {
    path: 'people/:personId',
    component: PersonDetailComponent
  }
];
```

We have one time the `PeopleListComponent`, which is active, and then if we navigate away, the `PersonDetailComponent` will get active as this route gets activated. As a result, these get destroyed and recreated on each navigation.

It can also be easily confirmed by adding here an `onDestroy` callback, if we implement that lifecycle hook here on our `PeopleListComponent`, for instance. Let's move that to the end here, and do a `console.log`.

#### people-list.component.ts
```javascript
export class PeopleListComponent implements OnInit, OnDestroy {
  people;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.people = this.peopleService.getAll();
  }
  ngOnDestroy(): void {
    console.log('people list destroyed');
  }
}
```

Let's add the same part to the `PeopleDetailComponent`. We implement that interface again. We log out here `people detail destroyed`. Let's move that to the very bottom as well.

#### person-detail.component.ts
```javascript
export class PersonDetailComponent implements OnInit, OnDestroy {
  person;
  shouldShowChildren = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.shouldShowChildren = queryParams.get('showChilds') === 'true';
    });

    this.activatedRoute.params
      .pipe(
        switchMap(params =>
          this.peopleService.getPersonById(+params['personId'])
        )
      )
      .subscribe(person => {
        this.person = person;
      });
  }
  ngOnDestroy(): void {
    console.log('people detail destroyed');
  }
}
```

If we now open the dev tools and we navigate to detail, we can see that the people list gets destroyed. If we then click back, we see that the people detail gets destroyed. 

![Destroyed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-create-a-side-by-side-navigation-between-a-list-and-its-detail-with-the-angular-router-destroy.png)

While routing this way from the people list to the detail is perfectly valid, and in many use cases, also desired, we can also have a different kind of structure.

Namely, where the people list remains active, we can click through those items. Then at the very bottom here, the people detail gets simply refreshed with the new data, as our route updates.

For that purposes, however, we need to restructure a bit of how our routing is here defined, because now, we have two kinds of sibling routes, while in the new scenario, this needs to be a child route of our `PeopleListComponent`.

We can do that by specifying here the `children` property. We move that child routing here of our `PersonDetailComponent` up in that child property. 

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: 'people/list',
    component: PeopleListComponent,
    children: [
      {
        path: 'people/:personId',
        component: PersonDetailComponent
      }
    ]
  }
];
```

Moreover, let's also adjust slightly here how the routes work.

For instance, let's change `'people/list'` to `'people'`, which will display then the people list. Then below here, we have just the `':personId`, which means that whenever we navigate to `/people`, the list will be displayed. Then if we go to the ID part, `people/` and then the different IDs of our person that gets visualized, that component here gets activated.

```javascript
const routes = [
  {
    path: 'people',
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

Now, since this is now a child of the component of our list here, we also need another `router-outlet`. We need to go into `people-list.component.ts`, and specify here the `router-outlet`. 

#### people-list.component.ts
```html
@Component({
  selector: 'app-people-list',
  template: `
    <h3>People</h3>
    <ul>
      <li *ngFor="let person of people | async">
        <a [routerLink]="['/people', person.id]">{{ person.name }}</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styles: []
})
```

If we save, we can go here to our people list, which now has been updated to work just with `/people`.

If we click to our list here, you can see how below, the people detail gets activated and gets refreshed with new data. Also, note that we don't get any destroyed notification below here. The reason is because those components remain active for the whole time of our navigation here.

![Child](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-create-a-side-by-side-navigation-between-a-list-and-its-detail-with-the-angular-router-child.png)

Note that in such scenarios, it is essential that your `PersonDetailComponent`, which gets refreshed here below, is using the observable mechanism of reading out the data.

Because in this way, whenever we update our route, that observable gets triggered, and we will finally then call our `peopleService` again to fetch the new person, based on the parameter which has been updated.

#### person-detail.component.ts
```javascript
this.activatedRoute.params
  .pipe(
    switchMap(params =>
      this.peopleService.getPersonById(+params['personId'])
    )
  )
  .subscribe(person => {
    this.person = person;
});
```