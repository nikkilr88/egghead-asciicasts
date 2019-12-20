Instructor: [00:00] The Prettier project has a playground that you can play around with up in here. Actually, there's a bunch of configuration that you can specify Prettier to format things the way that you want it to be formatted.

[00:12] What I'm going to do is I'll go to our example file here and copy all of this. We'll paste it in here. We'll configure Prettier until the output looks the way that I want it to be. We'll go ahead and skip the `parser` here because Prettier will automatically determine what `parser` to use based on the file extension.

### prettier.io
![web example 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890639/transcript-images/eslint-configure-prettier-web-example-1.jpg)

[00:27] The print width, I like 80. Tab width, that's two. That's good. I don't like tabs. We'll do single quote here. That's going to change the quotes from double to single. I don't like bracket spacing. I'll turn that on. Prose wrap, so this is for markdown. We're going to go ahead and say always wrap.

### prettier.io
![global/common options example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890636/transcript-images/eslint-configure-prettier-web-example-2.jpg)

[00:47] For JavaScript, I don't like semi-colons. You do you. My preference is no semi-colons. JSX single quote, I like double quotes with JSX. I don't like this bracket same line. You can play around with that if you want to. I like the as needed here. Arrow parens, let's avoid those. trailing comma. Let's do all that makes our git disc look a little bit nicer.

### prettier.io
![javascript options example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890636/transcript-images/eslint-configure-prettier-web-example-3.jpg)

[01:13] The HTML white space sensitivity, yeah, that looks fine. I don't want to insert the Prettier format pragma or require that that pragma exists. That's just a comment that goes above the code. I don't want to have that. We'll leave those off.

### prettier.io
![html/special options example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890636/transcript-images/eslint-configure-prettier-web-example-4.jpg)

[01:25] Great. Now it's looking exactly like I want it. I'm going to `copy` the `config JSON`. Then I'm going to go in here and the root of my project we'll do `.prettierrc`, and we'll paste that configuration right in here. Perfect.

[01:40] Now if I run `npm run format`, Prettier will automatically pick up this configuration, and it automatically reformats this file to be exactly the way that I like it.

[01:50] In review, all that we needed to do here was we went to the [prettier.io/playground app](https://prettier.io/playground/). We configured Prettier on the left side here to do to the code whatever it is that we want to. Then we copied that configuration, pasted it in a `.prettierrc` file, and ran our format script again, to update our file to be formatted the way that we want it to.
