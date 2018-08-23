Once you learn how to use D3 transitions, you begin thinking about ways to define them in ways that will allow you to reuse the same transition on multiple elements. To demonstrate how to do this, we've got a simple example here with a style called `black`, which is just a 50x50 pixel gray square. We've got two of those defined here, and we also have an extra class defined on each of these, `a` and `b`, so that we can address them individually. 

#### index.html
```html
<style>
    .block {
      background: lightgray;
      border: 1px solid black;
      width: 50px;
      height: 50px;
      margin-bottom: 1em;
    }
</style>

<div class="block a"></div>
<div class="block b"></div>
```

We'll switch over here to our `app.js` file.

Previously we've seen transitions defined on selections, but there's actually a `d3.transition` method. Here we'll say `d3.transition` and give it a `delay` of 1 second, and a `duration` of 1 second. 

```javascript
var t = d3.transition()
  .delay(1000)
  .duration(1000);
```

Then we'll see how we can reuse this `transition` instance across our different blocks. 

The first thing that we'll do is we'll select all of our blocks by saying `d3.selectAll('.block')`, and then once we have that selection, we can then say `transition` and actually pass in this `transition` instance like that.

```javascript
d3.selectAll('.block')
  .transition(t)
```

In this case we want that `transition` to effect the `width` of our block, and so we're going to say `width` is `400` pixels. 

```javascript
d3.selectAll('.block')
  .transition(t)
  .style('width', '400px');
```

If we save this and it runs, we'll see that our blocks do grow to `400` pixels in `width`, so we know that things are working. 

Now the next thing I want to do is affect just one of these blocks, so we'll say `d3.select('.a')`, so that's just going to be our first block there. We'll again pass in the `transition` instance to the `transition` method, but this time we're going to make the `background-color` fade to `orange`.

```javascript
d3.select('.a')
  .transition(t)
  .style('background-color', 'orange');
```

We'll just copy this block of code, and make this block address the `b` block, and we'll change this `background-color` to `blue`. Save that. 

```javascript
d3.select('.b')
  .transition(t)
  .style('background-color', 'blue');
```

Now we see that those transitions are in fact getting reused. You can see how this is useful because we've defined it one time up here, we've defined the `delay` and the `duration` in just one place, and now we're using it in three places. This is a totally valid approach, but there is something to be aware of when you use this approach.

If we wanted this function to run in response to a button click instead of when the page simply loads, let's see what we would run into. 

So we're just going to create a `button` here called Go that calls a function named `go`, and we'll come over here and we'll just take all of these and wrap them inside of our function. Now we have a function named `go`, and within that function we use all of our transitions, and we're going to call that function when we click this button here.

#### index.html

```html
<button onclick="go()">Go</button>
```

#### app.js

```javascript
function go () {
  var t = d3.transition()
    .delay(1000)
    .duration(1000);

  d3.selectAll('.block')
    .transition(t)
    .style('width', '400px');

  d3.select('.a')
    .transition(t)
    .style('background-color', 'orange');

  d3.select('.b')
    .transition(t)
    .style('background-color', 'blue');
}
```

If we come over here and click our Go button, that didn't' look right. That was a lot faster than one second in duration, and there was no delay at all. If we see that again, come here, we reload the page, and we click Go. It's not respecting that, and what's going on here is that we're seeing a side effect of the fact that when you call `d3.transition`, it's creating it and starting it. Once this `transition` ends, so essentially two seconds after this page loads, that `transition` is destroyed and it no longer exists.

If we reload this page and then quickly click that, you can see that we do get to use our `transition` that we defined, but if we wait too long, we don't. This can be really unpredictable, and really confusing, and so if you wanted to use this approach, you just have to make sure that you're using it as soon as it's created, you can't create it ahead of time.

Another approach is to use the `transition.call` method which is similar to `selection.call`, where you're able to specify a function that should be called and any optional parameters that should be passed to it. In this case we'll create a function called `configure`, and just like `selection.call` passes the selection as the first argument, `transition.call` passes the `transition` as the first argument.

The first argument will be `t`, and then we're going to specify a `delay` and a `duration` parameter, so that those things can be configured when using this with `transition.call`. 

```javascript
function configure (t, delay, duration) {
 
}
```
In the body of the function, we'll simply take the transition instance that's passed in and call its `delay` method and `duration` method, passing in the arguments provided. 

```javascript
function configure (t, delay, duration) {
  return t.delay(delay).duration(duration);
}
```
Now if we create a new function, and we'll call it `goNow`, we're going to `selectAll` of our blocks, and then we'll call `.transition` as normal.

We're calling the transition method of the selection, and then we're calling the `.call` method of the `transition` and telling it that we want it to call the `configure` method and pass in the arguments that we have provided here. Then finally, `transition.call` is going to return that `transition` so we can again add another property on there, and so we'll tell it to make the `height` `300` pixels tall. 

```javascript
function goNow () {
  d3.selectAll('.block')
    .transition()
    .call(configure, 1000, 1000)
    .style('height', '300px');
}
```

We'll come over here, and we will create a new button that will call our goNow function.

#### index.html
```html
<button onclick="goNow()">Go Now</button>
```

This page has refreshed, we'll give a couple seconds to make sure we're not catching that transition before it dies, and now we'll go ahead and click Go Now, and we in fact get a nice delayed, slow transition that grows our blocks to 300 pixels tall.