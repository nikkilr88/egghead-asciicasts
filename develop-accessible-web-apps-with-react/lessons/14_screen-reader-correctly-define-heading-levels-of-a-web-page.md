Instructor: [00:00] Here's a web page that has some accessibility issues with heading levels. Here on the side, I've got `react-axe`, which is logging any findings to the console. We've got this one here, `Page must contain a level-one heading`

![react-axe console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545877/transcript-images/14_screen-reader-correctly-define-heading-levels-of-a-web-page-axe-console.jpg)

[00:13] If run `tota11y` and annotate headings, we can see that the very first heading level is an `h5`. We need that to be an `h1`. Let's look at the code. Here's that `h5` that we saw being reported by `tota11y`.

#### Login.js

```javascript
return (
  <div className="login row align-items-center">
      <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5">
          <header>
              <h5 className="card-header">Movie Wishlist Login</h5>
          </header>
    ...
)
```

[00:26] If we consider the structure of the page and the meaning we want to convey, with this being the first page of our web application, and that web application being the movie wishlist, really, we could consider `Movie Wishlist` to be our top-level heading. It's the title of the application.

[00:45] We could consider `Login` to be a sub-level to that, as it's the title of the page. What we can do here, instead of making this whole thing an `h1`, let's separate these two heading levels out from each other. Let's move the header up here above the card.

```javascript
<div className="login row align-items-center">
  <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5">
    <header>Movie Wishlist</header>
  </div>
</div>
```

[01:01] We're going to put the application title here in the `h1`. That's Movie Wishlist. Now, we can make our `Login` title an `h2`.

```javascript
<div className="login row align-items-center">
  <div className="col-12 col-md-9 col-xl-8 py-md-3 pl-md-5">
    <header>
      <h1>Movie Wishlist</h1>
    </header>

    <div className="card bg-primary">
      <h2 className="card-header">Login</h2>
    </div>
  </div>
</div>
```

Let's see what this looks like. The finding that `react-axe` was reporting about missing a heading level one is now gone.

[01:20] We can now see the way we've reorganized the page a little bit. Here is our application title, and here's our page title.

![New Heading](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545884/transcript-images/14_screen-reader-correctly-define-heading-levels-of-a-web-page-new-heading.jpg)

I think that this makes more sense visually and from the perspective of the assistive technologies, because the heading level is meant to convey the structure of the page.

[01:36] Let's look at another page with heading level issues. Again, `react-axe` is showing us that this page does not have a level one heading. `tota11y` shows us that the first heading level is an `h5`. Let's look at the code for this.

#### MovieBrowswer.js

```javascript
<header className="navbar navbar-dark bg-primary">
  <span className="navbar-text">Browse Movies</span>
  <nav>
    <button className="btn btn-outline-secondary" onClick={goToWishlist}>
      {"< Back"}
    </button>
  </nav>
</header>
```

[01:56] Looking at the code in our `header`, we don't even have a heading level within the `header`. Once again, the heading levels are meant to convey the structure of the page. Really, the page title should be an `h1`. Let's go ahead and add that.

```javascript
<header className="navbar navbar-dark bg-primary">
  <span className="navbar-text">
    <h1>Browse Movies</h1>
  </span>
  <nav>
    <button className="btn btn-outline-secondary" onClick={goToWishlist}>
      {"< Back"}
    </button>
  </nav>
</header>
```

[02:12] Looking through the rest of the page, the `h5` being reported are within our movie component. Here's that `h5`, and here's the `h6`.

#### Movie.js

```javascript
<h5 className="card-title">{name} ({year})</h5>
<h6 className="card-subtitle mb-2 text-muted">{rating} | {runtime} { genre ? `| ${genre}` : null }</h6>

```

If we look at what information these two heading levels contain, the `h5` contains the `name` and `year` of the movie, which we can see right here.

[02:32] It makes sense that that's a heading level, because we have a section for each movie. Let's make that an `h2`, as that is the next contiguous heading level after our `h1`. Now, let's look at what's in the `h6`. We've got the `rating`, the `runtime`, and sometimes the `genre`.

[02:53] That's this line right here, and that's not really heading level. That's just information. Heading level was used originally here to achieve a certain font size, which is not what heading levels are for. They're to convey the structure of the page.

[03:06] Instead, let's just make this a `p` tag.

```javascript
<h2 className="card-title">{name} ({year})</h2>
<p className="card-subtitle mb-2 text-muted">{rating} | {runtime} { genre ? `| ${genre}` : null }</p>
```

Now, let's see what that looks like. Once again, our `react-axe` findings about heading levels are gone. If we run `tota11y` and annotate the heading levels, we can see that they now start with an `h1`, continue with `h2`, and everything is green and appropriate.

![Page Fixed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545897/transcript-images/14_screen-reader-correctly-define-heading-levels-of-a-web-page-fixed.jpg)

[03:27] Finally, if we go to voiceover in Safari and look at the rotor...

- Voiceover: [03:32] Headings menu.

Instructor: [03:33] We now can see...

- Voiceover: [03:34] Heading level one. Browse movies.

Instructor: [03:36] each of the heading levels...

- Voiceover: [03:38] Heading level two, four items.

Instructor: [03:39] is appropriate.

- Voiceover: [03:40] Heading level two, four items. Heading level two, four items. Heading level two, four items. Heading level two, four items. Die Hard.
