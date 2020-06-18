const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const CartItem = require('../models/cartItem');


router.post('/add', (req, res, next) => {

    CartItem.findOne({user: req.body.user})
    .exec()
    .then(cartItem => {

        if(cartItem){

            const item = cartItem.cart.find(item => item.product == req.body.product);
            let where, action, set;
            if(item){
                action = "$set";
                where = { "user": req.body.user, "cart.product": req.body.product};
                set = "cart.$";
            }else{
                action = "$push";
                where = { "user": req.body.user };
                set = "cart"
            }

            CartItem.findOneAndUpdate(where, {
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
            const newCartItem = new CartItem({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                cart: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        total: req.body.quantity * req.body.price
                    }
                ]
            });

            newCartItem
            .save()
            .then(newCart => {
                res.status(201).json({
                    message: newCart
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

    CartItem.find({user: user_id})
    .select('_id user cart')
    .populate('cart.product', 'product_name product_image')
    .exec()
    .then(cartItems => {
        res.status(200).json({
            message: cartItems
        })
    })
});

router.put('/update/quantity', (req, res, next) => {

    const user_id = req.body.user_id;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const total = req.body.total;

    CartItem.updateOne({"user": user_id, "cart.product": productId}, {
        $set : {
            "cart.$.quantity": quantity,
            "cart.$.total": total
        }
    })
    .exec()
    .then(cartItem => {
        res.status(201).json({
            message: cartItem
        });
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });

});

//remove cart item
router.delete('/delete', (req, res, next) =>{
    const user_id = req.body.user_id;
    const productId = req.body.productId;

    CartItem.findOneAndDelete({"user": user_id, "cart.product": productId})
    .exec()
    .then(response =>{
        res.status(200).json({
            message:response
        });
    })
    .catch(error => {
        res.status(500).json({
            error:error
        });
    });
});

module.exports = router;