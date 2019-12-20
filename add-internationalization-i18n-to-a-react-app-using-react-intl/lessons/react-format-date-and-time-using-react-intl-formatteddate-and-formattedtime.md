[00:01] In the `bookDetail` component, let's import `formattedDate` and `formattedTime` from React Intl. We'll use these components to render the date of the user's review. 

```javascript
import {
    FormattedMessage,
    FormattedHTMLMessage,
    FormattedDate,
    FormattedTime,
} from 'react-intl';
```

If we take a look at our sample `book.json` data, at the date for each person's review, you'll notice that it's one long number.

```javascript
  "date": 1491111687199,
```  

[00:25] This is an instance of a date represented in a Unix timestamp in milliseconds. Let's get rid of this date that we're displaying currently, and we'll add a `formattedDate` component.

[00:39] We'll provide a `value` prop, into that we'll create a new `Date` and pass it `review.date`. So `formattedDate` takes a number of arguments, but we'll look at just a few. We'll set a `year` prop to `numeric`, I'll just go ahead and set the rest as well, so I'll say `month='numeric'`, and `day='numeric'`.

```HTML
<FormattedDate
  value={new Date(review.date)}
  year="numeric"
  month="numeric"
  day="numeric" /><br />
               
```                

[01:07] Notice that our dates are formatted in the correct locale format. To change that date format, let's change some of these props. We'll say `month` is no longer `numeric`, but we'll say `long`. Now we get the long month name in each of the different languages, but for this app I'll change everything to `2-digit`.

```HTML
<FormattedDate
  value={new Date(review.date)}
  year='2-digit'
  month='2-digit'
  day='2-digit' /><br />
```              

[01:28] Now let's take a look at `formattedTime`. Recall that `review.date` was an instance of a date that included the time down to the millisecond, so using that information React Intl can render all of the date information that we provide it.

[01:49] I'll comment out `formattedDate` and I'll add `formattedTime`. Again, I'll provide a prop of value and pass a new date constructor with `review.date` as the value. By adding the same two-digit props for year, month, and day, we get a nice formatted date with the time added in each of the different languages.

```HTML
<FormattedTime
  value={new Date(review.date)}
  year='2-digit'
  month='2-digit'
  day='2-digit' /><br />
```
