const Order = require('../../models/orders.model');
const Cart = require('../../models/cart.model');
const Product = require('../../models/products.model');

const checkoutHelper = require('../../helper/checkout.helper');

//[POST] /checkout
module.exports.index = async (req, res) => {
    const records = req.body.products.split(',');
    if(records[0] == ''){
        req.flash('error','Vui lòng chọn ít nhất 1 sản phẩm')
        res.redirect('back');
        return;
    }
    const cart_id = req.cookies.cart_id;

    const order_info = await checkoutHelper.getProducts(records, cart_id);
    //console.log(order_info);
    res.render('client/pages/checkout/index', {
        pageTitle: 'Đặt hàng',
        order_info: order_info,
        ids: req.body.products
    });
}

//[POST] /checkout/buynow/:product_id
module.exports.buyOnePost = async (req, res) => {
    const product_id = req.params.product_id;
    const cart_id = req.cookies.cart_id;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({
        _id: cart_id,
    });
    const productObj = {
        productId: product_id,
        quantity: quantity
    }
    const isExist = cart.products.find(item => item.productId == product_id);
    if (isExist) {
        const newQuantity = isExist.quantity + parseInt(req.body.quantity);
        //console.log(newQuantity);
        await Cart.updateOne({
            _id: cart_id,
            "products.productId": product_id
        }, {
            $set: {
                'products.$.quantity': newQuantity
            }
        })
    }
    else {
        await Cart.updateOne({
            _id: cart_id
        }, {
            $push: { products: productObj }
        });
    }

    let product = await Product.findOne({_id: product_id}).select('price discountPercentage thumbnail title');
    const newPrice = product.price * (1 - product.discountPercentage / 100);
    const newPriceRound = Math.round((newPrice + Number.EPSILON) * 100 ) / 100;

    const order_info = {
        products: [{
            product_id: product_id,
            price: product.price,
            quantity: quantity,
            discountPercentage: product.discountPercentage,
            thumbnail: product.thumbnail,
            title: product.title,
            newPrice: newPriceRound
        }]
    };
    order_info.totalPrice = (newPriceRound * quantity);

    res.render('client/pages/checkout/index', {
        pageTitle: 'Đặt hàng',
        order_info: order_info,
        ids: product_id
    });
}

//[POST] /checkout/order
module.exports.orderPost = async (req, res) => {
    const cart_id = req.cookies.cart_id;
    const {full_name, email, address, phone, ids} = req.body;
    const records = ids.split(',');
    //console.log(records);
    const order_info = await checkoutHelper.getProducts(records, cart_id);
    const order = {
        cart_id: cart_id,
        user_info : {
            full_name: full_name,
            email: email,
            phone: phone,
            address: address
        },
        products: order_info.products,
        totalPrice: order_info.totalPrice
    }
    const newOrder = new Order(order);
    await newOrder.save();

    await Cart.updateOne({
        _id: cart_id
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
        if(!product.stock){
            product.status = 'inactive';
        }
        await product.save();
    }   
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
        user_info: order.user_info,
        order_date: order.order_date
    }
    //console.log(order_info);
    res.render('client/pages/checkout/success', {
        order_info: order_info
    });
    // res.send('ok');
}
