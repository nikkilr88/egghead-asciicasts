Instructor: 00:00 I've got a basic React form here that accepts `name`, `email`, and a phone `number`. This is a checked input box for opting into promotions, `optIn`.

00:09 When the form is submitted an AJAX API method is called with the inputted information. You can see in the code that we're using state to keep an up-to-date record of the inputted information. This `optIn` property is for the checked box promotions.

#### Form.js
```javascript
export default class Form extends Component {
  state = {
      name: '',
      email: '',
      number: '',
      optIn: true
  }

  ...
}
```

00:26 We've got three handle event methods, the `handleChange` method updates the state of the corresponding input element that's being updated. Our `handleSubmit` makes sure that the page doesn't reload once this is submitted and calls the API addUser method with our state information. Finally our `handlePromotionClick` method updates our input checkbox state on click.

```javascript
handleChange = str => e => {
    this.setState({ [str]: e.currentTarget.value })
}
handleSubmit = e => {
    e.preventDefault()
    return api.addUser(this.state.name, this.state.email, this.state.number)
}
handlePromotionClick = e => {
    this.setState(prevState => ({ optIn: !prevState.optIn }))
}
```

00:54 Our form's HTML has data attributes throughout that we'll use inside of our tests as selectors. Data attributes give us more security as classes can change with tools like CSS modules. 

```html
<form data-testid='addUserForm' onSubmit={this.handleSubmit}>
    <h2>Request Information</h2>
    <input data-testid='name' type='text' onChange={this.handleChange('name')} placeholder='Name' value={this.state.name} />
    <input data-testid='email' type='text' onChange={this.handleChange('email')} placeholder='Email' value={this.state.email} />
    <input data-testid='number' type='text' onChange={this.handleChange('number')} placeholder='Number' value={this.state.number} />
    <div>
        <input data-testid='checked' type='checkbox' checked={this.state.optIn} onChange={() => {}} onClick={this.handlePromotionClick} />
        <p data-testid='promotionsP' className='promotions'>Receive Promotions</p>
    </div>
    <button type='submit' data-testid='submitButton'>Submit</button>
</form>
```

With our form ready to go we can now begin testing its behavior with Enzyme.

01:11 We've got our basic setup of dependencies here to get up and running with our tests. Let's write our describe block with our form component.

#### Form.test.js
``` javascript
import React from 'react'
import Form from './Form'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import api from './api'

configure({ adapter: new Adapter() })

describe('<Form />', () => { 
  // opted in by default
  // actually input their information
  //submits the form, calls api
  // matches snapshot
})
```

01:21 Before we dive into actually writing out our tests, let's make a game plan. It's best to think about how will our users interact with the form, then to write unit tests to make sure our form answers that question.

01:33 We know that our users will automatically be opted into receiving promotions by default unless they click the box, so we're going to test for that. We can also tell our users need to be able to input their information, and then to actually submit the form which will call our API method. Finally we want our form to stay in this order, name, email, number, so let's set a snapshot test at the end.

02:00 For our first test we'll say `test received motions default is true`. Inside this block we'll do const `wrapper` equals `shallow`, our `Form` component. Then const `promotionalInput` equals `wrapper.find`, our data attribute on that input that we called `checked`.

02:20 Now `expect` that our `input.props.checked` is `true`. 

```javascript
// opted in by default
test('receive promotions default is true', () => {
    const wrapper = shallow(<Form />)
    const promotionInput = wrapper.find('[data-testid="checked"]')
    expect(promotionInput.props().checked).toBe(true)
})
```

Once we save that we'll see that our test instantly passes. To make sure that this works right, we'll pass `false` and watch it fail. Perfect, now I'll change it back.

02:36 We're able to easily find our checkbox input with the `find` method on our shallow rendered component. Then the `props` method that we're using on the actual promotion input element returns all the element attributes. Since this element has the `checked` attribute on the element, we can assert that it is `true` by default.

02:57 Let's write our next test. Say, `test` that `allows user to fill out form`. Then we'll do const `wrapper` equals `shallow`, our `Form` component. 

Now we're going to need to use the find method to find each input field and then use the simulate method to simulate a user typing into that input box. We'll also need to send in a mocked event object for each input that holds that new text.

03:22 If we did this one at a time it will probably look pretty bloated, so let's make a helper function. We'll do `const updateInput` equals a function with `wrapper`, `instance`, and `newValue` parameters. Const `input` equals `wrapper.find` in our `instance`. Then we'll `simulate` a `change` with an event object where our value is our `newValue` and we'll return the new `wrapper` updated.

```javascript
const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance)
  input.simulate('change', {
      currentTarget: {value: newValue}
  })
  return wrapper.find(instance)
}
```

03:46 With that in place we can now do `updateInput` on each one of our individual input boxes. The first one we'll check is the `name` input. We'll find that data test ID, give it `Tyler`. We'll do the same thing for `email`.

