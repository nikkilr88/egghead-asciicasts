[00:01] Let's start by importing `formattedRelative` from React Intl, and we'll use this component to render a human-readable representation of a user's review. Below the `formattedTime` component, let's add a `formattedRelative` component. This also takes a value prop, and we're going to pass it the same date as `formattedTime`.               

[00:26] We'll say new date, that's going to be `review.date`, and I'll also add a BR tag here. With that one component, that's all we need to get the human-readable string interpretation of that date in every different language.

```HTML
<FormattedRelative
  value={new Date(review.date)}
/>
``` 

[00:44] By default, this component will automatically re-render at a maximum of every 10 seconds. Let's change the date of this first review so that we can see that happen in real time.

[00:56] Now we can add an `updateInterval` prop, and we'll provide a value of 1,000, which is 1,000 milliseconds, or one second. I'll also set the value to new date, so you can see this component being re-rendered.

```HTML
<FormattedRelative
  value={new Date()}
  updateInterval={1000}
/>
```

[01:12] Now you can see that every second this component is updating with the time offset from the value that we provided. You wouldn't want to use `updateInterval` of one second in production because it would cause unnecessary re-renders. If we go back to what we had, let's say this review was set two minutes ago.

[01:41] If you set your interval to one second, it's going to re-render that component, but it's got nothing useful to show, because it's only going to say two minutes ago, even though every second has ticked past, so be careful using that in production.

[01:56] Finally, let's add a prop of `style`, and we'll provide it a value of numeric. This ensures that a value is always displayed here, as in 1 month ago, instead of saying last month.

```HTML
<FormattedRelative
  value={new Date(review.date)}
  style="numeric"
/>
