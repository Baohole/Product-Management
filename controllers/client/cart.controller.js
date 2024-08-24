const Cart = require('../../models/cart.model');
const Product = require('../../models/products.model');

const productHelper = require('../../helper/products.helper');

//[POST]/cart/add/:id/
module.exports.addPost = async (req, res) => {
    const cart_id = req.cookies.cart_id;
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const cart = await Cart.findOne({
        _id: cart_id
    });
   
    const productObj = {
        productId: productId,
        quantity: quantity
    }
    const isExist = cart.products.find(item => item.productId == productId);
    if (isExist) {
        const newQuantity = isExist.quantity + parseInt(req.body.quantity);
        //console.log(newQuantity);
        await Cart.updateOne({
            _id: cart_id,
            "products.productId": productId
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
    //console.log(cart.products);

    res.redirect('back');
}

//[GET]/cart
module.exports.index = async (req, res) => {
    const cart_id = req.cookies.cart_id;
    const buynow = req.query.item_key;
    const cart = await Cart.findOne({
        _id: cart_id
    });
    const records = cart.products;
    const products = []
    for (item of records) {
        const product = await Product.findById(item.productId);
        product.quantity = item.quantity;
        products.push(product);
    }

    productHelper.newPrice(products);
    res.render('client/pages/cart/index', {
        pageTitle: 'Giỏ hàng',
        products: products,
        buynow: buynow
    });
}

//[GET]/cart/update/:product_id/:quantity
module.exports.update = async (req, res) => {
    const cart_id = req.cookies.cart_id;
    const { product_id, quantity } = req.params;
    await Cart.updateOne({
        _id: cart_id,
        'products.productId': product_id
    }, {
        $set: {
            'products.$.quantity': quantity
        }
    });
    res.redirect('back');
}

//[GET]/cart/delete/:product_id
module.exports.delete = async (req, res) => {
    const cart_id = req.cookies.cart_id;
    const { product_id } = req.params;
    await Cart.updateOne({
        _id: cart_id,
    }, {
        $pull: {
            products: { productId: product_id }
        }
    });
    res.redirect('back');
}

//[GET]/cart/delete-all
module.exports.deleteAll = async (req, res) => {
    const cart_id = req.cookies.cart_id;
    const ids = req.body.ids.split(',');
    await Cart.updateOne({
        _id: cart_id
    }, {
        $pull: {
            products: { productId: { $in: ids } }
        }
    });

    res.redirect('back');
}