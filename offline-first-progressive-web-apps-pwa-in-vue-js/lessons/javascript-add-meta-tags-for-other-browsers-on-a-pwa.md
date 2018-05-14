Instructor: [00:01] Currently, iOS and Microsoft Edge and still need some metadata to make the app installable. First, for iOS, it needs three `<meta>` tags. Let's say meta `name`. They all start with `apple-mobile-web-app` and have a `content` property.

[00:25] Let's duplicate this three times, and then let's start by the first one, which is `capable`. 

#### index.html
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app" content="">
<meta name="apple-mobile-web-app" content="">
```

This `meta` tag tells iOS that this web app is installable. Then we can configure the `status-bar-style`, which it can be `default`, which is just the user's status bar.

[00:48] It can be `black`, or it can be `black-translucent`. We're going to keep it as `default`. 

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app" content="">
```

If you like, just try them out. The third one is the `title`, where we can write just the `Chatty Images` that we had in the manifest. 

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Chatty Images">
```

We still need to add the icon that will be displayed in the iOS home screen. We will do this with a `<link>` tag.

[01:20] In the `rel` property, let's say `apple-touch-icon`, and let's add the path to the smaller icon here. 

```html
<link rel="apple-touch-icon" href="/static/icons/144.png">
```

In the same line, we also have to add a couple of `meta` tags for Microsoft Edge. They both are also similar, `msapplication`, and have a `content` property.

```html
<meta name="msapplication-" content="">
<meta name="msapplication-" content="">
```

[01:54] The first one is `TileImage`. Again, we'll write here the path to the smaller icon. 

```html
<meta name="msapplication-TileImage" content="/static/icons/144.png">
<meta name="msapplication-" content="">
```

The other property is `TileColor`, which is the tile color that Windows uses to place the tile icon in the home screen. We'll just set it to black. 

```html
<meta name="msapplication-TileImage" content="/static/icons/144.png">
<meta name="msapplication-TileColor" content="#000">
```

Just with this, the app is ready to be understood by all modern browsers.