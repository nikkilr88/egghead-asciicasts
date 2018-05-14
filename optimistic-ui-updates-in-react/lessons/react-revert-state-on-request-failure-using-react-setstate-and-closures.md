Instructor: [00:00] We have our app rendering this list of tweets. When we click on this heart icon, what happens is that we immediately have made our state.

[00:09] We toggle the heart and increment or decrement this like counter. However, if we look at this failure case here,  we update our state since we've assumed success but have yet to handle the failure. 

[00:23] We need to do something more than just logging out to the console. Immediately on clicking the icon, we're invoking `setState` using our `setState` updater factory here, which accepts the `tweetId` and the `newLiked` status. We can reuse that right here in our error handler. Rather than toggling this `isLiked` status, we can make use of the status it was at the time it was clicked.

```javascript
likeTweetRequest(tweetId, true)
      .then(() => {
        console.log(`then: ${tweetId}`);
      })
      .catch(() => {
        console.error(`catch: ${tweetId}`);
        this.setState(setTweetLiked(tweetId, isLiked));
      });
```

[00:51] We can go ahead and restore it to that. Now if we click on this failure case, we'll see that it updates, and at the time it fails, it reverts.