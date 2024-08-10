const Cart = require('../../models/cart.model');

module.exports = async (req, res, next) => {
    if(!req.cookies.cartId){
        const cart = new Cart();
        await cart.save();
        const maxAge = 1000 * 60 * 60 *24 *365;
        res.cookie('cartId', cart.id, {
            expires : new Date(Date.now() + maxAge)
        });
    }
    else{
        const cartId = req.cookies.cartId;
        const cart = await Cart.findOne({
            _id : cartId
        });
        res.locals.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    }
    next();
}