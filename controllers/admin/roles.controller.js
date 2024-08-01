const Role = require('../../models/roles.model');

// [GET] admin/roles
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const records = await Role.find(find);
    res.render( 'admin/pages/roles/index',{
        pageTitle: 'Nhóm quyền',
        records: records
    });
}

// [GET] admin/roles/creat
module.exports.creatRole = async (req, res) => {
    res.render('admin/pages/roles/create', {
        pageTitle: 'Thêm nhóm quyền',
    });
}

// [POST] admin/roles/creat
module.exports.creatRolePost = async (req, res) => {
    const data = req.body;
    console.log(data);

    const role = new Role(data);
    try {
        await role.save();
        req.flash('success', `Tạo thành công!!`);
    } catch (error) {
        req.flash('error', "Tạo thất bại!!");
    }   
   
    //res.send('OK');
    res.redirect('back');
}


// [GET] admin/roles/permissions
module.exports.permission = async (req, res) => {
    const find = {
        deleted: false
    };

    const records = await Role.find(find);
    res.render('admin/pages/roles/permission', {
        pageTitle: 'Phân quyền',
        records: records
    });
}

// [PATCH] admin/roles/permissions
module.exports.permissionPatch = async (req, res) => {
    const datas = JSON.parse(req.body.permissions);
    for(const data of datas){
        await Role.updateOne({_id : data.id}, {permissions: data.permissions});
    };
    
   res.redirect('back');
}