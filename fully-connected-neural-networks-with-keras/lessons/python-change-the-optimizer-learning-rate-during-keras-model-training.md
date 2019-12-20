We're setting the learning rate for the `Adam` optimizer before we `fit`, but we may want to change that later and retrain with a lower learning rate.

After we `fit` the first time, we can change the model optimizer by setting `model.optimizer` to a new `Adam` optimizer with a lower learning rate. Then we can call `fit` again with the same parameters as before.

#### neural_net.py
```python
model.fit(
  x_train, 
  y_train,
  epochs=100, 
  validation_split=0.2
)

model.optimizer = Adam(lr=0.0001)

model.fit(
  x_train, 
  y_train,
  epochs=100, 
  validation_split=0.2
)
```

It's perfectly OK to call `fit` more than once on your `model`. It will remember the weights from before and continue to train and improve on them during the second `fit` step.

What we're doing by first writing with a high learning rate and then switching to a small learning rate is telling the network that it can start by taking large steps, which gives it more freedom to explore the training landscape.

Then when we want to start refining the results, without risking taking a big step in the wrong direction, we lower the learning rate and continue training.

Now when we run that it starts with a hundred `epochs` at the first learning rate and then continues with another hundred `epochs` at the smaller learning rate.

Now that we're happy with that model, let's save it, so that we can reload the fully-trained model later.

```python
model.save('iris.h5')
```