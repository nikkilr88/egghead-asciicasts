Instructor: [0:00] Once again, we have our site running and it's still running on HTTP and not HTTPS. That means it's still vulnerable to man-in-the-middle attacks.

[0:09] That is if we refresh this page and look in Charles, we can still see that our session ID cookie is being passed back and forth in the request. To prevent this, we'll switch over from HTTP to HTTPS.

[0:26] First, we'll install the HTTPS localhost package. What this will do is it will allow us to replace our express server that serves traffic over HTTP with one that serves it over HTTPS. It does this by not only enabling a protocol, but it goes to the process of adding a local certificate such that Chrome won't give any security warnings once it's setup.

[0:53] I've added this start package JSON and I'm going to go ahead and run npm install again.

[1:00] Now I could switch over to our index.js file and copy the import of express and replace it with an import of localhost. Because HTTPS runs on port 443, we'll change the value of the port variable here.

[1:20] Next, instead of instantiating a express server, we're going to instantiate a localhost server, which is just a version of express that runs on HTTPS. We have to specify what our domain name is, which is still localhost.charlesproxy.com. Lastly, just for good measure, we'll output that the users should open up HTTPS instead of HTTP.

[1:42] If we save that, we could start our server back up with pseudo npm start. Now our traffic should be running on HTTP. If I copy this URL, paste it in here, we can see that we now have the nice lock.

[1:59] Again, this package, HTTPS localhost, has taken care of setting up an immediate certificate for us such that we get a nice HTTPS experience without seeing the unsecure site warning typically accompanying this local HTTPS development.

[2:15] Now that we've installed HTTPS, we can go back to charlesproxy. We can now see that it has an HTTPS entry. When you look at the URL, it says unknown URL. If you look at the contents, you could see that it has a bunch of encrypted data with the inability to extract the session ID cookie.
