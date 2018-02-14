Since Poi was developed by a Vue contributor, all of the defaults are essentially configured for Vue. We can import Vue from 'vue' since it's included. Then, with a new Vue instance, we can set the element to the app id and then render out.

We'll create our render function with h and then some JSX, and say "Hello." You can see this renders out "Hello" even though the only thing I've created is this index file. I didn't have to install Vue. There are no Node modules or anything.

I can even come into here, create a new file called app.vue, create my single-file component. We'll create a div and have some data for this as well. Export default to some object with some data on it and return an object with a message that says "Party Time." Then render this message out here.

In my index file, I can easily import App from './app.vue'. Instead of rendering out some JSX, I can just drop my app in here, hit save, and it's "Party Time."