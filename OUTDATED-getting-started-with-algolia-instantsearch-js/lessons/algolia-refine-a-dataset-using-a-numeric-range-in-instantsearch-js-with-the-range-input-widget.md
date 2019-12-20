Instructor: [00:00] Let's add a range input widget to refine results between two numeric values. Here, we'll use it for the price attribute. Adding the container on the index page first, in the left column, below categories, we add a `div` with an `id` of `price`.

#### index.html

```html
<main>
  <div id="left-column">
    <div class="filter-widgets" id="brands"></div>
    <div class="filter-widgets" id="categories"></div>
    <div class="filter-widgets" id="price"></div>
  </div>
  <div id="right-column">
    <div id="hits"></div>
  </div>
</main>
```

[00:16] Then, in the `app.js` file, `search.addWidget`, `instantsearch.widgets`, then `rangeInput`. We specify the `container`, `"#price"`, and the `attributeName`, `"price"` again.

#### app.js

```js
search.addWidget(
  instantsearch.widgets.rangeInput({
    container:"#price"
    atttributeName:"price"
  })
)

search.start();
```

Reloading the page, we already have a fully functioning `rangeInput` widget.

![RangeInput widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/refine-a-dataset-using-a-numeric-range-in-instantsearch-js-with-the-range-input-widget.jpg)

[00:37] If typing 300 in the upper boundary and hitting "Go," the results are now refreshed. The cool thing is that it also works the other way around. When another filter is active, then the placeholder of the two range inputs are refreshed to guide the users.

[00:54] Here, filtering on Apple, we don't have from 1 to 5,000, but from 9 to 4,000. We need to add a `header` template to complete the setup of this widget, so `templates`, `header`, and `"Price"`.

```js
search.addWidget(
  instantsearch.widgets.rangeInput({
    container:"#price"
    atttributeName:"price"
    templates: {
      header: "Price"
    }
  })
);
```

Looks better.

![Price header added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/refine-a-dataset-using-a-numeric-range-in-instantsearch-js-with-the-range-input-widget-price-header-added.jpg)

[01:12] Another option available for this widget is to customize the labels of the button and of the text in between inputs. Let's sweep the button label. The key is `labels`, then `submit`. Let's change the default "Go" to "`filter`." There we go.

```js
search.addWidget(
  instantsearch.widgets.rangeInput({
    container:"#price"
    atttributeName:"price"
    templates: {
      header: "Price"
    },
    labels: {
      submit: :"filter"
    }
  })
);
```

![Buttons changed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/refine-a-dataset-using-a-numeric-range-in-instantsearch-js-with-the-range-input-widget-buttons-changed.jpg)

[01:28] A couple of other useful options are the min and max to restrict the range. Let's try `min` and add it, `200`. Now, let's add `max` of `400`.

```js
search.addWidget(
  instantsearch.widgets.rangeInput({
    container:"#price"
    atttributeName:"price"
    templates: {
      header: "Price"
    },
    labels: {
      submit: :"filter"
    },
    min: 200,
    max: 400
  })
);
```

Now, those results will be forced to have a price between 200 and 400.

![Min and Max added to price widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/refine-a-dataset-using-a-numeric-range-in-instantsearch-js-with-the-range-input-widget-Min-Max-added.jpg)

The user will only be able to refine further between those boundaries. For our project, we'll only keep the default settings. Let's remove those.

```js
search.addWidget(
  instantsearch.widgets.rangeInput({
    container:"#price"
    atttributeName:"price"
    templates: {
      header: "Price"
    }
  })
);
```
