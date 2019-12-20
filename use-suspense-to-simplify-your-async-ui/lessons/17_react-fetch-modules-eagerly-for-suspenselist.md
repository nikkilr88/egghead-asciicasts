Instructor: [00:00] We actually have a bit of a problem here. This is the before, and this is after. I want you to watch how quickly we get things onto the screen. If I click on Pikachu here and then Pikachu here, you'll notice this one's done. This one takes quite a bit more time to get everything loaded.

[00:17] What's going on here, why is this slower? **We should have been able to control the order in which things are rendered, not the order in which things are loaded**. It looks to me like we have a **waterfall problem**. That's exactly what we have here.

[00:30] When you put a `Suspense` component inside of a `SuspenseList`, then based on the reveal order that you specify, React will find the `Suspense` component and find the one that should load first. It will render that component.

[00:43] Then for all the other `Suspense` components, it does not render those children. It does this as an optimization, so we don't bother rendering something that we actually don't need the user to see yet. It's a great optimization, but **it's backfiring for us because these components are `React.lazy` components**. `React.lazy` will lazily import the module at the time that the component is rendered.

[01:07] Because our `SuspenseList` is making sure that the navbar is the first thing that's actually rendered and it prevents rendering the rest of our `Suspense` components, we're not making a request to get the code for this component, until it's actually rendered, which is a bit later when we're using `SuspenseList` with this reveal order of forwards.

[01:25] This is a known trade off and there are currently discussions with the React team trying to figure out a good way to address this particular problem. I have a little workaround that I think is interesting. At the time that the user submits a Pokémon, we know we need to go and request all of this lazily loaded components.

[01:42] What if we had some sort of API where we could say, "Hey. I want my navbar to preload the module, and I want my main content to preload, and my left nav to preload and my right nav to preload." We just get all of those things preloaded. By the time the `Suspense` component gets to our component, we've already started loading the module.

```js
//...
function handleSubmit(pokemonName) {
  startTransition(() => {
    setPokemonResource(createResource(() => fetchUser(pokemonName)))
    NavBar.preload()
    LeftNav.preload()
    MainContent.preload()
    RightNav.preload()
  })
}
//...
```

[02:07] Here, let's go ahead and implement this preload strategy. I'm going to make a function here called `preloadableLazy`. This is going to take our dynamic import and then it's going to return `React.lazy` with the dynamic import.

[02:27] This is just a straight up refactor. There's nothing special going on here. We're just wrapping `React.lazy` with our own function. Now, what we're getting back from this is a component. I want that component to have a preload function it. We're going to return the component here. What I'm going to do is I'm going to make a function called load.

```js
function preloadableLazy(dynamicImport) {
  const Comp = React.lazy(dynamicImport)
  Comp.preload = {}
  return Comp
}

const NavBar = preloadableLazy(() =>
  import('../suspense-list/nav-bar').then(delay(500)),
)
const LeftNav = preloadableLazy(() =>
  import('../suspense-list/left-nav').then(delay(2000)),
)
const MainContent = preloadableLazy(() =>
  import('../suspense-list/main-content').then(delay(1500)),
)
const RightNav = preloadableLazy(() =>
  import('../suspense-list/right-nav').then(delay(1000)),
)
```

[02:48] We're going to have a promise that's assigned to dynamic import. We'll just call that. Let's define this promise here. Then, we'll return the promise. If we've already defined the promise, if load has already been called, then we'll check that. We'll say, "If not promise, then we'll assign the promise to the dynamic import call."

[03:07] Then, we'll return it. **That way, we only make one call to the dynamic import**, and we hang on to the same promise that was made the first time that load was called. With this now, we can actually put that in our `React.lazy` call and preload can simply be assigned to load. We can make this dynamic import call.

```js
function preloadableLazy(dynamicImport) {
  let promise
  function load() {
    if (!promise) {
      promise = dynamicImport()
    }
    return promise
  }
  const Comp = React.lazy(load)
  Comp.preload = load
  return Comp
}
```

[03:25] Get access to the promise. Then, when `React.lazy` is called later, we return the exact same promise as the one that was preloaded. With that, we can go back to our app. Click on Pikachu here. Everything loads a lot quicker than before. Let's go ahead and watch that again with Mew.

[03:44] In review, **the problem that we're solving here React `SuspenseList` has an optimization where it doesn't bother rendering the `Suspense` components until they actually need to be rendered based on the order that we specified in our reveal order**.

[03:57] That's a problem for us because these components are suspending when they're rendered. They fire off the request to get the module at the time that they rendered. We need to start the request to get the module before they're rendered. Write in this cement handler where we set the `pokemonResource`.

[04:13] We know we're going to need all these modules, so we call preload to get the module loading happening sooner. We created that preload method as a wrapper around the `React.lazy` API so we can call that dynamic import and keep a handle on the promise. We return that same promise when `React.lazy` calls it.

[04:32] That lets us benefit from both React `SuspenseList` and `React.lazy` so that users using our app have a much faster loading experience that's less janky as things load in because we're able to control the order in which the suspending components are rendered. Again, I'll just say that **this is experimental technology**.

[04:50] **By the time React Suspense is stable, there may be a better solution for this problem built into React**, and you won't have to write any preloadable lazy function to make React `SuspenseList` work well with `React.lazy`. Look forward to that.
