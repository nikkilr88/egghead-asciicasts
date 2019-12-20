Instructor: [00:00] There is no defined file or folder structure for React native applications, but our root folder is getting crowded with all of the new files. 

Let's clean that up by adding some folders.

[00:12] Create a new `src` folder which we'll use to hold all of the source files. Under `src`, create a `components` folder. We'll start by moving the `Header` component files into the `components` folder.

#### Terminal
```bash
$ mv Header.ios.js src/components/Header.ios.js
$ mv Header.android.js src/components/Header.android.js
```

[00:30] Then let's make a `styles` folder inside of `src`. We can move the `HeaderStyle.js` file into the `styles` folder. 

```bash
$ mkdir src/styles
$ mv HeaderStyle.js src/styles/HeaderStyle.js
```

Now, if we want to import and use the header, instead of importing `Header from ./header`, we have to use `.src/components/Header`.

[00:52] In order to avoid the complexity of relative paths, however, we'll first switch to absolute path imports. In the `components` folder, make a new `package.json` file. In that `package.json`, make an object and add a single `name` key with a value set to `components`.

#### package.json
```javascript
{"name": "components"}
```

[01:12] Now, that `components` folder will act like a module. Back in `App.js`, we can import directly from `components`, which cleans up the import significantly. 

#### App.js
```javascript
import Header from 'components/Header'
```

We can do the same thing with the `styles` folder by adding a new `package.json` file and setting the `name` to `styles`.

[01:34] Now, in the `Header.ios.js` and `Header.android.js` files, we can import the header directly from `styles`. 

#### Header.ios.js
```javascript
import HeaderStyle from 'styles/HeaderStyle'
```

Now, we can rerun with the new folders and the cleaned up imports.
