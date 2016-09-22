Now that we've built an instant search that deals with all this tricky stuff, wouldn't it be actually better if we had a smarter `WikipediaSearchService` that would handle all these details behinds the scenes?

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
        .switchMap(term => this.service.search(term))
        .subscribe(results => this.items = results);
  }
}
```
As a component order, I shouldn't have to worry about debouncing, deduplicating, and dealing with out of order responses. Because observables are first class objects, we can put APIs that not only return observables, but also accept observables as arguments. Let's make our `WikipediaSearchService` smarter.

We'll keep the search method, but rename it `rawsearch`. We'll build a smarter one on top of it. We call the smarter one simply `search`, and it accepts two arguments. We name the first one `terms`, but instead of being a simple string, it's an `Observable<string>`. The second one we call `debounceMs`, and it gets a default value of 400.

**wikipedia-search.service.ts**
``` javascript
search (terms: Observable<string>, debounceMs = 400) {

}

rawsearch (term: string) { ... }
```
We'll use that to configure the debalancing but allow the caller to override the default value. We also have to write another import to pull in the `Observable` type. We import that one from `rxjs/observable`.

**wikipedia-search.service.ts**
``` javascript
import { Observable } from 'rxjs/Observable';
```
Inside our new `search` method, we just paste all the observable apparatus that we previously used from inside out component to apply them on top of the `terms` observable that we get past as an argument. I switched my panhandler to invoke the `rawsearch` method, and remove the `subscribe` part.

**wikipedia-search.service.ts**
``` javascript
search (terms: Observable<string>, debounceMs = 400) {
  return terms.debounceTime(400)
              .distinctUntilChanged()
              .switchMap(term => this.rawsearch(term));
}

rawsearch (term: string) { ... }
```
Now we jump back to our component, and here we can use our smarter search service. We invoked this `search` method which now expects us to pass an observable of string as its first parameter, and we have that. It's `this.term` which is the raw, unprocessed observable from our text box. Then we subscribe to the observable, and we get access to the results which are on area of strings just as before. We exposed them on the items property of our component, and then we remove all the rest of the code that the component doesn't have to care about anymore.

**app.component.ts**
``` javascript
export class AppComponent {
  items:Array<string>;
  term$ = new Subject<string>();
  constructor(private service:WikipediaSearchService) {
    this.service.search(this.term$)
                .subscribe(results => this.items = results);

}
```
Once the browser's ready, let's see if it still works. I can type. It's still debouncing. It handles out of order responses, and it's all nicely hidden behind a service.