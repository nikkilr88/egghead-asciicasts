Here we have our list of temperatures again. We have initialized this with the three temperatures and we have our app that loops of these temperatures and renders them. Here they are.

####ES6/Babel
```javascript
const temps = observable([])
temps.push(new Temperature(20, "K"))
temps.push(new Temperature(25, "F"))
temps.push(new Temperature(20, "C"))

const App = observer(({ temperatures }) => (
    <ul>
        {temperatures.map(t =>
            <li key={t.id}>{t.temperature}</li>
        )}
        <DevTools />
    </ul>
))
```

This view is a bit silly. Let's fix this. What we want to do is when we click this temperature that it increases the temperature. At the convenience you already introduced the increment action which just adds one degree to the temperature. What we can do now is simply add an `onClick` handler, and we say that it needs to increment the temperature. Now, if you click it, the temperature increases.

```html
const App = observer(({ temperatures }) => (
    <ul>
        {temperatures.map(t =>
            <li key={t.id} onClick={() => t.inc()}>
                {t.temperature}</li>
        )}
        <DevTools />
    </ul>
))
```

That works but it isn't very efficient, because as you can see, every time we click one of the temperatures, all of them re-renders. That is because there's only one component which renders all of the temperatures, so it has to react to all of the temperatures. Let's fix that. Let's use a divide and conquer strategy and split up those components.

So far we have this stateless function component, `const App`, which takes properties and produces their rendering. We simply declare a new `class` and this time, we use the ES6 class of style to demonstrate how that works. We call this class `TView`, which isn't the best name, but the temperature is already in use in this single file. In a real app, you would, of course, split this up into separate files. We move the `<li> elements` to the new `render` function. 

```javascript
const App = observer(({ temperatures }) => (
    <ul>
        {temperatures.map(t =>
            
        )}
        <DevTools />
    </ul>
))

class TView extends React.Component {
    render(){
        return (
            <li key={t.id}onClick={() => t.inc()}>
                {t.temperature}</li>
        )
    }
}
```

We grab the `temperature` from the properties and we invoke this new component from our original `App` components. We still need to pass in a `Key` for that we'll be able to reconcile these components, but we no longer need the key in the new component. 

```javascript
const App = observer(({ temperatures }) => (
    <ul>
        {temperatures.map(t =>
            <TView Key={t.id} temperature={t} />
        )}
        <DevTools />
    </ul>
))

class TView extends React.Component {
    render(){
        const t = this.props.temperature
        return (
            <li onClick={() => t.inc()}>
                {t.temperature}
            </li>
        )
    }
}
```

Then we run this and now click the list items. Nothing happens and that is because our new component isn't reactive. We can simply fix that by adding the `@observer` decorator. Now we render again, and we once again use the DEV tools to see when the components render, and we see now that they individually re-render when we click them.

```javascript
@observer
class TView extends React.Component {
    render(){
        const t = this.props.temperature
        return (
            <li onClick={() => t.inc()}>
                {t.temperature}
            </li>
        )
    }
}
```

Also, if we push new temperatures onto the list using the console, you see that MobX has now optimized the rendering of our components. The parent component is re-rendered because an item is added and the new child is rendered, but the other children aren't.

When MobX starts behind the scenes it's implementing shoot component updates so that parent components can render independently of their childs and childs independently of their parents. If we change another one we see that MobX now exactly has determined which components need to be updated for each change.

Now we have split up our small components, but this onclick handler here inline is still a bit ugly. Let's refactor that nicely to an `@action`. 

```javascript
@observer class TView extends React.Component {
    render(){
        const t = this.props.temperature
        return (
            <li onClick={this.onTemperatureClick}>
                {t.temperature}
            </li>
        )
    }
    @action onTemperatureClick = () => {
        this.props.temperature.inc()
    }
}
```

We now nicely have split off our event handler into a separate action which is invoked from rendering and still works as expected.

Now we have two real components. One, statless functional component, `const App`, which maps over our temperatures, and we have the `TView` component, `@observer class TView`, which has a simple action and renders independently of its parents.