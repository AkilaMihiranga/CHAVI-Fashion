const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const WishlistItem = require('../models//wishlistItem');


router.post('/add', (req, res, next) => {

    WishlistItem.findOne({user: req.body.user})
    .exec()
    .then(wishlistItem => {

        if(wishlistItem){

            const item = wishlistItem.wishlist.find(item => item.product == req.body.product);
            let where, action, set;
            if(item){
                action = "$set";
                where = { "user": req.body.user, "wishlist.product": req.body.product};
                set = "wishlist.$";
            }else{
                action = "$push";
                where = { "user": req.body.user };
                set = "wishlist"
            }

            WishlistItem.findOneAndUpdate(where, {
                [action] : {
                    [set] : {
                        _id: item ? item._id : new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: item ? (item.quantity + req.body.quantity) : req.body.quantity,
                        price: req.body.price,
                        total: item ? req.body.price * (req.body.quantity + item.quantity) : (req.body.price * req.body.quantity)
                    }
                }
            })
            .exec()
            .then(newItem => {
                res.status(201).json({
                    message: newItem
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });

            

        }else{
            const newWishlistItem = new WishlistItem({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                wishlist: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        total: req.body.quantity * req.body.price
                    }
                ]
            });

            newWishlistItem
            .save()
            .then(newCart => {
                res.status(201).json({
                    message: newWishlist
                });
            })
            .catch(error => {
                res.status(500).json({
                    error : error
                });
            });

        }

    })
    .catch(error => {
        res.status(500).json({
            error : error
        });
    });    

});

router.post('/user/:user_id', (req, res, next) => {

    const user_id = req.params.user_id;

    WishlistItem.find({user: user_id})
    .select('_id user wishlist')
    .populate('wishlist.product', 'product_name product_image')
    .exec()
    .then(wishlistItems => {
        res.status(200).json({
            message: wishlistItems
        })
    })
});

router.put('/update/quantity', (req, res, next) => {

    const user_id = req.body.user_id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const total = req.body.total;

    WishlistItem.updateOne({"user": user_id, "wishlist.product": productId}, {
        $set : {
            "wishlist.$.quantity": quantity,
            "wishlist.$.total": total
        }
    })
    .exec()
    .then(wishlistItem => {
        res.status(201).json({
            message: wishlistItem
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });

});

module.exports = router;