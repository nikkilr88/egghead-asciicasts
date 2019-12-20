Instructor: [00:00] Here we have a web page with a number of images on it. I'm running `react-axe`. Over here, we can see being logged the console. `Images must have alternate text`. It lists each of these images. All of these are missing alternative text.

![Missing Alt Text](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545917/transcript-images/15_eslint-test-for-image-alternative-text-accessibility-issues-missing-alt-text.jpg)

[00:21] Additionally, we can run `eslint`, which has installed the `eslint-plugin-js-a11y`. If we run that, this will also report that we are missing an `alt` prop on our `image` elements.

![eslint test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545916/transcript-images/15_eslint-test-for-image-alternative-text-accessibility-issues-eslint-test.jpg)

Over here is the responsible code.

#### Movie.js

```javascript
 <div className="card mb-3">
    <div className="row">
        <div className="col-1"><img src={imgSrc} /></div>

```

For IDEs that integrate with `eslint`, you'll actually see in the code the eslint finding about missing `alt` text.

[00:49] Going back to the browser, we can also use `tota11y` to annotate any missing `alt` text on images. As we can see, each of these images is annotated.

![tota11y](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545905/transcript-images/15_eslint-test-for-image-alternative-text-accessibility-issues-totally.jpg)

[01:03] Finally, if we go to Safari and run VoiceOver, we can hear what is read for each of the images.

- Automated Voice: [01:11] Diener. current visit inception JPG image. Gladiator JPG image. underscore under the underscore lost underscore arc jpg image.

Instructor: [01:24] What it's doing is, it's reading the filename. Because we don't supply the `alt` attribute providing alternative text, the screen reader will fall back to reading the filename, which is really not helpful. This is why we need to make sure we're providing alternative text for our images.
