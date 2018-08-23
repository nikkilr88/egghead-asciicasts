Instructor: [00:00] Angular services are a very fundamental part of every Angular application. The reason is because most of the logic, given you follow best practices, should reside inside those services, especially the application logic. The different kinds of components import those services and reuse and share that logic among them.

[00:19] The good news is that an Angular service is nothing else than a simple ECMAScript class. Let's create, for instance here, a `people.service.ts`. All we have to do here is to define such ECMAScript `class`. We usually have a `constructor()` inside there, where we could have for dependencies, and then you have your application logic.


[00:40] For instance, let's create here `getPeople()` function, which for the sake of this example, simply returns a hard coded set of people. That's actually already a valid Angular service, which you could go and reuse.

#### people.service.ts
``` javascript
export class PeopleService {
  constructor() {}

  getPeople() {
    return [
      {
        name: 'Juri'
      },
      {
        name: 'Steffi'
      }
    ];
  }
}
```

[00:58] Most often, however, whenever you generate such kind of service, for instance with Angular CLI, you see something like that. You have that `@Injectable` decorator at the very top, which gets imported from `@angular/core`.

``` javascript
@Injectable()
export class PeopleService { ... }
```

[01:11] The reason for having that `@Injectable` decorator is because Angular needs to be able to analyze your service at runtime and see whether it needs further dependencies. For instance, we could have here another service and also some further dependencies.

``` javascript
constructor(private addressService: AddressService) {}
```

[01:30] Whenever there's a decorator at the top of the file, TypeScript will generate some media information for that file. That includes also all the times it get injected into that class. That said, you could have whatever decorator you want at the very top here, but just to have a convention, Angular provides here that `@Injectable` decorator.

[01:48] This also means that whenever, as in our case for instance, you don't have any dependencies, you can simply remove that `@Injectable` decorator at the very top. The best practice, however, suggests you to leave it at the very top. Whenever you then add some dependencies later on, you would get an error, and you would have to come back and basically add that `@Injectable` decorator again.

[02:11] That service is a valid one, so what we could do is to go to our `AppComponent`, for instance, and create here that `PeopleService` and instantiate it. Obviously, we have to import that using the plain ECMAScript syntax. Then, we could expose the result here to our template. We could associate here to that `people` array, which we get from our function here.

#### app.component.ts
``` javascript
@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Services</h1>
    <pre>{{ people | json }}</pre>
  `
})
export class AppComponent {
  people;
  constructor() {
    const peopleService = new PeopleService();
    this.people = peopleService.getPeople();
  }
}
```

[02:38] Inside a template, for the sake of simplicity, let's simply bring here the JSON structure of our object. As you can see, it prints out the data correctly. Take a note here. That's something which you won't usually do in your application.

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

[02:57] While this perfectly works, because this is a simple ES6 class, usually you have order dependencies inside that service, which you would have to provide here in the constructor, which you don't want to do manually. That's actually where the dependency injection from Angular comes into place.