Instructor: 00:00 Let's create a new folder to store all the Mongoose model. The name of the folder is models. Here, I am going to create a new product model, `product.js`. First, we need to `import` the `mongoose`.

00:14 I want to get the `Schema` class from the `mongoose` package. Let me create a new instance from the schema class. I am going to name it to `ProductSchema`. Here, we need to define all the properties. We have `name` property, and the `type` of name is `String`. Yes, it is `required` property. I am going to set it to `true`.

00:37 Another property, we have `qty`, and the type is `Number`. Finally, we need to `export` the instance of this model. I am going to use `mongoose.model` method. We need to provide the `name`, which is `product`, and the `ProductSchema`.

#### models/product.js
```javascript
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number
    }
})
export default mongoose.model('product', ProductSchema);
```