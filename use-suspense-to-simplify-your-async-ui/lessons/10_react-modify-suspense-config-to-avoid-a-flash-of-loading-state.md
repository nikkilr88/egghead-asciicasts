Instructor: [00:00] We've really **improved the perceived performance of our application by not showing loading states when we don't need to and showing them when we do**. The way that we accomplish that is **we make a CSS transition that sets the opacity after 400 milliseconds**. If the request takes shorter than 400 milliseconds, then we don't see that opacity change at all.

[00:23] The problem is, for users who are sitting here at around 500 milliseconds for this request are going to get a flash of loading state, just like what we had before. **In our efforts to improve the experience for user with fast connections, we've made the experience a little worse for users with mediocre connections.**

[00:42] That's why the React suspense config API supports a way for you to tell React if this transition takes longer than X amount of milliseconds. I want you to keep the pending state around for a total of Y milliseconds because **if a user is going to see a pending state, it's better that that pending state is longer than just 50 or 100 milliseconds.**

[01:02] **This API is pretty experimental**. It's not even documented, so it is pretty likely to change and it's a little bit awkward. Here, we're going to specify in our config a `busyDelayMs`. If it takes slightly shorter than our CSS transition delay, so 300 milliseconds when our CSS transition delay is 400 milliseconds.

[01:23] If the transition takes longer than that, then we want to keep it around with a `busyMinDuration` at milliseconds of 700 milliseconds. If the transition takes at least 300 milliseconds, then I want the transition to be at least 700 milliseconds. That way we're showing the busy state for about 400 milliseconds between this.

```js
const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}
```

[01:42] These numbers aren't exact because React is doing a lot of guess work under the hood to give our users the best experience possible. This gives us a bit of control over that experience.

[01:52] If I save this, we're going to see Pikachu load and then when I go to Charizard, we're going to see that loading state happen for a little bit longer than it was before. Just long enough for it to be a better user experience.

[02:05] Let's compare that again if I get rid of those configuration options. You notice that we see just a flash of that pending state, which isn't a super great user experience. We bring this back and it does take a little bit longer to transition to Charizard and Mew here. **Despite that, it actually feels faster for users based on research** from the React team, which is why this API exist.

[02:29] In review, the problem we are trying to solve here revolves around perceived performance of our application. **Research suggests that if users see a flash of loading state, it makes them feel like the app is slow**. We're better off not showing them a loading state immediately and only showing it after a few hundred milliseconds.

[02:47] If we do show it, we want to make sure that it stays around long enough so it's not a flash of loading state in that time frame. That's the problem that we solved in this lesson with `busyDelayMs` and `busyMinDurationMs`.

[03:00] Again, these are pretty experimental APIs and may change, but these are the APIs that work with the experimental version of React.
