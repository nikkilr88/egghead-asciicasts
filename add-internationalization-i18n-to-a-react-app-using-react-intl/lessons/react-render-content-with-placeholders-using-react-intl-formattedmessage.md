[00:01] We'll start by adding some more strings to our `messages.js` file. Inside of the string, notice that I've added placeholders. These tokens will be replaced with content that we provide in the component when they're rendered.

```javascript
export default {
  'en-US': {
    detail: {
      author: 'by {author}',
      toggle: 'Toggle',
      purchase: 'Purchase this book from:', 
      reviewsHeading: 'Reviews',
      averageRating: 'Average Rating: {avg}',
      userRating: '{name} rated it: {rating} out of 5', 
    }
  },
  'es-ES': {
    detail: {
      toggle: 'Palanca',
      purchase: 'Compre este libro de:', 
      reviewsHeading: 'Comentarios',
    }
  },
  'fr-FR': {
    detail: { 
      toggle:'Basculer',
      purchase: 'Achetez ce livre à partir de:', 
      reviewsHeading: 'Avis',
    }
  }
}
```

[00:15] In our `bookDetail` component, let's replace the author heading here by adding a `formattedMessage` component. We'll add a prop of `id`, and that's going to be set to `detail.author`.

[00:37] Now I'll add a `values` prop which is where we'll be adding the `values` for the placeholders in the string we're translating. This prop accepts an object, so to it I'll add a key of `author` and I'll provide it a value of `book.author`, so the key `author` here corresponds directly to the placeholder we added in the messages file here.

```HTML
<h3>
  <FormattedMessage id="detail.author" values={{author: book.author}} />
</h3>
```

[01:07] Looking at the browser, you can see each language is now displaying the author heading in its own language. 

![author heading translation](../images/03_react-render-content-with-placeholders-using-react-intl-formattedmessage-author-heading-translation.png)

Let's replace this average rating heading next. First, what I want to do is extract this round function into a variable so it's a bit easier to read.

[01:25] I'll take all of this round here and let's move that up into a variable, we'll call it `const averageRating` equal to that method. 

```javascript
const avgRating = book.reviews.length ? round(meanBy(book.reviews, (r) => r.rating), 2);
```

Now we've got `averageRating` stored, we can get rid of this, and we can say `formattedMessage`, and that's an ID of `detail.averageRating`.

[01:53] We'll also give this a `values` prop, we'll give it a key of `avg` for average, and the value of `averageRating` which is the variable that we just set up here. 
```HTML
<h3>
  <FormattedMessage id="detail.averageRating" values={{ avg: avgRating}} /> ({book.reviews.length} Reviews) />
</h3>
```      

Now our average rating heading is translated as well.

![average rating change](../images/03_react-render-content-with-placeholders-using-react-intl-formattedmessage-author-heading-translation-average-rating-change.png)

[02:17] Let's look at one more. I want to replace a reviewer's name and rating, so once again, I'll add a `formattedMessage` component with an `id` prop of `detail.userRating`, along with a `values` prop -- remember that takes an object -- that's going to take a key of `name` as well as a key of `rating`.

[02:44] I'll start with `rating`, the value here is just going to be `review.rating`, but `name` is a little bit different. Notice here we've got that wrapped in a strong tag. If we just put in `review.name` like so, we would lose that bold formatting.

[03:03] Thankfully React Intl allows us to pass markup as a value, so we can actually just take this entire strong tag and set that to the value of the `name` prop here. Now I can get rid of that code, now I'll just add a `<br>` tag so we can see that definition clearly.

```HTML
<FormattedMessage id="detail.userRating" values={{ name: <strong>{review.name}</strong>, rating: review.rating }} /><br />
```

[03:23] Now, if you look at the browser you can see each person's name is still bold, but the rated it text is translated to the correct language.

![author name translation](../images/03_react-render-content-with-placeholders-using-react-intl-formattedmessage-author-heading-translation-author-name-translation.png)
