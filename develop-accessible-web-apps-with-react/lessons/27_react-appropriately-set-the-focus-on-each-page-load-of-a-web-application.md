Instructor: [00:00] Here, I have a web application where I'm not deliberately setting or managing the focus as the user navigates from one page to the next. Let me demonstrate. As a keyboard user, when I move to the next page, and that page loads, let's see where the focus is set.

[00:16] We can see right here that it goes to the body, because we are not explicitly telling it where to go. If I move to another page, it's the same thing. 

![Shows body is focused on Moview Wishlist page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-body-focused-wishlist-page.jpg)

That happens for every single time we navigate from one page to the next. We lose the focus. Let's listen to how this impacts our screen readers.

[00:37] If I run VoiceOver...

Announcer: [00:40] Login button.

Instructor: [00:41] Now, pay attention to where this focus indicator goes when we route to the next page, and listen to what the screen reader reads. If you notice where this focus indicator is (currently on the login button), it's still located over where the login button was on the previous page.

![Focus stuck from previous page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-focus-stuck.jpg)

[00:57] What's announced is that you are currently on a button, but it doesn't tell us what button we're on. If I actually go ahead and press this button...

Announcer: [01:05] Press add a movie button.

Instructor: [01:07] presumably, my focus was actually up here on the add a movie button that was here in the header on the previous page. Somehow, the focus went there. We weren't told that that's where it was, and now, I'm on another page altogether. The user can become very lost very quickly this way.

Instructor: [01:26] Let's consider what functionality we want to happen when it comes to setting the focus on each page upon navigation.

[01:34] We want the focus to start somewhere near the top of the page in a place that is logical to the user, so they are not lost somewhere down in the bottom or middle, and they can very easily get to whatever makes the most logical sense for them to need to do first in a linear order on the page.

![Movie wishlist page shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-movie-wishlist.jpg)

[01:52] This is the first page we come to after we've logged in. A good, logical place to start would be to move the focus right here on the element that says `No Movies in your Wish List! Add some!`, to go ahead and announce that the user has no movies in their wishlist, and that they need to add some.

[02:06] That should be the first thing the user hears. Once they've clicked to add some, and they move to the browse page, we should let them know that they're on the browse page. We should set the focus to this header.

![Focus header on browse page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-focus-header-movie-list.jpg)

[02:17] From here, they can very quickly get to if they need to go back or move down to pick a genre and use the rest of the page. Finally, if they do have at least one movie in their wishlist, when they come back to the wishlist page, similarly to the browse page, we should set up focus up here to this header and let them know that they're on the wishlist.

![Focus header on wishlist page with movies present](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-focus-header-wishlist.jpg)

[02:37] This is what we're going to do. Let's see how to do that. Here's our `MovieWishlist` component, and all the way we down here, we have this section that we display when we have no movies in our wishlist. What we're going to want to do is we're going to want to set focus on this `Link`, because it is a focusable element.

```js
<main>
{ hasMovies
  ? ( // Show WishList
    <Fragment>
      <TabList tabList={tabList} />

      <div>
        <WishList
          movieList={wishlist}
          watched={match.params.status === 'watched'}
          movieActions={movieActions}
        />
      </div>

      <MovieEditor
        key={movieInEditing.name}
        movie={movieInEditing}
        updateMovie={this.handleUpdateMovie}
        isOpen={showEditor}
      />
    </Fragment>
  )

  : ( // No movies yet in the WishList
      // This link!
    <div aria-labelledby="noMoviesText addLink" className="no-movies-container">
      <span id="noMoviesText">
        No Movies in your Wish List! &nbsp;
        
        <Link id="addLink" to="/browse"
          aria-label="Add some movies to your wishlist now!"
        >
          Add some Movies!
        </Link>
      </span>
    </div>
  )
}
</main>
```

[02:54] **In order for us to do that, we're going to need to set a ref to this element, so that we can reference it later and actually call the focus function on it.** Up here in my constructor, I'm going to add a member variable that will hold the reference to the link element, `this.addSomeMoviesLink`.

[03:10] Because I'm using React, greater than version 16.3, and I'm using a class component, I'm going to use `React.createRef`. Now, we need to pass this reference to our `Link` element. 

