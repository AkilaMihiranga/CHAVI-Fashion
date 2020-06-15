const express = require('express');
const router = express.Router();
const sendMail = require('../helpers/sendEmail');

router.post('/storemanager-email', (req,res) => {
    
    const { first_Name, last_Name, email, password } = req.body;
    sendMail(first_Name, last_Name, email, password, function(err, data) {
        if(err){
            res.status(400).json({ message: 'Internal Error' });
        }
        else {
            res.status(200).json({ message: 'Email Sent.!'});
        }
    });
});

module.exports = router;