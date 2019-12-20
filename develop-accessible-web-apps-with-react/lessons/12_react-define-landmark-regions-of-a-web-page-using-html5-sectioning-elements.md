Instructor: [00:00] In a previous lesson, we defined landmark regions using ARIA roles. Now we're going to go ahead and edit those landmark regions to instead use HTML5 sectioning elements. Here we are again in our React component that defines these landmark regions.

#### MovieBrowser.js

```javascript
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import movies from "../movies";

import BrowseList from "./BrowseList";
import getBrowseActions from "./getBrowseActions";

const MovieBrowser = ({
  history,
  match,
  wishlist,
  addToWishlist,
  removeFromWishlist
}) => {
  const goToWishlist = () => history.push("/wishlist");
  const movieActions = getBrowseActions(addToWishlist, removeFromWishlist);
  const moviesInGenre = movies[match.params.genre];

  return (
    <div>
      <div role="banner" className="navbar navbar-dark bg-primary">
        <span className="navbar-text">Browse Movies</span>
        <div role="navigation">
          <button className="btn btn-outline-secondary" onClick={goToWishlist}>
            {"< Back"}
          </button>
        </div>
      </div>

      <div role="main">
        <ul className="nav nav-pills nav-justified">
          <li className="nav-item">
            <NavLink
              to="/browse/action"
              className="nav-link"
              activeClassName="active"
            >
              Action
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/browse/drama"
              className="nav-link"
              activeClassName="active"
            >
              Drama
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/browse/comedy"
              className="nav-link"
              activeClassName="active"
            >
              Comedy
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/browse/scifi"
              className="nav-link"
              activeClassName="active"
            >
              Sci Fi
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/browse/fantasy"
              className="nav-link"
              activeClassName="active"
            >
              Fantasy
            </NavLink>
          </li>
        </ul>

        <div>
          <BrowseList
            movieList={moviesInGenre}
            wishlist={wishlist}
            movieActions={movieActions}
          />
        </div>
      </div>

      <div role="contentinfo" className="footer">
        <div>
          <a href="/T&C">Terms &amp; Conditions</a>
        </div>
        <div>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div>© Movie Wishlist 2019</div>
      </div>
    </div>
  );
};

MovieBrowser.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  wishlist: PropTypes.object.isRequired,
  addToWishlist: PropTypes.func.isRequired,
  removeFromWishlist: PropTypes.func.isRequired
};

export default MovieBrowser;
```

[00:16] Here we have a `div` with `role` of `banner`. That is equivalent to the HTML5 element `header`. Here we have `div` with `role` of `navigation`. That is equivalent to the HTML 5 element `nav`. Here we have a `div` with `role` of `main`, and that is equivalent to the `main` element. Finally, here is our `div` with `role` `contentinfo`, and that is equivalent to `footer` element.

```javascript
<div>
  <header className="navbar navbar-dark bg-primary">
    <span className="navbar-text">Browse Movies</span>
    <nav>
      <button className="btn btn-outline-secondary" onClick={goToWishlist}>
        {"< Back"}
      </button>
    </nav>
  </header>

  <main></main>
  <footer></footer>
</div>
```

[00:51] Now that we've changed those, let's go ahead and double check and make sure that we are still passing all of our accessibility audits. `react-axe` is still not reporting any findings concerning `landmark` regions. If we check voiceover in Safari, and run the rotor...

- Voiceover: [01:09] Landmarks menu.

Instructor: [01:10] we still see all of the landmark regions we expect.

- Voiceover: [01:13] banner.

Instructor: [01:14] We've still got our banner...

- Voiceover: [01:15] navigation.

Instructor: [01:16] our navigation.

- Voiceover: [01:17] main.

Instructor: [01:18] our main.

- Voiceover: [01:18] Content information.

Instructor: [01:20] and content information. We should prefer HTML5 element over ARIA attributes when there is redundant functionality provided by each. That's because HTML5 provides much more semantic elements.

[01:36] If we look at a diff comparing these two, with our ARIA roles here on the left and our HTML5 elements here on the right, you can see that the HTML5 elements just provide much more clean and easier to read code.

![Diff](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576592406/transcript-images/12_react-define-landmark-regions-of-a-web-page-using-html5-sectioning-elements-diff.jpg)

[01:50] Instead of having to scroll through all of these divs with roles, we've got elements that are very explanatory.
