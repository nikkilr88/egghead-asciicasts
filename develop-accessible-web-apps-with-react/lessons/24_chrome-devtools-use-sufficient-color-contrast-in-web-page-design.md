Instructor: [00:00] Here's my web page with known color-contrast issues. We've got some tools that can help assign sufficient color-contrast ratios. First, in Chrome DevTools we can inspect an element that has insufficient color contrast. Here is my `button`.

[00:18] If I look at the color style and click on that, right here Chrome tells us that the contrast ratio's insufficient with this icon.

![Chrome Devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576592405/transcript-images/18_chrome-devtools-use-sufficient-color-contrast-in-web-page-design-devtools.jpg)

It tells us what the ratio is. We need that to be `4.5`. If we expand this section, it lists the acceptable ratios for the AA and AAA levels of the WCAG standard.

[00:43] Here's a preview of the foreground against the background color. If we look at the color swatch here, there's this white line. That represents the WCAG AA level of acceptance. If the color is below this line, it should meet AA standards. If the color was closer to AAA, we would see an additional line for AAA.

![White Line](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576592405/transcript-images/18_chrome-devtools-use-sufficient-color-contrast-in-web-page-design-white-line.jpg)

[01:07] As we could see, if we move our color under the line, there's really no way we can possibly meet AAA. We can only meet AA based on the combination of foreground and background colors. If we can't meet the ratio we're looking to meet, we may have to change the background color as well as the foreground color to find a ratio that's sufficient.

[01:32] Another tool that's helpful is the Level Access browser extension, Accessible Color Picker. Again, this is available for Chrome.

![Level Color Picker](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576592406/transcript-images/18_chrome-devtools-use-sufficient-color-contrast-in-web-page-design-level-color-picker.jpg)

You can select your foreground color and your background color. It shows the contrast ratio here and that it is not meeting WCAG AA or AAA compliance levels.

[01:57] It gives you a preview here of the foreground against the background colors as well as our hex values. In this chart we can see right in the middle is our current foreground-and-background color combination. As we go right, the foreground color gets lighter.

[02:11] As we go left, the foreground color gets darker. As we go up, the background color gets darker. As we go down, the background color gets lighter. You have all of these examples of ways you can slightly modify each of the colors and how that impacts the contrast ratio. We can see that, based on this combination, none of these modifications get us to the acceptable contrast ratio.

[02:34] By selecting that color, that then puts that combination here in the middle. Now we can see suggestions that meet AA and AAA standards.

![Suggestions](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545915/transcript-images/18_chrome-devtools-use-sufficient-color-contrast-in-web-page-design-suggestions.jpg)

This is a great tool for helping us find what alterations we can make to those colors to get us to the acceptable contrast ratio. Finally, here's another site - ([https://color.review](https://color.review)) that's really helpful for this.

![Color Review](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545916/transcript-images/18_chrome-devtools-use-sufficient-color-contrast-in-web-page-design-color-review.jpg)

[02:58] If we enter the hex values for our foreground and background colors, we can see them previewed here. Similar to what we saw on Chrome DevTools when we inspected the element, we've got these three lines. We can pick either the foreground or background color to change.

[03:19] If we can get this foreground color down to the first line, it passes AA standards. If we can get it past the third line, it now passes AAA standards as well. Again, a great tool to help us find the color combination that will allow us to pass the WCAG standards.
