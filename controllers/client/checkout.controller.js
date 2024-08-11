const Order = require('../../models/orders.model');
const Cart = require('../../models/cart.model');
const Product = require('../../models/products.model');

const checkoutHelper = require('../../helper/checkout.helper');

//[POST] /checkout
module.exports.index = async (req, res) => {
    const records = req.body.products.split(',');
    const cartId = req.cookies.cartId;

    const order_info = await checkoutHelper.getProducts(records, cartId);
   
    res.render('client/pages/checkout/index', {
        pageTitle: 'Đặt hàng',
        order_info: order_info,
        ids: req.body.products
    });
}

//[POST] /checkout/order
module.exports.orderPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const {full_name, email, address, phone, ids} = req.body;
    const records = ids.split(',');
    const order_info = await checkoutHelper.getProducts(records, cartId);
    const order = {
        cart_id: cartId,
        user_info : {
            full_name: full_name,
            email: email,
            phone: phone,
            address: address
        },
        products: order_info.products,
        totalPrice: order_info.totalPrice
    }
    //console.log(order);
    const newOrder = new Order(order);
    await newOrder.save();

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: {
            products: { productId: { $in: records } }
        }
    });
    //console.log(order_info.products);
    for(const item of order_info.products){
        //console.log(item);
        const product = await Product.findOne({
            _id: item.product_id
        });
        product.stock = Math.max(product.stock - item.quantity, 0);
        //console.log(product.stock);
        if(!product.stock){
            product.status = 'inactive';
        }
        await product.save();
    }   
    //res.send('ok');
    res.redirect(`/checkout/order/success/${newOrder.id}`)
}

//[GET] /checkout/order/success/:order_id
module.exports.success = async (req, res) => {
    const order_id = req.params.order_id;
    let order = await Order.findOne({
        _id: order_id
    });
   
    //console.log(order);
    const products = [];
    for(const item of order.products){
        let product = await Product.findOne({_id: item.product_id}).select('title thumbnail');
        const newPrice = item.price * (1 - item.discountPercentage / 100);
        const record = {
            title: product.title,
            price: item.price,
            quantity: item.quantity,
            discountPercentage: item.discountPercentage,
            thumbnail: product.thumbnail
        }
        record.newPrice = Math.round((newPrice + Number.EPSILON) * 100 ) / 100;
        //console.log(product);
        //product.product_id = item.productId;

        products.push(record)
    }

    const order_info = {
        products: products,
        totalPrice: order.totalPrice,
        user_info: order.user_info
    }
    //console.log(order_info);
    res.render('client/pages/checkout/success', {
        order_info: order_info
    });
    // res.send('ok');
}
