Instructor: [00:01] Inside of our `post.js` file, we're going to destructure the context parameter of this lifecycle hook so we can pull of the ID off of the query object that this page is going to receive. Once done, I'm going to create this response variable like we did in the `index.js` file.

#### post.js
```javascript
Post.getInitialProps = async ({ query: { id }}) => {
    const response = 
};
```

[00:22] Now, we're going to `import` the `isomorphic-fetch` library to perform our API call. I'm also going to grab the `card` components from the material UI library so we can display our posts in a neat little manner. 

```javascript
import { Card, CardHeader, CardText } from 'material-ui/Card';
```

Inside our `fetch` call, we need to leverage the `id` that we're receiving by adding it to our API call like so.

```javascript
const response = await fetch (`${process.env.BLOGGER_URL}/${id}?key=${process.env.API_KEY}`)
```

[00:44] This will allow us to display each blog post individually. Below our fetch call, I'm again going to create a `data` constant and set it equal to the value of `response.json`. Now the last thing I'm going to do is create these `title` and `content` constants which will pass directly into our component as prompts.

```javascript
const data = await response.json();
const title = data.title;
const content = data.content;
```

[01:08] Now, the blogger API is going to give us the `content` of our post inside of `data.content` as well as the `title` inside of `data.title`. We can assign them to our constants like so. Then finally, we're going to `return` them, which will make them available to our component as props. 

```javascript
Post.getInitialProps = async ({ query: { id }}) => {
    const response = await fetch (`${process.env.BLOGGER_URL}/${id}?key=${process.env.API_KEY}`)
    const data = await response.json();
    const title = data.title;
    const content = data.content;
    return { title, content }
};
```

Now that we're all set up, let's pass in `title` and `content` into our component.

```javascript
const Post = ({ title, content })
```

[01:35] Now inside of our component, we're going to again scaffold out a `Card`. However, this time it's going to hold all of the content for our blog post. We're setting `title` just like we did inside of `index.js`. Below this, we see me using React's `dangerouslySetInnerHTML` DOM element to pass in the markdown that I'm receiving from Blogger into my application.

```html
const Post = ({ title, content }) =>
    <div>
        <Header />
        <Card>
            <CardHeader title={title} />
            <CardText>
                <div dangerouslySetInnerHTML={{_html: content }} />
            <CardText>
        </Card>
    </div>

```
 
[02:03] I should point out that you should be careful when using this DOM attribute. It's not necessary for you to use it in this case. My content is coming to me as a markdown, and it's going to display nicely on the page. To cap this, I'm going to `import` the `RaisedButton` component as well as Next `Link` component. 

```javascript
import RaisedButton from 'material-ui/RaisedButton';
import Link from 'next/link';
```

Add some links that will take the user back to the blog page.

```html
<RaisedButton fullWidth={true}>
```

[02:28] Inside our `<Link>` components, we're using the `href` and `as` attributes again. This time, though, we're passing in the index route as the `href` value and giving the `as` attribute the value of `blog`. Finally, I'm wrapping go back to blog in `a` tags. 

```html
<Link href="/" as="/blog">
    <a>
        Go back to the blog!
    </a>
</Link>
```

We're ready to check out the application.

[02:50] Now, if you take a look at your application, you should see the content you're receiving from Blogger appearing on the page. 

![info appearing on page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545266982/transcript-images/react-leverage-next-js-getinitialprops-lifecycle-hook-to-load-individual-posts-info-appearing-on-page.jpg)

In my case, I have different assets such as these code examples as well as regular images, all of which are being rendered neatly to the page. We'll also see that button at the bottom of each post which is allowing us to navigate right back to our main route located at /blog.

![return button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545266982/transcript-images/react-leverage-next-js-getinitialprops-lifecycle-hook-to-load-individual-posts-return-button.jpg)