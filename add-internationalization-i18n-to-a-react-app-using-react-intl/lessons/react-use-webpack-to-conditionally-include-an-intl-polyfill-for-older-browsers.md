[00:01] Let's start this lesson out by adding an `intl-polyfill`. In our terminal, I'll run yarn add intl as a dependency. 

```
$ yarn add intl
```

With it installed, we need to set up our app to conditionally include it. Inside the entry point of our app, which is in `sourceindex.js`, let's go to the end of our import statements.

[00:23] We'll start by writing an if statement and we'll check if the false value of `window.intl`. This is checking if `window.intl` is falsity, which means it doesn't exist in this browser. Now we'll use Webpack's `require.ensure` syntax by saying `require.ensure`. Then we'll open that up.

[00:47] The first argument we'll pass is an array. Inside of that array, we'll pass a string of `intl`, and then we're going to pass string paths to the `intl-polyfill`'s locale data for each of the locales that our app supports. That looks like this. We're going to go into the intl folder, into locale data, into the JSON p folder. We're going to grab `en.js`. We'll grab `es.js` and `fr.js`.
 
[01:19] The second argument to the require.ensure method is an anonymous function. We'll pass require into that function. Now we'll actually use the require syntax to import all of those files. What this is doing is saying, if `window.intl` doesn't exist, we're going to make sure that the `intl-polyfill` is in this project and all of these locale files exist.

[01:55] Once all of that is true, we're going to add all of those to the require stack in this file, which means that the polyfill will be loaded, and all these locale data files will be, as well.

```javascript
if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/fr.js',
    'intl/locale-data/jsonp/es.js'
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/fr.js');
    require('intl/locale-data/jsonp/es.js');
```

[02:07] The next thing we need to do is wrap our business logic in a function. Let's add a function called `runApp`. We'll remove all of this code inside of that function. 

```javascript
function runApp() {
  addLocaleData([...en, ...fr, ...es]);

  let locale = (navigator.languages && navigator.languages[0])
    || navigator.language
    || navigator.userLanguage
    || 'en-US';

  ReactDOM.render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
      <App />
    </IntlProvider>,
    document.getElementById('root')
  );
}
```

Of course, now we need to execute that `runApp` function. At the end of the if statement, once our `require.ensure` method runs, we'll instantiate `runApp`.

[02:34] The reason we do this is so that when we run add locale data here, browsers that don't support `window.intl` will have all of the necessary logic, because we conditionally required it using `require.ensur`e. We're not penalizing browsers that do understand `window.intl` by not adding all these extra polyfill files.

[02:57] One final thing we'll need to do is, if browsers don't need this polyfill information because they support intl, we'll add an else statement and just execute `runApp` immediately.

```javascript
if (!window.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/fr.js',
    'intl/locale-data/jsonp/es.js'
  ], (require) => {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    require('intl/locale-data/jsonp/fr.js');
    require('intl/locale-data/jsonp/es.js');

    runApp();
  })
} else {
  runApp();
}
```