To help you think in Reactive Programming, we need to understand not just what event streams are, but especially why we should use them. To me, it boils down to one simple reason. It allows you to specify the dynamic behavior of a value completely at the time of creation.

We're going to code an example here, but I'm going to write that property down, because it's really important to understand it. Also, it might be better to grasp once it's written down.

```javascript
// it allows you to specify the dynamic behavior completely at the time of declaration
```

Let's see the opposite example of this. Let's say you have a `var a`, which has initially the value 3. Then you have a `var b`, which is `10 * a`. If we `console.log()` out `b`, we will see 30.

```javascript
// it allows you to specify the dynamic behavior completely at the time of declaration

var a = 3;
var b = 10 * a;

console.log(b);
```

Let's say we change `a` to be 4. If we `console.log()` `b`, `b` is still 30. It didn't catch up with this new value of 4, because it's statically declared as `10 * a` at the time that this line passed through the flow of control. What we need to do is actually, again, set `b` to that formula. Now, when we `console.log()` `b`, we see 44. But, if you noticed, I made a type here. Instead of 10, I wrote 11.

```javascript
// it allows you to specify the dynamic behavior completely at the time of declaration

var a = 3;
var b = 10 * a;

console.log(b);

a = 4;
b = 11 * a;
console.log(b); 
```

This means that `b`, even though it's a value evolving over time, it's not a constant. This declaration here does not specify the dynamic behavior of that value `b` at the time of declaration, because later I just say it's 11.

Ideally, what I would want is I just say that `b` is always `10 * a`, and whenever `a` changes, then `b` will be `10 * a`'s new value.

That is what we can accomplish with event streams. Let's say that I have `streamA` that is an event stream of just the value 3. Then I have `streamB`, which is `streamA` mapped. Each of these `a` values will be mapped to `10 * a`.

```javascript
var streamA = Rx.Observable.of(3);
var streamB = streamA.map(a => 10 * a);
```

If I add an event listener to that `streamB` and I `console.log()`, we will see `b` being 30.

```javascript
streamB.subscribe(b => console.log(b));
```

But now I want to change the value of `streamA`. Here is where a lot of people get stuck, because they want to change `streamA`. So, they feel like doing this, `set` to 4, or something like this. But, this is not what we should do. Why?

```javascript
streamA.set(4);
```

Because `a` is also a dynamic value over time, and that means that we need to specify that dynamic behavior completely at the time of declaration. This is not the time of declaration. But instead this is the time of declaration, and that's where the trick is.

```javascript
var streamA = Rx.Observable.of(3);
```

We need to specify not just `b`'s behavior once, but also `a`'s behavior once. We cannot change `a` later. We have to specify how `a` will work over time. And we have to specify only at the time of the declaration.

If we do this, now we have an event stream that has just simply two events. It has event 3, and then it has event 4, and `b` will change accordingly whenever `a` changes. If we run this, we see `b` being 30 and 40.

```javascript
var streamA = Rx.Observable.of(3, 4);
```

The why, remember, is because Reactive Programming allows you to specify the dynamic behavior completely only once, at declaration.