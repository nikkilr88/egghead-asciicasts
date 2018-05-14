Instructor: [00:00] Inside the `shared` folder, I've a `withMUI.js` file which is going to hold our Material-UI higher order component. 

####withMUI.js
```javascript
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'; 
import injectTapEventPlugin from 'react-tap-event-plugin';
import Head from 'next/head';
import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_TWO,
  PRIMARY_COLOR_THREE,
  ACCENT_COLOR_ONE,
  ACCENT_COLOR_TWO,
  ACCENT_COLOR_THREE
} from './theme';

try {
  injectTapEventPlugin();
} catch (e) {
  // Can only be called once per application lifecycle
}

const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

    render() {
      return (

          )
      }
   }
      return HOC;
}

export default withMaterialUI;
```

A higher order component, or HOC is a commonly referred to, is simply a component that takes another component, and injects with a specific piece of functionality.

[00:22] In this instance, we're going to use this `getMuiTheme` function to create a custom theme for us based on the color values that we have within this `theme.js` file. When implementing Material-UI from within a server rendered environment, we need to make sure that our application is loading the same code on the server as well as the client.

```javascript
const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      const subProps = await ComposedComponent.getInitialProps(ctx)

    }

    render() {
      return (

          )
      }
   }
      return HOC;
}
```

[00:46] To do this, we're going to use Next's `getInitialProps` lifecycle hook. To supply us with a userAgent from the environment that the application is being rendered within. Since we only receive the request object in the server, we can create a ternary expression to evaluate this, `req ? req.headers['user-agent'] : navigator.userAgent;`.

[01:05] On the server, we'll receive the `user-agent` inside of our headers. While on the client, we'll get it from this `navigator` object. The last thing we do is create a `subProps` constant. This is going to allow us to use Next's `getInitialProps` lifecycle hook from within the components that we're going to pass in your `HOC`.

[01:25] You'll notice that we're leveraging `async` `await` functions, so we can `await` our composed component props like so, `const subProps = await ComposedComponent.getInitialProps(ctx)`. Now that our props are configure, we can `return` the `userAgent` as well as our `...subProps` using this spread operator, and continue on a configure I think.

```javascript
const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      const subProps = await ComposedComponent.getInitialProps(ctx)

      return {
        ...subProps,
        userAgent
      };
    }

    render() {
      return (

          )
      }
   }
      return HOC;
}
```

[01:46] In this code snipit, we see the `getMuiTheme` function that we imported above. This is where we hold the configuration for a theme. 

```javascript
const withMaterialUI = ComposedComponent => {
  class HOC extends Component {

    static async getInitialProps(ctx) {
      const { req } = ctx;
      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
      const subProps = await ComposedComponent.getInitialProps(ctx)

      return {
        ...subProps,
        userAgent
      };
    }

    render() {
      const { userAgent } = this.props;
      const Lato = 'lato, sans-serif';
      const muiTheme = getMuiTheme(
        {
          fontFamily: Lato,
          palette: {
            primary1Color: PRIMARY_COLOR,
            primary2Color: PRIMARY_COLOR_TWO,
            primary3Color: PRIMARY_COLOR_THREE,
            accent1Color: ACCENT_COLOR_ONE,
            accent2Color: ACCENT_COLOR_TWO,
            accent3Color: ACCENT_COLOR_THREE
          },
        },
      );

      return (

          )
      }
   }
      return HOC;
}
```

On top of our configuration, we see that were setting the default `fontFamily` to `lato`. Below this, we're supplying the color variables that we saw inside of `theme.js`, so that a theme can be made for us according to our liking.

[02:12] We can also do things like specify the height of the app bar component like so. 

```javascript
appBar: {
    height: 50
}
```

As a result of this, every `appBar` that we render within our application is going to have a `height` of `50`. Now the last thing we need to do, and arguably the most important, is pass in the `userAgent` const that were getting from our `props`.

```javascript
    render() {
      const { userAgent } = this.props;
      const Lato = 'lato, sans-serif';
      const muiTheme = getMuiTheme(
        {
          fontFamily: Lato,
          palette: {
            primary1Color: PRIMARY_COLOR,
            primary2Color: PRIMARY_COLOR_TWO,
            primary3Color: PRIMARY_COLOR_THREE,
            accent1Color: ACCENT_COLOR_ONE,
            accent2Color: ACCENT_COLOR_TWO,
            accent3Color: ACCENT_COLOR_THREE
          },
          appBar: {
            height: 50
          }
        },
        {
          userAgent
        }
      );
    }
```

[02:34] Now that our theme is configured, we can use the `<MuiThemeProvider>` component to wrap our compose component in our `muiTheme`. I taking a look at this code, we see that we're using the `<Head>` component which is provided for us by Next.

```html
    return (
      <div>
        <Head>
          <title>Nextjs Blogger</title>
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' />
        </Head>
        <MuiThemeProvider muiTheme={muiTheme}>
         <ComposedComponent {...this.props} />
        </MuiThemeProvider>
      </div>
      )
  }
```

[02:50] This allows us to add `<title>` tags to our page as well as the `<link>` tag, which is being used to import the `lato` font from the Google Fonts API. Directly below our closing `<head>` tag, we see the `MuiThemeProvider` component wrapping around our `ComposedComponent>`. This is where we pass in the `muiTheme` constant that we just configured above.

[03:15] Now, the last thing we need to do is just pass in the `props` to our composed component, and now we're all ready to use this within our application.