In this lesson, we are going to talk about the **Dependency Injection** in an Angular application using **ES6**. There's a gotcha that I want to point out that most people will run into, especially if they've not spent a lot of time using classical languages.

I want to start by showing a contrived example, and then we will enter it back into our application. I'm going to start by creating an `add` method that accepts a `category` parameter.

**categories.model.js**
```javascript
class CategoriesModel {
  constructor() {
    this.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Exercise"},
      {"id": 3, "name": "Humor"}
    ];
  }

  add(category) {
    // do something
  }
}

export default CategoriesModel;
```
Within this method, we're not actually going to do anything because that is not important, but what we're going to do is create a second method called `returnCategory` that we want to return the value of the `category` sent into the `add` method.

**categories.model.js**
```javascript
returnCategory () {
  return category;
}
```
Obviously, this is not going to work because `category` is not available within the `returnCategory` scope. We can try to fix this by adding `this.category`, and so now it's scoped to the `CategoriesModel` class. 

**categories.model.js**
```javascript
returnCategory () {
  return this.category;
}
```
But then again, the `category` parameter itself -- and this is important -- is only scoped to the `add` method. So what we have to do for this to work is go `this.category = category`, and assign `category` to an instance member.

**categories.model.js**
```javascript
add(category){
  this.category = category;
}
```
Keeping that in mind, let's go ahead and delete that. We're going to inject the **$q service**. What we want to do is use the `$q` service outside of the `constructor()`. How we do this is by assigning `q` to a local number, so `this.$q = $q`.


**categories.model.js**
```javascript
class CategoriesModel {
  constructor($q) {
  'ngInject';

  this.$q = $q;
  this.categories = [ ... ];
  }
}
```
Then from there, we can create a `getCategories` method that will return a promise that is resolved with `this.categories`. We'll go return `this.q.when`, and then we'll go `this.categories`. We can see that within the `getCategories` method, we are referencing the `$q` service as well as `categories` by scoping it to the class using the `this` keyword.

**categories.model.js**
```javascript
class CategoriesModel {
  constructor($q) {
  'ngInject';

  this.$q = $q;
  this.categories = [ ... ];
  }

  getCategories() {
    return this.$q.when(this.categories);
  }
}
```
Let's hop into our `categories` controller and change this around so that we're calling the service and operating on the promise. `CategoriesModel.getCategories`. From there `.then`, and then we'll go result using the [fat arrow](https://egghead.io/lessons/arrow-function), `this.categories = result`.

**categories.controller.js**
```javascript
class CategoriesController {
  constructor(CategoriesModel) {
    'ngInject';

    CategoriesModel.getCategories()
      .then(result => this.categories = result);
  }
}

export default CategoriesController
```
Then we can hop into the browser. We can see that this is indeed working. The only difference is is that now where our controller is working with a **promise** and not accessing the category's service directly to get the categories, which in this case is totally fine.

Then from here, the main point of this lesson is that we are injecting the `$q` service, but then we have to assign it to a local instance so that we can use it outside of the `constructor`. This is something to keep in mind when using dependency injection within an Angular 1 and even in Angular 2 application.