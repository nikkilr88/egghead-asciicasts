We're going to take this JavaScript application that renders circles into the page and convert it into **WebAssembly**. All the data for the circles is stored in a single `circleData` typed array which contains an xy and r value for each circle that is rendered into the page.

Our `init` functions sets that initial state of the circles and our `timeStep` function then updates the positions based on the velocities and bouncing off the edges. The details of the functions aren't actually that important.

For the conversion into **WebAssembly** the important thing is how this code interfaces with JavaScript and how we manage its interface. We're going to do the conversion into C. We create a new C file, and let's just copy and paste all the JavaScript except for the render call directly into the C file.

We can now start the conversion. The `circleCount` is going to be a constant of our compilation process so we'll set it up as a macro. 

```cpp
#define CIRCLE_COUNT = 1000
```

For the `circleData` we could just set it up as an array of floats like we've done in JavaScript, but in C we can do better than that.

The xy and r values of each circle can be represented in a C `struct`, with each entry set as a `float` data type. It's still effectively the same representation in memory as three floats in a row that we had manually in our typed array.

```cpp
#define CIRCLE_COUNT = 1000

struct Circle {
	float x;
	float y;
	float r; 
}
```

The velocity data can then be stored in the same way with the x and y components of velocity as floats. 

```cpp
#define CIRCLE_COUNT = 1000

struct Circle {
	float x;
	float y;
	float r; 
}

struct CircleV {
	float vx;
	float vy;
}
```

To actually initialize the `circleData`, we need to create an array of these circle `struct`s. The way we initialize that in C is with the `struct` `Circle` and then the name of the array that we're creating.

```cpp
struct Circle circleData
```

We're going to statically set aside the full amounts of circles, which is 1,000 times the size of the circle, which is three floats. So we end up setting aside the same amounts of memory as we did in JavaScript with our explicit `init`, but with C it knows the size of the object so we don't need to add our multiple of three. We can do the same for the circle velocity.

```cpp
struct Circle circleData[CIRCLE_COUNT];
struct CircleV circleData[CIRCLE_COUNT];
```

Now we're ready to write our `timeStep` functions. Converting their signatures into valid C function signatures, both these functions have no return value so they are `void`. The `displayWidth` and `displayHeight` are both `float` arguments.

```cpp
void init (float displayWidth, float displayHeight) {
	...
}

void timeStep (float displayWidth, float displayHeight) {
	...
}
```

To iterate over the array of `circleData`, we no longer need to do this complex iteration. We can simply have a single integer which is iterating over the full `circleCount` and incrementing by one. C can take care of the rest for us.

```cpp
void init (float displayWidth, float displayHeight) {
	for (int i = 0; i < CIRCLE_COUNT; i++) {
		...
	}
}
```

Updating the indices we then can access our `struct` items individually. The first item is now called `x`. We no longer need to do a custom increment, we can just represent the y value as `y` and the r value as `r`. The same for the velocity data.

```cpp
void init (float displayWidth, float displayHeight) {
	for (int i = 0; i < CIRCLE_COUNT; i++) {
		circleData[i].x = displayWidth * Math.random();
		circleData[i].y = displayHeight * Math.random();
		circleData[i].r = 5;

		circlevData[i].vx = displayWidth * Math.random();
		circleData[i].vy = displayWidth * Math.random();
	}
}
```

Let's apply the same conversion to the `timeStep` as well. These constant values are all 32-bit floats. Then we just update the indices. The last part of this code that's still JavaScript is these `Math.random()` calls.

```cpp
void timeStep (float displayWidth, float displayHeight) {
	for (int i = 0; i < CIRCLE_COUNT; i++) {
		float x = circleData[i].x;
		float y = circleData[i].y;
		float r = circleData[i].r;
		float vx = circleData[i].vx;
		float vy = circleData[i].vy;

		circleData[i].x = x + vx;
		circleData[i].y = y + vy;
		
		if (x + r > displayWidth && vx > 0 || x - r < 0 && vx < 0)
			circlevData[i].vx = -vx;
		if (y + r > displayHeight && vy > 0 || y - r < 0 && vy < 0)
			circleData[i].vy = -vy;
	}
}
```

