const express = require('express');
const router = express.Router();
const StoreManager = require('../models/User');
const bcrypt = require('bcrypt');

//get all store managers
router.get('/',(req,res) => {
    StoreManager.find()
        .then(managers => {
            res.status(200).json({
                status: 'success',
                data: managers
            });
        })
        .catch(error => {
            res.status(400).json({
                status: 'error',
                error: error
            });
        });
});

//Create Store Manager registration route
router.post('/add-store-manager', (req, res) => {
    //find user
    StoreManager.findOne({email: req.body.email})
        .exec()
        .then(manager => {
            if(manager){
                //if email address already exists
                return res.status(400).json({
                    status: 'error',
                    message: 'Email Already Exists'
                })
            }else{
                //create new Store Manager
                const newStoreManager = new StoreManager({
                    first_Name: req.body.first_Name,
                    last_Name: req.body.last_Name,
                    email: req.body.email,
                    gender: req.body.gender,
                    contact_Number: req.body.contact_Number,
                    password: req.body.password,
                    userRole: 'storeManager'
                });

                bcrypt.genSalt(10, (error, salt) =>
                    bcrypt.hash(newStoreManager.password, salt, (error, hash) => {
                        if(error){
                            return res.status(400).json({
                                status: 'error',
                                error: 'Error occurred'
                            });
                        }
                        //Set password to hashed
                        newStoreManager.password = hash;
                        //save new Store Manager
                        newStoreManager.save()
                            .then(manager => {
                                res.status(200).json({
                                    message: 'Account Created Successfully',
                                    data: manager
                                });
                            })
                            .catch(error => {
                                res.status(400).json({
                                    error: error
                                });
                            });
                    }));

            }

        });

});

//create store manager details update route
router.post('/update/:id', (req, res) => {
    StoreManager.findByIdAndUpdate(req.params.id)
        .then(manager => {
                manager.first_Name = req.body.first_Name,
                manager.last_Name = req.body.last_Name,
                manager.email = req.body.email,
                manager.gender = req.body.gender,
                manager.contact_Number = req.body.contact_Number

                manager.save()
                    .then(manager => {
                        res.status(200).json({
                            message: 'Account Updated Successfully',
                            data: manager
                        });
                    })
                    .catch(error => {
                        res.status(400).json({
                            error: error
                        });
                    });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        })
});

//store manager find by id
router.get('/:id',(req, res) => {
    StoreManager.findById(req.params.id)
        .then(manager => {
            res.status(200).json({
                message: 'Store Manager find',
                data: manager
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

//remove Store Manager
router.delete('/:id',(req, res) => {
    StoreManager.findByIdAndDelete(req.params.id)
        .then(manager => {
            res.status(200).json({
                message: 'Admin removed Successfully',
                data: manager
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

module.exports = router;