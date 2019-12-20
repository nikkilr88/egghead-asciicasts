Instructor: [0:00] You might have noticed that so far, most of the fields we added have been nullable. This is because GraphQL makes every field nullable by default. To make a field non-nullable, we would have to append an exclamation mark.

[0:16] While null references cause plenty of unexpected errors and more and more languages make non-nullable variables to default, it was a conscious decision by the GraphQL creators to make fields nullable. Why so? **Many things can go wrong when retrieving data. In case something goes wrong when retrieving a field, we can return null rather than having a complete failure for the request.**

[0:42] **For example, if the thumbnail URL is returned by another service that is currently down, we can return null only for the thumbnail URL and the rest of the result will be left intact.** In case thumbnail URL would not be nullable but image would, then the whole image can be null. This is the recommended way of handling it.

[1:07] Let's take it even further. In case image as well as product wouldn't be nullable, it would mean we have to throw an error for the whole request. Why so? Because returning null for a non-nullable field is not an option and would automatically result in a GraphQL error. So far so good.

[1:27] **While errors are one reason to make fields nullable, another one is the possibility for granular authorization.**

[1:34] Individual fields within a request can have different authorization rules. For example, there might be a field amount, indicating how many items are left, only accessible to admins. A non-admin user could ask for the field, but would always get null as a result, instead of the whole request failing.

[1:57] To conclude, **when designing a graphical schema, it's important to keep in mind all the problems that could go wrong, and if null is an appropriate value for a field field. Typically, it is, but occasionally it's not. In those cases, use non-null types to make the guarantee.** This comes directly from the best practice section of the official GraphQL documentation.

[2:23] While this should already be convincing enough that nullable fields are a good idea, there's one more benefit. **When deprecating a field, we can return null instead of returning the actual value, without causing a breaking change.** In general, I recommend to maintain the deprecated field as long as possible, but sometimes that might not be an option. For example, when it would compromise security.

[2:49] Let's briefly go through how this would work. We add the deprecation annotation to the field image URL, and in our case, can even recommend the field to use instead. Now we can implement the mock, returning null for the image URL. Let's test it, running our query. As expected, image URL returns null.

**index.js** 
```js 
  type Product {
    id: ID!
    name: String
    description: String
    image: Image
    imageObject: Image @deprecated(reason: "Use \`image\`.")
  }

  const mocks = {
    Product: () => ({
      imageUrl: () => null 
    })
  }
```
