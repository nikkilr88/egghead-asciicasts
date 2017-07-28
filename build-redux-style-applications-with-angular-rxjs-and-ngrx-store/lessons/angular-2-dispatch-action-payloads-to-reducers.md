Now that we've extracted out our types of `hour` and `second`, the next thing I want to work on are these hard coded `+ 1`'s, which I want to extract so that I can pass them in and change that if I want.

I'm going to move this `+ 1` up into this object that comes in and call it `payload`. Instead of `+ 1`, I'll say `payload`.

####reducers.ts
```javascript
export const clock = (state = new Date(), {type, payload})=>
...
    date.setSeconds(date.getSeconds() + payload);
...
    date.setHours(date.getHours() + payload);
...
```

Now in my `app.ts`, I need to pass a `payload` along, so we'll start by hard coding it. We'll hard code that to just `1`. 

####app.ts
```javascript
...
    .subscribe((type)=>{
        store.dispatch({type, payload: 1})
    })
```

Now when I refresh, we'll have this same behavior of it incrementing by one second, and when I click, it's incrementing by the hour.

```
Wednesday, March 23, 2016, 7:34:21 pm
Wednesday, March 23, 2016, 7:34:22 pm
Wednesday, March 23, 2016, 7:34:23 pm
Wednesday, March 23, 2016, 7:34:24 pm
Wednesday, March 23, 2016, 8:34:24 pm {clicked}
Wednesday, March 23, 2016, 9:34:24 pm {clicked}
```

What I want to do is move this `1` up even further into where where I `.map` to something that has a `1`. Instead of mapping to just `HOUR`, I'm going to map to an object, where the `type` is `HOUR`, and the `payload` is `1`. Then in the `observable`, I'm going to map to an object where the `type` is `SECOND` And the `payload` is `1`.

```javascript 
...
Observable.merge(
    this.click$.mapTo({type:HOUR, payload:1}),
    Observable.interval(1000).mapTo({type: SECOND, payload:1})
    )
...
```

That way, this object that comes through the `subscribe`, instead of just being a `type`, I'm going to call it an `action`. I can delete this entire object in the `dispatch`, and we'll just call that the `action`. 

```javascript
...
    .subscribe((type)=>{
        store.dispatch(action)
    })
```

That way, we've extracted everything that came through before, and it's being passed as an object with both the `type` and `payload`.

Now when I refresh, you can see I'll have the same exact behavior, one second and one hour. 

```
Wednesday, March 23, 2016, 7:34:21 pm
Wednesday, March 23, 2016, 7:34:22 pm
Wednesday, March 23, 2016, 7:34:23 pm
Wednesday, March 23, 2016, 7:34:24 pm
Wednesday, March 23, 2016, 8:34:24 pm {clicked}
Wednesday, March 23, 2016, 9:34:24 pm {clicked}
```

I could also change it so that when I click, I would update by four hours and every second it would update by three seconds.

```javascript 
...
Observable.merge(
    this.click$.mapTo({type:HOUR, payload:4}),
    Observable.interval(1000).mapTo({type: SECOND, payload:3})
    )
...
```

That's now configurable, so whenever I refresh, you can see three seconds, three seconds, four hours.

```
Wednesday, March 23, 2016, 7:34:21 pm
Wednesday, March 23, 2016, 7:34:24 pm
Wednesday, March 23, 2016, 7:34:27 pm
Wednesday, March 23, 2016, 7:34:31 pm
Wednesday, March 23, 2016, 11:34:31 pm {clicked}
Thursday, March 24, 2016, 2:34:31 am {clicked}
```