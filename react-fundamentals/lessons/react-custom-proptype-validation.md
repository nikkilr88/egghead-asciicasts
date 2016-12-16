In this example, our `<Title>` component is expecting a `prop` of `text` which is not being passed in at its usage. We have a `PropType` setup for our component, which is expecting the text prop to be a `PropType` of string.
#### App.js
``` javascript
import React from 'react';

class App extends React.Component {
  render() {
    return <Title />
  }
}

const Title = (props) => <h1>Title: {props.text}</h1>

Title.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default App
```
We can tag on `isRequired` in order to get our component to throw an error that the prop has not been provided, but that's about the extent of the built in validation that we can achieve.

![Prop isRequired](../images/react-custom-proptype-validation-prop-isRequired.png)

If we want to achieve further validation, we can instead of returning a `React.PropTypes`, we can return a custom function. This function is going to take in `props`, which is all the props that our components received, `propName`, which is the name for this particular prop, as well as our component.

``` javascript
Title.propTypes = {
  text(props, propName, component){
  }
}
```
From there, if we wanted to achieve the required functionality, we can't just type on `isRequired`, that's not going to work.

To achieve the exact same functionality there, we can say, "if not `propName in props`," which would mean that the propName has not been provided, we can return a `new Error`, we can just say, `missing propName`. We can see that we're missing text, which is the `propName`.

``` javascript
text(props, propName, component){
   if(!(propName in props)){
     return new Error(`missing ${propName}`)
   } 
  }
```
Now, if we provide that `text="The Text"`, we can see we've gotten past that validation. If we want to validate further, let's say we're going to have a `length` required, we can say if `props[propName]`, that will get us the value for the text prop that was passed in. We'll say, if it's `length` is `< 6`, we're going to return a `new Error`, we will say `propName was too short`.

``` javascript
text(props, propName, component){
   if(!(propName in props)){
     return new Error(`missing ${propName}`)
   } 
   if(props[propName].length < 6){
     return new Error(`${propName} was too short`)
   }
  }
```
Save that, and we'll strip this guy down to just five characters. We should see our error message, that the text was too short, and if we go ahead and increase that to six or greater, our custom validation is passed.