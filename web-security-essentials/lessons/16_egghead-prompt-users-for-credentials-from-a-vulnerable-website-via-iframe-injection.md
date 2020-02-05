Instructor: [0:00] Now that we've blocked all JavaScript execution except from infected sources, let's put our attacker hat back on. JavaScript isn't the only type of possibly malicious content we can inject onto our target site. We could use iFrames. We can start with a hijacked script and save it as a new file.

[0:18] We'll call this steal.html and we'll place it back in the script tag again. However, instead of trying to take the body of the document, we're going to prompt the user for the username and password. We can go back to our payload and instead of a script tag, we can add an iFrame. We'll say steal html and we'll make this a hidden iFrame so the user can't see it.

[0:58] We'll log back into our site. We'll paste in our payload, hit submit.

[1:08] Now, you could see it says an embedded page at evil.com says, but if I would be clever, I could change my URL to be localhost.charlesproxy with a zero instead of an O .com. The user might not notice.

[1:22] User now enters in their username and password here, believing it to re-prompt from the target site rather than from a malicious site, hits OK. We could see that the hijack has succeeded again, stealing my username and password.
