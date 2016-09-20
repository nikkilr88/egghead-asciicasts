I was going to end this series at video number 16 but, as React keeps adding more features, I can go ahead and keep adding new videos. What we're going to do in this video is we're going to walk through a new feature as of React 0.14 which is called **stateless functional components**.

What stateless functional components are is you'll notice here that throughout a lot of our code, we have a lot of components that simply just have a `render` method. We have `Home`. We have `Main`. We have some other components as well. These components are really simple.

**components/Home.js**
``` javascript
class Home extends React.Component {
  render() {
    return (
      <h2 className="text-center">
        Search By Github Username Above
      </h2>
    )
  }
}

export default Home;
```
Ideally, if you're doing a good job of programming in React, you're going to have a lot of components that simply take in data as props. For example, this `Main` component, all it does is it takes in some props, and it displays that to the view.

Sometimes it would be nice to not have to create a whole class if you want to simply make a component. What we're going to do here is we're going to walk through all of our components and modify them just a little bit to make them a little bit more clean.

I'm going to go ahead and simply make a function here. I'm using the [ES6 Arrow syntax](https://egghead.io/lessons/arrow-function)  , which we talked about a few videos ago, but this is fundamentally just a function. The very first argument that's going to be passed to our function is props. In this example, we're not going to have any props.

**components/Home.js**
``` javascript
const Home = () => {

}
```
What we can do is this, where we can take the `render` method of our component. If our component, *one*, doesn't have any state and, *two*, only has a `render` method, we can then go ahead and make that just a function. Now this function is pretty much the exact same thing as our class we had earlier. It'll behave the exact same way to React.

**components/Home.js**
``` javascript
const Home = () => {
  return (
    <h2 className="text-center">
      Search By Github Username Above
    </h2>
  )
}
```
Let's go ahead and test this. There we go. Everything still works. Let's go ahead and fly through some of these other components. Let's go to `Main`. Then I'm going to create a function here, which is just going to return our `render` method. You'll notice now that this function actually takes in some props. What React does is it provides props as the first argument into your function.

What I'm going to do here is kind of a mix of two ES6 features. It's a mixture of [object destructuring](https://egghead.io/lessons/ecmascript-6-destructuring-assignment), which we talked about a few videos ago, and it's also a mixture of this thing called [default parameters](https://egghead.io/lessons/ecmascript-6-default-values-for-function-parameters).

**components/Main.js**
``` javascript
const Main = ({children, history}) => {
  return (
    <div className="main-container">
      <nav className="navbar navbar-default" role="navigation">
        <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
          <SearchGithub history={history}/>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  )
}
```

What we can do here is if you have a function that takes in an object, you can go ahead and use open curly brace, close curly brace, and put in the properties of that object. Then you can access the properties of that object inside of your function simply as the variable that you used here.

Again, it would be the exact same thing as doing something like that. Instead, we can go one level deeper. Go ahead and take off history and children from `this.props` and go like that. It's pretty clean.

Let's go ahead and do the rest of our components real quick. Here I'm going to make a `Repos` function. Let's go ahead and grab our `render` method. Notice here, too, this function has `propTypes`. It behaves the exact same way. We can go ahead and stick a prop type property on our function itself. It'll still behave normal.

**Github/Repos.js**
``` javascript
const Repos = ({repos}) => {
  return (
    <div>
      <h3> User Repos </h3>
      <ul className="list-group">
        {repos.map((repo, index) => {
          return (
            <li className="list-group-item" key={repo.name}>
              {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
              {repo.description && <p>{repo.description}</p>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

In this one, we have `this.props.repos`. I'm going to go ahead and take off `this.props` and throw in `repos` up here. Now let's do `UserProfile`. I'm going to make a function. This function is going to take in some props, which is a `bio` object. Then we move our `render` method up. Now I'm going to get rid of `this.props`.

**GithubUserProfile.js**
``` javascript
const UserProfile = ({bio}) => {
  return (
    <div>
      {bio.avatar_url && <li> <img src={bio.avatar_url}/></li>}
      {bio.name && <li>Name: {bio.name}</li>}
      {bio.login && <li>Username: {bio.login}</li>}

      ...

    </div>
  )
}
```

I think we just have one or two more. You'll notice this one has some methods on it, so we're not going to do that one. We are going to do `Notes`, which takes in a few things. It takes in a `username`, it takes in `notes`, and it takes in an `addNote` method. Then grab our return statement, throw that into here, and format it. Go ahead and update `this.props`. All right.

**Notes/Notes.js**
```javascript
const Notes = ({username, notes, addNote}) => {
  return (
    <div>
      <h3> Notes for {username} </h3>
      <AddNote username={username} addNote={addNote} />
      <NotesList notes={notes} />
    </div>
  )
}
```
Then, the very last one, I believe, is `NotesList`. We have our function. Then we grab our `render` method. Notice here that I'm using the Arrow syntax for my functions. You don't need to do that. You can just use the regular function keyword. Since we've gone all ES6, I'm going to go ahead and do that. Then here we're going to have `notes`.

**Notes/NotesList.js**
``` javascript
const NotesList = ({notes}) => {
  return (
    <ul className="list-group">
      {notes.map((note, index) => (
        <li className="list-group-item" key={index}>{note}</li>
      ))}
    </ul>
  )
}
```
This looks great. We're good. Now we have everything functioning the exact same, but now instead of having classes all over the place or even using `createClass`, instead we're just having these lightweight functions that return us whatever our dom looks like for this component.
