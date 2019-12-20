Instructor: [0:00] Here I have an application that has some known issues with accessible labels. Here I have Safari open. If I open the rotor in voiceover, we can demonstrate the issue.

Voiceover: [0:10] Form controls menu.

Instructor: [0:12] If you look at this page, we have a number of buttons, one for each movie that allows you to add that movie to your wish list.

![Inaccessible Add Button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/18_1.jpg)

However, in the rotor you just see the same text over and over again. If we were to go through this menu...

Voiceover: [0:29] Add button. Add button. Add button. Add button. Add button.

Instructor: [0:33] we would just hear "Add button" over and over again. **There's no additional context telling us what are we adding.** We don't even know that this button, if we click it, is going to add a specific movie. We certainly don't know which of those movies it's going to add. This is completely unusable for a screen reader user at this point. Again, this is something we can easily fix.

Voiceover: [0:54] Voiceover off.

Instructor: [0:56] Here's the component that generates that button. When the movie is already in the wish list, the button is going to say remove. When it's not, it's going to say add. That gets passed into this movie toolbar button component. Let's look at that.

[1:10] We're already passing down that button text, which is either going to be add or remove. We also have our movie title available here. We can make use of that.

[1:18] Let's give this a more accessible label using `aria-label`. We can use that button text. It's going to be add or remove, depending, and then the name of the movie.

```js
// src/primitives/MovieToolbarButton.js
return (
  <button
    className="btn btn-secondary"
    aria-label={ariaLabel}
    onClick={clickHandler}
  >
    {buttonText}
  </button>
)
```

Let's go ahead and try that out. If I run the rotor, here are all our buttons.

Voiceover: [1:36] Form controls menu. Add "Inception" button.

Instructor: [1:38] Add Inception.

Voiceover: [1:38] Add "Gladiator" button.

Instructor: [1:40] Add Gladiator.

Voiceover: [1:41] Add "Raiders of the Lost Ark" button. Add "Mission Impossible - Fallout" button. Add "Die Hard" button.

Instructor: [1:46] Now we can clearly hear which movie each of these buttons is going to add. **Just by adding that `aria-label` attribute, we've dramatically increased the accessibility of this page.**
