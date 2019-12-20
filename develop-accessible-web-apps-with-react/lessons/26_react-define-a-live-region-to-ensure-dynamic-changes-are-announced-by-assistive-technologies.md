Instructor: [0:00] Here, I have a form that has an issue concerning accessibility. This form has validation. Each of these fields is required. If we try to submit the form without filling in either of these fields, we'll get an error message letting us know that we need to provide a value for each field.

![Movie wishlist login form errors shown](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/26-form-errors.jpg)

[0:16] **The problem with this is that these error messages are not read to assistive technology users, unless they're actually focused on the field at the time, but our form validation isn't triggered until we click the login button.**

[0:29] At that point in time, we're focused on the button, so the user's not going to know to go back to each field to hear the error message. They're not going to know that anything was wrong, and they're not going to know why the form isn't submitting, and they're not moving to the next page.

[0:43] Let's demonstrate that. I'm in Safari, and I'm going to use the VoiceOver screen reader. If I move all the way through my form without filling in any of the fields, and I press the login button...

Announcer: [0:53] Press login button.

![Press login button read on form submit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576599778/transcript-images/26-form-press-login.jpg)

Instructor: [0:55] nothing was read. We weren't notified in any way that there were any problems with either of our fields. Nothing is telling us that we're still on the login form or there's anything more we need to do.

[1:06] There's a way we can fix this. Let's take a look.

Announcer: [1:08] VoiceOver off.

Instructor: [1:10] Here is our `FormInput` component. Here's our input, and here is our `errorText`. **We can add an attribute to this containing element that has the `errorText` in it that notifies assistive technologies that, if any changes are made to the content of this element, they should be announce, even without the user having to be focused on this element.**

**FormInput.js**
```js
const FormInput = ({ ... }) => {
  ...
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        className={inputClasses}
        onChange={onChange}
        aria-required={isRequired}
        aria-invalid={!isValid}
        aria-describedby={`${helperId} ${errorId}`}
      />
      { helperText &&
        <small id={helperId} className="form-text text-muted helper-text">
          {helperText}
        </small>
      }
      { errorText &&
        <div
          id={errorId}
          className="invalid-feedback"
        >
          {errorText}
        </div>
      }
    </div>
  );
};
```

[1:36] **That's called `aria-live`.** `aria-live` has three possible values. It could be off, it could be `polite`, or it can be `assertive`. **The difference between `polite` and `assertive` is that `polite` will wait until the screen reader is done reading whatever it currently is reading before it will go ahead and announce the change to this element.**

[1:56] **aria `assertive` will interrupt whatever the screen reader is currently reading to announce the change.** Additionally, with `aria-live`, there are two other attributes that are useful. There's `aria-atomic`, and its values are either `true` or `false`.

```js
<div
  id={errorId}
  className="invalid-feedback"
  aria-live="asertive"
  aria-atomic="true"
>
  {errorText}
</div>
```

[2:10] It defaults to true, and this defines whether the screen reader should always present this element as a whole anytime there are any changes made to it, even if only part of the content's changed. True means it will always present the entire contents of the element marked as `aria-live`.

[2:27] Finally, there's `aria-relevant`. This can take a list of values that include `additions`, `removals`, and `text`, or all. `additions` means that, if any nodes are added to the content of the `aria-live` element. Right now, we just have text.

```js
<div
  id={errorId}
  className="invalid-feedback"
  aria-live="asertive"
  aria-atomic="true"
  aria-relevant="additions text removals"
>
  {errorText}
</div>
```

[2:46] Imagine we had some child elements in here within the div. If any of them were added, then by specific additions in `aria-relevant`, those additions would be announced. Similarly, with `removals`, if any elements are removed from the `aria-live` region, those would be announced.

[3:02] Finally, `text`. If any text contents of the `aria-live` element are changed, those are announced. By default, `aria-relevant` is always `additions` and `text`. These (`aria-atomic` and `aria-relevant`) are implicit if we have an element marked as an `aria-live` region, so we don't need to specify them if we're using the default values.

[3:22] Finally, one important rule of defining a live region is that **the element needs to already be in the DOM before its content changes, and it needs to already be defined as a live region.** That's in order for the assistive technology in the browser to be aware of it, know it exists, and be able to watch it for changes.

[3:42] If we dynamically add this entire div element, and or we add the attribute defining it as a live region after the initial render, then it's not always likely to work for all assistive technologies equally. We've already got this conditional checking for if we have `errorText`.

[3:59] The way we define that here in our form, we always pass in the `errorText`. Whether the field is valid or not, we're going to provide that value. It should always exist in the DOM, whether it's valid or not. I have some CSS that will hide this element visually if the form is valid, but we want to actually register changes to the content of the element.

[4:24] We don't want the `errorText` to exist in the element until we actually have an error, so that we can make sure our `aria-live` picks up that content change and reads it. Let's add a conditional here. Only if not valid should we return the `errorText`. Otherwise, empty string.

```js
<div
  id={errorId}
  className="invalid-feedback"
  aria-live="asertive"
  aria-atomic="true"
  aria-relevant="additions text removals"
>
  {!isValid ? errorText : ''}
</div>
```

[4:42] Now we need to decide, should this value be `assertive` or `polite`? Let's try this out with assertive and hear how it works. If I go ahead and move down to the login button and submit the form without filling out any of these fields, let's hear what it says.

Announcer: [4:56] Please provide a password. You are currently on a button. To click this button, press control-option-space.

Instructor: [5:02] What happened is interesting. When I clicked the login button, it ran the form validation, and we presented our errors, "Please provide a password," was read immediately, and it interrupt the screen reader from finishing reading about letting us know that we are currently on a button.

[5:16] **That was good, but we never heard, "Please provide a username." What the screen reader was doing was it actually interrupting itself. Before it even had a chance to read, "Please provide a username," it interrupted itself to say, "Please provide a password."**

[5:30] We only heard the last live region on the page. `assertive` seems to be a little too aggressive in this scenario. There may be cases where we have one error message. Maybe it's a page-level error or alert of some sort, and that might make sense to be `assertive`.

[5:48] Something like this, where we might have multiple at the same time, it seems like `assertive` is going to interrupt itself so much that we don't hear all of the messages. Let's hear what that sounds like if we change it to `polite`.

Announcer: [6:04] Press login button. Please provide a username. Please provide a password.

Instructor: [6:09] This time, it announced both changes, "Please provide a username, please provide a password." We heard both of those read, and that's exactly what we want. Now, the user can tell that they have some issues with the form that they need to go fix.
