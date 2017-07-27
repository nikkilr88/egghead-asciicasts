Now to change the behavior so that when the `Observable` pushes through, it only updates one second, and when the `click$` goes through, it'll update an entire hour.

What we have to do is use something like `.mapTo`, and we're going to send along a string of `second`. I'll say `.mapTo` and we'll send along a string of `hour`. 

####app.ts
```javascript
...
    this.click$.mapTo('hour')
    Observable.interval(1000).mapTo('second')
...
```

I need to go ahead and `import` `mapTwo`.

```javascript
import 'rxjs/add/operator/mapTo';
```

Now, what comes through in this `curr` is either second or hour, because those are the things being pushed through in this `Observable.merge`, either hour or second will come through into my scan function.

I can go ahead and check, and see if the current is second, `if(curr === 'second'). If it is, we'll just go ahead and update the seconds. Or if the current is equal to hour, `if(curr === 'hour')`, let's go ahead and copy `date.setSeconds...`, paste it, and change `seconds` to `hours`.

```javascript
.scan((acc, curr)=> {
    const date = new Date(acc.getTime());

    if(curr === 'seconds'){
        date.setSeconds(date.getSeconds() + 1);
    }

    if(curr === 'hour'){
        date.setHours(date.getHours() + 1);
    }

    return date;
})
```

Now when I hit save and I refresh, you can see the time keeps ticking along, one second per time, because second is coming through and it's hitting this `seconds` if block. But if I click update, it's updating the hours, so I can move the time much faster, because it's sending the word "hour" through. It hits the `hours` if block and it sets the hours on the date to plus one and then returns the date.

```
Thursday, March 24, 2016, 7:02:00 PM 
Thursday, March 24, 2016, 7:02:01 PM 
Thursday, March 24, 2016, 7:02:02 PM 
Thursday, March 24, 2016, 8:02:02 PM {clicked}
Thursday, March 24, 2016, 9:02:02 PM {clicked}
```