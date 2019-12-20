Instructor: [00:00] Once you have generated your SSH private and public keys, the next step is to copy the public key to the remote server you wish to authenticate against. There's a simple helper command that makes this really easy, called ssh-copy-id. Let's `ssh-copy-id` followed by the user name that you which to SSH as, followed an `@`, followed by the IP address or the host name of the remote host. You'll most likely be prompted for a password.

#### Terminal

```bash
ssh-copy-id root@104.197.227.8
```

[00:32] Once you type in your server password and hit enter, the SSH key will have been copied to the remote server. To confirm you can ssh into the remote server with your SSH key and without a password, just type `ssh` username@remotehost and hit enter. You should now be SSHed into the server without being prompted for a password.

```bash
ssh root@104.197.227.8
```
![Server with no password prompt](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/learn-copy-an-ssh-key-to-a-remote-server-using-ssh-copy-id-no-password-prompt.png)

[00:56] Since `ssh-copy-id` is just a helper script, let's find it what it's actually doing in the event we want to manually add keys for authentication in the future. After SSHing into the remote host, go into the `.ssh` folder within your home directory. Within that folder will be a file named `authorized_keys`. This file contains a list of public SSH keys which have been granted access for authentication. We can see that our public SSH key has been added to this file.

![Public key added to authorized_keys](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/learn-copy-an-ssh-key-to-a-remote-server-using-ssh-copy-id-public-keys-added.png)

[01:29] To allow another to authenticate to the server, just copy and paste their public SSH key into this file and save it. Once complete, the user that has access to the associate private key will then have access to connect to this host machine.
