In this lesson, we are going to learn how to test a component using the **component controller Mock**, that ships with `ngMocks`.

First, let's take a quick moment and talk about how testing works with **Webpack** in ES6. Because we have to transpile our test just like our application, we need to tell Webpack how to do that, so we've created this spec bundle to convey to Webpack that these are the modules that we want to import and this is how to do it.

We're `importing Angular from angular-mocks`, and then we're defining a context for our test, and then we're using that to bundle those up. If we go into the Karma configuration file, you can see that we have **Karma Webpack**, and we're passing in our bundle to be, basically, pre-processed before it goes to Karma.

Then from here, let's look at our category spec. We have a `CategoriesModule` controller, a component template with some very simple tests. We're just testing the name of the module that our category contains a category item, and that our component has template controller as controller equals the category's controller. There's not a lot to test here, but we are going to take this a step further and show how to test the actual component controller.

Let's initialize some variables here -- `component`, `$componentController`, and `CategoriesModel`. Then from here, let's go ahead and do some additional initialization. Because we're testing a component, we need to import the categories module, and then we are going to mock out the categories model.

We're going to do `$provide.value` `CategoriesModel`, and then we're going to simulate or rather mock out the `getCategories` method, and simulate a fake promise. It's just an object with a then method on that.

**categories/categories.spec.js**
```javascript
let component, $componentController, CategoriesModel;

beforeEach(() => {
  window.module('categories');

  window.module($provide => {
    $provide.value('CategoriesModel', {
      getCategories: () => {
        return {
          then: () => {}
        };
      }
    });
  });
});
```

Then from here, just in another, before each block, I like to break these out. We are going to assign or rather inject the `$componentController` in the `CategoriesModel` using this underscore wrapper here, and then assign those to our local variables.

So `CategoriesModel` equals the `_CategoriesModel_`, and `$componentController` equals `_$componentController_`. 

**categories/categories.spec.js**
```javascript
let component, $componentController, CategoriesModel;

beforeEach(() => {...});

beforeEach(inject((_$componentController_, _CategoriesModel_) => {
    CategoriesModel = _CategoriesModel_;
    $componentController = _$componentController_;
  }));
```

Then from here, let's describe our test block for the controller. Our test is that when the component is created, that the `$componentController` calls `CategoriesModel.getCategories` immediately.

This is going to be a bit of a funny test, as you'll see in just a moment. The first thing we need to do is create a spy on `getCategories` on `CategoriesModel`, and we're going to call through. From here, let's initialize our component using `$componentController`. So it will take our component `name`, which is `categories`, and then its dependencies, in this case, it's just `CategoriesModel`.

Then from here, let's write our assertion, so we expect `CategoriesModel.getCategories` to have been called. Let's hop into the command line. We will run our test, and let's see what happens.

**categories/categories.spec.js**
```javascript
let component, $componentController, CategoriesModel;

beforeEach(() => {...});

beforeEach(() => {...});

describe('Controller', () => {
    it('calls CategoriesModel.getCategories immediately', () => {
      spyOn(CategoriesModel, 'getCategories').and.callThrough();

      component = $componentController('categories', {
        CategoriesModel
      });

      expect(CategoriesModel.getCategories).toHaveBeenCalled();
    });
  });
```
Oh no. The caveat here is that because we're not actually adding it to the DOM, some of the lifecycle hooks will not fire. So a little bit of hand-waving and we manually have to call this. Component `$onInit()` and let's run this one more time. It should be green, yes, all the way down.

**categories/categories.spec.js**
```javascript
let component, $componentController, CategoriesModel;

beforeEach(() => {...});

beforeEach(() => {...});

describe('Controller', () => {
    it('calls CategoriesModel.getCategories immediately', () => {
      spyOn(CategoriesModel, 'getCategories').and.callThrough();

      component = $componentController('categories', {
        CategoriesModel
      });
      component.$onInit();

      expect(CategoriesModel.getCategories).toHaveBeenCalled();
    });
  });
```

This is how you test a component using the component controller.