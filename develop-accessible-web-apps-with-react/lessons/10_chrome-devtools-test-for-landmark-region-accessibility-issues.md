Instructor: [0:00] Here's a sample Web application I've got with some accessibility issues in it. I'm running React Axe, and so, we can see any of the findings being reported to the console here.

![Console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576546069/transcript-images/10_chrome-devtools-test-for-landmark-region-accessibility-issues-console.jpg)

[0:10] We can see that we have a couple of findings concerning `landmark` regions. Our document does not have a `main landmark`, and all page content must be contained by landmarks. For this page, there are no landmarks.

[0:26] If we run `tota11y`, we can also see that when we go to Annotate Landmarks, nothing is annotated. Again, we don't have any landmark regions and that's a problem.

[0:37] One of the impacts, for example, is that the `rotor` with `VoiceOver` is not going to list any of the landmark regions. Users that make use of the `rotor` are not going to be able to easily find the various sections of the page, and we can demonstrate this.

[0:52] Here's the `rotor`.

![Rotor](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576546068/transcript-images/10_chrome-devtools-test-for-landmark-region-accessibility-issues-rotor.jpg)

If we go through each of the menus, we should see one for landmark regions. Here, there is no menu for landmark regions because we don't have any, so let's fix that.
