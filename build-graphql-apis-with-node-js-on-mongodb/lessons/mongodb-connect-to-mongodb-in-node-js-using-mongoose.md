Instructor: 00:00 First of all, we need to install Mongoose to connect with MongoDB. 

```bash
$ npm i -s mongoose
```

Mongo's packet has installed successfully. Now we need to `import` the `mongoose` package. 

#### app.js
```javascript
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema';
```

I want to use promises with mongoose, so I need to tell the `mongoose` I also want to use `Promise` with all model methods.

00:24 Finally, we need to connect with `mongodb`. We need to provide the connect URI. `mongodb`, call in `localhost`, and we need to define the name of the database. You can choose any database. I'm going to use `gql_db`.

```javascript
const app = express();
const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gql_db');
```

00:41 Make sure your mongodb server is running, open another tab on terminal, and execute this command `mongod`. It will start the mongodb server.

```bash
$ mongod
```

00:48 Now I'm going to run the application by using `npm start`. 

```bash
$ npm start
```

My app is running. We have successfully connected to MongoDB.