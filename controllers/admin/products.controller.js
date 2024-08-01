const Product = require('../../models/products.model');
const filterHelper = require('../../helper/filter.helper');
const searchHelper = require('../../helper/search.helper');

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
    const id = req.params.id;
    const currentStatus = req.params.status;
    //console.log(req.params.id);
    try {
        await Product.updateOne({_id: id}, {status: currentStatus});
        req.flash('success', "Thay đổi trạng thái thành công!!");
    } catch (error) {
        req.flash('error', "Thay đổi trạng thái thất bại!!");
    }
   
    res.redirect('back');

}

// [PATCH] admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
    const ids = req.body.ids.split(',');
    const status = req.body.type;
    const count = ids.length;
   
    if(status === 'delete'){
        try {
            await Product.updateMany({_id: {$in: ids}}, {deleted: true, deleteAt: new Date()});
            req.flash('success', `Xóa thành công ${count} sản phẩm!!`);
        } catch (error) {
            req.flash('error', "Xóa thất bại!!");
        }
       
    }
    else if(status == 'position'){
        for(indx in ids){
            const data = ids[indx];
            //console.log(data);
            let[id, position] = data.split('-');
            position = parseInt(position);
            await Product.updateOne({_id: id}, {position: position});
        }
    }
    else{
        try {
            await Product.updateMany({_id: {$in: ids}}, {status: status});
            req.flash('success', `That đổi trạng thái thành công ${count} sản phẩm!!`);
        } catch (error) {
            req.flash('error', "Thay đổi thất bại!!");
        }   
    }
    res.redirect('back');
    //res.send('OK');
}

// [DELETE] admin/products/delete
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    try {
        await Product.updateOne({_id: id}, {deleted: true, deleteAt: new Date()});
        req.flash('success', `Xóa thành công !!`);
    } catch (error) {
        req.flash('error', "Xóa thất bại!!");
    }   
    
    
    res.redirect('back');

}

// [GET] admin/products/creat
module.exports.createProduct = async (req, res) => {
    res.render('admin/pages/products/create', {
        pageTitle: 'Tạo mới sản phẩm'
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
    
    const product = new Product(data);
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
    res.render('admin/pages/products/edit', {
        pageTitle: 'Chỉnh sửa sản phẩm',
        product: product
    });;
}

// [PATCH] admin/products/edit
module.exports.editProductPatch = async (req, res) => {
    const data = req.body;

    data.price = parseInt(data.price);
    data.discountPercentage = parseInt(data.discountPercentage);
    data.stock = parseInt(data.stock);
    data.position = parseInt(data.position);
    //console.log(data);
    try {
        await Product.updateOne({_id: req.params.id}, data);
        req.flash('success', `Cập nhật thành công!!`);
    } catch (error) {
        req.flash('error', "Cập nhật thất bại!!");
    }   
  
    //console.log(data.id);
    res.redirect('back');
    
}
