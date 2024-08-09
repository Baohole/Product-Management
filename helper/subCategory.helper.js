const Category = require('../models/categories.model');

findSubCategory = async (record) => {
    //console.log(records);
    const category = [];
    const subCategory = await Category.find({
        deleted: false,
        parent_id: record.id
    })
    if(subCategory){
        category.push(...subCategory);
        for(item of subCategory){
            const subSubCategory = await findSubCategory(item);
            if(subSubCategory.length > 0){
                category.push(...subSubCategory);
            }
        }
    }
    
    return category;
}
module.exports.suCategory = async (record) => {
    //console.log(record);
    const datas = await findSubCategory(record);
    datas.push(record);
    const category_id = datas.map(item => item.id);
    return category_id;
}
