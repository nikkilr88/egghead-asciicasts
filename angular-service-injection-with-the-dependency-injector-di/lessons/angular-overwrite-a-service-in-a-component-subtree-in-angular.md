In this example here, we have the `App Component`, which uses an `<app-person>` component inside its template. That `<app-person>` component injects here a `PeopleService`, and that invokes here the `PeopleService` `.getPerson()` method to display here a `person`.

In turn, the `.getPerson()` method of that `PeopleService` is quite simple. We have here a `name`. Basically, the `.getPerson()` simply returns an object and references `this.name` here, which is then being shown here by our `<app-person>` component.

#### Output
```
Angular Services

App Component
{
  "name": "Juri",
  "age": 31
}
```

What we would like to do now is to learn how we can scope a service to a certain component subtree, and to basically override it with a different kind of service. First of all, let's create here a new component. Let's call it woman.

#### Console Input
```bash
$ ng g c woman
```

That `WomanComponent` does very much the same as that `PersonComponent` does. It gets an instance of that `PeopleService`. We have here also `.person` property. Here we do `this.person = this.people.getPerson()`. We obviously need here to inject that service, `import` it from the `PeopleService`.

#### woman.component.ts
```javascript
import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';

@Component ({
  selector: 'app-woman',
  template: `
    <p>
      woman works!
    </p>
  `,
  styles: []
})
export class WomanComponent implements OnInit {
  person;

  constructor(private people: PeopleService) { }

  ngOnInit() {
    this.person = this.people.getPerson();
  }

}
```

Up here, let's do something like this. Let's say Woman, just to know we are in a `WomanComponent` here, and visualize that person again by simply showing its JSON structure.

#### woman.component.ts
```javascript
@Component ({
  selector: 'app-woman',
  template: `
    <p>
      <h3>Woman</h3>
      <pre>{{ person | json }}</pre>
    </p>
  `,
  styles: []
})
...
}
```

Let's jump back to the `App Component` and visualize our new `<app-woman>` component. Let's have a look. Great.

#### Output
```
Angular Services

App Component
{
  "name": "Juri",
  "age": 31
}

Woman
{
  "name": "Juri",
  "age": 31
}
```

We see that we get the same value, because both component actually get an instance of that `person` service. Therefore, we will get the same value inside here.

Let's now generate a new service, which we call `WomanService`. We get here that `WomanService`. What that `WomanService` does is simply extending that `PeopleService`. Then we basically override that `.getPerson()` method. We get here a person, and then we'll say `person.name = 'Katie'`, and `person.gender = 'F'`. Then, return that `person`.

#### woman.service.ts
```javascript
import { Injectable } from '@angular/core';
import { PeopleService } from './people.service';

@Injectable()
export class WomanService extends PeopleService {
  getPerson() {
    const person = super.getPerson();
    person.name = 'Katie';
    person.gender = 'F';
    return person;
  }
}
```

TypeScript complains here because we don't match the structure. Let's simply return here `any`, and we should be fine to go.

#### people.service.ts
```javascript
@Injectable
export class PeopleService {
  name = 'Juri';

  getPerson(): any {
    return {
      name: this.name,
      age: 31
    };
  }
}
```

This `WomanService` is actually registered here on our module, just as the `PeopleService`, and so they're both exposed globally on our `app.module`.

#### app.module.ts
```javascript
import { PeopleService } from './people.service';
...
import { WomanService } from './woman.service';
```

Now let's go back to our `WomanComponent`. You can see it still gets here the `PeopleService`, and it also displays that same object from that `PeopleService`, just as we expect. What we're going to do now is to basically override that `PeopleService`.

We do it not in the module level, but in the component level. We have `providers:` property here, as well, which works identically as the one in the module, but it is scoped to this component and its children. Let's demonstrate that.

We create here the `provide` and say, whenever you see a `PeopleService`, use the class `WomanService` instead.

#### woman.component.ts
```javascript
template: `
  <h3>Woman</h3>
  <pre>{{ person | json }}</pre>
`,
providers: [{ provide: PeopleService, useClass: WomanService}]
```

If I save this, we will immediately see that this component here, which is displayed below the `App Component` here, all get now an instance of an object, which comes from that `WomanService`, which we just created here. Basically, we manipulate it in this way.

#### Output
```
Angular Services

App Component
{
  "name": "Juri",
  "age": 31
}

Woman
{
  "name": "Katie",
  "age": 31,
  "gender": "F"
}
```

Most interestingly also, if we go to the `App Component` and we use that same `<app-person>` component here, and we bring it here nested into the template of our `WomanService`, that same one will also get now the instance from that `WomanService`.

#### woman.component.ts
```javascript
template: `
  <h3>Woman</h3>
  <pre>{{ person | json }}</pre>

  <app-person></app-person>
`,
```

#### Output
```
Angular Services

App Component
{
  "name": "Juri",
  "age": 31
}

Woman
{
  "name": "Katie",
  "age": 31,
  "gender": "F"
}

{
  "name": "Katie",
  "age": 31,
  "gender": "F"
}
```

Although, inside `<app-person>`, we simply inject here the `PeopleService`, just as before. We didn't change that to `WomanService`.

Here, we can basically see the hierarchical nature of the dependency injector in Angular. What happens here is that we have, at the very top, the `<app-root>` component, which is our `App Component`. Then we have the `<app-person>` component which we gave it. Then we have the `<app-woman>`. Below, we did include, again, that `<app-person>` component.

#### Hierarchy
```
<app-root> (M)
  - <app-person>
  - <app-woman>
    - <app-person>
```

We have one module here, which is basically registered at the very top. Globally, we inject here that `PeopleService`. Inside the component tree, at some level, we say whenever you see that `PeopleService`, which is just what we did, use that `WomanService` instead.

#### Hierarchy
```
<app-root> (M) >> PeopleService
  - <app-person>
  - <app-woman> >> PeopleService -> WomanService
    - <app-person>
```

From that component tree onwards, all its children and the component itself will then get an instance of this `WomanService`, instead of the global `PeopleService`.