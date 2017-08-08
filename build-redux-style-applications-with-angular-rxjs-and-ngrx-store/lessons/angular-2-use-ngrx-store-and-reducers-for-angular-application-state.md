What we've done here with `startWith` in `scan` is actually a very, very common pattern where you have an initial value, and then you want to change the value based on some other values that come through, and you want to keep track of it.

There is a library that can help us with this, so we don't manage all of this ourselves, and we can move all of what we have done into a different file. I'm going to create in my source a new filed called `reducers.ts`.

In my `reducers.ts`, I'm going to set a function called `clock`. This is going to be our clock reducer. `clock` takes a state. Instead of using `startWith`, we'll set an initial value of `new Date`. Then for now I'm going to return the state.

####reducers.ts
```javascript
export const clock = (state = new Date())=> {
    return state
};
```

If this function is called, it's going to set this state to `new Date` and return the `state`. To use this reducer or this clock function, we need to actually `bootstrap` it into our application, which means I need to add something to the list of my dependencies in `main.ts`.

My dependencies are an array after that component, and I'm going to say, `provideStore`. 

####main.ts
```javascript
bootstrap(App, [
    provideStore
]).then(
    ()=> console.log('app running...'),
    err=> console.log(err)
);
```

Where `provideStore` is going to come from is from `ngrx/store`. I'll go ahead and provide store. 

```javascript
import {provideStore} from '@ngrx/store';
```

The store that I want to provide is an object with key value pairs to those reducers.

I want to get `clock`, and I need to `import` `clock`. I'll import from reducers and I'll `import` `clock`. 

```javascript
import {clock} from './reducers';
```

We've hooked this up where we have this store that uses the clock reducer. This is all basically configuration stuff.

```javascript
bootstrap(App, [
    provideStore({clock})
])
...
```

Get used to it, and don't worry too much about it other than passing the reducers into this object and then providing them to the store. Then that gives you immediate access after you `import` `store` from `ngrx`.

####app.ts
```javascript
import {Store} from '@ngrx/store';
```

We can use angular twos, dependency injection to grab the `store` using a type. Our clock instead of this big stream can be `store.select`, and then a string of `clock` to grab whatever comes from that clock reducer.

```javascript
constuctor(store:Store) {
    this.clock = store.select('clock');
    ...
}
```

I'll hit save. I'll refresh, and then you can see we have this new date and it's frozen at that time that the reducer was called and the new date was set.

```
Wednesday, March 23, 2016, 7:34:21 pm
```

With this stream, I'm going to get rid of everything and start with a scan. I'm going to move this, 

```javascript
const date = new Date(acc.getTime());

if(curr === 'second'){
    date.setSeconds(date.getSeconds() + 1);
}

if(curr === 'hours'){
    date.setHours(date.getHours() + 1);
}

return state;
```

over to my `reducers.ts`.

Instead of doing these `if` statements, I'm actually going to switch on an `action` type. We'll have actions come through and actions have a `type` property on them. `type` in here is what I can pass along. 

####reducers.ts
```javascript
export const clock = (state = new Date(), {type})=> {
    ...
};
```

Instead of to start with in scan, 

####app.ts
```javascript
...
observable.interval(1000).mapTo('second')
)
    .startWith(new Date())
    .scan((acc, curr)=> )
```

I'm going to `subscribe` to this stream. The `type` is what comes in, and I'm going to say, `store.dispatch({type})`. 

```javascript
...
observable.interval(1000).mapTo('second')
)
    .subscribe((type)=>{
        store.dispatch({type})
        })
```


We're going to take type of `hour`, this type of `second`, and it gets pushed into `subscribe`, and gets `dispatched` to the `store`, which gets handled in the reducer.

We have the `type` here where I can `switch` on the `type`. If the type is `'second'`, we want to do cut `date.setSeconds`, paste it into the `seconds` case, and `return date`. If the type is `hour`, we want to do cut `date.setHours`, paste it into the `hours` case, and `return date`. We'll delete all of the `if` statements. Lastly replace `acc` with `state`. Then this:

####reducers.ts
```javascript
export const clock = (state = new Date(), {type})=> {
    const date = new Date(acc.getTime());
    if(curr === 'second'){
        date.setSeconds(date.getSeconds() + 1);
    }

    if(curr === 'hours'){
        date.setHours(date.getHours() + 1);
    }

    return state;
}
```
will turn into this:

```javascript
export const clock = (state = new Date(), {type})=> {
    const date = new Date(state.getTime());
    switch(tye){
        case 'second':
            date.setSeconds(date.getSeconds() + 1);
            return date;
        case 'hour':
            date.setHours(date.getHours() + 1);
            return date;
    }
    return state
};
```
We've refactored this into something that can, when I refresh. You can now see the time is ticking away one second. When I click update, it's going by each hour.

```
Wednesday, March 23, 2016, 7:34:21 pm
Wednesday, March 23, 2016, 7:34:22 pm
Wednesday, March 23, 2016, 7:34:23 pm
Wednesday, March 23, 2016, 7:34:24 pm
Wednesday, March 23, 2016, 8:34:24 pm {clicked}
Wednesday, March 23, 2016, 9:34:24 pm {clicked}
```

To review that, what's going on is in our `subscribe`, we're getting a type whether it's `hour` when I click or `second` when one second passes by. Then we're saying `store.dispatch` an object with the `type` property on it that's set to either `hour` a `second`. That comes through our reducer.

Our reducer was configured here where we say, grab the reducer, hook it into our store. So that when it comes through this reducer the first time, the `state` is set to a `new Date`. Then from then on out, if a type comes through, we say, "Is it a second? Then do our `setSeconds` logic. Is it an hour? Then do our `setHours` logic in return."

We have that same configuration as if we're doing a `startWith` and a `scan`. It's that now we can extract all of that logic, and make it reusable and portable through this clock reducer function.