```js
class MovieWishlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditor: false,
      movieIdInEdit: null
    };

    this.addSomeMoviesLink = React.createRef();

    this.handleShowEditor = this.handleShowEditor.bind(this);
    this.handleHideEditor = this.handleHideEditor.bind(this);
    this.handleUpdateMovie = this.handleUpdateMovie.bind(this);
  }

  ...
}
```

One quick thing to note is I'm using a component from a third-party library. React router to be specific.

[03:31] I can't just pass a ref prop, necessarily, because this is not an HTML element. It's a higher-level component, and if this component is not expecting a ref prop, it's not going to do anything with it. Specifically, **I've looked at the docs, and I know that this link component will take a prop called innerRef that it will actually pass down to the ref attribute on the underlying a tag.**

```js
: ( // No movies yet in the WishList
  <div aria-labelledby="noMoviesText addLink" className="no-movies-container">
    <span id="noMoviesText">
      No Movies in your Wish List! &nbsp;
      <Link id="addLink" to="/browse"
        aria-label="Add some movies to your wishlist now!"
        // innerRef is the prop used by react-router's Link to forward the ref attribute
        // to the underlying <a> element
        innerRef={this.addSomeMoviesLink}>Add some Movies!</Link>
    </span>
  </div>
)
```

[03:56] We're going to pass it our variable that's holding the ref that we created. Now, we have a reference to this element. Finally, we need to add a `componentDidMount` life cycle event function. This is so we can make sure our focus gets set when the component mounts, when the page loads.

[04:13] First, we need to make sure that our ref has already been set and exists. Now that we know that our variable exists, and it's actually been set with a reference to an element, we can call focus on it. Now, let's try that out.

```js
componentDidMount() {
    if (this.addSomeMoviesLink && this.addSomeMoviesLink.current) {
      this.addSomeMoviesLink.current.focus();
    }
  }
```

[04:33] Here we are back on our login page. Once I hit login and we route to the wishlist, we can now visually see the focus indicator is here on the link. Let's just double-check that real quick by inspecting the active element, and yep, it's on our link, exactly where we wanted it.

![Add some! link is focused correctly](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-wishlist-focus-correctly.jpg)

[04:55] Now, let's look at how to set the focus on the page heading when we get to browse movies or when we go back to movie wishlist. Here we are in our `Header` component, and this is shared by both the wishlist and browse pages.

**primitives/Header.js**
```js
const Header = ({ title, buttonText, buttonLabel, handleButtonClick, doFocus }) => {
  return (
    <header>
      <nav className="navbar navbar-dark">
        <span className="navbar-brand">
          <h1>{title}</h1>
        </span>
        <button
          className="btn btn btn-outline-light"
          onClick={handleButtonClick}
          aria-label={buttonLabel}
        >
          {buttonText}
        </button>
      </nav>
    </header>
  );
};
```

[05:18] Similarly, we're going to need to set a variable with a ref. Because I'm using greater than React 16.8, and I'm in a functional component, versus a class component, I can call a `useRef` hook. Now, I need to pass that reference to my h1 element, which is where I want to set the focus.

```js
const Header = ({ title, buttonText, buttonLabel, handleButtonClick, doFocus }) => {
  const headerRef = useRef(null);

  return (
    <header>
      <nav className="navbar navbar-dark">
        <span className="navbar-brand">
          <h1 ref={headerRef} tabIndex={0}>{title}</h1>
        </span>
        <button
          className="btn btn btn-outline-light"
          onClick={handleButtonClick}
          aria-label={buttonLabel}
        >
          {buttonText}
        </button>
      </nav>
    </header>
  );
};
```

[05:38] Now, an additional thing we're going to need to do is we need to make this h1 focusable. By default, h1 elements are not focusable, because they're not interactive. You can't take action on them. In order to make this h1 focusable, we need to give it a tab index of zero.

[05:54] Note that React uses tab index with a capital I and camelcase, versus all lowercase. You'll see some red squigglies here and note that I now have an ESLint finding, because it has this rule that only interactive elements -- elements that you can take actions on -- should be focusable.

[06:11] I disagree with this, and I believe that the user experience of setting the focus at the page title when routing from one page to the next is a better user experience than setting the focus on whatever the first focusable element may be.

[06:26] I feel like this is a rule we need to make an exception for, so I'm just going to suppress that. 

