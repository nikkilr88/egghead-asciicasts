There are a set of state pseudo-classes that are designed to work with form elements and interactions. Similar to link pseudo-classes, these add some interaction without adding any JavaScript that are not explicitly declared in the DOM.

Let's take a look at the mark up. 

### HTML
```HTML
<form>
  <fieldset>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" class="text">
  </fieldset>
  <fieldset>
    <label for="zip">Zip*</label>
    <input type="text" name="zip" id="zip" class="text" pattern="^[0-9]{5}(?:-[0-9]{4})?$" required>
  </fieldset>
  <fieldset disabled>
    <label for="city">City</label>
    <input type="text" name="zip" id="city" class="text">
  </fieldset>
  <fieldset>
    <input type="radio" name="type" id="home" value="home">
    <label for="home">Home</label><br>
    <input type="radio" name="type" id="office" value="office">
    <label for="office">Office</label><br>
    <input type="radio" name="type" id="narnia" value="narnia">
    <label for="narnia">Narnia</label>
  </fieldset>
</form>
<div> <em>* required</em></div>
```

I have a `<form>` with some field sets to group things together. I've got some `<label>`'s. This is an input of type email. This one is of type `text`. It has a `pattern` on it to actually validate the value as the user types it in. This has `required` attribute.

This `<fieldset>` for city is `disabled`, so I can't actually put my cursor in there. I can't give it focus. This `<fieldset>` is just a `radio` group. 

Now, let's add some styles. I'm going to start with the `fieldset`, because it is ugly. I'm going to start by removing the `border` and the `margin`. I'm going to add some `padding` just to make it easier to read. 

#### CSS
```css
fieldset {
    border: none;
    margin: 0;
    padding: 8px;
}
```

Now, all of the text inputs have different types, so I added a `.text` class to all of them, and we'll use that to change the `border` color a little bit.

```css
.text {
    border: 1px solid #bbb;
}
```

When these `inputs` have focus, you get a blue outline. To change that, I'm going to use the `focus` pseudo-class on all the inputs. Then, I can remove that `outline` and I'll replace it with a `box-shadow`. That gives it a little depth. I'm going to go ahead and change the `border` as well.

```css
input: focus {
    outline: none;
    box-shadow: 3px 3px 1px rgba(0,0,0,0.2);
    border: 1px solid rgba(0,0,0,0.5)
}
```

As I clicked through these, you can see that shadow on email and zip. City is still disabled, so I cannot give it focus. To make that more obvious, I can use the `disabled` pseudo-class on the `fieldset` and change the opacity, so that it looks great out when it's disabled. There is also an `enable` pseudo-class if I wanted to directly target all of the enabled items.

```css
fieldset:disabled { /* :enabled opposite */
    opacity: 0.5;
}
```

Let's add some styling to these radio buttons. I'm going to use the `checked` pseudo-class to target the checked item, and use the sibling selector for `label` which will enable me to style the label of the select item. I'm going to go ahead and change the `font-style` to `italic`. 

```css
input:checked + label {
    font-style: italic;
}
```

When I go through and click the radio buttons, you can see that label changes on each one to be italic. 

I can also use the `invalid` pseudo-class to make it more obvious to the user that what they are typing in the text `input` is invalid. I can set the `border-color` to `red`, which you can see here will actually make this zip turn red, because it's invalid to leave it blank, because it is required. 

```css
input:invalid {
    border-color: red;
}
```

I can also use the input `valid` opposite pseudo-class to change the `border-color` to be `green`, which will change the email field, since it doesn't have that required attribute, so it's OK to be a blank.

```css
input:valid {
    border-color: green;
}
```

If I want to go ahead and differentiate those required fields, I could use the `required` pseudo-class. Here, I can actually use `border-width` and make it just a little bit thicker. I should say that there is also an `optional` pseudo-class, if you needed to target all the optional items.

```css
input:required {
    border-width: 2px;
}
```

We've looked at how we can use some state pseudo-classes to target specific interactions from the user. Hopefully, we can use those to make it a little bit more obvious to the user what they need to change or what they need to do as going through filling up the form, before they submit it.