Now that we've installed and configured the CLI, let's create a new React application, and then initialize a new Amplify project within the React application.

To do so, we'll use `create-react-app` to create a new React application called `my-amplify-app`. Once the new React application has been created, let's change into the new directory.

#### Terminal 
```
npx create-react-app my-amplify-app
cd my-amplify-app
ls
```

From within the new directory, we'll run `amplify init` to initialize a new Amplify project. We'll then be prompted for a few options. For the default editor, I'll choose Visual Studio Code. For the type of app we're building, we can choose JavaScript. For the framework we're using, we can choose React.

The source directory can be left as source. The distribution directory, build. The build command can be left as build. The start command can be left as start.

![Amplify Init](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391503/transcript-images/react-native-create-configure-an-aws-amplify-project-with-a-react-application-amplify-init.jpg)

Next, we're given the option to choose an AWS profile. Here, we can choose the profile that we created when we configured this CLI.

Now, our Amplify project has been initialized. We should now see a `.amplifyrc` file, as well as an Amplify folder, in our root directory.

![Root Directory](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391501/transcript-images/react-native-create-configure-an-aws-amplify-project-with-a-react-application-root-directory-files.jpg)

The last thing we need to do is install the AWS Amplify and AWS Amplify React Client Libraries into our React application.

To do so, we can either use npm or yarn to add `AWS Amplify` and `AWS Amplify React`.

```
yarn add aws-amplify aws-amplify-react
```

[01:53] Now the react app has been configured and the Amplify project has been created, and we're ready to begin adding new features.
