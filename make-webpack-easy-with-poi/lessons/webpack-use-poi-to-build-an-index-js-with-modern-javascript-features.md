Install Poi globally, so NPM install global poi. Then we can go into our project, create a new file. We'll call it index.js, and inside of this file, we'll just create a document, getElementByID. Poi creates a div that has an ID of app, so we can grab that, write out to the inner HTML, just a string of H1, "hello world."

Then, in my terminal, run Poi. It copies this to the clipboard, so I can go ahead and paste that there, hit enter, and you see "hello world." Because Poi handles all of the webpack stuff for me, I can install things like RxJs, and then, right away, just import from RxJs.

I'll import observable, and say observable interval every one second, then subscribe. We'll write out this count that will go up, move this into here, and show the count. We'll hit save, and it automatically starts counting up.

If I want to, I can create a folder called something like Source, move that in here. It'll fail to compile now because I need to stop it and say Poi now needs to compile source index. Now we're fine. It'll rerun and start up again.

Or, if I want to open it on a different part, I can do the same, --port, and, say, 4001, and that'll compile. Copy this to the clipboard, paste it in here, and you see we're still running.