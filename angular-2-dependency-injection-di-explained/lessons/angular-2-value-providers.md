Dependencies aren't always objects created by classes or factory functions. Sometimes all we really want is to **inject a simple value**, which can be a primitive or maybe just a configuration object. For these cases we can use value providers.

Let's take a look at our `DataService`. 

**app/data.service.ts**
``` javascript
@Injectable()
export class DataService {
  
  apiUrl = 'http://localhost:4200/api';

  constructor(private logDebugger: LogDebugger, private http: Http) {}

  getItems() {
    this.logDebugger.debug('Getting items...');
    return this.http.get(`${this.apiUrl}/items`)
                    .map(res => res.json())
                    .map(data => data.items);
  }
}
```
`DataService` has an `Http` dependency and uses that to fetch items from a remote server. The `apiUrl`, where the service is fetching from, is defined up here.

In our `ListComponent`, we simply call `getItems` on our `DataService`. We get an Observable, which is then result at runtime using the async pipe, which in turn results in a list of items rendered in the browser.

**list/list.compontent.ts**
``` javascript
@Component({ ... })
export class ListComponent implements OnInit {
  items:Observable<Array<any>>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.items = this.dataService.getItems();
  }
}
```
Coming back to our `DataService`, we see that `apiUrl` is a hard-coded property of the class. This works great, but of course it would be way better if we could inject this `apiUrl` wherever we need it in our application.

**app/data.service.ts**
``` javascript
@Injectable()
export class DataService {
  
  apiUrl = 'http://localhost:4200/api';

  constructor(private logDebugger: LogDebugger, private http: Http) {}

  getItems() { ... }
}
```
To make this value injectable, we first need to add a provider to our `ListComponent`. Let's go back to our `ListComponent` and type `provides: apiUrl`. The interesting part here is that provider tokens can be either types or strings. In this case the token is a string, and we now need to define the strategy that is used to create the dependency.

**list/list.component.ts**
``` javascript
@Component({
  moduleId: module.id,
  selector: 'list-component',
  template: ` ... `,
  providers: [
    DataService,
    ConsoleService,
    {
      provideL LogDebugger,
      useFactory: (consoleService) => {
        return new LogDebugger(consoleService, true);
      },
      deps: [ConsoleService]
    },
    {
      provide 'apiUrl',

    }
  ]
})
```
Since we really just want to inject a simple string value, we can type `useValue`, and this gets the value we want to inject, which is our `apiUrl`.

**list/list.component.ts**
``` javascript
 providers: [
    DataService,
    ConsoleService,
    {
      provideL LogDebugger,
      useFactory: (consoleService) => {
        return new LogDebugger(consoleService, true);
      },
      deps: [ConsoleService]
    },
    {
      provide 'apiUrl',
      useValue: 'http://localhost:4200/api'
    }
  ]
```
Now we go back to our `DataService` and inject the `apiUrl` by its token. We go into the constructor at the parameter, and now we have a problem. Obviously we can't add a type annotation for a string `apiUrl` since this is not a valid type.

Angular comes with a decorator that solves exactly that problem. It's called `@Inject` and we can simply import it from `@Angular/core`. 

**app/data.service.ts**
``` javascript
import { Inject } from '@angular/core';
```
`@Inject` is a decorator that we can attach to the constructor parameter so we can annotate them with the required metadata. All we need to do is to prepend the parameter with the decorator and pass it the token for the provider that creates the dependency.

**app/data.service.ts**
``` javascript
@Injectable()
export class DataService {
  
  apiUrl = 'http://localhost:4200/api';

  constructor(private logDebugger: LogDebugger, private http: Http, @Inject('apiUrl') private apiUrl) {}

  getItems() { ... }
}
```
Another thing to note is that `@Inject` takes any token, not just strings. That's why we could also use `@Inject` to add metadata for the, let's say, `LogDebugger` dependency. 

**app/data.service.ts**
``` javascript
@Injectable()
export class DataService {

  constructor(@Inject(LogDebugger) private logDebugger, private http: Http, @Inject('apiUrl') private apiUrl) {}

  getItems() { ... }
}
```
This is useful if we happen to write our Angular 2 application in a language other than TypeScript, where type annotations don't exist.

Let's remove the class property, save the file, and we can see that everything still works, but now our `apiUrl` is an injectable value.