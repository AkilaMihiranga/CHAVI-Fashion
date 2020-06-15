const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
    try{
        //extract authorization token
        const token = req.headers["auth-token"];
        const decoded = jsonWebToken.verify(token, 'UserSecretKey');
        const user = User.findOne({_id: decoded._id, 'auth-token': token})
        req.token = token
        req.user = user
        next();
    }catch(error){
        res.status(400).json({
            error: error
        });
    }
}
module.exports = authenticate;