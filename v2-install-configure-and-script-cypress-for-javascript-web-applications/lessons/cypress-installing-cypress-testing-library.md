Instructor: 00:01 I don't know about you, but working with this selectors would be really difficult in the long term. It's even difficult in the short term. I want to get rid of these selectors and improve this drastically.

00:10 What we're going to do is we'll `npm install` as a devDependency `@testing-library/cypress`.

#### terminal
```bash
npm install --save-dev @testing-library/cypress
```

Install the Cypress member of the testing library family. With that installed, we need to add the custom commands that Cypress testing library exposes. We're going to go to our `support/index.js`.

00:28 At the top here, we'll `import '@testing-library/cypress/add-commands'`. What that's going to do is go through each one of the commands that are exposed by Cypress testing library and adds those to Cypress.

#### index.js
```js
import '@testing-library/cypress/add-commands'
import './commands'
```

00:43 With those all added, we can now use those in our Cypress test. If you're used to testing library modules, then this will be really familiar to you, except you don't have access to the `getByText` typed queries. All those queries that start with "get" because those are synchronous queries and they don't really make sense in Cypress.

01:00 In Cypress, what we use instead is the `findByText` variation which is asynchronous. For this, we're going to provide a regex that matches the button one and then we'll click on "one." We going to do that for each one of these. For each one of these, I'm going to do those same find by text here and for that last one, we'll have to do something special.

#### calculator.js
```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .findByText(/^1$/)
      .click()

      ...

  })
})
```

01:19 This second one is going to be a plus for. That third one will be the two and then the fourth will be the equals. Let's save that.

```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .findByText(/^1$/)
      .click()
      .findByText(/^\+$/)
      .click()
      .findByText(/^2$/)
      .click()
      .findByText(/^=$/)
      .click()
      .get('.mN1M6vIr72uG0YPP56ow5')
      .should('have.text', '3')
  })
})
```

Come over to our test and we'll run all the specs. Everything is working just as well as it was before, except our test are way easier to read and understand what the intent is.

![working as before](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-installing-cypress-testing-library-working-as-before.png)

01:36 Find by test one, it finds that, it clicks on it. It finds the plus, it clicks on it. It finds the two and it clicks on that. It finds the equals and clicks on that. Then it finds the display value and verifies it has a text to three.

01:50 The display value is a little bit more tricky because if we do simply find by text three, then we'll find both of these. We want to ascertain the display value specifically, but there's nothing in our app that specifically calls this out. This is a situation for a data test ID.

02:05 I'm going to go to my `auto-scaling-text.js` where that is rendered and we're going to add a data test ID for total.

#### auto-scaling-text.js
```js
function AutoScalingText({children}) {
  const nodeRef = React.useRef()
  const scale = getScale(nodeRef.current)
  return (
    <div
      className={styles.autoScalingText}
      style={{transform: `scale(${scale},${scale})`}}
      ref={nodeRef}
      data-testid="total"
    >
      {children}
    </div>
  )
}
```

Then in `calculator.js`, instead of "get" we'll do `.findByTestId('total')`.

#### calculator.js
```js
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .findByText(/^1$/)
      .click()
      .findByText(/^\+$/)
      .click()
      .findByText(/^2$/)
      .click()
      .findByText(/^=$/)
      .click()
      .findByTestId('total')
      .should('have.text', '3')
  })
})
```

Save that. Our test runs pretty fast but that's what it did. Find by test ID total and it ascertain that that note has the text three.

02:27 In review, what we did was we installed Cypress testing library and configured that in our index JS to automatically add all of the commands that are exposed by Cypress testing library. Then we used those commands in our calculator to make our test resemble the way that our software is used way better by using Cypress Testing Library queries.

02:45 In situations where those queries don't quite work out, we use this find by test ID. We updated our auto scanning texts to include that data test ID so we could select that specific DOM node. That's not something that you want to do very often, but it can come in handy in situations like this.
