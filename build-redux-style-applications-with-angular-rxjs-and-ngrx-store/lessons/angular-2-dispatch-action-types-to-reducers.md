Currently the way this is set up is you have these magic strings, `hour` and `second` in our `app.ts`, which end up here in `hour` and `second` in our `reducers.ts`. What we want to do is extract those so that they're assigned to constants that you can import.

We'll start in our `reducers.ts`. You could actually put these anywhere, but for now since they're closely related to our reducers I'll move them here. I'll say `const HOUR = 'HOUR';` , and `const second` is all upper-case `SECOND`. We need to `export` both of those so that we can export them into our `app.ts` file.

####reducers.ts
```javascript
export const HOUR = 'HOUR';
export const SECOND = 'SECOND';
```

Then instead of `second` in our `case`, we're going to say `SECOND` and the same for `HOUR`. Then switch over to our `app.ts` file. We're going to go ahead and `import` from the `reducers.ts`, the `SECOND` and `HOUR`. Now we can just use those in here as well. We'll replace `hour` and `second` for `HOUR` and `SECOND`. Now when I save and hit Refresh, you can see everything works the same. It's incrementing by seconds and then when I click it's incrementing the hours.

```
Wednesday, March 23, 2016, 7:34:21 pm
Wednesday, March 23, 2016, 7:34:22 pm
Wednesday, March 23, 2016, 7:34:23 pm
Wednesday, March 23, 2016, 7:34:24 pm
Wednesday, March 23, 2016, 8:34:24 pm {clicked}
Wednesday, March 23, 2016, 9:34:24 pm {clicked}
```
