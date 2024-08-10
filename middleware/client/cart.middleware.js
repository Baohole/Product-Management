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
    else{}
    next();
}