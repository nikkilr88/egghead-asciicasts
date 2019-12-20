Instructor: [0:00] So far, we've been creating React components inside of this index.js file, and those components were somehow projected onto this 360 view. How does it happen?

[0:09] The answer is, within the `client.js`, which a second JavaScript file that gets created by default once you create a new React 360 project. Essentially, each Reach 360 application is made out of two parts. There's your React code and the code is going to take your React components and actually project them onto 360 surface.

[0:27] The second piece is what we refer to as the run time. The run time is specified within the `client.js` because this is where your React 360 project gets initialized. Let's focus on this part.

[0:39] Here, we're entering to our surface, our `travelVR` component. The `travelVR` component is this component we have been working on so far. Here, we're using a `DefaultSurface`.

[0:49] In React 360, there are two types of surfaces. There is a cylinder surface and a flat surface. Let's take a look at the cylinder surface because this is what we have been using so far.

[0:58] If you look over here, you will notice that both the top and the bottom of our component is curved because this component is actually projected on a cylinder. The cylinder is actually a sphere of a four-meter radius that is surrounding the entirety of the user view.

[1:13] We can project different components on top of the surface, such as this travel vr component. Let's stop using the default surface and create our own. First, import `Surface` from `react-360-web`.

#### client.js

```js
import { ReactInstance, Location, Surface } from "react-360-web"
```

Here, we're going to create a new surface. I am going to call it as `mySurface`. It's going to be a `new Surface`.

[1:29] We need to specify a width, which I am going to set to `4,680`. I am going to set the height to `600`. I am going to set the `Surface.SurfaceShape.Cylinder`.

```js
const mySurface = new Surface(4680, 600, Surface.SurfaceShape.Cylinder)
```

The reason for the specific width is that if we set the width to `4680`, we create a surface that's going to wrap the entirety of the user's view.

[1:49] What we're going to do is that we're going to have a React component that is going to be displayed everywhere around the users. No matter which way we look, we are always going to see this component.

[1:59] To use this new surface, remove this default surface and use it like this. We are rendering this travel vr component to our newly created `mySurface`. Let me fix it, because I have a typo over here. Save and refresh.

```js
const mySurface = new Surface(4680, 600, Surface.SurfaceShape.Cylinder)

// Render your app content to the default cylinder surface
r360.renderToSurface(
  r360.createRoot("travelVR", {
    /* initial props */
  }),
  mySurface
)
```

[2:12] At the first glance, it would seem that our component has disappeared.

`See 2:13 in the lesson`
![Component moved](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/create-a-cylinder-surface-and-attach-a-component-to-it-in-react-360-component-moved.png)

This is not the case. What happens is that our component will simply move to the beginning of the surface and display over here.

[2:21] Instead of having this view of flags, we're going to create a component that's going to be in front of us no matter which way we look.

[2:28] To do that, go back to `index.js`. Remove both of those flags. We won't need them from now. Remove this flag. Remove those flags as well. We're going to set the `width` of this component to `4,680` so it's exactly the same as the `width` of the cylinder.

#### index.js

```js
export default class travelVR extends React.Component {
  render() {
    const { mainView } = styles

    return <View style={mainView} />
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: 4680,
    height: 600,
    backgroundColor: "#eee",
    alignItems: "center"
  }
})
```

[2:42] I am going to set `opacity` to `50` percent so that I can actually see what's behind my component after I save. First [inaudible] , we have the desired effect.

```js
const styles = StyleSheet.create({
  mainView: {
    width: 4680,
    height: 600,
    opacity: 0.3,
    backgroundColor: "#eee",
    alignItems: "center"
  }
})
```

Right now, we have this component displayed on the cylinder. No matter which way I look, I always see this component in front of me.

`See 2:53 in lesson`
![360 Component](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149313/transcript-images/create-a-cylinder-surface-and-attach-a-component-to-it-in-react-360-360-component.png)
