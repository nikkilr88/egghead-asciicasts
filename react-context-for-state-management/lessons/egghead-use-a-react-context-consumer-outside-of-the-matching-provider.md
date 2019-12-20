Instructor: [00:00] In this app, we've created a context to pass around a color. The `FancyButton` component consumes that `color`, and uses that `color` as the class name.

#### index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Color = React.createContext();

const FancyButton = props => (
  <Color.Consumer>
    {color => (
      <button className={'fancy-btn ${color}'}`} {...props}>
        Click Me
      </button>
    )}    
);
```

Then down in the `App` component, we can see we're rendering the `FancyButton` once outside of any context, and then three more times. One's `red`, one's `green`, and one's `blue`.

```js
const App = () => (
  <div>
    <FancyButton />
    <Color.Provider value="red">
      <FancyButton />
    </Color.Provider>
    <Color.Provider value="green">
      <FancyButton />
    </Color.Provider>
    <Color.Provider value="blue">
      <FancyButton />
    </Color.Provider>
  </div>
);
```

[00:19] If we look over to the elements inspector, you can see that these three have a red, green, and blue class, but this top one has undefined as a class. That's because when this context was created, it wasn't given a default value. The default is undefined.

![elements in devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543969651/transcript-images/egghead-use-a-react-context-consumer-outside-of-the-matching-provider-elements-in-devtools.png)

[00:35] Still, though, even though there's no value provided, the consumer can render out successfully, and the `color` just ends up undefined. We can provide a default value at creation time. From then on, if a consumer is used outside the matching provider, it'll receive a default.

```js
const Color = React.createContext('black');
```

[00:51] You might have a different situation, where it doesn't make sense to ever use a consumer outside of its matching provider. In this case, you can leave the default as undefined. Then inside the `Color.Consumer`, we can change this `color` function to return the component.

```js
const Color = React.createContext();
```

[01:04] Before we return, we can check `if(typeof color === 'undefined')`. If so, throw an error that this component must be used inside a matching provider. 

```js
<Color.Consumer>
  {color => {
    if (typeof color === 'undefined') {
      throw Error(
        'FancyButton requries a Color Provider'
      );  
    }
    return (  
```

Now, if we save this, we get an error. We can go and fix our code by either removing the button or moving it inside a provider.

```js
const App = () => (
  <div>
    <Color.Provider value="red">
      <FancyButton /> 
      <FancyButton />
    </Color.Provider>
    <Color.Provider value="green">
      <FancyButton />
    </Color.Provider>
    <Color.Provider value="blue">
      <FancyButton />
    </Color.Provider>
  </div>
);
```
