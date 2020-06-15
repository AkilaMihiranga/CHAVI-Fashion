const mongoose = require('mongoose');

//create order model
const order_schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    order:[{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Products'
        },
        price: {
            type: Number,
            required:true
        },
        quantity:{
            type:Number
        }
    }],
    address: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress'
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    paymentType: {
        type: String
    },
    paymentStatus: {
        type: String
    },
    isOrderCompleted: {
        type: Boolean,
        default: false
    }
});

const Order = mongoose.model('Order', order_schema);

module.exports = Order;