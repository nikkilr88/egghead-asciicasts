Here we have our basic **Vue** component. Let's get rid of our `content` attribute and replace it with a list called `items`. Each item will have a `text` attribute that we'll set to a string. We'll set this first one to `"Velociraptor"` We'll set the next one to "`"Triceratops"` Our last one will be `"Stegosaurus"`

```javascript
var car = new Vue({
	el: "#card",
	data: {
		title: "Dinosaurs",
		items: [
			{ text: "Velociraptor" },
			{ text: "Triceratops" },
			{ text: "Stegasaurus" }
		]
	}
})
```

Let's add this list to our template. We're going to get rid of our `content` `div` and add a list. To iterate over our `items` array, we need our templates to make use of the `v-for` property. We're going to have `v-for="item in items"` 

Each time that iterates, we're going to make use of the `item.text` property. Let's create a way to add `items` to this list dynamically. Let's create an `input` field with the ID of `itemForm`. Then we'll create an `Add Dinosaur` `<button>`.

```html
<div id="card">
	<header>{{ title }}</header>
	<div>
		<input id="itemForm" />
		<button>Add Dinosaur</button>
	</div>
	<ul>
		<li v-for="item in items">
			{{ item.text }}
		</li>
	</ul>
</div>
```

We need a way for this `<button>` in our template to call a method on our component. In our component, we're going to add a block for `methods`, and then we're going to add a method called `addItem`. Here we're going to set the variable `input` equal to `itemForm`.

```javascript
var car = new Vue({
	el: "#card",
	data: {
		title: "Dinosaurs",
		items: [
			{ text: "Velociraptor" },
			{ text: "Triceratops" },
			{ text: "Stegasaurus" }
		]
	},
	methods: {
		addItem: function() {
			var input = document.getElementById('itemForm');
		}
	}
})
```

After verifying that the `input.value` is not an empty string, we're going to `.push` an object into the `items` array with the `text` attribute set to the `input.value`. Then we want to clear out that `input`. 

```javascript
var car = new Vue({
	el: "#card",
	data: {
		title: "Dinosaurs",
		items: [
			{ text: "Velociraptor" },
			{ text: "Triceratops" },
			{ text: "Stegasaurus" }
		]
	},
	methods: {
		addItem: function() {
			var input = document.getElementById('itemForm');

			if(input.value !== ''){
				this.item.push({
					text: input.value
				})
				input.value = "";
			}
		}
	}
})
```

Let's hook up our `<button>` to the `addItem` method by adding the `v-on:click` property to our `<button>`.

```html
<div id="card">
	<header>{{ title }}</header>
	<div>
		<input id="itemForm" />
		<button v-on:click="addItem" >Add Dinosaur</button>
	</div>
	<ul>
		<li v-for="item in items">
			{{ item.text }}
		</li>
	</ul>
</div>
```

We'll set that equal to `addItem`. Let's also allow the user to press enter to add `items`. We'll do that by using the property `v-on:keypress.enter`, and setting that to `addItem`. Now you'll see we can add a `T Rex`. Let's add a way to remove dinosaurs from our list.

```html
<div id="card">
	<header>{{ title }}</header>
	<div>
		<input id="itemForm" v-on:keypress.enter="addItem" />
		<button v-on:click="addItem" >Add Dinosaur</button>
	</div>
	<ul>
		<li v-for="item in items">
			{{ item.text }}
		</li>
	</ul>
</div>
```

In our item iterator, let's add a `<button>` with a `v-on:click` property set to `deleteItem`. We're going to need to know the index of the clicked item. The `for` property takes two arguments, the second of which is an `index`.

```html
<div id="card">
	<header>{{ title }}</header>
	<div>
		<input id="itemForm" v-on:keypress.enter="addItem" />
		<button v-on:click="addItem" >Add Dinosaur</button>
	</div>
	<ul>
		<li v-for="(item, index) in items">
			<button v-on:click="deleteItem(index)">X</button>
			{{ item.text }}
		</li>
	</ul>
</div>
```

Let's add that `index` to our `deleteItem` call, then let's go to our `method` struct, and add the `deleteItem` function. We'll pass the `index` into this method, and then we'll use that `index` to `.splice` the item out of the `items` array. We can get rid of these pesky velociraptors, and add a `T Rex` and a `Pachycephalosaurus`.

```javascript
var car = new Vue({
	el: "#card",
	data: {
		title: "Dinosaurs",
		items: [
			{ text: "Velociraptor" },
			{ text: "Triceratops" },
			{ text: "Stegasaurus" }
		]
	},
	methods: {
		addItem: function() {
			var input = document.getElementById('itemForm');

			if(input.value !== ''){
				this.item.push({
					text: input.value
				})
				input.value = "";
			}
		},
		deleteItem: function(index) {
			this.items.splice(index, 1);
		}
	}
})
```