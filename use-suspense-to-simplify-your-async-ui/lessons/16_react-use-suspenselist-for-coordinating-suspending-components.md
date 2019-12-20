Instructor: [00:00] We've built an app so the Pokémon can manage their money, so I'm going to click on Pikachu here. We're going to load the nav and the left nav, the right nav, and then the main content here, where we show some links up here at the top. You can search.

[00:13] You've got some links here on the side. You've got some advertisements and public service announcements. Then we also have this feature, Check-Split, so you can split the check with your friends. Then you can send money to your friends, and you can review the money that your friends have sent to you.

[00:28] The thing that I want to point out in particular is this loading experience that we have when we land on this page in the first place. Let's watch that again. We click on Pikachu. We have a loading spinner for all four of the components that we're loading.

[00:41] We're doing this for various reasons -- maybe the code behind this is really heavy. Maybe we're doing some really heavy A/B testing, and we don't want to load any of the code that's not necessary. Maybe we have a ton of different variations of what these cards look like and we only want to load the code for the particular cards that we're going to display.

[00:59] **There are lots of good reasons to code split your code to not send everything that you've built to the browser. This is a situation where you wind up with this loading spinner of doom where you have just a bunch of loading spinners all over the page. As things load in, just pay close attention how things bump around as things jump in.**

[01:20] Let's take a look at how this is implemented and see how we can improve this with `SuspenseList`. Here we have all of our lazily loaded components. You'll notice we're just using `React.lazy`, we have our dynamic import.

```js
const NavBar = React.lazy(() =>
  import('../suspense-list/nav-bar').then(delay(500)),
)
const LeftNav = React.lazy(() =>
  import('../suspense-list/left-nav').then(delay(2000)),
)
const MainContent = React.lazy(() =>
  import('../suspense-list/main-content').then(delay(1500)),
)
const RightNav = React.lazy(() =>
  import('../suspense-list/right-nav').then(delay(1000)),
)
```

[01:32] Then, we actually tack on a .`then` to delay each one of these imports by a certain number of milliseconds, just so that we can see what it looks like as they load in over time. We can simulate this being particularly heavy components or having a pretty slow network speed.

[01:49] If we go down here to our app, we start out with a `pokemonResource` of `null`. If there is no `pokemonResource`, then we'll render out the form. As soon as the user selects a Pokémon, then we request the user information for that Pokémon. That includes their transactions, their friends and their color and then we render out the rest of our app.

```js
function App() {
  const [startTransition] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)

  function handleSubmit(pokemonName) {
    startTransition(() => {
      setPokemonResource(createResource(() => fetchUser(pokemonName)))
    })
  }

  if (!pokemonResource) {
    return (
      <div className={`${cn.root} totally-centered`} style={{height: '100vh'}}>
        <PokemonForm onSubmit={handleSubmit} />
      </div>
    )
  }
 
 ...

}
```

[02:09] We have an `ErrorBoundary` and then we have `Suspense` boundaries around each one of these lazily loaded components because we don't want to have to wait for all of them to load before we show anything. We want them to come in over time as they're available.

```js
function App() {

  ...

return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.Suspense fallback={fallback}>
          <NavBar pokemonResource={pokemonResource} />
        </React.Suspense>
        <div className={cn.mainContentArea}>
          <React.Suspense fallback={fallback}>
            <LeftNav />
          </React.Suspense>
          <React.Suspense fallback={fallback}>
            <MainContent pokemonResource={pokemonResource} />
          </React.Suspense>
          <React.Suspense fallback={fallback}>
            <RightNav pokemonResource={pokemonResource} />
          </React.Suspense>
        </div>
      </ErrorBoundary>
    </div>
  )
}
```

[02:22] Unfortunately, this gives us that junky bouncing around experience. It would be nice if we could control how these things are loaded, so that we can improve the perceived performance of our application. This is where React `SuspenseList` comes in.

[02:34] Right around our React Suspense components right here, I'm going to add a React `SuspenseList`. We'll just put all of these `Suspense` components in that React `SuspenseList`.

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList>
          <React.Suspense fallback={fallback}>
            <NavBar pokemonResource={pokemonResource} />
          </React.Suspense>
          <div className={cn.mainContentArea}>
            <React.Suspense fallback={fallback}>
              <LeftNav />
            </React.Suspense>
            <React.Suspense fallback={fallback}>
              <MainContent pokemonResource={pokemonResource} />
            </React.Suspense>
            <React.Suspense fallback={fallback}>
              <RightNav pokemonResource={pokemonResource} />
            </React.Suspense>
          </div>
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

[02:47] If we save that and go here, you're going to notice there's actually no change here. Let's go ahead and add a `revealOrder` prop. This takes a couple of options. First, let's do `together`. 

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="together">
          
          ...

        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

Save that, come here, and now **with `revealOrder="together"` all of the loading spinners show up. None of them go away until everything is ready and no longer suspended.**

