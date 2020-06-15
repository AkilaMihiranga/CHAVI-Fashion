const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    category_name: { 
        type: String,
        required: true
     },

    category_slug: {
         type: String,
         unique: true
    },

    category_parent: {
         type: String
    }
   
},{
    timestamps: true,
});

module.exports = mongoose.model('Category', categorySchema);