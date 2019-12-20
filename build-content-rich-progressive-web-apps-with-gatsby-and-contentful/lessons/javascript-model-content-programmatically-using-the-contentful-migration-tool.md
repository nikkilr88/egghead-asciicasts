00:00 Another way we can create content types in Contentful is using the Contentful migration tool. This will allow us to programmatically create them. Let's go ahead and code our instructor content type. First thing, we need to export the function.

#### Instructor.js
```js
module.exports = function(migration) {

}
```

00:20 Inside of this function, we'll have access to the migration object that will allow us to do any sort of manipulations to our content type. First thing we need to do is `create the content type`, then we need to define its `fields`.

00:41 We can define the `appearances` for the slug field, for example.

```js
module.exports = function(migration) {
// create the content type

//fields

//appearances
}
```

To create the content type, we can call the migration `.createContentTypes`, and we give it the id of `instructor`, the `name`, `description`, and `displayField`.

```js
module.exports = function(migration) {
// create the content type
const instructor = migration
  .createContentType("intructor")
  .name("Instructor")
  .description("")
  .displayField("fullName")

//fields

//appearances
}
```

Now, we have an instance of our created content type. We can create the fields by calling createField on the instance.

01:08 The field will have the id of `instructor`, the `name`, and `type`.

```js
//fields
instructor
  .createField("fullName")
  .name("Full Name")
  .type("Symbol")
```

Let's define the rest of the fields.

```js
// fields
instructor
  .createField("fullName")
  .name("Full Name")
  .type("Symbol")
instructor
  .createField("slug")
  .name("Slug")
  .type("Symbol")
instructor
  .createField("bio")
  .name("Bio")
  .type("Symbol")
instructor
  .createField("website")
  .name("website")
  .type("Symbol")
instructor
  .createField("twitter")
  .name("Twitter")
  .type("Symbol")
instructor
  .createField("github")
  .name("Github")
  .type("Symbol")

instructor
  .createField("avatar")
  .name("Avatar")
  .type("Link")
  .linkType("Asset")
```

Now, this is done, we need to tell Contentful how to deal with the slug field. Remember, the previous lesson, we set it to a type `slug`. We can do the same using the migration tool.

01:38 Here, we call the `.changeEditorInterface` on the content type, and we give it the field ID and then the ID of the widget. We can do the same for the website field and other similar fields.

```js
// appearances
  instructor.changeEditorInterface("slug", "slugEditor", {})
  instructor.changeEditorInterface("website", "urlEditor", {})
  instructor.changeEditorInterface("twitter", "urlEditor", {})
  instructor.changeEditorInterface("github", "urlEditor", {})
}
```

01:58 Let's save our file, and now, it's time to run our migration.

I already went ahead and installed the `contentful-cli`.

#### Terminal
```bash
npm install -g contentful-cli
```

Then after that's done, you need to call `contentful login`.

```bash
contentful login
```

This will open up a browser window and authenticate you to Contentful.

02:21 What we need to do here is to call the migration on the space that we have.

```bash
contentful space migration --space-id=lkb87t4toc0t
```

The `space-id`, we can get from Contentful. It's basically the URL.

![space id highlighted in the url to copy to the terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190185/transcript-images/javascript-model-content-programmatically-using-the-contentful-migration-tool-space-id.png)

02:52 Here, we pass it the file that we want to run, basically our migration code.

```bash
contentful space migration --space-id=lkb87t4toc0t instructor.js
```

We hit enter. You can see here, the tool gives us the summary of all the migration, and it's waiting for us to say yes. We say yes, and now it's creating our content type.

![migration summary shown in vscode terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/javascript-model-content-programmatically-using-the-contentful-migration-tool-migration-summary.png)

03:23 That's done. Let's check. You can see here, we have our instructor content type, with all the fields.

![Instructor Type successfully created in contentful](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/javascript-model-content-programmatically-using-the-contentful-migration-tool-instructor-type.png)

Let's do the same for our SEO content type. First thing, in `seo.js`, exporting the function. Then we create the content type. Lastly, we define the fields.

#### seo.js
```js
module.exports = function(migration) {
  const seo = migration
    .createContentType("seo")
    .name("SEO")
    .description("")
    .displayField("title")
  seo
    .createField("title")
    .name("Title")
    .type("Symbol")
  seo
    .createField("description")
    .name("Description")
    .type("Symbol")
  seo
    .createField("keywords")
    .name("Keywords")
    .type("Symbol")
}
```

04:16 We save, and let's run our migration. Here, instead of passing the instructor, we will pass the `seo.js` file.

```bash
contentful space migration --space-id=lkb87t4toc0t seo.js
```

Again, we work through the summary. Everything looks OK, and we accept our migration.

Lastly, we can define the Lesson content type that will link to both these content types.

04:56 In `lesson.js`, we create the content type again. We define the fields. We have the `title`, the `slug`, the `body` with type `RichText`. This is the `instructor`, and the syntax is a bit different. It's `linkContentType`, and in the `validations` we tell to only link to `instructor` field. For the image, we add our `SEO`, and we tell it also to only link to the `seo` content type.

```js
module.exports = function(migration) {
  const lesson = migration
    .createContentType("lesson")
    .name("Lesson")
    .description("")
    .displayField("title")
  lesson
    .createField("title")
    .name("Title")
    .type("Symbol")
  lesson
    .createField("slug")
    .name("Slug")
    .type("Symbol")
  lesson
    .createField("body")
    .name("Body")
    .type("RichText")

  lesson
    .createField("instructor")
    .name("Instructor")
    .type("Link")
    .validations([
      {
        linkContentType: ["instructor"],
      },
    ])
    .linkType("Entry")

  lesson
    .createField("image")
    .name("Image")
    .type("Link")
    .linkType("Asset")

  lesson
    .createField("seo")
    .name("SEO")
    .type("Link")
    .validations([
      {
        linkContentType: ["seo"],
      },
    ])
    .linkType("Entry")
```

05:41 The last thing is to change the appearance of the `slug` field.

```js
lesson.changeEditorInterface("slug", "slugEditor", {})
```

We run our migration again for the lesson.

```bash
contentful space migration --space-id=lkb87t4toc0t lesson.js
```

Summary looks good, and we hit enter. Now, if we go to Contentful and refresh this page, we should see all three content types.

![Migration Summary shown in the vscode terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1562190183/transcript-images/javascript-model-content-programmatically-using-the-contentful-migration-tool-migration-summary.png)

06:18 That's how you can create them programmatically. This code should live next to your website in the repository, so another developer can bootstrap a separate space. For example, for testing.

