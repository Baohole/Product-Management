const Product = require('../../models/products.model');

const productHelper = require('../../helper/products.helper');

module.exports.index = async (req, res) => {
    const productFeatured = await Product.find({
        featured: true,
        deleted: false,
        status: 'active'
    }).limit(6);
    productHelper.newPrice(productFeatured);

    const newProducts = await Product.find({
        deleted: false,
        status: 'active'
    }).sort({position: 'desc'}).limit(6);

    productHelper.newPrice(newProducts);
    res.render('client/pages/homes/index', {
        pageTitle: 'Trang chủ',
        newProducts: newProducts,
        productFeatured: productFeatured
    });
}