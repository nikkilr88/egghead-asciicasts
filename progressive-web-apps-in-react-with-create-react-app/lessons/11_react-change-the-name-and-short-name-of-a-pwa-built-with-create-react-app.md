Open the manifest.json file inside the public folder. Here are all the configuration values for our PWA, including its name and `short_name`. Change the short name to `TodoList`. 

#### public/manifest.json
```json
{
  "short_name": "TodoList",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
```

The `short_name` has a maximum recommended length of just 12 characters. It's used by the app launcher and the new tab page. Now change the `name` to `"My PWA Todo List"`. 

```json
{
  "short_name": "TodoList",
  "name": "My PWA Todo List",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
```

The name has a maximum length of 45 characters and is used in the install dialog and on the Chrome Web Store. If you don't specify a `short_name`, then the long name will be used, but it will be truncated to fit.

Let's `yarn build` and `serve -s build` that. 

#### terminal
```bash
$ yarn build
```
```bash
$ serve -s build
```
Then in the browser on the application tab, we can look at the service worker and see the updated name and short name there.

![image of the updated name and short name](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582335/transcript-images/react-change-the-name-and-short-name-of-a-pwa-built-with-create-react-app-nameupdate.png)

If we click add to home screen here in the application tab, and click add on the banner when it comes up. We can see the name and the install dialog, as well. 

![image of the add home screen in the application tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582325/transcript-images/react-change-the-name-and-short-name-of-a-pwa-built-with-create-react-app-button.png)

![image of the name and install dialog](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582332/transcript-images/react-change-the-name-and-short-name-of-a-pwa-built-with-create-react-app-dialog.png)

Once we've clicked to actually add it to the Chrome app screen, then we can see it installed as our app with our new name and icon.

![image of the app on the homescreen](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544582335/transcript-images/react-change-the-name-and-short-name-of-a-pwa-built-with-create-react-app-homescreen.png)

It's really important that we set the `name` and `short_name` before people start to download the app to their home screens, though, because the manifest is cached. It's difficult, especially for mobile users, to see things like name changes in your manifest if they've already visited your app.