const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: String,
    products: [
        {
            productId: String,
            quantity: Number
        }
    ]
});
const Cart = mongoose.model('Cart', cartSchema, 'cart');
module.exports = Cart;
