const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart_id: String,
    user_info : {
        full_name: String,
        email: String,
        phone: String,
        address: String
    },
    products : [{
        product_id: String,
        price: Number,
        quantity: Number,
        discountPercentage: Number
    }],
    order_date :{
        type: Date,
        default: Date.now()
    },
    totalPrice: Number
});
const Order = mongoose.model('Order', orderSchema, 'orders');
module.exports = Order;
