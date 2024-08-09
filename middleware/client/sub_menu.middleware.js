const Category = require('../../models/categories.model');
const createTree = require('../../helper/creatTree.helper');

module.exports.subMenu = async (req, res, next) => {
    const records = await Category.find({
        deleted: false
    });

    const categories = createTree.categoryTree(records);
    res.locals.productCategories = categories;

    next();
}