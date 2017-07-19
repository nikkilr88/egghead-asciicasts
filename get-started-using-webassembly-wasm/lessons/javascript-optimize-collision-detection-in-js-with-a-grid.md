To optimize our collision algorithm in JavaScript, our main loop is this `timeStep` function. What we're doing on each `timeStep` is we're looping over every single circle in the entire page. That's 2,000.

We're updating its dynamics, and then we're applying collision detection against every other circle. We're doing four million collision detections every single frame, and this is exactly our performance problem.

We can improve this collision algorithm by breaking the space up with the `grid`. We then only need to compute collision detection with individuals cells with the `grid`. We're going to use an arbitrary width and height for the `grid` initially. We can optimize this later.

```javascript
const grid = []; 
const gridWidth = 10;
const gridHeight = 15;
```

In our `timeStep` function, we then create the `grid` on every single `timeStep`. We loop through the columns, and the rows each of which is represented by an array. The individual cells are then an array of circles that are contained within that `grid` cell. For this initialization step, we're just going to set it to an empty array for each cell.

```javascript
for (let p = 0; p < gridWidth; p++) {
	const col = grid[p] = [];
	for (let q = 0; q < gridHeight; q++) {
		col[q] = [];
	}
}
```

The first part of our `timeStep` function is computing the dynamics of each circle. We're going to leave this computation in place, but then instead of going straight into the collision detection, we're going to first assign each circle into one of the `grid` cells.

We compute the column for the current circle based on its x position on the page as a fraction of the total width scaled up to the `grid` size. We need to round that down since the `grid` starts at zero, so we can do that using `Math.floor`.

```javascript
let coll = Math.floor(xi / displayWidth * gridWidth);
```

If we look at some of the biggest circles on the right, they're actually contained in multiple `grid` cells. Instead of computing a single cell for each circle, we need to compute its cell range.

We'll compute its leftmost column based on subtracting the radius from the center point, and also compute its rightmost column, and do the same for its topmost row, and its bottom row.

```javascript
let leftColl = Math.floor((xi - ri) / displayWidth * gridWidth);
let rightColl = Math.floor((xi + ri) / displayWidth * gridWidth);
let topRow = Math.floor((yi - ri) / displayHeight * gridHeight);
let bottomRow = Math.floor((yi + ri) / displayHeight * gridHeight);
```

Now that we know exactly which cells the given circle belongs to, we need to assign it into the `grid`. We can do a loop over from the first column to the last column that the circle is in, and then we take those columns directly from the `grid`. We then loop for the row from the first row that the circle's in to the last row the circle's in, and we get the cell value out of the `grid`.

```javascript
for (let p = leftColl; p <= rightColl; p++) {
	const col = grid[p];
	for (let q = topRow; q <= bottomRow; q++) {
		col[q].push(i);
	}
}
```

We pre-assigned already each cell to an empty array of circles, so we can just use an array `push` to add to the circle to this cell. To reference the circle, we can use the index of the circle, and the `circleData` array as our unique identifier.

If the circle happens to be outside of the browser bounds -- say we're re-sizing the browser window -- we're going to be assigning to an invalid `grid`, or a negative `grid` value. Let's just detect if the front column is negative, and set it to zero, and similarly if the two column is greater that the `grid` width, just snap it back to the `grid` size.

```javascript
if (leftColl < 0)
	leftColl = 0;
if (rightColl >= gridWidth)
	rightColl = gridWidth - 1;
if (topRow < 0)
	leftColl = 0;
if (bottomRow >= gridHeight)
	bottomRow = gridHeight - 1;
```

If two circles collide outside of the browser window, we're effectively ignoring those collision detections. With the `grid`, we no longer need to do collision detection between every circle, so I'm going to close out this loop over every circle that we're currently in.

Now, we just have to loop over each of the individual cells in the `grid`, and apply collision detections for the circle just within that cell. The cell value itself is the array of circle indices which are contained in the cell. You want to loop over this array as well.

```javascript
for (let p = 0; p < gridWidth; p++) {
	const col = grid[p];
	for (let q = 0; q < gridHeight; q++) {
		const cell = col[q];

		...
	}
}
```

The iteration values we had for each circle before were an `i` and an `iv` iterator. The `i` going in steps of the three, and the `iv` going into steps of two. To get the `iv` iteration value from the information you have here, I'm just going to divide `i` by three, and multiply it by two.

```javascript
for (let p = 0; p < gridWidth; p++) {
	const col = grid[p];
	for (let q = 0; q < gridHeight; q++) {
		const cell = col[q];

		for (let k = 0; k < cell.length; k++) {
			const i = cell[k];
			const iv = i / 3 * 2;
		}
	}
}
```

As in the previous code, we can now read out the `x`, `y`, and `r` values of the circle from the `circleData` as well as reading out the x and y components of the last "T" using these indices. With the variables set up for one circle in the cell, you want to do a comparison with another circle in the cell.

```javascript
for (let p = 0; p < gridWidth; p++) {
	const col = grid[p];
	for (let q = 0; q < gridHeight; q++) {
		const cell = col[q];

		for (let k = 0; k < cell.length; k++) {
			const i = cell[k];
			const iv = i / 3 * 2;

			const xi = circleData[i];
			const yi = circleData[i + 1];
			const ri = circleData[i + 2];

			let vxi = circlevData[iv];
			let vyi = circlevData[iv + 1];

			...
		}
	}
}
```

We're going to need a final inner loop where we can get the index of this circle that we're comparing with. This loop only needs to start from the circle after the current circle, so we only doing each pair of comparisons once.

We're just about there now. With these `j` and `jv` indices set up for the comparison circle, the position and velocity look ups are actually already in our original collision detection code.

I'm just going to go ahead, and copy that in. This is now nesting our entire collision detection algorithm within these specific `grid` cells comparisons.

```javascript
for (let p = 0; p < gridWidth; p++) {
	const col = grid[p];
	for (let q = 0; q < gridHeight; q++) {
		const cell = col[q];

		for (let k = 0; k < cell.length; k++) {
			const i = cell[k];
			const iv = i / 3 * 2;

			const xi = circleData[i];
			const yi = circleData[i + 1];
			const ri = circleData[i + 2];

			let vxi = circlevData[iv];
			let vyi = circlevData[iv + 1];

			for (let l = k + 1; l < cell.length; l++) {
				const j = cell[l];
				const jv = j / 3 * 2;

				const xj = circleData[j];
				const yj = circleData[j + 1];
				const rj = circleData[j + 2];

				if (detectCircleCollisioin(xi, yi, ri, xj, yj, rj)) {
					...
				}
			}
		}
	}
}
```

That's the collision algorithm `grid` optimization. I can assure you, I didn't get this right first time, and there were many hours of reading, rewriting, and debugging in the process.