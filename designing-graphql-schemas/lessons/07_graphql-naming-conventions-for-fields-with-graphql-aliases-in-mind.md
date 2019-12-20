Instructor: [0:00] Let's add one more feature to our workshop. We want to expose description in HTML version so content editors can leverage Rich Text capabilities. At the same time, we want to keep a text version of the description for meta text. Nothing easier than that. We add a field `descriptionHTML`, returning a type `String`.

**index.js**
```js
const typeDefs = gql`

  type Product {
    id: ID!
    name: String
    description: String
    descriptionHTML: String
    image: Image
  }
  ...
`;
```

[0:21] As you might guess, this strategy might cause troubles in the future. For example, at some point, you want to make sure the description can be created in English and French. We can duplicate both fields and append the local abbreviation, `Fr`.

```js
const typeDefs = gql`

  type Product {
    id: ID!
    name: String
    description: String
    descriptionHTML: String
    descriptionFr: String
    descriptionHTMLFr: String
    image: Image
  }
  ...
`;
```

[0:39]**As you can imagine, this doesn't scale well.** With every local we add, the product type will get more overloaded. In hindsight, this approach might not be ideal. Let's take a step back and start from the beginning.

[0:54] What if you would leverage GraphQL arguments? We add the enum product description format with two options, text and HTML. Then, we add an optional argument format to the description. What does this give us?

```js
const typeDefs = gql`
  enum ProductDescriptionFormat {
    TEXT
    HTML
  }

  type Product {
    id: ID!
    name: String
    description(format: DescriptionFormat = TEXT): String
    image: Image
  }
  ...
`;
```

[1:12] We can still create it for description and it will return the text. This means we didn't introduce a breaking change. If you provide the format HTML, we though can retrieve the description as HTML. What if we need both at the same time? No problem. Using aliases. The result will give us both fields, description, as well as the field, description_HTML. This is fantastic.

```graphql
  {
  product(id: $id) {
    title
    description
    descriptionHtml: description(format: HTML)
  }
}
```

[1:49] We can do the same for locals. We can add an enum locals, including English, French, and German. Then, at the argument local, with English as set to the default to the field, description.

```js
const typeDefs = gql`
  enum ProductDescriptionFormat {
    TEXT
    HTML
  }

  enum Locales {
    EN
    FR
    DE
  }

  type Product {
    id: ID!
    name: String
    description(format: DescriptionFormat = TEXT, locale: Locales = EN): String
    image: Image
  }
```
[2:02] In conclusion, **by leveraging arguments in combination with GraphQL aliases, we can achieve the same results as with multiple explicitly-named fields.** That said, there's one case where we have to create the different field. Let me illustrate this.

[2:20] We introduce the scalar HTML to indicate that the returned string is HTML. In this case, using arguments won't work anymore. Why so? While usually we can create union type, it is not possible in GraphQL to create the union result out of two scaler types.

[2:37] In fact, it would even be quite confusing. Because when asking for the description text, it should be clear that this ever won't return the scaler HTML, which means, in this case, it's definitely best to have two different fields. Description, returning a string, and description HTML returning HTML.

[2:59] Keep in mind this doesn't prevent us from adding local as an argument to description, while description HTML.
