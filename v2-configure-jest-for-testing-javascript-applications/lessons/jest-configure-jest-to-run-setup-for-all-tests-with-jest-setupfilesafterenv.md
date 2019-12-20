Instructor: [00:01] I've updated this calculator test to do something a little bit more useful. Let me show you what happens if I were to break something. In calculator.js if I pass ('BC') into expect(clearButton.textContent).toBe() and run `npm t`, I'm going to get an error. That error's going to say, "expected receive to be expected."

[00:15] We see that we expected BC to be AC, and there's a problem there. We need to fix something. It's not very clear what's going on here. Luckily, we do have this code frame that explains a little bit more. It would be nice if we could say, "I want this button's text content to be some value."

[00:32] Then our error message could be a little bit more explicit and say, "Hey, you expected the DOM node to have a text content with this value," just to make our error read a little nicer. We're going to actually install as a dev dependency, testing library Jest DOM to add some really nice assertions for us.

```bash
npm install --save-dev @testing-library/jest-dom
```

[00:52] With that, in calcualtor.js we're going to import star as Jest DOM from testing library Jest DOM. 

This Jest DOM object is going to be a bunch of expect extensions. We'll say expect.extend Jest DOM. That's going to add a bunch of new assertions for us.

```js
import * as jestDOM from '@testing-library/jest-dom'
import React from 'react'
import {render. fireEvent} from '@testing-library/react'
import Calcualtor from '../calculator'

expect.extend(jestDOM)
```

[01:12] For both of these text contents, instead of using toBE(), we'll just pass the dom node and say to have text content B instead of toBe. 

```js
test('the clear button switches from AC to C when there is an entry', () => {
  const {getByText} = render(<Calculator />)
  const clearButton = getByText('AC')
  
  fireEvent.click(getByText(/3/))
  expect(clearButton).toHaveTextContent('C')
  
  fireEvent.click(clearButton)
  expect(clearButton).ttoHaveTextContent('BC')
})
```

Now, we can run `npm t` and we're going to get that error still, but the error message is going to be a little bit more useful.

[01:28] We expected an element to have the text content BC, but we received AC. Not only does the assertion code read a little bit nicer, the error message reads a little bit nicer as well. We can change BC back to AC and then we'll run `npm t` and we'll see our test passing.

[01:44] This is great, but I don't want to have to add all of this boiler plate code to every single one of my files. Jest DOM actually exposes a module that we can import called Jest DOM/extendexpect, which will do this for us. With that, our tests are passing.


```js
import * as jestDOM from '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render. fireEvent} from '@testing-library/react'
import Calcualtor from '../calculator'

expect.extend(jestDOM)
```

[01:59] As cool as this is, I don't want to have to import this into every one of my test files either and so it would be really nice if I could just have this file run before any of my test files run. That's exactly what we're going to do in our jest configuration. I'll go to jest.config.js, and we're going to add a setupFilesAfter Env.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],
  moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.css$': require.resolve('./text/style-mock.js')
  }
}
setupFilesAfterEnv: [],
snapshotSerialozers: ['jest-emotion'],
```

[02:19] These are the files that jest will run after it sets up the jest testing environment. What's the file we want to run? This one(@testing-library/jest-dom/extend-expect). We'll paste that into setupFilesAfterEnv. We can get rid of this line(import * as jestDOM from '@testing-library/jest-dom/extend-expect'). Now, our test will continue to pass because jest will automatically import that file into all of our test files.

```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared'],
  moduleNameMapper: {
  '\\.module\\.css$': 'identity-obj-proxy',
  '\\.css$': require.resolve('./text/style-mock.js')
  }
}
setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
snapshotSerialozers: ['jest-emotion'],
```

[02:37] In review, what we did here was we installed testing-library/Jest DOM, and then we added setup files after ENV to include that extend expect from testing-library/Jest DOM. With that, we're able to use some really nice assertions from Jest DOM.
