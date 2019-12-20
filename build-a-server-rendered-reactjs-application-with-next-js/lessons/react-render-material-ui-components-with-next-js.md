Instructor: [00:01] Inside our `root` directory, I have this `components` folder which is just going to hold all our reusable components. In here, I'm going to create this `header.js` file which as its name suggests, it's going to hold our header component.

[00:17] Inside here, I'm just going to `import` the `AppBar` component from the `'material-ui/AppBar'` library. 

#### header.js
```javascript
import AppBar from 'material-ui/AppBar';
```

As you could see, I'm just using this `Header` constant and passing in our `title` prop. Immediately follow this, I'm just returning the `<AppBar>` component that we imported in from Material-UI. I'm giving the app bar's `title` prop, the value of `title`, should renders that string that were passing in above.

```html
const Header = ({ title = 'Next.js blogging application'}) =>
    <AppBar title={title} />
```

[00:44] The last thing I'm going to do is set the `showMenuIconButton` to `{false}`, so it doesn't render the icon button for us. 

```html
const Header = ({ title = 'Next.js blogging application'}) =>
    <AppBar title={title} showMenuIconButton={false} />
```

Now that, our header is ready to go. We can `export` this as the `default` export and use inside our `index.js` file. 

```javascript
export default Header;
```

Inside `index.js`, we firstly `import` the `Header` that we just created.

#### index.js
```javascript
import Header from '../components/header';
```

[01:08] Once imported, I'm just going to place this right below our opening `<div>`. 

```html
const Index = ({ title = 'Hello from next.js' }) =>
    <div>
    <Header />
        <h2>{title</h2>
    </div>;
```

In order for all this to work, we also need to `import` our higher order component from the `shared/MUI` folder. 

```javascript
import withMui from '../shared/MUI/withMUI';
```

Once imported, we then need to pass in our `Index` constant to this `withMUI` function in order inject Material-UI in your application.

```javascript
export default withMui(Index);
```

[01:34] If we go back to our web page and refresh, we should see everything, and looks like I seem beginning error here. 

![error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545266983/transcript-images/react-render-material-ui-components-with-next-js-error.jpg)

Specifically, we see that the `ComposeComponent.getInitialProps` is not a function. By taking a look at this error message, we see that it's telling us exactly where this error is happening.

[01:56] Even if I wasn't sure where this is going on, Next would really provide us with helpful error messages here. To fix this issue, I'm just going to comment out this `subProps` and `props` defined within a higher order component which is the reason for this error. 

```javascript
const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      // const subProps = await ComposedComponent.getInitialProps(ctx)

      return {
        // ...subProps,
        userAgent
      };
    }
    ...
    }
}
```

This is happening, because our index constant isn't utilizing Next `getInitialProps` lifecycle hook.

[02:22] Now that, we have our sub props come in to route them, we can return the page and we'll see our app bar being rendered for us. 

![app bar rendered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545266982/transcript-images/react-render-material-ui-components-with-next-js-app-bar-rendered.jpg)

Now, we also know there are app bar has a height of `50` as specify within our `getMuiTheme` function. Our application is set up to use any and all of the components from Material-UI library.