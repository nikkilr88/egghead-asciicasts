To demonstrate the `any` type, I created here a simple `string[]`. If I try to call methods on it, I'm going to get valid array method suggestions because TypeScript correctly inferred this variable's type based on what was assigned to it.

```js
const halloweenCostumeIdeas = ['😱 ', '👹', '🤖', '👻', '👽'];

halloweenCostumeIdeas.indexOf('👽');
```

If I also write a function that only works with array of strings, `string[]`, TypeScript will let me call that function and pass in my `array`.

```js
const halloweenCostumeIdeas = ['😱 ', '👹', '🤖', '👻', '👽'];

halloweenCostumeIdeas.indexOf('👽');

function randomCostume(ideas: string[]) {
  return ideas[Math.floor(Math.random() * ideas.length)];
}

randomCostume(halloweenCostumeIdeas);
```


Of course, if I try to access a bunch of random properties on it, it's not going to work. I obviously also can't invoke an array because it's not a function. Both `halloweenCostumeIdeas.a.b.c.d` and `halloweenCostumeIdeas()` are going to fail.

```js
const halloweenCostumeIdeas = ['😱 ', '👹', '🤖', '👻', '👽'];

halloweenCostumeIdeas.indexOf('👽');
halloweenCostumeIdeas.a.b.c.d;
halloweenCostumeIdeas();

function randomCostume(ideas: string[]) {
  return ideas[Math.floor(Math.random() * ideas.length)];
}

randomCostume(halloweenCostumeIdeas);
```


Now, if I explicitly change the type of this variable, `halloweenCostumeIdeas` to an `any`, all of the errors will go away. I can assign anything to an `any`. You can also assign an `any` to anything. That's why it lets me call this function.

```js
const halloweenCostumeIdeas:any = ['😱 ', '👹', '🤖', '👻', '👽'];
```


Finally, you can access any property on an `any`. You can even invoke it. Anything goes. `any` is the most relaxed type in TypeScript, as you can see. There are perfectly valid use cases for it.

Let's say here we have some vanilla JavaScript code base. We suddenly decide that we want to add TypeScript to it. We know this code works fine and this function works fine as it is. We just don't have a specific type for its parameter yet.

We can just set it to `any` temporarily. Sometime later, once we've had some more time to define more proper types in our application, we can add it to our function definition.

```js
// starting out 

const human = { name: "John", age: 25};

function printAge(human: any) {
    console.log(human.age);
}
```

It can also get you in a lot of problems. Both of these statements will throw errors at runtime. TypeScript is not saying a word about that. I can mess this up even more. Instead of an array, just assign a Boolean, `true` to it, which makes all of this even worse as everything in here will throw errors now. TypeScript is still fine with all of it.

```js
const halloweenCostumeIdeas:any = true;

halloweenCostumeIdeas.indexOf('👽');
halloweenCostumeIdeas.a.b.c.d;
halloweenCostumeIdeas();

function randomCostume(ideas: string[]) {
  return ideas[Math.floor(Math.random() * ideas.length)];
}

randomCostume(halloweenCostumeIdeas);
```

The `any` type will negate any protection you get from TypeScript on the variables it's used on. What if I had a service that queries some third party API? That `data` can change. We are definitely not responsible for it and we can't log in the type for it.

In that case, we'd need to return the response as an `any` until we can do some proper checks around it, and only then attempt to call any methods on it.

```js
interface IComment {
    date: Date;
    message: string;
}

interface IDataService {
    getData(): any;
}

let service: IDataService;

const response = service.getData();

if(typeof response === 'string') {
    console.log(response.toUpperCase());
}
```

In this case, we're sure that if it gets to run inside this block of code, it's definitely a `string`. As it is, this code should work and we are protected.

Between the time this service returns and we do the check, another developer that might not be aware of the constraints can still come in and do anything on the return value without TypeScript complaining. Now, we're back to having runtime errors.

```js
interface IComment {
    date: Date;
    message: string;
}

interface IDataService {
    getData(): any;
}

let service: IDataService;

const response = service.getData();
response.a.b.c.d;

if(typeof response === 'string') {
    console.log(response.toUpperCase());
}
```

This is where the `unknown` type shines. If instead of an `any` here, I return an `unknown`, I am telling TypeScript and the developer that it's not really safe to use this variable. Suddenly, this will start throwing errors, which is great, but how is this useful if we can't use it?

```js
interface IComment {
    date: Date;
    message: string;
}

interface IDataService {
    getData(): unknown;
}

let service: IDataService;

const response = service.getData();
response.a.b.c.d;

if(typeof response === 'string') {
    console.log(response.toUpperCase());
}
```

You'll notice that in this block of code, it's not throwing any errors. It's letting us call string methods on it, which is because the `unknown` type stays `unknown` until you do some type narrowing on it. In this case, TypeScript will be sure that it's a `string`.

I can also go ahead and build a user-defined type guard, and then just open up another conditional block and use it. Again, even though initially, `response` was `unknown` in this block because of the type guard, it now knows it's a `IComment`. It's going to let me access `IComment` properties on it.

```js
interface IComment {
    date: Date;
    message: string;
}

interface IDataService {
    getData(): unknown;
}

let service: IDataService;

const response = service.getData();
response.a.b.c.d;

if(typeof response === 'string') {
    console.log(response.toUpperCase());
} else if(isComment(response)){
    response.date;
}

function isComment(type: any): type is IComment {
    return (<IComment>type).message !== undefined;
}
```

Finally, if you're sure about its shape, you can even cast it. The `unknown` type is much safer for cases like this.

```js
interface IComment {
    date: Date;
    message: string;
}

interface IDataService {
    getData(): unknown;
}

let service: IDataService;

const response = service.getData();
response.a.b.c.d;

if(typeof response === 'string') {
    console.log(response.toUpperCase());
} else if(isComment(response)){
    response.date;
} else {
    const numbers = <number[]>response;
    numbers.indexOf(1);
}

function isComment(type: any): type is IComment {
    return (<IComment>type).message !== undefined;
}
```

To recap, while both `any` and `unknown` might on the surface both signal the intent that we don't yet care about the type of a variable, they are very different.

With `any` being the least restrictive type, allowing you to call anything on it and assign it to any other type, `unknown` is the most restrictive and doesn't let you call anything on it. You can't assign it to any other type until you narrow it down to a more specific type via control flow type narrowing or casting.
