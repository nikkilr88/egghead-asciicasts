The angular router doesn't allow us to only navigate to absolute URLs. For instance, as we specify here with the `routerLink`. Here we indicate at `/contacts` and then the second segment is `list`. We can navigate among our different kind of views.

#### app.component.html
```html
<nav>
  <a [routerLink]="['/home']" routerLinkActive="active-route">Home</a>
  <a [routerLink]="['/contacts', 'list']" routerLinkActive="active-route">Contacts</a>
  <a [routerLink]="['/people']" routerLinkActive="active-route">People</a>
  <a [routerLink]="['/about']" routerLinkActive="active-route">About</a>
</nav>
```

Now especially if we take a look at our `PeopleListComponent`, you may have noticed that if we click here on `People` and then on a sub-item, that navigation remains active, and just the sub-item gets refreshed.

Now by taking a look at our inner part here, those router links are specified by indicating a forward path again. Basically to `/people` and then appending a `person.id`. 

#### people-list.component.ts
```html
<li *ngFor="let person of people | async">
  <a [routerLink]="['/people', person.id]">{{ person.name }}</a>
</li>
```

If we take a look at how that routing is defined, we can see that the `PersonDetailComponent`, which is visualized here below, is a child of that `PeopleListComponent`.

#### people-routing.module.ts
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

This also reflects the path. Both shared first part, `people`. Then basically whenever that second part here is empty, the `PeopleListComponent` is displayed. If there is a `/` again with some ID, then the `PersonDetailComponent` gets loaded.

Now we can take advantage of this behavior by actually going inside of our `routerLink` and removing that whole part. The angular router is hierarchical, in that it understands that the router link here points to a sub-child of that `PeopleListComponent`.

#### people-list.component.ts
```html
<li *ngFor="let person of people | async">
  <a [routerLink]="[person.id]">{{ person.name }}</a>
</li>
```

All it has to do is to append that ID of the `person`, which we're currently iterating over here, to our URL. To load then the detail component, which gets visualized just below here. Let's save this and try it out. As you can see, it still works by just appending the URL here.

This kind of approach is really powerful because you could also do something like `''`, which wouldn't make much sense in this example. For instance, we can navigate one level up. Then say want to navigate to `people`. 

Then to personal ID again. Even that works just as expected.

```html
<li *ngFor="let person of people | async">
  <a [routerLink]="['../', person.id]">{{ person.name }}</a>
</li>
```