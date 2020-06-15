const  express = require('express');
const router =express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const CartItem = require('../models/cartItem');
const UserAddress = require('../models/userAddress');

//create order route
router.post('/create', (req, res, next) => {

    //create new order
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        order: req.body.order,
        address: req.body.address,
        paymentType: req.body.paymentType,
        paymentStatus: req.body.paymentStatus
    });

    //save the order
    order.save().then(order =>{
        CartItem.remove({"user": req.body.user}).exec().then(doc => {
            res.status(201).json({
                message: order
            });
        }).catch(error => {
            res.status(500).json({
                error:error
            });
        })
    }).catch(error => {
        res.status(500).json({
            error:error
        });
    })
});

router.get('/getorders/:user_id', (req, res, next) =>{
    const user_id = req.params.user_id;
    Order.find({"user": user_id})
    .select('address user order orderDate paymentType paymentStatus isOrderCompleted')
    .populate('order.product', 'product_name product_image')
    .exec()
    .then(orders =>{
        UserAddress.findOne({"user": user_id})
        .exec()
        .then(userAddress =>{
            const order_With_Address = orders.map(order => {
                const address = userAddress.address.find(userAdd => order.address.equals(userAdd._id));
                return{
                    _id: order._id,
                    order: order.order,
                    address: address,
                    orderDate: order.orderDate,
                    paymentType: order.paymentType,
                    paymentStatus: order.paymentStatus,
                    isOrderCompleted: order.isOrderCompleted
                }
            });
            res.status(200).json({
                message: order_With_Address
            });
        })
        .catch(error => {
            return res.status(500).json({
                error:error
            })
        })
    })
    .catch(error => {
        res.status(500).json({
            error:error
        });
    });
});


router.get('/get-all-orders', (req, res, next) =>{
    Order.find()
        .then(orders => {
            res.status(200).json({
                status: 'success',
                data: orders
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
