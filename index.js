const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();
//assign port number
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//import routes
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const storeManagerRoutes = require('./api/routes/storeManager');
const categoryRoutes = require('./api/routes/categories');
const ProductRoutes = require('./api/routes/product');
const emailRoutes = require('./api/routes/email');
const cartItemRoutes = require('./api/routes/cartItems');
const orderRoutes = require('./api/routes/orders');

const commentRoutes = require('./api/routes/comment');
const wishlistItemRoutes = require('./api/routes/wishlistItems');


//use imported routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/storeManager', storeManagerRoutes);
app.use('/category', categoryRoutes);
app.use('/product', ProductRoutes);
app.use('/comment', commentRoutes);


app.use('/uploads', express.static('uploads'));
app.use('/email', emailRoutes);
app.use('/cart', cartItemRoutes);
app.use('/order', orderRoutes);
app.use('/wishlist', wishlistItemRoutes);

//Connect DB
mongoose.connect(process.env.MongoDB_CONNECTION,{ useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('MongoDB database connection established successfully.!')
);

//Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});