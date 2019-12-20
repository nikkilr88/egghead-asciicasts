Instructor: [00:00] We have this great test, and it's taking a snapshot of the first child of our container because our calculator display only renders div, so we're just snapshotting the first child. One thing that I don't like about this is this generated class name. It is totally not helpful at all.

[00:16] In our search code here, we're using the CSS prompt from emotion, which is great, but it would be really nice if I could see that value in my snapshot rather than having some weird generated class name.

[00:27] Any time I make a change to this, if I change this to flex 2, for example, and run `npm t` I'm going to get a snapshot failure, but that snapshot failure will be not even close to helpful. It would be really nice if I could get a more helpful snapshot error right here.
```js
css={{
  position: 'relative',
  color: 'white',
  background: '#1c191c',
  lineHeight: '6em',
  flex: '2',
}}
```

[00:40] To do that, I'm going to `npm install` and save as dev dependency jest-emotion. 

```bash
npm install --save-dev jest-emotion
```

Jest-emotion is what's called a snapshot serializer. With that installed, I can go to my Jest configuration. I'm going to configure snapshotSerializers. One of those will be jest-emotion, the one that I just installed.

```js
snapshotSerializers: ['jest-emtion'],
```

[01:02] With that configured, I can now run `npm t` to run my test again. My snapshot is actually going to look wildly different from what it looked like before. Now, instead of this class name that's all generated, the class is actually going to be emotion-0This is the first emotion class name in my snapshot.

[01:20] Then we can see that it's associated to this emotion-0css that is inserted above the DOM node that's been serialized. If I run NPMT with a -- -u, to run Jest with the -u flag, and I go back to my test, then I'm going to see that I've got all of that information right in my snapshot right here.

```bash
npm t -- -u
```

[01:41] If I do make another change, where if I change flex back to 1, and run `npm t` to run my test again, I'm going to a snapshot failure. I'm going to see exactly what impact my change made on the snapshot.

[01:53] If you're using a CSS-in-JS library, I recommend that you use this serializer if you're going to be using snapshots. In review, what we did was we simply installed the jest-emotion module and configured Jest to use that module as a snapshot serializer, and then we updated our snapshot.

[02:10] Any DOM node that's using an emotion class name will automatically have this css added above the serialized DOM, making it a lot easier to identify the changes that you're making to your css.
