I really don't like these selectors.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
it('can make calculations', () => {
  cy.visit('/')
    .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(3)')
    .click()
    .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(4)')
    .click()
    .get('._2S_Gj6clvtEi-dZqCLelKb > :nth-child(4)')
    .click()
    .get('._1yUJ9HTWYf2v-MMhAEVCAn > :nth-child(5)')
    .click()
    .get('.mNQM6vIr72uG0YPP56ow5')
    .should('have.text', '3')
  })
})
```

They're pretty confusing. I can look at things, and I guess this is `1`, and then this is `+`, and then this is `2`, that's `=`, and that's the `display`, but that's pretty hard to read, and I would definitely not want to maintain a test that looked like this for sure.

We're going to install `cypress-testing-library` that will make our selectors a lot better. I'm going to `npm install --save-dev cypress-testing-library`, and once we get that installed into our `package.json` right here, then we can go ahead and use that.

#### Terminal Input
```javascript
npm install --save-dev cypress-testing-library
```

I'm going to put that in `support/index.js` here, and we'll just `import cypress-testing-library/add-commands`. This is going to add custom commands to Cypress that we can use in our tests. With that added, we can now use `getByText`, and if you're familiar with `react-testing-library`, you'll be pretty comfortable here.

Here we'll enter a regex that matches `1`, and then we'll click on `1`, and then we'll go ahead and find the text that matches `+`, and then we'll click on `+`. Then we'll find the text that matches `2`, we'll click on `2`, find the text that matches `=`, and click on `=`, and then we define the total amount.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      get('.mNQM6vIr72uG0YPP56ow5')
      .should('have.text', '3')
  })
})
```

Let's go ahead and leave that for a second. Let's make sure that this is going to work. If we save that, it runs again really quickly, and we get all of the elements that we need.

![First Run](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907825/transcript-images/egghead-installing-cypress-testing-library-first-run.png)

How are we going to find this display here? If we use our selector playground, the only thing that it has on it that's really identifiable is the `className`, and that's not super helpful for us.

What we're going to do, I'm going to open up where that is rendered, that's `auto-scaling-text`, and right here I'm going to add a `data-testid` for a `total`, and then I can say `getByTestId('total')`.

#### shared/auto-scaling-text.js
```javascript
render() {
  const scale = this.getScale()

  return (
    <div
      className={styles.autoScalingText}
      style={{transform: `scale(${scale},${scale})`}}
      ref={this.node}
      data-testid="total"
    >
      {this.props.children}
    </div>
  )
}
```

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('total')
      .should('have.text', '3')
  })
})
```

With that we'll refresh here and it's working great.

![getByTestId](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907821/transcript-images/egghead-installing-cypress-testing-library-getbytestid.png)

`getByTestId('total')`, and it expected that div to have the text of `3`, and this is so much easier to read and understand what's going on.

In review, to make all of this work, we first had to install `cypress-testing-library` in our `package.json`, and then we had to apply the commands that come from `cypress-testing-library`, so we `import cypress-testing-library/add-commands`. All that's really doing is it goes through all of the commands that Cypress has, and for each one of those it's going to add that command by its name to Cypress commands.

With that done, we can go into `e2e\calculator.js` and update these to use these custom commands that come from `cypress-testing-library` like `getByText` and `getByTestId`. This makes our tests a lot easier to both write and read.

#### calculator.js
```javascript
describe('anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
      .getByTestId('total')
      .should('have.text', '3')
  })
})
```