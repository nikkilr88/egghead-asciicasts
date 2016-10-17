Every `Subject` is an observable and an observer, too. The `subscribe` method of the observable expects an observer. That's how we were able to pass the `subject` as the argument.

It also means we can freely use the observer methods like `next`, and `error`, and `complete` in order to essentially send a value into the `subject`. This allows us to manually control the observable that this `subject` represents.

**jsbin**
```javascript
subject.next(10);
```

For instance, we could get rid of this `observable.subscribe` and we could remove that as well.

**jsbin**
```javascript
// REMOVED
var observable = Rx.Observable.interval(1000).take(0);
```

Now, we have only the `subject` and its observers, `A` and `B`. Then, we could do `subject.next` to send the value `1`. Then, we can send `2` and `3` like this.

**jsbin**
```javascript
subject.next(1);
subject.next(2);
subject.next(3);
```


Then, when we run this, we see `observerA` sees those events that we manually passed here. We could also, let's say, do `subject.complete` to say that this is done.

We can even, let's say, set an interval to run every second -- every one second. We're going to deliver a value into that `subject`, like `10` every second. Then, `A` is going to see one, two, three. After two seconds, `B` arrives, and C is the same.

**jsbin**
```javascript
setInterval(() => {
  subject.next(10);
}, 1000);
```

**Console Output**
```
"A next 0"
"A next 1"
"A next 2"
"B next 2"
"A next 3"
"B next 3"
"A next 4"
"B next 4"
"A done"
"B done"
```

This is a lower level API than using, let's say, operators and creation methods, but it may be useful in some cases. Here, for instance, is an example in **React**. We have this component called `Hello` that renders a `div` that has a string inside it.

**jsbin**
```javascript
class Hello extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};

    this.subject = new Rx.Subject();

    this.subject
      .map(ev => +1)
      .scan((acc, x) => acc+x)
      .delay(1000)
      .subscribe(x => {
        this.setState({count: x});
      });
  }
  
  render() {
    return (
      <div onClick={ev => this.subject.next(ev)}>
        {'${this.state.count} Hello ${this.props.name}'}
      </div>
    );
  }   
}

ReactDOM.render(<Hello name="World" />, 
document.querySelector('#app'));
```

The string has a `count`. It shows a `count`, which is initialized to `0`. Then, it says, "Hello" and it says the `name` that was given as a `prop`. For instance here, we had `"World"` and it could have well been `"Egghead"` for instance.

**jsbin**
```javascript
ReactDOM.render(<Hello name="Egghead" />, 
document.querySelector('#app'));
```

It shows first `0 Hello Egghead`. In the `constructor`, we also made `this.subject`. It's an **event bus** basically. That allows us to do this. `onCLick` of the `div`, the handler, we can simply send that event to the `subject`.

**jsbin**
```javascript
<div onClick={ev => this.subject.next(ev)}>
```

Here, we're creating another observable based on the `subject`, or our event bus, so that every click event will be mapped to `+1`. Then, we add all of those plus one numbers. We `delay` them.

**jsbin**
```javascript
this.subject
  .map(ev => +1)
  .scan((acc, x) => acc+x)
  .delay(1000)
  .subscribe(x => {
    this.setState({count: x});
  });
```

This is an observable based on the event bus that we can `subscribe` to and set the state so that this will show a sum of numbers on the count. When we click many times, it's delayed and it's summed. We can still use RxJS observables and operators. We can also use this event bus pattern so that we can send events like that.

Usually, using event buses are not a good idea because you can shoot yourself in the foot. For instance, let's say, you do `subject.error` for some reason. Then, you may actually, since you're manually controlling it, you may send two errors.

**jsbin**
```javascript
subject.error('bad');
subject.error('bad');
```

That is not a good idea because we're violating the observable contract. Then, many other things don't work properly. Because we're manually controlling it, we have opportunities to doing things wrong.

We also lose some benefits of reactive programming, which is **we only want to react to things. We don't want to control other entities**. That's what we're doing when we use an API like `.next`. We're essentially controlling this other entity.

For instance, if we pass the `subject` to other modules, then those other modules can control how the `subject` works. That's basically the opposite of reactive programming.

If you do that too much, then there's no point in using RxJS. Still, there are cases where you know what you're doing and then you can use the `subject` as an event bus for multiple observers.