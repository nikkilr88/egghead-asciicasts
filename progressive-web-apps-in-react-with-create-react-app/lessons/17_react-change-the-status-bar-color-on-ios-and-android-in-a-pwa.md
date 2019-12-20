The status bar of a PWA installed as a standalone app may not look the way you want it to. 

![image of the status bar](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629722/transcript-images/react-change-the-status-bar-color-on-ios-and-android-in-a-pwa-originalstatusbar.png)

First let's open `manifest.json`. There we're going to make sure that the background color is `#FFFFFF`. Let's set a `theme_color` to the `#67daf9`, so we can see what that does as well.

#### public/manifest.json
```json
 "start_url": ".",
  "display": "standalone",
  "theme_color": "#67daf9",
  "background_color": "#FFFFFF"
}
```

In `public/index.html`, we can find and change the `theme_color` there, too. On iOS we only have a limited status bar customization, so we have to add a `meta` tag called `apple-mobile-web-app-status-bar-style`, which can only take three values -- `default`, black, or black translucent.

#### public/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
```

For this example, I know that `default` looks the best, but you'll have to experiment for your application, because there are so me interesting intersections between the theme color, background color, and the app status bar style. Now we can `yarn build` and `serve -S build` that. 

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```

I'm actually going to launch a second server here on another port.

```bash
$ serve -S build 
```
![image of the new port number](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544630120/transcript-images/react-change-the-status-bar-color-on-ios-and-android-in-a-pwa-newport.png)


I've been testing this on the iPhone already, and the iOS browser really aggressively caches the values for the status bar. By just changing the port number, it appears to iOS like a brand new application. If your status bar or any other value from your manifest on iOS isn't updating correctly, you may try a new port to see if that fixes the issue for development.

[01:31] Now starting an Android, we can view the app and see the status bar area turn the React blue color, which matches the theme color. 

![image of the android app header in blue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629683/transcript-images/react-change-the-status-bar-color-on-ios-and-android-in-a-pwa-blue.png)

On iOS, we can navigate to the app in Safari and install it on the home screen. When we boot the app in standalone mode, we see that the status bar has turned white with black text, which is the behavior for the default setting with this background and theme color combination. 

![image of the android app header in white](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629717/transcript-images/react-change-the-status-bar-color-on-ios-and-android-in-a-pwa-white.png)

Notice that on iOS the theme color isn't displayed anywhere in the header though, because iOS doesn't let us set the status bar to fully custom colors.
