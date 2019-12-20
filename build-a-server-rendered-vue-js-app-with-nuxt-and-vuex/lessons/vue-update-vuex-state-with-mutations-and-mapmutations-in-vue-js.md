To change this counter value in my store here, my store/index file, I'll `export a const of mutations`. This is an object which declares some functions. I'm going to declare `increment`, and increment takes in the `state`. It references `state.` whatever properties I need, like `counter`.

#### index.js
```js
export const state = {
  counter: 0
}

export const mutations = {
  increment(state){
    state.counter
  }
}
```

I'm going to say `++`, so when we call incremen`, it's going to take the state referencing this state, and increment that value. 

```js
export const state = {
 counter: 0
}

export const mutations = {
  increment(state){
    state.counter++
  }
}
```

To do that from our vue, we're going to do something very similar, where I say `mapMutations`.

#### index.vue
```html 
<template>
  <div>
    {{counter}}
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
```

I can grab those methods off of the mutations. Inside of the `methods` property in my component, I can go ahead and spread a `map mutations call`. This takes an array of strings which map to `increment`, or any of the other mutations that are named inside of your mutations.

```js 
export default {
  computed:{
    ...mapstate({
      counter:state => state.counter
    })
  },

  methods:{
    ...mapMutations([
      'increment'
    ])
```

Basically, this means that now, instead of calling any sort of store.dispatch, or referencing the store at all, I could come up here and create a `button`. Say, when I `click` on this button, call `increment`, and I'll just say this is a `+` sign. Let's save here. I'll click plus. You can see this value going up.
 
```html 
<template>
  <div>
    {{counter}}
    <button @click="increment">+<button>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
```

To see that process in reverse, let's just go ahead and create another `button`. I'll call this one `-`. I'll say when I `click` on this, I want this to `decrement`. 

#### index.vue 
```html 
<template>
  <div>
    {{counter}}
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
```

Decrement wants to be mapped to a mutation down here. Say `decrement`.

```js
methods:{
  ...mapMutations([
    'increment',
    'decrement'
  ])
}
```

I need to define that mutation in here, called `decrement`, which takes in a `state`, and says `state.counter--`.

#### index.js 
```js
export const state = {
  counter: 0
}

export const mutations = {
  increment(state){
    state.counter++
  },
  decrement(state){
    state.counter--
  }
```

I'll hit save here in index.js. +++, ---, where the click handler here of increment is mapped to increment on the store, which is defined here, where the mutation tells the state to increment, or the decrement mutation tells the state to decrement.