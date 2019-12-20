ESLint is great at catching potential bugs in our code, but we can also use it to detect accessibility issues. Let's `npm i D` as a dev dependency `eslint-plugin-jsx-a11y`. This is the accessibility plugin that's going to check our JSX for potential accessibility issues.

With that installed, let's open us our `.eslintrc` . I'm going to find the `plugins` entry, and I'm going to add another plugin, `jsx-a11y`.

#### .eslintrc.json
```javascript
"plugins": ["react", "jsx-a11y"]
```

I'll save that, and I'm also going to come up to our `extend` section.

Let's add a third entry here. We're also going to extend the `plugin:jsx-a11y/recommended`.

```javascript
"extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
```

I'll save that, and with that, let's go into our terminal. I'm going to `npm run lint`. Everything's going to pass. Let's come into our `App.js` file, and in our `render` output, after this hello world message, I'm going to add an `img` tag with a `src`.

We'll just make that up. It doesn't really matter, because we're not going to run this code. We just want the linter to catch an error for us.

#### App.js
```javascript
<h1>Hello World.</h1>
<img src="./log/png" />
```

I'm going to save that, and then back in the terminal, I'll `npm run lint` one more time.

This time, we're going to get an error. Let's expand that. We'll see that our error is coming from our JSX accessibility plugin. It's letting us know that image elements must have an `alt` prop, either with meaningful text or empty string for decorative images.

#### Accessibility Error
![Image Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/aria-check-for-accessibility-issues-in-jsx-with-the-jsx-a11y-eslint-plugin-img-error.png)

That's easy enough guidance. We should be able to fix this. I'm going to come in here, and I'll give it some alternate text. I'm going to call it `"logo image"`, and we'll save that.

```javascript
<h1>Hello World.</h1>
<img alt="logo image" src="./log/png" />
```

Then we'll go back into our terminal and run our linter again. We get a new error. It'll tell us that our `alt` attribute is redundant.

#### Alt redundant error
![Second Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/aria-check-for-accessibility-issues-in-jsx-with-the-jsx-a11y-eslint-plugin-2nd-error.png)

Screen readers already announce image tags as an image, so you don't need to use the word `image` I can come back here, and I can take `image` out of there. We'll say `"company logo"`.

```javascript
<h1>Hello World.</h1>
<img alt="company logo" src="./log/png" />
```
go back into the terminal, run our linter again, and now, it's happy. I can clear that out. I know my JSX plugin is working. I can come back into my code, delete that image, and everything is good.
