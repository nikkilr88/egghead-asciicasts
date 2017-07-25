The node net module provides an asynchronous wrapper for the network and we include that with a require statement. With that included, we can create a server object, which has a callback with a parameter of C.

Then, right away, we want to write out, to the console, a message that a client has connected.

The create server uses event listeners to control its operation, so we need to listen for those. The first one that we want to listen for is the data listener. When we receive that we're going to have another call back that takes a parameter D and it's going to write out data received. Then it will also write out the data that we received. Since that comes in as a buffer, we're going to use the two-string method.

The other listener we want to listen for is the end listener. Again, taking a call back and it's going to write out, to the console, that our client has disconnected.

That's all we need to do to get a basic server up and running, except to actually turn it on. To do that, we're going to use the server.listen. That takes a couple of parameters to make it work. The first one is the TCP port that it's going to listen on. We're going to use port 3000.

Next is an optional parameter, which is the IP address that you want it to listen on. You can provide a specific IP address here or you can provide 0.0.0.0 and that's going to cause it to bind to all interfaces on this server. That also happens to be your default, so if you provide nothing at all, it's going to bind on all interfaces.

Another thing you can here is access environment variables on your server. For instance, if you had an environment variable called address, you could grab that here and it would bind to whatever IP address was stored in that environment variable.

For our demo, we can just accept the defaults and then we can call a call back and that call back is just going to write out to the console that the server has started. That's enough to get us going.

If we save that we can actually start our server up by calling the node command and then providing the name of the file we were just editing. You see, right away, we get server started printed out to the console, which was triggered in our listen method here.

Now let's use Telnet to connect to local host on port 3000. As soon as we connect, we get the client connected message, which was fired from right here. Then as we type in data, that data is received and printed out to the console, and that was a result of receiving data through the data listener.

Then finally, if we exit our Telnet session, we get our client disconnected message, which was fired from the end event listener.