const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
    fullName: String,
    role_id: String,
    email: String, 
    password: String,
    token: String,
    status: String,
    phone:String,
    avatar:String,
    createdBy: {
        account_id: String,
        createdAt :{
            type: Date,
            default: Date.now()
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date

    },
    updatedBy: [{
        account_id: String,
        action: String,
        updatedAt: Date

    }]
});
const Account = mongoose.model('Account', accountsSchema, 'accounts');
module.exports = Account;
