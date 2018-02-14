Instructor: [00:00] Here, I have a simple TypeScript application that renders the `<div>` `'Hello world'` To the DOM using `React` and `ReactDOM`. 

#### app.tsx
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Hello world</div>,
    document.getElementById('root')
);
```

We can easily move this `<div>` into a stateless component called `<App/>` by creating a function called `App` and returning the same JSX element.

```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => <div>Hello world</div>;

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

[00:24] Of course, one big advantage of components is that you get to use props that change the component behavior. For example, we can take the `{message}` as a prop by adding it as an argument and using it inside the function body. TypeScript tells us that this property needs to be provided, so we go ahead and provide it.

```javascript
const App = ({message}) => <div>{message}</div>;

ReactDOM.render(
    <App message="Hello world again"/>,
    document.getElementById('root')
);
```

[00:45] You can see that it works as expected. 

![Works as expected](../images/react-create-stateless-react-components-using-typescript-working-as-expected.png)

Although such simple functions work fine for stateless components, if you want to create high-quality types of components, it is recommended that you annotate such functions as `React.SFC<>`.

[01:04] The `React.SFC` interface takes a generic argument that allows you to easily provide the type annotation for the component props. You can see that the type specified over here flows through to the function arguments.

```javascript
const App: React.SFC<{ message: string }> = ({message}) => <div>{message}</div>;

ReactDOM.render(
    <App message="Hello world again"/>,
    document.getElementById('root')
);
```

[01:21] Of course, if you want, you can easily move out this inline prop type definition into an appropriately named type, for example, `AppProps`.

```javascript
type AppProps = { message: string }
const App: React.SFC<AppProps> = ({message}) => <div>{message}</div>;

ReactDOM.render(
    <App message="Hello world again"/>,
    document.getElementById('root')
);
```