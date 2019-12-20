We have a PWA installed and running in standalone mode on iOS, but the user can still long press and select text that we may or may not want them to be able. 

![image of the long press on text in app](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629716/transcript-images/react-disable-text-selection-and-touch-callouts-in-a-pwa-on-ios-long.png)

Also, if the user long presses on a link, the page will navigate, but a touch call-out will pop up as well.

![image of the touch call out menu](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629719/transcript-images/react-disable-text-selection-and-touch-callouts-in-a-pwa-on-ios-touch.png)

These two both happen because our app is fundamentally a web app running in a web browser. 

In `src/app.css`, we can remove both of those behaviors by setting two settings on the `body`. First, remove the selection option by setting `user-select` to `none` for our `webkit`, `moz` , `ms`, and the base. Next, we can disable the touch call-out pop-up menu by setting `-webkit-touch-callout: none`.

#### src/app.css
```css
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  -webkit-touch-callout: none;
}
```
Then when we build and run that and run it on the iPhone again, now the text isn't selectable, and long pressing the link directs to the profile page and doesn't bring up the call-out menu.

#### terminal.png
```bash
$ yarn build 
```
```bash
$ serve -S build 
```

![image of the text not being selectable](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629721/transcript-images/react-disable-text-selection-and-touch-callouts-in-a-pwa-on-ios-touch-unselect.png)

![image of the profile page coming up without a call out menu](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544629722/transcript-images/react-disable-text-selection-and-touch-callouts-in-a-pwa-on-ios-touch-nocallout.png)