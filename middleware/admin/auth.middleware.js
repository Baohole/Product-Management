const Account = require('../../models/accounts.model');
const Role = require('../../models/roles.model');


const sysConfig = require('../../config/system');

module.exports.login = async (req, res, next) => {
    if(!req.cookies.token){
        res.redirect(`${sysConfig.prefixAdmin}/auth/login`);
    }
    else{
        const user = await Account.findOne({
            deleted: false,
            token: req.cookies.token
        }).select('-password');
        if(!user){
            res.redirect(`${sysConfig.prefixAdmin}/auth/login`);
        }
        else{
            const role = await Role.findOne({
                deleted: false,
                _id: user.role_id
            }).select('title permissions');
            res.locals.user = user;
            res.locals.role = role;
            next();
        }
        
    }
   
}