Instructor: [0:00] Let's say we want to make an app, where every time you refresh the page, it loads up some Pikachu Pokémon data. We have this stubbed-out Pokémon, and that just results in this sad to-do state. We need to get this Pokémon variable assigned to the actual Pikachu data, but that's coming from a server request.

[0:18] What we need to do, is request this Pokémon data from the server. We don't need to wait for this `PokémonInfo` component to actually know. We can fire off that request right away. That's what we're going to do in here. Instead of assigning Pokémon to this object here, we're going to say, `let pokemon`, and we'll assign it to nothing from the get-go. Then, we'll fetch the Pokémon.

[0:38] We're going to get `fetchPokemon` from the utility here, `import fetchPokémon from fetchPokemon`. Then, with `fetchPokemon`, we can call that with `'pikachu'`. This is going to give us back a promise. I'm going to call this a Pokémon promise.

[0:55] When that comes back, I'm going to get the Pokémon data and I'm going to say Pokémon equals that Pokémon data. In here in my `PokemonInfo`, I can say if there's no Pokémon yet, then we're going to throw the Pokémon promise.

```js
// src/exercises/01.js
import React from 'react'
import fetchPokemon from '../fetch-pokemon'
import {PokemonDataView} from '../utils'

let pokemon
let pokemonPromise = fetchPokemon('pikachu').then(p => (pokemon = p))

function PokemonInfo() {
  if (!pokemon) {
    throw pokemonPromise
  }
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}
```

[1:13] This is the current API for suspense and this is one API that is likely to change. I'm not exactly sure what this suspense API is going to look like when it's officially stabled, but there are a couple of drawbacks to this approach that the React team is currently working through.

[1:27] This is the current API for the **experimental** `Suspense` that we have today and so that's what we're going to do. If there is no Pokémon loaded yet, then we're going to throw this Pokémon promise. React is going to catch this thrown on promise and it's going to attach a then to it, so that I can re-render our component, but it needs to know what it should display while that promise is in flight.

[1:49] What we need to do is create a **suspense boundary** around this component, so that when this component says, "Hey. I'm not ready to render," we can render something else. That's what we're going to do right here is we're going to use `React.Suspense` and we'll put `PokemonInfo` in there.

[2:05] When React catches the promise that we're throwing, React will look up the tree to find the closest to React suspense component and it will render a `fallback`. We'll provide that `fallback` here, we'll just say div loading Pokémon. Then we can go ahead and save that. We refresh this, so we get loading Pokémon and there it is, just like magic.

```js
// ...
function App() {
  return (
    <div className="pokemon-info">
      <React.Suspense fallback={<div>Loading Pokemon...</div>}>
        <PokemonInfo />
      </React.Suspense>
    </div>
  )
}
```

[2:28] In review, all that we had to do to get this working is we needed to have some variable that we're going to reference for storing the data that we're going to get back from the server. Then we're going to make that server call to get Pikachu's data.

[2:41] **We don't need to wait for this component to mount before we start making that fetch request**. We go ahead and just make it right here. This is going to give us our Pokémon `promise`, and when it resolves, then we're going to assign the data we get back to this Pokémon variable.

[2:55] Because we're throwing this Pokémon promise, React is going to catch that. **It will render the fallback that we specified here instead**. Because React catches the promise, it can attach its own callback by calling then on the promise that we threw.

[3:10] When this Pokémon promise resolves, it knows that it's time to try and rerender the component. When it does rerender the component, Pokémon is now a variable that has some data, because we assigned that data in our own success handler.

[3:22] As it's rerendering it says, "Oh, that variable is defined. I'm not going to run this if statement. Instead, I'm going to return this regular JSX." Again, this bit is a little bit up in the air right now. We're not exactly sure what the React team is going to come up with, when `Suspense` is stable. This is the general idea. This is what works with the experimental `Suspense`.
