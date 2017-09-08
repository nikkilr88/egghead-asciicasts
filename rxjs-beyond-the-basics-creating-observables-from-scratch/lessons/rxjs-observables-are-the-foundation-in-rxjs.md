Now we know in details what an observable is. It's just a way of representing many values being delivered from a producer to a consumer.

The producer is lazy, so it only starts delivering values once we call subscribe. The consumer is the set of callbacks, so the next handler, the error handler, and the complete handler.

RxJS is primarily about this observable type, but it's much more. In fact, the observable alone is not so interesting because it's just a subscribe function that takes three callbacks.

This library is a lot about its operators. We haven't seen about operators in this course, so I recommend that next you follow up on RxJS operators course in depth. The observables serves as the foundation for operators. This is how we can easily compose complex, asynchronistic operations together, whereas with callbacks only, it would be quite hard to manage.