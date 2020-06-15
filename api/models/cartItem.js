const mongoose  = require('mongoose');

const cartItemSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: [
        {
            id: { type: mongoose.Schema.Types.ObjectId },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
            quantity: { type:Number, default: 1 },
            price: Number,
            total: Number
        }
    ]
},{
    timestamps: true,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;