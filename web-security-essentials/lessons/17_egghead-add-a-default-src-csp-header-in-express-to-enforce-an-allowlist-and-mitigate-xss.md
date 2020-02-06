Instructor: 0:00 Now, having learned that even though we blocked JavaScript we're still vulnerable to iFrame injection attacks, we need to take a step back and examine the problem.

0:08 The truth is the browser gives too much privilege by default. Any iFrame, script, image, font, stylesheet, video, audio, or other content from any source is allowed by default. This violates security best practice known as the principle of least privilege, which says that every program must be able to access only the information and resources that are necessary for its legitimate purpose.

0:32 Fortunately, CSP allows us to allow this principle to our application. CSP has a source called default-src, which is the source that only applied if a more specific source is not specified for the type of resource you're trying to load.

0:52 We'll specify that our default-src is none, and because we don't have an iFrame source specified here, now no iframes are allowed to be loaded. We could take our script source and abstract it and create a variable called constSelfNonSource.

1:19 We'll use that for our script-src, and because we may want to allow images, we'll also add image-src. Because we want to add style sheets, we'll have style-src, and because we want to allow fetch and XHR to work, we'll add connect-src and hit Save. What this says is that we'll allow scripts from ourselves, images, XHR, and styles from ourselves but nothing else. If a new attack was discovered in font assets tomorrow, we'd be safe.

1:55 If we log back into our site and paste in our pay load, you see that no hijack was successful. We've successfully blocked inline scripts, remote scripts, and iframes and, in fact, anything else an attacker may throw at us in the future.