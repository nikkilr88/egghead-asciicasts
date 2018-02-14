For more customization options for your template, create a poi.config.js. This has the usual module.exports. There's an HTML property on here that we can use.

[First, we'll just try title and call it My amazing app, then start up Poi again. You can see it will grab My amazing app and drop it in the title. Other common options like description, My description, these options are also available. You'll see the description show up in here.

For more customization options, we'll need to tell it exactly what our template is. We're just going to use the template we're already using. Then we can start passing in custom properties into the template. I'll call this one Course. The course can be Poi lessons. When I hop into my template, I can create an
.

Using the template's syntax for Underscore and Lodash, I can access the htmlWebpackPlugin.options.course. Course is coming from right here. We changed some configurations, so we need to reboot Poi. You can see Poi lessons shows up here coming from the configuration.

[Another example could be something like contributors, where we have Mindy and John. Then we could access these in here. Let's simplify this a little bit by destructuring the options. We'll say Course, and grab the course and contributors off of htmlWebpackPlugin.options. That way, we can just have Course here.

Then we can create an unordered list with some list elements. We'll wrap this with the template syntax for using Underscore or Lodash, say, for each contributors. We'll call each contributor a c with an arrow function and an open curly here. Then we'll close this on this line with a closed curly and a closed paren.

Inside of my list element, I can get the local variable syntax and say render out the c. I'll hit save. You can see that Mindy and John are coming into the template from the config Mindy and John.

You shouldn't use this for anything more than configuration or global configuration for your project. Leave any dynamic data or data of your application in your JavaScript instead of your HTML template.