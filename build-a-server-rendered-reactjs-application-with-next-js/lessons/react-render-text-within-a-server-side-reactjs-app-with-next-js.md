Instructor: [00:00] To get started with Next.js, we are going to need to install inside of our project along side React in ReactDOM. Once installed, we can wire up these next commands inside of our `"scripts"` object. As you could see, where in the `"dev"` command is going to kick-off this `next` development server, and `start` is going to run `next start`, while `"build"` is going to create an optimize `next build` for a project.

####package.json
```javascript
{
    "name": "nextjs-course",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "next",
        "start": "next start",
        "build": "next build"
    }
    ...
}

```

[00:28] Right now, our mainly concern with this `"dev"` command though, which is what we're going to be using to develop our application. One of the reason that Next is such a awesome tool is to do how quickly that allows us to get working. By creating this `page` directory, Next is automatically going to create routes for us, then map to the files inside `index.js`.

[00:49] Since, Next now is that we're using React, we don't need to import library, rather, we can use create a status functional component like so. As you could see, I'm just passing with `title` prop to this component, and making it render the text `'Hello from next.js'`.

####index.js
```javascript
const Index = ({ title = 'Hello from next.js' }) =>  
    <div>
        <h2>{title}</h2>
    </div>;
```

[01:09] The only thing that's really imperative is making sure we `export` our component as the `default` export, which is going to tell next, where it should be rendering on the page. 

```javascript
const Index = ({ title = 'Hello from next.js' }) =>  
    <div>
        <h2>{title}</h2>
    </div>;

export default Index;
```

If we execute that `npm run dev` command, we should see next starting a development server for us.

[01:29] If we visit our localhost, port 3000, we should see that text propping render to our page. 

![hello rendered](../images/react-render-text-within-a-server-side-reactjs-app-with-next-js-hello-rendered.png)

Pretty neat, right?

[01:37] To cap this off, I'm just going to create another file inside this `pages` directory called `above.js`. I'm just going to have this render out slightly different text than our index row, and we'll make it say, `'Hello from the above route'`.

####about.js
```javascript
const About = ({ title = 'Hello from the about route!' }) =>  
    <div>
        <h2>{title}</h2>
    </div>;

export default About;
```

[01:59] All I have to do is save that, and if we go back in our browser and navigate to this, `localhoast:3000/about`, we should see this specific tags is being rendered for us, when we visit this `/about` URL.

![about route](../images/react-render-text-within-a-server-side-reactjs-app-with-next-js-about-route.png)