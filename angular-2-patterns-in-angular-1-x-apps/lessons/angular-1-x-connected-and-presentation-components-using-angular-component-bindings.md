In this lesson, we are going to learn how to use **inputs and outputs** to create **smart and dumb** components. In Angular 2, **components** communicate via the concept of inputs and outputs, which is very similar to [isolated scope](https://egghead.io/lessons/angularjs-isolate-scope-review) in Angular 1. Property data goes in, and user events come out.

This allows us to create components that are dumb in the sense that they contain **no logic** whatsoever, as their only function is to display data and relay user events back to its parent component. This reduces our testable surface area significantly, because unless Angular has broken, there is really nothing to test.

We can then use smart components to coordinate the layout of our dumb components. Then, we pass user events back to the appropriate services.

**category-item/category-item.js**
```javascript
import angular from 'angular';
import categoryItemComponent from './category-item.component';

const CategorItemModule = angular.module('categoryItem', [])
  .component('categoryItem', categoryItemComponent)
  ;

export default CategoryItemModule
```
We're going to start by building out a `CategoriesItemComponent`. I've went ahead and put in the styles and the `CategoryItemModule`. We're going to get started at the `CategoriesItemComponent`. The first thing we're going to do is import our `template`. Then we'll go ahead and import our styles. Then we will define our component configuration object.

**category-item/category-item.component.js**
```javascript
import template from './category-item.html';
import './category-item.styl';

const categoryItemComponent = {

};

export default cateforyItemComponent;
```
Before I forget, I'm going to export this. Then I'll do the `template`, `controllerAs`. The interesting thing about components is that if you do not explicitly define a controller, it will just implicitly create one for you.

**category-item/category-item.component.js**
```javascript
const categoryItemComponent = {
  template,
  controllerAs: 'categoryItemCtrl'
};
```
Now in Angular 1, we would define isolated scope by creating a `scope` object, and then saying that we want to pass in a `category`, and set that to **two-way data binding**. It then turned to `bindTo`, and it's now `binding`.

**category-item/category-item.component.js**
```javascript
const categoryItemComponent = {
  // Previous standards
  //  scope: { ... }
  //  bindTo: { ... }

  // Current standard
  bindings: {
    category: '='
  },
  template,
  controllerAs: 'categoryItemCtrl'
};
```
This would work, but we're going to change it to **one-way** data binding by using this `<` symbol. It binds from the parent to the child, and change detection is only on the parent, not on the child.

**category-item/category-item.component.js**
```javascript
const categoryItemComponent = {
  // Current standard
  bindings: {
    category: '<'
  },
  template,
  controllerAs: 'categoryItemCtrl'
};
```
Now, let's update our `template`. We're going to just bind to `categoryItemController.category`, this is what we're passing in, and then the `name` property on that object.

**category-item/category-item.html**
```html
<div class="category-item">
  {{categoryItemCtrl.category.name}}
</div>
```
Let's go ahead and add in the `CategoryItemModule` to our `CategoriesModule` so that we have connected the dots. We'll go ahead and add this as a dependency.

**categories/categories.js**
```javascript
import CateforyItemModule from './category-item/category-item';

const CategoriesModule = angular.module('categories', [
  CategoryItemModule.name
])
  .component('categories', categoriesComponent);
```
From here, we need to update the `categories.html` to use our category item component, so we'll delete this `class` first. Then, we'll delete this, and we'll go `<category-item></category-item>`. Then, we're going to define a `category` attribute and pass in our `category` object.

**categories/categories.html**
```html
<ul>
  <li ng-repeat="category in categoriesListctrl.categories">
    <category-item category="category"></category-item>
  </li>
</ul>
```
Let's hop into the browser. You can see that it's working, but just to prove that it is, let's go ahead and update this template. We'll just put two exclamation points in here. We'll hop back into the browser so you can see that we're rendering the `category-item` component.

![category-item](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/using-angular-2-patterns-in-angular-1-x-apps/angular-1-x-connected-and-presentation-components-using-angular-component-bindings-category-item.png)

Now that we've created an input, let's go ahead and create an output. Let's hop back into our `categoryItemComponent`. We want to create an output of `selected` so that when an item is `selected`, then it emits an event that we can bind to. That's just expression-isolated scope.

**category-item/category-item.component.js**
```javascript
const categoryItemComponent = {
  // Current standard
  bindings: {
    category: '<',
    selected: '&'
  },
  template,
  controllerAs: 'categoryItemCtrl'
};
```
We'll capture the `ng-click` event. From here, we're going to call `categoryItemController.selected`, because that is what we defined on our bindings object. This has to be an object map, you will send parameters back. This is the one gotcha that gets me.

**category-item/category-item.html**
```html
<div class="category-item"
  ng-click="categoryItemCtrl.selected({category:categoryItemCtrl.category})">
  {{categoryItemCtrl.category.name}}
</div>
```
We're sending a `category` object, and then we're passing in `categoryItemController`. Within our `categories.html`, let's update this to capture the `selected` event, and then we're going to call an `onCategorySelected` method on our `CategoriesController`, and we'll just pass in the `category`.

**categories/categories.html**
```html
<ul>
  <li ng-repeat="category in categoriesListctrl.categories">
    <category-item selected="categoriesListCtrl.onCategorySelected(category)" category="category"></category-item>
  </li>
</ul>
```
We'll go ahead and scope this to the `categoriesListController`. Then we need to jump into our `categoriesListController` and define that. We'll go to `categoriesListController`, and we'll define this method, `onCategoriesSelected`, and we'll pass in the `category`. From here, we're just going to log this output to the command line. We'll go `'CATEGORY SELECTED'`, and we'll just dump the `category` object that we're passing in. Let's hop into the browser and see this working.

**categories/categories.contrller.js**
```javascript
$onInit () { ... }

onCategoriesSelected(category) {
  console.log('CATEGORY SELECTED', category);
}
```
As we click a `category` item, you can see that it is being logged to the console.

**Console Output**
```javascript
// CATEGORY SELECTED Object {id: 0, name: "Development", $$hashKey: "object:4"}
// CATEGORY SELECTED Object {id: 1, name: "Design", $$hashKey: "object:5"}
// CATEGORY SELECTED Object {id: 2, name: "Exercise", $$hashKey: "object:6"}
// CATEGORY SELECTED Object {id: 3, name: "Humor", $$hashKey: "object:7"}
```
Let's just do a quick review. We created our `categoryItemComponent` that has a `category` input and a `selected` output. 

**category-item/category-item.component.js**
```javascript
const categoryItemComponent = {
  // Current standard
  bindings: {
    category: '<',
    selected: '&'
  },
  template,
  controllerAs: 'categoryItemCtrl'
};
```
From there, we are binding to the category input, and then on click, we're calling `categoryItemController` selected and passing in the `category` via an object map, so that is our output.

**category-item/category-item.html**
```html
<div class="category-item"
  ng-click="categoryItemCtrl.selected({category:categoryItemCtrl.category})">
  {{categoryItemCtrl.category.name}}
</div>
```
In our HTML, we're passing in `category`, and then we're binding to the `selected` output, which then, in our `categoriesItemController`. 

**categories/categories.html**
```html
<ul>
  <li ng-repeat="category in categoriesListctrl.categories">
    <category-item selected="categoriesListCtrl.onCategorySelected(category)" category="category"></category-item>
  </li>
</ul>
```
We're capturing the `selected` event and deferring that to `onCategorySelected`, which we were logging to the console.

**categories/categories.contrller.js**
```javascript
$onInit () { ... }

onCategoriesSelected(category) {
  console.log('CATEGORY SELECTED', category);
}
```
Now, one thing I want to point out is that you'll notice in the `categoryItemComponent`, there is no controller. It's completely dumb. This is how you create smart and dumb components in Angular 1 in an Angular 2 style.