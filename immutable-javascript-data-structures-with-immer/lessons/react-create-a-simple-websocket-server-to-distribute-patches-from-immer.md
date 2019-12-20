Instructor: 0:00 Now we need a place where we can send those spreadsheets to. For that reason, we're going to build a very a quick and dirty web circuit service that takes care of distributing all the spreadsheets to all the clients involved. For that, we create a new file, server.js. We import the web circuit server from the JS package, and we start at a specified port.

0:26 Now, we're going to keep track of two things. The first one is all the connected clients, and second one is all of the spreadsheets that were sent in the past to make sure that we can send all those spreadsheets to any new clients that arrive later.

0:42 What should happen once a connection is set up? First of all, we're going to store this new connection in our connections. Secondly, where we are going to send it, the complete history, of all the spreadsheets we saw so far.

1:03 There's a little bit of housekeeping to do. There's a creating of the connection once the client is disconnected. The more interesting part is what should happen if new message arrives.

1:17 If new message arrives, we saw it in history. We're going to loop over all the connections that are currently established and freeze off the clients, which isn't the client that is now sending the message. We do send it, the message, so that everybody receives that message. Next thing is to make sure that we have a start command. Now we can start the server.

1:50 The next thing is that we need to be able to send messages to the server. For that reason, any project is included as small react hook called use sockets. I'm not going to elaborate in detail on how this use socket hook works because it is mostly React-related questions on management around the connection.

2:11 Its API is pretty straightforward. It takes a URL to connect to. It takes a callback, which is called for every message that is received in the future. Beyond that, it also returns something. It returns a function which we can use to send messages to the socket.

2:32 Let's try that. If we now press some of the buttons in our demo, we see that those patches nicely arrive at a server.

