Instructor: [0:01] We'll start by importing a Vue component we'll call `FailedAuth`, which will act as the page we send our users to if they're unauthenticated and unable to access the place they're attempting to go. **In order to use this, we need to create a route record that can send us there**. We'll set the path to `/failed` and the component to `FailedAuth`.

#### main.js

```js
import FailedAuth from './components/FailedAuth'
```

```js
const routes = [
  ...
  {
    path: '/egghead',
    component: Egghead,
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/failed',
    component: FailedAuth
  }
]
```

[0:28] Before we can check whether or not we want to send our user somewhere, we need to know if they're authenticated. We'll create a function that will return a Boolean `true` or `false` value for the moment. **This is just a dummy function**.

```js
function isAuthentiated() {
  return false
}
```

[0:46] On our router, we're going to use a hook, the function `beforeEach()`. **This will be triggered every time a user tries to navigate to a page**. `beforeEach()` takes the arguments `to`, `from` and `next`.

```js
router.beforeEach((to, from, next) => {})
```

[1:06] We'll use the `to` argument in order to match against the route record and see whether the page they're trying to navigate to requires auth. **We can do this because we've set `requiresAuth` as metadata on our routes**.

```js
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {}
})
```

[1:33] If we find that this route requires authentication, we'll add a new check, is our user authenticated? If they are, we'll send them where they want to go. We'll use the `next` argument, which is a function that will complete the logical loop.

[1:56] Otherwise, we want to send them elsewhere. **If we call `next` with `false`, that will send them to from, back from where they came**. In our case, we'd rather end the logic by sending them to our failed page. Similarly, we could send them to login or somewhere else.

```js
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(isAuthenticated()) {
      next()
    } else {
      // Calling next with false sends them back where they came from
      // next(false)
      next('/failed')
    }
  } 
})
```

[2:21] Finally, we need to add an `else` statement if the record does not require auth. We'll use `next` to end the navigation. **If we navigate to `/egghead`, they're not authenticated so they can't get there. The navigation guard is triggered because the user has tried to navigate to a new page**. `requiresAuth` is set to `true` on the egghead route record, so we drop into the first set of logic.

```js
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(isAuthenticated()) {
      next()
    } else {
      next('/failed')
    }
  } else {
    next()
  }
})
```

[2:51] **The `isAuthenticated()` function results to `false`, which sends us to the `else` block**. There we call the `next` function with the failed route path. That sends us to the failed route record, as we can see. Next, we'll change our `isAuthenticated()` function to return `true`.


```js
function isAuthentiated() {
  return true
}
```

[3:14] If we try and navigate to `/egghead` again, it will be successful. **That's because it's going into if `isAuthenticated` resolving to `true` and triggering the `next` function, which ends our navigation guard and sends the user to the URL they're attempting to navigate to**.

[3:36] We can see that our `beforeEach` navigation guard is working as anticipated.
