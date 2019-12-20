Instructor: [00:00] Let's say you are on a network connection which is blocking access to a specific website. You can easily get around this with an SSH tunnel and local port forwarding. The `-L` flag is what tells SSH to open a local tunnel.

#### Terminal 

```bash
ssh -L 
```
[00:16] The value of this flag is the local port you wish to use for the tunnel, followed by a colon, followed by the website host you wish to access, followed by a colon, and finally, the value of the port you wish forwarded.

```bash
ssh -L 8000:yahoo.com:80
```

[00:29] In this example, you will forward the local port `8000` over to `yahoo.com` on port `80` of the remote host. Lastly, specify the SSH server you wish to tunnel the connection through. This is the server where the final request will be passed through.

```bash
ssh -L 8000:yahoo.com:80 mark@myhost.com
```
[00:48] When you try to access `yahoo.com` on your local machine, what happens here is that the request on port `8000` under local machine is being passed to the remote host, and then to `yahoo.com` on port `80` of the remote host. The result is then forwarded back to our local port and host.

![Forwarded to local port](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/onfigure-local-and-remote-port-forwarding-with-an-ssh-tunnel-fowarded-local-port.png)

[01:07] You can use this method to get around intranet firewalls, as well as connecting to blocked remote services.

[01:13] Note that the SSH tunnel is keeping the terminal window open. If you specify a `-f` flag, it tells SSH to run in the background, and a `-N` does not open a shell window. Since the SSH tunnel runs in the background, you can look up the process by using `ps aux`, piped to `grep`, followed by `ssh` or the port or the tunnel.

```bash
ssh -f -N -L 8000:yahoo.com:80 mark@myhost.com

ps aux | grep ssh
```

![SSH tunnels](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/configure-local-and-remote-port-forwarding-with-an-ssh-tunnel-ssh-tunnels.png)

[01:40] To kill the tunnel, use the `kill` command, followed by the ID of the running process.

```bash
kill 34819
```
[01:46] Another way to use SSH tunnels is to forward remote ports. This will forward connections on a remote host back to our local host machine. This is useful if a user wants to access your local host machine but, for one reason or another, is unable to connect directly to it.

[02:05] Note that remote port forwarding is disabled on SSH servers by default, so you need to edit the SSH t config file. It is typically located at `/etc/ssh/ssht_config`.

```bash
ssh root@myhost.com

vi /etc/ssh/ssht_config
```
Once open, set the gateway ports configuration value to yes,

![Gateway ports configuration](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/configure-local-and-remote-port-forwarding-with-an-ssh-tunnel-gateway-port-config.png)

then restart the SSH server by running `service ssh restart`.

```bash
service ssh restart
```
[02:34] The command to establish an SSH tunnel is similar to before, but you use a `-R` flag rather than a -L flag. The first value defined is the port you wish to listen to on the remote host. Port `8000`, followed by `localhost`, followed by the local port that requests should be forwarded to, in this case, `3000`.

```bash
ssh -R 8000:localhost:3000
```
[02:57] Then, of course, specify the SSH connection string of the remote host to use for the connection. Now if you load that URL on the remote host or IP on port `8000`, it will tunnel requests to port `3000` on a local machine.

```bash
ssh -R 8000:localhost:3000 mark@myhost.com
```