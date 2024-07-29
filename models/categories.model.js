const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    title: String,
    parent_id: String,
    thumbnail: String,
    status: String,
    position: Number,
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