[03:09] That improves the experience a little bit because they're not jumping around all over the place as they load in, but it doesn't really improve things a whole lot. If one of these things took a long time, like, let's say the main content took five seconds, then the user's just going to be sitting here for quite some time.

[03:28] They could make use after the left nav, the top nav, or even the right nav before that middle content loads in. Let's undo that change. We'll come down here, and we'll use `forwards`. 

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards">
          
          ...

        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

Save that and come in here. **Then with `revealOrder="forwards"`, we're going to get the top nav loading. Then, these load in whatever order they load.**

[03:48] One important thing about `SuspenseList`s with the `revealOrder` of `forwards` -- and there's also a `backwards` -- is **that it only applies to the direct children of the `SuspenseList`.** If we have any other elements between the `SuspenseList` and the Suspense component.

[04:04] When the `revealOrder` is `forwards` or `backwards`, then those `Suspense` components will render as soon as they're ready. **To get around this, we can add a `SuspenseList` as a nested `SuspenseList` here.** Let's put all these in a nested `SuspenseList` with the `revealOrder` of forwards.

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards">
          <React.Suspense fallback={fallback}>
            <NavBar pokemonResource={pokemonResource} />
          </React.Suspense>
          <div className={cn.mainContentArea}>
            <React.SuspenseList revealOrder="forwards">
              <React.Suspense fallback={fallback}>
                <LeftNav />
              </React.Suspense>
              <React.Suspense fallback={fallback}>
                <MainContent pokemonResource={pokemonResource} />
              </React.Suspense>
              <React.Suspense fallback={fallback}>
                <RightNav pokemonResource={pokemonResource} />
              </React.Suspense>
            </React.SuspenseList>
          </div>
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

[04:19] Then, we'll get the experience that we're looking for -- top, left, right, and then further right. If we wanted to, we could actually nest this even further by putting those two together. We could say here React `SuspenseList`, `revealOrder`. We'll put these `together`. Then, we'll put both of these inside of that together.

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards">
          <React.Suspense fallback={fallback}>
            <NavBar pokemonResource={pokemonResource} />
          </React.Suspense>
          <div className={cn.mainContentArea}>
            <React.SuspenseList revealOrder="forwards">
              <React.Suspense fallback={fallback}>
                <LeftNav />
              </React.Suspense>
              <React.SuspenseList revealOrder="together">
                <React.Suspense fallback={fallback}>
                  <MainContent pokemonResource={pokemonResource} />
                </React.Suspense>
                <React.Suspense fallback={fallback}>
                  <RightNav pokemonResource={pokemonResource} />
                </React.Suspense>
              </React.SuspenseList>
            </React.SuspenseList>
          </div>
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

[04:39] That gives us an interesting experience where we get the top first. Then we get the left nav. Then these two will pop in when they're both ready to go. You can nest these things all day long and have fine-grained control over how things are loading. You also have a bit of control over the loading state.

[04:56] We can say `tail` is `hidden`. 

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards" tail="hidden">
         ...
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

**That will basically mean that we don't see any loading indicators of any kind.** Probably not the best user experience here, so instead of `hidden`, let's go ahead and say the `tail` is `collapsed`. Then, we'll click on new here. **With tail `collapsed` we'll see the loading spinner for the next thing that's supposed to load.**

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards" tail="collapsed">
         ...
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

[05:19] If we want to have the same experience for this group of suspending components, then we can add a tail `collapsed` on this. We can say Pikachu. We give that one. We get this one.

```js
return (
    <div className={cn.root}>
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards" tail="collapsed">
          <React.Suspense fallback={fallback}>
            <NavBar pokemonResource={pokemonResource} />
          </React.Suspense>
          <div className={cn.mainContentArea}>
            <React.SuspenseList revealOrder="forwards" tail="collapsed">
              <React.Suspense fallback={fallback}>
                <LeftNav />
              </React.Suspense>
              <React.SuspenseList revealOrder="together">
                <React.Suspense fallback={fallback}>
                  <MainContent pokemonResource={pokemonResource} />
                </React.Suspense>
                <React.Suspense fallback={fallback}>
                  <RightNav pokemonResource={pokemonResource} />
                </React.Suspense>
              </React.SuspenseList>
            </React.SuspenseList>
          </div>
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  )
}
```

[05:32] Then, we get these two because they're loading together. **You can't specify a tail when the `revealOrder` is together.** Let's go ahead and comment this out and take a look at what the tail collapsed would look like for all three of these Suspending components.

[05:45] We got a Mew. We got the one for the navbar, one for the left, one for the middle content, and then one for the check split. I liked that before, so let's comment this out and comment this out. We'll leave it like that.

[05:58] In review, all that we were doing in here was playing around with the React `SuspenseList` component with the `revealOrder` and tail props that it supports. It gives us fine-grain control over the order in which these Suspending components are going to load and at the fallbacks that are shown.
