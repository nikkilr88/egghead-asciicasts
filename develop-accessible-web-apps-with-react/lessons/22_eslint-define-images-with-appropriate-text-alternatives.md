Instructor: [0:00] Here I have a web page with some images that, as you can over here from `react-axe`, are missing alternative text.

![React Axe](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545908/transcript-images/16_eslint-define-images-with-appropriate-text-alternatives-react-axe.jpg)

Here's the responsible code.

As you can see over here, I've run `eslint`. It's showing me the same finding, with `image` elements missing an `alt` prop.

![eslint report](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545918/transcript-images/16_eslint-define-images-with-appropriate-text-alternatives-eslint-report.jpg)

[0:20] This is the `image` that's missing the `alt` prop.

#### Movie.js

```javascript
<div className="card mb-3">
    <div className="row">
        <div className="col-1"><img src={imgSrc} /></div>
```

It corresponds to each of these movie poster images in my application. If we look at this component, we've got some information up here about the movie. This is my `Movie` component.

```javascript
const Movie = ({ movieId, movie, movieActions }) => {
    const {
        name,
        year,
        description,
        director,
        stars,
        rating,
        runtime,
        genre,
        notes
    } = movie;

```

[0:39] If we want to provide some meaningful alternative text for the `image`, which is of the movie poster, we should be able to put something together for that. If we provide an `alt` attribute, we can use the `name` of the movie in a template literal and combine that with movie poster.

```javascript
 <div className="card mb-3">
    <div className="row">
        <div className="col-1"><img src={imgSrc} alt="{`${name} Movie Poster`}" /></div>
```

[1:02] We run `eslint` again. That finding is now gone. If we look at the browser, `react-axe` is no longer reporting that finding as well. If we go to Safari and run VoiceOver and listen to what that sounds like.

- Screen Reader: [1:24] "Inception" movie poster image. "Gladiator" movie poster image. "Raiders of the Lost Ark" movie poster image.

Instructor: [1:32] Now the name of the movie is read as the movie poster image. That's definitely more useful than what we had before.

[1:40] If we consider the functionality that these movie poster images is conveying to the user, they really don't provide any additional information that we're not already conveying through the title and all of the information and description of the movie that's already being read by the screen reader.

[1:58] Really, these are just decorative images. They're not functional in any way. What we could do instead of providing the name of the movie, movie poster as the alternative text, we could just provide an empty string. What this does is actually removes it from the assistive technology's tree. It won't be announced by the screen reader.

```javascript
 <div className="card mb-3">
    <div className="row">
        <div className="col-1"><img src={imgSrc} alt="" /></div>
```

[2:20] Let's check real quick and make sure eslint still approves. It does. `react-axe` is still not reporting any findings. Let's see what that sounds like when read by the screen reader.

- Screen Reader: [2:43] Navigate. Heading. Add Inception. Heading level. Add Gladiator. Heading Level. Add Raiders. Heading Level. Add Mission.

Instructor: [2:52] The screen reader actually skips focusing on each `image` and does not announce its presence. When you're providing alternative text on your images, you'll have to consider what function does this `image` provide, does it need to be announced to the screen reader, or is it just decorative.

[3:08] It's only useful for those who are sighted and therefore would just be noisy or distracting if read by a screen reader.
