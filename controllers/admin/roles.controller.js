const Role = require('../../models/roles.model');
const Acoount = require('../../models/accounts.model');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');

const changeMulti = require('../../helper/changeMulti.helper');
const getActionDetail = require('../../helper/getActionDetail.helper');


// [GET] admin/roles
module.exports.index = async (req, res) => {
    const filterStatus = filterHelper(req.query);
    const searchStatus = searchHelper(req.query);

    let pagination = {
        limitItems: 7,
        currentPage: 1,
        skip: 0
    }

   
    const find = {
        deleted: false
    }
    //console.log(searchStatus);
    if(req.query.status){
        find.status = req.query.status;
    }
    if(searchStatus.regex){
        find.title = searchStatus.regex;
    }
    
    const sorted = {};
    if(req.query.sortVal){
        sorted[req.query.sortKey] = req.query.sortVal;
    }
    else{
        sorted.position = 'desc';
    }
    //console.log(req.query.search_query);

    if(req.query.page){
        pagination.currentPage = parseInt(req.query.page);
    }
    
    let total =  await Role.countDocuments(find);
    pagination.totalPages = Math.ceil(total / pagination.limitItems);
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;

    const records   = await Role.find(find)
                                .limit(pagination.limitItems)
                                .skip(pagination.skip)
                                .sort(sorted);
    res.render( 'admin/pages/roles/index',{
        pageTitle: 'Nhóm quyền',
        records: records,
        filterStatus: filterStatus,
        find: searchStatus.keyword,
        pagination: pagination
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
    //console.log(data);

    const role = new Role(data);
    role.createdBy.account_id = res.locals.user._id;
    try {
        await role.save();
        req.flash('success', `Tạo thành công!!`);
    } catch (error) {
        req.flash('error', "Tạo thất bại!!");
    }   
   
    //res.send('OK');
    res.redirect('back');
}

// [DELETE] admin/roles/delete
module.exports.deleteItem = async (req, res) => {
    changeMulti.deleteItem(req, res, Role);
}


// [PATCH] admin/roles/change-status
module.exports.changeStatus = async (req, res) => {
    changeMulti.changeStatus(req, res, Role);
}

// [PATCH] admin/roles/change-multi
module.exports.changeMulti = async (req, res) => {
    changeMulti.changeMulti(req, res, Role);
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
    //console.log(datas);
    for(const data of datas){
        await Role.updateOne({_id : data.id}, {permissions: data.permissions});
    };
    
   res.redirect('back');
}

// [GET] admin/roles/:id
module.exports.roleDetail = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findOne({
        deleted: false,
        _id: id
    });
    await getActionDetail.getDetail(req, res, role);
    res.render('admin/pages/roles/detail', {
        pageTitle: 'Chi tiết nhóm quyền',
        permission: role
    });
}

// [GET] admin/roles/edit
module.exports.editRole = async (req, res) => {
    //console.log(req.params);
    const find = {
        _id: req.params.id,
        deleted : false
    }

    const permission = await Role.findOne(find);
    res.render('admin/pages/roles/edit', {
        pageTitle: 'Chỉnh sửa quyền',
        permission: permission
    });
}

// [PATCH] admin/roles/edit/:id
module.exports.editRolePatch = async (req, res) => {
    changeMulti.editItem(req, res, Role);  
}
