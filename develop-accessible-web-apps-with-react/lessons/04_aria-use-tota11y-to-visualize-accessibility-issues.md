Instructor: [00:01] To install the `tota11y` browser extension you either need to find the plug-in in the Chrome Web store for [Chrome](https://chrome.google.com/webstore/detail/tota11y-plugin-from-khan/oedofneiplgibimfkccchnimiadcmhpe?hl=en), or in the browser add-ons for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tota11y-accessibility-toolkit/). Whichever browser you prefer. Now that we've got that installed, let's go ahead and use it.

[00:32] Here's a sample application with some accessibility issues baked in. You can now see the `tota11y` plug-in right here in the browser.

![Plug In](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545917/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-plug-in.jpg)

If we click on that, we can turn it on. You should now be able to see the sunglasses tab here on the bottom of the screen.

[00:48] By clicking on that tab, we can open up `tota11y`, and it lists all of the plug-ins available to use.

![Sunglasses Tab](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545896/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-sunglasses-tab.jpg)

These can be enabled one at a time by clicking on them. If we want to start by looking at what landmark regions we have on the current page, we would enable the `Landmarks` plug in.

[01:11] As you can see, there are no landmarks annotated on this page, because there are no landmark regions, and that's an accessibility issue. Let's see what it looks like when we fix that. Now that we've added landmarks to the page, let's go ahead and enable that plug-in again and see what we've got.

![Landmarks](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545902/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-landmarks.jpg)

[01:30] Now you can see annotated the various landmark regions on this page. Now let's go ahead and look at headings. This will annotate all of the heading levels on the page, and it will show you when there's an issue with the heading levels, whether there's a missing H1 or the heading levels are not contiguous.

[01:55] Right here we can see in red we've got an issue with this heading level. It tells us what the issue is, it gives us information about it, and it points to the actual source code of that issue.

![Heading Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545896/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-heading-error.jpg)

Also, we can look at a summary which will actually give us an outline of the heading levels so we can see if they're contiguous or not, and what order they run in.

![Summary](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576546084/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-summary.jpg)

[02:17] If we fix this issue, now reenabling our heading plug in, you can see all of the annotated heading levels are green. You can see the summary is nice and happy. Now let's go to a page that has some input labels. Let's look at the labels plug-in. This will annotate any missing form labels which we have two right here that are missing.

![Input Issue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545893/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-input-issue.jpg)

[02:54] Once again, we've got more information about the finding, the actual source code, and what we can do to fix the issue. Let's see what this looks like after it's been fixed. Now there are no annotations, which means there's no missing labels.

[03:23] Now let's go back to a page with some images. Let's run the plug-in that checks for missing image `alt` text. We can see right here that each of these images has been annotated, because they're missing `alt` text. Once again, we've got more information over here pointing to the actual source where the `alt` text that's missing, for each of the elements where it's missing.

![Image Alt Text](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545898/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-image-alt.jpg)

[03:52] If we fix this, and check again, we now see no annotations because all of our images have `alt` text. Now let's see if we have any color contrast issue on this page by enabling the `contrast` plug-in, and we've got a lot of them.

![Contrast Problem](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576546114/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-contrast-problem.jpg)

[04:13] You can see all of the elements that have the red annotations showing where there's insufficient contrast ratios between the foreground and background colors. You can also see the areas that have acceptable contrast ratios, and those are shown in green.

[04:32] Once again, this information over here lists each element that has an issue. In addition, it lists the contrast ratio, and shows the foreground and background colors. It gives you a suggestion of a foreground and background color combination that would give you an acceptable ratio, and you can actually preview those colors by clicking in the preview checkbox.

![Preview Contrast](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545909/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-preview-contrast.jpg)

[04:58] There you can see we're previewing a change to the `Browse Movies` title foreground color. You can see it's actually a lot easier to read when we try their suggestion. Now let's go ahead and get those colors fixed and see how it looks. Enabling our contrast check again, there we go, all of our annotations are green, we have all acceptable contrast ratios showing.

[05:32] Finally, let's check out link text. Let's go to a page where we have some link text and change to the `Link text` plug-in. Right here we have an annotation for this link that just says `here`, and it explains to us here that the text `here`, is unclear without context, and may be confusing to screen readers. It shows you the source of the code that has the issue.

![Link Text](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545896/transcript-images/04_aria-use-tota11y-to-visualize-accessibility-issues-link-text.jpg)

[06:00] Let's fix that real quick, checking that again, now we no longer have an annotation because our link text is now nice and clear.