```js
return (
  <header>
    <nav className="navbar navbar-dark">
      <span className="navbar-brand">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <h1 ref={headerRef} tabIndex={0}>{title}</h1>
      </span>
      <button
        className="btn btn btn-outline-light"
        onClick={handleButtonClick}
        aria-label={buttonLabel}
      >
        {buttonText}
      </button>
    </nav>
  </header>
);
```

Now, that we have our reference to the h1, we need to similarly set it when the component mounts. Since I'm in a functional component, I'm going to do that with a `useEffect` hook.

[06:45] Same as what we had in the movie wishlist component, we want to make sure that our reference exists and that it's been set, and when it is, we can call focus on it. 

```js
const Header = ({ title, buttonText, buttonLabel, handleButtonClick}) => {
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef && headerRef.current) {
      headerRef.current.focus();
    }
  });

  ...
}
```

Let's test that out now. Here we are in our wishlist.

[06:59] We're going to click the link to add some movies, and we can see here our focus indicator has moved to this h1, our page title. Let's check here, and we can confirm that the focus has been set on our h1. 

![Header image correctly focused on browse page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/27-browse-page-focus-set.jpg)

Now, we've got one last thing to do.

[07:17] We want to set focus on the page title when we go back to the wishlist, but only when there are movies in our wishlist. When there are not movies in our wishlist, we want to go to the link. We have to make sure that that's conditional.

[07:30] If we add a prop to this `Header` component called `doFocus`, and it's a Boolean, and we'll give it a default of false, so that not everybody has to supply it if they don't want to. We're going to add that to our checking.

```js
Header.defaultProps = {
    buttonText: '',
    buttonLabel: null,
    doFocus: false
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonLabel: PropTypes.string,
  handleButtonClick: PropTypes.func.isRequired,
  doFocus: PropTypes.bool
};
```

[07:45] Before we actually set focus, let's make sure that we explicitly want to. Now that this is being used within our `useEffect`, we need to make sure that it's part of our dependencies. Finally, we need to make sure that the movie wishlist and movie browse components are passing this in appropriately.

```js
useEffect(() => {
    if (doFocus && headerRef && headerRef.current) {
      headerRef.current.focus();
    }
}, [doFocus]);
```

[08:04] For our `MovieBrowser` component, we want to always focus. This is just going to always be true. 

**browse/MovieBrowser.js**
```js
const MovieBrowser = ({
    history,
    match,
    wishlist,
    addToWishlist,
    removeFromWishlist
}) => {
  
  ...

  return (
    <div>
      <Header
        title="Browse Movies"
        buttonText="< Back"
        buttonLabel="Back to Wish List"
        handleButtonClick={goToWishlist}
        doFocus
      />

    ...
  )
}
```

Then our wishlist, we want this to be conditional on whether we have movies or not. Here in our JSX is where we decide whether to show the movies in wishlist or our message about not having any.


```js
return (
  <div>
    <Header
      title="Movie Wishlist"
      buttonText="+" buttonLabel="Add a Movie"
      handleButtonClick={goToBrowse}
      doFocus={hasMovies} // only focus the header if we have movies, otherwise focus the Add some movies! link
    />

    ...
)
```

[08:25] Here in our header, we can use that variable that tells us whether we have movies or not. If we have movies, we want to focus on the header. One last clean-up item. We probably shouldn't even show our tabs of whether the movies or unwatched if we don't have any movies. Let's just move that into here into the `hasMovies` conditional.

[08:43] Now, let's test it all out. If we go back to the beginning, to our login page, and let's use the screen reader, let's watch where the focus goes now when I push the login button.

Announcer: [08:52] Login button, visited link, add some movies to your wishlist now. No movies in your wishlist.

Instructor: [08:58] There we go. We initially focus on the link, as we had previously, and that's the first thing that's read to the user. If we go ahead and click the link...

Announcer: [09:08] Heading level one, browse movies, navigation. You are currently on a heading level one.

Instructor: [09:14] Once this page loads, we focus directly on that page title, and that is the first thing we hear. It's very clear to us what page we have navigated to. Now, if we add a movie...

Announcer: [09:24] Add "Inception."

Instructor: [09:25] and then navigate back to our wishlist...

Announcer: [09:27] Back to wishlist button. Heading level one, movie wishlist, navigation. You are currently on a heading level one.

Instructor: [09:35] Since we have movies in our wishlist, we focus on the page title, just as designed.
