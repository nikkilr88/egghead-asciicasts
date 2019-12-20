Instructor: [0:02] Here is a Web page with some accessibility issues concerning landmark regions. We can see them over here, being reported in the console by `react-axe`. We're missing one `main landmark`, and the page content is not currently contained within landmarks.

[0:18] If we look at the structure of this page, we can figure out which sections should be defined as which landmark regions. Looking here, this banner up here looks like it represents the header. This button right here, which navigates us back to the previous page, should probably have a role of navigation.

![Role of Navigation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576546145/transcript-images/11_react-define-landmark-regions-of-a-web-page-using-aria-roles-role-navigation.jpg)

[0:38] The rest of this comprises our main section of the page. Then down here is our footer. Let's go ahead and define these landmark regions in our code. Here is my React component that contains all of the layout code making up this page.

#### MovieBrowser

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
      <div className="navbar navbar-dark bg-primary">
        <span className="navbar-text">Browse Movies</span>

        <button className="btn btn-outline-secondary" onClick={goToWishlist}>
          {"< Back"}
        </button>
      </div>

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
      <div className="footer">
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

[0:58] It's a functional component, so the JSX being returned here is what gets rendered into our page. Looking at our code, this `div` up here is containing that area that we decided was going to be our header.

[1:15] Let's add a `role` of `banner`.

```javascript
<div role="banner" className="navbar navbar-dark bg-primary">
  <span className="navbar-text">Browse Movies</span>
  <button className="btn btn-outline-secondary" onClick={goToWishlist}>
    {"< Back"}
  </button>
</div>
```

We had decided that this `button` should have a `role` of `navigation`, since it functionally navigates us back to the previous page. Let's wrap that in a `div` with `role` navigation.

```javascript
<div role="banner" className="navbar navbar-dark bg-primary">
  <span className="navbar-text">Browse Movies</span>
  <div role="navigation">
    <button className="btn btn-outline-secondary" onClick={goToWishlist}>
      {"< Back"}
    </button>
  </div>
</div>
```

Now, let's add our `div` with `role` `main`, and make sure we wrap the rest of our page content with that `div`.

```javascript
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
  </ul>
</div>
```

[1:57] Finally, down here is our `footer`. We just need to add a `role`.

```javascript
<div role="contentinfo" className="footer">
  <div>
    <a href="/T&C">Terms &amp; Conditions</a>
  </div>
  <div>
    <a href="/privacy">Privacy Policy</a>
  </div>
  <div>© Movie Wishlist 2019</div>
</div>
```

For the aria landmark `role`, a footer is represented by `contentinfo`. Now, let's see what that looks like. The findings that we were previously seeing being reported by `react-axe` are no longer being reported.

[2:17] If we use `tota11y` to annotate the landmark regions of the page, we should now see annotations, and there they are. We've got our `banner`, our `navigation`, our `main`, and down here, our `contentinfo`.

![tota11y landmark annotations](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545903/transcript-images/11_react-define-landmark-regions-of-a-web-page-using-aria-roles-landmark-annotations.jpg)

If we go back over to Safari, run Voice-over, and check the landmarks menu of the rotor...

- Voice-over: [2:41] Voice-over landmarks menu.

Instructor: [2:43] Before we were not even seeing the landmark menu in the rotor. Now, it's showing, and we see all of the landmark regions we expect to. We've got our banner...

- Voice-over: [2:52] `banner`.

Instructor: [2:53] our navigation...

- Voice-over: [2:54] `navigation`.

Instructor: [2:55] our main...

- Voice-over: [2:55] `main`.

Instructor: [2:56] and content information.

- Voice-over: [2:57] content information. Voice-over off.
