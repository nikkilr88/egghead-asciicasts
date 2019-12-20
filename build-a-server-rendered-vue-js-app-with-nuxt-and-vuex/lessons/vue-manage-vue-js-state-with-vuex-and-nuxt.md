To add a store to our project, we'll add Vuex by creating a directory called `store` and putting a file called `index.js` inside of there. You'll see that here -- store/index. 

Then I can `export` a `const` called `state` from this file. Then on this state, I'll just say a `counter` has a value of `zero`.

#### index.js
```js
export const state = {
  counter: 0
}
```

From here I can display this counter in my index.vue by adding a `script` part of our vue file and `export default`. This is an object and this object has a property called `computed`. Inside this computed I'm going to use what's called `mapState from 'vuex'`. I'll grab `mapState` and I'm going to spread it right away.

#### index.vue
```html
<script>
import {mapState} from 'vuex'

export default {
  computed:{
    ...mapState
  }
```

This is the object spread, because mapState returns an object and I want it to merge with this computed object. I'll mapState where the `counter` is a `function` that takes in the `state` and gives me the `state.counter`.

```js 
export default {
  computed:{
    ...mapState({
      counter: state=> state.counter
    })
  }
```

If this looks weird, don't worry, because the pattern will essentially be a bunch of these, where you're telling the thing on the left that I want this thing off of the state. Then each of these are merged into computed by this object spread.

```js 
export default {
  computed:{
    ...mapstate({
      counter:state => state.counter,
      counter:state => state.counter,
      counter:state => state.counter,
      counter:state => state.counter,
    })
```

I'll delete all of them, because I only need the counter, which is mapped to the state.counter.

```js
export default {
  computed:{
    ...mapState({
      counter: state=> state.counter
    })
  }
```

Then I can go ahead and drop that counter inside of our <div> by saying `counter`. 

```html 
<template>
  <div>
    {{counter}}
  </div>
</template>
```

I'll hit save and if nothing appears here and you try and reload and nothing happens, you'll probably have to restart your dev server here. I control-C'd out of that and `yarn run dev` again. 

#### Terminal
```bash 
$ yarn run dev
```

That's because we added a file which we're importing, which isn't always picked up by dev servers. We didn't do anything wrong in here, it's just that the dev server didn't pick up the fact that we added that file.

Now, you'll see that zero, which is this state counter zero, mapped into counter, because we're plucking it off of state here and then displayed in our counter.