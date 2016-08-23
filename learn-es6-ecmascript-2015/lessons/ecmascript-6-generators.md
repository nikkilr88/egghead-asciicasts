You make a **generator** by adding **asterisks** right here after the **function** keyword. I'll go ahead and add a log statement saying that `You called 'next()'`. You might think that if I called `greet()` that it would log out `You called 'next()'` but nothing happens.
```javascript
function* greet(){
  console.log(`You called 'next()'`);
}

greet();
```
If we assign something like a `greeter` to this `greet()` and then we see what the `greeter` is you can see that the `greeter` is actually an **object** so it did not invoke this. It actually created an object which I can call `next()` on. When I call`greeter.next()`, and I'll just call this next and log that out. You can see that next is `{value: undefined, done: true}`.
```javascript
let greeter = greet();
console.log(greeter); // { next: [Function], throw: [Function] }
let next = greeter.next();
console.log(next);  // You called 'next()'
                    // { value: undefined, done: true }
```
You can also see that it finally invoked our log statement saying that `You called next()`. Now, this is `undefined` because we didn't **yield** anything from our generator. It's `done` because it's gone through all of the yield statements which are actually **none** right now.

If I yield a simple `hello` and run this again you can see now I get `{value: hello, done: false}`. It logged out our statement. It returned `hello` and it's not done yet. It will actually be done on the next pass through next.
```javascript
function* greet() {
  console.log(`You called 'next()'`);
  yield "hello";
}

let greeter = greet();
console.log(greeter); // { next: [Function], throw: [Function] }
let next = greeter.next();
console.log(next);  // You called 'next()'
                    // { value: 'hello', done: false }
```
If I call `next()` again, and I'll just name this one `done`, and I call the log statement again, so I'll just log out `done`. You can see that I get `hello` on the **first pass** with `done: false` and undefined with `done: true` because there are no more yield statements after this one, meaning it had iterated and gone through all of the yield statements.
```javascript
let greeter = greet();
console.log(greeter);       // { next: [Function], throw: [Function] } 
let next = greeter.next(); 
console.log(next);          // You called 'next()'
                            // { value: 'hello', done: false }
let done = greeter.next();
console.log(done);          // { value: undefined, done: true }
```
If you have **multiple yield statements** like `How`, `are`, and `you` and you run this with only calling `next()` once you can see that it **stops** after calling `how`. This, `console.log('I'm not called until the second next')`, is not called. That, `console.log('Call me before "you?"');` not called, and that, `console.log('Called when "done"');`  not called.
```javascript
function* greet(){
  console.log(`Generators are "lazy"`);
  yield "How";
  console.log(`I'm not called until the second next`);
  yield "are";
  console.log(`Call me before "you?"`);
  yeild "you?";
  console.log(`Called when "done"`);

  var greeter = greet();
  console.log(greeter.next()); // Generators are "lazy"
                               // { value: "How", done: false }
}
```
If you were to create any objects or anything inside of here they would not be created until you called `next()`, meaning that you can **put stuff** in here that's **not created until you explicitly need it**.

If we go ahead and call `next()` three more times and run it again you can see it logs out each log statement, then the yield, the log, then the yield. It logs this, then yields that, then logs this, then yields the next one.

Because it's an iterator you can also use the for/of syntax. We can say `for(let word of greeter)` and then log out the word and then run that. You can see the output is basically the same. `How are you?` The main difference is that this is grabbing the value off of the next.
```javascript
for(let word of greeter) {
  console.log(word);  // Generators are "lazy"
                      // How  
                      // I'm not called until the second next
                      // are
                      // Call me before "you?"
                      // you?
                      // Called when "done"
}
```
To do that by calling next we'd have to revert this and say `.value`, then run it again and we get the same output.
```javascript
console.log(greeter.next().value); // Generators are "lazy"
                                   // How
console.log(greeter.next().value); // I'm not called until the second next
                                   // are
console.log(greeter.next().value); // Call me before "you?"
                                   // you?
console.log(greeter.next().value); // Called when "done"
```
It's really easy to get mixed up when you start assigning things to yield statements. If I say `let friendly = yield "how";` and then I try to log out `friendly` you might expect it to log out `how` because that's what it's yielding. But if I run this you'll see it's actually logging out `undefined`.

The way that this works is that the `next()` step through the iteration, so if I say `" The heck" `, will basically send this back through and assign it to this `friendly`. If I log this out now you'll see I get `How`, and then `The heck`. That means you can start building things through the **iteration process**.
```javascript
function* greet(){
  let friendly = yield "How";
  yield "are";
  yield "you?";
}

var greeter = greet();
console.log(greeter.next().value);              // How
console.log(greeter.next(" the heck ").value);  //  the heck
console.log(greeter.next().value);              // are
                                                // you?
```
If I yield `friendly + are` and then I assign `friendly` to this and then I yield `friendly + "you"` and I pass in `" silly ole "` and I run this again you can get `How the heck are silly ole you?` because this message is being returned here when the next step is run and assigned to this `friendly`. I yield that part of the `friendly` and then this comes from here, which is being assigned here. Then it yields that final statement.
```javascript
function* greet(){
  let friendly = yield "How";
  friendly =  yield friendly + "are";
  yield friendly + "you?";
}

var greeter = greet();
console.log(greeter.next().value);              // How
console.log(greeter.next(" the heck ").value);  //  the heck are
console.log(greeter.next(" silly ol`").value);  //  silly ol'you?
```
One thing to note is that because this **assignment** happens on the **run after** the **first** one it's actually impossible to **pass a value** in here. 
```javascript
var greeter = greet();
console.log(greeter.next("first").value); // TypeError: Sent value to newborn generator
```
If I try and say `"first"` and run this I'll get an error saying, `Sent value to a newborn generator`, because you haven't given this a chance to run and iterate and go to the `next()` step where you could actually pass in a value.

Lastly, generators also help you work with **infinite sequences**. If I wrap my yield with a `while(true)`, which is never going to stop looping, I can safely `yield {x:x, y:y}` point knowing confidently that this stuff isn't going to evaluate until the next step through after the yield process.
```javascript
function* graph(){
  let x = 0;
  let y = 0;
  while(true){
    yield  {x:x, y:y}
    x += 2;
    y += 1; 
  }
}

var graphGenerator = graph();
console.log(graphGenerator.next().value);
```
It will safely pause instead of infinitely going through this while loop. When I run this, you can see I get zero, two, four, six, eight and so on. Zero, one, two, three, four, and so on. 
```javascript
// {x: 0, y: 0}
// {x: 2, y: 1}
// {x: 4, y: 2}
// {x: 6, y: 3}
// {x: 8, y: 4}
// {x: 10, y: 5}
// {x: 12, y: 6}
// {x: 14, y: 7}
```
I could generate these forever. They're also only created when I request them through the yield. They're not created ahead of time.

Don't worry. We will dive more into practical use cases of **generators** in future videos.