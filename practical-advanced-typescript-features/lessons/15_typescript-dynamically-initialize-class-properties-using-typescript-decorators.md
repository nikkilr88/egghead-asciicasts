Here I have a REST API that returns an array of todos, `<ITodo[]>`. I'm building this `todoService` and this specific property is supposed to return me those different `todos` from that API.

I just need to initialize it. I could just write a `fetch` statement over here, but imagine our app has a lot more complexity around making API calls with secured authentication and caching, so we want to avoid doing all of that in this service.

```js
const fetch = require('node-fetch');

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

class TodoService {
  todos: Promise<ITodo[]> = fetch('...');
}

const todoService = new TodoService();
```

We ideally want some other middleware to take care of all of those details and it will just expose a simple function we can use to make `GET` requests like the ones for `todos`. Instead of a function, what I'll build is a `@GetTodos` decorator that we can just attach to class properties wherever we want and it will be responsible for knowing how to make `GET` requests. Let's see how that's going to work.

```js
const fetch = require('node-fetch');

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

class TodoService {
  @GetTodos
  todos: Promise<ITodo[]>
}

const todoService = new TodoService();
```

All a `@` decorator is in TypeScript is a function. In TypeScript, decorator functions receive different arguments based on what they're decorating. In this case because it's a property decorator, it will be invoked with a target which will actually be the constructor of the class, the property we're decorating is on. In this case it will be the `TodoService` constructor.

```js
const fetch = require('node-fetch');

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function GetTodos(target: any) {

}

class TodoService {
  @GetTodos
  todos: Promise<ITodo[]>
}

const todoService = new TodoService();
```

This is really important. It's just a constructor function, not the actual instance. This function will be called when the whole file is loaded. That's very early when our program runs, while the actual instance might be created at a much later time.

The second argument is the name of the property it's decorating. In my case name will be the `todo` string. I'll create an inner function here called `init` that will contain all the code necessary to make `GET` requests and instantiate our promise.

```js
function GetTodos(target: any, name: string) {
  const init = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json()); 
  };
}
```

I'll keep it simple in this case. It's just a `fetch` to the URL we looked at earlier, but you can encapsulate as much as you need to in here. Remember, this is supposed to be a reusable middleware. This is where you can place all of the complexity around authentication and caching.

Given that this is just a `constructor`, how do I give the result of this function to instances of this? I'll use the `Object.defineProperty` syntax to define a `get`ter for this property name on this class. Whenever somebody tries to get the property, I will `return` the result of this `init` function.

```js
function GetTodos(target: any, name: string) {
  const init = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json()); 
  };

  Object.defineProperty(target, name, {
    get: function() {
      return init();
    }
  });
}
```

Let's try it. I'll create a new instance of the class and try to access the `todos` property on it with a chained `.then` statement because it's a `Promise<ITodo[]>`. 

```js
class TodoService {
  @GetTodos
  todos: Promise<ITodo[]>;
}

const todoService = new TodoService();
todoService.todos.then(todos => {
  console.log(todos);
})
```

I'll open up my terminal and start up my file. Sure enough, if I scroll up through this list, I can see I get all of the `todos` from earlier.

![Todos displayed in Terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545100233/transcript-images/typescript-dynamically-initialize-class-properties-using-typescript-decorators-terminal-todos.png)

Now there's a problem. Every time I try to get this `property`, this `getter` will be called. I'm creating a new `promise` and a new network request for every `get call`. I should be able to just reuse the same `promise` once it's been created and fired up. I'll first need a place to store the `promise` once it's created.

I'll create a property here called `hiddenInstanceKey` and I'll give it some obscure heart to replicate the `name` based on the `name` of the property I'm decorating. In my `get` function now the `this` context will represent my current instance.

```js
function GetTodos(target: any, name: string) {
  const hiddenInstanceKey = "_$$" + name + "$$_";
  const init = () => {
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json()); 
  };

  Object.defineProperty(target, name, {
    get: function() {
      return this init();
    }
  });
}
```

It's important to not use an arrow function here for the `get`ter, because an arrow function will lock in your `this` context and will not let it be instance dependent. I'll first check if there's any existing value at this `hiddenInsatanceKey` in my current instance.

```js 
  Object.defineProperty(target, name, {
    get: function() {
      return this[hiddenInstanceKey] init();
    }
  });
}
```

If not, that means it's the first time somebody is trying to get this property, so I'll just initialize `this[hiddenInstanceKey]`, store it for future uses at the key I just created, and then return it to whoever was invoking the getter. If I have multiple `get` requests, they will all share the same underlying promise. Again, the `this` context that I'm using here in this case will refer to this `todoService`  specific instance.

```js 
  Object.defineProperty(target, name, {
    get: function() {
      return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
    }
  });
}

class TodoService {
  @GetTodos
  todos: Promise<ITodo[]>;
}

const todoService = new TodoService();
todoService.todos.then(todos => {
  console.log(todos);
})
const todoService = new TodoService();
todoService.todos.then(todos => {
  console.log(todos);
})
const todoService = new TodoService();
todoService.todos.then(todos => {
  console.log(todos);
})
```

Finally, this `GetTodos` is not that useful because it always makes requests to the same URL. Let's wrap this in a function and create a `@` decorator factory which you can initialize with any URL. Now I'll go change it in my function as well.

```js
function Get(url: string) {
return function(target: any, name: string) {
    const hiddenInstanceKey = "_$$" + name + "$$_";
    const init = () => {
      return fetch(url)
        .then(response => response.json()); 
    };

    Object.defineProperty(target, name, {
      get: function() {
        return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
      }
    });
  }
}

class TodoService {
  @Get('https://jsonplaceholder.typicode.com/todos')
  todos: Promise<ITodo[]>;
}
```

What we've ended up is a decorator that will initialize any property it's applied on with a `Promise` that returns us the result of a `@get` call to whatever URL was passed into here. Apart from looking a lot neater than a function call, property decorators have the advantage of being easily chainable.

For example, I'll copy this and create a new decorator called `First`. This will get a reference to the previous getter initialized by the previous decorator in the chain, so when its `init` function is called it will first call the previous one and then attach another `then` operator at the end of it that queries the first element in the array.

```js
function First() {
return function(target: any, name: string) {
    const hiddenInstanceKey = "_$$" + name + "$$_";
    const prevInit = Object.getOwnPropertyDescriptor(target, name).get;
    const init = () => {
      return prevInit()
        .then(response => response[0]); 
    };
```

I'll also need to add `configurable` to both defined property calls so they can overwrite each other. Now I'll just go back to my class, `TodoService`, pop this on top of the other decorator, open up my console, start up the file, and now we get three instances of the first todo because we are actually making the call three times here.

```js
function First() {
return function(target: any, name: string) {
    const hiddenInstanceKey = "_$$" + name + "$$_";
    const prevInit = Object.getOwnPropertyDescriptor(target, name).get;
    const init = () => {
      return prevInit()
        .then(response => response[0]); 
    };

    Object.defineProperty(target, name, {
      get: function() {
        return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
      },
      configurable: true
    });
  }
}

class TodoService {
  @First()
  @GetTodos('https://jsonplaceholder.typicode.com/todos')
  todos: Promise<ITodo[]>;
}
```

You can actually create multiple decorators and stack them on top of each other and they will be called bottom to top.
