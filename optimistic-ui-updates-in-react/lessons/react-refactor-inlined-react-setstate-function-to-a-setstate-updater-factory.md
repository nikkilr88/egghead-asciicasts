Instructor: [00:03] Instead of inlining this whole `setState` function here, what we can do is, we're going to write a function. This is going to be our `setState` updater function. We will give it a descriptive name, which is going to be, `setTweetLiked`. It's going to need to know the `tweetId` and also the `newLiked`.

[00:23] Shall we be transitioning to liked or transitioning to unliked? This is going to `return`, essentially, what we had in `setState`. Now, rather than looking up the current state, we will just transition to using the `newLiked`. We'll assume that when we invoke this, we know what we want. We'll update this usages of `isLiked` to `newLiked`.

```javascript
function setTweetLiked(tweetId, newLiked) {
  return state => {
    return {
      tweets: state.tweets.map(
        tweet =>
          tweet.id === tweetId
            ? {...tweet, likes: tweet.likes + (!newLiked ? -1 : 1)}
            : tweet
      ),
      likedTweets: !newLiked
        ? state.likedTweets.filter(id => id !== tweetId)
        : [...state.likedTweets, tweetId],
    };
  };
}
```

[00:50] We'll be flipping that logic around, since we're assuming that the consumer of this is going to handle the toggling logic. Now to plug this in, we can invoke it in `onClickLike`, `setTweetLiked`. The arguments that it requires is `tweetId` and the `newLiked`, which is going to be the opposite of the current liked, which we know we can look up by currying includes on our liked tweets.

```javascript
class App extends React.Component {
  state = initialState;

  onClickLike = tweetId => {
    console.log(`Clicked like: ${tweetId}`);

    console.log(`Update state: ${tweetId}`);

    const isLiked = this.state.likedTweets.includes(tweetId);
    this.setState(setTweetLiked(tweetId, !isLiked));

    likeTweetRequest(tweetId, true)
      .then(() => {
        console.log(`then: ${tweetId}`);
      })
      .catch(() => {
        console.error(`catch: ${tweetId}`);
      });
  };
  ...
}
```

[01:18] Now when we click this, we can see that the number is updating as well as the heart is updating appropriately. We have yet to handle the failure case.