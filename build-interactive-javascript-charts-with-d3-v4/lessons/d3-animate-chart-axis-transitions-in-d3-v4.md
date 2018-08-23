Now we have our nice animated column chart that will slide out items that no longer are present, update existing items, and then slide in any new items. All of this is built with the assumption that all of our data is going to fall within the `domain` of 0 to 100 on the `yScale`.

Sometimes that's a safe assumption, and other times it's not, so let's look at how we can handle data with a variable `domain`. To do this, we're first going to update our data. We'll say that `David` somehow managed to `score` `144` on his `math` test, he's super good at math.

We're also going to bump `Emily`'s science `score` down to `55`, just so that our `science` scores all are pretty low, so we're going to update it accordingly to the data. 

#### app.js
```javascript
var data = [
  {name: 'Alice', math: 37,   science: 62,   language: 54},
  {name: 'Billy', math: null, science: 34,   language: 85},
  {name: 'Cindy', math: 86,   science: 48,   language: null},
  {name: 'David', math: 144,  science: null, language: 65},
  {name: 'Emily', math: 59,   science: 55,   language: 29}
];
```

The first thing that we need to do is get a reference to the Y axis that we're already creating.

I'm going to say `var yAxis` = and then we can use our existing code here that creates the axis. 

```javascript
var yAxis = svg
  .append('g')
  .call(d3.axisLeft(yScale));
```

The next thing we'll do is we'll come down to `var update`, and we'll put this after the `exit()` and `remove` animation, because we want the items to slide out, and then we want to `update` our axis at the same time that we're updating our columns.

What we're going to do here is say `yScale.domain`, so we're just sort of going to reassign the `domain`, or update the `domain` of our existing scale. We're going to still assume that it starts at 0 but to find the maximum, we're going to say `d3.max` which is a utility function that D3 provides.

We're going to pass in our `data`, and then for our accessor function here, we're going to say `d.subject`, or `d[subject]` like we've done before. That's the same thing we're doing here to get our data, in this case we're telling `d3.max` to use whatever field is specified by the current `subject`.

```javascript
yScale.domain([0, d3.max(data, d => d[subject])]);
```

Now that we have updated the `domain` itself, we need to actually animate our axis update. We're going to say `yAxis`, which is the reference we just created to our existing axis, and then we're going to use `transition` and pass in `t` again, just the same way that we're doing here when we update our columns.

```javascript
yAxis
  .transition(t)
```

We're also going to mimic the same `delay` since we want this to happen after items have slid out. Then we're essentially going to copy this call that we have here, so this `selection.call` method is going to get copied from there, and brought down here, because this essentially says take the scale and apply it to our axis.

```javascript
yAxis
  .transition(t)
  .delay(1000)
  .call(d3.axisLeft(yScale));
```

We're just going to redo that, and we've got the `transition` already applied. Now, if we save this, we see that our scale updates. If we go to science, and remember science is where we gave everybody a pretty low score, you can see now our axis maximum is above 140.

If we go to science we get the slide out, now everything updates including the axis, and our axis maximum is 62 which matches the maximum science score. If we go to language, were going to get it back updated to, let's see, 85 is the maximum language score.

Now we can go back to math, and everything updates to handle that large outlier there as well. That's all you need to do to handle a dynamic access range and update those values as well.

You need to store a reference to your axis, and then when your data updates, you need to calculate a new `domain` for the data, or based on the data, and then simply update your existing axis by calling the `call` method again, but applying a `transition`.