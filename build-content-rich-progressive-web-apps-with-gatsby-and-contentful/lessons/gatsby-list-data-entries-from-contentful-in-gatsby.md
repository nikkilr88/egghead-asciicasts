00:00 Here, I have a Gatsby website running. I am using tailwind for styling. We would like to list all the lessons that we stored in Contentful in our website.

![List Lessons on gatsby website shows empty list](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/egghead-list-data-entries-from-contentful-in-gatsby-list-lessons.png)

00:11 First, we need to define the GraphQL query that gets all the lessons. To test that, we can use GraphiQL before we add the query to our code.

00:27 In here, we can type `allContentfulLesson`. Inside of that, we'll have `edges`. Inside of edges, we have `node`. Inside the node, this is where we get the fields that we need.

00:46 For the list, we will need the `title`. We will need the `slug` to link to the detailed page of this lesson. We will need the `image`. Inside of the image, we will get the `file` property which contains the `URL` property.

01:07 Let's test this.

![URL Return from allContentfulLesson query in graphiql](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/egghead-list-data-entries-from-contentful-in-gatsby-url-return.png)

You can see here we indeed are getting the data that we want. Let's copy our query and go to the `index.js` page. Here we need to export the `const`. We'll call it query. This will be GraphQL. Inside of that, we will paste the query that we already tested.

```js
export const query = graphql`
  {
    allContentfulLesson {
      edges {
        node {
          title
          slug
          image {
            file {
              url
            }
          }
        }
      }
    }
  }
```

01:37 Let's `import { graphql } from "gatsby"`.

```js
import { graphql } from "gatsby"
```

Once the query is done, Gatsby will pass in the data in the props. Here, we can extract data. Inside of `data`, we will have `allContentfulLesson`.

```js
const IndexPage = ({ data: { allContentfulLesson } })
```

01:58 We have the data ready. Let's render it. We will have a `div` with our class names. We will look through all the `edges` inside of `allContentfulLesson` and render this card component.

```js
<div className="flex flex-wrap -mx-3">
  {allContentfulLesson.edges.map(({ node }) => (
    <Card
      node={{ ...node, slug: `/lessons/${node.slug}` }}
      key={node.id}
    />
```

02:16 Of course, here, let's import our `Card` component.

```js
import Card from "../components/card"
```

If we save and go back to our website and scroll down, you can see here we are listing all the lessons.

![WTF is JAMstack Lesson Listed in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/egghead-list-data-entries-from-contentful-in-gatsby-lessons-listed.png)
