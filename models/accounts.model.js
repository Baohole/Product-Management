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
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
},{
    timestamps: true
});
const Account = mongoose.model('Account', accountsSchema, 'accounts');
module.exports = Account;
