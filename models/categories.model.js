const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const categoriesSchema = new mongoose.Schema({
    title: String,
    parent_id: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { 
        type: String, 
        slug: 'title', 
        unique: true 
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date
},{
    timestamps: true
});
const Category = mongoose.model('Category', categoriesSchema, 'categories');
module.exports = Category;
