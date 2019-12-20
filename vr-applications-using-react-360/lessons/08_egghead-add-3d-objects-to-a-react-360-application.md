Instructor: [00:00] To import our 3D model in React 360 application, go to `components` and create a new file that we're going to call `arrow.js`. Here, `import` `React` from `react`, and we're going to also `import` `asset` and `View` from `react-360`.

#### Earth.js

```js
import React from "react"
import { asset, View } from "react-360"
```

[00:12] In order to display 3D models inside of React 360 application, we need to `import` `Entity` from `Entity`. entity is also part of React 360, but you have to import it in this way. We're going to create a new component. We're going to call it arrow.

[00:25] It's going to extend `React.Component`, and we're going to render a view and the `entity` inside of it.

```js
import React from "react"
import { AppRegistry, asset, View } from "react-360"
import Entity from "Entity"

export default class Earth extends React.Component {
  render() {
    return (
      <View>
        <Entity></Entity>
      </View>
```

`Entity` allows us to display external 3D models. We can either design something, or we can go to a website, such as Google Poly, and download a free model for our application.

[00:40] We can download this model in a couple of different formats. React 360 supports both object file and GLTF file. GLTF basically like a JPEG for 3D, and we're going to use this one. I'm going to download it and put it inside of our static assets directory.

[00:55] Here, we can see it inside of the static assets directory. To assign this model to the `Entity` component, we need to specify a source. It's going to take an object, `gltf2`. We're going to set it equal to `asset` `Earth.gltf`.

```js
export default class Earth extends React.Component {
  render() {
    return (
      <View>
        <Entity source={{ gltf2: asset('Earth.gltf') }}/>
      </View>
```

[01:09] Let me save that, and right now, what we need to do is to register this `Earth` component. In order to do that, go to `index.js`, import the arrow component, like we do it with the flag component, and register it over here like this.

#### index.js

```js
import React from "react"
import { AppRegistry, asset, StyleSheet, View, Image } from "react-360"
import Flag from "./components/Flag"
import Earth from "./components/Earth"

export default class travelVR extends React.Component {
  render() {
    const { flagContainer } = styles

    return <View style={mainView} />
  }
}

const styles = StyleSheet.create({
  flagContainer: {
    height: 600,
    width: 4680,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})

AppRegistry.registerComponent("travelVR", () => travelVR)
AppRegistry.registerComponent("Flag", () => Flag)
AppRegistry.registerComponent("Earth", () => Earth)
```

[01:24] Right now, we need to jump into `client.js` and render this component somehow. We cannot use a surface, because surfaces are for displaying React components onto flat planes, either on a cylinder or on a flat surface.

[01:36] With 3D models, we have to use something different. We have to use a location. First up, we need to import location from React 360 web, and we're going to create a new location. I'm going to call it `myNewLocation`, and it's going to be a `new Location`.

[01:51] Here, we have to set in an area specifying the position of the location within the x, y, and z-axis. I'm going to put it as `three` meters to the right, `zero` meters in the y-axis, and minus `one` meter in the z-axis. This model is going to be displayed `three` meters to the right and `one` meter in front of me.

[02:08] We're going to render the arrow component to this new location. We're going to do `r360.RenderToLocation`. Then we're going to create a new root, with the `Earth` component. I'm not going to set any props, and I'm going to use `myNewLocation`, like this.

#### client.js

```js
const myNewLocation = new Location([3, 0, -1])
r360.renderToLocation(r360.createRoot("Earth"), myNewLocation)
```

[02:24] I'm going to comment out this flag comment, because we are not going to need that. After we save and refresh that, we are not going to be able to see the arrow. We need to shed some light on this situation. There are a couple of different types of lighting we can use in React 360 applications.

[02:38] In this case, I'm going to use an ambient light. We're going to import it from `AmbientLight`, and I'm going to set the `intensity` of the light to `1.0` We're going to set the `color` of the light to `white`. After I save and refresh that, we can see our problem.

#### Earth.js

```js
import React from "react"
import { AppRegistry, asset, View } from "react-360"
import Entity from "Entity"
import AmbientLight from "AmbientLight"

export default class Earth extends React.Component {
  render() {
    return (
      <View>
        <AmbientLight intensity={1.0} color={'#fff'} />
        <Entity source={{ gltf2: asset('Earth.gltf') }} />
      </View>
```

`See 2:48 in lesson`
![Earth is displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/add-3d-objects-to-a-react-360-application-earth-added.png)

[02:50] We were displaying the earth, but it's absolutely massive. We need to scale it down a bit. To change that, we need to use this transform property. I'm going to specify a style. Inside of the style, we're going to have a `transform`.

[03:00] `Transform` property takes an array. We're going to have `scale` of `0.03`, because our arrow is really huge. We're going to rotate it in the y direction by `120` degrees, and we're going to rotate it in the x direction by minus `-30` degrees.

```js
export default class Earth extends React.Component {
  render() {
    return (
      <View>
        <AmbientLight intensity={1.0} color={'#fff'} />
        <Entity
        source={{ gltf2: asset('Earth.gltf') }}
        style={{
          transform: [
            { scale: 0.003 },
            { rotateY: 120 },
            { roateX: -30 }
          ]
          }}
        />
      </View>
```

[03:15] After I save and refresh that, we have the desired effect.

![Earth scaled down](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/add-3d-objects-to-a-react-360-application-earth-scaled-down.png)

We have this 3D model of the arrow displayed a couple of meters to our right. The thing is, is that this model is flat right now. The reason it happens is that right now, we are using this `AmbientLight`.

[03:28] This ambient light has the same intensity in all kinds of direction. In order to have shadows displayed on this arrow model, we need to use some figures. First, `import` `PointLight` from `PointLight`.

```js
import React from "react"
import { AppRegistry, asset, View } from "react-360"
import Entity from "Entity"
import AmbientLight from "AmbientLight"
import PointLight from "PointLight"
```

I'm going to copy this ambient light, because point light is similar to ambient light.

[03:43] It also has an intensity, also has a color, but I'm going to transform it. I'm going to use `style`, and I'm going to supply a `transform` property. It's going to `translate`, as in move, our light source to `0,0,20`. It's going to appear 20 meters behind our back.

```js
<View>
  <AmbientLight intensity={1.0} color={"#fff"} />
  <PointLight
    intensity={1.0}
    color={"#fff"}
    style={{
      transform: [{ translate: [0, 0, 20] }]
    }}
  />
  <Entity
    source={{ gltf2: asset("Earth.gltf") }}
    style={{
      transform: [{ scale: 0.003 }, { rotateY: 120 }, { roateX: -30 }]
    }}
  />
</View>
```

[03:59] After I save and refresh that, we're going to see that our model looks much better, much more alive, because we are using the point size, so we can see the shadows on this model.

![Point light added to our earth](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/add-3d-objects-to-a-react-360-application-point-light-added.png)
