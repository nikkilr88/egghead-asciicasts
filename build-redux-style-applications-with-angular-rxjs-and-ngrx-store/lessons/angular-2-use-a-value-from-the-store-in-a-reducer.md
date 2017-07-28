Finally, since we don't want all of our time travelers lost somewhere in time, we want to be able to recall them to the current time. Let's go ahead and set up a `button` to recall. Let's call it `recall`, handle its `click`, and we'll say `"recall$.next()"`, as usual. 

####app.ts
```html
...
    <div (click)="person$.next() *ngFor="person of people | async">
        {{person.name}} is in {{person.time | date:'jms'}}
    </div>

    <button (click)="recall$next()">Recall</button>
...
```

We'll set up the subject for that, `recall$`, it's a `new Subject()`.

```javascript
export class App {
    ...
    recall$ = new Subject();
    ...
}
```

Our recalls are going to be mapped to, or using with the other store, using `withLatestFrom`. We'll just do it in the `merge`. We'll say `this.recall$` `withLatestFrom()`, and we want to get the latest from the `time`. 

```javascript
...
    Observable.merbe(
        this.click$,
        this.seconds$,
        this.person$,
        this.recall$
            .withLatestFrom(this.time)
    )
...
```

The store selected clock, we want to get the latest from that time and use that. The way we do that is the next parameter here is a function where the first argument would be the latest value from `this.reacall$` and the next argument would be the latest value from `this.time`.

We're not going to use the first argument, and when you don't use the first argument, you, just as a convention, you write `_`, saying, "Hey, I'm not going to use that, so don't worry about it."" But I do want to use the second one.

If you're going to use both of them, you usually say `(x,y)` or name them something and combine them somehow. But I'm not going to use the first one, so I'm just going to say underscore just to let them know I'm not going to use it. I'm just going to push out Y, meaning pushing out the time.

```javascipt
...
    this.reacall$
        .withLatestFrom(this.time, (_, y)=> y)
...
```

I'll go ahead and `.map` that. This is the `time`, remember the time is coming from `this.time`, which is the second argument here, which is projected pushed out here, and now is the time. When I map this to a `type` -- let's surround this with parens before I forget -- of `recall` and a `payload` of `time`.

```javascipt
...
    this.reacall$
        .withLatestFrom(this.time, (_, y)=> y)
        .map((time)=> ({type:RECALL, payload: time}))
...
```

We need to create `RECALL`. Let's go ahead and `import` it. I also need to import before I forget, `withLatestFrom`, because it's an operator that's not yet imported.

```javascript
import 'rxjs/add/operator/withLatestFrom';
import {RECALL} from './reducers';
```

We'll go ahead and create the recall type. I'll just duplicate `ADVANCE`. I'll rename it to `RECALL`.

```javascript
export const RECALL = 'RECALL';
```

The recall will be down on the `people`, because I'll want to recall all of them. We'll say `case RECALL`. I'm going to `return` the `state.map` where I go through each `person`. I'm going to `return` a new object where we grab the `name` of `person.name`, and the `time` is the `payload`. Because remember, that payload coming through is coming through the `withLatestFrom` `time` of `this.time` in `app.ts`, which is the selected value of that clock.

####reducers.ts
```javascript
export const people ...
...
    case RECALL:

        return state.map((persson)=>{
            return {
                name: person.name,
                time: payload
            }
        });
...
```

When I refresh and start clicking on the people when they show up to move them ahead in time, move them ahead. Once I click recall, they'll all sync back to the current time that was up there, I'll click on Sarah, recall Sarah, click on Nancy. It's recalling all of them and pushing them to the current time.