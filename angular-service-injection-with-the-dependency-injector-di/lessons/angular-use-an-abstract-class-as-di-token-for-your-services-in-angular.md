Here, we have a simple `PeopleService` which exposes a list of people, which we then inject here via the constructor in our `PeopleListComponent`, and we iterate over that list of people to visualize them here on our output.

#### people.service.ts
```javascript
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
  people = [
    {
      name: 'Juri'
    },
    {
      name: 'Steffit'
    }
  ];

  getPeople() {
    return this.people;
  }
}
```

#### people-list.component.ts
```javascript
@Component({
  selector: 'app-people-list',
  template: `
    <h3>List of people</h3>
    <ul>
      <li *ngFor="let person of people">
        {{ person.name }}
      </li>
    </ul>
  `
})
export class PeopleListComponent implements OnInit {
  people;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.people = this.peopleService.getPeople();
  }
}
```

Obviously, that service has to be registered, in this case on the `NgModule` and the `providers` section.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, PeopleListComponent],
  imports: [BrowserModule],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
```

Note also that this is the short form for this one. The meaning here is that we have a token which, in this case is that type information.

#### app.module.ts
```javascript
@NgModule({
  declarations: [AppComponent, PeopleListComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: PeopleService,
      useClass: PeopleService
    }
  ],
  bootstrap: [AppComponent]
})
```

We tell the dependency injector, whenever you see that token, such as `constructor(private peopleService: PeopleService)` in our `PeopleListComponent`, gives us this instance of a class. Assume that that `PeopleService` is used throughout your application, and potentially with different kind of implementations. For instance, a specific `PeopleService` exposing just male people, and just female people, and so on.

In that case, you probably want to generalize this kind of idea here of the `PeopleService` a bit more, to have some kind of base class from which then the specific implementations inherit. The first idea that might come to your mind is to define an interface.

We could define something like `PeopleService`, `getPeople()`,

#### people.service.ts
```javascript
export interface PeopleService {
  getPeople();
}
```

and below here, we call this the `AwesomePeopleService`, which `implements` our interface.

#### people.service.ts
```javascript
@Injectable()
export class AwesomePeopleService implements PeopleService {...}
```

As a next step, we can then jump to our `AppModule`, and we could import here that `AwesomePeopleService` as well, and do something like that.

#### app.module.ts
```javascript
import { PeopleService, AwesomePeopleService } from './people.service.ts'
...

@NgModule({
  declarations: [AppComponent, PeopleListComponent],
  imports: [BrowserModule],
  providers: [
    {
      provide: PeopleService,
      useClass: AwesomePeopleService
    }
  ],
  bootstrap: [AppComponent]
})
```

Whenever that `PeopleService` is being found, inject the `AwesomePeopleService`. In that case in some other module, we could say whenever that interface is found, inject our `MalePeopleService`, for instance.

If you look at the console here, you already note that we get a strange error message telling us that the `PeopleService is not defined`, which might seem a bit strange initially, because we actually defined it here and we exported it. Everything seems to be fine.

However, interfaces in TypeScript are actually only available at compile time. At runtime, they will be dropped. These serve just for a purpose of giving you type checking control and autocompletion. As a result, the dependency injector won't find it at runtime, and gives us this error.

What we can do, however, is to define a class, in this case an `abstract class`. Obviously, we have to define also our method here as `abstract`, and then we can `extends` here from that abstract class. As a result, you can see that our application again works just as we expect.

#### people.service.ts
```javascript
export abstract class PeopleService {
  abstract getPeople();
}

@Injectable()
export class AwesomePeopleService extends PeopleService {...}
```

Interestingly, while it's absolutely recommended to extend from the base class here to get necessary compile-time checking, the Angular dependency injector doesn't require you to do so. We could simply drop this, and it would still work.

#### people.service.ts
```javascript
@Injectable()
export class AwesomePeopleService {...}
```