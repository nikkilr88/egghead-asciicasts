Instructor: 00:00 Another option you have to further customize the `transitionConfig` of a navigator is to write your own `screenInterpolator` function, which we'll go ahead and do in a separate function called `interpolator`.

```javascript
transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: interpolator
```

00:10 `interpolator` is going to take a series of `arguments`. The first one is going to be `sceneProps`. On `sceneProps`, we can go ahead and access the `layout`, `position`, and `scene` by using destructuring syntax to go ahead and destructure `sceneProps`.

```javascript
const interpolator = (sceneProps) => {
  const { layout, position, scene } = sceneProps;
```

00:27 Then from our `interpolator` function, again, we'll `return` an object with specifications on how we want to actually modify it. For example, we can go ahead and modify the `opacity` by saying `position.interpolate`. `position` is an animated dot value, which means we can call this `interpolate` function on it.

00:46 `interpolate` is going to take an `inputRange`, and it's also going to take an `outputRange`. Each of those are going to be `arrays`. What we want to do is access `scene.index - 1`. This will take place when it's a previous scene.

01:00 We'll say when `scene.index`, when it's the current screen, and finally, when it's `scene.index +1`. When this is the previous screen, this is the instance. When it's the current screen, this is the instance. When this is the incoming screen, this will be the instance.

01:18 With this in mind, when this is the incoming screen, we're going to want the `opacity` to be `0`. When it's the current screen, we want it to be the `opacity` at `1`. Finally, when it's the previous screen, we want the `opacity` back to `0`. 

```javascript
  const opacity = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [0, 1, 0],
  })
```

We can then go ahead and pass `opacity` to our `configuration` `object`, and then when I go to the next screen, you can see that rather than sliding over, it's fading. 

```javascript
  return {
    opacity,
  };
};
```

You can see the difference between the header and the body of the content, how they're using two different ways of navigation.

01:46 You can go ahead and expand on this. For example, what I've just put in here is we can modify the `scale`. Again, we're using `position.interpolate`. We're using that same `inputRange`. We're just using a slightly different `outputRange` to determine what the `scale` should be.

```javascript
  const scale = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [0.8, 1, 1],
  });
```

02:00 We can also go ahead and use the `height`. This will allow us to offset the content and move it from the bottom to the top, which is what we're doing here. When it's the incoming scene, the `translateY` is going to be completely off the screen. When it's the current screen, it will be `0` offset. When it's the outgoing screen, again, `0` offset.

```javascript
const height = layout.initHeight;
  const translateY = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [height, 0, 0],
  });
```

02:20 We can then go ahead and use these variables in a `transform`, which takes an `array`. Inside of that `array`, we'll pass two `objects`, one with `scale`, and one with `translateY`.

```javascript
return {
    opacity,
    transform: [
      { scale },
      { translateY },
    ],
  };
};
```

02:30 Now, when we make this navigation change, you can see that in addition to fading or scaling the screen in, we're also sliding it in from the bottom.

02:39 You're not limited to just using the `screenInterpolator` for the primary content. You can also adjust the title content by using the `headerTitleInterpolator`. You can modify the left button by using the `headerLeftInterpolator`, and you can modify any right buttons that you would have in your application by using `headerRightInterpolator`.

```javascript
transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: interpolator,
      headerTitleInterpolator: interpolator,
      headerLeftInterpolator: interpolator,
      headerRightInterpolator: interpolator,
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    };
  },
});
```

02:58 By doing this, you can see that everything is navigating in the same way, and we can go ahead and make this a little bit more realistic by just using the `opacity` to go ahead and fade all of the content between scenes, rather than sliding content.