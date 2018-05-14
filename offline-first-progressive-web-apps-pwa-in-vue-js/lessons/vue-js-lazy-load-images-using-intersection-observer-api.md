Instructor: [00:00] If we open the network tab in the dev tools and reload, we can see that a bunch of images are loaded at the beginning. To be precise, 50 of them, because of this limit set in the images component.

[00:17] The thing is, we only see two of the images, so we don't need anymore. Right now, we are loading all of them at the beginning. That can be the reason for a very bad performance.

[00:29] To solve that, let's start by creating a lazy image component, `LazyImage.vue`. Let's define our `<template>`, which we will copy from the images component. This is the component from vuetify that uses an image under the hood, and it will receive the src of the image already by property.

#### LazyImage.vue
```html
<template>
    <v-card-media
        :src="src"
        height="150px"
    >
    </v-card-media>
</template>
```

[00:58] Then define the `<script>` of the component with the `data` option, which will hold an `observer` instance set to `null`. Then define a `mounted` hook where we will create the `observer` by calling `new IntersectionObserver`. We need to pass a callback as its parameter, where we'll have the `entries` of the intersection observer.

```html
<script>
export default {
    data: () => ({ observer: null }),
    mounted() {
        this.observer = new IntersectionObserver(entries => {

        })
    }
}
</script>
```

[01:32] The `entries` parameter is an array of intersection entries, but we only need the first one. Let's grab it and save it in a variable. You could receive more than one if you set thresholds, but whether you use them or not, the first one will always be the first to intersect with the viewport.

```javascript
this.observer = new IntersectionObserver(entries => {
    const entry = entries[0]
})
```

[01:52] Then we can use the `entry.isIntersecting` property to check if it's intersecting with the viewport. When it intersects, we have to save it in the state of the component to show the real image. Let's write `this.intersected` variable that we set to `true`. Let's write it within data, initialized to false.

```html
<script>
export default {
    data: () => ({ observer: null, intersected: false }),
    mounted() {
        this.observer = new IntersectionObserver(entries => {
            const entry = entries[0]

            if (entry.isIntersecting) {
                this.intersected = true
            }
        })
    }
}
</script>
```

[02:18] Finally, we have to call the `observe` method from the `observer` and we need to pass an HTML element, in this case the root of this component, which is accessible through `this.$el`. It's important that we use the mounted hook instead of the created because the mounted hook waits for the component to be attached to the dom, so then we have the element available in the component.

```javascript
mounted() {
    this.observer = new IntersectionObserver(entries => {
        const entry = entries[0]

        if (entry.isIntersecting) {
            this.intersected = true
        }
    })

    this.observer.observe(this.$el)
}
```

[02:44] Now let's add the `props:` for the `'src'` of the image, and let's write a `computed:` property. Let's call it `srcImage()`, which, depending on the `intersected` state, will `return` either the src of the image or an empty string. 

```javascript
props: ['src'],
data: () => ({ observer: null, intersected: false }),
computed: {
    secImage() {
        return this.intersected ? this.src: ''
    }
}
```

Here, in the component, instead of the `src`, let's use `srcImage`.

```html
<v-card-media
    :src="srcImage"
    height="150px"
>
</v-card-media>
```

[03:17] We can go now to `images.vue` and `import LazyImage from './LazyImage'` and add it as a component. 

#### Images.vue
```javascript
import LazyImage from './LazyImage'

...

components: {
    LazyImage
}
```

Then, up in the template, instead of `<v-card-media>`, let's use the `<lazy-image>` that we just imported. 

```html
<lazy-image
    :src="imageUrl(image)"
>
</lazy-image>
```

We'll save this.

[03:54] Let's reload the browser, and you can see that only a few requests have been made instead of 50 all at once. If we start scrolling, more images are requested, and we don't have the performance problem of loading all the images at once.

[04:14] We still have an issue with the lazy image component. It is not yet optimized, and it has a memory leak. When it gets intersected, then the image will be shown, but the server is still working. We have to make sure that, once it intersects, we have to call the `disconnect()` method of the observer. In that way, it will still work.

#### LazyImage.vue
```javascript
mounted() {
    this.observer = new IntersectionObserver(entries => {
        const entry = entries[0]

        if (entry.isIntersecting) {
            this.intersected = true
            this.observer.disconnect()
        }
    })

    this.observer.observe(this.$el)
}
```

[04:40] The other case is the `destroyed()` hook. We also have to call the `disconnect()` method here. Otherwise, when the component is unmounted, the `intersectionObserver` instance is still running and checking for intersections. 

```javascript
mounted() {
    this.observer = new IntersectionObserver(entries => {
        const entry = entries[0]

        if (entry.isIntersecting) {
            this.intersected = true
            this.observer.disconnect()
        }
    })

    this.observer.observe(this.$el)
},
destroyed() {
    this.observer.disconnect()
}
```

We still can improve it further.

[05:01] If we reload the web page, we can see that the new images are loaded just when they intersect in the viewport. That means that we will see an empty placeholder before it gets loaded. What we can do is to load the image a bit before it intersects in the viewport.

[05:24] For that, the `IntersectionObserver` constructor accepts a second argument with some options. For that, we can use the `rootMargin`, and let's say `'128px'`. 

```javascript
{
    rootMargin: '120px'
}
```

This means that the intersection observer will add a margin to the element defined in the observe to check for the intersection.

[05:47] Right now, if we save, and if we reload again and start scrolling, you will see that the next image is intersected a bit before it enters the viewport. If you scroll smoothly, we will not see any white, empty space.

[06:05] You could adjust that root margin as you wish for your case, but right now we have an image component that is lazy loadable and avoids a lot of initial requests for all the images in this application.