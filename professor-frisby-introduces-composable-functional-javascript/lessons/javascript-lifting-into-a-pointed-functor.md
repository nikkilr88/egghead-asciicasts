You may have seen this function `of` popup here now. It's really a generic interface to be able to place a value into our type, or we call it lifting a value to our type. Here, we have `Task.of`. If we say `('hello')`, we end up with a `//Task('hello')`. If we have an `Either.of('hello')`, we end up with a `//Right('hello')`.

#### of.js
```javascript
Task.of('hello') // Task('hello')
Either.of('hello') // Right('hello')
```

Similarly, if we have a `Box.of` say `(100)`, we're just picking arbitrary values here. We're just putting those values inside our types, and this is regardless of any constructor complexities here.

If you recall `Task` as the constructor where we take a `rej` function, a `res` function, and resolve this. 

```javascript
new Task((rej, res) =>
    res('hello'))
```

This would be much more complex and not to the generic interface that I could use to program functions that just pop a value into a type, not worrying about any constructors or specifics.

"Why did we choose `Right` instead of `Left`?"

That's a terrific question. The reason for this is that one of the contracts or intuitions of `of` here, is that as soon as I pop a value into my `of`, I want to be able to start mapping and chaining and using all of those generic interface functions on this value. If this was to return a `Left`, we wouldn't be able to actually map over it.

```javascript
Either.of('hello').map(x => x + '!')
```

It would just ignore maps and chains. That's kind of ignoring the contract of `of`, which would just lift a value into a type and start working with it as if it's a total success and things work the way they should.