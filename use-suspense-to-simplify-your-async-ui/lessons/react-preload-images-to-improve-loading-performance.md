Instructor: 0:00 This one's going to be a little bit tricky, so I want you to watch carefully. The user experience for loading images for the first time is not super great. The browser has a built-in cache that we can prime so that the user's experience loading our images is a lot better.

0:16 If I open up my network tab, then I'm going to right-click on my refresh on the web page. With the network tab open, I can click on 'Empty Cache and Hard Reload'. This will empty the cache of my browser of all the images that it has cached. This is going to simulate the same kind of experience for a new user reaching my web application for the first time or loading new images that they've never seen before.

0:39 I'll reload. That gets all of my JavaScript downloaded. I'm going to clear this out here. Then I'm going to change my network speed to 'Slow 3g'. Chrome is going to throttle my network so that it's like on a device with a slow Internet connection, which is most of the world.

0:57 Here, I click on Pikachu. You notice that my fallback image isn't loading for the first little bit. Then it finally loads the fallback. Then Pikachu's data loads, but Pikachu's image doesn't load for a certain time after that.

1:11 This is the problem that we're trying to solve, because it gets even worse when we click on Charizard. We'll notice that Charizard's information gets updated here, but because Charizard's image takes a little bit longer to load, Pikachu's inage is hanging around while we're waiting for Charizard's image to load, which is not a great experience.

1:29 The way we can solve this is we can preload images into the browser's cache, so the user doesn't have to wait for those images when we know we're going to need them anyway. I built a little example to demonstrate this further and show you how we can preload these images.

1:43 I'll open up my network tab. I'll empty cache and hard reload. I'll clear my network tab. Then I'm going to go from 'Online' to 'Slow 3g' again. Then I'm going to click on this `Preload Ditto` button. That starts loading the image. That took two seconds to get that image loaded into the browser's cache.

2:02 Now, when I click on `Show Images`, you'll notice Ditto shows right away and Bulbasaur takes 2.5 seconds to load. That's the kind of experience that we want to have for our users when they're using our app, because once the image is in the cache, then the browser can show the image immediately.

2:17 One thing to keep in mind here is that the browser is going to honor the cache control headers that your server is sending. If we look at these images and the headers that are being sent here, we'll see that the cache control on this has a `max-age=3,600`, which is an hour. It's saying that it's `immutable`.

2:34 When the browser comes around and sees that we want to display the same image that we've displayed before, it can go ahead and display the one that it has cached. You can only get the benefits of this when your cache control is set properly, which it may not be when you're developing locally, but hopefully will be when you ship to production.

2:51 What I want to show you is how do you get this `Preload Ditto` thing to preload that image so the browser can display it instantly? Here in `preload-image.js` is this component, we just have this `PreloadImageExample` that's rendering a `button` to show the images, and then a `button` to preload each one of these images.
#### preload-image.js
```js
function PreloadImageExample() {
  const [showImages, setShowImages] = React.useState(false)

  return (
    <div>
      <button onClick={() => setShowImages(true)}>Show Images</button>
      <div style={{display: 'flex'}}>
        <div style={{border: '1px solid'}}>
          <div>
            <button onClick={preloadBulbasaur}>Preload Bulbasaur</button>
            <div>
              {showImages ? (
                <img src={bulbasaurImageUrl} alt="Bulbasaur" />
              ) : null}
            </div>
          </div>
        </div>
        <div style={{border: '1px solid'}}>
          <button onClick={preloadDitto}>Preload Ditto</button>
          <div>
            {showImages ? <img src={dittoImageUrl} alt="Ditto" /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
```

3:07 When you click on that, it calls `preloadBulbasaur`, or `preloadDitto`, which simply called `preloadImage` with the image URL for those Pokemon. 

```js
const preloadImage = url => {
  // TODO...
}
const preloadBulbasaur = () => preloadImage(bulbasaurImageUrl)
const preloadDitto = () => preloadImage(dittoImageUrl)
```

How do we tell the browser, "Hey, I want you to take this image URL and put it into your cache?"

3:21 It's a little bit of a hack, but it's pretty simple. You can say, `document.createElement('img')`. We'll create an  element and set that  element's source to the URL. That's it.

```js
const preloadImage = url => {
  document.createElement('img').src = url
}
```

3:35 Once you create an HTML image element and set its source, the browser will eagerly request to that source, even if that image isn't on the page. If the cache control headers are set properly for that resource on the server, then that image will get put into the cache. This works well for when you know you're going to need to load an image soon.

3:54 Another way that you can do this is in the `index.html`. You can add a `link` with a `rel` of `preload`, and here we'll have the `href` be the URL to the image we want to load. In our case, we want to load that fallback Pokemon image. That fallback Pokemon image is here in the `img` directory, under `pokemon/fallbackpokemon`.

4:15 We'll do `%public_url%`, find the template that  we have here, `img/pokemon/fallbackpokemon.jpg`. Then, we need to tell the browser how it should be loading this resource, so we'll say, `as="image"`. That will get this particular resource loaded into the cache.

#### index.html
```html
<link 
  rel="preload" 
  href="%PUBLIC_URL%/img/pokemon/fallbackpokemon.jpg"
  as="image"
/>
```

4:33 In review, if you don't preload your images, users on lower-end connections may have trouble loading those images in a time that gives a good user experience.

4:43 You can preload those images using a `preload` tag, so that you can preload images that are on your server, and that you know you're going to need to request, or you can do it with JavaScript by creating an HTML image element, and sending its source to the URL for the image. That will get that image in the browser cache so it can load that image instantly.