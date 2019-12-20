Jason Lengstorf: 0:01 The heart of our app is going to be the actual rooms. The way the rooms are going to work is that someone's going to visit a URL, it's going to be /room/friends or /room/myroom. However, we're not going to be able to build individual files for every possible room name. Instead, we want to use route parameters and a single page app structure in order to make that possible.

0:25 We're going to take advantage of Gatsby's dynamic routing and create a `room.js`. Then we'll redirect all room requests, regardless of the room name, to this component so that we can handle it.

0:36 To start, let's `import React from 'react'` and build a really basic component. We're going to `export default` and we will grab the layout, which needs to come in from our components folder, layout. Inside, we will say that this is a room.

### pages/room.js
```jsx
import React from 'react';
import Layout from '../components/layout';

export default () => (
    <Layout>
        <h1>Room</h1>
    </Layout>
)
```

0:55 What we need to do is tell Gatsby that no matter what the URL is, we want to display this page. To do that, we're going to create a new file at the root of the app. We're going to hit New file and create `gatsby-node.js`. Inside, we're going to take advantage of Gatsby's `onCreatePage` API hook.

1:15 We'll do `exports.onCreatePage`. Inside of here, we're going to grab two pieces out of the Gatsby data. First is the `page` that's been created. Second is the `actions` object, which will allow us to perform different actions on the page itself.

### gatsby-node.js
```js
exports.onCreatePage = ({ page, actions})
```

1:30 We need to check if the `page.path` matches room. That means that any URL starting with room should match this. To do that, we're going to use a regular expression. We'll open that up and then we'll say, "At the beginning of our URL path, we want to check for a /room." Then we'll end our regular expression.

### gatsby-node.js
```js
exports.onCreatePage = ({ page, actions}) => {
    if (page.path.match(/^\/room/))
}
```

1:54 If that's true, we want to use the `.matchPath` in Gatsby to say, "Grab any room and just match anything underneath room." Finally, we'll use `actions.createPage` to update the room page and make sure that it takes this `.matchPath` directive.

### gatsby-node.js
```js
exports.onCreatePage = ({ page, actions}) => {
    if (page.path.match(/^\/room/)) {
        page.matchPath = '/room/*';
        actions.createPage(page);
    };
};
```

2:12 To get us started, we're going to create a very basic React component just to make sure things are working. Let's `import React from 'react'` and `import Layout from "../components/layout"`. Then we'll export a default component that at the moment is going to do nothing other than set up our `Layout` and give us a note that we're in the `Room` component.

### pages/room.js
```jsx
import React from 'react';
import Layout from '../components/layout';

export default () => (
    <Layout>
        <h1>Room</h1>
    </Layout>
)
```

2:33 To make sure that this works, let's get into our command line and run `yarn develop`. Once the site starts up, we can head over and visit room by typing in /room and we'll see it. If this work properly, we should be able to put any value after room and we'll see that it still directs us to our room component. Now, we're ready to set up routing.

![room page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-dynamic-routes-in-gatsby-with-reach-router-room-page.jpg)

2:58 To set up client-side routing, we need two things. First, we need a component to display and second, we need a router to tell us when to display that component. Let's start by creating the component itself, which we're going to call `VideoDisplay`.

3:13 Inside `VideoDisplay`, at first, we're just going to dump out the props. We'll say `import React from 'react'` and then we'll define `VideoDisplay`. That's going to take `props`, which we will then return inside of a `<pre>` tag.

3:30 We're going to use `JSON.stringify()`, set out the `props` and then use `null` and `2` to format that output a little bit and we'll `export default VideoDisplay`. 

### components/video-display.js
```jsx
import React from 'react';

const VideoDisplay = props => {
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default VideoDisplay;
```

Then, we can head back over to room and use this. To use it, we will `import { Router } from '@reach/router'`.

3:49 Reach Router is a bundled dependency with Gatsby, so we don't need to import this directly into our packages. Then, we're going to use the `VideoDisplay` component that we just created. `import VideoDisplay from '../components/video-display';`.

4:04 Once we have the `VideoDisplay` component, we can drop out the `<h1>`. Instead, we're going to wrap everything in here inside the `<Router>`. Our `VideoDisplay` needs to receive the name of the room that someone wants to render, which we'll pull out of the URL.

4:18 Reach router makes this really easy by allowing us to simply add a `path` parameter to any component. We're going to use `room` and then we want to name our room with `:roomID`. We can choose any name we want here and what we'll see is that we're going to get some `props`, including the `roomID` passed into `VideoDisplay`.

### pages/room.js
```jsx
import React from 'react';
import { Router } from '@reach/router'
import Layout from '../components/layout';
import VideoDisplay from '../components/video-display';

export default () => (
    <Layout>
        <Router>
            <VideoDisplay path="room/:roomID" />
        </Router>
    </Layout>
);
```

4:40 Let's save this and head back. Now we can see that our `roomID` is available. If we update this, the `roomID` updates as well. What happens if we don't pass a `roomID`? We end up with a blank screen.

![Room json with roomID](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-dynamic-routes-in-gatsby-with-reach-router-room-json-with-roomID.jpg)

4:54 To fix that, we need to add a fallback component, which we'll use a default helper from reach router to make that happen. We're going to create little component called `BounceToHome`. What `BounceToHome` will do is if someone is here, we need to use an effect which will pull in from `React` to navigate them to the home page.

5:17 To navigate, we need to pull in `navigate` from Gatsby. The `navigate` method allows us to programmatically change where we are in the app. In this case, we want to send someone back to the home page. We want to make sure that we removed this entry of `/room` from history because it's a redirect. If we don't remove that, it will break their back button in their browser.

### pages/room.js
```jsx
import React, { useEffect } from 'react';
import { Router } from '@reach/router'
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import VideoDisplay from '../components/video-display';

const BounceToHome = () => {
    useEffect() => {
        navigate('/', )
    }
}

export default () => (
    <Layout>
        <Router>
            <VideoDisplay path="room/:roomID" />
        </Router>
    </Layout>
);
```

5:38 We're going to replace history using `{ replace: true }`. We want that to happen just on the first render and then we're going to `return null`, so that the component doesn't give us any errors. To use this component, we will set `BounceToHome` as the default, which means that if nothing matches the `VideoDisplay` path, then we're going to bounce them to home.

### pages/room.js
```jsx
const BounceToHome = () => {
    useEffect(() => {
        navigate('/', { replace: true });
    }, []);

    return null
}

export default () => (
    <Layout>
        <Router>
            <VideoDisplay path="room/:roomID" />
            <BounceToHome default />
        </Router>
    </Layout>
);
```

5:58 We can test that by going up here and saying room/egghead, which gives us what we want. If I remove that and just try to go to room, I get bounced out to the home page. If I hit back in my browser, it takes me to room/egghead, instead of back to /room, which would trigger the redirect again.