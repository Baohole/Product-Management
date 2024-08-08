const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
    title: String,
    description: String,
    permissions: [],
    status: String,
    deleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now()
        }
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
const Role = mongoose.model('Role', rolesSchema, 'roles');
module.exports = Role;
