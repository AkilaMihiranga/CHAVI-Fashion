const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: String
    }, 
    postId: {
        type: String
    },
    comment: {
        type: String
    }

}, { timestamps: true })


module.exports = mongoose.model('Comment', commentSchema);
