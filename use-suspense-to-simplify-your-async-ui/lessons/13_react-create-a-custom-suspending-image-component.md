Instructor: [00:00] Many of the users using our application are going to come to the application without having loaded any of the images of our app. Those images won't be in the browser cache.

[00:09] If I ran click here and click empty cache and hard reload, because I have my network tab open here. Then I'm going to go to slow. I'll get rid of all of this output here. Then I go to Pikachu. It's going to take a second to load my fallback. Then it's going to take a second to actually load the Pikachu image here.

[00:28] It gets even worse when I click on Charizard because now Charizard has data show up, but the image doesn't show up until later. **I'd much rather not show the data until the image is ready as well.**

[00:39] To solve that problem, I'm going to make an `Img` component that's going to take `props` like `src` and `alt`, and all the rest of the `props` that it's going to take. We're just going to return `img` with the `src` pointed to the `src`, and `alt`. We'll spread the rest of the `props`.

```js
function Img({src, alt, ...props}) {
  return <img src={src} alt={alt}>
}
```

[00:57] We're just wrapping the `Img` component. I'm just going to swap this and now I'm going to say `let imageSrcResource = createResource`. We'll asynchronously preload the image. We're going to do that in a function. We'll call it `preloadImage` with the `src`. Then we'll make that function `preloadImage`, it will take that `src`.

```js
function preloadImage(src) {

}

function Img({src, alt, ...props}) {
  let imgSrcResource = createResoucre(() => preloadImage(src))
  return <img src={src} alt={alt}>
}
```

[01:21] Here, it needs to return a promise because we're creating a resource out of it. We're going to make a new `Promise` that will take a call back that accepts a resolve function. We'll make an `img` with document.createElement image. We'll set the image `src` to the `src`. Then, we'll say image `onload`, so when the browser has loaded this image, then we will `resolve` with the `src`.

```js
function preloadImage(src) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.src = src
    img.onload = () => resolve(src)
  })
}
```

[01:45] The resource that we're creating here, in `Img`, is accepting a function that returns the promise of `preloadImage`. When that promise resolves, it resolves to the `src`, which by now has been preloaded into the browser's cache.

[01:59] Because we're creating this resource right here in `Img`, if we just go ahead and try to say `imageSrcResource.read()`, then every single time React tries to render this image, it's going to create a brand new resource. That read is going to throw every time. We need to cache this resource.

```js
function Img({src, alt, ...props}) {
  let imgSrcResource = createResoucre(() => preloadImage(src))
  return <img src={imgSrcResource.read()} alt={alt}>
}
```

[02:18] I'm going to make an `imageSrcResourceCache`. It's not an image cache. **The image cache lives in the browser. This is a resource cache, which is keeping track of the promises that associated to the images by their `src` URL.**

[02:35] Now, I'm actually going cut this out, and we'll assign this to `imageSrcResourceCache` at the `src`. If there's not an `imageSrcResource`, so if that does not exist, then we'll assign `imageSrcResource`to that `createResource` that we were doing before. It is important to spell things correctly in programming.

[03:00] We'll create that `imageSrcResource`, and then we'll add this to the cache. Let's say, the cache at that `src` will be assigned to that new resource we created. In any case, we're going to go ahead and read that resource's data.

```js
function Img({src, alt, ...props}) {
  let imgSrcResource = imgSrcResourceCache[src]
  if (!imgSrcResource) {
    imgSrcResource = createResource(() => preloadImage(src))
    imgSrcResourceCache[src] = imgSrcResource
  }
  return <img src={imgSrcResource.read()} alt={alt} {...props} />
}
```

[03:16] On the first render of this component, we're going to create a brand new resource, we'll read it, which is going to throw, because the image isn't yet ready. When the image `onload` finishes, that means the image is now in the browser cache -- assuming the cache control headers are set properly for this resource -- and then it will resolve with the `src` of the image.

[03:37] That will trigger a re-render of our `Img`. Then, when we go to read, we'll get the `src` for our image. Now it's in the browser cache, so it should show instantly.

[03:47] Let's go ahead and test this out. I'll pull out my Developer Tools. I'll do a hard reload. I'll clear all this newtowrk traffic out, just to clean that up. We'll go to slow 3G and we'll load Pikachu for the first time. It will take a moment for Pikachu to get its image loaded.

[04:05] You'll notice, that as soon as Pikachu's data is loaded, Pikachu's image will be ready as well. Then, if we go to Charizard, you'll notice that Charizard's data doesn't show up until Charizard's image is also ready. They show up together, which is a much better user experience. We can do it again with Mew. Mew's information doesn't show up until Mew's image is ready as well.

[04:30] Then, the caching that we implemented before is still available, not only for the data resources, but also the image resources as well.

[04:40] In review, what we did here was, we created this `preloadImage` function, which gives us an asynchronous function for getting images by their `src`, into the browser cache. Then, we created an `imgSrcResourceCache`, so that when we render image tags, we can create a resource and have this image suspend, until we know that image is in the browser cache.

[05:03] This ensures that our components suspend until all of the resources are ready, including images.
