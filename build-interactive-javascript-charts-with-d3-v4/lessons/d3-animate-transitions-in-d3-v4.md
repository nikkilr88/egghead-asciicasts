We have a very simple example here with a div with an `id` of `block`, which we're styling up here with a basic style to set its `width` and `height` and `background`. 

#### index.html
```html
<style>
    #block {
      background: lightgray;
      border: 1px solid black;
      width: 100px;
      height: 100px;
    }
</style>

<div id="block"></div>
```

If we're coming over to our empty JS file, we're going to select our `block` div and then set a `style`. We're going to set its `width` to be `400` pixels.

#### app.js
```javascript
d3.select('#block')
  .style('width', '400px')
```

If we save that, we can see that it actually is that size. 

![400px wide](../images/d3-animate-transitions-in-d3-v4-400.png)

We'll set its `height` to be `600` pixels. 

```javascript
d3.select('#block')
  .style('width', '400px')
  .style('height', '600px')
```
When we run that, we'd see those results immediately. If we want to animate that change over time, D3 makes it super easy. We can use a method that's on the selection objects called `transition`

If we simply add this call to `transition` here and save this, we'll see that we do in fact get an animated change of our `width` and `height` styles.

```javascript
d3.select('#block')
  .transition()
  .style('width', '400px')
  .style('height', '600px')
```

The time that that `transition` takes is using the built in default within D3. If we want to control how long it takes, we can use the `duration` method and pass in a number in milliseconds of how long we want that `transition` to take. Once we call the `transition` method on a selection, what we're actually getting back after that is the `transition` itself.

We're going to use this `duration` method on the `transition` object to set that `duration`. If we want to keep our transition from starting immediately, we can also set a `delay`. We'll set a `delay` of three quarters of a second so that now when our page loads it will wait three quarters of a second. Over 500 milliseconds it will update the width and the height.

```javascript
d3.select('#block')
  .transition()
  .duration(600)
  .delay(750)
  .style('width', '400px')
  .style('height', '600px')
```

The easing that the transition is using is also the built in default. If we want to specify that, we can use the `ease` method on our `transition` object and pass in any of these pre-built easing types that D3 defines.

The first one we'll look at is `d3.easeBounceOut`, which causes a nice little effect where it looks like it's bouncing up against the bounds of whatever values you've sent it to. 

```javascript
d3.select('#block')
  .transition()
  .duration(600)
  .delay(750)
  .ease(d3.easeBounceOut)
  .style('width', '400px')
  .style('height', '600px')
```

There's one called `d3.easeCubicOut`, which is a nice slow transition that really eases into the final position.

Then everybody's favorite that's not really practical for much, is the elastic transition, which acts more like a spring when it gets to where it is. It's easier to tell what's going on with this one with a little bit longer of a duration, so we can see there that it really springs back and forth past the target before settling in the final destination.

We'll switch this back to bounce, because I like that one. We've got a nice little transition here where our square is growing. Its `width` and `height` are changing at the same time. What if we would like to sequence that so that its `width` expands before the `height` expands?

Fortunately for us, D3 makes that exceptionally easy as well, because when we have this `transition` object that comes back from the `transition` method, we can actually call `transition` on that again and it will automatically sequence that for us.

If we copy these lines down here and save that, now we can see that our `width` first changes and then our `height`. I'll change the indentation of this code so it's a little bit easier to read. 

```javascript
d3.select('#block')
  .transition()
    .duration(600)
    .delay(750)
    .ease(d3.easeBounceOut)
    .style('width', '400px')
  .transition()
    .duration(600)
    .ease(d3.easeBounceOut)
    .style('height', '600px')
```

We're selecting our `block` div, starting a `transition`, or setting an initial `transition` with a duration of 500 milliseconds and a three quarter second delay. That's going to affect the `width`.

Then once that one's finished, we'll start a new `transition`. We don't actually need this delay here because the sequencing is going to be handled by the order of the code itself. We can get rid of that and save that. Now we can see that our height is animated right after the width animation is finished.

Maybe we also want the background to fade to red while the `height` `transition` is playing. If we had a call here to `style` and set `background` as the style name and `red` as the style value, it doesn't actually work. 

```javascript
.transition()
    .duration(600)
    .ease(d3.easeBounceOut)
    .style('height', '600px')
    .style('background', 'red')
```

We'll make this duration a little longer so we can actually verify what's going on a little easier.

We can see that the `red` actually snaps in at the beginning of that `transition` and doesn't fade. The reason for that is we actually need to be a little bit more specific when we're doing transitions and things like that sometimes, say background color in this case, because D3 uses that to infer how to tween or animate those properties.

To show that this implicit transition chaining is infinitely configurable, we'll go ahead and move this background color transition to its own step by adding another call to `transition` here. We'll change these durations. Let's go ahead and change the color to `purple` since that's a little easier on the eyes.

If we get rid of the ease on the background color transition and save that, it's a little bit hard to see. 

```javascript
d3.select('#block')
  .transition()
    .duration(600)
    .delay(750)
    .ease(d3.easeBounceOut)
    .style('width', '400px')
  .transition()
    .duration(600)
    .ease(d3.easeBounceOut)
    .style('height', '600px')
  .transition()
    .duration(2000)
    .style('background-color', 'purple')
```

The color is actually sort of bouncing because it's actually inheriting that `easeBounceOut` from the previous transition.

Anything that's not specifically set on the next transition will be inherited from the previous one. We'll set that to an `easeQuadOut`, which is one of those smooth transitions rather than bouncing because a bouncing color just doesn't seem like a good idea.

```javascript
d3.select('#block')
  .transition()
    .duration(600)
    .delay(750)
    .ease(d3.easeBounceOut)
    .style('width', '400px')
  .transition()
    .duration(600)
    .ease(d3.easeBounceOut)
    .style('height', '600px')
  .transition()
    .duration(2000)
    .ease(d3.easeQuadOut)
    .style('background-color', 'purple')
```

That's it. It's really, really easy to add animated transitions to D3 changes and to even sequence them so that you can control things in a really fine-grained manner.