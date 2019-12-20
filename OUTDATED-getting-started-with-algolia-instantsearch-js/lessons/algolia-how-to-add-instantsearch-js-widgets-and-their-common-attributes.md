Instructor: [00:01] In order to demo how to add widgets and their generic parameters, we're going to create a demi-menu that will not be part of the project, but useful to understand the common mechanisms. Let's start by adding a `div` container to the `index.html` file and give it an id of `test- widget`. That's where our widget will be injected.

#### index.html

```html
<body>
  <!-- add a div container for the widget here -->
  <script src="app.js"></script>
</body>
```

[00:24] Now, we move to the `app.js` file. We'll first declare a constant named `testWidget` that will hold our widget. We now need to create it. Widgets are accessible from the `instantsearch.widgets`, then the widget of your choice. Here, we'll use the `menu`.

#### app.js

```js
// add widget
const testWidget = instantsearch.widgets.menu({});
search.start();
```

[00:41] Then we need to configure it, passing it a configuration object. Configurable attributes of widgets can be different depending on the widget's purpose. For this video, we'll focus on the ones that are shared across most of them. We will discover the others as we implement them.

[01:00] The first attribute to consider is the `container`. The `container` represents the location where the widget will be rendered in your HTML page. Its value can either be a CSS selector or a DOM element. Here, in our case, we'll add a string with `'#test-widget'` that refers to the `div` with an id of test widget we've added before.

```js
// add widget
const testWidget = instantsearch.widgets.menu({
  container: "#test-widget"
});
search.start();
```

[01:22] Then we need to add the `attributeName` for this widget. `attributeName` is common to all widgets targeting a facet or a filter attribute. In our e-commerce data set, each record contains a `type` attribute. Let's filter on type.

```js
// add widget
const testWidget = instantsearch.widgets.menu({
  container: "#test-widget",
  attributeName: "type"
});
search.start();
```

[01:37] Now that we have the container and the `attributeName`, that's enough for the menu widget to do its job. Last step before our widget can be displayed on-screen, we need to pass our test widget constant to the `search.addwidget` method.

```js
// add widget
const testWidget = instantsearch.widgets.menu({
  container: "#test-widget",
  attributeName: "type"
});

search.addWidget(testWidget);
search.start();
```

Refreshing the index page, we can now see that our widget displays correctly.

![Widget displayed correctly](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324957/transcript-images/how-to-add-instantsearch-js-widgets-and-their-common-attributes-widget-displayed.jpg)

[02:00] Back to our widget configuration, another common widget attribute is the `templates`. `templates` are a way to customize the rendering of a widget. They can only be written for some specific parts of the rendered widget, for example, header, item, footer, etc. When accessing specific values, this template can be written using Mustache or a function.

#### app.js

```js
const testWidget = instantsearch.widgets.menu({
  container: "#test-widget",
  attributeName: "type"
  templates: {

  },
});
```

[02:24] Here, let's start by customizing the `header` with a plain string `Type`.

```js
const testWidget = instantsearch.widgets.menu({
  container: "#test-widget",
  attributeName: "type"
  templates: {
    header: "Type"
  },
});
```

Saving and refreshing our browser, we now have a nice header on top of our widget.

![Header added on top of widget](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324957/transcript-images/how-to-add-instantsearch-js-widgets-and-their-common-attributes-header-added.jpg)

[02:35] The final common widget attribute to cover is `transformData`. `transformData` is used to provide functions that will pre-process the data passed to the templates. Those functions map the different template keys available when it makes sense. For example, if a widget accepts an item template, then you can use `item` and transform that item, modify it.

```js
const testWidget = instantsearch.widgets.menu({
  container: "#test-widget",
  attributeName: "type"
  templates: {
    header: "Type"
  },
  transformData : item =>{

  }
});
```

[02:57] For this example, let's just add a shortened version of each item label. We'll add a new property `ellipsis` to each item. We'll take the original value string and keep only the five first characters followed by three dots and we `return` the whole item object.

```js
 header: "Type"
  };
  transformData : item => {
    item.ellipsis = `${item.value.slice(0, 5)} ...`;
    return item;
  }
});
```

Note that this is simply passed to the `item` template. Nothing special would show until we make use of our new `item` property.

[03:23] Let's implement our `item` template. Using Mustache, we can access the new items' `ellipsis` property.

```js
templates: {
    header: "Type"
    item: "{{ellipsis}}"
  },
```

Refreshing the page, we have our facet value truncated after the fifth character.

![Values are truncated](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552324958/transcript-images/how-to-add-instantsearch-js-widgets-and-their-common-attributes-values-truncated.jpg)

[03:38] That wraps up the most common attributes used by most widgets. The final note on adding widgets, a shorter way to write it is to omit the constant declaration and moving the widget's creation directly inside the `addWidgets` method, like so.

```js
// add widget

search.addWidget(
  instantsearch.widgets.menu({
    container: "#test-widget",
    attributeName: "type",
    templates: {
      header: "Type",
      item: "{{ellipsis}}"
    },
    transformData: item => {
      item.ellipsis = `${item.value.slice(0, 5)} ...`;
      return item;
    }
  })
);
search.start();
```
