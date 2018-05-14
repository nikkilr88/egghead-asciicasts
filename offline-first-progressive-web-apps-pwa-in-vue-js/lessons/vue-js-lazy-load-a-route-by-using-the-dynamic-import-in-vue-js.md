Instructor: [00:01] Right now, we have a `build.js` file with all the code of the app. But by using code splitting, we can separate the routes' code in different bundles. First, let's open the `main.js` file, which is where we have the routes' logic. To code a split, unless you load the routes, the only thing we have to use is use the dynamic import instead of the components here.

[00:28] We'll write our function that returns an `import`. Here, we have to copy the path from the component. 

#### main.js
```javascript
const router = new vueRouter({
    routes: [
        { path: '/images', component: () => import('./components/Images') },
        { path: '/images/:id', component: Details, props: true },
        { path: '/', redirect: '/images' }
    ]
})
```

In that way, instead of directly loading the component, we are telling the router to use this function, which returns a promise from the import. When it loads, it will load the route.

[00:51] That happens because Vue router has full support for dynamic imports as factory functions. We could do the same thing here for the `Details` component. 

```javascript
const router = new vueRouter({
    routes: [
        { path: '/images', component: () => import('./components/Images') },
        { path: '/images/:id', component: () => import('./components/Details'), props: true },
        { path: '/', redirect: '/images' }
    ]
})
```

Don't forget to comment `./components/Images` and `'./components/Details'` out in the imports.

[01:11] If we save this, we're going to see that it crashes because doesn't recognize the syntax. That's because, if you are using Babel and you don't have the plug-in by default, you have to `install --save-dev babel-plugin-syntax-dynamic-import`.

#### Terminal
```bash
$ npm install --save-dev babel-plugin-syntax-dynamic-import
```

[01:37] Then I'm going to open my `.babelrc` file and add the `"plugins"` scheme and `syntax-dynamic-import`. 

#### .babelrc
```json
{
    "presets": [
        ["env", { "modules": false }]
    ],
    "plugins": [
        "syntax-dynamic-import"
    ]
}
```

Let's save this and run npm `run dev again`.

[01:55] Let's reload the page. If we select the network tab right now, apart from the `build.js` file, we see this `1.build.js` file. That's the route for the images component.

[02:15] Let's clear out the dev tools. If we go to the other route of the editor view, it will load the `0.build.js` file. Right now, it's loading the code of each route at runtime, reducing the mission load time.