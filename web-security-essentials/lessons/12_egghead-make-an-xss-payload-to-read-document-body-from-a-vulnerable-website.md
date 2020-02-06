Instructor: [0:00] We stopped our attacker from stealing the session cookie, but we haven't mitigated XSS in general. This is the important point. In the previous lesson, we stopped a specific type of XSS attack, but left another door wide open.

[0:15] If we look at our site, we could see that it also displays a bunch of information when logged in. It displays the username and it displays their social security number. Our attacker can swap out `document.cookie` for `document.body.innerText`, which will print the entire text of the web page.

### payload.html

```js
const payload = encodeURIComponent(document.body.innerText)
```

[0:32] If we save our payload, paste it into the form and hit submit, we could see that the request has gone out to our payload endpoint which contains the user's social security number. These proves that it wasn't `document.cookie` that was our problem. Although fixing that was important, but truly, XSS is the thing we must mitigate.
