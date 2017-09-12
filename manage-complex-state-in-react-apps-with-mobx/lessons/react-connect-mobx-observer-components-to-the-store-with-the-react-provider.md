As you might have noticed so far, it really doesn't matter where `@observable` state is defined. It can be either in a model class, or it can be in our components, or in our `store`. For MobX, for observed components, it doesn't matter where the observables are coming from. If they are used, it will react to them.

If you have a deeply-nested component tree, it quickly might become annoying to pass the temperature collection along each time. Luckily, React has a mechanism for that. It's called `context`. MobX leverages this concept to be able to pass around stores.

If you consider our temperatures collection as a store, you could just initialize that store once, like in the root of our application. From there, we can use the provider components to pass it to any components in the component tree that is interested in the store. 

We declare that we provide `temperatures`. Then, in any component deeper in the tree, we can just declare that it wants temperatures. 

#### ES6/Babel
```javascript
const temps = observable([])

ReactDOM.render(
  <Provider temperatures={temps}>
    <App />
  </Provider>,
  document.getElementById("app")
)
```

The only thing we need to do for that is providing an array of store names we are interested in.

MobX will make sure that these store are passed into the component as a property. That is ideal for testing as well, because during testing, you can just directly pass in the stores as props to the components, while in your real component tree, those are passed down via the provider.

```javascript
const App = observer(
    ["temperatures"],
    ({ temperatures }) => (
    <ul>
        <TemperatureInput />
        {temperatures.map(t =>
            <TView key={t.id} temperature={t} />
        )}
        <DevTools />
    </ul>
))

@observer(["temperatures"])
class TemperatureInput extends React.Component {
    @observable input = "";

    render() {
        return (
        <li>
            Destination
            <input onChange={this.onChange}
               value={this.input}
            />
            <button onClick={this.onSubmit}>Add</button>
        </li>
    )
}
```

In our app components, we no longer have to explicitly pass down `temperatures` to the `<TemperatureInput/>`. We see that everything is still working as before.