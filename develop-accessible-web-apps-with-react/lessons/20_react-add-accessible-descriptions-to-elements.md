Instructor: [0:00] Here, I have a form that has some issues when it comes to how screen readers announce things like help text on the fields, as well as any errors associated with each of the fields. Let's run VoiceOver and demonstrate with those issues sound like.

[0:18] If I use the screen reader to navigate down to the password field that has this help text that informs us that passwords are case-sensitive, let's hear how that's read.

Announcer: [0:30] Password, secure edit text. You are currently on a text field.

Instructor: [0:34] **When the cursor focuses on the password field, we don't hear that message about passwords being case-sensitive. We don't actually hear that until we move the cursor out of the field.**

Announcer: [0:46] Passwords are case-sensitive. You are currently on a text element.

Instructor: [0:50] By then, we've already presumably entered our password, and we're moving onto the login button. **We really need a way to associate that descriptive, instructional information with the password field.**

[1:03] Additionally, if we run our form validation...

Announcer: [1:06] Login button.

Instructor: [1:07] and trigger those errors with each of the fields, if I go back to the username field, for instance...

Announcer: [1:13] Username, edit text, enter username. You are currently on a text field.

Instructor: [1:18] Similarly, while I'm in the username field, I don't know that there's something wrong with it that I need to fix. If I go to the password field...

Announcer: [1:26] Password, secure edit text.

Instructor: [1:29] **Once again, while I'm in the field, I don't know that there's a problem that I need to fix until I move the cursor out of the field.**

Announcer: [1:35] Passwords are case-sensitive. Please provide a password.

Instructor: [1:39] **All of this important information that we need to give the user while they're in the field, not after they've moved out of it, and then have to go back and change or fix something. Let's see how we do this.**

[1:51] Here's my form input component, and that's being used for each of these inputs in this login form. You can see that it receives helper text and error text, but neither of them are required. Here is our input, and if we have helper text, we include it. If we have error text, we include it.

[2:14] The first thing we need to do is we need to give each of these an ID. We need to make this conditional, since we don't always have either of these values. Let's create a helper ID, and it's conditional on helper text.

[2:31] We have it. Then we want create an ID. We can use the name of the field for this in a `template literal`, and we just want to return an empty string.

```js
// src/primitives/FormInput.js
const helperId = helperText ? `${name}-helper` : ''
```

Then we give the containing element this ID.

```js
// src/primitives/FormInput.js
{
  helperText && (
    <small id={helperId} className="form-text text-muted helper-text">
      {helperText}
    </small>
  )
}
```

We'll do something similar for the error text, if we have error text.

[2:52] We're going to go one further than that and verify of the field is actually invalid. **We don't want to reference the error message if the field doesn't have an error.** Due to the way this conditional is set, if we have error text, we're going to include this div in the DOM.

[3:07] Based on our styling, we're going to visually hide it, so it will exist, but we don't want to associate our input with it if we don't actually have an error, if the field is not actually invalid. Because we have this `isValid` prop, we can reference that.

[3:23] If we have the error text, and if it's not valid, then we will set the ID. We'll use another template literal with the name of the field and just append that with error. Otherwise, same thing, empty string.

```js
// src/primitives/FormInput.js
const errorId = errorText && !isValid ? `${id}-error` : ''
```

Now that each of these elements has an ID, we can reference them.

```js
// src/primitives/FormInput.js
{
  errorText && (
    <div id={errorId} className="invalid-feedback">
      {errorText}
    </div>
  )
}
```

[3:43] Again, we're looking to add a description association to the input, and we can do that with the `aria-describedby`. Similar to how `aria-labeledby` works, it takes a list of IDs delimited by a space. We'll add our helper ID and our error ID.

```js
// src/primitives/FormInput.js
<input
  id={id}
  type={type}
  name={name}
  className={inputClasses}
  onChange={onChange}
  aria-describedby={`${helperId} ${errorId}`}
/>
```

[4:03] Now, let's hear how this is working with the screen reader. Now, let's hear what is read when we get to the password field.

Announcer: [4:09] Password, secure edit text. Passwords are case-sensitive.

Instructor: [4:13] **Now, it's telling us. It's reading this helper text, "Passwords are case-sensitive," as soon as we focus on the field, instead of waiting until after we move out of it.** Let's go ahead and trigger the form validation and find out how our field errors are read.

Announcer: [4:28] Username, edit text. Please provide a username.

Instructor: [4:32] Now, we're hearing that we've missed providing a username while we in the username field. Let's hear what password sounds like.

Announcer: [4:38] Password, secure edit text. Passwords are case-sensitive. Please provide a password.

Instructor: [4:44] We're hearing both the helper text and the error text when we get to the password field, which is exactly what we want. If we supply that value and try to submit the form again, now that error text is no longer being displayed.

[4:58] Let's make sure that we also don't hear it when we focus on the password field.

Announcer: [5:02] Password, secure edit text. Passwords are case-sensitive. You are currently on a text field.

Instructor: [5:08] **Again, we are only hearing the helper text. We're no longer hearing that error message, because it's not displaying.**
