We're doing pretty good with our instant search, but there are still a couple of things left to tackle such as dealing with out of order responses. While I prefer we dive into that, let's first improve ergonomics of our code to already pave the way for the more advanced stuff.

Notice that we have one `subscribe` call here, and when it's called, it invokes the `search` method on our component. Then we have the `search` method itself, which makes the `service` call, and `subscribes` to the results. Basically, we have two subscribed calls in our code which are loosely connected via a method call.

**app.component.ts**
``` javascript
@Component({ 
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  items:Array<string>;
  term$ = new Subject<string>();
  constructor(private service:WikipediaSearchService) {
    this.term$
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe(term => this.search(term));
  }

  search(term: string) {
    this.service.search(term)
                .subscribe(results => this.iterms = results);
  }
}
```
Since observables are all about composibility, these things are often the code smell. Imagine we would simple `map` on the current on the `search(term)`, their `service` call which returns an observable of array of string. We can totally do that, and we end up with an observable of observable of array of string, which can be a bit of a brain twister at first.

Now, when we subscribe here, the payload is the observable that our service call returned which means we still have to subscribe within our observable to get through the actual area of strings that we are interested in. We give it a function, and say `this.items = results`. Now, we should remove the search method from our components since we don't use it anymore.

**app.component.ts**
``` javascript
@Component({ ... })
export class AppComponent {
  items:Array<string>;
  term$ = new Subject<string>();
  constructor(private service:WikipediaSearchService) {
    this.term$
        .debounceTime(400)
        .distinctUntilChanged()
        .map(term => this.service.search(term))
        .subscribe(obsResults => {
          obsResults.subscribe(results => this.items = results);
        })
  }
}
``` 
When we turn to our browser, we will notice that everything still works as expected. However, we still have two `subscribe` calls, because our payload became an observable itself. Luckily, there's an operator called `mergeMap`, or `flatMap` which lets us map to another observable.

Instead of our simple map which turns your observable into an observable of observable, when you do that, `flatMap` automatically subscribes to these inner observables, and **flattens them into just one observable** of the same type.

**app.component.ts**
``` javascript
import 'rxjs/add/operator/mergeMap';
```
Notice that we have to write the import as `matchMap` since `flatMap` is simply an alias to `matchMap`. All we have to do now is to change map to `flatMap`, or `matchMap` if you prefer. Since `flatMap` flattens for us behind the scenes, we don't have an observable of observable anymore.

**app.component.ts**
``` javascript
constructor(private service:WikipediaSearchService) {
    this.term$
        .debounceTime(400)
        .distinctUntilChanged()
        .flatMap(term => this.service.search(term))
        .subscribe(results => this.items = results)
  }
```
Which means we can change the call back of our subscribe because it now receives the plane array of terms instead of an observable that we manually have to subscribe to. Once again, we turn to our browser, and we see that everything works just like before, but the code is a lot cleaner now.