Instructor: [00:00] Here is a web application that has a number of color contrast issues in it. I'm running `react-axe`, and we can see we have this finding -- `Elements must have sufficient color contrast`.

![React Axe](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545911/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-react-axe.jpg)

[00:12] If I expand that, it lists out each element that does not have a sufficient color contrast ratio. If I use the `axe` browser extension, I've got the same finding, and I can highlight each element. If we use `tota11y`, we can annotate the contrast ratios, and all of these in red show an insufficient contrast ratio.

![Tota11y](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545907/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-tota11y.jpg)

[00:41] Another cool feature about `tota11y` is that it lists the hex values of the foreground and background colors for each element that has an insufficient ratio. It provides a suggestion of the foreground and background color that would create a sufficient ratio. You can actually preview it by checking this box.

[01:08] In addition to using these various auditing tools, it's also really important to use the various experience tools, the tools that our users are using in order to facilitate their accessibility. A lot of users with visual impairments may be using high contrast tools.

[01:24] Here we have a high contrast browser extension installed. I'm going to enable that and check my web page with each of the modes to see how it displays.

![Increased Contrast](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576546244/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-increased-contrast.jpg)

On this mode, for instance, this button becomes virtually invisible.

![Grayscale](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545894/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-grayscale.jpg)

Here, it's slightly more visible, but almost impossible to read. The same with this one.

[01:53] If we look at another page in our web application, we find here that text becomes almost impossible to read.

![Invisible](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545873/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-invisible.jpg)

If I go to the accessibility display preferences here on my Mac, and modify each of these, I can also see how my pages display. This one absolutely makes this button invisible.

![Mac Display](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545900/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-mac-display.jpg)

[02:51] If we look at this on an IBM running Windows, in Windows high contrast mode, everything looks pretty decent on this page. However, we can see that it is not clear which of these tabs is selected. It's pretty much invisible.

![Tabs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545914/transcript-images/17_mac-test-for-insufficient-color-contrast-accessibility-issues-tabs.jpg)

[03:16] By testing with each of these different high contrast tools, we get a full picture of all of the different modes and operating system settings that our users might possibly be using out there. While one might look OK, another one might make something completely hard or impossible to see.
