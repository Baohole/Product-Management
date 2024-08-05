const Account = require('../../models/accounts.model');
const Role = require('../../models/roles.model');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

// [GET] admin/accounts
module.exports.index = async (req, res) => {
    const accounts = await Account.find({deleted: false});
    const roles = await Role.find({deleted: false});

    res.render( 'admin/pages/accounts/index',{
        pageTitle: 'Danh sách tài khoản',
        accounts: accounts,
        roles: roles
    });
}

// [GET] admin/accounts/creat
module.exports.createAccount = async (req, res) => {
    const roles = await Role.find({deleted: false});

    res.render('admin/pages/accounts/create', {
        pageTitle: 'Tài khoản',
        roles: roles
    });
}

// [POST] admin/accounts/creat
module.exports.createAccountPost = async (req, res) => {
    req.body.password = (md5(req.body.password));
    req.body.token = jwt.sign(req.body.email, process.env.JWT_SECRECT);
    const account = new Account(req.body);
    await account.save();
    //res.send('OK');
    res.redirect('back');
   
}

// [GET] admin/accounts/edit
module.exports.editAccount = async (req, res) => {
    //console.log(req.params);
    const find = {
        _id: req.params.id,
        deleted : false
    }
    const roles = await Role.find({deleted: false});
    const account = await Account.findOne(find);
    res.render('admin/pages/accounts/edit', {
        pageTitle: 'Chỉnh sửa tài khoản',
        account: account,
        roles: roles
    });
}

// [PATCH] admin/products/edit
module.exports.editAccountPatch = async (req, res) => {
    const data = req.body;
    if(data.password){
        data.password = md5(data.password);
    }
    else{
        delete data.password;
    }

    
    //console.log(data);
    try {
        await Account.updateOne({_id: req.params.id}, data);
        req.flash('success', `Cập nhật thành công!!`);
    } catch (error) {
        req.flash('error', "Cập nhật thất bại!!");
    }   
  
    //console.log(data.id);
    res.redirect('back');
    
}
