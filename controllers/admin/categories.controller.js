const Category = require('../../models/categories.model');
const createTree = require('../../helper/creatTree.helper');

const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const changeMulti = require('../../helper/changeMulti.helper');
const getActionDetail = require('../../helper/getActionDetail.helper');

// [GET] admin/categories
module.exports.index = async (req, res) => {
    const filterStatus = filterHelper(req.query);
    const searchStatus = searchHelper(req.query);
    const find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    }
    if(searchStatus.regex){
        find.title = searchStatus.regex;
    }
    

    const records = await Category.find(find);
    res.render('admin/pages/categories/index', {
        pageTitle: 'Danh mục',
        records: records,
        filterStatus: filterStatus,
        find: searchStatus.keyword
    });
}

// [GET] admin/categories/creat
module.exports.creatCategory = async (req, res) => {
    const find = {
        deleted: false
    };

    // Usage
    const records = await Category.find(find);
    const tree = createTree.categoryTree(records);
    //console.log(tree);

    res.render('admin/pages/categories/create', {
        pageTitle: 'Thêm danh mục',
        records: tree
    });
}

// [POST] admin/categories/creat
module.exports.creatCategoryPost = async (req, res) => {
    const data = req.body;
    //console.log(data);
    if (data.position) {
        data.position = parseInt(data.position);
    }
    else {
        data.position = await Category.countDocuments() + 1;
    }

    try {
        const newCategory = new Category(data);
        newCategory.createdBy.account_id = res.locals.user._id;
        await newCategory.save();
        req.flash('success', `Tạo mới thành công!!`);
    } catch (error) {
        req.flash('error', "Tạo mới thất bại!!");
    }

    res.redirect('back');
}


// [GET] admin/categories/edit/:id
module.exports.editCategory = async (req, res) => {

    // // Usage
    const records = await Category.find({
        deleted: false
    });
    const tree = createTree.categoryTree(records);
    const category = await Category.findOne({
        deleted: false,
        _id: req.params.id
    })
    //console.log(tree);
    res.render('admin/pages/categories/edit', {
        pageTitle: 'Chỉnh sửa danh mục',
        records: tree,
        category: category
    });

    //res.send('OK');
}

// [PATCH] admin/categories/edit/:id
module.exports.editCategoryPatch = async (req, res) => {
    changeMulti.editItem(req, res, Category);
}


// [GET] admin/categories/:id
module.exports.categoryDetail = async (req, res) => {
    const find = {
        deleted: false,
        _id: req.params.id
    };

    //res.send('OK');
    // Usage
    // const records = await Category.find(find);
    // const tree = createTree.categoryTree(records);
    //console.log(tree);
    const category = await Category.findOne(find);
    if (category.parent_id != "") {
        const parentCategory = await Category.findOne({
            _id: category.parent_id,
            deleted: false
        });

        category.parentTitle = parentCategory.title;
    }
    else {
        category.parentTitle = "";
    }

    await getActionDetail.getDetail(req, res, category);

    res.render('admin/pages/categories/detail', {
        pageTitle: 'Chi tiết danh mục',
        category: category
        //records: tree
    });
}

// [DELETE] admin/categories/delete
module.exports.deleteItem = async (req, res) => {
    changeMulti.deleteItem(req, res, Category);
}

// [PATCH] admin/products/change-status
module.exports.changeStatus = async (req, res) => {
    changeMulti.changeStatus(req, res, Category);
}

// [PATCH] admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
    changeMulti.changeMulti(req, res, Category);
}
