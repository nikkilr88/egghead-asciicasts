As you can see here, in this `PeopleRoutingModule`, I have a `path` defined which has some static part in front, so `people/` and then some variable part where the ID is inserted.

#### people-routing.module.ts
```javascript
const routes = [
  {
    path: 'people/:personId',
    component: PersonDetailComponent
  }
];
```

In my `PersonDetailComponent` that gets activated whenever that people route is being hit, I have imported the `activatedRoute`, and then we use here the `params` observable to `subscribe` to it, and to fetch out the `personId`.

#### person-detail.component.ts
```javascript
export class PersonDetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
          console.log(params['personId'])
     });
    }
}
```

If I open here the developer tools, you can see that the ID is being logged out, the one which we have here in the URL bar. 

![Console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-forward-url-parameters-to-an-angular-service-to-retrieve-the-desired-data-console.png)

In this example here, I have also defined some `people.service`, which has a method `getPersonById`.

For this example here, it directly returns an observable and filters here a static array based on the ID that's getting passed to that service method. Now, obviously, in a real-world example, this would be an HTTP call, where you forward that `personId` to the server, and get the result back.

#### people.service.ts
```javascript
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private people = [
    {
      id: 1,
      name: 'Juri'
    },
    {
      id: 2,
      name: 'Steffi'
    }
  ];

  constructor() {}

  getPersonById(personId: number) {
    return of(this.people.filter(x => x.id === personId));
  }
}
```

What we want to do now is in that `person-detail.component.ts`, we want to get here an instance of that service. 

#### person-detail.component.ts
```javascript
export class PersonDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {}
```

Then below here, we want to filter it. We want to say `this.peopleService.getPersonById`. We already get an ID in our `params` above, so let's store that in a variable.

```javascript
 ngOnInit() {
   this.activatedRoute.params.subscribe(params => {
    const personid = params['personId'];
    this.peopleService.getPersonById()
  }
```

This is a string, and so we need to convert it into an integer. We can do something like, `getPersonById(+personid)`.

```javascript
 this.peopleService.getPersonById(+personid)
```

Now here, we'll go back to person. Note, this is an observable; therefore we need to `subscribe`.

We want to display the person somewhere on our template. Let's do `this.person = person`, and we need to have here a variable. 

```javascript
export class PersonDetailComponent implements OnInit {
  person;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        const personid = params['personId'];
        this.peopleService.getPersonById(+personid).subscribe(person => {
            this.person = person;
        });
    });
  }
}
```

Let's print it out here below. 

```javascript
@Component({
  selector: 'app-person-detail',
  template: `
    <p>
      person-detail works!
    </p>
    <pre>{{ person | json }}</pre>
  `,
  styles: []
})
```

When I do something like changing the URL to `localhost:4200/people/1`, you can see we get back that person.

![Person](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543355066/transcript-images/angular-forward-url-parameters-to-an-angular-service-to-retrieve-the-desired-data-person.png)

Let's also adjust that people service to not use the `filter` here, maybe to use something like `find`, so we get back a single person. So far, that works.

#### people.service.ts
```javascript
getPersonById(personId: number) {
    return of(this.people.find(x => x.id === personId));
}
```

However, you can see we've got a lot of nesting here. We have here a subscription to that `params` observable, we have that child ID there, and then we `subscribe` again to that person service here, and to get out that `person` detail from there.

#### person-detail.component.ts
```javascript
 ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        const personid = params['personId'];
        this.peopleService.getPersonById(+personid).subscribe(person => {
            this.person = person;
        });
    });
  }
```

Since both of them are observables, we can leverage the observable operators. Let's rewrite this example a bit. First, we keep the `activatedRoute.params` subscription. Then, instead of subscribing, let's use the `pipe` here from RxJS, and then use the `switchMap` operator.

```javascript
  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(
      )
  }
```

In the `switchMap` here, we would get the `params` as an input. We can directly here forward that to our `peopleService`, `this.peopleService.getPersonById`. Now, we map over the `params`, `personId` directly into that call. Let's also `import { switchMap } from 'rxjs/operators'`.

```javascript
import { switchMap } from 'rxjs/operators';

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(params =>
          this.peopleService.getPersonById(+params['personId'])
       )
    )
  }
```

What `switchMap` actually does is it takes in an observable -- in this case here, we get the result of the subscription to the first observable, which is here our route `params` -- and we forward that to the `peopleService`, which in turn gives us another observable.

Down here in the `subscribe`, we finally get the result of that people service observable. In that case, the `person`. We also need here to remove the semicolon, of course. Then again we can assign the `person` which we just got.

```javascript
ngOnInit() {
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
```

You can see the example still works, but our code example got much more beautiful and easier to understand. We get here the `params`, we pipe it through into another observable, and the result of that observable then gets down here into the subscription. We could even add further operators who then filter based on the observable returned here from our `peopleService`.