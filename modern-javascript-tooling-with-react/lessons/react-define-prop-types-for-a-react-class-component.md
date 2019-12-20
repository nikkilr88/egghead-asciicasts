Looking at this error boundary component, we can see that it relies on a prop called `children`. If we run our linter with `npm run lint`, we'll see that it fails. I'm going to expand this, and we'll see that it's failing because we're not explicitly calling out this `prop` requirement.

#### Lint Failure
![Lint Failure](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/react-define-prop-types-for-a-react-class-component-lint-fail.png)

We need to specify this with React `propTypes`. I'll go back into my code. At the top of this file, I'm going to do an `import propTypes from 'prop-types'`. Then down in my component, I'm going to add a static property called `propTypes`. This is going to equal an object.

#### DefaultErrorBoundary.js
```javascript
import propTypes from 'prop-types'

static propTypes={

}
```

That object is going to map to properties that we expect, their data type, and if they're required or not. In this case, we only have one. We're going to define a key called `children`. The value for this is going to be `propTypes.node`, because we expect a React node to be passed in as the `children` for this error boundary.

Then, we're going to specify that that `isRequired`.

```javascript
static propTypes = {
    children: propTypes.node.isRequired
}
```
We can save that. Then back in our terminal, I can `npm run lint`. This time, we'll see that it passes.
