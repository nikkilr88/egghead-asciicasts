Let's add a range input widget to refine results between two numeric values. Here, we'll use it for the `price` attribute, adding the `container` on the index page first. In the `left-column`, below `categories`, we add a `<div>` with an `id` of `price`.

#### index.html
```html
<main>
  <div id="left-column"></div>
    <h5 class="filter-title">Brands</h5>
    <div class="filter-widgets" id="brands"></div>
    <h5 class="filter-title">Categories</h5>
    <div class="filter-widgets" id="categories"></div>
    <h5 class="filter-title">Price</h5>
    <div class="filter-widgets" id="price"></div>
  <div id="right-column">
    <div id="hits"></div>
  </div>
</main>
```

Then, in the `app.js` file, `search.addWidget`, `instantsearch.widgets`, then `rangeInput`. We specify the `container`, `price`, and the `attribute` name, `price` again. 

#### app.js
```js
// add widget

search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    attribute: "price"
  })
)

search.start();
```

Reloading the page, we already have a fully functioning `rangeInput` widget.

![rangeInput widget displayed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554498344/transcript-images/algolia-refine-a-dataset-using-a-numeric-range-in-instantsearch-js-with-the-range-input-widget-fully-functioning-range-input-now-displayed-in-browser.jpg)

If typing 300 in the upper boundary and hitting "Go", the results are now refreshed. The cool thing is that it also works the other way around. When another filter is active, then the placeholder of the two range inputs are refreshed to guide the users.

Under brands, filtering on Apple, we don't have from 1 to 5,000, but from 9 to 4,000. 

Another option available for this widget is to customize the labels of the button and of the text in between inputs. Let's sweep the button label. There we go.

```js
// add widget

search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    attribute: "price",
    templates: {
      submitText() {
        return "Filter";
      }
    }
  })
);

search.start();
```


A couple of other useful options are the min and max to restrict the range. Let's try `min` and add it, `200`. Now,let's add `max`. Now, those results will be forced to have a price between `200` and `400`. The user will only be able to refine further between those boundaries. 

```js
// add widget

search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    attribute: "price",
    templates: {
      submitText() {
        return "Filter";
      }
    },
    min: 200,
    max: 400
  })
);

search.start();
```

For our project, we'll only keep the default settings. Let's remove those.

```js
// add widget

search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    attribute: "price"
  })
);

search.start();
```
