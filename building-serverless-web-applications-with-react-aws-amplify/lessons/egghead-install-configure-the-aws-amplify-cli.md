Instructor: [00:01] To get started, we'll install the CLI by running `npm install -g @aws-amplify/cli`. 

#### Terminal
```
npm install -g @aws-amplify/cli
```

Now that the CLI has been installed, we'll run `amplify configure` to configure the CLI with the user from our AWS account. This should open up the AWS console. Once you're logged into the console, jump back to the command-line.

```
amplify configure
```

We're next prompted to specify an AWS region. For me, that's `us-east-1`. Now we can give a username for the new user that we're about to create. I'll give mine the username of `amplify-egghead-cli-user`. 

```
amplify-egghead-cli-user
```

This should open up the IAM dashboard in our AWS account. This IAM user has some preconfigured settings that we can accept by clicking *Next Permissions*, *Next Review*, and *Create User*. Once the user's been created, we're given an access key ID and a secret access key.

![Access Key ID](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391501/transcript-images/egghead-install-configure-the-aws-amplify-cli-aws-access-key-id.jpg)

Copy the access key ID to your clipboard, jump back to the command-line and paste it into the prompt. Do the same with the secret access key.

Here we can set a profile name. I'll give the profile name a name of `amplify-egghead-cli-user`. 

```
amplify-egghead-cli-user
```

Now the CLI has been configured and we're ready to begin initializing new AWS Amplify projects.