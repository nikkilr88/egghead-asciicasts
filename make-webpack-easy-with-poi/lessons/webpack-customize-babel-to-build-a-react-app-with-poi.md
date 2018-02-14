Switching over to React is as easy as installing React and ReactDOM, then, install babel-preset-react app. I like the babel plug-in react require, and save these as devDependencies. I'll delete this, add a babelrc, which poi will automatically pick up.

Say my presets are React app, and my plug-ins are React require. Then, go into my index, I'll select all, import from ReactDOM. We'll need to grab the render method. I can skip importing React because of the React require plug-in.

Then, say render. We'll pass in a div, say React, and then, we'll get the element by ID of app. Hit save there, run poi, and we have a React app, which will auto-reload anytime I make a change.