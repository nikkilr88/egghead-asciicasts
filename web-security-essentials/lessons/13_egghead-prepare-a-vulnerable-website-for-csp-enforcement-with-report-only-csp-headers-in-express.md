Instructor: [0:00] In order to mitigate XSS it's important to validate and encode user input. This requires developers to constantly, reliably, and repeatedly guard all of their endpoints and is prone to failure. This is why XSS is one of the most common vulnerabilities discovered in the wild.

[0:15] **However, there is an additional way to protect against XSS called CSP, or Content Security Policy. CSP allows us to define which locations and types of resources are allowed to load and where to report violations**. Express Helmet provides a content security policy directive, which we could use by saying `helmet.contentSecurityPolicy()`, and this takes in a list of directives.

[0:45] We could say directives. **The first directive we want is to say where our scripts can load from. Our goal is to prevent inline scripts like the ones we pasted in with XSS from executing**. We'll say script source.

[1:02] This is an array where the first value is 'self'. **Self says, "Allow any script that comes from my origin." In this case, localhost.charlesproxy.com**. We'll also want to allow HTTPS.

[1:15] **The reason we want that is because we also happen to be loading jQuery from HTTPS code**.jquery.com. We can't just load from our origin, we also have to allow HTTPS.

[1:28] **CSP also allows us to specify where to report violations. In this case, we'll provide a URL of '/report-violation'**. Because we aren't sure just yet, if we have might ax and leave you blocking some other scripts that we want to allow, we're going to run in reports only mode. **What this will do is it will apply the policy, rather than block the script's only sends report**.

### index.js

```js
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'https:'"],
      reportUri: '/report-violation'
    },
    reportOnly: true
  })
)
```

[1:57] Now we'll make the report route. We'll say `app.route('/report-violation')`. **This is a post endpoint because CSP reposts information**. We'll take in the `request` parameter and the `response` parameter and we'll say `console.log` CSP violation. We'll console log the request body or the fact that we have now received any data.

[2:37] Then we'll respond with a status 200 and we'll send a text, 'ok'.

### index.js

```js
app.route('/report-violation').post((request, response) => {
  console.log('CSP Violation: ', request.body || 'No data received')
  response.status(200).send('ok')
})
```

[2:46] **Because CSP reports come in as MIME type application csp-report and because the type of data that's being posted is JSON, we need to add a body parser to our express application to parse this information**.

[3:02] We will say const `bodyParser = require('body-parser')`. In our package.json, we'll add `body-parser`. We'll save, npm install, start our server back up, go back to our index and say `app.use(bodyParser.json())`. We want to say that we want to parse to JSON type when the MIME type is 'application/csp-report'. Then fix one little typo (change `req` to `request` in the '/report-violation' route).

### index.js

```js
const bodyParser = require('body-parser')
```

### package.json

```json
"dependencies": {
  "body-parser": "^1.19.0",
  ...
}
```

### terminal

```bash
npm i
```

```bash
npm start
```

### index.js

```js
app.use(
  bodyParser.json({
    type: ['json', 'application/csp-report']
  })
)
```

[4:06] If we did everything right, we could take a malicious payload again, log back into the website, paste our malicious payload in. **Now we could see that the XSS succeeded in posting our information to evil.com**.

[4:25] However, there's also a request to report violation. **We could see that we've sent the header a content policy report only, which says our script source should be self or HTTPS with a report URI of /report violation. We'll see that it is posted the CSP report containing the information of the violation**.

[4:52] Once we've had this running in production for awhile and we've discovered that all the violations are accurate violations and there are no legitimate scripts being blocked, we can go ahead and remove report only mode.

[5:06] We'll go back over to our index file, we remove report only, we'll hit save. **If we refresh our site now again, paste in our username and password, paste in our malicious payload, we could see that no request is made to evil.com effectively mitigating inline script injection**.

### index.js

```js
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'https:'"],
      reportUri: '/report-violation'
    }
    // Remove the following line
    // reportOnly: true
  })
)
```
