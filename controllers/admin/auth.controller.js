const Account = require('../../models/accounts.model');

const sysConfig = require('../../config/system');

const md5 = require("md5");

// [GET] admin/auth/login
module.exports.login = async (req, res) => {
    const find = {
        deleted: false
    };
   
    res.render( 'admin/pages/auth/login',{
        pageTitle: 'Đăng nhập'
    });
}

// [POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    
    const find = {
        deleted: false,
        email: req.body.email,
        password: req.body.password
    }
    const user = await Account.findOne(find);
  
    if (user) {
        res.cookie('token', user.token);
        res.redirect(`${sysConfig.prefixAdmin}/dashboard`);
    }
    else{
        res.redirect('back');
    }

    //res.send('ok');
}

// [GET] admin/auth/logout
module.exports.logout = async (req, res) => {
    if(req.cookies.token){
        res.clearCookie('token');
    }
    res.redirect(`${sysConfig.prefixAdmin}/auth/login`);
}