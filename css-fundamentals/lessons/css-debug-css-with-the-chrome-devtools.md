Instructor: [00:00] With our `li` styled `red`, we can see some of the tools that Chrome gives us by right-clicking on the element that we want to `inspect` and click on the `inspect` option. When we use that `inspect` option, Chrome will take us to where the selected `HTML` lives inside of this tree.

![Layout of the inspect option](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/debug-css-with-the-chrome-devtools-inspect-option.jpg)

[00:18] Within the `styles` tab, we can clearly see our `li` styled `red`. This box is editable, which means we can remove this style by clicking on the check and add other properties such as `font-size`, which will automatically apply to our `HTML`.

![Font-size added with the inspect option](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/debug-css-with-the-chrome-devtools-font-size-added.jpg)

[00:38] The hierarchy order here is important. We see that `li` receives other `styles` from Chrome, such as text align. It also gets these bullet point-type `styles` also from Chrome, but it's being inherited from the UL.

[00:53] When we refresh our custom `styles`, our font size will go away. What's also nice is Chrome will tell us where it got this style from. We can see that it came from our `style.css` and that's where it says it comes from. If we click on our `style.css` in the dev tools, it takes us to that file.

[01:10] We can easily add a class to our `a` tag here by clicking on this `.cls`, which will open up an input box. We can type in the name of the class that we want to add to our `a` tag, press the plus sign here, and it will give us a custom block where we can type in `styles` onto our newly created class.

![Adding styles to our a tag](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/debug-css-with-the-chrome-devtools-a-tag.jpg)

[01:29] We can see if our `a` tag has any hover state by clicking on the `HOV` here and clicking on the hover. We can also activate the `active`, `focus`, and `visited` pseudo class as well. These tabs here are showing us where our `a` tag lives inside the `HTML` tree. See our `HTML`, then we have a couple `divs`, our `ul`, our `li`, and then our `a` tag.

[01:52] Finally, this bottom right box here is showing us two things. The box model of the selected element and all of the final state `styles` of our element. This box model is telling us this element does not have any margins, borders, paddings around the element, just the text.

[02:11] We can manually add spacing by clicking on any of these dashes here and typing. If we click on `padding` and typed in `10`, our element will receive a `padding-top` of `10` pixels.

![Manually adding padding](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/debug-css-with-the-chrome-devtools-padding.jpg)

[02:22] As mentioned, if you ever find yourself lost in a sea of CSS `styles`, this will show the current applied state to the element. This includes our specific coloring of `red` and all of the default `styles` our browser is applying to it.
