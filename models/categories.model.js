const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categoriesSchema = new mongoose.Schema({
    title: String,
    parent_id: String,
    thumbnail: String,
    description: String,
    status: String,
    position: Number,
    slug: { 
        type: String, 
        slug: 'title', 
        unique: true 
    },
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
const Category = mongoose.model('Category', categoriesSchema, 'categories');
module.exports = Category;
