Hey, guys, in this video, we are going to take a look at JSX as it relates to React. I'm going to create a stateless function component here. I'm just going to return a simple `<div>`. You could see on the right here, the transpiler has converted that to `React.createElement` and passed in `div` as a string.

``` javascript
/* add your jsx here*/        |       "use strict";
const App = (props) => {      |          
  return (                    |       var App = function App(props) {       
    <div></div>               |         return React.createElement("div", null);
  )                           |       };
}                             |  
```

Now, that is because this is not a custom component. **All custom React components would start with a capital letter.** Now, it's passing in `App` as a variable rather than a string. We can also self-close both normal HTML tags as well as custom components. You can see in each of those cases our code is working just fine.

``` javascript
/* add your jsx here*/        |       "use strict";
const App = (props) => {      |       var App = function App(props) {       
  return (                    |         return React.createElement(App, null);            
    <App/>                    |       };       
  )                           |       
}                             |  
```

I know we've talked about this before, but just to illustrate the need for a parent node, you can see that we are getting this error here, **Adjacent JSX Elements must be wrapped in an enclosing tag**. That would be because we're trying to `return` to functions. That's not really going to work very well.

![Adjacent JSX elements error](../images/jsx-deep-dive-adjacent-jsx-elements.png)

If you wrap this guy in a `<div>`, now everything is working just fine. We're going to strip this down. We're going to make this an `<a>` tag. Now, we can see that in a `React.createElement`, our first element or first argument was this string of `div`.

``` javascript
const App = (props) => {
  return (
    <div>
      <App />
      <App />
    </div>
  )
}
```

This next argument is its props. Finally, we have another component here, another `React.createElement` call as its children.

If we want to get a look at the `props`, I'm going to go ahead and set an `href` here to `#`. We can see that the `href` is a key and its value is a string of `#`. 


``` javascript
/* add your jsx here*/        |       "use strict";
const App = (props) => {      |       var App = function App(props) {       
  return (                    |         return React.createElement(
    <div>                     |           "div",
      <a href="#"></a>        |           null,
    </div>                    |           React.createElement("a", { href: "#"})       
  )                           |         );  
}                             |       }; 
```
We can have custom properties attached to our components. However, if we want them to render in the browser, they need to have a dash in them. By better convention, it should begin with data-.

If I say, `notrendered="x"`, this property is passed into our component. However, it won't be rendered by the browser unless I add `data-` to it or arbitrarily add a dash to the prop name.

Now, when we want to interpolate something, we simply use curly brackets. I'm going to say `onClick` is equal to a method called `update`. You can see that rather than being a string in this case, it is in fact passed in as a variable since we did interpolate that.

``` javascript
/* add your jsx here*/          |       "use strict";
const App = (props) => {        |       var App = function App(props) {
  return (                      |         return React.createElement(
    <div>                       |           "div",
      <a href="#">              |           null,
         notrendered="x"        |           React.createElement("a", { href: "#"
         onClick={update}></a>  |             notrendered: "x",
    </div>                      |             onClick: update })                 
  )                             |          );  
}                               |        };
```
Also, in interpolation, we can create a comment. `This is a comment`. You can see that the Babel transpiler actually chooses to place the comment at the end. However, that's just an implementation detail. We can add comments right there inside of our JSX.

We can see that the third argument passed to the first `React.createElement` is our `<a>` tag, which is also a `React.createElement`. At the moment, it has no third argument, so we'll just add that. Rather than being another element, it's just going to read, `this is the text`. You can see that the third argument has become the string of this is the text and this is essentially `this.props.children`.


``` javascript
/* add your jsx here*/          |       "use strict";
const App = (props) => {        |       var App = function App(props) {
  return (                      |         return React.createElement(
    <div>                       |           "div",
      <a href="#">              |           null,
         notrendered="x"        |           React.createElement("a", { href: "#"
         onClick={update}>      |             notrendered: "x",
      this is the text          |             onClick: update }, 
      </a>                      |             "this is the text"
    </div>                      |           )                            
  )                             |          );  
}                               |        };
```

The next thing we'll take a look at is the fact that JSX doesn't really support `if` statements very well, so you need to use a ternary expression. I'm going to say, `i > 1 ?'More than one' : 'one'`. That's going to work just fine. We could also strip this down a bit and just do a double and. Get rid of the `false` value and that will work just fine as well.

``` javascript
/* add your jsx here*/                |       "use strict";
const App = (props) => {              |       var App = function App(props) {
  return (                            |         return React.createElement(
    <div>                             |           "div",
      <a href="#">                    |           null,
         notrendered="x"              |           React.createElement("a", { href: "#"
         onClick={update}>            |             notrendered: "x",
      this is the text                |             onClick: update }, 
      {i>1 ? 'More than one' : 'one'} |             "this is the text",
      </a>                            |             i > 1 ? 'More than one' : 'one'
    </div>                            |           )                            
  )                                   |          );  
}                                     |        };
```
One more thing we'll take a look at is how inline styles work in React. I'm going to create a variable here called `myStyle`. Set that to an object. I'm going to give that a `backgroundColor` using JavaScript notation. I'll just set that to black. We'll also give it a `height`.

In the instance that you might need a pixel unit, React will take care of that for you. You don't need to add the `px` onto that. When we want to add that to our component, we just say `style=` and then we interpolate our `style` variable. You can see that that has become part of the props of this `div` component.

``` javascript
/* add your jsx here*/                |       "use strict";
const App = (props) => {              |       var App = function App(props) {
  var myStyle={                       |         var myStyle={
    backgroundColor: '#000',          |           backgroundColor: '#000',
    height: 10                        |           height: 10
  }                                   |         };
  return (                            |         return React.createElement(
<div style={myStyle}>                 |           "div",
      <a href="#">                    |           { style: myStyle },
         notrendered="x"              |           React.createElement("a", { href: "#"
         onClick={update}>            |             notrendered: "x",
      this is the text                |             onClick: update }, 
      {i>1 ? 'More than one' : 'one'} |             "this is the text",
      </a>                            |             i > 1 ? 'More than one' : 'one'
    </div>                            |           )                            
  )                                   |          );  
}                                     |        };
```