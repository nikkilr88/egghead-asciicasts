In this lesson, we are going to learn how to create **services** in an Angular 2 style. A recurring theme in Angular 2 is that everything is just a **class**. When we do our **controllers** in an Angular 2 style, they are also just a class. In Angular, we want to keep our controllers thin and very specific to the **view of controls**. To accomplish this, we are going to refactor our `categories` collection into a categories model.

**/categories/categories.controller.js**
```javascript
class CategoriesController {
  constructor() {
    this.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Exercise"},
      {"id": 3, "name": "Humor"}
    ];
  }
}

export default CategoriesConroller;
```
Because services are generally shared by the entire application, let's put our categories model into a common models folder. We'll go `common/models/categories.model.js`. Because we are working with just a class that is the theme, let's copy the `CategoriesController`, paste it in, and we're just going to update it to say `CategoriesModel` and not `CategoriesController`. This is the only change that we're going to make. We're going to let ES6 do the work for us.

**/models/categories.model.js**
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
}

export default CategoriesModel;
```
Now, that we have our `categoriesModel`, we need to create a common module in which we can attach this to. We'll create `common.js`, and we're going to `import Angular from Angular`, then we'll also import our `CategoriesModel` from `./models/categories.model`, and then we'll go ahead and define our module objects, so `const CommonModule = angular.module`. We'll call this module `common`, no dependencies, and then we're going to define a service on the module. We'll just call this `CategoriesModel` and pass in the `CategoriesModel` module that we just defined.

**common/common.js**
```javascript
import angular from 'angular';
import CategoriesModel from './models/categories.model';

const CommonModule = angular.moddule('common', [])
  .service('CategoriesModel', CategoriesModel);

export default CommonModule;
```
Then from here, let's export this so that we can pick it up in our `app.js`. We'll go ahead and import this, so `import CommonModule from common/common`, and then we'll go into our dependencies and add in `CommonModule.name`.

**app/app.js**
```javascript
import CommonModule from './common/common';

angular.module('app', [
  CommonModule.name,
  ComponentsModule.name
  ])
  .component('app', appComponent);
```
Now, we just need to hook this into our controller, so **dependency injection** happens at the **constructor** level by passing it in as a parameter. We'll pass in `CategoriesModel` and then `this.categories = 
CategoriesModel.categories`. Let's check the command line and make sure nothing is broke. 

**/categories/categories.conroller.js**
```javascript
class CategoriesConroller {
  constructor(CategoriesModel) {
    this.categories = CategoriesModel.categories;
  }
}

export default CategoriesConroller;
```
But let's look in the browser and you can see here that because we're in strict mode, something happened with our dependency injection annotation.

![Strict Mode Error](../images/angular-1-x-creating-services-strict-mode-error.png)

We solve this by adding in `ngInject` into our `constructor()` which then allows `ngAnnotation` to properly resolve our dependencies. 

**/categories/categories.conroller.js**
```javascript
class CategoriesConroller {
  constructor(CategoriesModel) {
    'ngInject';

    this.categories = CategoriesModel.categories;
  }
}
```
Now, you can see that our `categories` are being pulled from the `CategoriesModel`. We defined our common module. 

![Categories](../images/angular-1-x-creating-services-categories.png)

We attach categories model to it, which has our categories collection. Notice that it's just a class very similar to an Angular 2 class.

Then in our `CategoriesController`, we're passing that into the `constructor()`, and then we're able to consume it by saying `this.categories = CategoriesModel.categories`. This is how you create a service in an Angular 2 style within your Angular 1 application.

**/categories/categories.conroller.js**
```javascript
class CategoriesConroller {
  constructor(CategoriesModel) {
    'ngInject';

    this.categories = CategoriesModel.categories;
  }
}

export default CategoriesConroller;
```