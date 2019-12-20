Instructor: [00:00] To SSH into a remote host we will use the `ssh` command. When using the SSH command followed by just the IP address or host name the command will assume the same user name of your host machine for authentication. That's usually not what is desired.

#### Terminal

```bash
ssh 104.197.227.8
```

[00:17] To use a specific user name prefix the remote host name with the desired user name followed by an `@` symbol.

```bash
ssh root@104.197.227.8
```

This is the standard way to SSH into a remote host. Most times this is all that is needed to authenticate. Sometimes SSH servers will block connections on the default port 22 for security reasons and bind the SSH server to a different port.

[00:40] Let's assume the SSH server is bound to port 2022 instead of port 22. We add a `-p` flag followed by our port number `2022`. Another command flag that is important is the `-i` flag. The i stands for identity and allows us to specify a different SSH key to authenticate with. This makes it possible to set up any number of different SSH keys to connect to any number of different hosts.

```bash
ssh -p 2022 -i ~/.ssh/another_key root@104.197.227.8
```

[01:10] SSHing into a remote host drops you right into a bash shell, but you may just want to run one command and immediately exit. Instead of dropping a newer bash shell you may specify a command to run after typing in your connection string. This allows you to run one-off commands, a quick bash script, or anything else you wish without needing to create and stay within an SSH session.
