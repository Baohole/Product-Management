const Account = require('../../models/accounts.model');
const Role = require('../../models/roles.model');

const md5 = require('md5');
const jwt = require('jsonwebtoken');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const changeMulti = require('../../helper/changeMulti.helper');
const getActionDetail = require('../../helper/getActionDetail.helper');


// [GET] admin/accounts
module.exports.index = async (req, res) => {
    const filterStatus = filterHelper(req.query);
    const searchStatus = searchHelper(req.query);
    
        //console.log(searchStatus);
    const find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status;
    }
    if(searchStatus.regex){
        find.fullName = searchStatus.regex;
    }
    
    const accounts = await Account.find(find)
    const roles = await Role.find(find);
    res.render( 'admin/pages/accounts/index',{
        pageTitle: 'Danh sách tài khoản',
        accounts: accounts,
        roles: roles,
        filterStatus: filterStatus,
        find: searchStatus.keyword
    });
}

// [PATCH] admin/products/change-status
module.exports.changeStatus = async (req, res) => {
    changeMulti.changeStatus(req, res, Account);
   
}

// [PATCH] admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    changeMulti.changeMulti(req, res, Account);
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
    changeMulti.editItem(req, res, Account);
}


// [GET] admin/accounts/:id
module.exports.accountDetail = async (req, res) => {
    //console.log(req.params);
    const find = {
        _id: req.params.id,
        deleted : false
    }

    const account = await Account.findOne(find).select('-password');
    const role = await Role.findOne({
        _id: account.role_id,
        deleted: false
    });
    account.role_name =  role.title;
    await getActionDetail.getDetail(req, res, account);

    res.render('admin/pages/accounts/detail', {
        pageTitle: 'Chi tiết sản phẩm',
        account: account
    });
}
