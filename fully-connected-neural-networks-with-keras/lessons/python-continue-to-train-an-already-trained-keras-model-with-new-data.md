We can load an existing model by importing `load_model` from `keras.models`, and then call `load_model` and pass the file name of our saved model. We can look at the `summary` of that model to better understand what we just loaded.

#### run_model.py

```python
from keras.models import load_model
import numpy as np
from keras.utils.np_utils import to_categorical

model = load_model('iris.h5')

model.summary()
```

We can also continue training the saved model if we want to. We don't have the `model` defined in this file at all, but the saved file contains all the information that we need to pick up training right where we left off. We can import `numpy` and use that to load the `iris.csv` file.

```python
import numpy as np
data = np.genfromtxt('iris.csv', delimiter=',')
```

We need to remember to switch the y-values from just a number to a one-hot encoded vector. First, import `to_categorical` and then we can use that on the y-values.

```python
from keras.utils.np_utils import to_categorical
y_train = to_categorical(data[:, 4])
```

We need to make sure to shuffle the data again since we're going to be using the `validation_split` method. Finally, we can call `fit` just like normal.

```python
from keras.models import load_model
import numpy as np
from keras.utils.np_utils import to_categorical

model = load_model('iris.h5')

model.summary()

data = np.genfromtxt('iris.csv', delimiter=',')
data = np.random.permutation(data[1:, :])

x_train = data[:, :4]
y_train = to_categorical(data[:, 4])


model.fit(
  x_train, 
  y_train,
  epochs=100, 
  validation_split=0.2
)
```

The `model` will pick up just where it left off and continue to train the network. This can be especially helpful if you get new data and you want to train an old model, or if you simply want to pause training because it's taking a long time and resume at a later time.