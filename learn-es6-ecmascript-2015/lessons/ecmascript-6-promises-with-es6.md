In today's lesson, I want to go over **promises** with **ES6** or **ECMAScript 2015**. **Promises** in **ES6** are very similar to those of **Angular's $q service**, if you're familiar with that framework.

First thing I want to do before we start explaining what **promises** is and how to use them is just build out a basic skeleton that we can add to throughout the video.

To get started, we'll go ahead and create a new variable, which we'll just call `d`, and we'll set that equal to a `new Promise()`. The **callback** inside of a promise takes **two arguments**, **resolve** and **reject**. You'll notice that we're using the **ES6 arrow** function syntax throughout this project.
```javascript
var d = new Promise((resolve, reject) => {

});

d.then();

d.catch();
```
**Promises** can either be **resolved** or **rejected**. When you **resolve** a promise, the `.then()` will **fire**, and when you **reject** a promise, the `.catch()` will **fire** instead. Usually, inside of your **promise**, you have some sort of **logic that decides** whether you're going to **reject or resolve the promise**.
```javascript
var d = new Promise((resolve, reject) => {
  if (true) {
    resolve('hello world');
  } else {
    reject('no bueno');
  }
});
```
Let's go ahead and build the basic **if-else** statement here. Inside the **if statement**, we'll go ahead and **resolve the promise**. We'll pass in a string of `Hello world`. Inside the else statement, let's **reject the promise**, and we'll just pass in a string of, `No bueno`.

Now, because we're just evaluating the **Boolean** `true` inside this **if-statement**, we know that our **resolve** is going to fire. To get an idea of what this is going to look like, let's go down to our `d.then()`.

The `.then()` method **callback** also takes an argument. This one we'll call `data`. The value for data is the argument that is passed into the **resolve** method. In here, let's just go ahead and `console.log`, and we'll say `success`, and we'll print out our data.
```javascript
d.then((data) => console.log('success : ', data));
```
Alternatively, in the `.catch()` method, we also have a **callback function** as the argument, but here, what will be passed back is the information that's supplied into the **reject method** of our promise. Why don't we just go ahead and `console.error`, and here we'll say, `Error`, and we'll spit out that error data that's supplied back to us.
```javascript
d.catch((error) => console.error('error : ', error));
```
If we come back into our console and we run this logic, we'll notice that, `Success : Hello world`, is returned to us, because that's what we have specified in the **callback** of our `.then()` method.

If we go up to our **promise** and we change this `true` to `false`, we'll cause our `reject()` to fire off, and, `No bueno`, will be passed through instead. So, let's come back to our console and run it again. We notice we get our `error : No bueno`.

**Promises** are useful for a lot of things. Most importantly, they allow you to perform **asynchronous operations** in a **synchronous-like** manner.

To get an idea of what this **asynchronous** behavior would look like, let's go ahead and create a **timeout**. Inside of the `timeout`, we'll create a **function**, and in this function, let's just put our **if-else statement** that we were using previously. Let's set a timeout here of two seconds.
```javascript
var d = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (true) {
      resolve('hello world');
    } else {
      reject('no bueno');
    }
  }, 2000);
});
```
We still have our `false` being evaluated by the **if statement**, so after a two-second delay, we should see that our, `Error : No bueno`, is passed into our console. Let's come back down here and run it again. We have a two-second delay where, `Error : No bueno`, is returned to us.

We can go ahead and change this to `true`, run it again, and this time we'll see that we get, `Success : Hello world`, after our two-second delay.

There's several different methods you can use when dealing with your `.then()` and `.catch()` callbacks. If you don't prefer to use the `.catch()` method, you could then, instead, supply a **second argument** into the `.then()` method, which will act as an **error** callback.

In here, let's go ahead and pass in our `error` again as our parameter, and we'll just `console.error`. This time, we'll do a new message so that we can see that it's actually our **second callback** of the `.then()` method which is being called.
```javascript
d.then ((data) => console.log('success : ', data), (error) => {
  console.error('new error msg: ', error);
});
```
Let's go back up to our `if` statement, change `true` to `false` so we can make sure that our **reject** is what's fired. We'll come back down into our console. We'll run the code. Again, after our two-second delay, we'll see that the new error message, `No bueno`, is returned to us.

I prefer to use the `.catch()` method for **rejects** and `.then()` for **resolve** only. This ensures that I can always be certain that if I have a function inside of the `.then()` method, that it is my **success callback**, and I can put in the appropriate code.

`.then()` and `.catch()` can also be **chained together**. Let's go ahead and chain these two things together, run our code again, and we'll notice that we still get our **error message**.
```javascript
d.then((data) => console.log('success : ', data)).
  catch((error) => console.error('error : ', error));
```
Alternatively, we can decide to **chain several .thens** together and have them called **in succession**. We'll notice now, if we change our **if statement** to `true` and run our code, the **resolve** will be called and both **.thens** will **fire one after another**. Let's come down and run our code.
```javascript
d.then((data) => console.log('success : ', data)).
  then((data) => console.log('success 2 : ', data)).
  catch((error) => console.error('error : ', error));
```
We see that we get `success` and `success 2`. Notice that `success 2` is `undefined`. This is because the `data` that's available in the **callback** of the second then is not what is **originally passed** into the **resolve** but rather what is **returned from the original then method**.

To see a working example of this, let's go ahead and **return a value** from our first `.then()`, which will then be **passed into the second** `.then()`. If we come back to our console and run the code again, we'll notice that rather than `undefined`, we get `foo bar` passed back to us.
```javascript
d.then((data) => {
    console.log('success : ', data);
    return 'foo bar';
  }).
  then((data) => console.log('success 2 : ', data)).
  catch((error) => console.error('error : ', error));
```
One more important thing to note is that whenever an **error or exception** is thrown within the **promise**, it will automatically trigger the `.catch()` to call, **regardless of when** that **error's thrown**.

To see a basic example of this, let's go ahead and **throw** a new `error`, run our code again, and we'll notice that this time our `error` is returned to us, even though we're **evaluating true**, which means our **resolve should fire**. This statement remains `true`, regardless of when the **error's thrown throughout the promise**.
```javascript
var d = new Promise((resolve, reject) => {
  throw new Error('error thrown!');
  setTimeout(() => {
    if (true) {
      resolve('hello world');
    } else {
      reject('no bueno');
    }
  }, 2000);
});
```
For example, if we come into our second `.then()` statement, we can go ahead and throw that error in the second `.then()`, and we'll notice that the **catch will also fire**.

Now, if we were to **add that error** to the first `.then()`, then that **second then would never fire**, because it's going to go straight to the catch.

Those are some basic examples of how to use promises with **ES6** or **ECMAScript 2015**.