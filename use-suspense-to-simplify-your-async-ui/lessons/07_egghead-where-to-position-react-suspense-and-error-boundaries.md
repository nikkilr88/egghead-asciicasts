Instructor: 0:00 One thing that's important to consider when you're using error boundaries and Suspense boundaries is where you locate those relative to the components that are going to either throw errors or suspend. We are locating it directly around the component that's going to suspend, but we could move it up further in the tree, and everything will work just as well.

```js
function App() {
  
  ...

  return (
    <div>
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <ErrorBoundary>
        <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
          <div className="pokemon-info">
            {pokemonResource ? (
                <PokemonInfo pokemonResource={pokemonResource} />
            ) : (
              'Submit a pokemon'
            )}
          </div>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  )
}
```

0:23 If I select Pikachu, then you'll notice the whole area gets replaced with the loading state. We can do that again. It's all getting replaced with the loading state. Specifically, we have this `<div className="pokemon-info">`. That div class name `pokemon-info` is getting replaced by the `PokemonInfoFallback`.

0:41 If we move this up even further, that change is even more stark. 

```js
function App() {
  
  ...

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
        <div>
          <PokemonForm onSubmit={handleSubmit} />
          <hr />
              <div className="pokemon-info">
                {pokemonResource ? (
                    <PokemonInfo pokemonResource={pokemonResource} />
                ) : (
                  'Submit a pokemon'
                )}
              </div>
        </div>
      </React.Suspense>
    </ErrorBoundary>
  )
}
```

Now, when I select Pikachu, even my form goes away and we only see the loading state, and then everything comes back in there. Being mindful about where you're putting these boundaries can be really important.

0:58 Let's take it a step further. If I make an error in the input field on the webpage and I submit that, then we're going to get this error boundary replacing everything on the page, and I have to do a full-page refresh to get things working again.


1:10 That said, we don't have to put the error boundary and Suspense boundary together. Sometimes you can sort those where it makes the most sense. The only thing that we're really concerned about catching errors for is the `PokemonInfo`. We could put the error boundary down here around the PokemonInfo, and then we could have this same problem, but it shows up where our card should be.

```js
function App() {
  
  ...

  return (
    <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
      <div>
        <PokemonForm onSubmit={handleSubmit} />
        <hr />
            <div className="pokemon-info">
              {pokemonResource ? (
                <ErrorBoundary>
                  <PokemonInfo pokemonResource={pokemonResource} />
                </ErrorBoundary>
              ) : (
                'Submit a pokemon'
              )}
            </div>
      </div>
    </React.Suspense>
  )
}
```

1:32 Also, if we wanted to keep our Suspense boundary right up around our `pokemon-info` className here, but we didn't like that the loading state takes away all that `pokemon-info` div, then actually we can make our fallback include a `pokemon-info` div and wrap our `PokemonInfo` fallback in that `pokemon-info` div.

```js
return (
  <div>
    <PokemonForm onSubmit={handleSubmit} />
    <hr />
    <React.Suspense
      fallback={
        <div className="pokemon-info">
          <PokemonInfoFallback name={pokemonName} />
        </div>
      }
    >
      <div className="pokemon-info">
        {pokemonResource ? (
          <ErrorBoundary>
            <PokemonInfo pokemonResource={pokemonResource} />
          </ErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </React.Suspense>
  </div>
)
```

1:56 As far as the user is concerned, we haven't removed the `pokemon-info` div in particular, we've just rendered something else inside it. Now we get the rendering that we're looking for. Then we have an error state being rendered exactly where we want that as well.

2:12 You can be really systematic about where you're putting these things. Feel free to play around with the location of where you put the Suspense and error boundaries around the components that are suspending and throwing errors. Make sure that the Suspense state is what you're looking for.

2:27 Just as a little tip, if we click on Pikachu here and you wanted to see what Pikachu looks like in its loading state again, then you can go to your developer tools in your chrome browser, go to the React developer tools for components, and then select `PokemonInfo`.

2:42 There's this little button, "Suspend the selected component." You click on that. It puts this component in its suspended state so you can see and work with that loading state. Then you can click on this again to toggle it off.

2:54 In review, what we did here is we just moved the `React.Suspense` component around a little bit. We moved the `ErrorBoundary` around, just to experiment with the different user experiences we want to have for this particular component.