[00:01] Let's start by adding React Intl to our project by running `yarn add --react-intl`. 

```
$ yarn react-intl
```

With it installed, let's start to set up a messages file. We'll call it `messages.js`. This is going to hold all of the messages in our app. We'll export an object into add objects with keys that correspond to the languages that our app will support.

[00:31] I'll add `en-US`. That's just going to be an empty object for now. I'll add `es-ES` and I'll add `fr-FR`.

```javascript
export default {
  'en.US': {},
  'es-ES': {},
  'fr-FR': {}
    }
```

Next, let's switch to the entry point of the app, which is source: `index.js`. I'm going to import messages from the messages file that we just created.

```javascript
import messages from './messages';
```

[00:58] Now, we can import what we need from React Intl. I'll say, `import from react-intl`. We'll pull on a couple of modules, the first being `addLocaleData`. `addLocaleData` gives React Intl the ability to format plural in relative time, according to the user's language.

[01:23] We'll also import `Intl Provider` . `Intl Provider` is a required component to use React Intl. It requires that a single element be passed as a child. We'll look at that in just a minute. Next, we'll import each language's locale file that we want to support. I'll import `en` from React Intl locale data en. I'll import `es` from es and `fr` from fr.

```javascript
import { addLocaleData, IntlProvider } from 'react-intl';

  import en from 'react-intl/locale-data/en';
  import es from 'react-intl/locale-data/es';
  import fr from 'react-intl/locale-data/fr';
```

[01:51] With all the imports added, we can instantiate `addLocaleData`. The argument will pass as an array. Inside the array, we'll spread each of these locales that we imported from above. We'll spread `en` and then we'll spread `es` and finally `fr`.

```javascript
addLocaleData([...en, ...es, ...fr]);
```

[02:13] This will end up passing a single array to `addLocaleData` that holds all of the locale information for each language, ready for React Intl to use for translation. Next, we'll grab the user's locale. To do this, we're going to interrogate the navigator object from the browser.

[02:32] We'll set locale by saying `let locale =` . We're going to check for `navigator.languages`. If that exists, we're going to grab `navigator.languages`. We're going to get the first value that's in that languages array. This is typically the preferred language of the user.

[02:58] If the user is in a browser that doesn't support `navigator.languages`, we can check for `navigator.language`. If that doesn't exist, we can check for `navigator.userlanguage`. This is typical in Internet Explorer. If none of those exist, we'll just fall back and use `en-US` .

```javascript
let locale = 
  (navigator.language && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en-US';
```

[03:22] Now, let's wrap our app component with the Intl Provider component. We'll provide it two props, the first being `locale`. We'll provide it a value of `locale`, which tells React Intl to use the locale we just defined above.

[03:42] Finally, we need to tell it what messages to use. To do that, let's pass a `messages` prop. We'll give it a value of `messages`. That's going to correspond to our messages file that we imported above. If you remember, we set up objects corresponding to the locales that we want to support.

[04:03] We want to go inside of that `messages` object and we want to search for `locale`. We're trying to match up the `locale` we set here with the object that will hold all the messages for that locale in our messages file. If it isn't found, it will default to the English [`en-US`].

```javascript
ReactDOM.render(
  <IntlProvider locale=(locale) messages={messages[locale]}>
  <App />
  </IntlProvider> document.getElementById('root')
    );
```
