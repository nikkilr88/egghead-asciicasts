Taylor Bell: [00:00] We have our `Layout` component and a little `Header` that we've made, but this file's starting to get a little bit crowded. Let's reorganize it a little bit. I'm going to pull the `Header`, and the `TitleAndDescription` subcomponent out into a separate directory.

[00:12] We're in the pages directory right now. I'm going to go up one. Then I'm going to create a new `components` directory. Now we have `components pages`, and we're going to create a `Header.js` file in the `components` directory.

#### Terminal
```
$ cd ..
$ mkdir components
$ ls
$ touch components/Header.js
```

[00:22] Now that we have the `Header` file open, we can start pulling some of the pieces over from our `Layout` component. I move everything over from the `Layout` component and into the `Header` file. 

#### Header.js
```js
import React from "react"
import { StaticQuery, graphql } from 'gatsby'

const TitleAndDescription = ({data}) => {
  const title = data.site.siteMetadata.title
  const description = data.site.siteMetadata.description

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'avenir'
    }}>
      <h2 style={{marginBottom: 0}}>{title}</h2>
      <p style={{
        marginTop: 0,
        opacity: 0.5
      }}>
        {description}
      </p>
    </div>
  )
}

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => <TitleAndDescription data={data} />}
    />
  )
}

export default Header
```

Back in our `index.js` file, I can go ahead and remove all the stuff that I brought over.

#### index.js
```js
import React from "react"
import { StaticQuery, graphql } from 'gatsby'
import Header from '../components/Header'

const Layout = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default Layout 
```

[00:36] Now I can import `Header` from our components directory. Inside of our `Header.js` file, it's important to remember to `export`. 

#### Header.js
```js
export default Header
```

We can see that our page still loads as expected.