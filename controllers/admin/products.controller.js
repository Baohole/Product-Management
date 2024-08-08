const Product = require('../../models/products.model');

const Category = require('../../models/categories.model');
const createTree = require('../../helper/creatTree.helper');


const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');
const changeMulti = require('../../helper/changeMulti.helper');
const getActionDetail = require('../../helper/getActionDetail.helper');


// [GET] admin/products
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
    
    let total =  await Product.countDocuments(find);
    pagination.totalPages = Math.ceil(total / pagination.limitItems);
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;
    //console.log(pagination.totalPages);

    let products = await Product.find(find)
                                .limit(pagination.limitItems)
                                .skip(pagination.skip)
                                .sort(sorted);

    res.render('admin/pages/products/index', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        filterStatus: filterStatus,
        find: searchStatus.keyword,
        pagination: pagination
    });
}

// [PATCH] admin/products/change-status
module.exports.changeStatus = async (req, res) => {
   changeMulti.changeStatus(req, res, Product);
}

// [PATCH] admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
    changeMulti.changeMulti(req, res, Product);
}

// [DELETE] admin/products/delete
module.exports.deleteItem = async (req, res) => {
   changeMulti.deleteItem(req, res, Product);
}

// [GET] admin/products/creat
module.exports.createProduct = async (req, res) => {
    const categories = await Category.find({
        deleted: false
    });
    const categoriesTree = createTree.categoryTree(categories);
    res.render('admin/pages/products/create', {
        pageTitle: 'Tạo mới sản phẩm',
        categories: categoriesTree
    });
}

// [POST] admin/products/creat
module.exports.createProductPost = async (req, res) => {
    //console.log(req.body);
    const data = req.body;
    //console.log(data);
    data.price = parseInt(data.price);
    data.discountPercentage = parseInt(data.discountPercentage);
    data.stock = parseInt(data.stock);
    if(data.position != ""){
        data.position = parseInt(data.position);
    }
    else{
        data.position = await Product.countDocuments() + 1;
    }
    if(data.featured){
        data.featured = true;
    }
    const product = new Product(data);
    product.createdBy.account_id = res.locals.user._id;
    try {
        await product.save();
        req.flash('success', `Tạo mới thành công!!`);
    } catch (error) {
        req.flash('error', "Tạo mới thất bại!!");
    }   
   
    res.redirect('back');
}

// [GET] admin/products/edit
module.exports.editProduct = async (req, res) => {
    //console.log(req.params);
    const find = {
        _id: req.params.id,
        deleted : false
    }

    const product = await Product.findOne(find);
    const categories = await Category.find({
        deleted: false
    });
    const categoriesTree = createTree.categoryTree(categories);
    res.render('admin/pages/products/edit', {
        pageTitle: 'Chỉnh sửa sản phẩm',
        product: product,
        categories: categoriesTree
    });
}

// [PATCH] admin/products/edit
module.exports.editProductPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if(req.body.position != ""){
        req.body.position = parseInt(req.body.position);
    }
    else{
        req.body.position = await Product.countDocuments() + 1;
    }
    if(req.body.featured){
        req.body.featured = true;
    }
    //console.log(req.body);
    //res.send('ok');
    changeMulti.editItem(req, res, Product);    
}

// [GET] admin/products/:id
module.exports.productDetail = async (req, res) => {
    //console.log(req.params);
    const find = {
        _id: req.params.id,
        deleted : false
    }

    const product = await Product.findOne(find);
   
    await getActionDetail.getDetail(req, res, product);
    //console.log(product);
    const category= await Category.findOne({
        _id: product.category_id,
        deleted: false
    });
    if(category){
        product.category_name = category.title;
    }

    res.render('admin/pages/products/detail', {
        pageTitle: 'Chi tiết sản phẩm',
        product: product
    });

    //res.send('ok');
}
