const express = require('express');
const router = express.Router();
const Admin = require('../models/User');
const bcrypt = require('bcrypt');

//get all admin
router.get('/',(req,res) => {
    Admin.find()
        .then(admin => {
            res.status(200).json({
                status: 'success',
                data: admin
            });
        })
        .catch(error => {
            res.status(400).json({
                status: 'error',
                error: error
            });
        });
});

//Create Admin registration route
router.post('/add-admin', (req, res) => {
    //find user
    Admin.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if(user){
                //if email address already exists
                return res.status(400).json({
                    status: 'error',
                    message: 'Email Already Exists'
                })
            }else{
                //create new Admin
                const newAdmin = new Admin({
                    first_Name: req.body.first_Name,
                    last_Name: req.body.last_Name,
                    email: req.body.email,
                    gender: req.body.gender,
                    contact_Number: req.body.contact_Number,
                    password: req.body.password,
                    userRole: 'admin'
                });

                bcrypt.genSalt(10, (error, salt) =>
                    bcrypt.hash(newAdmin.password, salt, (error, hash) => {
                        if(error){
                            return res.status(400).json({
                                status: 'error',
                                error: 'Error occurred'
                            });
                        }
                        //Set password to hashed
                        newAdmin.password = hash;
                        //save new admin
                        newAdmin.save()
                            .then(admin => {
                                res.status(200).json({
                                    message: 'Account Created Successfully',
                                    data: admin
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

//create admin details update route
router.post('/update/:id', (req, res) => {
    Admin.findByIdAndUpdate(req.params.id)
        .then(admin => {
                admin.first_Name = req.body.first_Name,
                admin.last_Name = req.body.last_Name,
                admin.email = req.body.email,
                admin.gender = req.body.gender,
                admin.contact_Number = req.body.contact_Number

                admin.save()
                    .then(admin => {
                        res.status(200).json({
                            message: 'Account Updated Successfully',
                            data: admin
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

//admin find by id
router.get('/:id',(req, res) => {
    Admin.findById(req.params.id)
        .then(admin => {
            res.status(200).json({
                message: 'Admin find',
                data: admin
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

//remove Admin
router.delete('/:id',(req, res) => {
    Admin.findByIdAndDelete(req.params.id)
        .then(admin => {
            res.status(200).json({
                message: 'Admin removed Successfully',
                data: admin
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});


module.exports = router;