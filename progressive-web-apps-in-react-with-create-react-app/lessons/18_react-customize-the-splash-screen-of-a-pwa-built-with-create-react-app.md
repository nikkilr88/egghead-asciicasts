We've already specified an icon that is at least `512x512` pixels. We specified the background color and the manifest, so the splash screen on Android will use those values, and that already looks pretty good.

![image of the android splash screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630126/transcript-images/react-customize-the-splash-screen-of-a-pwa-built-with-create-react-app-android.png)

The splash screen on iOS is just a plain white screen. 

![image of the basic iOS splash screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629715/transcript-images/react-customize-the-splash-screen-of-a-pwa-built-with-create-react-app-apple.png)

To add a custom image as the splash screen, first we have to create an image for every screen resolution size for each iOS device that we want to support. You can see the resolution of each image here, and Apple's documentation also has the same information. Unfortunately, there's no way around this tedious step. Let's copy all those images into the `public` folder of our app and then open index.html.

![image of all the image sizes in the public folder of our app](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629715/transcript-images/react-customize-the-splash-screen-of-a-pwa-built-with-create-react-app-appleicons.png)

First, we must tell iOS that the app is `apple-mobile-web-app-capable` with a `meta` tag. 

#### public/index.html
```html
<meta name="apple-mobile-web-app-capable" content="yes"> 
```
Then we can specify each of those launch images as the image for that resolution.

```html
<meta name="apple-mobile-web-app-capable" content="yes"> 

  <link rel="apple-touch-startup-image" href="splash_640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="splash_750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="splash_1242x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="splash_1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="splash_1536x2048.png" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="splash_1668x2224.png" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)">
  <link rel="apple-touch-startup-image" href="splash_2048x2732.png" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)">
```

As a tedious step as well, but you'll see now that we have each iOS device resolution size covered by a `link` tag.

Finally, in `manifest.json`, we have to actually remove the background color setting first. Otherwise, that will override all of our images. 

#### manifest.json
```json
{
  "short_name": "TodoList",
  "name": "My PWA Todo List",
  "icons": [ 
    ... 
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#67daf9",
  "background_color": "#FFFFFF"
}
```

Now, we can finally `yarn build` and `serve -s build` that. 

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```

Notice I'm using a new port, so iOS will recognize this is a new app for my testing.

![image of the new port](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630129/transcript-images/react-customize-the-splash-screen-of-a-pwa-built-with-create-react-app-portnew.png)

On iOS, we can install the app and launch it from the home screen. There's our new splash screen.

![image of the new splash screen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630124/transcript-images/react-customize-the-splash-screen-of-a-pwa-built-with-create-react-app-new.png)