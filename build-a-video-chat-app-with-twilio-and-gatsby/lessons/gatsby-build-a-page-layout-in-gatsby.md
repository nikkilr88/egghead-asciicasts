Jason Lengstorf: 0:01 To get started, we need a place for our app to live. We're going to build a home page and a layout for that. Start by building a layout, so that we've got something to put on the home page. We're going to call this `layout.js`. Inside, we will `import React from 'react'` and then we will `import { Link } from 'gatsby'`, which we'll use to do a local link here.

0:21 We're also going to `import './layout.css'`. We didn't cover writing the styles because that's not really what this lesson is about. We're just going to `import` those. We'll use them throughout the app.

0:31 Then we're going to set up a component called `Layout`. That is going to accept a `children` props, so that we can put whatever we want inside of it. It's going to return a **React Fragment**. Inside of that React Fragment, we want to have a `<header>` element and also a `<main>` element.

### layout.js
```jsx
import React from 'react';
import { Link } from 'gatsby';

import './layout.css';

const Layout = ({ children }) => (
    <>
        <header></header>
        <main></main>
    </>
)
```

0:47 Inside the `<header>`, we're going to <Link to="/"> the home page, so just to root. We'll call this a `Video Chat App`. Inside the `<main>` component, all we need to do is return the `children` prop.

0:59 Next, we need to `export` that component. We'll `export` that as the `default`. 

### layout.js
```jsx
const Layout = ({ children }) => (
    <>
        <header>
            <Link to="/">Video Chat App</Link>
        </header>
        <main>{children}</main>
    </>
);

export default Layout;
```

To use it, we're going to create a page. In Gatsby, we create pages by creating a `pages` folder inside of the `src` directory. The home page is going to be called `index.js`.

1:14 In here, we will also `import React from 'react'`. We will `import Layout` that we just created from `'../components/layout'`. Then, we'll just `export` the `default` component. Our `default` component to begin is going to be the `Layout` we created. Inside of it, we'll just give ourselves a note, `<h1>TODO: create app</h1>`

### pages/index.js
```jsx
import React from 'react';
import Layout from '../components/layout';

export default () => (
    <Layout>
        <h1>TODO: create app</h1>
    </Layout>
);
```

1:34 To check our work, let's start the app. Start the app, open your command line and run `yarn develop`. After the app is finished booting, we'll see success in the CLI and then we can open this URL, `http://localhost:8000`.

![localhost:8000 link in shell](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-learn-build-a-page-layout-in-gatsby-localhost.jpg)

1:47 We'll see, here's our layout. It does <Link to="/"> the home page. If we click that, it doesn't do anything because we're already there. It chooses our
`<h1>` of `TODO: create app`.

![app homepage with header of "TODO: create app"](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-learn-build-a-page-layout-in-gatsby-homepage.jpg)