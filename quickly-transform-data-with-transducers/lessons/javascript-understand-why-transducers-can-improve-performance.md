To understand why transducers are useful, we first have to understand the problem of chaining operations when iterating through arrays. Let's do some performance tests. To help us with that, we've got this `arrayOfRandoms` function, which will just help us generate arrays of various lengths with random numbers up to this random ceiling.

#### 1-why-transducers-are-helpful.js
```javascript
const arrayofRandoms = randomCeil => length =>
    Array.from({length: length}, (v, i) =>
        Math.floor(Math.random() * randomCeil));
```

We've also got this timer function which will just help us time how long functions take to execute. 

```javascript
const timeIt = (label, fn) => {
    console.time(label);
    fn();
    console.timeEnd(label);
};
```
Let's use `arrayOfRandoms` to create two arrays. The first one will have 1,000 values in it, and the second one will have one million values.

```javascript
const arrOfThousand = arrayofRandoms(100)(1000);
const arrOfMillion = arrayofRandoms(100)(1e6);
```

Just a quick tip, if you haven't seen this `1e6` syntax before, it's a really handy way to define large numbers, since you won't go crazy counting zeros. It's called a scientific notation literal, and it means to multiply a number by 10, then raising to a given power.

`1e6` would be the same as one times ten to the power of six,

```javascript
1e6 === 1 * 10 ** 6;
```

but you can think of it simply as how many zeros do I want to add? 

Now, let's get to work with some array operations. I'm going to write `const resultFrom1000`, and let's start working on our `arrOfThousand`.

Let's say a business requirement is to triple our values, and then only include those that are even. Let's add on a `map`, and that's going to return a value times three. 

```javascript
const resultFrom1000 = arrOfThousand.map(val => val * 3);
```

A `filter` operation is a perfect match for our second requirement, so let's just put this on a new line.

Then we're going to call `filter`. Our predicate is only going to return true for even values. 

```javascript
const resultFrom1000 = arrOfThousand
    .map(val => val * 3);
    .filter(val => val % 2 === 0);
```

We'll be using these functions a few times, so let's extract them. Let's call the first one `isEven`, and that will be the result of our filter predicate. 

```javascript
const isEven = val => val % 2 === 0;
```
We'll call the second one `tripleIt`. That will our map call.

```javascript
const tripleIt = val => val * 3;
```

Let's see how this performs. Let's start by only measuring the call to `map`. We'll label this `thousand - map`, and it'll take an anonymous function. In here, we just copy in our execution, but we'll delete the filter.

```javascript
timeIt('thousand - map', () => {
    const resultFrom1000 = arrOfThousand
        .map(tripleIt);
});
```

Let's copy this again, and we'll name this `thousand - map & filter`. We'll just add back our call to `filter` in here. 

```javascript
timeIt('thousand - map & filter', () => {
    const resultFrom1000 = arrOfThousand
        .map(tripleIt)
        .filter(isEven);
});
```

Let's see how they compare. We see that our call to `thousand - map` took `0.8 milliseconds`, but our call to 'thousand - map & filter' took `1.8`.

Now, depending on your app, this is usually nothing you have to worry about, as these numbers are really small anyway. No real alarm bells yet, but let's do the same thing to one million records. Let's just copy both of these blocks, and we'll just rename `thousand` to `million`. We'll change these to use our `arrOfMillion` inside.

```javascript
timeIt('million - map', () => {
    const resultFrom1000 = arrOfMillion
        .map(tripleIt);
});

timeIt('million - map & filter', () => {
    const resultFrom1000 = arrOfMillion
        .map(tripleIt) //[]
        .filter(isEven);
});
```

Now, let's compare these two. As we can see, our call to 'million - map & filter' took about 1.3 seconds, but our call to 'million - map' took only 750 milliseconds. That's getting up there where users will definitely start noticing the difference.

What can we do? We still have to have our two operations. The problem is that both `map` and `filter` have to go through the whole array. We're iterating through the collection twice. What I mean by that is a call to `map` will produce a new array with all the values here as an intermediary collection. Then `filter` will go through that array again from the beginning.

How can we keep all our logic, but only iterate through the collection once? Generally, we solve this by falling bad on our good old imperative problem solving skills. Let's give that a go. Let's just do in-line within one of these timing functions.

Let's call this `million - imperative`, and we don't need to save our results. 

We're just interested in the outcome. Instead of mapping and filtering, let's create an external variable to hold our result, which will be an empty array.

Then we'll comment out our `map` and `filter`, and instead, we're going to call a `forEach`, which will take a value. 

```javascript
timeIt('million - imperative', () => {
    const result = [];
    arrOfMillion
        .forEach(val => {
         
        });
});
```

Then in here, we want to replicate our call to `map`. Let's create a `const` called `tripled`, which will be the result of calling `tripleIt` with our value.

```javascript
timeIt('million - imperative', () => {
    const result = [];
    arrOfMillion
        .forEach(val => {
            const tripled = tripleIt(val);
        });
});
```

Then for our filtering operation, we just want to check if our `tripled` value is even. If it is, we want to push it onto our `result`. 

```javascript
timeIt('million - imperative', () => {
    const result = [];
    arrOfMillion
        .forEach(val => {
            const tripled = tripleIt(val);
            if (isEven(tripled)) result.push(tripled);
        });
});
```

Now, let's measure this. Our execution time is now down to 344 milliseconds, compared to 1,400, but our code quality has suffered.

Wouldn't it be great if we could keep our array operations defined separately, but still only iterate once through our collection? This is where transducers are going to save us from our misery.