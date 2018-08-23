While a quantized scale will map a continuous `domain` to a discrete `range`, sometimes you also have a specific set of values in your `domain` that you know you want to map to specific values in the output `range`.

For that, we're going to change from a quantized scale to an ordinal scale. Now we change this to `scaleOrdinal()`, update our variable name. Now we'll keep our output range of red, white, and green, but we wouldn't be using this if our input `domain` was numbers between 0 and 100. We would use this if we had discrete values.

Maybe we have a rating for performance on a test. We may say `poor`, `good`, and `great`. Some dimension of our input data here is going to have properties that hold the values `poor`, `good`, and `great`. When we see those, we want to map them directly to `red`, `white`, and `green`.

#### app.js
```javascript
var ordinalScale = d3.scaleOrdinal()
  .domain(['poor', 'good', 'great'])
  .range(['red', 'white', 'green']);

console.log(ordinalScale('good')); //output white
console.log(ordinalScale('great')); //output green
console.log(ordinalScale('poor')); // output red
```

If we update this, instead of passing in `22`, we'll pass in `good`. You'll see that we then get `white` as the output. We can do a couple more here. We'll do them in a different order, just so we can see that this is based on the data.

There, you see `good` is mapped to `white`, `great` is mapped to `green`, and `poor` is mapped to `red`. It's really just done by index, or position in these arrays. You can imagine this as something where you've got a non-numeric value that you need to map to a specific output value.