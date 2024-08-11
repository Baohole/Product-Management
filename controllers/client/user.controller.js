const User = require('../../models/user.model');
const Cart = require('../../models/cart.model');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

//[GET] /user/login
module.exports.login = (req, res) => {
    res.render('client/pages/user/login', {
        pageTitle: 'Đăng nhập',
    });
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ 
        email: email,
        password: md5(password)
    });
    if (user) {
        const cart = await Cart.findOne({
            user_id: user.id
        });
        if(!cart){
            const data = {
                user_id: user.id,
            }
            cart = new Cart(data);
            await cart.save();
        }
        if(req.body.remember){
            const maxAge = 1000 * 60 * 60 * 24 * 365
            res.cookie('user_token', user.user_token, { maxAge: maxAge });
            res.cookie('cart_id', cart.id, { maxAge: maxAge });
        }
        else{
            res.cookie('cart_id', cart.id);
            res.cookie('user_token', user.user_token);
        }
        
        res.redirect('/');
    }
    else{
        res.redirect('back');
    }
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {
    req.body.password = (md5(req.body.password));
    req.body.user_token = jwt.sign(req.body.email, process.env.JWT_SECRECT);
    const user = new User(req.body);
    await user.save();
    res.cookie('user_token', user.user_token);
    
    const data = {
        user_id: user_id.id,
    }
    const newCart = new Cart(data);
    await newCart.save();
    res.cookie('cart_id', newCart.id);
  

    res.redirect('/');
}

//[GET] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie('user_token');
    res.clearCookie('cart_id');
    res.redirect('/');
}