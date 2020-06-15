const mongoose  = require('mongoose');

const wishlistItemSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    wishlist: [
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

const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

module.exports = WishlistItem;