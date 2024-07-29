buildCategoryTree = (records, parent_id = "") => {
    //console.log(records);
    const categoryTree = [];
    
    records.forEach(category => {
        if (category.parent_id == parent_id) {
            const childCategories = records.filter((child) => child.parent_id == category._id);
            childCategories.forEach(c => {
                c.child = buildCategoryTree(records, c.id);
            });
            
            category.child = childCategories;
            categoryTree.push(category);
        }
    });
    // Return an array of root categories
    return categoryTree;
}
module.exports.categoryTree = (records) => {
    return buildCategoryTree(records);
}
