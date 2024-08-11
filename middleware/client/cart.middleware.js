const Cart = require('../../models/cart.model');

module.exports.index = async (req, res, next) => {
    if(req.cookies.cart_id){
        const cart_id = req.cookies.cart_id;
        const cart = await Cart.findOne({
            _id : cart_id
        });
        cart.totalQuantity = 0
        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        res.locals.cart = cart;
    }
    next();
}

module.exports.isLogin = async (req, res, next) => {
    if(req.cookies.cart_id){
        next();
    }
    else{
        res.redirect('/user/login');
    }
    
}