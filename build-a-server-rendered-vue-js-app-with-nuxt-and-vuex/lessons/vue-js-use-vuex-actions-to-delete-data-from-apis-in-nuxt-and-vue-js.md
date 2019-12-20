Notice that each Todo also has a `todo.id`, which means that I can use this id "1, 2, 3". Or if I had another one, you'll see 4. I can use that id to look it up when I request to delete one of these from the API.

#### index.vue
```html
<li v-for="todo of todos" class="ph3 pv3 bb b--light-silver">{{todo.id}}{{todo.task}}</li>
```

I'm going to put this in a `<span>` so I can add some buttons behind it. That way in my class I can say `flex`, and then in this I can say `flex-auto` to basically take up the remaining space and push my buttons to the right.

```html
<li v-for="todo of todos" class="flex ph3 pv3 bb b--light-silver">
  <span class="flex-auto">{{todo.id}}{{todo.task}}</span>
  <button></button>
</li>
```

Then in my button I want to put an `img`, and the source can be, there's a great little service at icon.now.sh. If I look this up, [icon.now.sh](icon.now.sh)`, I can find the icon I want. We'll just find a trashcan one.

```html
<button><img src="https://icon.now.sh" alt=""></button>
```

I'll search for 'trash' and this will be fine. I'll copy this, paste that there, now I have a nice little trash can where I can delete this. I'll also align this down since that expanded the height of the button. We'll do `item-center`, which adjusted the align item-center.

```html
<li v-for="todo of todos" class="flex items-center ph3 pv3 bb b--light-silver">
  <span class="flex-auto">{{todo.id}}{{todo.task}}</span>
  <button><img src="https://icon.now.sh/trash" alt=""></button>
</li>
```

![trash can icon](../images/vue-js-use-vuex-actions-to-delete-data-from-apis-in-nuxt-and-vue-js-trash.png)

Now, when I click on this trashcan, I want to say `click`, and we'll say `remove`. 

```html
<button @click="remove"><img src="https://icon.now.sh/trash" alt=""></button>
```

This remove is what we want to map to action, `remove`. 

```js
methods:{
  ...mapActions([
    'add'
    'remove'
  ])
}
```
It will then map to interactions and `async remove`, which will have a very similar signature here, where this takes the `commit` and the `task`. Actually, this one's going to be the `todo` since I want to get the todo id off it.

#### index.js
```js
async remove({commit}, todo) {
  const res = await axios.post('https://todos-cuvsmolowg.now.sh/todos', {task, complete:false})

  commit('add', res.data)
}
```

Then I'm going to `axios.delete`. This string I want to turn into a template string. I can target the todo.id and send a delete request directly to that todo.id. I don't need to pass anything else, I'll just go ahead and delete that.

```js
async remove({commit}, todo) {
  const res = await axios.delete('https://todos-cuvsmolowg.now.sh/todos/${todo.id}')

  commit('add', res.data)
}
```

Then after that's done, I can pass on that todo to a committed mutation, where I say `remove`.

```js
async remove({commit}, todo) {
  const res = await axios.delete('https://todos-cuvsmolowg.now.sh/todos/${todo.id}')

  commit('remove', todo)
}
```

Can go ahead and duplicate this down, say `remove`, and now state.todos is going to be a filtered version of `state.todos`. If the `t.id` is not equal to the `todo.id` that was deleted, that means we want it. We're basically getting everything but that todo.id that we deleted. 

```js
  add(state,todo) {
    state.todos = [...state.todos, todo]
  },
  remove(state,todo) {
    state.todos = state.todos.filter(t=> t.id != todo.id)
  }
}
```

Back here, just need to make sure we're passing in our todo to that remove, which I'll pass in `todo` right here. That's coming from the todo of todos. 

#### index.vue
```html
<li v-for="todo of todos" class="flex items-center ph3 pv3 bb b--light-silver">
  <span class="flex-auto">{{todo.id}}{{todo.task}}</span>
  <button @click="remove(todo)"><img src="https://icon.now.sh/trash" alt=""></button>
</li>
```

The workflow here is todo goes into the remove. This remove is in mapActions, so it's in the methods of our index.vue, which is then mapped to in my actions in index.js.

This remove sends off a delete request.

#### index.js
```js 
const res = await axios.delete('https://todos-cuvsmolowg.now.sh/todos/${todo.id}')
```

Once that comes back, we can just commit remove the original todo since this doesn't really return anything. It's just deleting something. Then on the front end we can remove-commit this mutation by filtering out that todo. I'll go ahead and save and try this out.

 
```js
remove(state,todo) {
  state.todos = state.todos.filter(t=> t.id != todo.id)
}
```

I'll click this 'some task', and now it's gone. I can click 'sleep' because no one needs to do that. Now we only have 'eat' and 'code' left. I'll add 'sleep' back, hit enter, you can see we have sleep at number four. 

I'm just going to add a tiny bit of formatting here. We'll do todo.id.  with a space so you can see those numbers a bit better.

#### index.vue
```html
<span class="flex-auto">{{todo.id}}. {{todo.task}}</span>
```

Then in this form, I'm going to give the same class as the article. Maybe even give it an `input submit` button with a `value="Add"`, just so you can click on that if you didn't know that enter was available to hit to submit something.

```html
<form class="pa3 pa5-ns" @submit.prevent="add(task)">
  <input v-model="task" type="text">
  <input type="submit" value="Add">
</form>
```