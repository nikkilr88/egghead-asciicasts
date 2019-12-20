Open the `manifest.json` file in the `public` folder. You can see the current `icons`, which is a `"favicon.ico"`. It contains several pixel `sizes`.

#### public/manifest.json
```json
"icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
```

Before we install the PWA on Chrome or on a mobile device, we'll want to at least a few more icon sizes of the app. For Android, there's a 144 pixel icon and a 192 pixel icon. For the Chrome App home screen, there's a 512 pixel icon. For iOS, there's 120, 152, 167, and 180 pixel sizes. For iOS, it's also important that there's no transparency in these icons.

![image of all the icons](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582326/transcript-images/react-add-a-custom-app-icon-to-a-pwa-built-with-create-react-app-icons.png)


Let's copy these icons into the public folder. Then back in the manifest file, we can add these entries to the icons array for each one of those sizes. 

```js
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "icon-120.png",
      "sizes": "120x120",
      "type": "image/png"
    },
    {
      "src": "icon-144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "icon-152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "icon-167.png",
      "sizes": "167x167",
      "type": "image/png"
    },
    {
      "src": "icon-180.png",
      "sizes": "180x180",
      "type": "image/png"
    },
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

Then for iOS to properly detect those icons, open `public/index.html` and we'll add links for each icon at each size. 

#### public/index.html
```html
 <link rel="apple-touch-icon" href="icon-120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="icon-152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="icon-180.png">
    <link rel="apple-touch-icon" sizes="167x167" href="icon-167.png">
```

You can also find these sizes in Apple's documentation.

Now, let's `yarn build` and `serve -s build` the app. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```

If we reload and view the application tab, we can see the new icons.

![image of the new icons in the browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582326/transcript-images/react-add-a-custom-app-icon-to-a-pwa-built-with-create-react-app-iconsbrowser.png)