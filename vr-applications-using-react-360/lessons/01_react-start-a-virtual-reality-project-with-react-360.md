Instructor: [0:00] In order to get started with React 360, first install `react-360-cli` from npm. Once this is done, create a new product. Use the `init` command. We're going to call our product `travelVR` because our app will allow people to travel.

```bash
npm install react-360-cli -g

react-360 init travelVR
```

or

```bash
npx react-36- init travelVR
```

![React 360 install](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1561149312/transcript-images/start-a-virtual-reality-project-with-react-360-npm-install.png)


[0:13] This is going to take a while because React 360 has a lot of dependencies. Once this is done, go to our product directory, and then run `npm start`.

```bash
cd travelVR

npm start
```

This is going to start React Native packager. This is going to tell us to open our browser at this URL.

[0:25] Once we do that, we need to wait a while in order for all dependencies to be loaded, but once it's done, we can see the result over here.

[0:31] We have this 360 view. We can look around. We have this text, "Welcome to React 360," in front of us. Let's take a look inside of the code. The important thing to know about React 360 is that even though it runs inside of the fancy VR environment, it's not that different from React that we know for the Web.

[0:46] We do have index.html. We also have things like React components. We have views, which you may know from React Native. We also have our stylesheet objects, which basically allows us to write CSS and JS in VR.

[0:59] In order to track whether our project has been set up correctly, change this text to, "`Welcome to Egghead`." Save and refresh that. We can see this change over here, which means that now we are ready to go and implement our app.

#### index.html
```html
<Text style={styles.greeting}>
  Welcome to EggHead
</Text>
```
