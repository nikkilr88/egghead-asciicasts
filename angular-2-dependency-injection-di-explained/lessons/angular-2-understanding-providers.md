When injecting services into Angular 2 components, there are typically three things we need to do. *First*, we need to import the type of what we want to inject, in this case our `ListComponent` has a `DataService` dependency, so we import `DataService`, while `DataService` is a class in its own module. Now we have the type imported, we can use it in our component file.

**list/list.component.ts**
``` javascript
import { DataSercice } from '../data.service';
```
*Second*, we ask for dependency of that type in the `constructor`, where we want to inject that dependency. 

**list/list.component.ts**
``` javascript
export class ListComponent implements OnInit {
  items:Array<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.items = thisdataService.getItems();
  }
}
```
Now in this component this means we're adding a `DataService` parameter to the `constructor` of type `DataService`. Again, in order to actually use that type, it has to be imported first.

Now we're basically Angular that we're interested in a dependency of type `DataService`. But Angular actually doesn't know what a `DataService` is. That's why we need to do the third thing, which is we need to tell Angular what a `DataService` is, and also how to create it.

**list/list.component.ts**
``` javascript
@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: ` ... `,
  providers: [DataService]
})
```
We do that by creating `providers`, by using the `providers` property of the `Component` metadata. What seems unclear at this point is why do we have to define such a provider when we've already imported `DataService` in the first place? Also how come a `DataService` is a provider at the same time?

The answer is that **importing a type doesn't give us an instance of that type**, all we really do are just pulling in the class defined in another file so we can use it in our own file. What we want to inject, however, is an instance and the provider takes care of creating that for us.

It's like a recipe that describes how something is created when someone ask for a certain thing. That brings us to the second question. How come a `DataService` is a provider at the same time?

As we see here in our `ListComponent`, we added `DataService` to the list of `providers`, so Angular can actually create objects of that type when someone asks for it. It turns out that simply adding a class to the providers list is actually a shorthand syntax for a token and a strategy that describe how to create a certain object.

The same code can be rewritten with a map literal syntax like this. `Provide: DataService, useClass: DataService`. The `provide` property gets a so-called token, and the token is the thing that we use in constructors to ask for dependency as we do here in our `ListComponent`.

**list/list.component.ts**
``` javascript
@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: ` ... `,
  providers: [
   { provide: DataService, useClass: DataService }
  ]
})
```
`UseClass` is a strategy that describes what and how something should be created. In other words, what we do here is we say when someone asks for a dependency with a token `DataService`, use the class `DataService` to create an object which then will be injected.

There are other strategies to create objects, but the shorthand syntax only expands to `useClass`, and only if the given class is the same as the token.

What is really powerful is that we can now inject different objects, even though our application asks for a `DataService` dependency. Here we have an `OtherDataService` class that has the same API as the `DataService`, but the returned data in `getItems` is different.

**app/other-data.service.ts**
``` javascript
export class OtherDataService
  items:Array<any> = [
    { id: 0, name: 'Person', country: 'country'},
    { id: 1, name: 'Person', country: 'country'},
    { id: 2, name: 'Person', country: 'country'}
  ];

  getItems() {
    return this.items;
  }
```
We can inject an instance of that class by importing it.

**list/list.component.ts**
``` javascript
import { DataSercice } from '../data.service';
import { OtherDataService } from '../other-data.service';
```
Configure our provider that it uses that class instead of `DataService` to create the dependency. At this point we can't use the shorthand syntax anymore, because the strategy class is no longer the same as the token.

**list/list.component.ts**
``` javascript
@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: ` ... `,
  providers: [
   { provide: DataService, useClass: OtherDataService }
  ]
})
```
We save the file and see that we get the data from `OtherDataService` while it's still asking for a dependency of the type `DataService`.

**Browser Output**
```
0: Person lives in country
1: Person lives in country
2: Person lives in country
```
To recap importing a data really just makes the type available, but doesn't give us an instance. In order to inject objects, we need providers that know how to create these objects by a given token which is a type.