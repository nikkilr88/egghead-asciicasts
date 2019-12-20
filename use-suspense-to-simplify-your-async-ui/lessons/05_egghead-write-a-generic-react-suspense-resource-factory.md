Instructor: [00:00] Let's go ahead and make this generic so we can use this in other places. I'm going to make a generic function called `createResource`. This is going to accept and asynchronous function. We'll call this an `async` function as the argument here.

[00:12] Then I'm going to move all this stuff up in here. We'll make it generic. We'll have this be a result and we'll call this simply our error. We'll just call this our promise. Instead of `fetchPokémon`, this is going to be **async function**. We'll call that, and then we'll set our result here. Instead of P, we can just call this R for `result`. `Error` can be assigned to that E.

[00:39] Then we need to extract this logic somehow. What I'm going to do is we'll return an object that has a `read` method on it so we can read the value. I'm going to move all this logic right up to that read that method. Then instead of `pokemonError`, it's simply error. Instead of `pokemon`, it's going to be `result`. Instead of `pokemonPromise`, it will simply be `promise`.

```js
//...
function createResource(asyncFn) {
  let result
  let promise = asyncFn().then(
    r => (result = r),
    e => (result = e),
  )
  return {
    read() {
      if (error) {
        throw error
      }
      if (!result) {
        throw promise
      }
      return result
    },
  }
}
//...
```

[01:00] With that, I can say `createResource` and we'll pass that `fetchPokemon` function that we had in there before. We'll pass a function that calls `fetchPokemon` and returns the promise that `fetchPokemon` returns.

```js
let pokemonResource = createResource(() => fetchPokemon('pikachu'))
```

[01:13] This is going to give us a `pokemonResource`. That `pokemonResource` is this object that's returned here. This `pokemonResource` has this `read` method on it, so when we call read, it's going to run the same logic that we had there before.

[01:28] I'll just move that right there, `read`. This is going to give us back our Pokémon.

```js
//...
function PokemonInfo() {
  const pokemon = pokemonResource.read()
  //...
}
```

If there was an error, it'll throw the error. If there's no result yet, it will throw the promise. We need to return the result, if there is a result.

[01:43] That will give us back our Pokémon here. Let's go and save that, we'll get a refresh and it looks like everything is working. That was a straight up refactor, just to make it so that I can create a resource out of any **asynchronous function** in my code base.

[01:57] We can call a `createResource` with a function that returns a promise. Our particular function is calling another function that returns a promise and just returning that value. That gives us back an object that has a read property on it, which says the same logic that we had before.

[02:13] There's a little bit of clean up that I want to do to this particular function to make it a little more robust. What I'm going to do is I'm going to have a `status` called `'pending'`. Then, I can say in here, "If our `status` is pending, then we can throw the promise." That way it's a lot more clear.

[02:31] Here, instead of just simply assigning the result, we'll do that but we'll also set the `status` to success. Then in here, we can say if the `status` is success, then we can return the result. Then in here, I'm going to do the same thing we were doing before, but then I'm going to set the `status` to error.

[02:54] Then I can say if the `status` is error, then we'll `throw` the error. That cleans up some of this logic a little bit. Even better, I can get rid of this error and we'll just say that this is the result. Then we just `throw` the result.

```js
// ...
function createResource(asyncFn) {
  let status = 'pending'
  let result
  let promise = asyncFn().then(
    r => {
      status = 'success'
      result = r
    },
    e => {
      status = 'error'
      result = e
    },
  )
  return {
    read() {
      if (status === 'pending') throw promise
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('This should be impossible')
    },
  }
}
//...
```

[03:12] All of this works just as well as it had before, but I think it looks a little bit cleaner because we're **more explicit about the current state** that we're in.

[03:19] In review, what we did here was we took some logic that we were putting inside of our component, and outside of our component, and we put it into this reusable `createResource` function that allows us to pass an asynchronous function.

[03:32] It calls that asynchronous function, manages the state and the result, and then provides a read method that we can call. We can manage suspending the promise when we're in a pending state, throwing an error if our status is an error state, and simply returning the result if we're in a success state.

[03:51] The end result looks pretty nice. We have this `PokemonInfo` component that has a `pokemonResource` read that gives us this Pokémon. We don't have to think about time in our component anymore. We just assume that it's there. If it's not, it's managed declaratively with our error boundary and our Suspense fallback.

[04:10] There are likely to be a lot of different abstractions written like `createResource`. I would encourage you to play around with making your own. Again, the only people who've actually shipped Suspense to production reliably is Facebook. I was just experimenting here with experimental Suspense API that we have today.

[04:26] It just so happens that this createResource function has actually already been implemented in our utility. I'm just going to import createResource from our utilities, and we actually have a much better fallback.

[04:39] I'm going to import `PokemonInfo` fallback from our utilities here as well. I'll just render that here with the name set to Pikachu. We'll save that. Now, our fallback looks a lot nicer and we're using the reusable createResource in our utils.
