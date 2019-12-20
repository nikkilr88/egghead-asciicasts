Instructor: [00:00] To start our refactoring efforts, we'll create a new folder called `router` (`/src/router`). In it, we'll create a file called `index.js`. To start, we'll copy everything from our `main.js` file into `index.js`. We'll remove the `new Vue()` statement since that's not router specific. That allows us to get rid of one of our imports (`import App from './App.vue'`).

#### router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import Egghead from './components/Egghead'
import Blog from './components/Blog'
import GuestPost from './components/GuestPost'
import PageNotFound from './components/PageNotFound'
import FailedAuth from './components/FailedAuth'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/blog:id',
    name: 'blog',
    component: Blog,
    children: [
      {path: '/guest', components: {
        first: GuestPost,
        second: Egghead
      }}
    ]
  },
  {
    path: "/egghead",
    component: Egghead,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pageNotFound",
    alias: "*",
    component: PageNotFound
  },
  {
    path: "/failed",
    component: FailedAuth
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

function isAuthenticated() {
  return true;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/failed");
    }
  } else {
    next();
  }
});

export default router;

```

[00:31] **In order to use all of this information, we need to export it**. We'll `export default router`. We can go back to our `main.js` file and remove everything about a router definition, since it's now duplicated in our `index.js` file. We'll remove the unused imports as well.

#### router/index.js

```js
export default router
```

#### main.js

```js
import Vue from 'vue'
import App from './App.vue'

/*
We can remove these imports:

import VueRouter from 'vue-router'
import Home from './components/Home'
import Egghead from './components/Egghead'
import Blog from './components/Blog'
import GuestPost from './components/GuestPost'
import PageNotFound from './components/PageNotFound'
import FailedAuth from './components/FailedAuth'
*/

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

[00:56] **Now we want to import our router from `router/index`. Its use is the same as before inside our new Vue application, but it doesn't work. This is because our relative paths inside index.js are no longer accurate**, so we'll adjust those.

#### main.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
```

#### router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Egghead from '../components/Egghead'
import Blog from './components/Blog'
import GuestPost from './components/GuestPost'
import PageNotFound from '../components/PageNotFound'
import FailedAuth from '../components/FailedAuth'
```

[01:22] On refresh, everything works as it should. We can see that our `main.js` file is quite small now. However, we'd like to refactor a step further. We'll make an additional file called `blogRoutes` inside our `router` folder (`router/blogRoutes.js`). Inside that file (`router/blogRoutes.js`), we'll create a new constant an array, we'll call it `blogRoutes`.

#### router/blogRoutes.js

```js
const blogRoutes = []
```

[01:55] We'll take our entire blog route record including the children and remove it from our `index.js` file. Instead, we'll place it in this new `blogRoutes` array. We need to move the imports that we're using into our blog routes (`router/blogRoutes.js`) file. We can remove the now unused imports from `index.js`.

#### router/index.js

```js
/*
We remove these imports:

import Egghead from '../components/Egghead'
import Blog from './components/Blog'
import GuestPost from './components/GuestPost'
*/

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/egghead",
    component: Egghead,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pageNotFound",
    alias: "*",
    component: PageNotFound
  },
  {
    path: "/failed",
    component: FailedAuth
  }
];

```

#### router/blogRoutes.js

```js
import Egghead from '../components/Egghead'
import Blog from './components/Blog'
import GuestPost from './components/GuestPost'

const blogRoutes = [
  {
    path: '/blog:id',
    name: 'blog',
    component: Blog,
    children: [
      {path: '/guest', components: {
        first: GuestPost,
        second: Egghead
      }}
    ]
  },
]
```

[02:23] **In order to use this blog routes array, we need to export it**. We'll do that here using the `default` keyword and name it `blogRoutes`. In our index file, we'll now `import blogRoutes from './blogRoutes'`.

#### router/blogRoutes.js

```js
export default blogRoutes
```

#### router/index.js

```js
import blogRoutes from './blogRoutes'
```

[02:47] **In order to use it, we'll make use of the spread operator, which will select each individual item in our blog routes array and place it in our routes array**. If we navigate to `/blog/1234`, we'll see that this route is still successfully working.

#### router/index.js

```js

const routes = [
  ...blogRoutes,
  {
    path: "/",
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/egghead",
    component: Egghead,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/pageNotFound",
    alias: "*",
    component: PageNotFound
  },
  {
    path: "/failed",
    component: FailedAuth
  }
];
```

[03:10] Our refactor gives us a very small `main.js` file. Most of our routes are defined in the `index.js` file inside our `router` folder and additional routes can be found in `blogRoutes.js`.
