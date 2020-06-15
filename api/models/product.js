const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    
    product_name: { 
        type: String,
        required: true 
    },
    product_slug: { 
        type: String,
        required: true
    },
    product_price: { 
        type: Number,
        required: true 
    },
    product_description: { 
        type: String 
    },
    product_image: {
            type: Array,
            default: []
    },
    product_keyword: {
        type: String
    },
    category: { 
        type: String, 
        required: true  
    },
},{
    timestamps: true,
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;