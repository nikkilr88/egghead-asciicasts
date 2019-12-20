00:00 I've gone ahead and created pages for each instructor that we have in Contentful. I did the same process as the lessons. Here, we query all the instructors, and then look through the result and create a page for every instructor.

00:20 This will be based on this React component, which is the template. I'm simply now displaying the `image`, the `name`, and the `description`. It would be nice if we can display the lessons that are created by this instructor.

![Mr Jam instructor displayed in the browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190182/transcript-images/egghead-use-graphql-backreference-to-avoid-circular-dependencies-between-content-model-mr-jam.png)

00:36 Let's check our content modules first. If we go to the lesson, you can see here that every lesson is linking to an instructor, but if we go to an instructor, we have no way of knowing which lesson is made by this instructor.

00:55 We could create however a new reference in here and link to a lesson, but this will create a circular dependency, and it's hard to maintain. A better way of doing this is using back references that are created by Gatsby in the GraphQL node.

01:12 To check that out, let's go to GraphiQL and query for all the instructors. In here, we can get the `edges`, and then the `node`. We can get things like `fullName`. This is the direct field that belongs to the instructor.

01:39 If we type `lesson`, you can see here that we have access to the lesson, even if it's not linked directly to the instructor in Contentful. Here, we can grab stuff like the `title`, the `image`, and so on. Let's do the same in our code and render a list of lessons.

![Output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190182/transcript-images/egghead-use-graphql-backreference-to-avoid-circular-dependencies-between-content-model-output.png)

02:02 First thing we need to do is to update this query that we already exported. After `website`, let's add the `lesson`, get the `id`, the `title`, the `slug`, and the `image`.

```js
    bio
    website
    lesson {
      id
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
```

Now that's available for us, let's render it. For that, we need to check first if the lesson is not `null`. Otherwise, we look through that lesson array and we render it. We will use the same `Card` component that we use in our index page.

```js
{data.contentfulInstructor.lesson && (
  <div className="border-t my-6">
    <h2 className="text-4xl text-grey-dark my-6">Lessons</h2>
    {data.contentfulInstructor.lesson.map(node => (
      <Card
        node={{ ...node, slug: `/lessons/${node.slug}` }}
        key={node.id}
      />
    ))}
  </div>
```

02:40 Now that's done, let's save and go back again to the instructor page. In here, you can see lessons, and these are all the lessons that are attached to this instructor. We can of course click in here, and this will take us to the lesson detail page that we have.

![Lessons Attatched to instructor page in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/egghead-use-graphql-backreference-to-avoid-circular-dependencies-between-content-model-lessons-attached.png)
