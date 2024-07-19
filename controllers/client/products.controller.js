const Product = require('../../models/products.model');

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
    let total =  await Product.countDocuments(find);
    pagination.totalPages = Math.ceil(total / pagination.limitItems);
    pagination.skip = (pagination.currentPage - 1) * pagination.limitItems;
    //console.log(pagination.totalPages);

    let products = await Product.find(find)
                                .limit(pagination.limitItems)
                                .skip(pagination.skip)
                                .sort({position: 1});

    for(indx in products){
        products[indx].newPrice = (products[indx].price * (100 - products[indx].discountPercentage) / 100).toFixed(2);
    }
    res.render('client/pages/products/index', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        pagination: pagination
    });
}