Jason Lengstorf: 0:01 To do the next step, we actually need to get some Twilio credentials. We're going to head over to [twilio.com](https://www.twilio.com). We'll sign up for new account.

0:08 I am going to go ahead and fill out this form. Add in my name, put in an email, and we'll put in a password. Accept those terms and we'll get started.

![twilio signup form](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-an-access-token-for-users-with-twilio-serverless-functions-sign-up-form.jpg)

0:19 I'm going to head over and verify my email. After clicking the verify email, it's going to ask us to verify a phone number. I do not want to be contacted, so I am just going to verify. It sends us a verification code, which I am going to enter in.

0:38 Now, I am just going to skip all these and go straight to the **console**. I click "I do write code". We're going to be using **Node**. We're going to skip to the **dashboard**.

![Twilio dashboard](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-an-access-token-for-users-with-twilio-serverless-functions-twilio-dashboard.jpg)

0:52 The first thing we need to do is get an API key that we can use with our severless function. Twilio is going to be powering all of our video. In order to use it, we need to get an API Key.

1:03 We'll go to **settings**. Then, **API Keys**, and we're going to **create a new API Key**. We'll say **egghead**. It's a **Standard** API Key, so we're going to create that.

![creating a twilio api key](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-an-access-token-for-users-with-twilio-serverless-functions-twilio-api-key-creation.jpg)

1:15 Now, we need to copy this **SID** and the **Secret**. We're going to use these inside Twilio itself, but for now, we're just going to put these somewhere so that they're easy for us to get.

1:29 Once we move away from this screen, we're never going to be able to see the secret again. After we have the API Key, we're going to create a serverless function in Twilio. To find that, we're going to go to **all products and services**, and we're going to scroll on down to **runtime** and find **functions**.

![twilio sidebar runtime functions](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-an-access-token-for-users-with-twilio-serverless-functions-runtime-functions.jpg)

1:47 To make this easier to find, we can click this **pin to dock** button. Now, if we collapse this, we can see that it's right up here.

1:53 Let's click into **functions**. We're going to go into **configure**. We need to make three changes here. The first, we're going to **Enable ACCOUNT_SID and AUTH_TOKEN**. We need to be able to access those inside of our function.

2:07 Second, we need to add an `API_KEY` and an `API_SECRET`. We're going to use the values that we got from our Twilio `API_KEY`. We can save those.

2:22 Then, we're going to head back to **manage**, and we're going to create a function using the **blank** template up here. Click create, and we're going to name this function *Create Room Token*.

![blank template](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-an-access-token-for-users-with-twilio-serverless-functions-blank-template.jpg)

2:37 We'll also give it a path of `/create-room-token`. We need to copy this path because we're going to use it later.

2:47 We do not need to **check for valid Twilio signature** that's if we're using different features of Twilio. We also don't need any events because we're doing something custom here. We can just delete everything inside of the `function` block in the **Code** textarea because we don't need it.

3:01 The first thing we need to do is get out those environment variables that we set before. Let's grab out the `ACCOUNT_SID`, the `API_KEY` and the `API_SECRET` from `process.env`. We also are going to get out `AccessToken` and this is going to come out of the `Twilio` global.

### "Code" Textarea
```js
exports.handler = function(context, event, callback) {
  const { ACCOUNT_SID, API_KEY, API_SECRET } = process.env;
  const AccessToken = Twilio
}
```

3:22 `Twilio`, because we're using their functions is going to give us access to a couple globals one of which is this `Twilio` object. That has a whole bunch of helpers on it. We're specifically going to use the JSON Web Token or `jwt` and the `AccessToken` to help like factory.

### "Code" Textarea
```js
exports.handler = function(context, event, callback) {
  const { ACCOUNT_SID, API_KEY, API_SECRET } = process.env;
  const AccessToken = Twilio.jwt.AccessToken
}
```

![functions configuration](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1576277267/transcript-images/gatsby-generate-an-access-token-for-users-with-twilio-serverless-functions-functions-configuration.jpg)

3:40 What this will do is allow us to generate an `AccessToken`. We also need to set the `VideoGrant`. We'll do that using the `AccessToken.VideoGrant` factory. We start by just initializing that `grant` with `new VideoGrant` and then we're going to get a new `token` using `new AccessToken`.

4:05 We need to pass in the `ACCOUNT_SID` the `API_KEY` and the `API_SECRET` as arguments. Then, we're going to set the `token.identity` to the `event.identity`. This is going to be passed in by the call to the function so we'll actually receive this is an argument. This is going to be the user's identity, what they want to go by.

4:30 Then we need to add that `grant` and the `grant` is just a way for us to say, "Is this person, is this token allowed to use the video functionality?" We're saying, "Yes."

4:41 Next we need to set up a `response`. Our `response` is going to be a `new Twilio.Response()`. That's just some convenience methods for returning a valid response object.

4:53 Because we want this to be available from any domain, we're going to enable cross origin requests so we need to set up some headers for that. We'll use `response.setHeaders` and set `'Access-Control-Allow-Origin':` and we'll allow any origin.

5:13 We will also and copy and paste a little bit of this. We will allow `'-Methods'`, the only method we want to allow is `POST`. We need to allow only the `'Content-Type'` header.

5:29 Finally, we're going to set the `'Content-Type'`, and we'll set it to `'application/json'`. Then, we need to send back the body. The response is just going to be our `token`.

5:41 We need to convert that to a JWT, so a JSON Web Token. We'll look at what that looks like in just a minute here.

5:49 Our last step here is to actually send a response. To do that, we'll use this `callback()` function that comes in from our serverless handler. The first argument is an error.

6:00 We didn't get an error, so we're going to pass `null`. The second argument is the actual `response`. This is a pretty standard pattern for sending callbacks.

### "Code" Textarea
```js
exports.handler = function(context, event, callback) {
  const { ACCOUNT_SID, API_KEY, API_SECRET } = process.env;
  const AccessToken = Twilio.jwt.AccessToken;
  const VideoGrant = AccessToken.VideoGrant;

  const grant = new VideoGrant();
  const token = new AccessToken(ACCOUNT_SID, API_KEY, API_SECRET);

  token.identity = event.identity;
  token.addGrant(grant);

  const response = new Twilio.Response();

  response.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  });

  response.setBody(token.toJwt());

  callback(null, response);
};
```

6:08 Once we've got this set, we can hit save. We'll see that it's deploying, and now it's successfully updated.