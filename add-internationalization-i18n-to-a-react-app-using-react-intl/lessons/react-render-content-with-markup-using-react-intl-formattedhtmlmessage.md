[00:01] Let's start by adding a string to our `messages` file that will tell the user that merchant links will open in the new window. Notice that I'm embedding markup directly in the string. I've also added a placeholder of `numMerchants`.

```JAVASCRIPT
window: '<small><em>All {numMerchants} links open in a new window.</em></small>',
```

[00:19] In our `bookDetail` component, let's import `formattedHTMLMessage` from React Intl. 

```JAVASCRIPT
import {
    FormattedMessage,
    FormattedHTMLMessage,
} from 'react-intl';
```

Since we're going to be displaying a message about opening links in the new window, let's first add a target blank to those merchant links.

```HTML
<a href={merchant.link} className="Merchant" target="_blank" key={merchant.name}>
</a>
```

[00:34] We'll just say `target='_blank'` and we'll go below those merchant links. Now let's add a `formattedHTMLMessage` component. We'll pass an `id` prop of `detail.window`, and a `values` prop of `numMerchants`, and that will be set to `book.merchants.length`.

[01:05] The link of this `books.merchants` array will be passed to `numMerchants`, which will replace the token in our `messages` file. 

```HTML
<FormattedHTMLMessage id="detail.window" values={{numMerchants: book.merchants.length}} />
```

Now you can see that we're displaying this text in each language, and it's formatted correctly as well.
