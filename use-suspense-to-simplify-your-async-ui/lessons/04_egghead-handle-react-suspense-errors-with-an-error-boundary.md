Instructor: [0:00] As great as this is that we can get our Pokémon data, what if I had a mistype here and instead it was `'pikachah'`? If I save that, we get a refresh and it's just going to hang out here forever. If I open up my developer tools and look in my console, I'm going to see that that request did fail because there's no Pokémon by the name of `'pikachah'`.

[0:20] We need to handle our errors and display something useful to the user. What we're going to do here is, we have our success handler and then as a second argument, we'll have our error handler. With this, we need to assign that error to, I don't know, let's make a variable called `pokemonError`. We'll assign that error here. Let's make that variable `pokemonError`.

```js
//...
let pokemon
let pokemonError
let pokemonPromise = fetchPokemon('pikachu').then(
  p => (pokemon = p),
  e => (pokemonError = e),
)

function PokemonInfo() {
  if (pokemonError) {
    throw pokemonError
  }
  if (!pokemon) {
    throw pokemonPromise
  }
  //...
```

[0:42] Then in our `PokemonInfo`, we'll say if there's a `pokemonError`, then we can actually just throw the `pokemonError`, and we can rely on an `ErrorBoundary` to catch that for us. It just so happens that we have a utils file here. This has an `ErrorBoundary` built out for us. This is the standard `ErrorBoundary` API that React has supported for quite some time.

[1:03] We're just going to import that from our utils. Let me just grab that. Then, we'll render our `ErrorBoundary` around our Suspense component. We'll say `ErrorBoundary` right here, and that `ErrorBoundary` is going to catch that thrown error. Here we have it. There was an error, and we have some additional information for our particular error.

[1:22] Let's go ahead and let's try one of these other Pokémon. We'll say Mew. Save that, get a refresh, and there's Mew's information. Again, if we give it a Pokémon that isn't supported, we're going to get that `ErrorBoundary` catching the error that we're throwing, so that we can handle that error appropriately.

[1:37] In review, to handle errors with `Suspense`, **you're going to need to have some sort of tracking of the error that is happening. Then you can simply throw that error during render, and rely on the `ErrorBoundary` to catch that and display the information appropriately.** Alternatively, we could have just rendered some JSX here, but I prefer to rely on error boundaries when handling errors in my app.

[1:58] The `ErrorBoundary` we're using is a pretty standard `ErrorBoundary` that React has supported for quite some time, which implements the `getDerivedStateFromError` static method to manage our error state. This is what's going to render out the message when we experience an error.
