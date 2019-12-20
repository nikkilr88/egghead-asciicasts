Instructor: [0:00] Once you SSH into a remote host, the server fingerprint and key are added to the `known_hosts` file within the `.ssh` folder of your home directory.

```bash
vi ~/.ssh/known_hosts
```

This file contains a list of remote servers you have connected to in the past. The file ensures you are connected to the correct server, not a fake or impersonator.

![Remote servers](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630066/transcript-images/check-and-verify-ssh-fingerprints-remote-servers.png)

[0:22] Sometimes if you try connecting to a new machine that has been assigned an IP address which you previously used to connect another server, you will get a host mismatch error. This is because the remote host fingerprint does not match the record within your `known_hosts` file.

[0:41] SSH into your remote host. What you will do next is get the SSH fingerprint of this machine. Type `ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub`. The `-l` tells `ssh-keygen` we want the fingerprint, and the `-f` tells it where to find the host's public key. This is the typical location for Linux servers. What is outputted is the fingerprint of this machine.

```bash
ssh-keygen -l -f /etc/ssh/ssh_host_ecdsa_key.pub
```

[1:21] Now exit the remote host and run the command `ssh-keygen -R` and then the remote hostname or IP. This command removes all keys from the `known_hosts` file on your local machine that belong to the specified host.

```bash
ssh-keygen -R 104.197.227.8
```

[1:38] Now when you try to connect back to the remote host, it'll ask you to confirm connecting to the remote host and will also supply you with the remote host's SSH fingerprint. You can compare the output of the remote host's fingerprint to the output of the fingerprint that we're about to connect to in order to verify you are connecting to the desired remote host.

![Connect to remote host](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1553630065/transcript-images/check-and-verify-ssh-fingerprints-connect-remote-host.png)