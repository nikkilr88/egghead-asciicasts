Instructor: [0:00] When it comes to testing your application for issues concerning accessible labels, **we can start right in our terminal by running ESLint.**

```bash
npm run lint
```

If you've got the `eslint-plugin-jsx-a11y` installed, then we will get some findings when we are missing appropriate labels.

[0:18] Right here, we've got a couple findings on one form and here we have a finding on another form where we are missing labels associated with their form controls.

![Eslint Accessibility Errors](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/15_1.jpg)

**If you're using an IDE that's integrated with ESLint, then you can see right in the code if you have any of these findings.**

[0:35] I'm running the same application right now with `React aXe`. It also will show me if we have any findings with labels.

![React aXe issues](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599777/transcript-images/15_2.jpg)

It will highlight each input that is missing an associated label. If we run Totally, we can annotate for missing labels.

[0:55] Right here, those same two form inputs are annotated. It shows me the source code right here as well.

![Totally Accessibility Warnings](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/15_3.jpg)

**Our auditing tools make it really easy to find issues concerning form labels.**
