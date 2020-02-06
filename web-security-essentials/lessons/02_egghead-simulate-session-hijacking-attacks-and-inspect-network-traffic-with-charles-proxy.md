Instructor: 0:00 Let's start up our server by running sudo npm start. On your computer, you might only have to run npm start. In my computer, in order to get an application running on port 80, which is the default port for HTTP, I have to execute the commands via Sudo. This will start our application at the following URL, localhost.charlesproxy.com. The rest of the protocol is HTTP.

0:24 If I paste that URL into my browser, you see that it displays a login form. As an attacker of this website, I know the server must be using some form of communication to provide a logged in experience for the user. Our goal will be to take a message provided by the user and replay a malicious form of that request.

0:43 If we submit this form, we can see that we'll post a message on behalf of the user. While you're maybe used to inspecting request in a Chrome DevTools, you may not know that you can also install a local proxy to log all the requests you make.

0:58 In this case, we could download Charles Proxy from charlesproxy.com. In this way, we could use Charles as an HTTP monitor. Charles Proxy is acting like a man in the middle. A man in the middle is a piece of software using malicious that sits between the client making a request and the server receiving the request.

1:19 I've taken the liberty of starting Charles while we are making those requests. I can go to this filter section and type in the URL that we're making a request to and get a complete list of the requests we made.

1:31 As you could see here, Charles has logged all the information from each of our requests. Click on Contents, I could then inspect the headers that were passed to the server upon request and from the server on response.

1:43 In this case, you could see that we've been using a cookie called connect.sid. This cookie is what's known as a session ID. A session ID is a uniquely generated string that is passed to the server and back in a cookie in order to identify the current user's session.

2:00 That is if I have this cookie and I'm an attacker, I can impersonate a user by passing along with any request. I can right click on the URL and click on Copy CURL request. This will out-paste the request to my clipboard, such like in modified here.

2:17 Let's go back and post another message so we could see what the payload looks like. Here, you could see this post has happened. I'll copy the CURL request. I'll paste it in here and now you could see that the data parameter is what allows us to specify the message that we want.

2:34 If I say Hacked as the value of the message request parameter, I can now paste this call command into my terminal. Hit Enter. If I refresh the website again, you will now see the message "Hacked" is displaying.

2:47 What this means is by using Charles Proxy as an HTTP monitor, we were able to observe HTTP that is insecure traffic, sniff the session ID, alter the message, and post on the user's behalf.
