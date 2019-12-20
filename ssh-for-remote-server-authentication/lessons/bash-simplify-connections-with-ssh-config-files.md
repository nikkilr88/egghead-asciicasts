Instructor: [00:01] An SSH config file is a very elegant way to connect to an SSH server. This config file provides the ability to connect to SSH servers much more simply so you don't need to remember the intricate details surrounding an SSH connection. Let's create a file at `~/.ssh/config`. SSH config files follow a very simple format. They start with a host directive, which is the host name you wish to use for this connection.

#### Terminal 

```bash
~/.ssh/config
```

[00:31] Every other directive specified within the block is optional. It allows you to fine-tune the connection details if you wish. Let's indent the following lines four spaces, and add a `HostName` directive. This directive overrides the above host value, and allows you to use any alias you wish for the above host value.

```bash
Host foo
    HostName 104.197.227.8
```

 You can now SSHing into the remote host by typing `ssh` username@hostname, but instead of typing the entire hostname when SSHing into the server, just use the alias. This is so much easier to remember.

```bash
ssh root@foo
```

[01:07] Let's see if we can make it even simpler. Go back to your SSH config file and add a user directive. This is where you can define the user you wish to connect with. You can also specify the SSH key you wish to use for this connection by using an `IdentityFile` directive followed by the location of your private key. This is useful if the SSH key you wish to use is different than the default SSH key on your machine.

```bash
Host foo
    HostName 104.197.227.8
    IdentityFile ~/.ssh/id_rsa
```
[01:35] All directives here are optional, so you can pick and choose the ones you wish to use to customize this SSH connection such as specifying the port you wish to use.

```bash
Host foo
    HostName 104.197.227.8
    IdentityFile ~/.ssh/id_rsa
    Port 22
```

When all of your directives have been set, you can SSH using just the alias specified for the host directive. The SSH client will use the SSH config file to assign all of the directives specific to the SSH connection.

![SSH config assign all directives to SSH connection](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/learn-simplify-connections-with-ssh-config-files-ssh-config.png)