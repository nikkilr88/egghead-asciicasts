Let's talk about out of order responses. Every time that we rest our fingers for a brief moment, a new request goes out. It may be totally possible that we have multiple requests in flight, waiting to get back to us with a response.

Here's the thing. No one can guarantee that they'll come back in order. There may be load balances involved, that route requests to different servers, and they may handle requests at a different performance.

What we see here is that the response for the character sequence `an` is coming back so late that it overrides the response list for `ang` which lives our UI in a state where the response list does not match the search field.

![Out of Order](../images/angular-2-building-an-instant-search-with-angular-2-dealing-with-out-of-order-responses-example.png)

Notice that we just simulate the shown behavior by adjusting our `WikipediaSearchService`, so that it adds delay to search queries of two letter words. This is just to have a reliable source of out of order responses. 

**wikipedia-search.service.ts**
``` javascript
export class WikipediaSearchService {

  constructor(private jsonp: Jsonp) { }

  search (term: string) {
    let search = new URLSearchParams();
    search.set('action', 'openseach');
    search.set('seach', term);
    search.set('format', 'json');

    let obs = this.jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
               .map(response => response.json()[1]);
    if (term.length === 2) {
      obs = obs.delay(1000);
    }

    return obs;
  }
}
```
It could totally happen in reality. With rx it's just one tiny operator changed to overcome this.

Instead of using `flatMap` or `mergeMap`, we'll use `switchMap`. Now think of `switchMap` as the equivalent of `flatMap`, but with a tiny twist. Every time we project the value into an observable, we subscribe to that observer, just as `flatMap` would do. We also automatically **unsubscribe from the previous observable** that we mapped to before.

**app.component.ts**
``` javascript
import 'rxjs/add/operator/switchMap';

@Component({ ... })
constructor(private service:WikipediaSearchService) {
    this.term$
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this.service.search(term))
        .subscribe(results => this.items = results)
  }
```
Let's change our import, and just change the usage of `flatMap` to `switchMap`. Now every time a new request goes out, we unsubscribe from the previous one. Let's turn to our browser and see that in action. We type an, rest a little, and then type the `g`. We know the an comes back one second later, but our app doesn't care about it anymore.