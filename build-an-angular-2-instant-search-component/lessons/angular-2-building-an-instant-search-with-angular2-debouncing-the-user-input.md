Now that we consumed the input event of our text box as an observable, we can apply a whole set of rx operators on top of it to create a more meaningful observable for our specific use case.

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
    this.term$.subscribe(term => this.search(term))
  }

  search(term: string) {
    this.service.search(term)
                .subscribe(results => this.items = results);
}
```
When we look at the network type of our browser, we will notice that we currently make requests to the Wikipedia API with every single keystroke. In a real-world scenario, we wouldn't like to hammer our server like this, and rather be more economical with our resources.

What we actually want is to make requests whenever the user stopped typing for a brief moment. In technical terms, that means **skip all the notifications up to the point where there hasn't been a new notification for at least say, 400 milliseconds**. Once we have that gap, that the last notification comes through.

The good news is there's rx operator for exactly that behavior, and it's called `debounceTime`. Let's turn back to our code and first import the operator. We do that right off of the import that we did for the `map` operator.

**app.component.ts**
``` javascript
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
```
Since they are all shared across the application, we can leave them right here. What we do is we apply the `debounceTime` operator on top of our `term$` observable. This doesn't directly modify the `term$` observable. Instead, it creates a completely new observable that has the desired behavior.

**app.component.ts**
``` javascript
export class AppComponent {}
  items:Array<string>;
  term$ = new Subject<string>();
  constructor(private service:WikipediaSearchService) {
    this.term$
        .debounceTime(400)      
        .subscribe(term => this.search(term))
  }

  search(term: string) {
    this.service.search(term)
                .subscribe(results => this.items = results);
}
```
Let's check out the network type of our browser again, and see the difference. We can clearly see that we don't perform request on every keystroke anymore. The requests go out as soon I rest my fingers for a brief moment, which is exactly what we want.