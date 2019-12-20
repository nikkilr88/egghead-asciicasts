Instructor: [0:00] Here I have a form that is missing accessible labels for each of the form inputs. We can see this here from our `React aXe` finding here in the console.

![React aXe errors](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/16_1.jpg)

Let's look at the code for this. Here's the code for that form.

[0:15] I at least already have visual labels using label elements for each of the inputs that they should be labeling. **The only thing left to do is to associate the label with the input to which it applies.** We've got two options for doing that. **If possible, we can wrap the input with the label.**

```html
<label
  >Password
  <input
    type="password"
    name="password"
    className="passwordClasses"
    placeholder="Password"
    onChange="{this.handlePasswordChange}"
  />
</label>
```

[0:42] If we check that out by running `ESLint` real quick, let's see if those findings have been resolved. We still have one in a different file, but the findings that we had originally for this file have now been resolved. We can also see that over here with `React aXe` where we're no longer seeing that finding.

[1:01] However, my display has been impacted.

![Form display impacted](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/16_2.jpg)

Now that I'm wrapping these inputs with the label elements, it's restricting the width of these inputs. I can probably fix that with CSS, but there are lots of reasons why perhaps I don't want to wrap my input element. Or maybe the label is located a little somewhere else in the structure of my page.

[1:23] **If we don't want to nest our inputs within our labels, we can associate them by adding an ID to our input and adding an htmlFor attribute to the label that references that ID of the input.**

```html
<label htmlFor="password-input">Password</label>
<input
  id="password-input"
  type="password"
  name="password"
  className="passwordClasses"
  placeholder="Password"
  onChange="{this.handlePasswordChange}"
/>
```

[1:41] One thing to note. In plain old HTML, this attribute would be for with a lower case F (`htmlfor`). Because we're using React, instead we use the attribute htmlFor in camelCase. Let's do the same thing here for the username input.

[2:03] If we run `ESLint` again, we still are no longer seeing any findings for the login.js file. If we run `React aXe` again, we no longer see a finding here either. Now my inputs are now back to their full width as they were originally designed. Just to double-check, let's look at Totally and annotate any missing labels. We don't have any annotations because we are no longer missing any labels.
