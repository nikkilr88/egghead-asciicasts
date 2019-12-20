To add hosting, we can run `amplify add hosting`. For the environment setup, we can either choose dev for S3 with HTTP or prod for S3 with HTTPS with CloudFront distribution. I'll choose `DEV`.

#### Terminal 
```
amplify add hosting
```

Next, we're prompted for the bucket name. Give the bucket a unique `name`. For the index doc and the error doc, we can choose `index.html`.

To deploy our new setup, we can run `amplify publish`. 

```
amplify publish
```

Once the deployment is complete, our app should launch in a new window. If we open the URL, we see that the app is indeed running from our S3 bucket.

![Deployment](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1549391504/transcript-images/egghead-deploy-your-react-application-to-aws-using-the-amplify-cli-final-deployment-of-app.jpg)
