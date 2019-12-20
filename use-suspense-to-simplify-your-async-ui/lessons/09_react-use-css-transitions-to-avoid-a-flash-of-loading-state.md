Instructor: [00:00] Before we were using `useTransition`, React didn't show a loading state for a couple of hundred milliseconds after the user interacted with our app. This was based on research by the React team, **because they noticed that users thought an interaction was slow if they saw a flash of loading state**.

[00:15] We can see a flash of loading state now, if we speed up this `fetchPokemon` request to only take 200 milliseconds. If we save that, we're going to get that initial loading state. Then, we click on Charizard, we're going to get that opacity down to 06, as we transition between these different Pokémon.

[00:33] It gets even worse if you lower it down to 100 milliseconds. Then we see a real flash of loading state. **This would look faster if we didn't see that flash at all**. One thing that we could do, is we could say, "Hey, if `isPending` is true, then we'll apply a class name, and that class name will make the styles have an opacity of 06."

[00:54] We can have a transition so that the transition is delayed by a couple of 100 milliseconds to simulate the same type of experience that we had before we used `useTransition`.

[01:06] **Again, the benefit of `useTransition` is that we get instant updates to the DOM based on the state updates that just occurred**, and we also have a little bit more control over what that stale state looks like, while we're waiting for the timeout that we've configured or for our promise to resolve.

[01:23] Let's go ahead. I'm going to change this opacity inline style thing. We're going to get rid of that. Instead, I'm going to apply a class name conditionally based on its pending state. We'll say `isPending`, then we'll apply `'pokemon-loading'`. Otherwise, we'll just apply an empty string.

```js
//..
<div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
  {pokemonResource ? (
    <ErrorBoundary>
      <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
        <PokemonInfo pokemonResource={pokemonResource} />
      </React.Suspense>
    </ErrorBoundary>
  ) : (
    'Submit a pokemon'
  )}
</div>
//..
```

[01:45] With that now, I'm going to go to my CSS and here is the Pokémon info styles. I'm going to add a `PokemonInfo`. Pokémon loading here, and we'll set the opacity to 06. We'll transition our opacity and we'll just make it transition instantly. I don't need it to fade in and out.

[02:06] **The key here is I'm going to make the transition delay take 04 seconds**. It seems like a reasonable amount of time. If it takes longer than 400 milliseconds, then we'll show the opacity of 06. If it take shorter, then the Pokémon loading class name will get removed and we don't see the opacity of 06.

```css
/* src/styles.css */
.pokemon-info.pokemon-loading {
  opacity: 0.6;
  transition: opacity: 0s;
  transition-delay: 0.4s;
}
```

[02:27] If we go back here, again, our `fetchPokemon` has been hacked and here we can control how long it takes. We're just going to make it 100 milliseconds. Then I'll go here, we see that initial loading state with a new Suspense component that we're rendering.

[02:41] Then, we'll see when we click on Charizard, because it happens so fast, we don't see that intermittent loading state and the app feels responsive to us. Then, if we make this take 500 or 800 milliseconds, then we will see that pending state there.

[03:01] In review, the problem that we're facing is, for people with fast connections who could make this happen in 100 milliseconds, **we're seeing an intermittent pending state. We solve that problem by using a CSS transition in our styles here**, with a transition delay of 04 seconds.

[03:19] **Each use case is going to be slightly different**, but that's the one that seemed to work pretty well for this particular use case. Then, we conditionally apply that class name, based off of the `isPending` state that we're getting from our `useTransition`. This allows us to not show the pending state if the promise resolves within 400 milliseconds.
