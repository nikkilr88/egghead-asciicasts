In this video we're going to build our very first **React component**. But before we do that, we need to do a few other things. The very first thing I'm going to do is run `npm init`.

### Terminal
``` Bash
npm init
```

What this is going to do, and I'm just pressing enter here to get through all the commands, is it's going to allow us to use npm to **require modules** that we need, specifically modules like React. So what I'm doing here is I'm installing a specific version of React, this is the latest version as of today, but that might change.

### Terminal
``` Bash
npm install --save react
```

So this is just future-proofing this series a little bit. When this is done, what you'll notice is that we have this `node_modules` folder, and inside that `node_modules` folder we now have React. We can see if we take a look inside of that, so React is right here. So now any time we want to use React, we can just `require` it and we'll have that available to us.

One more thing we need to install is this thing called the **ReactDOM**. The same thing, I'm going to install a specific version number, and we'll talk a little bit more about what exactly is ReactDOM later in this lesson.

### Terminal
``` Bash
npm install --save react-dom
```

Now we're going to install a bunch of **dependencies** related to **Babel**. Babel is a JavaScript compiler that's going to let us write **JSX**, which we'll talk about in a second, but it's also going to let us write **ES2015 or ES6** as I'll refer to it.

### Terminal
``` Bash
npm install --save babel-core babel-loader babel-preset-es2015 babel-preset-react
```

Basically what we're doing here with Babel is we will write some code, Babel will compile that for us into something that the browser can read. So let's look at exactly how Babel is going to help us. Here we have some normal React code, we have some JavaScript stuff, and then it looks like what we have here is HTML.

This is actually called **JSX**, and what JSX does is it allows us to write HTML-ish looking code inside of our JavaScript, and now that's going to sound a little weird, and it might throw up some red flags in your head, but it's actually really convenient, and you'll probably learn to love it as you get more used to React. Now you'll notice inside of our `node_modules` folder we have all this Babel stuff, and we also have our React code.

The next thing I'm going to do is make a folder called `public`, and then inside that folder, I'm going to make a new `index.html` file.

### Terminal
``` Bash
mkdir public
cd public/
ls
touch index.html
```

If we head over to our code, this `index.html` file is going to be basically the **root view** of our application. So you'll notice here I'm just pasting in this, we have bootstrap, and we have a `div` with an `ID` of `app`, and then we have the only script that we're going to include is this `bundle.js` file.

### index.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React Github Notetaker</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```

Eventually what's going to happen is we want to take all of our code and all of our components, we want to put them through a process that's going to **transpile** our **JSX** into **normal JavaScript**, and then we want to spit all of that out in one file called `bundle.js` inside of our public folder. To do that, what we're going to do is we're going to use this very nice tool called **webpack**.

So I'm going to create a `webpack.config.js` file, and if you haven't used webpack before, what you'll need to do is head over to your terminal and run `npm install webpack -g`, and what that's going to do is it's going to save webpack as a **global module** on your computer, but since I've already done that, we don't really need to do that.

### Terminal
``` Bash
touch webpack.config.js
npm install webpack -g
```

Heading back to our `webpack.config` file, we are going to export an object that has all of our webpack configuration stuff. This is going to make a lot of sense as we start going through it.

The very first thing we want to do is we need to tell webpack where our **root component** is. Because if you think about React, and we'll talk a lot more about this, but React is basically composed of different components and there's always **one root component** that's going to **render** all of its **children components**. So we're pointing webpack to that root component so that it knows where to start processing all of our JSX.

The next thing we're going to need to do is we want to tell webpack where after it's done transpiling everything, and combining it all into one file, where to puke out that new file. So what we're going to say is once you're done compiling this, or transpiling this component and all of the children components, we want you to take that new code and throw it into `bundle.js` in the `public` folder. Then the last thing we're going to do is we need to tell it what to actually do with the main JS code and all of its children components.

What we're going to do, is we're going to use a loader, and this loader, it's the **Babel loader** which we downloaded earlier. Now we need to tell Babel exactly what transformation we'd like it to do to our code. If you remember earlier we downloaded a bunch of npm packages related to Babel. What we're going to do now is go ahead and create a `presets` property on this `query` object. **Presets** is all the **transformations** that **Babel** is going to do to our **code**.

So one preset we installed earlier was the `React` preset, then the other one which we're not going to use initially but we're going to use later on in this lesson is called `ES2015`, basically that's going to allow us to write **ES6** code.

### webpack.config.js
``` javascript
module.exports = {
  entry: "./app/components/Main.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
```

Now what we need to do, is let's go ahead and create our very first **component**. Let's make a new folder called `app` which is where all of our application code will live, and then let's make a new folder called `components` which all of our components will live in, and now let's go ahead and make a new file called `main.js`.

### Terminal
``` Bash
mkdir app
cd app/
mkdir components
cd components/
touch Main.js
```

Now up to this point what's going to happen is when we create this `main.js` component, you'll notice here that's just this entry. **Webpack** is going to say, "Hey, I have this `main.js` component, I'm going to take this component, I'm going to run it through these **transformations**, and then I'm going to **spit** it out in this `public/bundle.js` file." The very first thing is we're going to `require` React and we're able to do this because earlier we npm installed React, so now if we require React we have that.

Then I'm going to create a new variable called `main`, and I'm going to set it equal to `react.createClass`. What `react.createClass` does is it creates a **React component** for us, so there's a few properties you can pass in. The one that we're going to talk about in this video is called `render`. What render does is it specifies what the **UI** looks like for this specific element. So we're going to have something very basic that just says, `Hello World`.

### Main.js
``` javascript
  var React = require('react');

  var Main = React.createClass({
    render: function(){
      return(
        <div>
          Hello World
        </div>
      )
    }
  });
```

So when this component gets rendered to the view, and eventually we'll do something like this to render it. When this gets rendered to the view it's going to show `Hello World`. Now we need to render this main component to the view. If you remember earlier we npm installed this thing called `ReactDOM`. What's cool about React is you're able to do things like server-side rendering. So what ReactDOM does, it says, "Hey React, we are going to render this component on the client with React DOM and not on the server."

Now what we need to do is we're going to say `react-dom.render`, we need to then give it our **main component**, our main parent component that we're rendering, and we need to tell it where to **render** to. If you'll remember earlier we create this guy, this div with an id of apps, so all we're going to do is say `document.getElementByID` and then select apps, and then what that will do is it will go ahead and grab this element and render the main component to it.

### Main.js
``` javascript
  var React = require('react');
  var ReactDOM = require('react-dom');

  var Main = React.createClass({
    render: function(){
      return(
        <div>
          Hello World
        </div>
      )
    }
  });

  ReactDOM.render(<Main />, document.getElementByID('app'))
```

Now head over to your terminal and go ahead and run webpack, `webpack -w`, so it looks like everything's good.

### Terminal
``` Bash
webpack -w
```

 Now let's go ahead and open up this `index.html` file on the browser and what we should see is `Hello World`.

 ![Hello World](./images/02-finish.png)
