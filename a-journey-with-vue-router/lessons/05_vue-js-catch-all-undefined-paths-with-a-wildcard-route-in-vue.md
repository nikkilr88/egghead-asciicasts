Instructor: [00:01] We'll start by importing a new component called `PageNotFound`. This will act as a stand-in for our 404 page or similar.

#### main.js

```js
import PageNotFound from './components/PageNotFound'
```

[00:13] We're going to create a new route record. We'll set the component to `PageNotFound`, but the path will be `/*`. **Star is a wildcard value that will match everything it hits**.

```js
const routes = [
  ...
  {
    path: '/egghead',
    component: Egghead
  },
  {
    path: '/*',
    component: PageNotFound
  }
]
```

[00:33] If we navigate to `/test`, which is a URL we haven't defined, we'll end up on `PageNotFound`. If we move this route record up in our array, ahead of the `/egghead` path, and we try and navigate to `/test`, we'll see what we want to see.

```js
const routes = [
  ...
  {
    path: '/*',
    component: PageNotFound
  },
  {
    path: '/egghead',
    component: Egghead
  }
]
```

[00:55] If we navigate to `/egghead`, we find that it's overwritten because `/*` is hitting the path. **What we want to do is remove the `/` and keep just `*`, which will allow us to hit other URLs that are also matching but still act as that wildcard catch-all**.

```js
const routes = [
  ...
  {
    path: '*',
    component: PageNotFound
  },
  {
    path: '/egghead',
    component: Egghead
  }
]
```

[01:16] Alternatively, we can set our path to `/pageNotFound` and alias that path to `*`. **This allows us to do what we did before but also access `PageNotFound` directly through a URL if we were to want to navigate to it from another component**.

```js
const routes = [
  ...
  {
    path: '/pageNotFound',
    alias: '*',
    component: PageNotFound
  },
  {
    path: '/egghead',
    component: Egghead
  }
]
```

[01:38] As we see, we can still hit `/egghead` without overwriting it.