We're going to still be calling `Math.random()` underneath because we don't have access to another random source in **WebAssembly**, but we're going to make it as an external function. We can just define our `Math.random()` signature as returning a `float` value, and then we can call it `randomf`.

```cpp
#define CIRCLE_COUNT 1000
 
float randomf ();
```

By simply defining the signature it will be treated as an external function and we can then replace all calls to `Math.random()` with `randomf()`. The C file should really remain the source of truth for where the `circleCount` is defined.

It's annoying to have to define it as well within the JavaScript so let's create a function that will simply provide that. In order to actually get our data out of **WebAssembly** we need to know where the address is to the `circleData` object. This is the thing that we want to have access to from JavaScript.

```cpp
int getCircleCount () {
	return CIRCLE_COUNT;
}
```

I'm going to create a helper function that returns an integer called `getCircleDataOffset`. The return value is the memory address of the `circleData` array, when compiled this becomes the exact **WebAssembly** memory address.

```cpp
int getCircleDataOffset () {
	return &circleData;
}
```

To quickly compile I'm going to copy the C code into **WasmFiddle**. Once the build completes successfully the .wast format comes up at the bottom of the page and we can then download the **WebAssembly** binary file.

Checking the .wast output, we can see that we're importing the `randomf` function from an `"env"` module that we're going to populate shortly.

We're also exporting our memory as well as all of the functions that we've created in our C file. In a new HTML file lets now wire in the **WebAssembly**. First copy in a helper function to load the **WebAssembly**. I'm going to call it with the path to our **WebAssembly** file which I have located in a folder called `./lib/dynamics.wasm`.

```jsx
<!doctype html> 
	<title>WASM Demo</title>
	<body style="margin:0; overflow: hidden">
		<canvas id="canvas" style="width: 100vw; height: 100vh; display:block;"></canvas>
	</body>
	<script type="module">
		import render from './lib/render.js'

		function fetchAndInstantiateWasm (source, importObj) {
			return fetch(source)
			.then(response => {
				if (response.ok)
					return response.arrayBuffer();
				throw new Error('Unable to fetch wasm ${source}.')
			})
			.then(WebAssembly.compile)
			.then(module => {
				let instance = new WebAssembly.Instance(module, importObj);
				return instance.exports;
			});
		}

		fetchAndInstantiateWasm('./lib/dynamics.wasm')
	</script>
```

The second argument contains the imports for the wasm module. We need to set the environment import which contains a `randomf` function, which we assign from `Math.random()`. This returns a promise which resolves to our instantiated **WebAssembly** module.

```javascript
fetchAndInstantiateWasm('./lib/dynamics.wasm', {
	env: {
		randomf: Math.random
	}
})
.then(m => {
	
})
```

Let's work backwards from the arguments to our `render` function. First thing we want is the `circleCount`. We can get that by calling the `getCircleCount` function that we created directly off the **WebAssembly** module instance.

In the same way we can call the `getCircleDataOffset` function to get the memory address of the `circleData` array in wasm memory. To get our `circleData` typed array we can use a different form of the `float` 32-array constructor.

This allows us to create a typed array from any buffer source. In this case we can use the exported memory object from the wasm module accessing the `buffer` property. This constructor form then takes two further arguments -- the offset in bytes within the buffer and the length in bytes within the buffer to generate the typed array from.

The offset is exactly our exported offset and then the length is exactly the length that we had at the very beginning -- the number of circles times three, the total size of our circle position data and memory. Our `timeStep` methods can then be accessed directly from the instance exports, completing our **WebAssembly** conversion.

```javascript
fetchAndInstantiateWasm('./lib/dynamics.wasm', {
	env: {
		randomf: Math.random
	}
})
.then(m => {
	const circleCount = m.getCircleCount();
	const circleDataOffset = m.getCircleDataOffset();
	const circleData = new Float32Array (m.memory.buffer, circleDataOffset, circleCount * 3);

	render(circleData, circleCount, m.init, m.timeStep);
})
```