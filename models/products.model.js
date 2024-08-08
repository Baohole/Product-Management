const mongoose = require("mongoose");

const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    category_id: String,
    featured: {
        type: Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createdAt :{
            type: Date,
            default: Date.now()
        }
    },
    slug: { 
        type: String, 
        slug: 'title', 
        unique: true 
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
const Product = mongoose.model('Product', productsSchema, 'products');
module.exports = Product;
