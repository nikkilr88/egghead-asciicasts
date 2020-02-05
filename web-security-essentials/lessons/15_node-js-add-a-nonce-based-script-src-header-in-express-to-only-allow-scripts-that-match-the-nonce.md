Instructor: [0:00] Now, even though we've blocked in land script tags in document.cookie, we still find ourselves vulnerable to remote script inclusion. If we inspect the request in our content security policy, our problem is we're still accepting any old HTTPS connection including from evil.com.

[0:18] We could fix this by changing this to code.jquery.com just to allow jQuery to load. Now we have to maintain an allow list every time we have a new third party script. It turns out there's a better way using nanses.

[0:33] First we'll say const crypto = require('crypto'). Crypto is a built in node module. No need to install an NPM package. We'll add a piece of middleware.

[0:47] This piece of middleware will say function(request, response). Next, we'll say response.locals.nans = crypto.randomBytes(16).toString(hex) and then we'll call next.

[1:18] What this will do is it will add a local variable called nans that is a 16 byte random string cast to hexadecimal, which is enough entropy to basically make our nans unguessable.

[1:32] We can unused these nans in our content security policy which allows us to take in a callback. We'll say request, response over here and we'll print out a string starting with a single quote nans- followed by response.locals.nans and ending with a single quote.

[1:58] We can now copy this value. Go over to our jQuery script and say nans = and paste in our value and hit save.

[2:12] We now should be able to log back into our site. We can see the jQuery still loads. If we inspect our source, we could see that jQuery includes a nans attribute, which is our random string and our CSP header contains the same string.

[2:32] That is if your CSP policy contains nans- followed by a string, it then expects scripts to have that same nans attribute with the same string. If we take our malicious hacker payload and paste it in now, there's no way that the hacker could guess what the nons would be on any page load.

[2:53] Even if the hacker were to guess the nons, it would only work for one page load ever and never again. We could verify this by pasting the payload in, hitting submit and seeing that the request to hightop.js was blocked.
