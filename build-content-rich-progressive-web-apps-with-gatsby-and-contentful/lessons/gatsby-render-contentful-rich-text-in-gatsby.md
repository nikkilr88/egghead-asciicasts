00:00 We have our Gatsby website, listing lessons coming from Contentful. If we click in one of the lessons, we can see the detail, but here, we're only showing the title. We would like to show more text from this body, which is a rich text field.

![Rich text field shown in contentful for wtf is jamstack lesson](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190182/transcript-images/gatsby-render-contentful-rich-text-in-gatsby-body-text.png)

00:19 Let's take a look first at how this data is sent to us. If we go to the GraphiQL, and then request the body, inside of the body, we can see JSON. In the result here, we have all our nodes, and you can see the type and all the content.

![Output from GraphiQL shown from allContentfulLesson query](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-render-contentful-rich-text-in-gatsby-output.png)

00:41 We need a way to parse this JSON to React components. To do that, we can use the rich text React renderer. First, let's stop our server, and then:

```bash
npm i @contentful/rich-text-react-renderer @contentful/rich-text-types
```

01:06 In the lesson.js here, we need to add the `body` to the `query`. We require the `json` data from the body.

```js
export const query = graphql`
  query lessonQuery($slug: String!) {
    contentfulLesson(slug: { eq: $slug }) {
      title
      body {
        json
      }
      seo {
        title
        description
      }
    }
  }
```

We need to import the `documentToReactComponents` function from the rich text React renderer.

```js
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
```

We take this function, and in the markup here, we give it the data from the body. It will be `data.contentfulLesson.body.json`.

```js
<div className="lesson__details">
  <h2 className="text-4xl">{data.contentfulLesson.title}</h2>
  {documentToReactComponents(data.contentfulLesson.body.json)}
```

01:46 If we save now and run our server again, and once we refresh, we can see indeed here we have the content.

```bash
npm run develop
```

![Content of lesson shown in browser without heading style](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-render-contentful-rich-text-in-gatsby-content.png)

There is a little problem here. If we inspect this element, for example, it's an h2. We want to apply to it the same class name as the title in here. To do that, the `documentToReactComponent` accepts a second argument to add additional styling and markup to every node type.

02:25 Let's first import `BLOCKS` from `@contentful/rich-text-types`.

```js
import { BLOCKS } from "@contentful/rich-text-types"
```

And we add here a second argument, an object configuration. For every h2, we will receive this callback, and then we can return how it will show up.

```js
<h2 className="text-4xl">{data.contentfulLesson.title}</h2>
  {documentToReactComponents(data.contentfulLesson.body.json, {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-4xl">{children}</h2>
      )
```

02:42 What we'll take here is the same content, but we will wrap it into an h2 with a class name `"text-4xl"`. Let's save. You can see here our headings are fixed.

![Lesson content headings fixed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-render-contentful-rich-text-in-gatsby-headings-fixed.png)

Let's go ahead and add an image in here. It will be an embedded asset. We'll pick this one I already uploaded.

![Image added to lesson content and shown in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/gatsby-render-contentful-rich-text-in-gatsby-image-added.png)

03:06 Let's publish. Let's stop our server here, and then run it again. You can see here there is a problem. We're not seeing our image. That's because the renderer does not display images by default, mainly because it's an asset, and an asset can be something else different than an image.

03:33 We can do the same, like we did with headings, and then render the correct element. Let's go to the options here, and then add the `BLOCKS.EMBEDDED_ASSET`, and return an image with the correct URL. Let's save this.

```js
 [BLOCKS.EMBEDDED_ASSET]: (node, children) => (
  <img src={node.data.target.fields.file["en-US"].url} />
),
```

03:54 We have an error. That's probably because of cache problems. Let's remove the cache and public folder, and then run again.

```bash
rm -rf .cache public
```
```bash
npm run develop
```

 You can see here that we are indeed seeing our image, and all the headings are rendered correctly.

![Image Error Fixed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190185/transcript-images/gatsby-render-contentful-rich-text-in-gatsby-image-error-fixed.png)

04:15 That's how you render the rich text data from Contentful into Gatsby.
