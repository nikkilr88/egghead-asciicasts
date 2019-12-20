Instructor: [00:00] Here I have a web page that has some accessibility issues concerning heading levels. Over here, I've got `react-axe` reporting any findings in the console. We can see we have a finding right here -- `page must contain a level one heading`. That means that this page does not have an `h1` element in it.

![React Axe](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545893/transcript-images/13_screen-reader-test-for-heading-level-accessibility-issues-react-axe.jpg)

[00:18] We can also use `tota11y` to annotate the heading levels on the page. This will show us in red any levels that have an issue. This is telling us that the only heading level we have is actually an `h5`, not an `h1`.

![H5](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545889/transcript-images/13_screen-reader-test-for-heading-level-accessibility-issues-h5.jpg)

[00:34] All pages should have at least one `h1` heading level, and they should start with each one and be contiguous from that point on. The fact that we don't have an `h1` and the only heading level that we do have is an `h5` is definitely an issue.

[00:53] Here's another page we can look at to see other issues with heading levels. Here `react-axe` is telling us the same thing -- `page must contain a level one heading`. If we use `tota11y` to annotate the heading levels here, we do not have an `h1` heading level, we start with `h5`, and we go from there.

![Headings Level](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545902/transcript-images/13_screen-reader-test-for-heading-level-accessibility-issues-headings-level.jpg)

Let's see what this looks like in VoiceOver's rotor.

- VoiceOver: 01:24 Headings menu.

Instructor: [01:26] Here's the headings menu, and the same thing as we saw in `tota11y`. We start with a level 5 and we have only 5's and 6's for this entire page.

![VoiceOver Headings](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545896/transcript-images/13_screen-reader-test-for-heading-level-accessibility-issues-voiceover-headings.jpg)
