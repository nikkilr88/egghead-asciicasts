Instructor: 00:00 Using a lambda function, we want to write data to a DynamoDB table. We remove our `helloWorld`, including its `handler`, and create a new one called `createTodo`. We provide the `handler` and the `http` event.

00:14 There is one thing missing, though, in this configuration to make it work. By default, a lambda function is not allowed to interact with the table. We need to give our lambda functions access. To do so, we need to use an identity and access management, short `iamRole`.

00:33 Under the hood, the serverless framework already attaches an `iamRole`. Using the  `iamRoleStatements` syntax, we can extend the permissions for this specific `iamRole`. We allow that our functions can execute the `action` `dynamodb:PutItem` on our table resource.

00:51 The `Resource` has to be provided as an Amazon resource name, or short `arn`. For DynamoDB, it starts with `arn:aws:`, then the service, the region, the account ID, resource time, and the resource. While in examples you'll often see an asterisk used as a wildcard, I recommend you to lock down the permissions as much as possible for a tighter security.

#### serverless.yml
```yml
service: my-app

provider:
  name: aws
  runtime: nodejs8.10
  iamRoleStatements:
    - Effect: Allow
      Action: 
        - dynamodb:PutItem
      Resource: "arn:aws:dynamodb:us-east-1:853182604221:table/todos"
```

01:19 Now, we are missing our handler. Let's create the file, `create.js`. 

#### Terminal
```bash
$ my-app touch create.js
```

In there, we add our function. Here, we can pass the provided body as `JSON`, and `return` a response.

#### create.js
```javascript
module.exports.run = async (event) => {
  const data = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

01:44 In order to interact with DynamoDB, we can import `const AWS = require("aws-sdk");`, and instantiate the document client, `const client = new AWS.DynamoDB.documentClient();`. There is no need to install it, since the lambda ships with it. We create the parameters, `params` for DynamoDB put, containing `TableName:`, and the `Item:` we want to store.

02:08 Then we invoke `put` on the `client` with these parameters. We use `await` to make sure the code doesn't proceed until the request finished successfully. In case of a failure, the function would arrow with a status code 500.

```javascript
const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.documentClient();

module.exports.run = async (event) => {
  const data =JSON.parse(event.body);
  const params = {
    TableName: "todos",
    Item: {
      id: "abc",
      text: data.text,
      checked: false
    }
  };

  await client.put(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
```

02:23 In case we would want to have a custom error message, we could wrap it with a try-catch statement. There is one more thing we need to fix about this code. Storing every item with the same ID will not lead to the expected results.

02:37 Let's use the UUID package from npm to generate the new ID on every request. Therefore, we add a minimal `package.json`, 

#### Terminal
```bash 
$ my-app touch package.json
```

#### package.json
```json
{
  "name": "my-app",
  "private": true
}
```

and run `npm install --save uuid` to install the package. 

#### Terminal
```bash
$ my-app npm install --save uuid
```

We then can import the module into the `create.js` file and use its uuid function.

```javascript
const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const client = new AWS.DynamoDB.documentClient();

module.exports.run = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'todos',
    Item: {
      id: uuid(),
      text: data.text,
      checked: false
    }
  };
};
```

03:09 Now we've got everything in place and can deploy again. As mentioned in the previous lesson, the serverless framework creates a ZIP. In this case, it will actually include the local node modules as well. Once deployed, we can use curl again, and create the todo, `curl -X POST https://zm7tuyj33a.execute-api.us-east-1.amazonaws.com/dev/todos --data '{ "text": "learn serverless" }`.

![use curl again and create the todo](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Develop%20a%20Serverless%20Backend%20using%20Node.js%20on%20AWS%20Lambda/original_node-js-deploy-an-aws-lambda-function-to-store-data-in-dynamodb-using-the-serverless-framework/node-js-deploy-an-aws-lambda-function-to-store-data-in-dynamodb-using-the-serverless-framework-use-curl-and-create-the-todo.png)

03:38 We can check in the AWS console if our submission was successful. 

![check AWS console if our submission was successful](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Develop%20a%20Serverless%20Backend%20using%20Node.js%20on%20AWS%20Lambda/original_node-js-deploy-an-aws-lambda-function-to-store-data-in-dynamodb-using-the-serverless-framework/node-js-deploy-an-aws-lambda-function-to-store-data-in-dynamodb-using-the-serverless-framework-check-AWS-console-if-submission-was-successful.png)

If we leave out the data part, the function will fail and return an error, as expected.

![leave out data part](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Develop%20a%20Serverless%20Backend%20using%20Node.js%20on%20AWS%20Lambda/original_node-js-deploy-an-aws-lambda-function-to-store-data-in-dynamodb-using-the-serverless-framework/node-js-deploy-an-aws-lambda-function-to-store-data-in-dynamodb-using-the-serverless-framework-leave-out-data-part.png)