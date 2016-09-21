When building applications, we often want to put business logic into isolated units so they can be reused across different parts of the application. In Angular, these units are called **services**, and they can be implemented in many different ways.

If we take a look at this `ListComponent`, we can see that it generates a list of `items` based on a collection called `items`, which is defined and initialized on the component. The browser renders that `list`. 

**list/list.component.ts**
``` javascript
import { Comonent, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: `
    <ul>
      <li *ngFor="let item of items">
        {{item.id}}: {{item.name}} lives in {{item.country}}
      </li>
    </ul>
  `
})
export class ListComponent implements OnInit {
  items:Array<any>;

  ngOnInit(){
    this.items = [
      { id: 0, name: 'Pascal Precht', country: 'Germany'},
      { id: 1, name: 'Christoph Burgdorf', country: 'Germany'},
      { id: 2, name: 'Thomas Burleson', country: 'United States'}
    ];
  }
}
```
If we go ahead and change one of the item's names, Angular reflects that change once we save the file.

**Browser Output**
``` javascript
0: Pascal Precht lives in Germany
1: Christoph Burgdorf lives in Germany
2: Andy Burleson lives in United States
```
`Items` is now hard-coded in the component, but usually our data can come from many different places, so it's better to have an abstraction that takes care of returning the data, no matter where it comes from. What we want is a **data service**.

As mentioned earlier, a service in Angular can be implemented in many different ways. One way is to create a service using a class. Let's create a new file in `src/app` and call it `data.service.ts`.

We create a new class `DataService` and export it so it can be imported by other modules later on. The next thing we do is we create a property items, which gets the list of items we defined in our `ListComponent`. Let's copy them over.

**app/data.service.ts**
``` javascript
export class DataService {

  items:Array<any> [
    { id: 0, name: 'Pascal Precht', country: 'Germany'},
    { id: 1, name: 'Christoph Burgdorf', country: 'Germany'},
    { id: 2, name: 'Thomas Burleson', country: 'United States'}
  ];
}
```
Next, we define a method on `DataService` called `getItems`, which simply returns the items of the class.
 
**app/data.service.ts**
``` javascript
getItems() {
  return this.items;
}
```
Now, what we want to do is to inject an instance of `DataService` into our `ListComponent` so we can use it to get our items. Let's go back to our `ListComponent` and import `DataService`.

**list/list.component.ts**
``` javascript
import { DataService } from '../data.service'
```
Next, we extend the component's `constructor` to ask for dependency of type `dataService` by adding a constructor parameter with a type annotation for `dataService`. The type annotation is where the magic happens. With this, we tell Angular's dependency injection to give us an instance of whatever it knows as `DataService`.

**list/list.component.ts**
``` javascript
constructor(private dataService: DataService) {}

ngOnInit() { ... }
```
At this point, the dependency injection doesn't know what a `DataService` is. That's why we need to create a provider for `DataService`.

We create a provider by adding a `providers` property to our component, which is an array of provider definitions. The easiest way to create a provider for our `DataService` is to simply add the `DataService` type to that array. Now Angular knows what `DataService` is and how to create it when someone asks for it.

**list/list.component.ts**
``` javascript
@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: ` ... `,
  providers: [DataService]
})
```
Since we injected a dependency of `DataService` using the `private` keyword, it's exposed as a property in the class. We can now call `this.dataService.getItems` to get hold of our `items`.

**list/list.component.ts**
``` javascript
export class ListComponent implements OnInit {
  items:Array<any>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getItems();
  }
}
```
When we save the file, the browser reloads. As we can see, we still get our list of items, but this time, coming from our service that we've injected into the component.