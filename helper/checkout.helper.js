const Cart = require('../models/cart.model');
const Product = require('../models/products.model');

module.exports.getProducts = async (records, cartId) => {
    //console.log(cart._id);
    const cart = await Cart.findOne({
        _id: cartId,
    });
    //console.log(cart);
    const products_in_cart = cart.products.filter((item) => {
        return records.includes(item.productId);
    });

   // console.log(products_in_cart);
    const products = [];
    let totalPrice = 0;
    for(const item of products_in_cart){
        let product = await Product.findOne({_id: item.productId}).select('price discountPercentage');
       
        
        const newPrice = product.price * (1 - product.discountPercentage / 100);
        const record = {
            product_id: item.productId,
            price: product.price,
            quantity: item.quantity,
            discountPercentage: product.discountPercentage 
        }
        record.newPrice = Math.round((newPrice + Number.EPSILON) * 100 ) / 100;
       
        //console.log(product);
        //product.product_id = item.productId;

        totalPrice += (record.newPrice * item.quantity);
        products.push(record)
    }

    const order_info = {
        products: products,
        totalPrice: totalPrice
    }
    return order_info;
}