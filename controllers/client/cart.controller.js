const Cart = require('../../models/cart.model');

//[POST]/cart/add/:id
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.id
    const cart = await Cart.findOne({
        _id: cartId
    });
    //console.log(cart.products);
    const productObj = {
        productId: productId,
        quantity: parseInt(req.body.quantity)
    }
    const isExist = cart.products.find(item => item.productId == productId);
    if (isExist) {
        const newQuantity = isExist.quantity + parseInt(req.body.quantity);
        //console.log(newQuantity);
        await Cart.updateOne({
           _id: cartId,
           "products.productId": productId
        },{
            $set: {
                'products.$.quantity': newQuantity
            }
        })
    }
    else{
       await Cart.updateOne({
            _id: cartId
        },{
            $push:{products : productObj}
        });
    }
    //console.log(cart.products);

    res.redirect('back');
}