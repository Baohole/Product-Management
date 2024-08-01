const Category = require('../../models/categories.model');
const createTree = require('../../helper/creatTree.helper');

// [GET] admin/categories
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    const records = await Category.find(find);
    res.render( 'admin/pages/categories/index',{
        pageTitle: 'Danh mục',
        records: records
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
    
    if(data.position){
        data.position = parseInt(data.position);
    }
    else{
        data.position = await Category.countDocuments() + 1;
    }

   
    try {
        const newCategory = new Category(data);
        await newCategory.save();
        req.flash('success', `Tạo mới thành công!!`);
    } catch (error) {
        req.flash('error', "Tạo mới thất bại!!");
    }   
   
    res.redirect('back');
}