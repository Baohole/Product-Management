const Account = require('../models/accounts.model');

module.exports.getDetail = async (req, res, data) => {
    const createdBy = await Account.findOne({
        deleted: false,
        _id: data.createdBy.account_id
    });
    if(createdBy){
        data.createdBy.fullName = createdBy.fullName;
    }

    for(const item of data.updatedBy){
        const updatedBy = await Account.findOne({
            deleted: false,
            _id: item.account_id
        });
        if(updatedBy){
            item.fullName = updatedBy.fullName;
        }
    }

    return data;
}