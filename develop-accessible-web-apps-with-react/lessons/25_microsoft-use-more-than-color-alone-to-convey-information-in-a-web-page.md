Instructor: [00:01] Here's a Web page that previously had color contrast issues, but they've all been resolved. We can see our console is clear of any findings from `react-axe`.

![React Axe](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545903/transcript-images/19_microsoft-use-more-than-color-alone-to-convey-information-in-a-web-page-react-axe.jpg)

[00:12] If we run `axe` again, we now have no issues with color contrast. Everything is crisp and clear. If we use our Chrome High Contrast browser extension and check each of the modes, everything is still easy to read and see in all of the modes. Notice the tabs when we select a tab, we can tell which one is selected.

[00:40] Let's see what this looks like in Windows high contrast mode. We can see here that we still can't tell which tab is selected. I can click on each of these tabs and nothing changes visually to indicate which one has been selected, so we still need to fix that.

![Tabs Issue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545913/transcript-images/19_microsoft-use-more-than-color-alone-to-convey-information-in-a-web-page-tabs-issue.jpg)

[01:09] The problem here is that our design is trying to use color alone to convey meaning. With certain high-contrast tools, like the one we're looking at right now, color is removed, or for certain users who have issues with color and they can't see those differences, we need to alter our design to convey the meaning without relying on color alone, so let's go fix that.

[01:34] Now we've changed our design so that instead of using a pill design for each tab, we're using a tab design. Now you can clearly see which tab is selected and which is not.

![Windows Tabs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545910/transcript-images/19_microsoft-use-more-than-color-alone-to-convey-information-in-a-web-page-tabs-windows.jpg)

[01:48] If we go back to Chrome on the Mac, we can see that this new design works just fine here as well. Everything is very clear. You can tell the difference between the selected tab and the hover state.

![Chrome on Mac](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576545915/transcript-images/19_microsoft-use-more-than-color-alone-to-convey-information-in-a-web-page-chrome-mac.jpg)

[02:04] If we use our High Contrast browser extension and check each mode, each of these works just as well. This is a solution that works in all high-contrast modes on all operating systems and browsers.
