Instructor: [00:00] We'll first start by bootstrapping an app with Create React App. Here, I'll use `npm init` and ask to use the React App initializer which maps to Create React App. We'll make a React Hooks Project and change to that directory when it's done, then Create React App does scaffolding, all the modules are installed, and bam, we have a project.

#### Terminal
```javascript
npm init react-app react-hooks && cd $
```

[00:20] Now, let's kick up our editor and open the `App.js` file, which is the top-level component that's rendered. Before we make any changes, let's kick up the Dev server from code's integrated terminal with `npm start`. We can see our app on the right.

![Dev Server](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-environment-setup-for-react-hooks-dev-server.png)

[00:35] Let's come in here and tweak the link to include the version with `React.version`. On the right, it auto-updates to show version `16.6.3`. However, Hooks is currently in a preview release. Let's cancel our Dev server and check out what versions are available for React with `npm info react`.

[00:56] At the bottom, you'll notice that there's a `next` `dist-tag` that maps to the preview release. 

![Next](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-environment-setup-for-react-hooks-next.png)

It is that release that contains the Hooks' proposal. We can install that with `npm install react@next`. We also need the React Dom to go along with it. We will tag on `react-dom@next` as well.

[01:13] If we wanted to be clever, we could leverage Bash Brace Expansion and `npm install react {,-dom}@next` which will expand to the same thing. We could double check if we wanted to with `npm ls react`, and sure enough, we have a pre-release of React 16.7.

![Pre release](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-environment-setup-for-react-hooks-pre-release.png)

[01:36] At this point, we should be able to kick up our Dev server again with `npm start`, and the app on the right auto updates to show a pre-release version of React.

[01:46] At this point, we are set up to start using Hooks.

![Pre Release App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-environment-setup-for-react-hooks-pre-release-app.png)