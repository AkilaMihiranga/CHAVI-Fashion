const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category');


categoryTree = (parentId = "", docs) => {
    const category = docs.filter(doc => parentId == doc.category_parent);

    var categories = [];
    for(var cat of category){
        categories.push({
            _id: cat._id,
            category_name: cat.category_name,
            category_slug: cat.category_slug,
            children: categoryTree(cat._id, docs)
        })
    }
    return categories;
}

router.get('/',(req,res) => {
    Category.find()
        .then(category => {
            res.status(200).json({
                status: 'success',
                data: category
            });
        })
        .catch(error => {
            res.status(400).json({
                status: 'error',
                error: error
            });
        });
});

//Add Category
router.post('/add-category', (req, res, next) => {

    const category = new Category({
        category_name: req.body.category_name,
        category_slug: req.body.category_slug,
        category_parent: req.body.category_parent
    });

    category.save()
    .then(doc => {
        res.status(201).json({
            message: doc
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er
        })
    });

});

//Update Category
router.post('/update/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id)
        .then(category => {
            category.category_name = req.body.category_name,
            category.category_slug = req.body.category_slug,
            category.category_parent = req.body.category_parent

            category.save()
                    .then(category => {
                        res.status(200).json({
                            data: category
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

//Category find by id
router.get('/:id',(req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            res.status(200).json({
                data: category
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

//Remove Category
router.delete('/:id',(req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(category => {
            res.status(200).json({
                data: category
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});


module.exports = router;