04:00 This needs to be a string. We'll say `test@Gmail.com`. We'll do `numberInput` and we'll make up some `number`.

```javascript
// actually input their information
test('allows user to fill out form', () => {
  const wrapper = shallow(<Form />)
  const nameInput = updateInput(wrapper, '[data-testid="name"]', 'Tyler')
  const emailInput = updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com')
  const numberInput = updateInput(wrapper, '[data-testid="number"]', '8018882321')
})   
```

04:09 With that in place we can basically copy this type of format where we check the props on each one of these inputs and we make sure that they match the correct string. I'll paste in those expects here and save it. 

```javascript
test('allows user to fill out form', () => {
  const wrapper = shallow(<Form />)
  const nameInput = updateInput(wrapper, '[data-testid="name"]', 'Tyler')
  const emailInput = updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com')
  const numberInput = updateInput(wrapper, '[data-testid="number"]', '8018882321')

  expect(nameInput.props().value).toBe('Tyler')
  expect(emailInput.props().value).toBe('test@gmail.com')
  expect(numberInput.props().value).toBe('8018882321')
}) 
```

You'll see that for our `nameInput` we expect the value to be `Tyler`, for our `emailInput` it's `test@Gmail`, and then our `numberInput` is our made-up number.

04:33 We take a look at our terminal and see that this passes. Make sure that this works. We could mess with our number and see that that still works.

04:46 To recap, we made this helper function that accepts a `wrapper` or a `shallow` render component a selector which will find our individual `instant` input and the new value we want the provided input to update to. 

Then we use the `simulate` method to mock a simulated event, in our case an `onChange`, and passes through a mocked out event object with our new value.

05:11 Then we assert that those inputs work accordingly by checking the `props`' values on each one of them. Finally, let's wrapper.fnd our promotional checkbox and `simulate` a `click` and then expect that this checkbox switches from `true` to `false`.

```javascript
test('allows user to fill out form', () => {
  const wrapper = shallow(<Form />)
  const nameInput = updateInput(wrapper, '[data-testid="name"]', 'Tyler')
  const emailInput = updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com')
  const numberInput = updateInput(wrapper, '[data-testid="number"]', '8018882321')
  wrapper.find('[data-testid="checked"]').simulate('click')

  expect(nameInput.props().value).toBe('Tyler')
  expect(emailInput.props().value).toBe('test@gmail.com')
  expect(numberInput.props().value).toBe('8018882321')
  expect(wrapper.find('[data-testid="checked"]').props().checked).toBe(false)
})
```

05:28 With that saved off we have now successfully tested the user's ability to update the form with their information, including opting out of the promotional box. Next up we're actually going to test that the form submits and calls the API. Let's copy this test because it's going to have a lot of duplicated logic in it.

05:48 We'll rename it to `submits the form` and then we'll use Jest's `spyOn` method to spy on our API `addUser` method. We're going to mock the user implementation where we just return a resolved promise with a mocked-out data object.

06:05 Now we can remove the `const` variables, update our `find` method to find the form, and `simulate` our `submit` with an event object here. Next we can get rid of these expects and run a new expect that our API `addUser` method is called with `Tyler`, our `test@Gmail` and our made-up number.

```javascript
//submits the form, calls api
test('submits the form', () => {
  jest.spyOn(api, 'addUser').mockImplementation(() => Promise.resolve({data: 'New User Added'}))
  const wrapper = shallow(<Form />)
  updateInput(wrapper, '[data-testid="name"]', 'Tyler')
  updateInput(wrapper, '[data-testid="email"]', 'test@gmail.com')
  updateInput(wrapper, '[data-testid="number"]', '8018882321')
  wrapper.find('[data-testid="addUserForm"]').simulate('submit', {preventDefault: () => {}})

  expect(api.addUser).toHaveBeenCalledWith('Tyler', 'test@gmail.com', '8018882321')
})
```

06:25 If we save this and open up our terminal we'll see that now this test passes. To recap, we're using Jest's `spyOn` method to mock out our API method `addUser`. We tell it to just return a resolved promise with a `data` object.

06:42 Then we find the form and simulate a `submit` event. We need to pass through this event object because we call this `preventDefault` method inside of our component. Finally we test that our API is not only called but called with the right parameters.

07:02 Finally, let's finish up by writing a test for our snapshot where we'll const our `wrapper` and `shallow` render it. We'll expect `toJson` a `wrapper` to match snapshot. After saving this and opening up a terminal we'll see that our snapshot is written and our test suites all passed.

```javascript
// matches snapshot
test('matches saved snapshot', () => {
    const wrapper = shallow(<Form />)
    expect(toJson(wrapper)).toMatchSnapshot()
})
```

07:22 Writing the snapshot test gives us assurance that our form will stay in this layout that we have here.