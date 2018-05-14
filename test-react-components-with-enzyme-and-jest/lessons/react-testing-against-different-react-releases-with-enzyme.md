Instructor: 00:01 Once you have Enzyme installed in your workflow, it's **important to know which version of React you are using**. Enzyme has some adapters that need to be installed and configured in order to work with certain React releases.

00:14 Create React app has may currently set up with React 16. In order to use Enzyme and set up our test, I need to install a package called enzyme-adapter-react-16.

```bash
$ npm install --save-dev enzyme-adapter-react-16
```

00:28 Once uploaded, we'll see it here. We can now configure our test to use this adapter. We'll go through our `App.test.js` page and import `configure` from `enzyme`.

#### App.test.js
```javascript
import { configure } from 'enzyme'
```

00:41 Next, we'll import `Adapter` from `enzyme-adapter-react-16`. We'll use this configure function, which takes an object adapter, new adapter.

```javascript
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter() })
```

00:51 Perfect, this is all we need in order to use React 16 in our test with Enzyme. We could have also created a test set-up file and put this in there, because it only needs to be at it once. For simplicity, we will leave it in this file.

**Adapters and configurations need to be set up if you're using React 16, 15, 0.14 or 0.13.** 

01:06 The set-up is the same for each of these versions. The only thing that needs to be changed is the adapter package that we're installing.

01:21 If you're working within React 15.5 or higher, that will be the `enzyme-adapter-react-15` package. If you're working within 15.0 and 15.4, that will be the 15.4. If you're working with the 0.14, that will be the `enzyme-adapter-react-14` package, and if you're working with 0.13, that will be the `enzyme-adapter-react-13`.