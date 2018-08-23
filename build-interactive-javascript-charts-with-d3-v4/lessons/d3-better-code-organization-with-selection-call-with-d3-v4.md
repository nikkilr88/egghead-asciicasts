D3's declarative API lends itself to large blocks of chained method calls like we see here.

#### app.js
```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).style('transform', 'scaleX(2)');
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .style('fill-opacity', 0.5);
    })
    .on('mouseout', function (d, i, elements) {
      d3.select(this).style('transform', 'scaleX(1)');
      d3.selectAll(elements)
        .style('fill-opacity', 1);
    });

```
While there's nothing inherently wrong with that, it can become a little bit unreadable at times, and sometimes you end up locking code inside of these long chains when it would be better served to be moved out into a function so that it can be reused elsewhere.

Let's look how to do that with our `mouseover` and `mouseout` handlers and move that code into some external functions.

First we'll do this for the code that scales our active bars horizontally. This is done using the call method of D3 selections, which allow you to pass a selection to a function.

The first thing we'll do is write a function that will handle this horizontal scaling of our active bars. We'll come up here and we'll write a new function called `scaleBar`.

Any function that's called by selection.call is going to receive the `selection` as the first argument and then any optional arguments that were passed to it.

The first argument here is going to be called `selection`, and since we know that we're going to be scaling things, we'll call our second argument `scale`. 

```javascript
function scaleBar(selection, scale){

}
```

Since this is the code that we're trying to recreate, we'll copy this here, and we'll just say `selection.style('transform', 'scaleX(' + scale + ')')`, and then make our value here dynamic.

```javascript
function scaleBar (selection, scale) {
  selection.style('transform', 'scaleX(' + scale + ')');
}
```

This code says, take any `selection` that gets passed in here, set its `transform` `style`, call `scaleX`, and use that `scale` that's passed in.

Now we need to update our code here, so that instead of setting the `style` directly we're going to say `.call`, and we'll call `scaleBar`, and we'll pass it the scale of `2`.

```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar,2);
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .style('fill-opacity', 0.5);
    })
    .on('mouseout', function (d, i, elements) {
      d3.select(this).style('transform', 'scaleX(1)');
      d3.selectAll(elements)
        .style('fill-opacity', 1);
    });
```
Now that we have that set up here, let's do the same thing in our `mouseout` handler, but we obviously want to set the scale back to `1` there. 

```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar,2);
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .style('fill-opacity', 0.5);
    })
    .on('mouseout', function (d, i, elements) {
       d3.select(this).call(scaleBar,1);
       d3.selectAll(elements)
        .style('fill-opacity', 1);
    });
```

We can save that and come over here and see that our code does still work.

Since we've externalized the specifics of this scale, we can then easily change this. Maybe we only want to scale it out 1.5 times. 

```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar,1.5);
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .style('fill-opacity', 0.5);
    })
    .on('mouseout', function (d, i, elements) {
       d3.select(this).call(scaleBar,1);
       d3.selectAll(elements)
        .style('fill-opacity', 1);
    });
```
There we see we do in fact have that.

Not only have we made this more dynamic, but we've also made it more maintainable, in that we have this `scaleBar` function, that we could pass any selection to this and it would transform the scale of it. In fact, if we put this same code at the end of our selection of the elements that are not hovered, we could give them their own scaling as well.

Let's make sure that the active item is scaled more than the non-active. 

```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar,2);
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .call(scaleBar,1.5)
        //.style('fill-opacity', 0.5);
    })
    .on('mouseout', function (d, i, elements) {
       d3.select(this).call(scaleBar,1);
       d3.selectAll(elements)
        .style('fill-opacity', 1);
    });
```

Then, if we go over here now, we can see that everything does get scaled out when you start hovering, but the active item is bigger. That's not exactly useful, but it demonstrates the concept.

Now let's go ahead and convert this opacity styling to a separate function that can be called from selection.call as well. This time we'll call it `fade`, and again, `selection`'s going to be our first argument and `opacity` will be the second.

Then we're just going to call `style` on the passed in `selection` and set its `fill-opacity` to whatever value is passed in for `opacity`.

```javascript
function fade (selection, opacity) {
  selection.style('fill-opacity', opacity);
}
```

We'll update our code here to use the `call` method and specify that we want to call `fade` with an argument of `0.5` for the opacity parameter. We'll do the same thing in our `mouseout`, but with an opacity of `1`. 

```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this).call(scaleBar,2);
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .call(fade,0.5)
    })
    .on('mouseout', function (d, i, elements) {
       d3.select(this).call(scaleBar,1);
       d3.selectAll(elements)
        .call(fade,1)
    });
```

Now we can see we're back to our working example, but our code has been moved out of our long chain and into these nice readable functions.

Another benefit to using `call`, in addition to the reusability and readability aspect, is that it makes things chainable because it also returns the selection that it's called on.

To demonstrate that, we'll create another function here called `setFill`, and this time it's going to be used to set the fill style, so we'll provide a `color` parameter. 

```javascript
function setFill (selection, color) {
  selection.style('fill', color);
}
```

Now we can come down here and take our code that is currently scaling the active item, and add a `call` to `setFill`. We'll pass in `teal`, and we'll do the same thing for the `mouseout` where we set it back to `lightgreen`.

```javascript
bar.append('rect')
    .style('width', d => d.score)
    .attr('class', 'bar')
    .on('mouseover', function (d, i, elements) {
      d3.select(this)
        .call(scaleBar,2);
        .call(setFill, 'teal);
        
      d3.selectAll(elements)
        .filter(':not(:hover)')
        .call(fade,0.5)
    })
    .on('mouseout', function (d, i, elements) {
       d3.select(this)
         .call(scaleBar,1);
         .call(setFill,'lightgreen');
         
       d3.selectAll(elements)
        .call(fade,1)
    });
```

Now we have this code that is passing this selection to two different functions, and we can see that we still get the expected behavior. The contrast on that isn't great, so let's change from `teal` to `orange`, and there we go. 

![Teal to Orange](../images/d3-better-code-organization-with-selection-call-with-d3-v4-orange.png)

You can see how it's very easy to update the behavior simply by changing a parameter.

Now we have three lines here that are very readable and simple, that select an item or items and then pass that selection to multiple functions that will update those selections accordingly.