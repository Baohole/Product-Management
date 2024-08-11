module.exports.changeMulti = async (req, res, collection) => {
 
    const data = req.body;
    //console.log(data);
    const ids = data.ids.split(',');
    const status = data.type;
    const count = ids.length;
    const updatedBy ={
        account_id : res.locals.user._id,
        updatedAt: new Date().getTime()
    }
    if(status === 'delete'){
        const deletedBy ={
            account_id : res.locals.user._id,
            deletedAt: new Date().getTime()
        }
        try {
            await collection.updateMany({_id: {$in: ids}}, {
                deleted: true, 
                deletedBy: deletedBy
            });
            req.flash('success', `Xóa thành công ${count} sản phẩm!!`);
        } catch (error) {
            req.flash('error', "Xóa thất bại!!");
        }
       
    }
    else if(status == 'position'){
        updatedBy.action = 'change-position';
        for(indx in ids){
            const data = ids[indx];
            //console.log(data);
            let[id, position] = data.split('-');
            position = parseInt(position);
            await collection.updateOne({_id: id}, {
                position: position,
                $push: {updatedBy: updatedBy}
            });
        }
    }
    else{
        updatedBy.action = 'change-status';
        try {
            await collection.updateMany({_id: {$in: ids}}, {
                status: status,
                $push: {updatedBy: updatedBy}
            });
            req.flash('success', `That đổi trạng thái thành công ${count} sản phẩm!!`);
        } catch (error) {
            req.flash('error', "Thay đổi thất bại!!");
        }   
    }

    res.redirect('back');
}

module.exports.changeStatus = async (req, res, collection) => {
    const id = req.params.id;
    const currentStatus = req.params.status;
    //console.log(req.params.id);
    const updatedBy ={
        account_id : res.locals.user._id,
        action: 'change-status',
        updatedAt: new Date().getTime()
    }
    try {
        await collection.updateOne({_id: id}, {
            status: currentStatus,
            $push: {updatedBy: updatedBy}
        });
        req.flash('success', "Thay đổi trạng thái thành công!!");
    } catch (error) {
        req.flash('error', "Thay đổi trạng thái thất bại!!");
    }

    res.redirect('back');
}

module.exports.deleteItem = async (req, res, collection) => {
    const id = req.params.id;
    const deletedBy = {
        account_id: res.locals.user._id,
        deletedAt: new Date().getTime(),
    }
    try {
        await collection.updateOne({_id: id}, {
            deleted: true, 
            deletedBy: deletedBy
        });
        req.flash('success', `Xóa thành công !!`);
    } catch (error) {
        req.flash('error', "Xóa thất bại!!");
    }   
    
    
    res.redirect('back');
}

module.exports.editItem = async(req, res, collection) => {
    const data = req.body;
    
    const updatedBy ={
        account_id : res.locals.user._id,
        action: 'edit',
        updatedAt: new Date().getTime()
    }
    //console.log(updatedBy);
    try {
        await collection.updateOne({_id: req.params.id}, {
            ...data,
            $push: {updatedBy: updatedBy}
        });
        req.flash('success', `Cập nhật thành công!!`);
    } catch (error) {
        req.flash('error', "Cập nhật thất bại!!");
    }   
  
    // //console.log(data.id);
    //res.send('OK');
    res.redirect('back');
}