Instructor: [00:02] Since Angular services are plain accuracy classes, we can just instantiate them and use them here in our components.

#### app.component.ts
``` javascript
export class AppComponent {
  people;
  constructor() {
    const peopleService = new PeopleService();
    this.people = peopleService.getPeople();
  }
}
```

[00:09] The reality, however, is different, because these kind of services are usually not that simple. They have co-dependencies, as well, which you would then have to here manually wire up and provide to that `PeopleService`. That's exactly work which you would like to delegate to the dependency injection mechanism.

[00:27] In order to wire up here our `PeopleService` with the dependency injection mechanism of Angular, we have to create a provider. We do that at the modular level, where we defined our `PeopleService`. There we have a `providers` array here, where we can then import that `PeopleService`.

#### people.module.ts
``` javascript
@NgModule({
  imports: [CommonModule],
  providers: [
    PeopleService
  ],
  declarations: []
})
export class PeopleModule {}
```

[00:46] With that, we have defined an Angular provider, which provides such an instance of a `PeopleService` whenever someone asks it in the dependency injection mechanism. We can go back here to our `AppComponent`, and we can simply here use that `PeopleService`.

#### app.component.ts
``` javascript
export class AppComponent {
  people;
  constructor(private peopleService: PeopleService) {
    this.people = peopleService.getPeople();
  }
}
```

[01:04] We can remove this one here, and now Angular will make sure to provide us that `PeopleService` at run time. As you can see, the example still works.

#### output
``` json
[
  {
    "name": "Juri"
  },
  {
    "name": "Steffi"
  }
]
```

[01:12] If you take a look again here at the definition of that provider, this is actually the short form of defining it. It is the short form of this one. We have to give it a `provide` keyword, and this will be the key basically with which we register that service on the dependency injection mechanism.

#### people.module.ts
```javascript
@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: PeopleService,
      useClass: PeopleService
    }
  ],
  declarations: []
})
```

[01:32] We used to `useClass`, where we say provide here the `PeopleService`. Basically, whenever you see a token like this, which in this case would match this one here, provide me an instance of this class. What's also important to note here is that this provider will now be visible globally.

[01:52] When we switch, for instance, to our `contacts` module, which we have set up here, and we go to our `ContactListComponent` and we import here our `PeopleService`, as well, as you can see it gets that service here imported. We get injected here. Let's simply do a `console.log` of `this.peopleService.getPeople`.

#### contact-list.component.ts
```javascript
export class ContactListComponent implements OnInit {
  constructor(private peopleService: PeopleService) {
    console.log(this.peopleService.getPeople());
  }
```

[02:17] Now to jump back to our `AppComponent` and actually use that `<app-contact-list>`, so that it gets activated. If we now open up the dev tools, we can see here that the array gets locked out from our `ContactListComponent`.

[02:33] Therefore, it shows that that `PeopleService` is visibly globally, even though the `contacts` module, in this case, doesn't even mention or import `people` module.