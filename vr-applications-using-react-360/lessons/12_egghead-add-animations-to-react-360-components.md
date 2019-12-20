Instructor: [0:00] We have an updated version of our app with the app component over here. It would be great to be able to animate that. We would like to make the Earth spin and bounce up and down. In order to do that, `import` `animated` from `react-360`.

#### Earth.js

```js
import React from "react"
import { Animated, asset, View } from "react-360"
import Entity from "Entity"
import AmbientLight from "AmbientLight"
import PointLight from "PointLight"
```

[0:13] Next, we're going to create a new `AnimatedEntity` component. Basically, we're going to wrap the entity component inside of an animated library imported from React 360.

```js
import React from "react"
import { Animated, asset, View } from "react-360"
import Entity from "Entity"
import AmbientLight from "AmbientLight"
import PointLight from "PointLight"

const AnimatedEntity = Animated.createAnimatedComponent(Entity)
```

We're going to replace the entity with the animated entity.

```js
<AnimatedEntity
  source={{ gltf2: asset("Earth.gltf") }}
  style={{
    transform: [
      { translateY: this.jumpValue },
      { scale: 0.001 },
      { rotateY: this.rotation }
    ]
  }}
/>
```

[0:27] Next up, we're going to create a new animated value. I'm going to create a rotation value, and it's going to be a `new Animated.Value`. By default, I'm going to set it to `zero`.

```js
export default class Earth extends React.Component {
  rotation = new Animated.Value(0);
```

Next up, we're going to create a `spin` function.

[0:38] Inside of this function, first, we're going to reset the rotation value to `zero`. Next, we're going to use the `Animated.timing` function to modify this rotation value from to 360. We're going to do `this.rotation`, and we're going to provide an options object.

[0:55] First, we would like to set the rotation value `toValue` `360` over the course of `four` seconds. We're going to set the start function. Start function takes a callback, so what should happen after the rotation is completed.

```js
spin() {
  this.rotation.setValue(0);
  Animated.timing(this.rotation, {
    toValue: 360,
    duration: 4000,
  }).start(() =>

  )
}
```

[1:08] We should start the rotation again, because we would like to make an infinite animation. Next, I'm going to create a `componentDidMount` function, and I'm going to run this spin.

```js
spin() {
  this.rotation.setValue(0);
  Animated.timing(this.rotation, {
    toValue: 360,
    duration: 4000,
  }).start(() => this.spin())
}

componentDidMount() {
  this.spin()
```

In order to use the spin value, we're going to use it here in the rotate Y transform value.

[1:23] I'm going to do `this.rotation`.

```js
<AnimatedEntity
  source={{ gltf2: asset("Earth.gltf") }}
  style={{
    transform: [
      { translateY: this.jumpValue },
      { scale: 0.001 },
      { rotateY: this.rotation }
    ]
  }}
/>
```

After I save and refresh that, we're going to see the updated results. Right now, we have this spinning model of the Earth.

`See 1:29 in lesson`
![Spinning Earth](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/add-animations-to-react-360-components-spinning-earth.png)

The problem is that you will notice that this animation is going to slow down at the end.

[1:37] The reason this happens is that by default, the animated timing function is using an in and out easing function. Basically, what that means is that both the beginning and the end of the animation is a bit slower.

[1:49] In order to fix that, we're going to `import` `Easing` from `Easing`. I'm going to set the `easing` to `Easing.linear`.

```js
import React from "react"
import { Animated, asset, View } from "react-360"
import Entity from "Entity"
import Easing from "Easing"
import AmbientLight from "AmbientLight"
import PointLight from "PointLight"

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class Earth extends React.Component {
  rotation = new Animated.Value(0)

  spin() {
  this.rotation.setValue(0);
  Animated.timing(this.rotation, {
    toValue: 360,
    duration: 4000,
    easing: Easing.linear
  }).start(() => this.spin())
}

componentDidMount() {
  this.spin()
```

If I save and refresh that, we're also going to have a spinning animation, but the speed of the animation is consistent, so it doesn't slow down.

`See 2:01 in lesson`
![Speed animation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149314/transcript-images/add-animations-to-react-360-components-speed-animation.png)

[2:06] Next, we're going to make our Earth model jump up and down. First, I'm going to create two variables for low and `TOP_Jump_Value`. I'm going to create a new `jumpValue`, and it's going to be a `new Animate.Value`.

[2:18] The default value is going to be `LOW_JUMP_VALUE`.

```js
const AnimatedEntity = Animated.createAnimatedComponent(Entity)
const LOW_JUMP_VALUE = 1.5
const TOP_JUMP_VALUE = 1.75

export default class Earth extends React.Component {
  rotation = new Animated.Value(0)
  jumpValue = new Animated.Value(LOW_JUMP_VALUE)

  spin() {
    this.rotation.setValue(0)
    Animated.timing(this.rotation, {
      toValue: 360,
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.spin())
    }
```

Next, I'm going to create a `jump` function. It's going to take the current value as an argument, and we're going to create a new variable for the next value. `nextValue` is going to be whatever the `currentValue` is equal to, `TOP_JUMP_VALUE`.

[2:38] We're going to replace that with the `LOW_JUMP_VALUE`. In the other case, we're going to use the `TOP_JUMP_VALUE`.

```js
jump(currentvalue) {
  let nextValue = currentValue === TOP_JUMP_VALUE ? LOW_JUMP_VALUE : TOP_JUMP_VALUE
```

We're going to use the `Animated.timing` function to modify `this.jumpValue`. We're going to provide options.

[2:53] We would like to modify this jump value `toValue` of `nextValue` over the course of a half a second. Here, we're going to `.start`, provide a callback, in which we're going to call the `jump` function with the `nextValue`.

```js
jump(currentvalue) {
  let nextValue = currentValue === TOP_JUMP_VALUE ? LOW_JUMP_VALUE : TOP_JUMP_VALUE

  Animated.timing(this.jumpValue, {
    toValue: nextValue,
    duration: 500
  }).start(() => this.jump(nextValue))
}
```

[3:07] Then we're going to call it in the `componentDidMount`. I'm going to do `this.jump`, and I'm going to provide `LOW_JUMP_VALUE` argument by default.

```js
componentDidMount() {
  this.spin()
  this.jump(LOW_JUMP_VALUE)
}

```

I'm going to use this value here in the translate Y. I'm going to replace that 1.5 with `this.jumpValue`.

```js
<AnimatedEntity
  source={{ gltf2: asset('Earth.gltf') }}
  style={{
    transform: [
      { translateY: this.jumpValue },
      { scale: 0.001 },
      { rotateY: this.rotation }
      ]
```

[3:22] After I save and refresh that, we can see both infinite animations running at the same time. The arrow is both spinning and jumping.

`See 3:22 in lesson`
![Infinite animation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/add-animations-to-react-360-components-infinite-animation.png)
