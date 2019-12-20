Instructor: 00:01 One of the cool things about Cypress is how great of a development experience it is to debug tests as you're running code. I'm going to go ahead and we'll fail this by changing `3` to `4` in our `calculator.js` and run all of our specs. We're going to get our test running with that test failing.

00:15 Let's go ahead and see how we could debug a problem like this. One thing that I can do is, I can take the subject that I'm getting with this `findByText` and I can inspect that subject a little bit better.

00:25 One of the commands that you can give to Cypress looks promisy, but Cypress isn't exactly like a promise. The promisy thing is, you can do a `.then` on this. This is going to give you your subject. Then you're going to want to return that subject, so you maintain that subject through the chain.

00:39 Here now, we can say, `debugger`.

#### calculator.js
```js
.findByText(/^2$/)
.then(subject => {
  debugger
  return subject
})
```

We'll save that, and we'll open up our dev tools. Now let's re-run those tests again. It's going to hit us at our debugger right there. What's cool about this is, we have all of the dev tools that we're used to in Chrome.

![dev tools debugger](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/cypress-debug-a-test-with-cypress-dev-tools-debugger.png)

00:53 I can look at all of the variables that I have here. We've got that subject. That's a jQuery wrapped button, so we can do `subject[0]` in the devtools. That's going to get me the jQuery node. I can also look at the elements tab.

01:10 I can look at the state of the DOM, and I can even manipulate the DOM. I could say, `subject[0].textcontent = "Whatever"`. I can totally mess up my app in all kinds of terrible ways, so let's not do that.

01:23 That's one way you can debug your app. We'll come back into `calculator.js`. Another thing that you can do is, you can actually just do a dot debug, invoke that and we'll come through here. Let's open up our dev tools again.

01:34 We'll get a bunch of debug info which can also make things really nice. If you refresh your tasks, it'll actually hit you at a debugger. You have access to that subject and you can do the exact same thing.

01:47 Another thing that you can do here is a `.pause` command. That will let you pause Cypress execution of your test. Instead of hitting you at a debugger, it simply pauses the execution halfway through your test, so you can actually interact with your app.

![pause](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727281/transcript-images/cypress-debug-a-test-with-cypress-pause.png)

02:00 You can inspect the elements of your app. We can see, "OK, there's nine." We could actually change that 9 to 100, or do whatever it is that we want to, here. As soon as we're done making all of the mess-ups and changes that we want to in our app then we can click "resume" and it will continue throughout the rest of our test.

02:17 All of your source code is accessible through here as well. If there was something going on in your source code that you wanted to debug, because we're running the dev script, we can go into here into the app.

02:26 Let's say we wanted to check out the theme, so we can console log the theme in `app.js`.

#### app.js
```js
function App({user, logout}) {
  ...
  console.log(theme)
}
```

We'll save that. Get a refresh. We're getting our theme console logged right there.

![theme](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-debug-a-test-with-cypress-theme.png)

We can also do a debugger statement right where we did our console.log. We'll have our dev tools open, and it'll stop us right here at the debugger.

02:41 We can clear this out, and we'll have access to all of those values. We have theme, and that's dark. We're going to call `setTheme` to `light`, and then play through. We'll get a debugger again. That is because we triggered or rerender so we can do `theme` now. The theme is now `light`. We'll play through now. Now, we have a light theme there.

03:00 All the usual tricks that you employ when you're actually developing your application, you can use within Cypress. Another thing that might be interesting is inside your code, you could also say `if (window.Cypress)`, and then you can do a debugger in here or you could say `window.theme = theme` and `window.setTheme = setTheme`.

03:21 We'll stick a debugger in here as well.

```js
function App({user, logout}) {
  ...
  if (window.Cypress) {
    debugger
    window.theme = theme
    window.setTheme = setTheme
  }
}
```

We can refresh. We'll get that debugger. We'll just play through all this. Now we have `window.setTheme`. We can set it to light. We'll get that debugger again. We'll play through. It's like magic.

03:36 You could do something like this with your redux store, your context value, or whatever it is that helps you develop these tests. I would recommend against using these in your test because this isn't something that the user typically will have access to.

03:48 That means that your test doesn't really resemble the way that your software is used very well, so you trade off some of the confidence, but it can help you in developing your test. Definitely play around with that.

03:57 In review, there are a couple of things that you can do here. You can change things with a .then to get access to the subject. Just make sure you return that subject then you can put a debugger in here.

04:07 You could also just use debug or pause commands that are supplied by Cypress, or directly in your app code, you can reference window.Cypress and set a couple variables to make it easier to debug your app as you're developing it with Cypress.
