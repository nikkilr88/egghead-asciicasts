ES6 or ES2015 introduces a standardized **module format**. I have an `index.html` file here and I've loaded it here just for the browser sync server so that we can get some live reloading. I go ahead and type this, we'll say, `With Webpack and Babel`. See that reloads. We may have an **entry point** already set up.

If I just log to the console, let's create a function here, that's going to sum two numbers and take A and B, `sumTwo(a, b)` and will just return that, `A + B`. If we want to log that out, we'll just say this, `2 + 3`. I want to take the result of this, two and three.
```javascript
function sumTwo(a,b){
  return a + b;
}
console.log(
  "2 + 3",
  sumTwo(2,3) // 5
);
```
Let's extract this `sumTwo` function now into an `addition` module. Unlike here in our `src` Directory, we'll just **create a new file**, and we'll put this within a `math` Directory, and we'll call this `addition.js`.

See that we have this `sumTwo` and we need a way of **exposing** this. That's going to look like this. We can `export`. We'll just give it the name of the function. That's going to expose the `sumTwo` function when we **import** the module. 
### math/addition.js
```javascript
function sumTwo(a,b){
  return a + b;
}

export { sumTwo }
```
What that looks like, we can say, import. We'll just `import { sumTwo } from`...if we look at our directory structure, we had had the `math/addition` Expand that.
### main.js
```javascript
import { sumTwo } from `math/addition`;
```
Now, let's add another function to the `addition` Module. We will add three numbers together, two plus three plus four. We'll just create this. We'll call this `sumThree()`.
### main.js
```javascript
console.log(
  "2 + 3 + 4",
  sumThree(2, 3, 4)
);
```
Now, we're going to import that the same way. We'll add it to this list here, `sumThree`. Now, let's just define that. Now, let's export that. Add it to our Exports, `sumThree`.
### math/addition.js
```javascript
function sumThree(a, b, c){
  return a + b + c;
}

export { sumTwo, sumThree }
```
We can see over here that we are importing that successfully. Now, there's a few variations of how we can accomplish both importing and our exporting. Let's take a look at maybe how we can **export** this little differently. You can actually export directly on a **Function Definition** like this. We can just say, `Export, Export`. I'm going to drop this and we're still reloading just the same.
### math/addition.js
```javascript
export function sumTwo(a, b) { ... }

export function sumThree(a, b, c) { ... }
```
There's a few different ways that we can import these. Let's take a look at a few. We give this a little more breathing room. We can give each of our **import statements an alias**.

We can `import sumTwo as addTwoNumbers`. If we run this, we'll see that `sumTwo` is not `defined`. If we update this to use our alias, `addTwoNumbers`.
### main.js
```javascript
import {
  sumTwo as addTwoNumbers,
  sumThree
} from 'math/addition`;
```
Now, let's import the module as a whole. We'll just copy this path here and we'll say, `Import * as addition from` our path. We'll drop this import statement and we just need to make a few updates here, this is going to be called `sumTwo`.

Since we're importing the module as a whole `as addition`, these are going to be on the `addition` object. Let's update these numbers just so we can see a little more change on that side.
### main.js
```javascript
import * as addition from 'math/addition';

console.log(
  "1 + 3",
  addition.sumTwo(1, 3) // 4
);

console.log(
  "1 + 3 + 4",
  addition.sumTwo(1, 3, 4) // 8
);
```
We've seen how we can **define and import** our own custom modules. Let's import a third party package. Let's create a module for some dummy user data. I'm going to just call this `data/users.js`

I'm pasting this array of users that I have here. We'll make sure that we export that. 
### data/users.js
```javascript
var users = [
  { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy']},
  { 'user': 'fred', 'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
];
```
We'll head over here and we will `import users from  'data/users'` Module. Let's log that out and let's make sure that everything looks OK.

We have our object over here of our `users`. We drop each of those down. Let's pull `lodash` in and make use of the Where function that it provides us. `npm install --save lodash`. While that's installing, we'll go ahead and we'll just `import * as _ from 'lodash';`.
### main.js
```javascript
import * as _ from 'lodash';

import {users} from 'data/users';
```
Now, we go to the alias, the `underscore` from `lodash`. We're going to be using the `_.where` method. Let's go ahead and use that `_.where(users, {age: 36})`. What we're going to be looking for is we want to grab at the age of `36`. We should just get `Barney` back.
### main.js
```javascript
console.log(_.where(users, {age: 36}));
```
For the age is `36`. If you look at our results here, we got one `user` back with the name of `Barney`. I've covered a few usages of importing and a few different styles of importing and using aliases, exporting. We thought we can **export our functions directly**.

If you're looking for more information, head over to [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export), or [Babel](https://babeljs.io/docs/learn-es2015/) has some pretty good summaries of the **ES6 modules syntax**.