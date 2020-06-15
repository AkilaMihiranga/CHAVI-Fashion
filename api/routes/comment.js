const express = require('express');
const router = express.Router();
const Comment = require("../models/comment");

router.post("/saveComment", (req, res) => {

   const comment = new Comment(req.body) 

    comment.save((err, comment ) => {
        if(err) return res.json({ success:false, err})

        Comment.find({ '_id': comment._id })
        .exec((err, result) => {
            if(err) return res.json({ success:false, err })
            return res.status(200).json({ success:true, result })
        })

    })

});

router.get('/get-comment',(req,res) => {
    Comment.find()
        .then(comment => {
            res.status(200).json({
                data: comment
            });
        })
        .catch(error => {
            res.status(400).json({
                status: 'error',
                error: error
            });
        });
});

module.exports = router;
