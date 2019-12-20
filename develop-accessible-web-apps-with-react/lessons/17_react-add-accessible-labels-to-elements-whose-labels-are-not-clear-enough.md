Instructor: [0:00] Here I have an application that has some known issues with accessible labels. The problem we have here is that we have a button on each of these pages. You can see in the source for this button that its text is just a plus sign.

![Chrome Source Panel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/17_1.jpg)

[0:15] Those of us who can see are very used to seeing buttons that have a plus sign to indicate that you're going to add something. Over here with this button, we have this chevron pointing back. Again, for those of us who can see, we're used to seeing this to indicate we're going back to the previous page.

[0:37] **The problem with these buttons is while they work well for those of us who can see and we can visually understand their meaning, that meaning is not conveyed as clearly to those using screen readers.** Let's demonstrate that. I'm in Safari. I'm going to go ahead and run voiceover.

Voiceover: [0:54] Plus button.

Instructor: [0:56] As you can hear, the screen reader reads this as "plus button." **That's not very descriptive for those people who can't see the button and probably don't know what plus button indicates or what to expect the functionality to be from that button**. If we go to the browse page, let's hear what this button sounds like.

Voiceover: [1:15] Less back button.

Instructor: [1:17] This button is read as "less back" because the screen reader is reading this character as a less sign. Combining the two, it says, "Less back." That definitely is not going to make sense to those using a screen reader. If they hear "less back button," that is not conveying to them the functionality that we're going to go back to the previous page.

[1:39] **Both of these buttons need accessible labels because their own text is not descriptive enough to convey what functionality we can expect these buttons to have.** One more test real quick. Let's see what's shown in the rotor for these buttons.

Voiceover: [1:52] Less back button.

Instructor: [1:53] Same thing, less back button. On our previous page...

Voiceover: [1:56] Form controls menu. Plus button.

Instructor: [1:58] Plus button. **Whether navigating to the button or using the rotor, it is not clear to users what this button is going to do**. Let's fix this.

Voiceover: [2:07] Voiceover off.

Instructor: [2:08] Here's that component that we were just looking, that had the plus button. As we could see from looking at the source previously, the text for the button is just a plus sign. We want to give this button a label that says that we're adding a movie when you click this button.

[2:23] **We can do that by adding an aria-label attribute.** We can be as verbose as we want with this. This is what's going to be read to a screen reader user when they focus on this button. We want to tell them what this button is. Really what it is is a button to add a movie.

```js
<nav>
  <button
    className="btn btn-outline-light"
    aria-label="Add a Movie"
    onClick={goToBrowse}
  >
    +
  </button>
</nav>
```

[2:38] Now if we look at the component for the browse page button, here it is right here. There is our less back text. **Let's give this an aria-label saying, "Go back to wish list" because that's what's going to happen if you click that button.** Now let's hear how that sounds when read by the screen reader.

```js
<nav>
  <button
    className="btn btn-outline-light"
    aria-label="Back to Wish List"
    onClick={goToWishlist}
  >
    {'< Back'}
  </button>
</nav>
```

Voiceover: [2:58] Add a movie button.

Instructor: [2:59] Now the button says, "Add a movie." That is a lot more useful. Let's check that out with the rotor.

Voiceover: [3:04] Form controls menu. Add a movie button.

Instructor: [3:06] There it is again. If we're navigating through the rotor and we're going through the buttons and we hear "Add a movie," that's very clear now what we can expect that button to do. Let's check out the button on the browse page.

Voiceover: [3:17] Go back to wish list button.

Instructor: [3:19] Now that says, "Go back to wish list button." Very helpful.

Voiceover: [3:22] Go back to wish list button.

Instructor: [3:24] **Those buttons are now dramatically more useful to a screen reader than they were before just by adding an aria-label attribute.**
