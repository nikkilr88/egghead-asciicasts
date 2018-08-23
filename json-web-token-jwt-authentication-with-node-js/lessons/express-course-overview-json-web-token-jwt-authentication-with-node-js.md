Instructor: 00:00 Hey everyone, welcome to this course on JSON web token authentication with Node.JS. The goal of this course is to introduce you to web-based authentication using JWTs.

00:11 Through these few lessons, we will build a simple application that will connect to a secured API and we will build an authentication server to provide us with tokens that we need in order to connect and access those routes.

00:25 We will start slowly by building a simple web server using Express. We will then see how to make this API more flexible by introducing environment variables, and then how to handle post request, and how to parse the body of those requests.

00:40 At this point, we will be able to start building our authentication server. The server will validate the user credentials and provide those users with a JSON web token. Using this token, we will be able to go back to our API and secure one of our routes so that only an authenticated user can access those resources.

00:59 Finally, what would a back-end be without a good UI? We will build a quick front-end that will connect to our API. This UI will also collect user credentials and send them over to the authentication server to fetch a JWT.

01:13 All this will be done using plain old vanilla JavaScript and none of those fancy frameworks. This will give you all the necessary tools to implement this solution in any application you might build.

01:25 Of course, the examples in this course will be simple, and we will focus more on the concepts rather than building a real secure API. For that reason, we will also show you how to switch your primitive authentication server to use a proven solution.

01:40 In this lesson, you will be introduced to Auth0 as a solution to provide secure identity management and federated log in to your users. Go ahead, watch this course, and learn how to build more secure applications right now.