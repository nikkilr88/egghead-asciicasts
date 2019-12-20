This application has a bug. If we search for "ship", you can see it made a network request, appending the search term as the query parameter be a name. If we delete all of the characters here, we get an error. The API has returned an error saying there are invalid query parameters.

![Invalid Query Parameters Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/egghead-filter-actions-to-exclude-empty-values-invalid-query-parameters-error-from-API.png)

If we look here, we can see it's because we're not sending anything through. That's because on the `<input>` field, we just have this `onChange` handler. We are calling `search` every single time the value changes, regardless of what it is. When we delete all of the characters, it's the equivalent of calling that.

That means in our epic, we call this `search` helper function, which appends the search term to the end of this. It ends up being an empty string. You might be tempted to add some logic in here to prevent this `search` function being called if this doesn't have a value.

For example, you could open this up. You could start putting `if` statements in here, checking the value before you call it. That's not the Rx way. Instead, we are viewing the values coming out of this `<input>` field as simply a stream of values.

Another way to think about this is that this `<input>` field is simply a data source. If we want to filter this data source, we can do that through composition. Back here in the epic, you can see we're already filtering this action stream with this `ofType`. Then we're applying a `debounceTime` to drop any values that occur within `500` milliseconds of each other.

Directly after that, we can apply a `filter`. `Import` that from `RxJS/operators`. Then we get access to the action here. We can destructure the `payload`, then provide our own predicate. In this case, we're just going to `trim` the string and then check it's not equal to an empty string.

#### fetchBeers.js
```js
import {ajax} from "rxjs/ajax";
import {debounceTime, filter, map, switchMap} from "rxjs/operators";
import {SEARCH, fetchFulfilled, setStatus} from "../reducers/beersActions";
import {ofType} from "redux-observable";
import {concat, of} from "rxjs";

const API = "https://api.punkapi.com/v2/beers";
const search = (term) => `${API}?beer_name=${encodeURIComponent(term)}`;

export function fetchBeersEpic(action$) {
    return action$.pipe(
        ofType(SEARCH),
        debounceTime(500),
        filter(({payload}) => payload.trim() !== ""),
        switchMap(({payload}) => {
            return concat(
                of(setStatus("pending")),
                ajax.getJSON(search(payload)).pipe(
                    map(resp => fetchFulfilled(resp))
                )
            )
        })
    );
}
```

You may have much more complicated filtering logic, which can be placed in a separate file or in a different function, since this is a pure function. This will do for this demo. That single line will prevent any search actions that have an empty `payload` from making it into the `switchMap`, which is responsible for doing the side effect.

If we check this in the browser, we can search for "ship" just like we did before. If we delete all the characters, nothing will happen. We can continue searching as normal.
