const Account = require('../../models/accounts.model');

module.exports.creatValidate = async (req, res, next) => {
    const { fullName, password, email, role_id } = req.body;
   
    if(!fullName || !password || !email || !role_id){
        req.flash('error','Vui lòng nhập đầy đủ thông tin')
        res.redirect('back');
        return;
    }
    const existAcc = await Account.findOne({
        deleted: false,
        email: email
    });


    if(existAcc){
        req.flash('error','Email đã tồn tại');
        res.redirect('back');
        return;
    }
    else if(password.length < 5){
        req.flash('error','Mật khẩu phải có ít nhất 6 kí tự');
        res.redirect('back');
        return;
    }

    next();
    
}

module.exports.editValidate = async (req, res, next) => {
    const { fullName, password, email} = req.body;
    const id = req.params.id;
    if(!fullName ||  !email){
        req.flash('error','Vui lòng nhập đầy đủ thông tin')
        res.redirect('back');
        return;
    }
    const existAcc = await Account.findOne({
        deleted: false,
        email: email,
        _id: {$ne : id}
    });


    if(existAcc){
        req.flash('error','Email đã tồn tại');
        res.redirect('back');
        return;
    }
    else if(password.length < 5 && password.length){
        req.flash('error','Mật khẩu phải có ít nhất 6 kí tự');
        res.redirect('back');
        return;
    }

    next();
    
}