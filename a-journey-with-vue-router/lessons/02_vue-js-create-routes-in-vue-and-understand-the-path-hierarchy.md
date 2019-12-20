Instructor: [00:01] We'll start by importing two new page components, `Egghead` and `Blog`. Next, we'll make a new route record, which is an object. We'll set our path to `/blog` and set our component to `Blog`. We'll also make a route record for our `Egghead` component, but we're going to set our path to `/blog`.

#### main.js

```js
import Egghead from './components/Egghead'
import Blog from './components/Blog'
```

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog',
    component: Blog,
  }, {
    path: '/blog',
    component: Egghead
  }
]
```


[00:52] When we do this, and navigate to `/blog`, we'll find that we see the `Blog` component and not the `Egghead` component. **With matching routes, the first route record in the hierarchy wins**. Now, we'll change our path to `/egghead`, and we'll be able to navigate to our egghead route, which shows our `Egghead` component.

```js
const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/blog',
    component: Blog,
  }, {
    path: '/egghead',
    component: Egghead
  }
]
```
