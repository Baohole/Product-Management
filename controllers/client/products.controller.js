const Product = require('../../models/products.model');
const Category = require('../../models/categories.model');
const subCategory = require('../../helper/subCategory.helper');

const productHelper = require('../../helper/products.helper');
// [GET] /
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        status: 'active'
    }

    let pagination = {
        limitItems: 6,
        currentPage: 1,
        skip: 0
    }
    if (req.query.page) {
        pagination.currentPage = parseInt(req.query.page);
    }
    let total = await Product.countDocuments(find);
    pagination.totalPages = Math.ceil(total / pagination.limitItems);
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;
    //console.log(pagination.totalPages);

    let products = await Product.find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skip)
        .sort({ position: 1 });

    productHelper.newPrice(products);
    res.render('client/pages/products/index', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        pagination: pagination
    });
}

// [GET] /:slugCategory
module.exports.prouctByCategory = async (req, res) => {
    const category = await Category.findOne({
        slug: req.params.slugCategory,
        deleted: false
    });


    const records = await subCategory.suCategory(category);
    //console.log(records);
    const products = await Product.find({
        category_id: { $in: records },
        deleted: false,
        status: 'active'
    });
    //console.log(products);
    productHelper.newPrice(products);

    res.render('client/pages/products/slugCategory', {
        pageTitle: records.title,
        products: products
    });
}

// [GET] /detail/:slugProduct
module.exports.prouctDetail = async (req, res) => {
    const product = await Product.findOne({
        slug: req.params.slugProduct,
    });
    
    if(product.category_id){
        const category = await Category.findOne({ _id: product.category_id });
        product.category_name = category.title;
    }
    res.render('client/pages/products/detail', {
        pageTitle: product.title,
        product: product
    });
}