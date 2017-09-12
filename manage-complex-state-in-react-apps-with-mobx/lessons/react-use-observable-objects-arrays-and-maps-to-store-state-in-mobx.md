Let's take a closer look at the `observable` decorator. We will do this in our `Temperature` application. The decorator is just convenient for extending the object in the constructor using the `extendObservable` methods. What the extend observable function does is creating a new property with the getter and setter for each key value pair which you provide to it.

#### ES6/Babel
```javascript
constructor() {
    extendObservable(this, {
        unit: "C",
        temperatureCelsius: 25
    })
}
```

This `extendObservable` function, in turn, is used by the `observable` function with scan and one-go make a complete object observable by enumerating the object and creating new observable properties for each existing key value pair. If we pass the function without arguments, MobX will introduce advantically a computed property instead of an observable, so we can simply rewrite our `<Temperature/>` class into an object like this.

```javascript
const t = observable({
    unit = "C";
    temperatureCelsius = 25;
    temperatureKelvin : function() {
        console.log("calculating Kelvin")
        return this.temperatureCelsius * (9/5) + 32
    },
    temperatureFahrenheit : function () {
        console.log("calculating Fahrenheit")
        return this.temperatureCelcius + 273.15
    },
    temperature : function() {
        console.log("calculating temperature")
        switch(this.unit) {
            case "K": return this.temperatureKelvin + "°K"
            case "F": return this.temperatureFahrenheit + "°F"
            case "C": return this.temperatureCelsius + "°C"
        }
    }
})
```

Now, we have the same app, but this time we didn't use classes. Use whatever style you prefer.

Let's revert to our `Temperature` class. 

```javascript
const t = new class Temperature {
    @observable unit = "C";
    @observable temperatureCelcius = 25;

    @computed get temperatureKelvin() {
        console.log("calculating Kelvin")
        return this.temperatureCelsius * (9/5) + 32
    }

    @computed get temperatureFahrenheit() {
        console.log("calculating Fahrenheit")
        return this.temperatureCelcius + 273.15
    }

    @computed get temperature() {
        console.log("calculating temperature")
        switch(this.unit) {
            case "K": return this.temperatureKelvin + "°K"
            case "F": return this.temperatureFahrenheit + "°F"
            case "C": return this.temperatureCelsius + "°C"
        }
    }
}
```

Let's take a look at arrays. What if we want a collection of values? Let's see if we can put class instances into an `observable` array.

What we do first is giving the `temperaturT` an `id` field because we need this later for react to be able to render a collection. 

```javascript
const t = new class Temperature {
    id = Math.random();
    @observable unit = "C";
    @observable temperatureCelcius = 25;
...
}
```

We introduce a new variable, `temps`, and we initialize it with an `observable` array. We simply push a new temperature onto that array.

```javascript
const temps = obseravble([])
temps.push(new Temperature())
```

Let's change our array component a bit. We `.map()` over the `temperatures`. We render each temperature, and we also assign a `key` to the diff because react uses that to reconcile the DOM.

```javascript
const App = observer(({ temperatures }) => {
    <div>
        {temperatures.map(t => 
            <div key={t.id}>{t.temperature}</div
        )}
        <DevTools />
    </div>
})

ReactDOM.render(
    <App temperatures={temps} />,
    document.getElementById("app")
)
```

Let's run that. We see we can change items inside the array and those changes are reflected, but we can also push new temperatures onto the array. We can splice one off. We can even assign one, any one, to an index. Although, observable arrays are not really arrays; they do implement the array interface faithfully. If you need to pass them to some external library, you can always slice them and you get a real array back.

Finally, if you need a dynamically keyed collection you can use `observable(asMap)`. Observable maps work like normal ES6 maps. We can use entries to loop over the key value pairs inside the temperature, so we can adjust our components and render this as well.

```javascript
const temps = observable(asMap({
    "Amsterdam": new Temperature(),
    "Rome": new Temperature()
})

const App = observer(({ temperatures }) => {
    <div>
        {temperatures.entries().map(([city])(t => 
            <div key={t.id}>{city}:{t.temperature}</div
        )}
        <DevTools />
    </div>
})
```

Most important functions are our `get`, `set`, and `has`. These are the important observable types in MobX. You might be wondering, "Can I also make primitives observable?" Well, in principle not. While JavaScript primitives are immutable and hence not observable, you can, however, pass a primitive to observable. In that case, MobX creates a boxed or a reference value.

A simple object that wraps your primitive value and which offers a `get` and `set` method to reach or update the value. In practice, you probably never need those, but these are objects that are used internally by `extendObservable`. That concluded the introduction to the three important observable data structures in MobX; objects, arrays, and maps.